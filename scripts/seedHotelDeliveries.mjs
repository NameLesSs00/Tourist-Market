#!/usr/bin/env node
/**
 * Phase 2: seed the Hotel Deliveries data collected by scrapeHotelDeliveries.mjs
 * (dataEntry/hotelCategories.json + hotelProducts.json + images) into the backend.
 *
 * Per the collected data this script, in order:
 *   1. ensures the 11 product categories (matches existing ones by normalized EN name)
 *   2. ensures the 24 subcategories (localized EN/DE/FR/RU names; reuse by name incl.
 *      singular/plural tolerance; uploads the scraped subcategory cover image once)
 *   3. creates the 384 products (title/price/priceFor localized; description HTML parsed
 *      into keys[] sections; subtitle = first sentence of the EN description)
 *   4. uploads hero + gallery images (multipart POST /products/{id}/images)
 *
 * Products already present (matched by normalized EN title) are SKIPPED and reported,
 * never silently overwritten (the backend already holds a few hand-made demo items).
 * de/fr/ru names that the reference site lacks fall back to English (translated later
 * through the admin UI, same behavior as fillMissingProductLanguages).
 *
 * Auth: reads ADMIN_TOKEN from env (never hardcoded). Base URL from API_BASE_URL
 * (defaults to the sandbox used by clientApi/apiConfig.ts). GETs are public and also
 * run under --dry-run; POSTs are skipped there.
 *
 * Usage:
 *   ADMIN_TOKEN=<jwt> node scripts/seedHotelDeliveries.mjs \
 *     [--stage all|cats|subs|products|images] [--limit N] [--only <slug|srcId>] \
 *     [--dry-run] [--force] [--no-images]
 *
 * State (resume/idempotency): dataEntry/.seed-hotel-state.json
 */

import * as cheerio from "cheerio";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const BASE_URL = (process.env.API_BASE_URL || "https://touristtt.runasp.net/api").replace(/\/+$/, "");
// Token from env, else a gitignored dataEntry/.admin-token file (dataEntry is ignored).
function readToken() {
  if (process.env.ADMIN_TOKEN) return process.env.ADMIN_TOKEN.trim();
  const f = path.join(ROOT, "dataEntry", ".admin-token");
  try { return fs.readFileSync(f, "utf8").trim(); } catch { return ""; }
}
const TOKEN = readToken();

const OUT = path.join(ROOT, "dataEntry");
const STATE_PATH = path.join(OUT, ".seed-hotel-state.json");
const LOG_FILE = path.join(OUT, "hotel-seed.log");
const FAILURE_PATH = path.join(OUT, ".seed-hotel-failures.json");

const ALLOWED_EXT = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".jfif"]);

// ---- CLI ----
function parseArgs(argv) {
  const opts = { stage: "all", limit: Infinity, only: null, dryRun: false, force: false, images: true, emitPayload: null, validate: false, keyIds: "omit", syncPreexisting: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--stage") opts.stage = argv[++i];
    else if (a === "--limit") opts.limit = Number(argv[++i]);
    else if (a === "--only") opts.only = argv[++i];
    else if (a === "--dry-run") opts.dryRun = true;
    else if (a === "--force") opts.force = true;
    else if (a === "--no-images") opts.images = false;
    else if (a === "--emit-payload") opts.emitPayload = argv[++i];
    else if (a === "--validate") opts.validate = true;
    else if (a === "--key-ids") opts.keyIds = argv[++i]; // zero | omit | null (PUT semantics differ)
    else if (a === "--sync-preexisting") opts.syncPreexisting = true;
  }
  return opts;
}
const OPTS = parseArgs(process.argv.slice(2));

// ---- helpers ----
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const logLines = [];
function log(...a) {
  const line = a.join(" ");
  logLines.push(line);
  console.log(line);
}
const normKey = (s) => String(s || "").trim().toLowerCase().replace(/\s+/g, " ").replace(/[.,;:!]+$/g, "");
const singularize = (s) => (s.endsWith("ies") ? s.slice(0, -3) + "y" : s.endsWith("ses") ? s.slice(0, -2) : s.endsWith("s") && s.length > 4 ? s.slice(0, -1) : s);
const nameKeys = (s) => {
  const n = normKey(s);
  return new Set([n, singularize(n)]);
};
const intersects = (a, b) => [...a].some((x) => b.has(x));

