#!/usr/bin/env node
/**
 * Phase 1: collect the Site Services catalog from the reference site
 * (touristmarket-egypt.com) into dataEntry/siteServices/items.json.
 *
 * The reference site serves HTML only (no JSON API for services) and translates
 * server-side through ?lang=de|fr|ru, so every item is fetched once per language.
 *
 * What it does, in order:
 *   1. fetches the 4 section pages (?slug=<section>, EN) and enumerates the cards
 *      (srcSlug, badge, card image, card title)
 *   2. fetches service-details.php?slug=<srcSlug>[&lang=<L>] for all 4 languages
 *   3. parses title / price / rich description into heading-delimited sections,
 *      keeping the raw blocks and a packed (<=300 char) variant per section
 *   4. downloads the allowed gallery images (webp|jpg|jpeg|png only) into
 *      dataEntry/siteServices/images/<srcSlug>/
 *
 * Artifacts (all inside the gitignored dataEntry tree):
 *   items.json                 the 33 records consumed by seedSiteServices.mjs
 *   raw/<key>.<lang>.html      response cache, re-parseable with --use-cache
 *   images/<srcSlug>/<n>-<file>
 *   parse-report.json          EN fallbacks, dropped blocks, per-language problems
 *   scrape.log
 *
 * Usage:
 *   node scripts/scrapeSiteServices.mjs [--section tourist|car-rental|vip-airport|real-estate]
 *     [--lang en|de|fr|ru] [--only <srcSlug>] [--use-cache] [--no-images]
 */

import * as cheerio from "cheerio";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const SRC = "https://touristmarket-egypt.com";
const PAGES = `${SRC}/pages`;
const OUT = path.join(ROOT, "dataEntry", "siteServices");
const RAW = path.join(OUT, "raw");
const IMG_DIR = path.join(OUT, "images");
const ITEMS_PATH = path.join(OUT, "items.json");
const REPORT_PATH = path.join(OUT, "parse-report.json");
const LOG_FILE = path.join(OUT, "scrape.log");

// section key == the SITE_SERVICES_CONFIG key used later by the seeder
const SECTIONS = [
  { key: "tourist", srcSlug: "tourist-services", expect: 12 },
  { key: "car-rental", srcSlug: "car-rental", expect: 10 },
  { key: "vip-airport", srcSlug: "vip-services-hurghada-airport", expect: 6 },
  { key: "real-estate", srcSlug: "red-sea-real-estate", expect: 5 },
];
const ALL_LANGS = ["en", "de", "fr", "ru"];
const IMG_EXT = new Set([".webp", ".jpg", ".jpeg", ".png"]);
const MAX_IMAGES = 6;
const PACK_LEN = 300;
const MAX_PACKED = 20;

// ---- CLI ----
function parseArgs(argv) {
  const opts = { section: null, langs: ALL_LANGS, only: null, useCache: false, images: true };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--section") opts.section = argv[++i];
    else if (a === "--lang") opts.langs = String(argv[++i]).split(",").map((s) => s.trim()).filter(Boolean);
    else if (a === "--only") opts.only = argv[++i];
    else if (a === "--use-cache") opts.useCache = true;
    else if (a === "--no-images") opts.images = false;
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
const collapse = (s) => String(s || "").replace(/\s+/g, " ").trim();

function sanitize(text) {
  return collapse(text)
    // the reference site ships a few U+FFFD replacement characters of its own
    .replace(/\uFFFD+/g, " ")
    // bullet glyphs are decoration; chips/lists render them as real items
    .replace(/^[•·◦\-*]\s*/u, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function isTransient(err) {
  const code = err?.cause?.code || err?.code || "";
  return /TIMEOUT|ECONNRESET|ECONNREFUSED|EAI_AGAIN|UND_ERR|SocketError|ETIMEDOUT|ENOTFOUND/i.test(
    `${code} ${err?.message || ""}`
  );
}

async function getText(url, attempts = 5) {
  let lastErr;
  for (let i = 0; i <= attempts; i++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0", Accept: "text/html" },
        signal: AbortSignal.timeout(30000),
      });
      if (res.status >= 500 && i < attempts) {
        const wait = 2000 * (i + 1);
        log(`  ~ HTTP ${res.status} ${url}; retry in ${wait}ms`);
        await sleep(wait);
        continue;
      }
      const body = await res.text();
      return { status: res.status, body };
    } catch (err) {
      lastErr = err;
      if (i < attempts && isTransient(err)) {
        const wait = 2000 * (i + 1);
        log(`  ~ transient (${err?.cause?.code || err.message}) ${url}; retry in ${wait}ms`);
        await sleep(wait);
        continue;
      }
      break;
    }
  }
  return { status: 0, body: "", error: String(lastErr?.cause?.code || lastErr?.message || "fetch failed") };
}

