#!/usr/bin/env node
/**
 * Verify the Site Services catalog against the live backend.
 *
 * Reads dataEntry/siteServices/items.json (what was scraped) and GETs the four parent
 * services once per language - token-free, exactly the way the site reads them - then
 * checks:
 *   - coverage     : every active item is present per language, with the expected count
 *                    per section, and the three remapped demo ids render as active
 *   - required text: title / description non-empty; subtitle / textTopImage / note / alert
 *                    non-empty or ABSENT - an empty string is a failure, null is not
 *   - length caps  : no stored string exceeds the per-field cap from limit-report.json
 *                    (500 when the report is missing), and nothing looks mis-encoded
 *   - pricing      : basePriceUSD > 0 has exactly one Rate Basis value, basePriceUSD 0 has
 *                    no option group at all
 *   - structure    : at least one feature group, each with at least one value, and no
 *                    duplicated group/value names (the API rejects those with a 400)
 *   - gallery      : at least one image, displayOrder ascending, usable image path
 *   - localization : de/fr/ru text actually differs from EN, read the way the site reads it
 *                    (Accept-Language header, because the lang query param is ignored)
 *   - bookkeeping  : every scraped srcSlug made it to the backend, and whatever the seeder
 *                    recorded in .seed-services-failures.json is restated
 *
 * Usage:
 *   node scripts/verifySiteServices.mjs
 *   node scripts/verifySiteServices.mjs --expect-file --show-problems 30
 *   node scripts/verifySiteServices.mjs --langs en,de
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BASE_URL = (process.env.API_BASE_URL || "https://touristtt.runasp.net/api").replace(/\/+$/, "");
const OUT = path.join(ROOT, "dataEntry", "siteServices");
const ITEMS_PATH = path.join(OUT, "items.json");
const LIMIT_REPORT_PATH = path.join(OUT, "limit-report.json");
const FAILURES_PATH = path.join(ROOT, "dataEntry", ".seed-services-failures.json");
const VERIFY_OUT = path.join(OUT, "verify.json");
const CONFIG_TS = path.join(ROOT, "components", "UserComp", "Services", "config", "siteServicesConfig.ts");

const LANGS = ["en", "de", "fr", "ru"];
const SECTIONS = ["tourist", "car-rental", "vip-airport", "real-estate"];
const SECTION_CONFIG_KEY = {
  tourist: "touristServices",
  "car-rental": "carRental",
  "vip-airport": "vipAirport",
  "real-estate": "realEstate",
};
// the active counts the catalog is supposed to end at (33 items in total)
const EXPECTED_ACTIVE = { tourist: 12, "car-rental": 10, "vip-airport": 6, "real-estate": 5 };
// the three pre-existing demo items that were remapped instead of duplicated
const DEMO_IDS = {
  "10d03700-ed85-46a7-90c3-830b124118b6": "toyota-corolla",
  "ddee2801-008c-4f7b-b33e-ddbcf6780889": "meet-assist-vip-lounge",
  "c1785ddb-9b0a-41ae-b993-1f62a657b456": "one7-residence-hurghada",
};
// fields that may legitimately be absent (null) and may never be an empty string
const NULLABLE = ["subtitle", "textTopImage", "note", "alert"];
const DEFAULT_CAPS = { title: 500, subtitle: 500, textTopImage: 500, description: 500, note: 500, alert: 500, featureName: 120, featureValue: 500, optionKey: 500, optionValue: 500 };
const MOJIBAKE_RE = /\u00E2\u20AC|\u00C3[\u0080-\u00FF]|\u00C2[\u0080-\u00BF]|\u00D1\u20AC/u;
const LOCALIZED_RATIO_MIN = 0.8;

function parseArgs(argv) {
  const opts = { langs: LANGS, showProblems: 25, expectFile: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--langs") opts.langs = String(argv[++i]).split(",").map((s) => s.trim()).filter(Boolean);
    else if (a === "--show-problems") opts.showProblems = Number(argv[++i]);
    else if (a === "--expect-file") opts.expectFile = true;
  }
  return opts;
}
const OPTS = parseArgs(process.argv.slice(2));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const norm = (s) => String(s || "").trim().toLowerCase().replace(/\s+/g, " ").replace(/[.,;:!]+$/g, "");

async function get(url, lang = "en", attempt = 0) {
  let res;
  try {
    // deliberately no Authorization header: this has to pass on the same public read
    // path the site uses. The language travels in Accept-Language - verified against the
    // live API, where ?lang=/?language=/?culture= all keep answering English while the
    // header returns the translation (which is also what clientApi/siteServiceItemApi.ts sends)
    res = await fetch(url, { headers: { Accept: "application/json", "Accept-Language": lang } });
  } catch (err) {
    const code = err?.cause?.code || err?.code || "";
    if (attempt < 5 && /TIMEOUT|ECONNRESET|ECONNREFUSED|EAI_AGAIN|UND_ERR|SocketError/i.test(`${code} ${err?.message}`)) {
      const wait = 5000 * (attempt + 1);
      console.log(`  ~ transient (${code || err?.message}) ${url}; retry ${wait}ms`);
      await sleep(wait);
      return get(url, lang, attempt + 1);
    }
    throw err;
  }
  if (res.status >= 500 && attempt < 5) {
    const wait = 5000 * (attempt + 1);
    console.log(`  ~ HTTP ${res.status} ${url}; retry ${wait}ms`);
    await sleep(wait);
    return get(url, lang, attempt + 1);
  }
  const text = await res.text();
  let parsed;
  try { parsed = text ? JSON.parse(text) : {}; } catch { parsed = { raw: text }; }
  if (!res.ok) {
    const e = new Error(`HTTP ${res.status} on GET ${url}: ${parsed?.message || text.slice(0, 160)}`);
    e.status = res.status;
    throw e;
  }
  return parsed;
}

function readConfigGuids() {
  const src = fs.readFileSync(CONFIG_TS, "utf8");
  const map = {};
  for (const m of src.matchAll(/(\w+):\s*\{\s*id:\s*"([0-9a-fA-F-]{36})"/g)) map[m[1]] = m[2];
  const missing = SECTIONS.map((s) => SECTION_CONFIG_KEY[s]).filter((k) => !map[k]);
  if (missing.length) throw new Error(`could not read service GUIDs for ${missing.join(", ")} from siteServicesConfig.ts`);
  return map;
}

/** The backend yardstick: the probed cap per field, 500 (and 120 headings) otherwise. */
function readCaps() {
  let report = null;
  try { report = JSON.parse(fs.readFileSync(LIMIT_REPORT_PATH, "utf8")); } catch { /* fall back to 500 */ }
  const caps = { ...DEFAULT_CAPS };
  // the long text columns are budgeted by length, not by their design cap, so a measured
  // length is usable the moment the backend stored it - even when the ladder never climbed
  // above it (an unanswered top rung is a missing measurement, not a smaller column)
  const bodyFields = new Set(["description", "note", "featureValue"]);
  const DESIGN_BODY_CEILING = 2000;
  // a field the probe could not resolve is recorded at its control length, which says
  // nothing about the real cap - the design default is the honest yardstick there
  const unresolved = new Set(report?.inconclusiveFields || []);
  for (const [field, value] of Object.entries(report?.fields || {})) {
    if (!Number.isFinite(value) || value <= 0) continue; // never measured
    if (bodyFields.has(field)) caps[field] = Math.min(value, DESIGN_BODY_CEILING);
    else if (!unresolved.has(field)) caps[field] = Math.min(caps[field], value);
  }
  return { caps, probedAt: report?.probedAt || null, unresolved: [...unresolved] };
}