function isTransient(err) {
  const code = err?.cause?.code || err?.code || "";
  return /TIMEOUT|ECONNRESET|ECONNREFUSED|EAI_AGAIN|UND_ERR|SocketError|ETIMEDOUT/i.test(String(code) + " " + String(err?.message));
}

async function req(method, url, { json, form } = {}, attempt = 0) {
  const headers = { Accept: "application/json" };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
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
    const detail = parsed?.errors || parsed?.validationErrors || parsed?.data || parsed;
    const msg = parsed?.message || (typeof detail === "object" ? JSON.stringify(detail) : detail) || text;
    const e = new Error(`HTTP ${res.status} on ${method} ${url}: ${typeof msg === "object" ? JSON.stringify(msg) : String(msg).slice(0, 500)}`);
    e.status = res.status;
    e.body = parsed;
    throw e;
  }
  return parsed;
}

const numId = (obj) => {
  const seen = [obj?.id, obj?.data?.id, obj?.data?.data?.id];
  const v = seen.find((x) => typeof x === "number" || (typeof x === "string" && /^\d+$/.test(x)));
  return v === undefined ? null : Number(v);
};

function mimeFor(file) {
  const ext = path.extname(file).toLowerCase();
  return { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".gif": "image/gif", ".bmp": "image/bmp", ".jfif": "image/jpeg" }[ext] || "application/octet-stream";
}

// paged GET of items[] (categories/subcategories/products)
async function listAll(endpoint, extraParams = {}) {
  const items = [];
  let page = 1;
  for (;;) {
    const qs = new URLSearchParams({ lang: "en", language: "en", pageNumber: String(page), pageSize: "100", ...extraParams });
    const j = await req("GET", `${BASE_URL}${endpoint}?${qs}`);
    const d = j?.data || {};
    items.push(...(d.items || []));
    if (!d.hasNextPage) break;
    page++;
    await sleep(150);
  }
  return items;
}

// ---- localized text builders ----
const lt = (obj) => ({
  en: String(obj?.en || "").trim(),
  de: String(obj?.de || obj?.en || "").trim(),
  fr: String(obj?.fr || obj?.en || "").trim(),
  ru: String(obj?.ru || obj?.en || "").trim(),
});

function pickSubtitle(p, keys) {
  // Prefer the leading marketing heading captured as the first key section's name
  // (clean, no run-on). Fall back to subcategory EN name when there is none.
  const first = keys?.[0]?.name?.en;
  if (first && first !== "Description") return first;
  return p.subcategoryName?.en || "";
}

// ---- description HTML -> keys[] sections ----
// Headings are h1-h6 or full paragraphs dominated by a <strong> ending with ":".
// Everything between two headings becomes the section's values (list items split).
function parseDescToSections(html) {
  if (!html) return [];
  const $ = cheerio.load(`<div id="r">${html}</div>`);
  const sections = [];
  let cur = { name: "Description", blocks: [] };
  const flush = () => { if (cur.blocks.length) sections.push(cur); };
  $("#r").children().each((_, el) => {
    const $el = $(el);
    const tag = (el.name || "").toLowerCase();
    const text = $el.text().replace(/\s+/g, " ").trim();
    if (!text) return;
    const $strong = $el.find("strong, b").first();
    // a real heading is short; long text inside h1-h6 is a styled paragraph (e.g. the whole
    // description wrapped in <h3><strong>), so it must stay body content instead of a section name
    const headingLike =
      text.length <= 120 &&
      (/^h[1-6]$/.test(tag) ||
        ($strong.length && /\:$/.test($strong.text().trim()) && normKey($strong.text()) === normKey(text)));
    if (headingLike) {
      flush();
      const raw = ($strong.length ? $strong.text() : text).replace(/\s+/g, " ").trim();
      const cleaned = raw.replace(/^\d+[.)\-]\s*/, "").replace(/[:.\s]+$/g, "").trim() || "Description";
      const name = cleaned.length > 120 ? cleaned.slice(0, 120).replace(/\s+\S*$/, "").trim() : cleaned;
      cur = { name, blocks: [] };
      const rest = text.replace($strong.length ? $strong.text() : text, "").trim();
      if (rest) cur.blocks.push(rest);
      return;
    }
    if (tag === "ul" || tag === "ol") {
      $el.children("li").each((_, li) => {
        const t = $(li).text().replace(/\s+/g, " ").trim();
        if (t) cur.blocks.push(t);
      });
      return;
    }
    cur.blocks.push(text);
  });
  flush();
  return sections;
}

