#!/usr/bin/env node
/**
 * Seed real trips (scraped into dataEntry/) into the Tourist Market backend.
 *
 * Reads dataEntry/trips/{group,private}/*.json + dataEntry/images/** and, per trip:
 *   1. resolve/create its excursion category
 *   2. create the group/private excursion (or recover an existing one by slug)
 *   3. upsert excursion details (highlights/includes/excludes/whatToBring/cancellation)
 *   4. upload hero + gallery images (multipart)
 *   5. create FAQs
 *
 * Auth: reads ADMIN_TOKEN from env (never hardcoded). Base URL from API_BASE_URL
 * (defaults to the sandbox used by clientApi/apiConfig.ts).
 *
 * Usage:
 *   ADMIN_TOKEN=<jwt> node scripts/seedTripsFromDataEntry.mjs \
 *     [--type group|private|all] [--limit N] [--only <slug>] [--dry-run] \
 *     [--force] [--no-images] [--no-create-missing-categories]
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const BASE_URL = (process.env.API_BASE_URL || "https://touristtt.runasp.net/api").replace(/\/+$/, "");
const TOKEN = process.env.ADMIN_TOKEN || "";

// formats the backend image endpoints accept
const ALLOWED_EXT = new Set([".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".webp", ".jfif"]);

// ---- curated reference-label -> our-category-slug map (grounded in live categories) ----
// `create` present => if slug missing, create that category. Arbitrary labels are NEVER
// auto-created (avoids polluting categories with leaked descriptions).
const CATEGORY_MAP = {
  Historical: { slug: "historical-trips" },
  "SEA TRIPS": { slug: "boat-trips-and-snorkeling" },
  "DESERT SAFARI TRIPS": { slug: "desert-safaris" },
  "FUN TRIPS": { slug: "diving-and-water-sports" },
  "PRIVATE HISTORICAL TRIPS": { slug: "private-historical-trips", create: { name: "Private Historical Trips" } },
  "PRIVATE SEA TRIPS": { slug: "private-sea-trips" },
  "PRIVATE CITY TOURS": { slug: "private-city-trips" },
  "PRIVATE DESERT SAFARI": { slug: "private-super-safari-trips" },
  "PRIVATE FUN TRIPS": { slug: "private-fun-trips" },
};

// ---- per-slug overrides for trips whose scrape leaked a description into `category` ----
const CATEGORY_OVERRIDES = {
  "hurghada-city-tour": "city-and-cultural-tours",
  "junior-open-water-course-2-3-days": "diving-and-water-sports",
  "the-advanced-open-water-course-2-3-days": "diving-and-water-sports",
  "the-open-water-course-3-4-days": "diving-and-water-sports",
};

// ---- CLI ----
function parseArgs(argv) {
  const opts = { type: "all", limit: Infinity, only: null, dryRun: false, force: false, images: true, createMissing: true };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--type") opts.type = argv[++i];
    else if (a === "--limit") opts.limit = Number(argv[++i]);
    else if (a === "--only") opts.only = argv[++i];
    else if (a === "--dry-run") opts.dryRun = true;
    else if (a === "--force") opts.force = true;
    else if (a === "--no-images") opts.images = false;
    else if (a === "--no-create-missing-categories") opts.createMissing = false;
  }
  return opts;
}
const OPTS = parseArgs(process.argv.slice(2));

// ---- helpers ----
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (...a) => console.log(...a);
const normKey = (s) => String(s || "").trim().toLowerCase().replace(/\s+/g, " ");

function slugify(s) {
  return String(s || "").toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function toArray(v) {
  if (Array.isArray(v)) return v.filter(Boolean);
  if (typeof v === "string" && v.trim()) return v.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  return [];
}
const lt = (en) => ({ en: en || "", de: "", ru: "", fr: "" });
const la = (arr) => ({ en: arr || [], de: [], ru: [], fr: [] });

function isTransient(err) {
  const code = err?.cause?.code || err?.code || "";
  return /TIMEOUT|ECONNRESET|ECONNREFUSED|EAI_AGAIN|UND_ERR|SocketError|ETIMEDOUT/i.test(String(code) + " " + String(err?.message));
}

async function req(method, url, { json, form } = {}, attempt = 0) {
  const headers = { Authorization: `Bearer ${TOKEN}`, Accept: "application/json" };
  let body;
  if (form) body = form;
  else if (json !== undefined) { headers["Content-Type"] = "application/json"; body = JSON.stringify(json); }
  let res;
  try {
    res = await fetch(url, { method, headers, body });
  } catch (err) {
    if (attempt < 5 && isTransient(err)) {
      const wait = 2000 * (attempt + 1);
      log(`  ~ transient (${err?.cause?.code || err.message}) ${method} ${url}; retry ${wait}ms`);
      await sleep(wait);
      return req(method, url, { json, form }, attempt + 1);
    }
    throw err;
  }
  if (res.status >= 500 && attempt < 5) {
    const wait = 2000 * (attempt + 1);
    log(`  ~ HTTP ${res.status} ${method} ${url}; retry ${wait}ms`);
    await sleep(wait);
    return req(method, url, { json, form }, attempt + 1);
  }
  const text = await res.text();
  let parsed;
  try { parsed = text ? JSON.parse(text) : {}; } catch { parsed = { raw: text }; }
  if (!res.ok) {
    const msg = parsed?.message || parsed?.errors || parsed?.raw || text;
    const e = new Error(`HTTP ${res.status} on ${method} ${url}: ${typeof msg === "object" ? JSON.stringify(msg) : msg}`);
    e.status = res.status;
    e.body = parsed;
    throw e;
  }
  return parsed;
}

function extractId(obj) {
  const seen = [obj?.id, obj?.data?.id, obj?.data?.data?.id, obj?.result?.id];
  return seen.find((v) => typeof v === "string" && v.length) || null;
}

// recursively collect every {slug, id} pair found in a response envelope
function collectSlugIds(obj, out = new Map()) {
  if (Array.isArray(obj)) obj.forEach((o) => collectSlugIds(o, out));
  else if (obj && typeof obj === "object") {
    if (typeof obj.slug === "string" && typeof obj.id === "string") out.set(obj.slug, obj.id);
    Object.values(obj).forEach((v) => collectSlugIds(v, out));
  }
  return out;
}

function mimeFor(file) {
  const ext = path.extname(file).toLowerCase();
  return { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".gif": "image/gif", ".bmp": "image/bmp", ".jfif": "image/jpeg" }[ext] || "application/octet-stream";
}

async function uploadImage(endpoint, relPath, name) {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) throw new Error(`image file missing: ${relPath}`);
  const bytes = fs.readFileSync(abs);
  const file = new File([bytes], name, { type: mimeFor(abs) });
  const form = new FormData();
  form.append("file", file);
  return req("POST", `${BASE_URL}${endpoint}`, { form });
}

// ---- state (resume / idempotency) ----
const STATE_PATH = path.join(ROOT, "dataEntry", ".seed-state.json");
function loadState() {
  try { const s = JSON.parse(fs.readFileSync(STATE_PATH, "utf8")); return s && typeof s === "object" ? s : {}; } catch { return {}; }
}
function saveState(state) {
  try { fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), "utf8"); }
  catch (e) { log(`  ! could not persist state (${e.code || e.message}); continuing`); }
}
const STATE = loadState();

// ---- category resolution ----
let ourCategories = null;
async function fetchCategories() {
  if (ourCategories) return ourCategories;
  const j = await req("GET", `${BASE_URL}/excursion-categories?page=1&pageSize=200&lang=en`);
  let c = j?.data?.items || j?.data?.data || j?.data || j?.items || [];
  if (!Array.isArray(c)) c = [];
  ourCategories = c;
  return ourCategories;
}
const resolvedCategoryIds = {};

async function resolveCategoryId(label, tripSlug) {
  const key = normKey(label);
  if (resolvedCategoryIds[key]) return resolvedCategoryIds[key];
  const cats = await fetchCategories();
  const pickBySlug = (slug) => cats.find((c) => c.slug === slug)?.id || null;

  let id = null;

  // 1) explicit per-slug override
  if (CATEGORY_OVERRIDES[tripSlug]) id = pickBySlug(CATEGORY_OVERRIDES[tripSlug]);

  // 2) curated label map
  if (!id) {
    const mapKey = Object.keys(CATEGORY_MAP).find((k) => normKey(k) === key);
    const mapEntry = mapKey ? CATEGORY_MAP[mapKey] : null;
    if (mapEntry) {
      id = pickBySlug(mapEntry.slug);
      if (!id && mapEntry.create && OPTS.createMissing && !OPTS.dryRun) {
        const created = await req("POST", `${BASE_URL}/excursion-categories`, {
          json: { name: lt(mapEntry.create.name), slug: mapEntry.slug, isActive: true, displayOrder: cats.length + 1 },
        });
        id = extractId(created);
        ourCategories = null;
        if (id) log(`  + created category "${mapEntry.create.name}" (${mapEntry.slug}) -> ${id}`);
      }
    }
  }

  // 3) fuzzy name match (strip private/trips/tours noise) - never creates
  if (!id) {
    const strip = (s) => normKey(s).replace(/\b(private|trips?|tours?)\b/g, "").replace(/\s+/g, " ").trim();
    const want = strip(label);
    const wantPrivate = /private/i.test(label);
    const cands = cats.filter((c) => /private/i.test(c.name) === wantPrivate);
    const hit = cands.find((c) => strip(c.name) === want) || cands.find((c) => want && (strip(c.name).includes(want) || want.includes(strip(c.name))));
    if (hit) id = hit.id;
  }

  resolvedCategoryIds[key] = id;
  return id;
}

// ---- existing-excursion recovery (state can be lost on disk-full) ----
async function findExistingIdBySlug(type, slug) {
  const base = type === "group" ? "/admin/excursions/group" : "/private-excursions";
  for (let page = 1; page <= 10; page++) {
    const j = await req("GET", `${BASE_URL}${base}?page=${page}&pageSize=100&lang=en&currency=USD`);
    const map = collectSlugIds(j);
    if (map.has(slug)) return map.get(slug);
    const items = j?.data?.items || j?.data?.data || (Array.isArray(j?.data) ? j.data : []);
    if (!Array.isArray(items) || items.length < 100) break;
  }
  return null;
}

async function existingImageCount(id) {
  try {
    const j = await req("GET", `${BASE_URL}/admin/excursions/${id}/images`);
    const arr = j?.data || j || [];
    return Array.isArray(arr) ? arr.length : 0;
  } catch { return 0; }
}

// ---- per-trip pipeline ----
async function seedTrip(trip) {
  const stateKey = `${trip.type}/${trip.slug}`;
  if (STATE[stateKey] && !OPTS.force) {
    log(`  = skip (already seeded as ${STATE[stateKey]})`);
    return { status: "skipped", id: STATE[stateKey] };
  }

  const categoryId = await resolveCategoryId(trip.category, trip.slug);
  const create = { ...trip.create };
  delete create.categorySlug;
  create.categoryId = categoryId || "";

  if (OPTS.dryRun) {
    log(`  [dry-run] label="${String(trip.category).slice(0, 40)}" -> categoryId=${categoryId || "(UNRESOLVED)"}`);
    return { status: "dry-run", id: null };
  }

  if (!categoryId) {
    log(`  ! unresolved category "${String(trip.category).slice(0, 50)}" -> skip (fix data/override)`);
    return { status: "failed", id: null, reason: "no-category" };
  }

  // 1. create (or recover) excursion
  let ourId = STATE[stateKey];
  let recovered = false;
  if (!ourId) {
    // both endpoints expect excursionType as a translation OBJECT (LocalizedText /
    // TranslationInputDto); do NOT stringify. Group is sent flat too.
    const payload = create;
    const endpoint = trip.type === "group" ? `/admin/excursions/group?lang=en` : `/private-excursions?lang=en`;
    try {
      const created = await req("POST", `${BASE_URL}${endpoint}`, { json: payload });
      ourId = extractId(created);
      if (!ourId) throw new Error(`create returned no id: ${JSON.stringify(created).slice(0, 200)}`);
      log(`  + created ${trip.type} ${trip.slug} -> ${ourId}`);
    } catch (e) {
      const exists = /already exists/i.test(e.message || "");
      if (e.status === 400 && exists) {
        ourId = await findExistingIdBySlug(trip.type, trip.slug);
        if (!ourId) throw e;
        recovered = true;
        log(`  * recovered existing ${trip.type} ${trip.slug} -> ${ourId}; updating category`);
      } else throw e;
    }
    if (ourId) { STATE[stateKey] = ourId; saveState(STATE); }
  } else {
    recovered = true;
    log(`  . reuse existing ${trip.type} id ${ourId} (--force)`);
  }

  // when recovered/reused, best-effort PUT-update to correct fields (esp. categoryId) - non-fatal.
  // NOTE: the group update DTO expects excursionType as a STRING; the private update DTO
  // expects it as a translation OBJECT.
  if (recovered) {
    try {
      const payload = trip.type === "group" ? { ...create, excursionType: create.excursionType?.en || "" } : create;
      const endpoint = trip.type === "group" ? `/admin/excursions/${ourId}?lang=en` : `/private-excursions/${ourId}?lang=en`;
      await req("PUT", `${BASE_URL}${endpoint}`, { json: payload });
      log(`  * updated core fields (categoryId=${create.categoryId})`);
    } catch (e) {
      log(`  ! update core fields failed (non-fatal): ${e.message}`);
    }
  }

  const enrich = { details: false, hero: false, gallery: 0, faqs: 0, errors: [] };

  // 2. details (POST create; fall back to PUT update if it already exists)
  try {
    const details = {
      excursionId: ourId,
      highlights: la(toArray(trip.content.highlights)),
      includes: la(toArray(trip.content.includes)),
      excludes: la(toArray(trip.content.excludes)),
      whatToBring: la(toArray(trip.content.whatToBring)),
      cancellationPolicy: la(toArray(trip.content.cancellationPolicy)),
      literally: { en: [], de: [], ru: [], fr: [] },
    };
    try {
      await req("POST", `${BASE_URL}/excursions-details/excursion/${ourId}?lang=en`, { json: details });
    } catch (e) {
      if (/already exists|409|400/i.test(e.message || "")) await req("PUT", `${BASE_URL}/excursions-details/excursion/${ourId}?lang=en`, { json: details });
      else throw e;
    }
    enrich.details = true;
  } catch (e) {
    enrich.errors.push(`details: ${e.message}`);
  }

  // 3. images
  if (OPTS.images) {
    const heroPath = trip.images?.hero?.path;
    const heroExt = heroPath ? path.extname(heroPath).toLowerCase() : "";
    const heroUsable = !!(heroPath && ALLOWED_EXT.has(heroExt) && fs.existsSync(path.join(ROOT, heroPath)));
    if (heroPath && !heroUsable) log(`  . hero not uploadable (ext=${heroExt || "n/a"} or missing) -> use gallery[0] as primary`);

    if (heroUsable) {
      try {
        await uploadImage(`/admin/excursions/${ourId}/hero-image`, heroPath, `${trip.slug}-hero${heroExt}`);
        enrich.hero = true;
      } catch (e) { enrich.errors.push(`hero: ${e.message}`); }
    }

    const gallery = trip.images?.gallery || [];
    const already = await existingImageCount(ourId);
    if (already > 0 && !OPTS.force) {
      log(`  . gallery skipped (already ${already} image(s) on server)`);
    } else {
      for (let i = 0; i < gallery.length; i++) {
        const g = gallery[i];
        if (!g?.path || !fs.existsSync(path.join(ROOT, g.path))) continue;
        if (!ALLOWED_EXT.has(path.extname(g.path).toLowerCase())) continue;
        try {
          const isPrimary = !heroUsable && i === 0 ? "true" : "false";
          await uploadImage(`/admin/excursions/${ourId}/images?isPrimary=${isPrimary}`, g.path, `${trip.slug}-gallery-${i}${path.extname(g.path)}`);
          enrich.gallery++;
        } catch (e) { enrich.errors.push(`gallery[${i}]: ${e.message}`); }
      }
    }
  }

  // 4. faqs (only if none exist, to avoid dupes on recovery)
  const faqs = trip.content?.faqs || [];
  if (faqs.length) {
    for (let i = 0; i < faqs.length; i++) {
      const f = faqs[i];
      try {
        await req("POST", `${BASE_URL}/admin/excursions/${ourId}/faqs`, {
          json: { displayOrder: (f.displayOrder ?? i + 1), isActive: true, question: lt(f.question), answer: lt(f.answer) },
        });
        enrich.faqs++;
      } catch (e) { enrich.errors.push(`faq[${i}]: ${e.message}`); }
    }
  }

  log(`  ~ enrich details=${enrich.details} hero=${enrich.hero} gallery=${enrich.gallery} faqs=${enrich.faqs}${enrich.errors.length ? " errors=" + enrich.errors.length : ""}`);
  if (enrich.errors.length) enrich.errors.forEach((er) => log(`      ! ${er}`));
  return { status: recovered ? "recovered" : "created", id: ourId, enrich };
}

// ---- load trips ----
function readTrips(type) {
  const dir = path.join(ROOT, "dataEntry", "trips", type);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".json")).map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")));
}

const CATEGORYMAP_PATH = path.join(ROOT, "dataEntry", "categoryMap.json");

async function main() {
  if (!TOKEN) { console.error("ERROR: ADMIN_TOKEN env var is required."); process.exit(1); }
  log(`BASE_URL=${BASE_URL}  type=${OPTS.type}  dryRun=${OPTS.dryRun}  force=${OPTS.force}  images=${OPTS.images}`);

  await fetchCategories();
  log(`our categories: ${ourCategories.length} (${ourCategories.map((c) => c.slug).join(", ")})`);

  const types = OPTS.type === "all" ? ["group", "private"] : [OPTS.type];
  const summary = { created: 0, recovered: 0, skipped: 0, failed: 0, dryRun: 0 };

  for (const type of types) {
    let trips = readTrips(type);
    if (OPTS.only) trips = trips.filter((t) => t.slug === OPTS.only);
    if (Number.isFinite(OPTS.limit)) trips = trips.slice(0, OPTS.limit);
    log(`\n== ${type}: ${trips.length} trips ==`);
    for (const trip of trips) {
      log(`\n[${type}/${trip.slug}] "${trip.create?.title?.en || trip.slug}"`);
      try {
        const r = await seedTrip(trip);
        if (r.status === "created") summary.created++;
        else if (r.status === "recovered") summary.recovered++;
        else if (r.status === "skipped") summary.skipped++;
        else if (r.status === "dry-run") summary.dryRun++;
        else summary.failed++;
      } catch (e) {
        summary.failed++;
        log(`  ! FAILED ${trip.slug}: ${e.message}`);
      }
    }
  }

  // persist resolved ids back into categoryMap.json
  const cats = await fetchCategories();
  try {
    const mapFile = JSON.parse(fs.readFileSync(CATEGORYMAP_PATH, "utf8"));
    for (const label of Object.keys(mapFile)) {
      const id = resolvedCategoryIds[normKey(label)] || mapFile[label]?.ourId || null;
      const slug = id ? cats.find((c) => c.id === id)?.slug || mapFile[label]?.ourSlug : mapFile[label]?.ourSlug || null;
      mapFile[label] = { ourId: id, ourSlug: slug };
    }
    if (!OPTS.dryRun) fs.writeFileSync(CATEGORYMAP_PATH, JSON.stringify(mapFile, null, 2), "utf8");
  } catch { /* categoryMap optional */ }

  log(`\n==== DONE ====`);
  log(`created=${summary.created} recovered=${summary.recovered} skipped=${summary.skipped} dryRun=${summary.dryRun} failed=${summary.failed}`);
  if (!OPTS.dryRun) log(`state file: ${path.relative(ROOT, STATE_PATH)} (resume; delete to re-seed)`);
}

main().catch((e) => { console.error("FATAL:", e); process.exit(1); });