async function listActive(serviceId, lang) {
  const qs = new URLSearchParams({ serviceId, lang, isActive: "true", pageSize: "100", pageNumber: "1" });
  const j = await get(`${BASE_URL}/services/subservices?${qs}`, lang);
  return j?.data?.items || [];
}

/** Every localized string the backend echoes back, tagged with the field it came from. */
function stringsOf(item) {
  const out = [];
  for (const f of ["title", "subtitle", "description", "textTopImage", "note", "alert"]) {
    if (item[f] !== undefined && item[f] !== null) out.push({ field: f, label: f, text: String(item[f]) });
  }
  for (const [i, g] of (item.features || []).entries()) {
    out.push({ field: "featureName", label: `features[${i}].name`, text: String(g.name || "") });
    for (const [j, v] of (g.values || []).entries()) {
      out.push({ field: "featureValue", label: `features[${i}].values[${j}].name`, text: String(v.name || "") });
    }
  }
  for (const [i, g] of (item.options || []).entries()) {
    out.push({ field: "optionValue", label: `options[${i}].name`, text: String(g.name || "") });
    for (const [j, v] of (g.values || []).entries()) {
      out.push({ field: "optionKey", label: `options[${i}].values[${j}].key`, text: String(v.key || "") });
      out.push({ field: "optionValue", label: `options[${i}].values[${j}].value`, text: String(v.value || "") });
    }
  }
  return out;
}

