#!/usr/bin/env node
/**
 * Phase 2: seed the Site Services catalog collected by scrapeSiteServices.mjs
 * (dataEntry/siteServices/items.json + images) into the backend as
 * SiteServiceSubItemUpsertRequest payloads under the 4 parent services.
 *
 * Field mapping (see the plan):
 *   title        <- h1.service-title per language
 *   textTopImage <- card badge per language (renders as the detail tagline), null if none
 *   subtitle     <- null (the source has none - see absentLt() for why not "")
 *   description  <- pre-heading body, cut at a sentence boundary <= MAX_LOCALIZED_LEN
 *   note         <- the "Notes" style section, newline-joined (the UI splits on \n), null if none
 *   alert        <- null (no source equivalent; the banner hides when absent)
 *   features     <- every remaining parsed section, aligned on the EN skeleton so all
 *                   four languages render the same group/value structure
 *   options      <- one "Rate Basis" tier from price-type + price-amount (none for 0)
 * Nested option/value/feature `id`s are omitted entirely (a PUT with id=0 deletes
 * the child rows on this backend).
 *
 * Pre-existing backend data is never deleted. A live item whose normalized EN title
 * matches a scraped title is UPDATED in place (that is how the inactive demo items
 * become real catalog entries); everything else is created with POST.
 *
 * Auth: ADMIN_TOKEN from env, else the gitignored dataEntry/.admin-token file.
 * Base URL: API_BASE_URL (default = the sandbox in clientApi/apiConfig.ts).
 *
 * Usage:
 *   node scripts/seedSiteServices.mjs [--stage all|items|images]
 *     [--section tourist|car-rental|vip-airport|real-estate] [--only <srcSlug>]
 *     [--limit N] [--dry-run] [--force] [--no-images] [--validate] [--probe-limits]
 *     [--max-len N] [--emit-slugs]
 *
 * State (resume/idempotency): dataEntry/.seed-services-state.json
 * Failures: dataEntry/.seed-services-failures.json
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const BASE_URL = (process.env.API_BASE_URL || "https://touristtt.runasp.net/api").replace(/\/+$/, "");
function readToken() {
  if (process.env.ADMIN_TOKEN) return process.env.ADMIN_TOKEN.trim();
  const f = path.join(ROOT, "dataEntry", ".admin-token");
  try { return fs.readFileSync(f, "utf8").trim(); } catch { return ""; }
}
const TOKEN = readToken();

const OUT = path.join(ROOT, "dataEntry", "siteServices");
const ITEMS_PATH = path.join(OUT, "items.json");
const STATE_PATH = path.join(ROOT, "dataEntry", ".seed-services-state.json");
const FAILURE_PATH = path.join(ROOT, "dataEntry", ".seed-services-failures.json");
const REPORT_PATH = path.join(OUT, "seed-report.json");
const LOG_FILE = path.join(OUT, "seed.log");
const LIMIT_REPORT_PATH = path.join(OUT, "limit-report.json");
const CONFIG_TS = path.join(ROOT, "components", "UserComp", "Services", "config", "siteServicesConfig.ts");
const SLUGS_TS = path.join(ROOT, "shared", "data", "serviceItemSlugs.ts");

const LANGS = ["en", "de", "fr", "ru"];
const MAX_FEATURE_GROUPS = 8;
const MAX_FEATURE_VALUES = 20;
const MAX_IMAGES = 6;
const SHORT_FIELD_LIMIT = 500; // title / subtitle / textTopImage / option names
const HEADING_LIMIT = 120; // feature group names (the scraper caps headings here too)
const DESIGN_BODY_CEILING = 2000; // the API may allow more; a longer chip is not usable UI
const ALLOWED_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

// the parent service each scraped section belongs to, keyed by the config object key
const SECTION_CONFIG_KEY = {
  tourist: "touristServices",
  "car-rental": "carRental",
  "vip-airport": "vipAirport",
  "real-estate": "realEstate",
};

// the only strings that do not come from the reference site
const LABELS = {
  rateBasis: { en: "Rate Basis", de: "Tarifgrundlage", fr: "Base tarifaire", ru: "База тарифа" },
  notes: { en: "Notes", de: "Hinweise", fr: "Remarques", ru: "Примечания" },
  description: { en: "Description", de: "Beschreibung", fr: "Description", ru: "Описание" },
};

// the three pre-existing demo sub-items are edited in place instead of being left
// behind as inactive near-duplicates: each id receives the scraped payload of the
// catalog item it stands for (see the plan, Part B)
const DEMO_REMAP = {
  "10d03700-ed85-46a7-90c3-830b124118b6": "toyota-corolla",
  "ddee2801-008c-4f7b-b33e-ddbcf6780889": "meet-assist-vip-lounge",
  "c1785ddb-9b0a-41ae-b993-1f62a657b456": "one7-residence-hurghada",
};
const REMAP_ID_BY_SLUG = new Map(Object.entries(DEMO_REMAP).map(([id, slug]) => [slug, id]));

const NOTES_HEADING_RE = /(notes?|hinweise|opmerkingen|remarques|примечани|условия|anmerkung)/i;
const NUMBERED_RE = /^\s*\d+[).]\s*/;
// double-encoded UTF-8 read back as latin1/cp1252: â€, Ã©, Â , Ñ€ (never valid text)
const MOJIBAKE_RE = /\u00E2\u20AC|\u00C3[\u0080-\u00FF]|\u00C2[\u0080-\u00BF]|\u00D1\u20AC/u;

// ---- CLI ----
function parseArgs(argv) {
  const opts = { stage: "all", section: null, only: null, limit: Infinity, dryRun: false, force: false, images: true, validate: false, probeLimits: false, sweepProbes: false, emitSlugs: false, maxLen: null, fields: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--stage") opts.stage = argv[++i];
    else if (a === "--section") opts.section = argv[++i];
    else if (a === "--only") opts.only = argv[++i];
    else if (a === "--limit") opts.limit = Number(argv[++i]);
    else if (a === "--dry-run") opts.dryRun = true;
    else if (a === "--force") opts.force = true;
    else if (a === "--no-images") opts.images = false;
    else if (a === "--validate") opts.validate = true;
    else if (a === "--probe-limits" || a === "--calibrate") opts.probeLimits = true;
    else if (a === "--sweep-probes") opts.sweepProbes = true;
    else if (a === "--emit-slugs") opts.emitSlugs = true;
    else if (a === "--fields") opts.fields = String(argv[++i]).split(",").map((s) => s.trim()).filter(Boolean);
    else if (a === "--max-len") opts.maxLen = Number(argv[++i]);
  }
  return opts;
}
const OPTS = parseArgs(process.argv.slice(2));

/**
 * The per-field budget for the long text columns.
 *
 * The backend was changed to allow more than 500, but not everywhere at once, so each
 * column gets its own proven length from the probe rather than one shared guess. A field
 * with no proven answer keeps the 500 this API has always accepted: guessing higher turns
 * the whole write into an HTTP 500, which is what a single shared budget would do here.
 */
function loadLimitReport() {
  try { return normalizeReport(JSON.parse(fs.readFileSync(LIMIT_REPORT_PATH, "utf8"))); } catch { return null; }
}

/**
 * Reports written before this script stored 0 for "no length above the control was ever
 * accepted" kept the control length in that slot instead, which is not a measurement. The
 * attempts list carries the evidence, so re-derive it: a field with no accepted rung has
 * no known cap.
 */
function normalizeReport(rep) {
  if (!rep?.fields) return rep;
  for (const field of Object.keys(rep.fields)) {
    const accepted = (rep.attempts?.[field] || []).some((entry) => String(entry).includes("=ok"));
    if (!accepted) rep.fields[field] = 0;
  }
  return rep;
}
const LIMIT_REPORT = OPTS.maxLen ? null : loadLimitReport();
const HISTORICAL_BODY_LIMIT = 500;
const BODY_FIELDS = ["description", "note", "featureValue"];

function bodyCapFor(field, rep = LIMIT_REPORT) {
  if (OPTS.maxLen) return OPTS.maxLen;
  const proven = rep?.fields?.[field];
  const usable = Number.isFinite(proven) && proven > 0 ? proven : HISTORICAL_BODY_LIMIT;
  return Math.min(usable, DESIGN_BODY_CEILING);
}
const LIMITS = {
  description: bodyCapFor("description"),
  note: bodyCapFor("note"),
  featureValue: bodyCapFor("featureValue"),
};
// the one number every payload is certainly inside - used for the summary lines
const BODY_LIMIT = Math.min(LIMITS.description, LIMITS.note, LIMITS.featureValue);

/**
 * A non-body field's design cap, tightened by what the backend actually accepted for it.
 * A field the probe could not resolve stays at its design cap, so one unhealthy probe run
 * cannot silently strangle the payloads.
 */
function capFor(field, designCap) {
  const probed = LIMIT_REPORT?.fields?.[field];
  if (!Number.isFinite(probed) || probed <= 0) return designCap;
  if ((LIMIT_REPORT?.inconclusiveFields || []).includes(field)) return designCap;
  return Math.min(designCap, probed);
}