// Backend rule: no single translation string may exceed MAX_TRANS chars (HTTP 400
// "<Language> translation cannot exceed 500 characters"). Long description paragraphs are
// therefore split into consecutive values at sentence boundaries instead of being cut.
const MAX_TRANS = 500;

function splitLong(text, max = MAX_TRANS) {
  const t = String(text || "").trim();
  if (!t) return [];
  if (t.length <= max) return [t];
  const chunks = [];
  let rest = t;
  while (rest.length > max) {
    const window = rest.slice(0, max);
    // cut at the last sentence / clause / word boundary inside the window
    const cut =
      Math.max(window.lastIndexOf(". "), window.lastIndexOf("! "), window.lastIndexOf("? "), window.lastIndexOf("; "));
    const space = window.lastIndexOf(" ");
    const at = cut > max * 0.5 ? cut + 1 : space > 0 ? space : max;
    chunks.push(rest.slice(0, at).trim());
    rest = rest.slice(at).trim();
  }
  if (rest) chunks.push(rest);
  return chunks.filter(Boolean);
}

// id field variant expected by the backend when (re)creating keys.
// IMPORTANT: sending id=0 on PUT makes the backend delete the existing keys and then skip the
// insert (product ends up with keys=[]). Omitting the id inserts cleanly on both POST and PUT.
const keyId = () => (OPTS.keyIds === "omit" ? undefined : OPTS.keyIds === "null" ? null : 0);
const withId = (o) => { const id = keyId(); return id === undefined ? o : { id, ...o }; };

// Build localized keys[] (ProductKeyUpsertItem shape) from the 4 description HTMLs.
function buildKeys(p) {
  const perLang = {
    en: parseDescToSections(p.descriptionHtml?.en),
    de: parseDescToSections(p.descriptionHtml?.de),
    fr: parseDescToSections(p.descriptionHtml?.fr),
    ru: parseDescToSections(p.descriptionHtml?.ru),
  };
  const en = perLang.en;
  if (!en.length) return [];
  // paragraphs of every language pre-split to the backend length limit
  const parts = {};
  for (const l of ["en", "de", "fr", "ru"]) {
    parts[l] = perLang[l].map((sec) => ({
      name: sec.name,
      blocks: sec.blocks.flatMap((b) => splitLong(b)),
    }));
  }
  // a language is usable only when its structure still lines up with EN section-by-section
  const aligned = (l) =>
    parts[l].length === parts.en.length &&
    parts[l].every((sec, i) => sec.blocks.length === parts.en[i].blocks.length);
  const usedLangs = ["de", "fr", "ru"].filter(aligned);

  return parts.en.map((sec, idx) => {
    const nameLoc = { en: sec.name, de: sec.name, fr: sec.name, ru: sec.name };
    if (usedLangs.length) for (const l of usedLangs) nameLoc[l] = parts[l][idx].name || sec.name;
    return withId({
      displayOrder: idx + 1,
      name: nameLoc,
      values: sec.blocks.slice(0, 60).map((block, vi) => {
        const vLoc = { en: block, de: block, fr: block, ru: block };
        if (usedLangs.length) for (const l of usedLangs) vLoc[l] = parts[l][idx].blocks[vi] || block;
        return withId({ displayOrder: vi + 1, value: vLoc });
      }),
    });
  });
}

// Last safety net before sending: hard-truncate anything still over the limit.
function clampTranslations(body, slug) {
  let fixed = 0;
  const clip = (o, k) => {
    if (o && typeof o[k] === "string" && o[k].length > MAX_TRANS) {
      o[k] = o[k].slice(0, MAX_TRANS - 1).replace(/\s+\S*$/, "") + "\u2026";
      fixed++;
    }
  };
  for (const node of [body.title, body.subtitle, body.priceFor]) {
    for (const l of ["en", "de", "fr", "ru"]) clip(node, l);
  }
  for (const k of body.keys || []) {
    for (const l of ["en", "de", "fr", "ru"]) clip(k.name, l);
    for (const v of k.values || []) for (const l of ["en", "de", "fr", "ru"]) clip(v.value, l);
  }
  if (fixed) log(`  [${slug}] ~ clamped ${fixed} over-length translation string(s)`);
  return body;
}

