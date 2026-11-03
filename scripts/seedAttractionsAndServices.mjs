#!/usr/bin/env node
/**
 * Seed the scraped PRIVATE attractions + extra services into the Tourist Market
 * backend, then link each to its private trips so those trips become bookable.
 *
 * Reads:
 *   dataEntry/privateAttractions.json   (srcId -> {title,description,prices,heroPath,galleryPaths})
 *   dataEntry/privateServices.json      (srcId -> {...})
 *   dataEntry/tripAssignments.json      (tripSlug -> {maxAttractions, attractionSrcIds[], serviceSrcIds[]})
 *   dataEntry/.seed-state.json          (private/<slug> -> our trip GUID, from the trip seed)
 *
 * Backend calls (all with Bearer ADMIN_TOKEN):
 *   create attraction : POST /attractions                      -> {title,description,adultPriceUsd,childPriceUsd,infantPriceUsd,displayOrder}
 *   attraction hero   : POST /attractions/{id}/hero            (multipart file)
 *   attraction gallery: POST /attractions/{id}/images          (multipart files)
 *   create service    : POST /ExcursionServices/options        -> {adultPriceUsd,childPriceUsd,infantPriceUsd,displayOrder,title,description}
 *   service hero      : POST /ExcursionServices/options/{id}/hero
 *   service gallery   : POST /ExcursionServices/options/{id}/images
 *   link attractions  : POST /private-excursions/{tripId}/attractions {attractionIds}
 *   link services     : POST /private-excursions/{tripId}/services   {serviceIds}
 *   set maxAttractions: PUT  /private-excursions/{id} (best-effort)
 *
 * Idempotent + resume-safe via dataEntry/.seed-attractions-state.json.
 *
 * Usage:
 *   ADMIN_TOKEN=<jwt> node scripts/seedAttractionsAndServices.mjs \
 *     [--stage create|link|all] [--limit N] [--only <srcId|tripSlug>] \
 *     [--dry-run] [--force] [--no-images]
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const BASE_URL = (process.env.API_BASE_URL || "https://touristtt.runasp.net/api").replace(/\/+$/, "");
const TOKEN = process.env.ADMIN_TOKEN || "";
const ALLOWED_EXT = new Set([".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".webp", ".jfif"]);

const OUT = path.join(ROOT, "dataEntry");
const ATTRACTIONS_FILE = path.join(OUT, "privateAttractions.json");
const SERVICES_FILE = path.join(OUT, "privateServices.json");
const ASSIGN_FILE = path.join(OUT, "tripAssignments.json");
const TRIP_STATE_FILE = path.join(OUT, ".seed-state.json");
const STATE_PATH = path.join(OUT, ".seed-attractions-state.json");

/* ----------------------------- CLI ----------------------------- */
function parseArgs(argv) {
  const opts = { stage: "all", limit: Infinity, only: null, dryRun: false, force: false, images: true };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--stage") opts.stage = argv[++i];
    else if (a === "--limit") opts.limit = Number(argv[++i]);
    else if (a === "--only") opts.only = argv[++i];
    else if (a === "--dry-run") opts.dryRun = true;
    else if (a === "--force") opts.force = true;
    else if (a === "--no-images") opts.images = false;
  }
  return opts;
}
const OPTS = parseArgs(process.argv.slice(2));

/* ----------------------------- helpers ----------------------------- */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (...a) => console.log(...a);
const lt = (en) => ({ en: en || "", de: "", ru: "", fr: "" });

function isTransient(err) {
  const code = err?.cause?.code || err?.code || "";
  return /TIMEOUT|ECONNRESET|ECONNREFUSED|EAI_AGAIN|UND_ERR|SocketError|ETIMEDOUT/i.test(
    String(code) + " " + String(err?.message)
  );
}