/**
 * Does a DELETE work, and on which route? The backend moved sub-item deletion under
 * `/admin` and made it a soft delete (`isDeleted`/`deletedAt`, restorable through
 * `/admin/subservices/{id}/restore`), while `DELETE /services/subservices/{id}` now answers
 * 405. A soft-deleted row is invisible to the public read path the site uses, which is what
 * matters for the catalog, so this is treated as working cleanup.
 *
 * This is checked rather than assumed because the probe, the rehearsal and the gallery
 * replacement all depend on being able to remove what they create.
 */
async function deleteWorks() {
  const probeId = "00000000-0000-4000-8000-000000000000";
  for (const route of ["admin", "public"]) {
    try {
      await req("DELETE", deleteUrl(probeId, route), { maxTries: 0 });
      return { ok: true, route, status: 200 };
    } catch (e) {
      // 404/400 mean the route exists and answered about the (impossible) id
      if (e.status === 404 || e.status === 400) return { ok: true, route, status: e.status };
      if (route === "admin") log(`  ~ DELETE ${deleteUrl(probeId, route)} answered HTTP ${e.status || "no response"}, trying the old public route`);
    }
  }
  return { ok: false, route: null, status: 0 };
}

/** The cap the payload builder aims at per field. */
function designCapFor(field) {
  if (field === "featureName") return HEADING_LIMIT;
  return LIMITS[field] ?? SHORT_FIELD_LIMIT;
}

/**
 * Where a sub-item row is deleted. `admin` is the current soft-delete route, `public` is
 * the pre-existing one that a deployment may or may not still serve - `deleteWorks()` picks
 * between them once per run. Images were verified to still delete on the public route.
 */
function deleteUrl(id, route = "admin") {
  return route === "admin"
    ? `${BASE_URL}/admin/subservices/${id}`
    : `${BASE_URL}/services/subservices/${id}`;
}

// ---- helpers ----
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const logLines = [];
const report = [];
function log(...a) {
  const line = a.join(" ");
  logLines.push(line);
  console.log(line);
}
const normKey = (s) => String(s || "").trim().toLowerCase().replace(/\s+/g, " ").replace(/[.,;:!]+$/g, "");
const collapse = (s) => String(s || "").replace(/\s+/g, " ").trim();

/**
 * The reference site renders badges in shouting caps in some sections and in
 * title case in others ("FOR RENT" vs "Exclusive!" / "EXCLUSIVE!"). Keep the
 * translated wording but normalize an all-caps badge to sentence case.
 */
function canonicalBadge(value) {
  const t = collapse(value);
  if (!t) return "";
  const hasLower = /[a-z\u00DF\u00E0-ÿ]/.test(t);
  if (hasLower) return t;
  return t.charAt(0) + t.slice(1).toLowerCase();
}

function isTransient(err) {
  const code = err?.cause?.code || err?.code || "";
  return /TIMEOUT|ECONNRESET|ECONNREFUSED|EAI_AGAIN|UND_ERR|SocketError|ETIMEDOUT/i.test(`${code} ${err?.message || ""}`);
}

async function req(method, url, { json, form, maxTries = 5 } = {}, attempt = 0) {
  const headers = { Accept: "application/json" };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
  let body;
  if (form) body = form;
  else if (json !== undefined) { headers["Content-Type"] = "application/json"; body = JSON.stringify(json); }
  let res;
  try {
    res = await fetch(url, { method, headers, body });
  } catch (err) {
    if (attempt < maxTries && isTransient(err)) {
      const wait = 5000 * (attempt + 1);
      log(`  ~ transient (${err?.cause?.code || err.message}) ${method} ${url}; retry ${wait}ms`);
      await sleep(wait);
      return req(method, url, { json, form, maxTries }, attempt + 1);
    }
    throw err;
  }
  if (res.status >= 500 && attempt < maxTries) {
    const wait = 5000 * (attempt + 1);
    log(`  ~ HTTP ${res.status} ${method} ${url}; retry ${wait}ms`);
    await sleep(wait);
    return req(method, url, { json, form, maxTries }, attempt + 1);
  }
  const text = await res.text();
  let parsed;
  try { parsed = text ? JSON.parse(text) : {}; } catch { parsed = { raw: text }; }
  if (!res.ok) {
    const detail = parsed?.errors || parsed?.validationErrors || null;
    const msg = parsed?.message || parsed?.title || text.slice(0, 200) || "no response body";
    const errors = Array.isArray(detail) ? detail.join(" | ") : detail ? JSON.stringify(detail) : "";
    const e = new Error(`HTTP ${res.status} on ${method} ${url}: ${msg}${errors ? ` - ${errors.slice(0, 600)}` : ""}`);
    e.status = res.status;
    e.body = parsed;
    throw e;
  }
  return parsed;
}