// ---- state ----
function loadState() {
  try { return JSON.parse(fs.readFileSync(STATE_PATH, "utf8")); } catch { return {}; }
}
function saveState(state) {
  if (OPTS.dryRun) return; // never let a dry run touch the real resume state
  try { fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), "utf8"); }
  catch (e) { log(`  ! state persist failed (${e.code || e.message}); continuing`); }
}

// ---- stage 1: categories ----
async function ensureCategories(cats, state) {
  log("== Stage 1: categories ==");
  const existing = await listAll("/Productcategories");
  const byNorm = new Map();
  for (const c of existing) byNorm.set(normKey(c.name), c);
  state.categories = state.categories || {};

  let created = 0, reused = 0;
  for (let i = 0; i < cats.length; i++) {
    const c = cats[i];
    const hit = byNorm.get(normKey(c.nameEn));
    if (hit) {
      state.categories[String(c.id)] = { backendId: hit.id, nameEn: c.nameEn, reused: true };
      reused++;
      log(`  [cat ${c.id}] "${c.nameEn}" -> reuse existing id=${hit.id}`);
    } else if (OPTS.dryRun) {
      log(`  [cat ${c.id}] "${c.nameEn}" -> WOULD CREATE`);
      state.categories[String(c.id)] = { backendId: -(c.id + 1000), nameEn: c.nameEn, wouldCreate: true };
      created++;
    } else {
      const j = await req("POST", `${BASE_URL}/Productcategories`, {
        json: { name: { en: c.nameEn, de: c.nameEn, fr: c.nameEn, ru: c.nameEn }, displayOrder: i },
      });
      const id = numId(j);
      if (!id) throw new Error(`category create returned no id: ${JSON.stringify(j).slice(0, 200)}`);
      state.categories[String(c.id)] = { backendId: id, nameEn: c.nameEn, reused: false };
      created++;
      log(`  [cat ${c.id}] "${c.nameEn}" -> created id=${id}`);
      saveState(state);
      await sleep(250);
    }
  }
  log(`  categories: reused=${reused} created=${created}${OPTS.dryRun ? " (dry-run)" : ""}`);
  saveState(state);
}

// ---- stage 2: subcategories (+ cover images) ----
async function ensureSubcategories(cats, state) {
  log("== Stage 2: subcategories ==");
  const existing = await listAll("/subcategories");
  const byCat = new Map(); // backendCategoryId -> items[]
  for (const s of existing) {
    const arr = byCat.get(s.categoryId) || [];
    arr.push(s);
    byCat.set(s.categoryId, arr);
  }
  state.subcategories = state.subcategories || {};
  state.subImages = state.subImages || {};

  let created = 0, reused = 0;
  for (const c of cats) {
    const backendCat = state.categories?.[String(c.id)]?.backendId;
    if (!backendCat) { log(`  ! cat ${c.id} has no backend id yet; skip its subs`); continue; }
    const pool = (byCat.get(backendCat) || []).slice();
    for (let i = 0; i < c.subcategories.length; i++) {
      const sub = c.subcategories[i];
      const subKey = `${c.id}/${sub.slug || sub.id}`;
      const want = nameKeys(sub.name.en);
      const hit = pool.find((s) => intersects(nameKeys(s.name), want));
      if (hit) {
        state.subcategories[subKey] = { backendId: hit.id, nameEn: sub.name.en, reused: true };
        reused++;
        log(`  [sub ${sub.id}] "${sub.name.en}" (cat ${c.id}) -> reuse id=${hit.id}`);
      } else if (OPTS.dryRun) {
        log(`  [sub ${sub.id}] "${sub.name.en}" (cat ${c.id}) -> WOULD CREATE`);
        state.subcategories[subKey] = { backendId: -(sub.id + 2000), nameEn: sub.name.en, wouldCreate: true };
        created++;
      } else {
        const j = await req("POST", `${BASE_URL}/subcategories`, {
          json: { name: lt(sub.name), displayOrder: i, categoryId: backendCat },
        });
        const id = numId(j);
        if (!id) throw new Error(`subcategory create returned no id: ${JSON.stringify(j).slice(0, 200)}`);
        state.subcategories[subKey] = { backendId: id, nameEn: sub.name.en, reused: false };
        created++;
        log(`  [sub ${sub.id}] "${sub.name.en}" (cat ${c.id}) -> created id=${id}`);
        pool.push({ id, name: sub.name.en, categoryId: backendCat });
        saveState(state);
        await sleep(250);
      }
      // cover image (once per sub, only when newly created or --force)
      const st = state.subcategories[subKey];
      const imgDone = state.subImages[String(st.backendId)];
      if (OPTS.images && sub.imagePath && !imgDone && (!st.reused || OPTS.force) && !OPTS.dryRun) {
        const abs = path.join(ROOT, sub.imagePath);
        if (fs.existsSync(abs) && ALLOWED_EXT.has(path.extname(abs).toLowerCase())) {
          const form = new FormData();
          form.append("file", new File([fs.readFileSync(abs)], path.basename(abs), { type: mimeFor(abs) }));
          try {
            await req("POST", `${BASE_URL}/subcategories/${st.backendId}/image`, { form });
            state.subImages[String(st.backendId)] = true;
            log(`    + cover image -> sub ${st.backendId}`);
          } catch (e) {
            log(`    ! cover image failed for sub ${st.backendId}: ${e.message}`);
          }
          saveState(state);
          await sleep(200);
        }
      }
    }
  }
  log(`  subcategories: reused=${reused} created=${created}${OPTS.dryRun ? " (dry-run)" : ""}`);
  saveState(state);
}