async function getBinary(url, attempts = 4) {
  for (let i = 0; i <= attempts; i++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0" },
        signal: AbortSignal.timeout(45000),
      });
      if (!res.ok) return { status: res.status, buf: null };
      return { status: res.status, buf: Buffer.from(await res.arrayBuffer()), type: res.headers.get("content-type") || "" };
    } catch (err) {
      if (i === attempts || !isTransient(err)) return { status: 0, buf: null, error: String(err?.cause?.code || err.message) };
      await sleep(2000 * (i + 1));
    }
  }
  return { status: 0, buf: null };
}

// page loader with an on-disk cache so the parser can be re-run offline
async function loadPage(cacheName, url) {
  const file = path.join(RAW, cacheName);
  if (OPTS.useCache && fs.existsSync(file)) {
    return { status: 200, body: fs.readFileSync(file, "utf8"), cached: true };
  }
  const r = await getText(url);
  if (r.status === 200 && r.body.length > 2000) {
    fs.writeFileSync(file, r.body, "utf8");
    await sleep(250);
  }
  return r;
}

function detailUrl(srcSlug, lang) {
  return lang === "en"
    ? `${PAGES}/service-details.php?slug=${encodeURIComponent(srcSlug)}`
    : `${PAGES}/service-details.php?slug=${encodeURIComponent(srcSlug)}&lang=${lang}`;
}

function sectionUrl(sectionSlug, lang) {
  return lang === "en"
    ? `${PAGES}/section.php?slug=${encodeURIComponent(sectionSlug)}`
    : `${PAGES}/section.php?slug=${encodeURIComponent(sectionSlug)}&lang=${lang}`;
}

// ---- parsing ----

// Cards on a section page. Badges are optional and inconsistently cased.
function parseCards(html) {
  const $ = cheerio.load(html);
  $("script, style, noscript").remove();
  const cards = [];
  $(".service-card").each((_, el) => {
    const $el = $(el);
    const link = $el.find(`a[href*="service-details.php"]`).attr("href") || "";
    const m = link.match(/[?&]slug=([^&]+)/);
    if (!m) return;
    const srcSlug = decodeURIComponent(m[1]);
    const badge = sanitize($el.find(".service-badge").first().text());
    const title = sanitize($el.find(".card-title").first().text());
    const img = $el.find("img").first().attr("data-src") || $el.find("img").first().attr("src") || "";
    cards.push({ srcSlug, badge, title, img: absUrl(img) });
  });
  return cards;
}

function absUrl(src) {
  const s = String(src || "").trim();
  if (!s || s.startsWith("data:")) return "";
  try {
    return new URL(s, `${PAGES}/`).toString();
  } catch {
    return "";
  }
}