function mimeFor(file) {
  const ext = path.extname(file).toLowerCase();
  return { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" }[ext] || "application/octet-stream";
}

const lt = (obj) => ({
  en: collapse(obj?.en),
  de: collapse(obj?.de || obj?.en),
  fr: collapse(obj?.fr || obj?.en),
  ru: collapse(obj?.ru || obj?.en),
});

/**
 * A localized field the source does not fill.
 *
 * Verified against the live API: an empty STRING is rejected ("English translation
 * is required."), while `null` is accepted and stored as absent. `null` is also what
 * the UI expects - ServiceAlertBanner hides on blank text and the detail tagline
 * falls back through `textTopImage || subtitle`, so never send "" for these fields.
 */
const absentLt = () => null;

/**
 * Localized text that must keep its line structure: ServiceDetailSection splits
 * `note` on newlines to build the accordion, so the generic collapse() flattening
 * cannot be used there.
 */
function ltLines(obj) {
  const clean = (s) => String(s || "")
    .replace(/[ \t\u00A0]+/g, " ")
    .replace(/[ \t]*\n[ \t]*/g, "\n")
    .replace(/\n\n+/g, "\n")
    .trim();
  const en = clean(obj?.en);
  const pick = (v) => clean(v) || en;
  return { en, de: pick(obj?.de), fr: pick(obj?.fr), ru: pick(obj?.ru) };
}

const idOf = (resp) => {
  const v = resp?.data?.id ?? resp?.data?.data?.id ?? resp?.id;
  return typeof v === "string" && v ? v : null;
};

/**
 * Cut at the last sentence boundary inside the budget; ellipsis only when cut.
 * The returned string is ALWAYS <= limit characters (an ellipsis costs 3).
 */
function cutToLimit(text, limit) {
  const t = collapse(text);
  if (t.length <= limit) return t;
  const slice = t.slice(0, limit);
  const idx = Math.max(
    slice.lastIndexOf(". "), slice.lastIndexOf("! "), slice.lastIndexOf("? "),
    slice.lastIndexOf(".\u00A0"), slice.lastIndexOf(".")
  );
  if (idx > Math.floor(limit * 0.55)) return slice.slice(0, idx + 1).trim();
  const room = Math.max(1, limit - 3);
  const trimmed = slice.slice(0, room).replace(/\s+\S*$/, "");
  return `${trimmed || slice.slice(0, room)}...`;
}

// ---- parent service ids (single source of truth: siteServicesConfig.ts) ----
function readConfigGuids() {
  const src = fs.readFileSync(CONFIG_TS, "utf8");
  const map = {};
  for (const m of src.matchAll(/(\w+):\s*\{\s*id:\s*"([0-9a-fA-F-]{36})"/g)) map[m[1]] = m[2];
  const missing = Object.values(SECTION_CONFIG_KEY).filter((k) => !map[k]);
  if (missing.length) throw new Error(`could not read service GUIDs for ${missing.join(", ")} from siteServicesConfig.ts`);
  return map;
}

/**
 * The App Service behind this API sleeps and cold-starts, which shows up as 10s
 * connect timeouts and as HTTP 500 bursts on writes. Never start a bulk run
 * against an endpoint that has not answered yet.
 */
async function waitForHealth() {
  for (let i = 0; i < 10; i++) {
    try {
      await req("GET", `${BASE_URL}/services/subservices?lang=en&pageSize=1`, { maxTries: 0 });
      log(`health: the API answered (attempt ${i + 1})`);
      return true;
    } catch (e) {
      if (e.status === 401) { log("health: HTTP 401 - the admin token is missing or expired"); return false; }
      log(`  ~ health attempt ${i + 1}/10: ${String(e.message).slice(0, 140)}`);
      await sleep(5000 * (i + 1));
    }
  }
  log("health: the API never became reachable - aborting before any bulk write");
  return false;
}

// ---- backend limit probe (see the plan, Part A) ----
// Tested per field, largest first, so the answer is the usable maximum of each column.
//
// The ladder is measured with PUT into ONE probe row instead of a POST per rung. This
// backend has a column that breaks the write path above a certain length (a feature value
// over ~450 chars returns a bare HTTP 500), so a probe needs many samples to locate a
// boundary - and every sample that used to be a POST was a row the catalog had to keep.
// The rungs are per field, and the short/value fields get a rung around 450 because that is
// where the measured columns appear to stop.
const RUNGS_SHORT = [500, 450, 400, 300, 200, 100];
const RUNGS_HEADING = [120];
const RUNGS_BODY = [2000, 1500, 1000, 800, 600];
const RUNGS_VALUE = [500, 450, 400, 300, 200, 100];
const PROBE_RUNGS = {
  title: RUNGS_SHORT,
  subtitle: RUNGS_SHORT,
  textTopImage: RUNGS_SHORT,
  alert: RUNGS_SHORT,
  optionKey: RUNGS_SHORT,
  optionValue: RUNGS_SHORT,
  featureName: RUNGS_HEADING,
  description: RUNGS_BODY,
  note: RUNGS_BODY,
  featureValue: RUNGS_VALUE,
};
const PROBE_FIELDS = Object.keys(PROBE_RUNGS);
// what the payload builder aims at per field, independent of any probe result
const PROBE_DESIGN_CAP = {
  title: SHORT_FIELD_LIMIT, subtitle: SHORT_FIELD_LIMIT, textTopImage: SHORT_FIELD_LIMIT, alert: SHORT_FIELD_LIMIT,
  optionKey: SHORT_FIELD_LIMIT, optionValue: SHORT_FIELD_LIMIT, featureName: HEADING_LIMIT,
  description: DESIGN_BODY_CEILING, note: DESIGN_BODY_CEILING, featureValue: DESIGN_BODY_CEILING,
};
// lengths that are safely inside every known cap, used as the control values
const PROBE_BASE = { title: 60, subtitle: 60, textTopImage: 60, description: 120, note: 120, alert: 60, featureName: 60, featureValue: 60, optionKey: 30, optionValue: 60 };
// the control item sends null here, because "" is a validation failure by design
const PROBE_NULLISH = ["subtitle", "textTopImage", "note", "alert"];

/** Exact-length filler, so a rejection can only be about the length. */
function filler(len) {
  if (len <= 0) return "";
  const word = "limitprobe";
  let s = "";
  while (s.length < len) s += s ? ` ${word}` : word;
  return s.slice(0, len);
}

function probePayload(serviceId, lens, { nullish = [] } = {}) {
  const L = (len) => ({ en: filler(len), de: filler(len), fr: filler(len), ru: filler(len) });
  const p = {
    serviceId,
    title: L(lens.title),
    subtitle: L(lens.subtitle),
    description: L(lens.description),
    textTopImage: L(lens.textTopImage),
    note: L(lens.note),
    alert: L(lens.alert),
    basePriceUSD: 0,
    isActive: false,
    options: [{ name: lt(LABELS.rateBasis), values: [{ key: L(lens.optionKey), value: L(lens.optionValue) }] }],
    features: [{ name: L(lens.featureName), values: [{ name: L(lens.featureValue) }] }],
  };
  for (const f of nullish) p[f] = null;
  return p;
}

/** Where a probed field lives in the item the API reads back. */
function readBack(data, field) {
  if (!data) return "";
  if (["title", "subtitle", "description", "textTopImage", "note", "alert"].includes(field)) return data[field];
  if (field === "featureName") return data.features?.[0]?.name;
  if (field === "featureValue") return data.features?.[0]?.values?.[0]?.name;
  if (field === "optionKey") return data.options?.[0]?.values?.[0]?.key;
  if (field === "optionValue") return data.options?.[0]?.values?.[0]?.value;
  return "";
}

/**
 * One rung: overwrite the probe row and read the field back. 400 and 500 both mean "not
 * usable", but they say different things - a 400 is a validation rule, a 500 is the value
 * passing validation and then breaking the write (a column too small to store it).
 *
 * A 200 is only an answer if the text comes back at full length: this API can validate a
 * value it then truncates on the way into the database, and a cap that silently loses text
 * is worse than no cap - so a shortened read-back is a definite rejection.
 */
async function tryProbe(probeId, serviceId, lens, { nullish = [], field = null } = {}) {
  let outcome;
  try {
    await req("PUT", `${BASE_URL}/services/subservices/${probeId}`, { json: probePayload(serviceId, lens, { nullish }), maxTries: 1 });
    outcome = { ok: true, reason: "accepted" };
  } catch (e) {
    const errs = (e.body?.errors || []).join(" | ");
    outcome = {
      ok: false,
      status: e.status || 0,
      reason: e.status === 400 ? `400 ${errs.slice(0, 90)}` : e.status >= 500 ? `HTTP ${e.status}` : String(e.message).slice(0, 90),
    };
  }
  if (outcome.ok && field && lens[field] >= 300) {
    try {
      const back = await req("GET", `${BASE_URL}/services/subservices/${probeId}?lang=en`, { maxTries: 1 });
      const stored = String(readBack(back?.data, field) || "");
      if (stored.length < lens[field]) {
        outcome = { ok: false, status: 0, definitive: true, reason: `accepted but stored ${stored.length}/${lens[field]} chars` };
      }
    } catch (e) {
      log(`  ~ read-back of ${probeId} failed (${String(e.message).slice(0, 90)}) - trusting the write`);
    }
  }
  return outcome;
}

/**
 * One probe rung. A 400 is a validation answer about the data; a transport error is the App
 * Service cycling and gets retried before we believe it.
 *
 * A 5xx is the interesting case, and it is answered rather than assumed: this backend breaks
 * the *write* when a value is longer than its column can store (no validation message, just
 * HTTP 500), so a 500 is only noise if the backend cannot store anything at all. After three
 * identical failures the known-good control body is stored again - and when that still works,
 * the length is what broke the write, which is a measurement and not noise.
 */
async function probeRung(probeId, serviceId, lens, { nullish = [], field = null } = {}) {
  let last = { ok: false, status: 0, reason: "not attempted" };
  for (let i = 0; i < 3; i++) {
    last = await tryProbe(probeId, serviceId, lens, { nullish, field });
    if (last.ok || last.status === 400 || last.definitive) return last;
    if (i < 2) log(`  ~ rung inconclusive (${last.reason}); retry ${i + 2}/3`);
    if (i < 2) await sleep(5000 * (i + 1));
  }
  if (last.status >= 500) {
    for (let i = 0; i < 2; i++) {
      const control = await tryProbe(probeId, serviceId, PROBE_BASE, { nullish: PROBE_NULLISH });
      if (control.ok) return { ...last, definitive: true };
      if (i < 1) await sleep(5000);
    }
  }
  return { ...last, inconclusive: true };
}

/**
 * The single row the ladder is measured on. A row left behind by an earlier run is reused
 * when it is still there, so a probe that is re-run because the App Service was unhealthy
 * does not add a second artifact to the catalog.
 */
async function ensureProbeRow(serviceId, keepHint) {
  if (keepHint) {
    try {
      const back = await req("GET", `${BASE_URL}/services/subservices/${keepHint}?lang=en`, { maxTries: 1 });
      if (back?.data?.id) { log(`  reusing the probe row ${keepHint} from the earlier run`); return keepHint; }
    } catch { /* it is gone - create one */ }
  }
  const j = await req("POST", `${BASE_URL}/services/subservices`, {
    json: probePayload(serviceId, { ...PROBE_BASE, title: 24 }, { nullish: PROBE_NULLISH }),
    maxTries: 3,
  });
  const id = idOf(j);
  if (!id) throw new Error(`the probe row could not be created: ${JSON.stringify(j).slice(0, 160)}`);
  log(`  probe row ${id} (parent ${serviceId}) - one artifact for the whole ladder`);
  return id;
}

/**
 * Nothing created by the probe or the rehearsal should survive: list every parent and delete
 * any row the synthetic title identifies. This also cleans up items an aborted earlier run
 * could not delete, so the catalog never accumulates test noise. `keep` spares the row the
 * running probe is still measuring on.
 *
 * The delete is a soft delete on the admin route, so the row leaves the public read path the
 * site (and the verifier) uses and lands in `/admin/subservices/deleted` instead.
 */
async function sweepProbeItems(guids, { keep = null, route = "admin" } = {}) {
  let removed = 0;
  const stuck = [];
  for (const key of Object.values(SECTION_CONFIG_KEY)) {
    let items = [];
    try { items = await listExisting(guids[key]); }
    catch (e) { log(`  ~ sweep could not list ${key}: ${String(e.message).slice(0, 120)}`); continue; }
    for (const it of items) {
      if (keep && it.id === keep) continue;
      if (!/^(limitprobe|rehearse)/.test(String(it.title || ""))) continue;
      try {
        // one try: a route that is gone does not come back within one run, and the next
        // --sweep-probes retries whatever is left
        await req("DELETE", deleteUrl(it.id, route), { maxTries: 1 });
        removed++;
        log(`  x removed probe item ${it.id} (${key})`);
      } catch (e) {
        stuck.push(it.id);
        log(`  ! probe item ${it.id} NOT deleted (${String(e.message).slice(0, 120)}) - remove it in the admin UI`);
      }
    }
  }
  return { removed, stuck };
}

/** What an earlier (possibly aborted) probe already answered, so a re-run resumes. */
function loadProbeProgress() {
  try {
    const prev = JSON.parse(fs.readFileSync(LIMIT_REPORT_PATH, "utf8"));
    return prev?.baseUrl === BASE_URL && prev?.fields ? prev : null;
  } catch { return null; }
}

async function probeLimits(guids) {
  const serviceId = guids.realEstate; // the probe row's parent is irrelevant - it is measured on, not kept
  log(`\n--- probing the backend limits on ${BASE_URL} ---`);

  // this API fails requests at random, so a probe that dies half way must not lose the
  // answers it already paid for: every resolved field is written out and kept
  const prev = OPTS.force ? null : loadProbeProgress();
  const fields = { ...(prev?.fields || {}) };
  const attempts = { ...(prev?.attempts || {}) };
  const resolved = new Set(prev?.resolvedFields || []);
  if (resolved.size) log(`  resuming: ${PROBE_FIELDS.filter((f) => resolved.has(f)).join(", ")} already answered (--force re-measures)`);

  // the ladder runs on one row, so a DELETE that does not work costs exactly one artifact
  // instead of one per rung - and that artifact is reused by the next run rather than added to
  const del = await deleteWorks();
  if (del.ok) log(`  DELETE works on the ${del.route} route (HTTP ${del.status} for an id that cannot exist)`);
  let pre = { removed: 0, stuck: [] };
  if (del.ok) {
    pre = await sweepProbeItems(guids, { keep: prev?.probeRowId, route: del.route });
    if (pre.removed) log(`  cleaned ${pre.removed} leftover probe item(s) from earlier runs`);
  } else {
    log(`  ! DELETE answers on neither route (HTTP ${del.status || "no response"}) - the sweep would only fail, so it is skipped (run --sweep-probes once the route is back)`);
    log("     the probe row survives this run and is reused by the next one instead of piling up: one artifact, not one per rung");
  }
  const probeId = await ensureProbeRow(serviceId, prev?.probeRowId);

  const writeReport = (optionalFields, sweep, rowStillThere = true) => {
    const rep = {
      probedAt: new Date().toISOString(),
      baseUrl: BASE_URL,
      rungs: PROBE_RUNGS,
      fields,
      attempts,
      resolvedFields: [...resolved],
      // a field that was only ever answered by noise sits at its control length, which
      // says nothing about the real cap - the consumers must not tighten to it
      inconclusiveFields: PROBE_FIELDS.filter((f) => !resolved.has(f)),
      optionalFields,
      complete: PROBE_FIELDS.every((f) => resolved.has(f)),
      probeItemsRemoved: sweep?.removed ?? 0,
      probeItemsStuck: sweep?.stuck ?? [],
      probeRowId: rowStillThere ? probeId : null,
    };
    fs.writeFileSync(LIMIT_REPORT_PATH, JSON.stringify(rep, null, 2), "utf8");
    return rep;
  };

  // is the API healthy enough to answer a minimal body at all?
  const control = await probeRung(probeId, serviceId, PROBE_BASE, { nullish: PROBE_NULLISH });
  if (!control.ok) throw new Error(`the minimal control body was rejected (${control.reason}) - the backend is unhealthy or the contract changed`);
  let optionalFields = prev?.optionalFields || null;
  if (!optionalFields) {
    const empt = await probeRung(probeId, serviceId, { ...PROBE_BASE, subtitle: 0, textTopImage: 0, note: 0, alert: 0 });
    optionalFields = { emptyStringAccepted: empt.ok, nullAccepted: true };
  }
  log(`  control: accepted   empty strings: ${optionalFields.emptyStringAccepted ? "ACCEPTED (!)" : "rejected (400 required)"}   null: ACCEPTED`);

  // per field: the largest length that survives validation, the write and the read-back.
  // --fields narrows this to the columns that still matter, because a full ladder on a
  // backend that answers 500 at random takes a long time for fields no payload approaches
  const only = OPTS.fields && OPTS.fields.length ? new Set(OPTS.fields) : null;
  if (only) {
    const unknown = [...only].filter((f) => !PROBE_FIELDS.includes(f));
    if (unknown.length) throw new Error(`--fields: unknown field(s) ${unknown.join(", ")} (known: ${PROBE_FIELDS.join(", ")})`);
    log(`  measuring only: ${[...only].join(", ")}`);
  }
  for (const f of PROBE_FIELDS) {
    if (resolved.has(f)) { log(`  field ${f.padEnd(13)} kept from the earlier run: ${fields[f]}`); continue; }
    if (only && !only.has(f)) {
      log(`  field ${f.padEnd(13)} skipped (--fields)`);
      continue;
    }
    const rungs = PROBE_RUNGS[f];
    const tried = [];
    let accepted = 0;
    let noise = 0;
    for (const len of rungs) {
      const r = await probeRung(probeId, serviceId, { ...PROBE_BASE, [f]: len }, { field: f });
      if (r.ok) { accepted = len; tried.push(`${len}=ok`); break; }
      tried.push(`${len}=${r.reason}`);
      if (!r.inconclusive) continue;
      noise++;
      // only a transport failure reaches here now. is the API dead, or was that one request
      // unlucky? give it the same three tries before the run is called off
      const rebase = await probeRung(probeId, serviceId, PROBE_BASE, { nullish: PROBE_NULLISH });
      if (!rebase.ok) throw new Error(`field ${f}: the control body stopped answering (${tried.join(", ")}) - the backend is unhealthy, re-run --probe-limits to resume`);
    }
    // the answer is only final when nothing above the accepted rung stayed unanswered,
    // or when the accepted length already covers everything the payloads need
    const conclusive = accepted > 0 && (noise === 0 || accepted >= PROBE_DESIGN_CAP[f]);
    // 0 means "no length above the control was ever accepted": the consumers then fall
    // back to the historical cap instead of treating the control length as a measurement
    fields[f] = accepted;
    attempts[f] = tried;
    if (!accepted) tried.push(`no rung was answered cleanly (control ${PROBE_BASE[f]} is known good)`);
    if (conclusive) resolved.add(f);
    log(`  field ${f.padEnd(13)} max usable ${accepted || "none measured"}${conclusive ? "" : "  (unresolved - re-probe on the next run)"}  [${tried.join(", ")}]`);
    writeReport(optionalFields);
  }

  // the row the ladder ran on goes away; when DELETE is refused its id stays in the report
  // so the next probe reuses it instead of adding another artifact to the catalog
  let rowRemoved = false;
  if (del.ok) {
    try {
      await req("DELETE", deleteUrl(probeId, del.route), { maxTries: 2 });
      rowRemoved = true;
      log(`  - probe row ${probeId} removed`);
    } catch (e) {
      log(`  ! probe row ${probeId} NOT deleted (${String(e.message).slice(0, 120)}) - the next --probe-limits reuses it`);
    }
  } else {
    log(`  - probe row ${probeId} left in place (DELETE is unavailable) - the next --probe-limits reuses it`);
  }
  const post = rowRemoved ? pre : await sweepProbeItems(guids, { keep: probeId, route: del.route });
  const rep = writeReport(optionalFields, post, !rowRemoved);
  log(`limit report -> ${path.relative(ROOT, LIMIT_REPORT_PATH)} (${resolved.size}/${PROBE_FIELDS.length} fields resolved)`);
  log(`probe items: removed=${post.removed}${post.stuck.length ? ` STUCK=${post.stuck.join(",")}` : ""}`);
  log(`this run would use BODY_LIMIT=${readBodyLimitFor(rep)} (design ceiling ${DESIGN_BODY_CEILING}); re-run --validate to apply`);
  const missing = rep.inconclusiveFields;
  if (missing.length) log(`! unresolved fields (design cap used): ${missing.join(", ")} - re-run --probe-limits to finish them`);
  return rep;
}

/**
 * The body budget a limit report implies, using the same per-field rules as the
 * payloads: a proven length wins, an unanswered column falls back to the historical 500.
 */
function readBodyLimitFor(rep) {
  return Math.min(...BODY_FIELDS.map((f) => bodyCapFor(f, rep)));
}

// ---- payload building ----

/** The EN parse defines the shared structure; other languages align on its index. */
function alignSections(rec) {
  const en = rec.en;
  const groups = en.sections.map((s, i) => {
    const perLang = {};
    for (const lang of LANGS) {
      const src = rec[lang]?.sections?.[i];
      perLang[lang] = src && src.packed?.length ? src : en.sections[i];
      if (src !== perLang[lang] && lang !== "en") {
        report.push({ srcSlug: rec.srcSlug, lang, problem: "section-aligned-to-en", detail: `index ${i} empty in ${lang} parse` });
      }
    }
    const valueCount = Math.min(s.packed.length, MAX_FEATURE_VALUES);
    if (s.packed.length > MAX_FEATURE_VALUES) {
      report.push({ srcSlug: rec.srcSlug, lang: "en", problem: "values-capped", detail: `section ${i} had ${s.packed.length} packed values, kept ${MAX_FEATURE_VALUES}` });
    }
    const values = [];
    for (let j = 0; j < valueCount; j++) {
      const v = {};
      for (const lang of LANGS) {
        const own = perLang[lang].packed?.[j];
        if (!own) report.push({ srcSlug: rec.srcSlug, lang, problem: "value-aligned-to-en", detail: `section ${i} value ${j}` });
        const text = collapse(own || s.packed[j]);
        if (text.length > LIMITS.featureValue) {
          report.push({ srcSlug: rec.srcSlug, lang, problem: "feature-value-truncated", detail: `section ${i} value ${j}: ${text.length} -> <=${LIMITS.featureValue} chars` });
        }
        v[lang] = cutToLimit(text, LIMITS.featureValue);
      }
      values.push(v);
    }
    const name = {};
    for (const lang of LANGS) {
      const heading = perLang[lang]?.heading;
      name[lang] = cutToLimit(collapse(heading || s.heading || LABELS.description[lang]), HEADING_LIMIT);
    }
    return { name, values, isNotes: !!s.heading && NOTES_HEADING_RE.test(s.heading) };
  });
  return groups;
}

function buildNote(groups) {
  const notesGroups = groups.filter((g) => g.isNotes);
  if (!notesGroups.length) return { note: absentLt(), overflow: [] };
  const enItems = notesGroups.flatMap((g) => g.values.map((v) => v.en)).filter(Boolean);
  const perLangItems = {};
  for (const lang of LANGS) {
    perLangItems[lang] = notesGroups.flatMap((g) => g.values.map((v) => collapse(v[lang] || v.en))).filter(Boolean);
    // groups are EN-aligned, but empty localized strings can still collapse away
    while (perLangItems[lang].length < enItems.length) perLangItems[lang].push("");
  }
  if (!enItems.length) return { note: absentLt(), overflow: [] };
  // keep as many leading items as still fit in the budget for EVERY language, so
  // no localized note overflows and the newline-joined accordion stays aligned
  const fitting = (items) => {
    let k = 0;
    let len = 0;
    for (let i = 0; i < items.length; i++) {
      const add = items[i].length + (i ? 1 : 0);
      if (len + add > LIMITS.note) break;
      len += add;
      k = i + 1;
    }
    return k;
  };
  let keep = Math.min(...LANGS.map((lang) => fitting(perLangItems[lang])));
  if (keep === 0) keep = 1; // never lose everything to the overflow group
  const note = {};
  for (const lang of LANGS) note[lang] = cutToLimit(perLangItems[lang].slice(0, keep).filter(Boolean).join("\n"), LIMITS.note);
  const overflow = [];
  for (let i = keep; i < enItems.length; i++) {
    const v = {};
    for (const lang of LANGS) v[lang] = collapse(perLangItems[lang][i] || enItems[i]);
    overflow.push(v);
  }
  if (overflow.length) {
    report.push({ srcSlug: "(notes)", problem: "note-overflow", detail: `${overflow.length} note line(s) moved into a feature group` });
  }
  return { note: ltLines(note), overflow };
}

function buildDescription(rec) {
  const en = rec.en;
  const headless = en.sections.find((s) => !s.heading);
  const source = headless || en.sections[0];
  const perLang = {};
  const idx = en.sections.indexOf(source);
  for (const lang of LANGS) {
    const own = rec[lang]?.sections?.[idx];
    perLang[lang] = collapse((own?.packed || source.packed).join(" "));
  }
  if (!headless) report.push({ srcSlug: rec.srcSlug, problem: "description-from-first-headed-section", detail: "no headless body section" });
  const out = {};
  for (const lang of LANGS) out[lang] = cutToLimit(perLang[lang], LIMITS.description);
  return lt(out);
}

function buildPayload(rec, guids) {
  const groups = alignSections(rec);
  // no "Notes:" heading (some pages only number their terms): treat a section
  // whose values are ALL numbered as the notes block
  if (!groups.some((g) => g.isNotes)) {
    for (const g of groups) {
      if (g.values.length >= 2 && g.values.every((v) => NUMBERED_RE.test(v.en))) g.isNotes = true;
    }
  }
  const body = groups.filter((g) => !g.isNotes && g.values.length);
  const { note, overflow } = buildNote(groups);

  const features = body.slice(0, MAX_FEATURE_GROUPS).map((g) => ({
    name: lt(g.name),
    values: g.values.map((v) => ({ name: lt(v) })),
  }));
  if (overflow.length) {
    features.push({
      name: lt(LABELS.notes),
      values: overflow.slice(0, MAX_FEATURE_VALUES).map((v) => ({ name: lt(v) })),
    });
  }
  // the API answers 400 "Duplicate feature names are not allowed." for a repeated group
  // name, and the scraped pages do repeat headings, so colliding groups are merged and a
  // group's own repeated values are dropped before the payload is built
  const uniqueFeatures = [];
  const groupIndex = new Map();
  for (const g of features) {
    const key = normKey(g.name.en);
    const keptValues = [];
    const seenValue = new Set();
    for (const v of g.values) {
      const vk = normKey(v.name.en);
      if (vk && seenValue.has(vk)) {
        report.push({ srcSlug: rec.srcSlug, problem: "feature-value-duplicate", detail: `dropped "${collapse(v.name.en).slice(0, 50)}" from "${collapse(g.name.en).slice(0, 40)}"` });
        continue;
      }
      seenValue.add(vk);
      keptValues.push(v);
    }
    const prior = key ? groupIndex.get(key) : undefined;
    if (prior !== undefined) {
      const priorGroup = uniqueFeatures[prior];
      const room = Math.max(0, MAX_FEATURE_VALUES - priorGroup.values.length);
      const add = keptValues.slice(0, room);
      priorGroup.values.push(...add);
      report.push({ srcSlug: rec.srcSlug, problem: "feature-group-merged", detail: `"${collapse(g.name.en).slice(0, 40)}" merged into an earlier group (${keptValues.length} value(s), ${keptValues.length - add.length} dropped at the ${MAX_FEATURE_VALUES}-value cap)` });
      continue;
    }
    if (!keptValues.length) {
      report.push({ srcSlug: rec.srcSlug, problem: "feature-group-dropped", detail: `"${collapse(g.name.en).slice(0, 40)}" kept no values` });
      continue;
    }
    if (key) groupIndex.set(key, uniqueFeatures.length);
    uniqueFeatures.push({ name: g.name, values: keptValues });
  }
  if (uniqueFeatures.length !== features.length) {
    report.push({ srcSlug: rec.srcSlug, problem: "feature-groups-deduped", detail: `${features.length} section(s) -> ${uniqueFeatures.length} group(s)` });
  }
  if (body.length > MAX_FEATURE_GROUPS) {
    report.push({ srcSlug: rec.srcSlug, problem: "feature-groups-capped", detail: `${body.length} sections, kept ${MAX_FEATURE_GROUPS}` });
  }
  const droppedEmpty = groups.filter((g) => !g.isNotes && !g.values.length).length;
  if (droppedEmpty) {
    report.push({ srcSlug: rec.srcSlug, problem: "empty-section-dropped", detail: `${droppedEmpty} section(s) had no values` });
  }

  const en = rec.en;
  const amount = Number(en.priceAmount) || 0;
  const priceTypes = {};
  for (const lang of LANGS) priceTypes[lang] = collapse(rec[lang]?.priceType || en.priceType || "");
  const options = amount > 0 && priceTypes.en
    ? [{
        name: lt(LABELS.rateBasis),
        values: [{
          key: lt(priceTypes),
          value: lt(LANGS.reduce((acc, lang) => {
            acc[lang] = `$${amount} ${priceTypes[lang] || priceTypes.en}`;
            return acc;
          }, {})),
        }],
      }]
    : [];

  const title = lt(LANGS.reduce((acc, lang) => { acc[lang] = collapse(rec[lang]?.title || rec.en.title); return acc; }, {}));
  // the card badge renders as the detail tagline; items whose card has no badge stay absent
  const badges = LANGS.reduce((acc, lang) => {
    acc[lang] = canonicalBadge(rec.badges?.[lang] ?? rec.badge ?? "");
    return acc;
  }, {});
  const textTopImage = badges.en || badges.de || badges.fr || badges.ru ? lt(badges) : absentLt();

  return {
    serviceId: guids[SECTION_CONFIG_KEY[rec.section]],
    title,
    subtitle: absentLt(),
    description: buildDescription(rec),
    textTopImage,
    note,
    alert: absentLt(),
    basePriceUSD: amount,
    isActive: true,
    options,
    features: uniqueFeatures,
    __srcSlug: rec.srcSlug,
    __enTitle: title.en,
  };
}

// ---- validation (offline) ----
function validatePayload(p) {
  const problems = [];
  // `null` means "the source has nothing for this field" - accepted by the API
  const absent = (obj) => obj === null || obj === undefined;
  const check = (label, obj, limit, { required = false } = {}) => {
    if (absent(obj)) {
      if (required) problems.push(`${label} is required but absent`);
      return;
    }
    for (const lang of LANGS) {
      const s = obj?.[lang];
      if (typeof s !== "string") { problems.push(`${label}.${lang} is not a string`); continue; }
      if (!s.trim() && !required) problems.push(`${label}.${lang} is an empty string - send null instead`);
      if (s.length > limit) problems.push(`${label}.${lang} is ${s.length} chars (> ${limit})`);
      if (/[\uFFFD]/.test(s)) problems.push(`${label}.${lang} contains U+FFFD`);
      // classic double-encoding signatures - never legit text
      if (MOJIBAKE_RE.test(s)) problems.push(`${label}.${lang} looks double-encoded`);
    }
  };
  check("title", p.title, capFor("title", SHORT_FIELD_LIMIT), { required: true });
  check("subtitle", p.subtitle, capFor("subtitle", SHORT_FIELD_LIMIT));
  check("textTopImage", p.textTopImage, capFor("textTopImage", SHORT_FIELD_LIMIT));
  check("description", p.description, LIMITS.description, { required: true });
  check("note", p.note, LIMITS.note);
  check("alert", p.alert, capFor("alert", SHORT_FIELD_LIMIT));
  if (!p.title.en) problems.push("title.en is empty");
  if (!p.description.en) problems.push("description.en is empty");
  if (!Number.isFinite(p.basePriceUSD) || p.basePriceUSD < 0) problems.push(`basePriceUSD invalid (${p.basePriceUSD})`);
  if (p.features.length > MAX_FEATURE_GROUPS + 1) problems.push(`feature groups ${p.features.length} > cap`);
  // the API rejects a repeated feature name outright, so a payload carrying one is a write
  // that cannot succeed - report it here instead of discovering it as an HTTP 400
  const dupes = (label, list, textOf) => {
    for (const lang of LANGS) {
      const seen = new Map();
      list.forEach((entry, i) => {
        const key = normKey(textOf(entry, lang));
        if (!key) return;
        if (seen.has(key)) problems.push(`${label}: "${String(textOf(entry, lang)).slice(0, 40)}" repeats in ${lang} (item ${seen.get(key)} and ${i}) - the API rejects duplicate feature names`);
        else seen.set(key, i);
      });
    }
  };
  dupes("feature group names", p.features, (f, lang) => f.name?.[lang]);
  p.features.forEach((f, i) => dupes(`features[${i}] value names`, f.values, (v, lang) => v.name?.[lang]));
  p.features.forEach((f, i) => {
    check(`features[${i}].name`, f.name, capFor("featureName", HEADING_LIMIT));
    if (!f.values.length) problems.push(`features[${i}] has no values`);
    if (f.values.length > MAX_FEATURE_VALUES) problems.push(`features[${i}] has ${f.values.length} values (> ${MAX_FEATURE_VALUES})`);
    f.values.forEach((v, j) => check(`features[${i}].values[${j}].name`, v.name, LIMITS.featureValue));
  });
  p.options.forEach((o, i) => {
    check(`options[${i}].name`, o.name, SHORT_FIELD_LIMIT);
    o.values.forEach((v, j) => {
      check(`options[${i}].values[${j}].key`, v.key, capFor("optionKey", SHORT_FIELD_LIMIT));
      check(`options[${i}].values[${j}].value`, v.value, capFor("optionValue", SHORT_FIELD_LIMIT));
    });
  });
  return problems;
}

// ---- state ----
function loadState() {
  try { return JSON.parse(fs.readFileSync(STATE_PATH, "utf8")); } catch { return { bySrcSlug: {} }; }
}
function saveState(state) {
  state.updatedAt = new Date().toISOString();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), "utf8");
}
let failures = [];
try { failures = JSON.parse(fs.readFileSync(FAILURE_PATH, "utf8")); } catch { failures = []; }
function saveFailures() { fs.writeFileSync(FAILURE_PATH, JSON.stringify(failures, null, 2), "utf8"); }
function writeArtifacts() {
  try {
    fs.writeFileSync(LOG_FILE, logLines.join("\n") + "\n", "utf8");
    fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), "utf8");
  } catch { /* best effort */ }
}