// ---- stage 3: products ----
function productPayload(p, backendSubId) {
  const keys = buildKeys(p);
  const sub = pickSubtitle(p, keys);
  return {
    title: lt(p.title),
    subtitle: { en: sub, de: sub, fr: sub, ru: sub },
    price: Number(p.priceUsd || 0),
    priceFor: lt(p.priceFor),
    subCategoryId: backendSubId,
    keys,
  };
}

async function ensureProducts(products, cats, state) {
  log("== Stage 3: products ==");
  // sub id lookup for the source row
  const subKeyFor = (p) => {
    const cat = cats.find((c) => c.slug === p.categorySlug);
    if (!cat) return null;
    const sub = cat.subcategories.find((s) => s.slug === p.subcategorySlug || s.id === p.subCategoryId);
    if (!sub) return null;
    return `${cat.id}/${sub.slug || sub.id}`;
  };

  const existing = await listAll("/products");
  const existingByTitle = new Map();
  for (const e of existing) existingByTitle.set(normKey(e.title), e);

  state.products = state.products || {};
  state.productImages = state.productImages || {};

  let created = 0, skipped = 0, missingSub = 0, failed = 0;
  const failures = [];
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    if (OPTS.only && p.slug !== OPTS.only && String(p.srcId) !== String(OPTS.only)) continue;
    if (created + skipped + missingSub + failed >= OPTS.limit) break;

    const subKey = subKeyFor(p);
    let subId = subKey ? state.subcategories?.[subKey]?.backendId : null;
    if (!subId) {
      // source-side drift (subcategory not in the mapped tree): fall back to the category's first sub
      const cat = cats.find((c) => c.slug === p.categorySlug);
      const altSub = cat?.subcategories?.[0];
      const altKey = altSub ? `${cat.id}/${altSub.slug || altSub.id}` : null;
      subId = altKey ? state.subcategories?.[altKey]?.backendId : null;
      if (subId) log(`  [${p.slug}] ~ sub "${p.subcategorySlug}" not in tree; using "${altSub.name?.en}" id=${subId}`);
    }
    if (!subId) {
      missingSub++;
      log(`  [${p.slug}] ! no backend subcategory (cat=${p.categorySlug}); skipped`);
      continue;
    }

    try {
      await createOne(p, subId, existingByTitle.get(normKey(p.title.en)));
    } catch (e) {
      // a per-product rejection must never abort the whole run
      if (e.status && e.status < 500) {
        failed++;
        failures.push({ slug: p.slug, srcId: p.srcId, status: e.status, body: e.body ?? null, payload: e.payload ?? null });
        log(`  [${p.slug}] ! HTTP ${e.status} rejected: ${e.message}`);
        if (e.body) log(`      body: ${JSON.stringify(e.body).slice(0, 900)}`);
      } else {
        throw e;
      }
    }

    if ((i + 1) % 25 === 0) log(`  progress: ${i + 1}/${products.length} (created=${created} skipped=${skipped} failed=${failed})`);
    await sleep(200);
  }

  async function createOne(p, subId, dup) {
    const mapped = state.products?.[String(p.srcId)];
    const existingId = mapped?.backendId || dup?.id || null;
    const shouldUpdate = OPTS.force && existingId;

    // a backend item that predates seeding was made by hand: never overwrite it, even with --force
    if (mapped?.existedBefore && !OPTS.syncPreexisting) {
      skipped++;
      log(`  [${p.slug}] = pre-existing hand-made item (id=${existingId}); left untouched (--sync-preexisting to overwrite)`);
      return;
    }

    // already seeded / title exists and not forcing -> leave untouched
    if ((mapped && !OPTS.force) || (dup && !OPTS.force)) {
      skipped++;
      if (dup && !mapped) state.products[String(p.srcId)] = { backendId: dup.id, titleEn: p.title.en, existedBefore: true };
      log(`  [${p.slug}] = exists (id=${existingId}); left untouched (use --force to update)`);
      return;
    }

    if (OPTS.dryRun) {
      created++;
      state.products[String(p.srcId)] = { backendId: existingId || -(p.srcId + 3000), titleEn: p.title.en, wouldCreate: !existingId };
      log(`  [${p.slug}] -> WOULD ${existingId ? "UPDATE id=" + existingId : "CREATE"} $${p.priceUsd} "${p.title.en}" (sub=${subId}, keys=${buildKeys(p).length})`);
      return;
    }

    const body = clampTranslations(productPayload(p, subId), p.slug);
    let id;
    try {
      if (shouldUpdate) {
        await req("PUT", `${BASE_URL}/products/${existingId}`, { json: body });
        id = existingId;
        log(`  [${p.slug}] -> updated id=${id} $${p.priceUsd}`);
      } else {
        const j = await req("POST", `${BASE_URL}/products`, { json: body });
        id = numId(j);
        if (!id) throw new Error(`product create returned no id for ${p.slug}: ${JSON.stringify(j).slice(0, 200)}`);
        log(`  [${p.slug}] -> created id=${id} $${p.priceUsd}`);
      }
    } catch (e) {
      if (e.status) e.payload = body; // let the caller record what was sent
      throw e;
    }
    created++;
    state.products[String(p.srcId)] = { backendId: id, titleEn: p.title.en };
    saveState(state);
  }

  if (failures.length) {
    try {
      fs.writeFileSync(FAILURE_PATH, JSON.stringify(failures, null, 2), "utf8");
      log(`  ! ${failures.length} product(s) rejected -> ${FAILURE_PATH}`);
    } catch { /* logging only */ }
  }
  log(`  products: created=${created} skipped(existing/state)=${skipped} missingSub=${missingSub} failed=${failed}${OPTS.dryRun ? " (dry-run)" : ""}`);
  saveState(state);
}

