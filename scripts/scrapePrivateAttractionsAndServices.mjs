#!/usr/bin/env node
/**
 * Scrape the selectable ATTRACTIONS and EXTRA SERVICES (with per-person prices +
 * images) from every PRIVATE trip detail page on the reference site
 * (touristmarket-egypt.com), so private trips can be made bookable.
 *
 * The trip-content scraper (scrapeReferenceTrips.mjs) only captured numbered
 * itinerary headings; it missed the #attractionsContainer / #extrasContainer
 * sections rendered server-side on each private detail page. This script fills
 * that gap.
 *
 * Source numeric ids are SHARED across trips, so entities are deduped globally
 * (created once, linked to many trips later).
 *
 * Usage:
 *   node scripts/scrapePrivateAttractionsAndServices.mjs [--limit N] [--only <slug>] [--no-images]
 *
 * Output:
 *   dataEntry/privateAttractions.json   { "<srcId>": {title,description,prices,heroPath,galleryPaths} }
 *   dataEntry/privateServices.json      { "<srcId>": {title,description,prices,heroPath,galleryPaths} }
 *   dataEntry/tripAssignments.json      { "<tripSlug>": {maxAttractions, attractionSrcIds[], serviceSrcIds[]} }
 *   dataEntry/images/attractions/<srcId>/hero.<ext> + gallery/<n>.<ext>
 *   dataEntry/images/services/<srcId>/hero.<ext> + gallery/<n>.<ext>
 */

import * as cheerio from "cheerio";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BASE = "https://touristmarket-egypt.com";
const DETAIL_PATH = "/pages/private_excursions/details.php";

const OUT = path.join(ROOT, "dataEntry");
const TRIPS_DIR = path.join(OUT, "trips", "private");
const IMAGES_DIR = path.join(OUT, "images");

/* ----------------------------- CLI args ----------------------------- */
function parseArgs(argv) {
  const opts = { limit: Infinity, only: null, images: true };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--limit") opts.limit = Number(argv[++i]);
    else if (a === "--only") opts.only = argv[++i];
    else if (a === "--no-images") opts.images = false;
  }
  return opts;
}
const OPTS = parseArgs(process.argv.slice(2));

/* ----------------------------- Helpers ----------------------------- */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (...a) => console.log(...a);

function isTransient(err) {
  const code = err?.cause?.code || err?.code || "";
  return /TIMEOUT|ECONNRESET|ECONNREFUSED|EAI_AGAIN|UND_ERR|SocketError|ETIMEDOUT/i.test(
    String(code) + " " + String(err?.message)
  );
}