// ---- existing items ----
async function listExisting(serviceId) {
  const j = await req("GET", `${BASE_URL}/services/subservices?serviceId=${serviceId}&lang=en&pageSize=100`);
  return j?.data?.items || [];
}

// the upsert body never carries the script's internal bookkeeping keys
function toBody(p) {
  const body = { ...p };
  for (const k of ["__srcSlug", "__enTitle", "sectionKey"]) delete body[k];
  return body;
}

/**
 * Send the largest real payload as an inactive throwaway, then delete it, before the bulk
 * run. The probe measures one column at a time; this measures the whole request, so a
 * problem with the combined size shows up on one write instead of thirty-three. The title
 * is marked so the sweep can find the row again if the cleanup request is lost.
 */
async function rehearse(payloads, route = "admin") {
  const biggest = [...payloads].sort((a, b) => JSON.stringify(b).length - JSON.stringify(a).length)[0];
  const body = toBody(biggest);
  body.isActive = false;
  // toBody() is a shallow copy, so the localized title object is SHARED with the real
  // payload - marking it in place would send "rehearse ..." into the catalog on the next
  // write of that item (it did), so the throwaway gets its own title object
  body.title = { ...body.title };
  for (const lang of LANGS) body.title[lang] = `rehearse ${body.title[lang]}`.slice(0, 280);
  log(`\n--- rehearsing the largest payload: ${biggest.__srcSlug} (${JSON.stringify(body).length} bytes) ---`);
  let id = null;
  try {
    const j = await req("POST", `${BASE_URL}/services/subservices`, { json: body, maxTries: 2 });
    id = idOf(j);
    log(`  + a real payload is accepted (${id})`);
    clearFailure(`rehearsal:${biggest.__srcSlug}`);
    return true;
  } catch (e) {
    recordFailure(`rehearsal:${biggest.__srcSlug}`, e);
    log(`  ! the backend refused a real payload: ${String(e.message).slice(0, 200)}`);
    return false;
  } finally {
    if (id) {
      try { await req("DELETE", deleteUrl(id, route), { maxTries: 3 }); log(`  - rehearsal item cleaned up (${route} route)`); }
      catch (e) { log(`  ! rehearsal item ${id} NOT deleted (${String(e.message).slice(0, 120)}) - run --sweep-probes later`); }
    }
  }
}

