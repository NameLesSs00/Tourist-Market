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
 *     [--limit N] [--dry-run] [--force] [--no-images] [--validate] [--calibrate]
 *     [--max-len N]
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
const CONFIG_TS = path.join(ROOT, "components", "UserComp", "Services", "config", "siteServicesConfig.ts");

const LANGS = ["en", "de", "fr", "ru"];
const MAX_FEATURE_GROUPS = 8;
const MAX_FEATURE_VALUES = 20;
const MAX_IMAGES = 6;
const SHORT_FIELD_LIMIT = 500; // title / subtitle / textTopImage / group + option names
const HEADING_LIMIT = 120; // feature group names (the scraper caps headings here too)
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

const NOTES_HEADING_RE = /(notes?|hinweise|opmerkingen|remarques|примечани|условия|anmerkung)/i;
const NUMBERED_RE = /^\s*\d+[).]\s*/;
// double-encoded UTF-8 read back as latin1/cp1252: â€, Ã©, Â , Ñ€ (never valid text)
const MOJIBAKE_RE = /\u00E2\u20AC|\u00C3[\u0080-\u00FF]|\u00C2[\u0080-\u00BF]|\u00D1\u20AC/u;

// ---- CLI ----
function parseArgs(argv) {
  const opts = { stage: "all", section: null, only: null, limit: Infinity, dryRun: false, force: false, images: true, validate: false, calibrate: false, maxLen: null };
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
    else if (a === "--calibrate") opts.calibrate = true;
    else if (a === "--max-len") opts.maxLen = Number(argv[++i]);
  }
  return opts;
}
const OPTS = parseArgs(process.argv.slice(2));

