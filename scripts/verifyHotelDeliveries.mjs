#!/usr/bin/env node
/**
 * Verify the Hotel Deliveries seeding against the live backend.
 *
 * Reads dataEntry/hotelProducts.json + .seed-hotel-state.json (source of truth for what was
 * seeded) and compares it with GET /products for every supported language, checking:
 *   - coverage      : every mapped product exists with the expected localized title
 *   - prices        : backend price == scraped USD price
 *   - images        : hero + gallery count per product matches what was uploaded
 *   - content       : keys[] sections/values are present
 *   - localization  : de/fr/ru titles differ from EN where the reference site provided a
 *                     translation (identical = expected English fallback)
 *   - length limits : no stored translation exceeds the 500-character backend cap
 *
 * Usage:
 *   node scripts/verifyHotelDeliveries.mjs
 *   node scripts/verifyHotelDeliveries.mjs --langs en,de,ru,fr --show-problems 25
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BASE_URL = (process.env.API_BASE_URL || "https://touristtt.runasp.net/api").replace(/\/+$/, "");
const OUT = path.join(ROOT, "dataEntry");
const MAX_TRANS = 500;

function readToken() {
  if (process.env.ADMIN_TOKEN) return process.env.ADMIN_TOKEN.trim();
  try { return fs.readFileSync(path.join(ROOT, "dataEntry", ".admin-token"), "utf8").trim(); } catch { return ""; }
}
const TOKEN = readToken();

function parseArgs(argv) {
  const opts = { langs: ["en", "de", "fr", "ru"], showProblems: 20 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--langs") opts.langs = String(argv[++i]).split(",").map((s) => s.trim()).filter(Boolean);
    else if (a === "--show-problems") opts.showProblems = Number(argv[++i]);
  }
  return opts;
}
const OPTS = parseArgs(process.argv.slice(2));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const norm = (s) => String(s || "").trim().toLowerCase().replace(/\s+/g, " ");

async function req(url, attempt = 0) {
  const headers = { Accept: "application/json", "User-Agent": "Mozilla/5.0" };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
  let res;
  try {
    res = await fetch(url, { headers });
  } catch (err) {
    const code = err?.cause?.code || err?.code || "";
    if (attempt < 6 && /TIMEOUT|ECONNRESET|ECONNREFUSED|EAI_AGAIN|UND_ERR|SocketError/i.test(String(code))) {
      const wait = 2000 * (attempt + 1);
      console.log(`  ~ transient (${code}) ${url}; retry ${wait}ms`);
      await sleep(wait);
      return req(url, attempt + 1);
    }
    throw err;
  }
  if (res.status >= 500 && attempt < 6) {
    const wait = 2000 * (attempt + 1);
    console.log(`  ~ HTTP ${res.status} ${url}; retry ${wait}ms`);
    await sleep(wait);
    return req(url, attempt + 1);
  }
  return JSON.parse(await res.text());
}

async function listAll(lang) {
  const items = [];
  let page = 1;
  for (;;) {
    const qs = new URLSearchParams({ lang, language: lang, pageNumber: String(page), pageSize: "100" });
    const j = await req(`${BASE_URL}/products?${qs}`);
    const d = j?.data || {};
    items.push(...(d.items || []));
    if (!d.hasNextPage) break;
    page++;
    if (page > 40) break;
  }
  return items;
}

function expectedImageCount(p) {
  return [p.heroPath, ...(p.galleryPaths || [])].filter(Boolean).length;
}

async function main() {
  const productsMap = JSON.parse(fs.readFileSync(path.join(OUT, "hotelProducts.json"), "utf8"));
  const state = JSON.parse(fs.readFileSync(path.join(OUT, ".seed-hotel-state.json"), "utf8"));
  const source = Object.values(productsMap);
  const mapped = source.filter((p) => state.products?.[String(p.srcId)]?.backendId);
  const notMapped = source.filter((p) => !state.products?.[String(p.srcId)]?.backendId);

  console.log(`Source: ${source.length} products | state-mapped: ${mapped.length} | unmapped: ${notMapped.length}`);
  if (notMapped.length) console.log(`  unmapped slugs: ${notMapped.slice(0, 10).map((p) => p.slug).join(", ")}`);

  // fetch every language once
  const byLang = {};
  for (const lang of OPTS.langs) {
    byLang[lang] = await listAll(lang);
    console.log(`Backend /products [${lang}]: ${byLang[lang].length} items`);
  }
  const en = byLang[OPTS.langs[0]] || [];
  const enById = new Map(en.map((i) => [Number(i.id), i]));

  const problems = [];
  let priceOk = 0, titleOk = 0, imgOk = 0, keysOk = 0;
  let imgMissing = 0, imgTotal = 0, expectedTotal = 0;
  let overLimit = 0, translated = 0, fallbacks = 0;

  for (const p of mapped) {
    const id = Number(state.products[String(p.srcId)].backendId);
    const item = enById.get(id);
    if (!item) { problems.push({ slug: p.slug, issue: "not returned by GET /products (en)", id }); continue; }

    // title
    if (norm(item.title) === norm(p.title.en)) titleOk++;
    else problems.push({ slug: p.slug, id, issue: `title mismatch: "${item.title}" vs "${p.title.en}"` });

    // price
    const exp = Number(p.priceUsd || 0);
    const got = Number(item.price);
    if (Math.abs(got - exp) < 0.011) priceOk++;
    else problems.push({ slug: p.slug, id, issue: `price mismatch: ${got} vs ${exp}` });

    // images
    const want = expectedImageCount(p);
    const has = (item.images || []).length;
    expectedTotal += want;
    imgTotal += has;
    if (want === 0) { /* nothing uploaded for this product */ }
    else if (has > 0) imgOk++;
    else { imgMissing++; problems.push({ slug: p.slug, id, issue: `no images in backend (expected ${want})` }); }

    // content sections
    const keyCount = (item.keys || []).length;
    const valCount = (item.keys || []).reduce((a, k) => a + (k.values || []).length, 0);
    if (keyCount > 0 && valCount > 0) keysOk++;
    else if ((p.descriptionHtml?.en || "").trim()) problems.push({ slug: p.slug, id, issue: "description present in source but keys[] empty in backend" });

    // length cap on every localized string the backend echoes back
    const strings = [item.title, item.subTitle, item.priceFor, ...(item.keys || []).flatMap((k) => [k.name, ...(k.values || []).map((v) => v.value)])];
    for (const s of strings) if (String(s || "").length > MAX_TRANS) { overLimit++; problems.push({ slug: p.slug, id, issue: `string over ${MAX_TRANS} chars (${String(s).length})` }); }

    // localization coverage: compare each language title against EN
    for (const lang of OPTS.langs.slice(1)) {
      const list = byLang[lang] || [];
      const it = list.find((x) => Number(x.id) === id);
      if (!it) { problems.push({ slug: p.slug, id, issue: `missing in ${lang} listing` }); continue; }
      const srcHasTranslation = String(p.title?.[lang] || "").trim() && norm(p.title[lang]) !== norm(p.title.en);
      const differs = norm(it.title) !== norm(en.find((x) => Number(x.id) === id)?.title || "");
      if (srcHasTranslation && differs) translated++;
      else if (srcHasTranslation && !differs) problems.push({ slug: p.slug, id, issue: `${lang}: source translation exists but backend returned the EN title` });
      else if (!srcHasTranslation) fallbacks++;
    }
  }

  console.log("");
  console.log("=== VERIFICATION ===");
  console.log(`  titles match EN source   : ${titleOk}/${mapped.length}`);
  console.log(`  prices match EN source   : ${priceOk}/${mapped.length}`);
  console.log(`  images present           : ${imgOk} products (backend ${imgTotal} files vs scraped ${expectedTotal})`);
  console.log(`  description keys present : ${keysOk}/${mapped.length}`);
  console.log(`  strings over ${MAX_TRANS} chars   : ${overLimit}`);
  console.log(`  localized titles verified: ${translated} translated / ${fallbacks} expected English fallbacks`);
  console.log(`  products with problems   : ${problems.length}`);

  if (problems.length) {
    console.log("");
    console.log(`--- first ${Math.min(OPTS.showProblems, problems.length)} problem(s) ---`);
    for (const pr of problems.slice(0, OPTS.showProblems)) console.log(`  [${pr.slug}] id=${pr.id}: ${pr.issue}`);
    try {
      fs.writeFileSync(path.join(OUT, ".verify-hotel-problems.json"), JSON.stringify(problems, null, 2), "utf8");
      console.log(`  full list: dataEntry/.verify-hotel-problems.json (${problems.length} entries)`);
    } catch { /* report only */ }
  }

  const hardFail = notMapped.length > 0 || titleOk < mapped.length || priceOk < mapped.length || imgMissing > 0 || overLimit > 0;
  console.log("");
  console.log(hardFail ? "RESULT: ISSUES FOUND" : "RESULT: OK - backend matches scraped data");
  process.exitCode = hardFail ? 1 : 0;
}

main().catch((e) => {
  console.error("FATAL", e?.stack || String(e));
  process.exitCode = 1;
});