async function writeOne(body, match) {
  if (match) {
    await req("PUT", `${BASE_URL}/services/subservices/${match.id}`, { json: body });
    return { id: match.id, updated: true };
  }
  const j = await req("POST", `${BASE_URL}/services/subservices`, { json: body });
  const id = idOf(j);
  if (!id) throw new Error(`POST returned no id: ${JSON.stringify(j).slice(0, 200)}`);
  return { id, updated: false };
}

/**
 * Does a PUT without nested child ids replace or append the children? Checked right
 * after a remapped demo item is written (the plan, Part B step 5), because those
 * items arrive with hand-authored option/feature rows that must not survive.
 *
 * The comparison is by group NAME, not by index: this backend answers with its own
 * displayOrder, and an index comparison turned a correctly stored item into a false
 * "values 2 vs 1 sent" report.
 */
async function checkChildren(id, p) {
  const tally = (list, nameOf, valuesOf) => {
    const map = new Map();
    for (const entry of list) {
      const name = normKey(nameOf(entry));
      map.set(name, (map.get(name) || 0) + valuesOf(entry).length);
    }
    return map;
  };
  try {
    const j = await req("GET", `${BASE_URL}/services/subservices/${id}?lang=en`);
    const d = j?.data || {};
    const gotFeatures = d.features || [];
    const gotOptions = d.options || [];
    const problems = [];
    if (gotFeatures.length !== p.features.length) problems.push(`features ${gotFeatures.length} on the server vs ${p.features.length} sent`);
    if (gotOptions.length !== p.options.length) problems.push(`options ${gotOptions.length} on the server vs ${p.options.length} sent`);
    const compare = (label, want, got) => {
      for (const [name, count] of want) {
        if (!got.has(name)) problems.push(`${label} "${name}" is missing on the server`);
        else if (got.get(name) !== count) problems.push(`${label} "${name}" has ${got.get(name)} value(s) vs ${count} sent`);
      }
      for (const name of got.keys()) if (!want.has(name)) problems.push(`${label} "${name}" survived the PUT (stale row)`);
    };
    compare("feature", tally(p.features, (f) => f.name?.en, (f) => f.values || []), tally(gotFeatures, (f) => f.name, (f) => f.values || []));
    compare("option", tally(p.options, (o) => o.name?.en, (o) => o.values || []), tally(gotOptions, (o) => o.name, (o) => o.values || []));
    log(`  . checkpoint ${id}: ${problems.length ? problems.join("; ") : "child rows replaced cleanly"}`);
    if (problems.length) report.push({ srcSlug: p.__srcSlug, problem: "remap-child-check", detail: problems.join("; ") });
  } catch (e) {
    log(`  ~ checkpoint for ${id} failed: ${String(e.message).slice(0, 140)}`);
  }
}