function priceAmount(text) {
  const m = collapse(text).match(/\d[\d.,]*/);
  if (!m) return 0;
  const raw = m[0].replace(/[.,](?=\d{3}\b)/g, ""); // drop thousands separators
  const n = Number(raw.replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

/**
 * Split .service-description into heading-delimited sections.
 * A heading is h1-h6 with short collapsed text; longer headings are styled
 * paragraphs and must stay body content (same rule as seedHotelDeliveries).
 */
function parseSections($, container) {
  const sections = [];
  let cur = { heading: "", blocks: [] };
  const flush = () => {
    if (cur.blocks.length || cur.heading) sections.push(cur);
    cur = { heading: "", blocks: [] };
  };
  $(container).children().each((_, el) => {
    const $el = $(el);
    const tag = String(el.name || "").toLowerCase();
    if (/^h[1-6]$/.test(tag)) {
      const text = sanitize($el.text());
      if (!text) return;
      if (text.length <= 120) {
        if (cur.blocks.length || cur.heading) flush();
        cur.heading = text;
        return;
      }
      cur.blocks.push(text);
      return;
    }
    if (tag === "ul" || tag === "ol") {
      $el.children("li").each((__, li) => {
        const t = sanitize($(li).text());
        if (t) cur.blocks.push(t);
      });
      return;
    }
    const text = sanitize($el.text());
    if (text) cur.blocks.push(text);
  });
  flush();
  return sections.filter((s) => s.heading || s.blocks.length);
}

/**
 * Greedy packing of consecutive blocks into <=PACK_LEN values, capped at
 * MAX_PACKED per section. Blocks that no longer fit are returned as `dropped`
 * so they can be reported (the raw blocks stay in items.json, nothing is lost).
 */
function packBlocks(blocks) {
  const packed = [];
  let cur = "";
  let i = 0;
  for (; i < blocks.length; i++) {
    const b = blocks[i];
    if (!b) continue;
    if (packed.length >= MAX_PACKED) break;
    if (!cur) cur = b;
    else if (`${cur} ${b}`.length <= PACK_LEN) cur = `${cur} ${b}`;
    else {
      packed.push(cur);
      cur = b;
    }
  }
  if (cur && packed.length < MAX_PACKED) {
    packed.push(cur);
    i++;
  }
  return { packed, dropped: blocks.slice(Math.min(i, blocks.length)) };
}

function parseDetail(html) {
  const $ = cheerio.load(html);
  $("script, style, noscript").remove();
  const root = $(".service-details").first();
  if (!root.length) return null;
  const title = sanitize(root.find("h1.service-title").first().text());
  const priceType = sanitize(root.find(".price-type").first().text());
  const amount = priceAmount(root.find(".price-amount").first().text());
  const sections = parseSections($, root.find(".service-description").first()).map((s) => {
    const { packed, dropped } = packBlocks(s.blocks);
    return { heading: s.heading, blocks: s.blocks, packed, dropped };
  });
  const imgs = [];
  $("img").each((_, el) => {
    const src = absUrl($(el).attr("data-src") || $(el).attr("src") || "");
    // only item imagery: uploads/settings (logo, favicon) and uploads/sections
    // (the section header backdrop) belong to the site chrome, not to the item
    if (src && src.includes("/uploads/services/")) imgs.push(src);
  });
  return {
    title,
    priceAmount: amount,
    priceType,
    sections,
    images: [...new Set(imgs)],
  };
}

// The reference site substitutes its own placeholders for content it has not
// translated (e.g. the DE pages of the two luxury-transfer items render
// "Service nicht angegeben"), which must never be seeded as a real title.
const PLACEHOLDER_TITLE = /^(service|prestation|dienstp|le|la)\s*(ist|est|es|ist)?\s*(nicht|non|not|geen)\s*(angegeben|fourni|disponible|specifie|specifié)/i;

/**
 * A non-EN parse is usable when it has a real title (no placeholder) and it
 * carries at least as much body structure as the EN parse.
 */
function usableParse(parsed, enParse) {
  if (!parsed || !parsed.title) return false;
  if (PLACEHOLDER_TITLE.test(parsed.title)) return false;
  if (enParse && enParse.sections.length > 0 && parsed.sections.length === 0) return false;
  return true;
}

// ---- images ----
async function downloadImages(srcSlug, urls, report) {
  const dir = path.join(IMG_DIR, srcSlug);
  const kept = [];
  let idx = 0;
  for (const url of urls) {
    if (kept.length >= MAX_IMAGES) break;
    const ext = path.extname(new URL(url).pathname).toLowerCase();
    if (!IMG_EXT.has(ext)) continue; // backend rejects avif/svg/gif; only raster web kept
    const file = path.join(dir, `${idx}-${path.basename(new URL(url).pathname)}`);
    if (fs.existsSync(file) && fs.statSync(file).size > 512) {
      kept.push({ srcUrl: url, localPath: path.relative(ROOT, file).replace(/\\/g, "/"), lang: "en" });
      idx++;
      continue;
    }
    const r = await getBinary(url);
    if (!r.buf || r.buf.length < 512 || (r.type && !r.type.startsWith("image"))) {
      report.push({ srcSlug, problem: "image-skipped", detail: `${url} status=${r.status} bytes=${r.buf?.length || 0} type=${r.type || ""}` });
      continue;
    }
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file, r.buf);
    kept.push({ srcUrl: url, localPath: path.relative(ROOT, file).replace(/\\/g, "/"), lang: "en" });
    idx++;
    await sleep(120);
  }
  return kept;
}

// ---- main ----
async function main() {
  fs.mkdirSync(RAW, { recursive: true });
  fs.mkdirSync(IMG_DIR, { recursive: true });

  const sectionsToRun = OPTS.section ? SECTIONS.filter((s) => s.key === OPTS.section) : SECTIONS;
  if (!sectionsToRun.length) {
    log(`unknown --section "${OPTS.section}"`);
    process.exit(2);
  }

  const report = [];
  const items = [];

  for (const section of sectionsToRun) {
    log(`\n=== section ${section.key} (${section.srcSlug}) ===`);
    // the EN section page enumerates the items; the translated ones only supply
    // localized badge text (the card list is the single source of the badge)
    const badgesByLang = {};
    const cardsByLang = {};
    for (const lang of OPTS.langs) {
      const cacheName = `__section__.${section.key}.${lang}.html`;
      const sec = await loadPage(cacheName, sectionUrl(section.srcSlug, lang));
      if (sec.status !== 200) {
        log(`  ! section page (${lang}) failed (${sec.status} ${sec.error || ""})`);
        report.push({ section: section.key, lang, problem: "section-fetch-failed", detail: sec.error || String(sec.status) });
        continue;
      }
      const cs = parseCards(sec.body);
      cardsByLang[lang] = new Map(cs.map((c) => [c.srcSlug, c]));
    }
    const cards = (cardsByLang.en && [...cardsByLang.en.values()]) || [];
    log(`  cards=${cards.length} (expected ${section.expect})`);
    if (cards.length !== section.expect) {
      report.push({ section: section.key, problem: "card-count", detail: `got ${cards.length}, expected ${section.expect}` });
    }
    const bySlug = new Map(cards.map((c) => [c.srcSlug, c]));
    for (const [slug, c] of bySlug) badgesByLang["en"] = Object.assign(badgesByLang["en"] || {}, { [slug]: c.badge });
    for (const lang of OPTS.langs) {
      if (lang === "en") continue;
      const map = cardsByLang[lang];
      if (!map) continue;
      for (const [slug, c] of map) (badgesByLang[lang] = badgesByLang[lang] || {})[slug] = c.badge;
    }
    let slugs = [...bySlug.keys()];
    if (OPTS.only) slugs = slugs.filter((s) => s === OPTS.only);

    for (const srcSlug of slugs) {
      const card = bySlug.get(srcSlug);
      const rec = { section: section.key, srcSlug, url: detailUrl(srcSlug, "en"), cardTitle: card.title, badge: card.badge, cardImage: card.img };
      const rawByLang = {};
      for (const lang of OPTS.langs) {
        const r = await loadPage(`${srcSlug}.${lang}.html`, detailUrl(srcSlug, lang));
        const parsed = r.status === 200 ? parseDetail(r.body) : null;
        rawByLang[lang] = parsed;
        const ok = parsed && (lang === "en" ? !!parsed.title : usableParse(parsed, rawByLang.en));
        rec[lang] = ok ? parsed : null;
        if (!ok) {
          report.push({
            srcSlug,
            lang,
            problem: "fallback-to-en",
            detail: parsed ? `unusable parse (title="${parsed.title}", sections=${parsed.sections.length})` : `http ${r.status} ${r.error || "empty parse"}`,
          });
        }
      }
      const en = rec.en;
      if (!en || !en.title) {
        report.push({ srcSlug, problem: "no-en-parse", detail: "item skipped entirely" });
        log(`  - ${srcSlug}: EN parse failed, skipped`);
        continue;
      }
      // per-language fallback: any language that failed reuses the EN parse
      for (const lang of OPTS.langs) {
        if (!rec[lang]) rec[lang] = JSON.parse(JSON.stringify(en));
      }
      rec.badges = {};
      for (const lang of OPTS.langs) {
        const localized = badgesByLang[lang] && badgesByLang[lang][srcSlug];
        rec.badges[lang] = localized !== undefined ? localized : card.badge || "";
        // only noteworthy when there IS an EN badge that the translated list lacks
        if (card.badge && localized === undefined) {
          report.push({ srcSlug, lang, problem: "badge-fallback-to-en", detail: `badge="${rec.badges[lang]}"` });
        }
      }
      const gallery = [...new Set([card.img, ...en.images].filter((u) => u && u.includes("/uploads/services/")))].slice(0, MAX_IMAGES);
      rec.images = OPTS.images ? await downloadImages(srcSlug, gallery, report) : gallery.map((srcUrl) => ({ srcUrl, localPath: "", lang: "en" }));
      rec.imageSourceUrls = gallery;
      const counts = OPTS.langs.map((l) => `${l}:${rec[l].sections.length}sec`).join(" ");
      for (const lang of OPTS.langs) {
        for (const s of rec[lang].sections) {
          if (s.dropped && s.dropped.length) {
            report.push({ srcSlug, lang, problem: "droppedBlocks", detail: `${s.heading || "(headless)"}: ${s.dropped.length} block(s) beyond ${MAX_PACKED} values` });
          }
        }
      }
      log(`  + ${srcSlug} "${en.title}" price=${en.priceAmount}${en.priceType ? ` ${en.priceType}` : ""} secs=${en.sections.length} imgs=${rec.images.length} ${counts}`);
      items.push(rec);
    }
  }

  fs.writeFileSync(ITEMS_PATH, JSON.stringify(items, null, 2), "utf8");
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), "utf8");
  log(`\nwrote ${items.length} items -> ${path.relative(ROOT, ITEMS_PATH)}`);
  log(`report entries=${report.length} -> ${path.relative(ROOT, REPORT_PATH)}`);

  // counts gate: only enforced when the whole catalog was scraped
  if (!OPTS.section && !OPTS.only) {
    const bad = SECTIONS.filter((s) => items.filter((i) => i.section === s.key).length !== s.expect);
    if (bad.length) {
      log(`FAILED counts: ${bad.map((s) => `${s.key}=${items.filter((i) => i.section === s.key).length}/${s.expect}`).join(" ")}`);
      fs.writeFileSync(LOG_FILE, logLines.join("\n") + "\n", "utf8");
      process.exit(1);
    }
    log(`counts OK: ${SECTIONS.map((s) => `${s.key}=${s.expect}`).join(" ")}`);
  }
  fs.writeFileSync(LOG_FILE, logLines.join("\n") + "\n", "utf8");
}

main().catch((e) => {
  log(`FATAL ${e?.stack || e}`);
  try { fs.writeFileSync(LOG_FILE, logLines.join("\n") + "\n", "utf8"); } catch { /* best effort */ }
  process.exit(1);
});