async function fetchText(url, attempt = 0) {
  let res;
  try {
    res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  } catch (err) {
    if (attempt < 5 && isTransient(err)) {
      const wait = 1500 * (attempt + 1);
      log(`  ~ transient (${err?.cause?.code || err.message}) ${url}; retry ${wait}ms`);
      await sleep(wait);
      return fetchText(url, attempt + 1);
    }
    throw err;
  }
  if (res.status >= 500 && attempt < 5) {
    const wait = 1500 * (attempt + 1);
    log(`  ~ HTTP ${res.status} ${url}; retry ${wait}ms`);
    await sleep(wait);
    return fetchText(url, attempt + 1);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.text();
}

async function fetchBuffer(url, attempt = 0) {
  let res;
  try {
    res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  } catch (err) {
    if (attempt < 4 && isTransient(err)) {
      await sleep(1500 * (attempt + 1));
      return fetchBuffer(url, attempt + 1);
    }
    throw err;
  }
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

// Normalize whitespace + fix common mojibake from the source encoding.
function cleanText(s) {
  if (!s) return "";
  return s
    .replace(/\uFFFD/g, "")
    .replace(/â€™|â€˜/g, "'")
    .replace(/â€œ|â€\u009D/g, '"')
    .replace(/â€“|â€”|â€¢|Â·|ΓÇô|ΓÇ»/g, "-")
    .replace(/Â/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Strip HTML tags -> plain text, normalize whitespace.
function htmlToText(html) {
  if (!html) return "";
  const $ = cheerio.load(`<div>${html}</div>`);
  return cleanText($("div").first().text());
}

function toNum(str) {
  if (str == null) return null;
  const n = parseFloat(String(str).replace(/,/g, ".").replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : null;
}

function extFromUrl(url) {
  const m = String(url).match(/\.(webp|jpe?g|png|avif|gif)(?:\?|#|$)/i);
  return m ? m[1].toLowerCase().replace("jpeg", "jpg") : "webp";
}

function absUrl(src) {
  if (!src) return null;
  if (src.startsWith("http")) return src;
  if (src.startsWith("//")) return "https:" + src;
  return BASE + (src.startsWith("/") ? src : "/" + src);
}

/* ------------------------- Page parsing ------------------------- */
// Read the 3 price columns (Adult/Child/Infant) from a .pricing-info block.
function parsePrices($, itemEl) {
  let adult = 0;
  let child = 0;
  let infant = 0;
  const $item = $(itemEl);
  $item.find(".pricing-info .row .col-4").each((_, el) => {
    const $el = $(el);
    const label = cleanText($el.find("small").first().text()).toLowerCase();
    const val = toNum($el.find("strong").first().text()) ?? 0;
    if (label.startsWith("adult")) adult = val;
    else if (label.startsWith("child")) child = val;
    else if (label.startsWith("infant")) infant = val;
  });
  return { adult, child, infant };
}

function parseAttraction($, itemEl) {
  const $item = $(itemEl);
  const srcId =
    $item.attr("id")?.match(/attraction_item_(\d+)/)?.[1] ||
    $item.find("[data-attraction-id]").first().attr("data-attraction-id") ||
    null;
  if (!srcId) return null;

  const title = cleanText($item.find(".attraction-header span.fw-bold").first().text());

  const heroRemote = absUrl($item.find("img.attraction-main-image").first().attr("src"));

  // gallery images under /uploads/attraction/gallery/ (dedup, keep order)
  const galleryRemote = [];
  const seen = new Set();
  $item.find("img").each((_, el) => {
    const s = $(el).attr("src") || $(el).attr("data-src") || "";
    if (/uploads\/attraction\/gallery\//.test(s)) {
      const a = absUrl(s);
      if (a && !seen.has(a)) {
        seen.add(a);
        galleryRemote.push(a);
      }
    }
  });

  const fullHtml = $item.find(`#desc-full-${srcId}`).html();
  const shortText = cleanText($item.find(`#desc-short-${srcId}`).text());
  const description = htmlToText(fullHtml) || shortText;

  return { srcId, title, heroRemote, galleryRemote, description, prices: parsePrices($, itemEl) };
}

function parseExtraService($, itemEl) {
  const $item = $(itemEl);
  const $cb = $item.find("input[data-service-id]").first();
  const srcId = $cb.attr("data-service-id") || $cb.attr("id")?.match(/extra_(\d+)/)?.[1] || null;
  if (!srcId) return null;

  const title = cleanText($item.find("label span").first().text());

  const heroRemote = absUrl($item.find("img").filter((_, el) => /uploads\/extras\/(?!gallery\/)/.test($(el).attr("src") || "")).first().attr("src"));

  const galleryRemote = [];
  const seen = new Set();
  $item.find("img").each((_, el) => {
    const s = $(el).attr("src") || $(el).attr("data-src") || "";
    if (/uploads\/extras\/gallery\//.test(s)) {
      const a = absUrl(s);
      if (a && !seen.has(a)) {
        seen.add(a);
        galleryRemote.push(a);
      }
    }
  });

  const fullHtml = $item.find(`#desc-full-extra_${srcId}`).html();
  const shortText = cleanText($item.find(`#desc-short-extra_${srcId}`).text());
  const description = htmlToText(fullHtml) || shortText;

  return { srcId, title, heroRemote, galleryRemote, description, prices: parsePrices($, itemEl) };
}

function parseMaxAttractions($) {
  // "Max per trip ... N Attractions per Trip" or "Maximum Attractions / N Per Day"
  const text = cleanText($("body").text());
  const m =
    text.match(/Max(?:imum)?(?:\s+per\s+trip)?\s+Attractions?[:\s]*?(\d+)/i) ||
    text.match(/(\d+)\s+Attractions?\s+per\s+Trip/i) ||
    text.match(/(\d+)\s+Per\s+Day/i);
  return m ? Number(m[1]) : 0;
}

async function parsePage(slug) {
  const url = `${BASE}${DETAIL_PATH}?slug=${slug}`;
  const html = await fetchText(url);
  const $ = cheerio.load(html);

  const attractions = [];
  $("#attractionsContainer .attraction-item").each((_, el) => {
    const a = parseAttraction($, el);
    if (a && a.title) attractions.push(a);
  });

  const services = [];
  $("#extrasContainer .extra-service").each((_, el) => {
    const s = parseExtraService($, el);
    if (s && s.title) services.push(s);
  });

  return { maxAttractions: parseMaxAttractions($), attractions, services };
}

/* ------------------------- Image download ------------------------- */
async function downloadInto(dir, remoteUrls, prefix) {
  const paths = [];
  fs.mkdirSync(dir, { recursive: true });
  for (let i = 0; i < remoteUrls.length; i++) {
    const u = remoteUrls[i];
    const file = path.join(dir, `${prefix}${i}.${extFromUrl(u)}`);
    // treat zero-byte files (partial ENOSPC writes) as missing so they re-download
    if (fs.existsSync(file) && fs.statSync(file).size > 0) {
      paths.push(path.relative(ROOT, file).replace(/\\/g, "/"));
      continue;
    }
    try {
      const bytes = await fetchBuffer(u);
      const tmp = `${file}.tmp`;
      fs.writeFileSync(tmp, bytes);
      fs.renameSync(tmp, file); // atomic: never leaves a half-written file
      paths.push(path.relative(ROOT, file).replace(/\\/g, "/"));
    } catch (e) {
      log(`    ! image download failed ${u}: ${e.message}`);
      try { if (fs.existsSync(`${file}.tmp`)) fs.unlinkSync(`${file}.tmp`); } catch { /* ignore */ }
      paths.push(null);
    }
  }
  return paths;
}

async function downloadEntityImages(kind, srcId, entity) {
  const dir = path.join(IMAGES_DIR, kind, String(srcId));
  const out = { heroPath: null, galleryPaths: [] };
  if (entity.heroRemote) {
    const [p] = await downloadInto(dir, [entity.heroRemote], "hero-");
    out.heroPath = p;
  }
  if (entity.galleryRemote?.length) {
    const gdir = path.join(dir, "gallery");
    out.galleryPaths = await downloadInto(gdir, entity.galleryRemote, "");
  }
  return out;
}

/* ------------------------------ Main ------------------------------ */
function readExistingJson(file) {
  try {
    const v = JSON.parse(fs.readFileSync(file, "utf8"));
    return v && typeof v === "object" ? v : {};
  } catch {
    return {};
  }
}

async function main() {
  if (!fs.existsSync(TRIPS_DIR)) {
    log(`no private trips dir at ${TRIPS_DIR}`);
    return;
  }
  const attrFile = path.join(OUT, "privateAttractions.json");
  const svcFile = path.join(OUT, "privateServices.json");
  const assignFile = path.join(OUT, "tripAssignments.json");

  // global dedup stores (seeded from any prior run so re-runs are cheap)
  const attractions = readExistingJson(attrFile);
  const services = readExistingJson(svcFile);
  const assignments = readExistingJson(assignFile);

  let slugs = fs
    .readdirSync(TRIPS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));
  if (OPTS.only) slugs = slugs.filter((s) => s === OPTS.only);
  if (Number.isFinite(OPTS.limit)) slugs = slugs.slice(0, OPTS.limit);

  log(`processing ${slugs.length} private trips`);

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    log(`\n[${i + 1}/${slugs.length}] ${slug}`);
    let parsed;
    try {
      parsed = await parsePage(slug);
    } catch (e) {
      log(`  FAIL page: ${e.message}`);
      continue;
    }

    const attractionSrcIds = [];
    for (const a of parsed.attractions) {
      attractionSrcIds.push(a.srcId);
      if (!attractions[a.srcId]) {
        let imgs = { heroPath: null, galleryPaths: [] };
        if (OPTS.images) {
          try {
            imgs = await downloadEntityImages("attractions", a.srcId, a);
          } catch (e) {
            log(`    attraction ${a.srcId} images failed: ${e.message}`);
          }
        }
        attractions[a.srcId] = {
          title: a.title,
          description: a.description,
          prices: a.prices,
          heroRemote: a.heroRemote,
          galleryRemotes: a.galleryRemote,
          heroPath: imgs.heroPath,
          galleryPaths: imgs.galleryPaths,
        };
        log(`  + attraction #${a.srcId} "${a.title}" (a${a.prices.adult}/c${a.prices.child}/i${a.prices.infant})`);
      }
    }

    const serviceSrcIds = [];
    for (const s of parsed.services) {
      serviceSrcIds.push(s.srcId);
      if (!services[s.srcId]) {
        let imgs = { heroPath: null, galleryPaths: [] };
        if (OPTS.images) {
          try {
            imgs = await downloadEntityImages("services", s.srcId, s);
          } catch (e) {
            log(`    service ${s.srcId} images failed: ${e.message}`);
          }
        }
        services[s.srcId] = {
          title: s.title,
          description: s.description,
          prices: s.prices,
          heroRemote: s.heroRemote,
          galleryRemotes: s.galleryRemote,
          heroPath: imgs.heroPath,
          galleryPaths: imgs.galleryPaths,
        };
        log(`  + service #${s.srcId} "${s.title}" (a${s.prices.adult}/c${s.prices.child}/i${s.prices.infant})`);
      }
    }

    assignments[slug] = {
      maxAttractions: parsed.maxAttractions || attractionSrcIds.length,
      attractionSrcIds,
      serviceSrcIds,
    };

    // persist after each trip (crash-safe; ENOSPC may hit on near-full disk)
    try {
      fs.writeFileSync(attrFile, JSON.stringify(attractions, null, 2), "utf8");
      fs.writeFileSync(svcFile, JSON.stringify(services, null, 2), "utf8");
      fs.writeFileSync(assignFile, JSON.stringify(assignments, null, 2), "utf8");
    } catch (e) {
      log(`  ! could not persist (${e.code || e.message}); continuing`);
    }
  }

  log("\n=== DONE ===");
  log(`attractions=${Object.keys(attractions).length} services=${Object.keys(services).length} trips=${Object.keys(assignments).length}`);
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