async function seedItems(payloads, guids, state) {
  if (OPTS.dryRun) return { created: 0, updated: 0, skipped: payloads.length, failed: 0, aborted: false };
  const existingByService = {};
  for (const key of Object.values(SECTION_CONFIG_KEY)) {
    const guid = guids[key];
    try {
      existingByService[guid] = await listExisting(guid);
      log(`  existing ${key}: ${existingByService[guid].length} item(s) [${existingByService[guid].map((i) => `${i.title}${i.isActive ? "" : " (inactive)"}`).join(" | ")}]`);
    } catch (e) {
      log(`  ! could not list existing items for ${key}: ${e.message}`);
      existingByService[guid] = [];
    }
  }

  const summary = { created: 0, updated: 0, skipped: 0, failed: 0, aborted: false };
  // the endpoint answers 500 in bursts while the App Service is cycling; three in a
  // row mean the backend is unhealthy, not that one payload is wrong
  let serverErrors = 0;
  for (const p of payloads) {
    const srcSlug = p.__srcSlug;
    const prev = state.bySrcSlug[srcSlug];
    if (prev && !OPTS.force) {
      summary.skipped++;
      log(`  = ${srcSlug} already seeded as ${prev.id} (${prev.via || "create"}), skipping`);
      continue;
    }
    const known = existingByService[p.serviceId] || [];
    const remapId = REMAP_ID_BY_SLUG.get(srcSlug) || null;
    const remapItem = remapId ? known.find((it) => it.id === remapId) : null;
    if (remapId && !remapItem) log(`  ! ${srcSlug}: demo item ${remapId} is not under ${p.sectionKey} anymore, using the normal path`);
    const match = remapItem || known.find((it) => normKey(it.title) === normKey(p.title.en)) || null;
    const mark = (res) => {
      state.bySrcSlug[srcSlug] = {
        id: res.id,
        section: p.sectionKey,
        seededAt: new Date().toISOString(),
        via: res.updated ? (remapItem ? "demo-remap" : "title-match") : "create",
        titleMatchedExisting: res.updated,
        replacedTitle: remapItem?.title || null,
        imagesUploaded: prev?.imagesUploaded || 0,
        imageIds: prev?.imageIds || [],
      };
      saveState(state);
      if (res.updated) summary.updated++;
      else summary.created++;
      log(res.updated
        ? `  ^ ${srcSlug} -> ${remapItem ? "remapped demo" : "updated"} ${res.id} (was "${match.title}")`
        : `  + ${srcSlug} -> created ${res.id} (${p.title.en})`);
    };
    try {
      const res = await writeOne(toBody(p), match);
      mark(res);
      clearFailure(srcSlug); // an earlier 500 for this item is answered, not still open
      serverErrors = 0;
      if (remapItem) await checkChildren(res.id, p);
    } catch (e) {
      recordFailure(srcSlug, e);
      summary.failed++;
      if (!e.status || e.status >= 500) {
        serverErrors++;
        if (serverErrors >= 3) {
          summary.aborted = true;
          log(`  !! ${serverErrors} consecutive server-side failures - the backend is unhealthy, stopping the run`);
          log(`     resume with: node scripts/seedSiteServices.mjs --stage ${OPTS.stage}${OPTS.section ? ` --section ${OPTS.section}` : ""}`);
          break;
        }
      } else {
        serverErrors = 0;
      }
    }
    await sleep(400);
  }
  return summary;
}