// description/note budget; settled by the calibration run (see the plan, Stage 0)
const BODY_LIMIT = OPTS.maxLen || 500;

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
        if (text.length > BODY_LIMIT) {
          report.push({ srcSlug: rec.srcSlug, lang, problem: "feature-value-truncated", detail: `section ${i} value ${j}: ${text.length} -> <=${BODY_LIMIT} chars` });
        }
        v[lang] = cutToLimit(text, BODY_LIMIT);
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
      if (len + add > BODY_LIMIT) break;
      len += add;
      k = i + 1;
    }
    return k;
  };
  let keep = Math.min(...LANGS.map((lang) => fitting(perLangItems[lang])));
  if (keep === 0) keep = 1; // never lose everything to the overflow group
  const note = {};
  for (const lang of LANGS) note[lang] = cutToLimit(perLangItems[lang].slice(0, keep).filter(Boolean).join("\n"), BODY_LIMIT);
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
  for (const lang of LANGS) out[lang] = cutToLimit(perLang[lang], BODY_LIMIT);
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
    features,
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
  check("title", p.title, SHORT_FIELD_LIMIT, { required: true });
  check("subtitle", p.subtitle, SHORT_FIELD_LIMIT);
  check("textTopImage", p.textTopImage, SHORT_FIELD_LIMIT);
  check("description", p.description, BODY_LIMIT, { required: true });
  check("note", p.note, BODY_LIMIT);
  check("alert", p.alert, SHORT_FIELD_LIMIT);
  if (!p.title.en) problems.push("title.en is empty");
  if (!p.description.en) problems.push("description.en is empty");
  if (!Number.isFinite(p.basePriceUSD) || p.basePriceUSD < 0) problems.push(`basePriceUSD invalid (${p.basePriceUSD})`);
  if (p.features.length > MAX_FEATURE_GROUPS + 1) problems.push(`feature groups ${p.features.length} > cap`);
  p.features.forEach((f, i) => {
    check(`features[${i}].name`, f.name, HEADING_LIMIT);
    if (!f.values.length) problems.push(`features[${i}] has no values`);
    if (f.values.length > MAX_FEATURE_VALUES) problems.push(`features[${i}] has ${f.values.length} values (> ${MAX_FEATURE_VALUES})`);
    f.values.forEach((v, j) => check(`features[${i}].values[${j}].name`, v.name, BODY_LIMIT));
  });
  p.options.forEach((o, i) => {
    check(`options[${i}].name`, o.name, SHORT_FIELD_LIMIT);
    o.values.forEach((v, j) => {
      check(`options[${i}].values[${j}].key`, v.key, SHORT_FIELD_LIMIT);
      check(`options[${i}].values[${j}].value`, v.value, SHORT_FIELD_LIMIT);
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
  for (const k of ["__srcSlug", "__enTitle", "sectionKey", "__calibrated", "__subtitleRetried"]) delete body[k];
  return body;
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

async function seedItems(payloads, guids, state) {
  if (OPTS.dryRun) return { created: 0, updated: 0, skipped: payloads.length, failed: 0 };
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

  const summary = { created: 0, updated: 0, skipped: 0, failed: 0 };
  for (const p of payloads) {
    const srcSlug = p.__srcSlug;
    const prev = state.bySrcSlug[srcSlug];
    if (prev && !OPTS.force) {
      summary.skipped++;
      log(`  = ${srcSlug} already seeded as ${prev.id}, skipping`);
      continue;
    }
    const match = (existingByService[p.serviceId] || []).find((it) => normKey(it.title) === normKey(p.title.en));
    const mark = (res) => {
      state.bySrcSlug[srcSlug] = {
        id: res.id,
        section: p.sectionKey,
        seededAt: new Date().toISOString(),
        titleMatchedExisting: res.updated,
        imagesUploaded: prev?.imagesUploaded || 0,
        imageIds: prev?.imageIds || [],
      };
      saveState(state);
      res.updated ? summary.updated++ : summary.created++;
      log(res.updated
        ? `  ^ ${srcSlug} -> updated existing ${res.id} ("${match.title}")`
        : `  + ${srcSlug} -> created ${res.id} (${p.title.en})`);
    };
    try {
      mark(await writeOne(toBody(p), match));
    } catch (e) {
      recordFailure(srcSlug, e);
      summary.failed++;
    }
    await sleep(150);
  }
  return summary;
}

function recordFailure(srcSlug, e) {
  log(`  ! ${srcSlug}: ${e.message}`);
  failures = failures.filter((f) => f.srcSlug !== srcSlug);
  failures.push({ srcSlug, status: e.status || 0, body: e.body || String(e.message).slice(0, 400), at: new Date().toISOString() });
  saveFailures();
}

// ---- seeding ----
async function seedImages(payloads, state) {
  if (OPTS.dryRun) return { uploaded: 0, skipped: payloads.length, failed: 0 };
  const summary = { uploaded: 0, skipped: 0, failed: 0 };
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
    let already = 0;
    if (!OPTS.force) {
      try {
        const j = await req("GET", `${BASE_URL}/services/subservices/${st.id}?lang=en`);
        already = (j?.data?.images || []).length;
      } catch (e) { log(`  ~ ${srcSlug}: image count probe failed (${e.message})`); }
      if (already >= 1) { summary.skipped++; log(`  = ${srcSlug} already has ${already} image(s)`); continue; }
    }
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
    await sleep(200);
  }
  return summary;
}

// ---- main ----
let payloadIndex = new Map();

async function main() {
  if (!fs.existsSync(ITEMS_PATH)) {
    log(`missing ${path.relative(ROOT, ITEMS_PATH)} - run scripts/scrapeSiteServices.mjs first`);
    process.exit(2);
  }
  const records = JSON.parse(fs.readFileSync(ITEMS_PATH, "utf8"));
  const guids = readConfigGuids();
  log(`parents: ${Object.entries(SECTION_CONFIG_KEY).map(([s, k]) => `${s}=${k}/${guids[k]}`).join("  ")}`);
  log(`limits: body=${BODY_LIMIT} short=${SHORT_FIELD_LIMIT} heading=${HEADING_LIMIT} groups<=${MAX_FEATURE_GROUPS} values<=${MAX_FEATURE_VALUES} images<=${MAX_IMAGES}`);

  let recs = records.filter((r) => r.en?.title);
  if (OPTS.section) recs = recs.filter((r) => r.section === OPTS.section);
  if (OPTS.only) recs = recs.filter((r) => r.srcSlug === OPTS.only);

  if (OPTS.calibrate) {
    // Stage 0: push one deliberately over-500 description to learn the real cap
    recs = recs.slice(0, 1);
  }
  recs = recs.slice(0, OPTS.limit);
  if (!recs.length) { log("nothing to do"); process.exit(1); }

  const payloads = recs.map((rec) => {
    const p = buildPayload(rec, guids);
    p.sectionKey = rec.section;
    payloadIndex.set(rec.srcSlug, rec);
    if (OPTS.calibrate) {
      // a deliberate 600-char body to learn whether the sub-service cap is looser
      for (const lang of LANGS) {
        let t = p.description[lang];
        while (t.length < 600) t += " " + p.description.en;
        p.description[lang] = t.slice(0, 600);
      }
      p.__calibrated = true;
    }
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
    writeArtifacts();
    process.exit(bad ? 1 : 0);
  }

  if (OPTS.dryRun) {
    const file = path.join(OUT, "dry-payloads.json");
    fs.writeFileSync(file, JSON.stringify(payloads.slice(0, 3), null, 2), "utf8");
    log(`dry-run: ${payloads.length} payloads built, first 3 -> ${path.relative(ROOT, file)}`);
    for (const p of payloads) {
      const problems = validatePayload(p);
      const noteLines = p.note.en ? p.note.en.split("\n").length : 0;
      const values = p.features.reduce((n, f) => n + f.values.length, 0);
      log(`  - ${p.__srcSlug.padEnd(28)} $${String(p.basePriceUSD).padEnd(4)} groups=${p.features.length} values=${values} desc=${p.description.en.length}c note=${noteLines}L/${p.note.en.length}c ${problems.length ? `!! ${problems[0]}` : "ok"}`);
    }
    writeArtifacts();
    return;
  }

  if (!TOKEN) { log("no ADMIN_TOKEN (env or dataEntry/.admin-token)"); process.exit(2); }

  const state = loadState();
  if (OPTS.calibrate) {
    // Stage 0: one probe POST with a 600-char description, then delete it again
    const p = payloads[0];
    let id = null;
    try {
      const j = await req("POST", `${BASE_URL}/services/subservices`, { json: toBody(p) });
      id = idOf(j);
      log(`CALIBRATION: 600-char description ACCEPTED (id=${id || "?"}) -> the cap is looser than 500; re-run with --max-len 2000`);
    } catch (e) {
      if (e.status === 400) {
        log("CALIBRATION: 600-char description REJECTED (400) -> keep the body limit at 500");
        log(`  ${String(e.message).slice(0, 400)}`);
      } else {
        recordFailure(p.__srcSlug, e);
        log(`CALIBRATION: unexpected ${e.status || "error"}: ${String(e.message).slice(0, 200)}`);
      }
    } finally {
      if (id) {
        try {
          await req("DELETE", `${BASE_URL}/services/subservices/${id}`);
          log(`  probe item ${id} deleted again`);
        } catch (e) {
          log(`  ! could not delete the probe item ${id}: ${e.message} - remove it in the admin UI`);
        }
      }
    }
    writeArtifacts();
    return;
  }

  const runItems = OPTS.stage === "all" || OPTS.stage === "items";
  const runImages = OPTS.images && (OPTS.stage === "all" || OPTS.stage === "images");
  if (runItems) {
    log(`\n--- items stage (${payloads.length} payloads) ---`);
    const s = await seedItems(payloads, guids, state);
    log(`items: created=${s.created} updated=${s.updated} skipped=${s.skipped} failed=${s.failed}`);
  }
  if (runImages) {
    log(`\n--- images stage ---`);
    const s = await seedImages(payloads, state);
    log(`images: uploaded=${s.uploaded} skipped=${s.skipped} failed=${s.failed}`);
  }
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), "utf8");
  log(`report entries=${report.length} -> ${path.relative(ROOT, REPORT_PATH)}`);
  log(`failures -> ${path.relative(ROOT, FAILURE_PATH)} (${failures.length})`);
  writeArtifacts();
  if (failures.length) process.exitCode = 1;
}

main().catch((e) => {
  log(`FATAL ${e?.stack || e}`);
  try {
    fs.writeFileSync(LOG_FILE, logLines.join("\n") + "\n", "utf8");
    fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), "utf8");
  } catch { /* best effort */ }
  process.exit(1);
});