async function req(method, url, { json, form } = {}, attempt = 0) {
  const headers = { Authorization: `Bearer ${TOKEN}`, Accept: "application/json" };
  let body;
  if (form) body = form;
  else if (json !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(json);
  }
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
  try {
    parsed = text ? JSON.parse(text) : {};
  } catch {
    parsed = { raw: text };
  }
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

function mimeFor(file) {
  const ext = path.extname(file).toLowerCase();
  return (
    { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".gif": "image/gif", ".bmp": "image/bmp", ".jfif": "image/jpeg" }[ext] ||
    "application/octet-stream"
  );
}

async function uploadSingle(endpoint, relPath, name) {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs) || fs.statSync(abs).size === 0) throw new Error(`image file missing/empty: ${relPath}`);
  // backend infers format from the filename extension, so always keep it
  const ext = path.extname(abs);
  const safeName = /\.[a-z0-9]+$/i.test(name) ? name : `${name}${ext}`;
  const file = new File([fs.readFileSync(abs)], safeName, { type: mimeFor(abs) });
  const form = new FormData();
  form.append("file", file);
  return req("POST", `${BASE_URL}${endpoint}`, { form });
}

async function uploadMultiple(endpoint, relPaths, nameFor) {
  const valid = relPaths.filter((p) => p && fs.existsSync(path.join(ROOT, p)) && fs.statSync(path.join(ROOT, p)).size > 0);
  if (!valid.length) return null;
  const form = new FormData();
  valid.forEach((p, i) => {
    const file = new File([fs.readFileSync(path.join(ROOT, p))], nameFor(p, i), { type: mimeFor(path.join(ROOT, p)) });
    form.append("files", file);
  });
  return req("POST", `${BASE_URL}${endpoint}`, { form });
}

// upload hero + gallery if allowed; returns counts for logging
async function uploadImages(kindBaseEndpoint, id, entity, nameTag) {
  let hero = false;
  let gallery = 0;
  if (!OPTS.images) return { hero, gallery };
  if (entity.heroPath && ALLOWED_EXT.has(path.extname(entity.heroPath).toLowerCase())) {
    try {
      await uploadSingle(`${kindBaseEndpoint}/hero`, entity.heroPath, `${nameTag}-hero`);
      hero = true;
    } catch (e) {
      log(`    ! hero upload failed (${id}): ${e.message}`);
    }
  }
  if (entity.galleryPaths?.length) {
    const gpaths = entity.galleryPaths.filter((p) => p && ALLOWED_EXT.has(path.extname(p).toLowerCase()));
    try {
      const r = await uploadMultiple(`${kindBaseEndpoint}/images`, gpaths, (p, i) => `${nameTag}-${i}${path.extname(p)}`);
      gallery = r?.images?.length ?? r?.data?.images?.length ?? gpaths.length;
    } catch (e) {
      log(`    ! gallery upload failed (${id}): ${e.message}`);
    }
  }
  return { hero, gallery };
}

/* ----------------------------- state ----------------------------- */
function readJson(file) {
  try {
    const v = JSON.parse(fs.readFileSync(file, "utf8"));
    return v && typeof v === "object" ? v : {};
  } catch {
    return {};
  }
}
function saveState(state) {
  try {
    fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), "utf8");
  } catch (e) {
    log(`  ! could not persist state (${e.code || e.message}); continuing`);
  }
}
const STATE = readJson(STATE_PATH);
const TRIP_STATE = readJson(TRIP_STATE_FILE);