function recordFailure(srcSlug, e) {
  log(`  ! ${srcSlug}: ${e.message}`);
  failures = failures.filter((f) => f.srcSlug !== srcSlug);
  failures.push({ srcSlug, status: e.status || 0, body: e.body || String(e.message).slice(0, 400), at: new Date().toISOString() });
  saveFailures();
}

/**
 * A write that succeeds makes any earlier failure for the same item obsolete. Without this
 * the failures file would keep reporting an HTTP 500 that a later run already recovered from,
 * and the verifier would call a healthy catalog broken.
 */
function clearFailure(srcSlug) {
  const before = failures.length;
  failures = failures.filter((f) => f.srcSlug !== srcSlug);
  if (failures.length !== before) saveFailures();
}

// ---- seeding ----
async function seedImages(payloads, state) {
  if (OPTS.dryRun) return { uploaded: 0, skipped: payloads.length, failed: 0, aborted: false };
  const summary = { uploaded: 0, skipped: 0, failed: 0, aborted: false };
  for (const p of payloads) {
    const srcSlug = p.__srcSlug;
    const st = state.bySrcSlug[srcSlug];
    if (!st?.id) { summary.skipped++; continue; }
    if (st.imagesUploaded >= MAX_IMAGES && !OPTS.force) { summary.skipped++; continue; }
    const rec = payloadIndex.get(srcSlug);
    const files = (rec?.images || []).slice(0, MAX_IMAGES)
      .map((img) => (img.localPath ? path.join(ROOT, img.localPath) : ""))
      .filter((f) => f && fs.existsSync(f) && ALLOWED_EXT.has(path.extname(f).toLowerCase()));
    if (!files.length) {
      log(`  - ${srcSlug}: no local image files`);
      summary.skipped++;
      continue;
    }
    let already = [];
    try {
      const j = await req("GET", `${BASE_URL}/services/subservices/${st.id}?lang=en`);
      already = j?.data?.images || [];
    } catch (e) { log(`  ~ ${srcSlug}: image count probe failed (${String(e.message).slice(0, 140)})`); }
    if (REMAP_ID_BY_SLUG.has(srcSlug) && already.length && !st.replacedImages) {
      // a remapped demo item carries section artwork (public/Services/<section>/hero.*),
      // not a photo of the item - drop it so the gallery is item-specific
      const refused = [];
      for (const im of already) {
        try { await req("DELETE", `${BASE_URL}/services/subservices/images/${im.id}`); }
        catch (e) { refused.push(im.id); log(`  ! ${srcSlug}: stale image ${im.id} not deleted (${String(e.message).slice(0, 120)})`); }
      }
      if (refused.length) {
        // uploading now would append the real photos behind the leftover section artwork,
        // so the item would render a hero image as its first gallery slide. keep the
        // bookkeeping untouched so the next run retries the removal.
        report.push({ srcSlug, problem: "stale-images-not-removable", detail: `${refused.length}/${already.length} image(s) refused DELETE (${refused.join(", ")})` });
        summary.failed++;
        continue;
      }
      state.bySrcSlug[srcSlug].replacedImages = already.map((im) => im.id);
      state.bySrcSlug[srcSlug].replacedImageUrls = already.map((im) => im.imageUrl);
      saveState(state);
      log(`  - ${srcSlug}: removed ${already.length} stale demo image(s)`);
      already = [];
    }
    if (already.length >= 1 && !OPTS.force) { summary.skipped++; log(`  = ${srcSlug} already has ${already.length} image(s)`); continue; }
    const form = new FormData();
    for (const f of files) form.append("files", new File([fs.readFileSync(f)], path.basename(f), { type: mimeFor(f) }));
    try {
      const j = await req("POST", `${BASE_URL}/services/subservices/${st.id}/images`, { form });
      const imgs = Array.isArray(j?.data) ? j.data : j?.data?.items || [];
      state.bySrcSlug[srcSlug].imagesUploaded = files.length;
      state.bySrcSlug[srcSlug].imageIds = imgs.map((i) => i.id).filter(Boolean);
      saveState(state);
      summary.uploaded++;
      log(`  + ${srcSlug}: uploaded ${files.length} image(s) -> ${st.id}`);
    } catch (e) {
      recordFailure(srcSlug, e);
      summary.failed++;
    }
    await sleep(400);
  }
  return summary;
}

/**
 * --emit-slugs: writes the committed sub-item-id -> readable-slug table that
 * shared/utils/serviceItemUrl.ts reads, straight from the seed state file. The
 * legacy site addressed every item as /pages/service-details.php?slug=<srcSlug>,
 * so reusing those exact slugs keeps the old keyword URLs and inbound links alive
 * instead of inventing new ones from the (localized) titles. Needs no network.
 */
function emitSlugs() {
  const state = loadState();
  const entries = Object.entries(state.bySrcSlug || {})
    .filter(([, rec]) => rec?.id && rec?.section)
    .map(([srcSlug, rec]) => ({ id: rec.id, slug: srcSlug, section: rec.section }));
  if (!entries.length) {
    log(`emit-slugs: ${path.relative(ROOT, STATE_PATH)} has no bySrcSlug entries - run the seed first`);
    process.exit(1);
  }
  const seen = new Map();
  for (const e of entries) {
    const prev = seen.get(e.id);
    if (prev) log(`emit-slugs: ! duplicate id ${e.id} (${prev.slug} | ${e.slug}) - keeping ${prev.slug}`);
    if (!prev) seen.set(e.id, e.slug);
  }
  const rows = [...seen.entries()]
    .sort((a, b) => a[1].localeCompare(b[1]))
    .map(([id, slug]) => `  ${JSON.stringify(id)}: ${JSON.stringify(slug)},`);
  // the legacy item URL carried no section, so the reverse table is what lets
  // proxy.ts turn /pages/service-details.php?slug=x into /en/services/{section}/x
  const sectionRows = entries
    .filter((e) => seen.get(e.id) === e.slug)
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map(({ slug, section }) => `  ${JSON.stringify(slug)}: ${JSON.stringify(section)},`);
  const body = `// Generated by \`node scripts/seedSiteServices.mjs --emit-slugs\`. Do not edit by hand.
//
// Backend sub-item id -> the readable URL slug inherited from the legacy PHP site
// (its /pages/service-details.php?slug=<key> values). Items created later in the
// admin UI have no entry here and fall back to slugify(title) in
// shared/utils/serviceItemUrl.ts.

export const SERVICE_ITEM_SLUGS: Record<string, string> = {
${rows.join("\n")}
};

/** Readable slug -> the service section route segment the item belongs to. */
export const SERVICE_ITEM_SECTIONS: Record<string, string> = {
${sectionRows.join("\n")}
};
`;
  fs.writeFileSync(SLUGS_TS, body, "utf8");
  log(`emit-slugs: ${rows.length} slugs (${sectionRows.length} sections) -> ${path.relative(ROOT, SLUGS_TS)}`);
  writeArtifacts();
  process.exit(0);
}

// ---- main ----
let payloadIndex = new Map();