/**
 * One item on one language. Returns true/false when it is a localized read that can be
 * compared against EN, and null for the EN pass itself.
 */
function checkItem(item, lang, caps, enItem) {
  const problems = [];
  const where = (issue) => problems.push({ id: item.id, lang, title: String(item.title || "").slice(0, 60), issue });

  // required vs nullable text
  if (!String(item.title || "").trim()) where("title is empty");
  if (!String(item.description || "").trim()) where("description is empty");
  for (const f of NULLABLE) {
    const v = item[f];
    if (v === null || v === undefined) continue; // absent is fine - the UI hides it
    if (!String(v).trim()) where(`${f} is an empty string instead of absent`);
  }

  // per-field caps and encoding
  for (const s of stringsOf(item)) {
    if (s.text.length > caps[s.field]) where(`${s.label} is ${s.text.length} chars (> ${caps[s.field]})`);
    if (/\uFFFD/.test(s.text)) where(`${s.label} contains U+FFFD`);
    else if (MOJIBAKE_RE.test(s.text)) where(`${s.label} looks double-encoded: ${s.text.slice(0, 40)}`);
  }

  // gallery
  const images = item.images || [];
  if (!images.length) where("no images");
  else {
    const orders = images.map((im) => Number(im.displayOrder));
    for (let i = 1; i < orders.length; i++) {
      if (orders[i] < orders[i - 1]) { where(`images not ordered by displayOrder (${orders.join(",")})`); break; }
    }
    const first = [...images].sort((a, b) => Number(a.displayOrder) - Number(b.displayOrder))[0];
    const url = String(first?.imageUrl || "");
    if (!url || !(url.startsWith("http") || url.startsWith("/"))) where(`first image path is unusable ("${url.slice(0, 60)}")`);
  }

  // pricing
  const price = Number(item.basePriceUSD);
  const optionCount = (item.options || []).length;
  if (!Number.isFinite(price)) where(`basePriceUSD is not a number (${item.basePriceUSD})`);
  else if (price > 0) {
    const values = (item.options || []).reduce((n, o) => n + (o.values || []).length, 0);
    if (optionCount !== 1 || values !== 1) where(`price ${price} but options=${optionCount} values=${values} (expected 1 group with 1 value)`);
  } else if (optionCount !== 0) where(`basePriceUSD is 0 but ${optionCount} option group(s) exist`);

  // structure
  const features = item.features || [];
  if (!features.length) where("no feature groups");
  features.forEach((f, i) => { if (!(f.values || []).length) where(`features[${i}] ("${f.name}") has no values`); });

  // the API refuses duplicate feature names with a 400, so a stored duplicate means the
  // write path changed - report it instead of letting the detail page render two
  // identical headings
  const seenGroup = new Map();
  features.forEach((f, i) => {
    const key = norm(f.name);
    if (!key) return;
    if (seenGroup.has(key)) where(`duplicate feature group name "${key}" (features[${seenGroup.get(key)}] and features[${i}])`);
    else seenGroup.set(key, i);
    const seenValue = new Set();
    (f.values || []).forEach((v, j) => {
      const vkey = norm(v.name);
      if (!vkey) return;
      if (seenValue.has(vkey)) where(`duplicate value "${vkey}" inside features[${i}] (values[${j}])`);
      else seenValue.add(vkey);
    });
  });

  // an ignored lang param shows up as EN text on every language
  let differs = null;
  if (enItem && lang !== "en") {
    differs = ["title", "subtitle", "description", "textTopImage", "note", "alert"]
      .some((f) => norm(item[f]) && norm(item[f]) !== norm(enItem[f]));
  }
  return { problems, differs };
}