/* ----------------------------- Phase 2: create ----------------------------- */
async function createEntities(kind) {
  const src = readJson(kind === "attraction" ? ATTRACTIONS_FILE : SERVICES_FILE);
  const ids = Object.keys(src);
  const base = kind === "attraction" ? "/attractions" : "/ExcursionServices/options";
  const listEndpoint = kind === "attraction" ? "/attractions" : "/ExcursionServices/options";

  let processed = 0;
  for (let i = 0; i < ids.length; i++) {
    if (processed >= OPTS.limit) break;
    const srcId = ids[i];
    if (OPTS.only && String(srcId) !== String(OPTS.only)) continue;
    processed++;

    const entity = src[srcId];
    const key = `${kind}/${srcId}`;
    if (STATE[key] && OPTS.force && !OPTS.dryRun) {
      // repair mode: reuse the existing backend id, just re-upload images
      const { hero, gallery } = await uploadImages(`${listEndpoint}/${STATE[key]}`, STATE[key], entity, `${kind}-${srcId}`);
      log(`  * ${kind} #${srcId} repaired images on ${STATE[key]} (hero=${hero} gallery=${gallery})`);
      continue;
    }
    if (STATE[key] && !OPTS.force) {
      log(`  = ${kind} #${srcId} already created (${STATE[key]}), skip`);
      continue;
    }

    const body = {
      title: lt(entity.title),
      description: lt(entity.description),
      adultPriceUsd: entity.prices?.adult ?? 0,
      childPriceUsd: entity.prices?.child ?? 0,
      infantPriceUsd: entity.prices?.infant ?? 0,
      displayOrder: i + 1,
    };

    if (OPTS.dryRun) {
      log(`  [dry] POST ${base} "${entity.title}" a${body.adultPriceUsd}/c${body.childPriceUsd}/i${body.infantPriceUsd}`);
      continue;
    }

    let id;
    try {
      const res = await req("POST", `${BASE_URL}${base}`, { json: body });
      id = extractId(res);
      if (!id) throw new Error(`no id in create response: ${JSON.stringify(res).slice(0, 200)}`);
      STATE[key] = id;
      saveState(STATE);
      const { hero, gallery } = await uploadImages(`${listEndpoint}/${id}`, id, entity, `${kind}-${srcId}`);
      log(`  + ${kind} #${srcId} -> ${id} (hero=${hero} gallery=${gallery}) "${entity.title}"`);
    } catch (e) {
      log(`  ! ${kind} #${srcId} FAILED: ${e.message}`);
    }
  }
}

/* ----------------------------- Phase 3: link ----------------------------- */
async function linkTrips() {
  const assign = readJson(ASSIGN_FILE);
  const slugs = Object.keys(assign);
  const attractions = readJson(ATTRACTIONS_FILE);
  const services = readJson(SERVICES_FILE);

  let processed = 0;
  for (const slug of slugs) {
    if (processed >= OPTS.limit) break;
    if (OPTS.only && String(slug) !== String(OPTS.only)) continue;
    processed++;

    const tripId = TRIP_STATE[`private/${slug}`];
    if (!tripId) {
      log(`  ! ${slug}: no trip GUID in .seed-state.json, skip`);
      continue;
    }
    const a = assign[slug] || {};
    const attractionIds = (a.attractionSrcIds || []).map((s) => STATE[`attraction/${s}`]).filter(Boolean);
    const serviceIds = (a.serviceSrcIds || []).map((s) => STATE[`service/${s}`]).filter(Boolean);
    const unmappedAttr = (a.attractionSrcIds || []).length - attractionIds.length;
    const unmappedSvc = (a.serviceSrcIds || []).length - serviceIds.length;

    if (OPTS.dryRun) {
      log(`  [dry] ${slug} trip=${tripId} attractions=${attractionIds.length}(unmapped ${unmappedAttr}) services=${serviceIds.length}(unmapped ${unmappedSvc}) max=${a.maxAttractions}`);
      continue;
    }

    const linkKey = `link/${slug}`;
    if (STATE[linkKey] && !OPTS.force) {
      log(`  = ${slug} already linked, skip (use --force to relink)`);
      continue;
    }

    // backend validates assigned attractions against the trip's maxAttractions,
    // so maxAttractions must be set (>= assigned count) BEFORE assignment.
    const effectiveMax = Math.max(a.maxAttractions || 0, attractionIds.length);
    try {
      await setMaxAttractions(tripId, slug, effectiveMax);

      const aCount = await ensureAssigned(`attractions`, tripId, { attractionIds }, attractionIds.length);
      const sCount = await ensureAssigned(`services`, tripId, { serviceIds }, serviceIds.length);

      if (aCount < attractionIds.length || sCount < serviceIds.length) {
        throw new Error(`confirm mismatch: attractions ${aCount}/${attractionIds.length}, services ${sCount}/${serviceIds.length}`);
      }
      STATE[linkKey] = true;
      saveState(STATE);
      log(`  + linked ${slug}: max=${effectiveMax} attractions=${aCount} services=${sCount}${unmappedAttr || unmappedSvc ? ` (unmapped a${unmappedAttr}/s${unmappedSvc})` : ""}`);
    } catch (e) {
      log(`  ! link ${slug} FAILED: ${e.message}`);
    }
  }
}