// ---- stage 4: product images ----
async function uploadProductImages(products, state) {
  log("== Stage 4: product images ==");
  state.products = state.products || {};
  state.productImages = state.productImages || {};
  let uploaded = 0, done = 0, failed = 0, skipped = 0;

  for (const p of products) {
    if (OPTS.only && p.slug !== OPTS.only && String(p.srcId) !== String(OPTS.only)) continue;
    const seeded = state.products[String(p.srcId)];
    if (!seeded?.backendId || seeded.existedBefore) { skipped++; continue; }
    const key = String(seeded.backendId);
    if (state.productImages[key] && !OPTS.force) { done++; continue; }

    const files = [p.heroPath, ...p.galleryPaths].filter(Boolean)
      .map((rel) => path.join(ROOT, rel))
      .filter((abs) => fs.existsSync(abs) && ALLOWED_EXT.has(path.extname(abs).toLowerCase()));
    if (!files.length) { skipped++; continue; }
    if (OPTS.dryRun) { uploaded++; log(`  [${p.slug}] -> WOULD UPLOAD ${files.length} image(s) -> product ${key}`); continue; }

    const form = new FormData();
    for (const abs of files) {
      form.append("files", new File([fs.readFileSync(abs)], path.basename(abs), { type: mimeFor(abs) }));
    }
    try {
      await req("POST", `${BASE_URL}/products/${key}/images`, { form });
      state.productImages[key] = { count: files.length, at: new Date().toISOString() };
      uploaded++;
      saveState(state);
    } catch (e) {
      failed++;
      log(`  ! images failed for product ${key} (${p.slug}): ${e.message}`);
    }
    await sleep(250);
  }
  log(`  images: uploaded=${uploaded} alreadyDone=${done} skipped=${skipped} failed=${failed}${OPTS.dryRun ? " (dry-run)" : ""}`);
  saveState(state);
}