async function main() {
  if (!fs.existsSync(ITEMS_PATH)) {
    console.log(`missing ${path.relative(ROOT, ITEMS_PATH)} - run scripts/scrapeSiteServices.mjs first`);
    process.exit(2);
  }
  const guids = readConfigGuids();
  const { caps, probedAt, unresolved } = readCaps();
  const records = JSON.parse(fs.readFileSync(ITEMS_PATH, "utf8"));
  const bySection = {};
  for (const rec of records) (bySection[rec.section] ||= []).push(rec);

  const expected = {};
  for (const s of SECTIONS) expected[s] = OPTS.expectFile ? (bySection[s] || []).length : EXPECTED_ACTIVE[s];
  const total = Object.values(expected).reduce((a, b) => a + b, 0);
  console.log(`backend ${BASE_URL}`);
  console.log(`limits: ${probedAt ? `from limit-report.json (${probedAt})` : "no limit-report.json - assuming 500 per field"}${unresolved.length ? `; unresolved, default applied: ${unresolved.join(", ")}` : ""}`);
  console.log(`scrape: ${records.length} item(s) in items.json | expected active: ${SECTIONS.map((s) => `${s}=${expected[s]}`).join(" ")} (total ${total})`);

  const problems = [];
  const itemsByLangSection = {};
  for (const lang of OPTS.langs) {
    for (const section of SECTIONS) {
      let items;
      try {
        items = await listActive(guids[SECTION_CONFIG_KEY[section]], lang);
      } catch (e) {
        problems.push({ id: null, lang, title: section, issue: `GET failed: ${String(e.message).slice(0, 160)}` });
        items = [];
      }
      (itemsByLangSection[lang] ||= {})[section] = items;
      console.log(`  [${lang}] ${section}: ${items.length} active`);
      await sleep(250);
    }
  }

  const enSection = itemsByLangSection.en || {};
  const enAll = Object.values(enSection).flat();
  const enById = new Map(enAll.map((i) => [i.id, i]));
  const localized = {}; // lang -> { differs, total }
  let checked = 0;

  for (const lang of OPTS.langs) {
    for (const section of SECTIONS) {
      const items = itemsByLangSection[lang]?.[section] || [];
      if (items.length !== expected[section]) {
        problems.push({ id: null, lang, title: section, issue: `${items.length} active item(s) vs ${expected[section]} expected` });
      }
      for (const item of items) {
        if (lang === "en") checked++;
        const { problems: itemProblems, differs } = checkItem(item, lang, caps, enById.get(item.id));
        problems.push(...itemProblems);
        if (differs !== null) {
          const st = (localized[lang] ||= { differs: 0, total: 0 });
          st.total++;
          if (differs) st.differs++;
        }
      }
    }
  }

  // the remapped demo items must render, under the scraped title
  let remapsLive = 0;
  for (const [id, srcSlug] of Object.entries(DEMO_IDS)) {
    const rec = records.find((r) => r.srcSlug === srcSlug);
    const item = enById.get(id);
    if (!rec) { problems.push({ id, lang: "en", title: srcSlug, issue: "remap target is not in items.json" }); continue; }
    if (!item) { problems.push({ id, lang: "en", title: srcSlug, issue: "remapped demo item is not active (or not under its section) anymore" }); continue; }
    remapsLive++;
    if (norm(item.title) !== norm(rec.en?.title)) problems.push({ id, lang: "en", title: item.title, issue: `remap kept the old title: "${item.title}" vs scraped "${rec.en?.title}"` });
  }

  // nothing from the scrape may be missing; duplicates mean a demo item was duplicated
  const enTitles = new Map();
  for (const i of enAll) enTitles.set(norm(i.title), (enTitles.get(norm(i.title)) || 0) + 1);
  const missing = [];
  for (const rec of records) {
    if (!enTitles.has(norm(rec.en?.title))) missing.push(`${rec.section}/${rec.srcSlug}`);
  }
  if (missing.length) problems.push({ id: null, lang: "en", title: "(coverage)", issue: `${missing.length} scraped item(s) not active in the backend: ${missing.join(", ")}` });
  const dupeTitles = [...enTitles.entries()].filter(([, n]) => n > 1).map(([t, n]) => `${t} x${n}`);
  if (dupeTitles.length) problems.push({ id: null, lang: "en", title: "(duplicates)", issue: `${dupeTitles.length} duplicated EN title(s): ${dupeTitles.join(" | ")}` });

  let failuresLog = [];
  try { failuresLog = JSON.parse(fs.readFileSync(FAILURES_PATH, "utf8")); } catch { /* no failures recorded */ }

  const localizationBad = Object.entries(localized).filter(([, st]) => st.total && st.differs / st.total < LOCALIZED_RATIO_MIN);
  for (const [lang] of localizationBad) problems.push({ id: null, lang, title: "(localization)", issue: `only ${lang} text differs from EN below the ${LOCALIZED_RATIO_MIN * 100}% threshold - the lang param may be ignored` });

  console.log("");
  console.log("=== VERIFICATION ===");
  console.log(`  items checked (en)       : ${checked}`);
  console.log(`  scraped items missing    : ${missing.length}`);
  console.log(`  duplicated EN titles     : ${dupeTitles.length}`);
  console.log(`  remapped demo items      : ${remapsLive}/${Object.keys(DEMO_IDS).length} active with the scraped title`);
  for (const [lang, st] of Object.entries(localized)) {
    console.log(`  ${lang} text differs from en : ${st.differs}/${st.total} (${((st.differs / st.total) * 100).toFixed(0)}%)`);
  }
  console.log(`  seeder failure entries   : ${failuresLog.length}${failuresLog.length ? ` -> ${path.relative(ROOT, FAILURES_PATH)}` : ""}`);
  console.log(`  problems                 : ${problems.length}`);

  if (problems.length) {
    console.log("");
    console.log(`--- first ${Math.min(OPTS.showProblems, problems.length)} problem(s) ---`);
    for (const pr of problems.slice(0, OPTS.showProblems)) console.log(`  [${pr.lang || "-"}] ${pr.title || pr.id}: ${pr.issue}`);
  }

  const hardFail = problems.length > 0 || failuresLog.length > 0;
  const summary = {
    verifiedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    caps,
    capsFrom: probedAt || "default 500",
    expectedActive: expected,
    counts: Object.fromEntries(OPTS.langs.map((lang) => [lang, Object.fromEntries(SECTIONS.map((s) => [s, (itemsByLangSection[lang]?.[s] || []).length]))])),
    localizedRatio: Object.fromEntries(Object.entries(localized).map(([lang, st]) => [lang, `${st.differs}/${st.total}`])),
    missingFromBackend: missing,
    seederFailures: failuresLog,
    problems,
    result: hardFail ? "ISSUES FOUND" : "OK",
  };
  fs.writeFileSync(VERIFY_OUT, JSON.stringify(summary, null, 2), "utf8");
  console.log("");
  console.log(`report -> ${path.relative(ROOT, VERIFY_OUT)}`);
  console.log(hardFail ? "RESULT: ISSUES FOUND" : "RESULT: OK - backend matches the scraped catalog");
  process.exitCode = hardFail ? 1 : 0;
}

main().catch((e) => {
  console.error("FATAL", e?.stack || String(e));
  process.exitCode = 1;
});