// Ensure a trip has the expected attractions/services assigned, confirmed by re-reading
// the trip's list. The backend's assign endpoint is not idempotent on re-POST: sending
// the exact already-assigned set returns a misleading HTTP 400 ("must have at least N ...
// currently N") without changing anything. So we check the live count FIRST and only POST
// when it's short; after any POST (even one that errors) we re-read and accept when the
// persisted count already meets the expectation.
async function readAssignedCount(kind, tripId) {
  const j = await req("GET", `${BASE_URL}/private-excursions/${tripId}/${kind}?lang=en&currency=USD`);
  const arr = Array.isArray(j?.data) ? j.data : Array.isArray(j) ? j : [];
  return arr.length;
}

async function ensureAssigned(kind, tripId, payload, expected) {
  if (expected === 0) return 0;
  let count = await readAssignedCount(kind, tripId);
  if (count >= expected) return count; // already assigned correctly
  for (let attempt = 0; attempt < 3 && count < expected; attempt++) {
    try {
      await req("POST", `${BASE_URL}/private-excursions/${tripId}/${kind}`, { json: payload });
    } catch (e) {
      // re-POST rejection above (or a transient failure); the write may still be present,
      // so fall through to re-read the authoritative count rather than trusting the status.
      log(`    ~ ${kind} POST on ${tripId} returned error: ${e.message}; re-reading`);
    }
    count = await readAssignedCount(kind, tripId);
    if (count < expected) {
      log(`    ~ ${kind} not yet persisted on ${tripId} (${count}/${expected}); retry`);
      await sleep(1500 * (attempt + 1));
    }
  }
  return count;
}

async function setMaxAttractions(tripId, slug, max) {
  try {
    const detailRes = await req("GET", `${BASE_URL}/private-excursions/${tripId}?lang=en&currency=USD`);
    const d = detailRes?.data ?? detailRes;
    const catId = d?.category?.id || d?.categoryId || null;
    const body = {
      slug: d?.slug || slug,
      categoryId: catId,
      stars: String(d?.stars ?? "0"),
      maxAttractions: max,
      durationHours: d?.durationHours ?? 0,
      videoUrl: d?.videoUrl ?? "",
      isFeatured: !!d?.isFeatured,
      isActive: true,
      title: toLt(d?.title),
      subtitle: toLt(d?.subtitle),
      excursionType: toLt(d?.excursionType),
      shortDescription: toLt(d?.shortDescription),
      fullProgram: toLt(d?.fullProgram),
    };
    await req("PUT", `${BASE_URL}/private-excursions/${tripId}`, { json: body });
    log(`    · maxAttractions=${max} set (${slug})`);
  } catch (e) {
    log(`    · maxAttractions update skipped (${slug}): ${e.message}`);
  }
}

function toLt(v) {
  if (v && typeof v === "object") return { en: v.en || "", de: v.de || "", ru: v.ru || "", fr: v.fr || "" };
  return lt(typeof v === "string" ? v : "");
}

/* ------------------------------ main ------------------------------ */
async function main() {
  if (!TOKEN) {
    log("ADMIN_TOKEN env not set; aborting");
    process.exit(1);
  }
  const runCreate = OPTS.stage === "all" || OPTS.stage === "create";
  const runLink = OPTS.stage === "all" || OPTS.stage === "link";

  if (runCreate) {
    log("\n=== CREATE ATTRACTIONS ===");
    await createEntities("attraction");
    log("\n=== CREATE SERVICES ===");
    await createEntities("service");
  }
  if (runLink) {
    log("\n=== LINK TO TRIPS ===");
    await linkTrips();
  }
  log("\n==== DONE ====");
  log(`state: ${STATE_PATH} (attractions=${Object.keys(STATE).filter((k) => k.startsWith("attraction/")).length}, services=${Object.keys(STATE).filter((k) => k.startsWith("service/")).length}, linked=${Object.keys(STATE).filter((k) => k.startsWith("link/")).length})`);
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