// ---- main ----
async function main() {
  if (!fs.existsSync(path.join(OUT, "hotelProducts.json"))) {
    throw new Error("dataEntry/hotelProducts.json missing - run scrapeHotelDeliveries.mjs first");
  }
  if (!OPTS.dryRun && !TOKEN) {
    throw new Error("ADMIN_TOKEN env var is required for live seeding (use --dry-run for a read-only preview)");
  }

  const cats = JSON.parse(fs.readFileSync(path.join(OUT, "hotelCategories.json"), "utf8"));
  const productsMap = JSON.parse(fs.readFileSync(path.join(OUT, "hotelProducts.json"), "utf8"));
  const products = Object.values(productsMap);

  if (OPTS.validate) {
    // offline contract check: no payload string may exceed the backend translation limit
    let offenders = 0, longest = 0, noKeys = 0;
    for (const p of products) {
      const body = productPayload(p, 1);
      const strs = [
        body.title, body.subtitle, body.priceFor,
        ...(body.keys || []).flatMap((k) => [k.name, ...(k.values || []).map((v) => v.value)]),
      ];
      let bad = false;
      for (const node of strs) {
        for (const l of ["en", "de", "fr", "ru"]) {
          const len = String(node?.[l] || "").length;
          if (len > longest) longest = len;
          if (len > MAX_TRANS) bad = true;
        }
      }
      if (!body.keys.length) noKeys++;
      if (bad) { offenders++; log(`  ! ${p.slug} has >${MAX_TRANS} string(s)`); }
    }
    console.log(`VALIDATE: ${products.length} products, offenders=${offenders}, longestString=${longest}, noKeys=${noKeys}`);
    return;
  }

  if (OPTS.emitPayload) {
    const p = products.find((x) => x.slug === OPTS.emitPayload || String(x.srcId) === String(OPTS.emitPayload));
    if (!p) throw new Error(`no product for --emit-payload ${OPTS.emitPayload}`);
    const payload = productPayload(p, 1);
    console.log(JSON.stringify(payload, null, 2));
    // diagnostics
    const lens = { titleEn: (payload.title.en||"").length, subtitleEn: (payload.subtitle.en||"").length, priceForEn: (payload.priceFor.en||"").length, keys: payload.keys.length };
    console.log("LEN:", JSON.stringify(lens));
    payload.keys.forEach((k, i) => {
      console.log(`  key[${i}] name.len=${(k.name.en||"").length} values=${k.values.length} emptyName=${!k.name.en?.trim()} emptyVal=${k.values.some(v=>!v.value.en?.trim())}`);
    });
    return;
  }
  log(`Loaded ${cats.length} categories / ${products.length} products from dataEntry/.`);

  const state = loadState();
  const wantStage = (s) => OPTS.stage === "all" || OPTS.stage === s;

  if (wantStage("cats")) await ensureCategories(cats, state);
  if (wantStage("subs")) await ensureSubcategories(cats, state);
  if (wantStage("products")) await ensureProducts(products, cats, state);
  if (wantStage("images") && OPTS.images) await uploadProductImages(products, state);

  log("Done. State:", STATE_PATH);
  if (!OPTS.dryRun) fs.writeFileSync(LOG_FILE, logLines.join("\n") + "\n", "utf8");
}

main().catch((e) => {
  log("FATAL", e?.stack || String(e));
  try { fs.writeFileSync(LOG_FILE, logLines.join("\n") + "\n", "utf8"); } catch {}
  process.exit(1);
});