async function main() {
  const guids = readConfigGuids();
  const limitSource = OPTS.maxLen ? "--max-len" : fs.existsSync(LIMIT_REPORT_PATH) ? "limit-report.json" : "default 500 - run --probe-limits";
  log(`parents: ${Object.entries(SECTION_CONFIG_KEY).map(([s, k]) => `${s}=${k}/${guids[k]}`).join("  ")}`);
  log(`limits: body=${BODY_LIMIT} (description=${LIMITS.description} note=${LIMITS.note} featureValue=${LIMITS.featureValue} via ${limitSource}) short=${SHORT_FIELD_LIMIT} heading=${HEADING_LIMIT} groups<=${MAX_FEATURE_GROUPS} values<=${MAX_FEATURE_VALUES} images<=${MAX_IMAGES}`);

  if (OPTS.emitSlugs) emitSlugs();

  if (OPTS.sweepProbes) {
    // cleanup only: no new items, so a DELETE that failed during a probe can be retried
    if (!TOKEN) { log("no ADMIN_TOKEN (env or dataEntry/.admin-token)"); process.exit(2); }
    if (!(await waitForHealth())) process.exit(3);
    const del = await deleteWorks();
    if (!del.ok) {
      log(`sweep: neither DELETE route answers (HTTP ${del.status || "no response"}) - nothing was removed`);
      writeArtifacts();
      process.exit(1);
    }
    const swept = await sweepProbeItems(guids, { route: del.route });
    log(`sweep (${del.route} route, soft delete): removed=${swept.removed} stillStuck=${swept.stuck.length}${swept.stuck.length ? ` (${swept.stuck.join(", ")})` : ""}`);
    if (swept.stuck.length) log("these need to be deleted in the admin UI - the API refused DELETE for them");
    writeArtifacts();
    process.exit(swept.stuck.length ? 1 : 0);
  }

  if (OPTS.probeLimits) {
    // Part A: synthetic writes only - the ladder runs on one probe row, never on real content
    if (!TOKEN) { log("no ADMIN_TOKEN (env or dataEntry/.admin-token)"); process.exit(2); }
    if (!(await waitForHealth())) process.exit(3);
    try {
      await probeLimits(guids);
    } catch (e) {
      log(`probe aborted: ${String(e.message).slice(0, 300)}`);
      writeArtifacts();
      process.exit(1);
    }
    writeArtifacts();
    return;
  }

  if (!fs.existsSync(ITEMS_PATH)) {
    log(`missing ${path.relative(ROOT, ITEMS_PATH)} - run scripts/scrapeSiteServices.mjs first`);
    process.exit(2);
  }
  const records = JSON.parse(fs.readFileSync(ITEMS_PATH, "utf8"));

  let recs = records.filter((r) => r.en?.title);
  if (OPTS.section) recs = recs.filter((r) => r.section === OPTS.section);
  if (OPTS.only) recs = recs.filter((r) => r.srcSlug === OPTS.only);
  recs = recs.slice(0, OPTS.limit);
  if (!recs.length) { log("nothing to do"); process.exit(1); }

  const payloads = recs.map((rec) => {
    const p = buildPayload(rec, guids);
    p.sectionKey = rec.section;
    payloadIndex.set(rec.srcSlug, rec);
    return p;
  });

  if (OPTS.validate) {
    let bad = 0;
    for (const p of payloads) {
      const problems = validatePayload(p);
      if (problems.length) {
        bad++;
        log(`INVALID ${p.__srcSlug}\n    ${problems.join("\n    ")}`);
      }
    }
    log(`validate: ${payloads.length - bad}/${payloads.length} payloads OK (body limit ${BODY_LIMIT})`);
    // the effective caps can only ever be tightened by the probe; show where they differ
    const tightened = PROBE_FIELDS.filter((f) => { const d = designCapFor(f); return capFor(f, d) < d; });
    if (LIMIT_REPORT) log(`  caps from limit-report.json: ${Object.entries(LIMIT_REPORT.fields).map(([k, v]) => `${k}=${v}`).join(" ")}`);
    if (OPTS.maxLen) log(`  note: --max-len ${OPTS.maxLen} overrides the probe for description / note / feature values`);
    log(`  body budgets: description=${LIMITS.description} note=${LIMITS.note} featureValue=${LIMITS.featureValue}`);
    if (tightened.length) log(`  fields validated below their design cap: ${tightened.map((f) => `${f}=${capFor(f, designCapFor(f))}`).join(" ")}`);
    if ((LIMIT_REPORT?.inconclusiveFields || []).length) log(`  ! unresolved by the probe (design cap used): ${LIMIT_REPORT.inconclusiveFields.join(", ")}`);
    writeArtifacts();
    process.exit(bad ? 1 : 0);
  }

  const state = loadState();

  if (OPTS.dryRun) {
    const file = path.join(OUT, "dry-payloads.json");
    fs.writeFileSync(file, JSON.stringify(payloads.slice(0, 3), null, 2), "utf8");
    log(`dry-run: ${payloads.length} payloads built, first 3 -> ${path.relative(ROOT, file)}`);
    // which path a payload takes depends on what the API already holds, and listing is
    // read-only - so a dry run is allowed to look, and falls back to the offline label
    const existingByService = {};
    try {
      for (const key of Object.values(SECTION_CONFIG_KEY)) existingByService[guids[key]] = await listExisting(guids[key]);
    } catch (e) {
      log(`  ~ no live listing (${String(e.message).slice(0, 120)}) - the write path column below is offline-only`);
    }
    const looked = Object.keys(existingByService).length > 0;
    let remaps = 0, updates = 0, skips = 0;
    for (const p of payloads) {
      const problems = validatePayload(p);
      const note = p.note ? p.note.en : "";
      const noteLines = note ? note.split("\n").length : 0;
      const values = p.features.reduce((n, f) => n + f.values.length, 0);
      const known = existingByService[p.serviceId];
      const remapId = REMAP_ID_BY_SLUG.get(p.__srcSlug) || null;
      let via = "create";
      if (state.bySrcSlug[p.__srcSlug] && !OPTS.force) { via = `skip=${state.bySrcSlug[p.__srcSlug].id.slice(0, 8)}`; skips++; }
      else if (!looked) via = remapId ? `remap->${remapId.slice(0, 8)}` : "create/title-match";
      else if (remapId) via = known.some((it) => it.id === remapId) ? `remap->${remapId.slice(0, 8)}` : `!demo ${remapId.slice(0, 8)} gone`;
      else {
        const m = (known || []).find((it) => normKey(it.title) === normKey(p.title.en));
        if (m) { via = `update=${m.id.slice(0, 8)}`; updates++; }
      }
      if (remapId && via.startsWith("remap")) remaps++;
      log(`  - ${p.__srcSlug.padEnd(28)} $${String(p.basePriceUSD).padEnd(4)} groups=${p.features.length} values=${values} desc=${p.description.en.length}c note=${noteLines}L/${note.length}c ${via.padEnd(18)} ${problems.length ? `!! ${problems[0]}` : "ok"}`);
    }
    log(`dry-run: ${remaps} demo remap(s), ${updates} title match(es)${looked ? "" : " (not resolved - no live listing)"}, ${skips} already seeded, the rest are created`);
    writeArtifacts();
    return;
  }

  if (!TOKEN) { log("no ADMIN_TOKEN (env or dataEntry/.admin-token)"); process.exit(2); }
  if (!(await waitForHealth())) process.exit(3);

  const runItems = OPTS.stage === "all" || OPTS.stage === "items";
  const runImages = OPTS.images && (OPTS.stage === "all" || OPTS.stage === "images");
  let aborted = false;
  if (runItems) {
    // only worth a write when there is something to write: the idempotency re-run
    // skips every payload and must not create a throwaway item
    const pending = payloads.filter((p) => OPTS.force || !state.bySrcSlug[p.__srcSlug]);
    if (pending.length) {
      // the rehearsal is itself a throwaway row, so it only makes sense when it can be
      // removed again; without DELETE the bulk run simply has to be trusted
      const del = await deleteWorks();
      if (!del.ok) {
        log(`  ~ rehearsal skipped: no DELETE route answers (HTTP ${del.status || "no response"}), so a throwaway row could not be cleaned up afterwards`);
        log("     the probe measures one column at a time; without a rehearsal the combined request size is untested.");
      } else if (!(await rehearse(pending, del.route))) {
        log("aborting before the bulk write: the backend refused a real payload.");
        log("re-check the caps with --probe-limits, or lower the body budgets with --max-len.");
        writeArtifacts();
        process.exit(4);
      }
    }
    log(`\n--- items stage (${payloads.length} payloads, ${pending.length} to write) ---`);
    const s = await seedItems(payloads, guids, state);
    log(`items: created=${s.created} updated=${s.updated} skipped=${s.skipped} failed=${s.failed}${s.aborted ? " ABORTED (unhealthy backend)" : ""}`);
    aborted = s.aborted;
  }
  if (runImages && !aborted) {
    log(`\n--- images stage ---`);
    const s = await seedImages(payloads, state);
    log(`images: uploaded=${s.uploaded} skipped=${s.skipped} failed=${s.failed}`);
    aborted = s.aborted;
  }
  log(`report entries=${report.length} -> ${path.relative(ROOT, REPORT_PATH)}`);
  log(`failures -> ${path.relative(ROOT, FAILURE_PATH)} (${failures.length})`);
  writeArtifacts();
  if (failures.length || aborted) process.exitCode = 1;
}

main().catch((e) => {
  log(`FATAL ${e?.stack || e}`);
  try {
    fs.writeFileSync(LOG_FILE, logLines.join("\n") + "\n", "utf8");
    fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), "utf8");
  } catch { /* best effort */ }
  process.exit(1);
});
