#!/usr/bin/env node
/**
 * Scrape the HOTEL DELIVERIES shop (products, categories, subcategories, prices,
 * images, multilingual content) from the reference site
 * (touristmarket-egypt.com/pages/shop) into dataEntry/, so the items can later
 * be seeded into our backend products.
 *
 * The shop grid is fed by JSON APIs (discovered from index.php):
 *   api/get_all_products.php?page=N          -> { success, products[], pagination } (9/page, 43 pages, 384 products)
 *   api/get_category_subcategories.php?category_id=K -> { success, subcategories[] } (names + translations + products_count)
 *   api/get_category_products.php?category_id=K      -> first page of a category (used to learn its category slug)
 * The 11 top-level categories only exist as HTML tabs on index.php (data-category="<id>" + "N items" label),
 * so the tree pass parses those anchors with Cheerio.
 *
 * Product fields used: id, slug, name_en, desc_en/ar, translations.{de,fr,ru}.{name,description},
 * price, discount_price, sale_price, has_discount, quantity, unit, unit_translations, images[],
 * category, sub_category_id, subcategory_slug/en, subcategory_translations, average_rating, reviews_count.
 *
 * Usage:
 *   node scripts/scrapeHotelDeliveries.mjs [--limit N] [--only <slug>] [--no-images] [--max-images N]
 *
 * Output:
 *   dataEntry/hotelCategories.json      [{id, slug, nameEn, tabCount, subcategories:[{id,slug,name{4},productsCount,imagePath}]}]
 *   dataEntry/hotelProducts.raw.json    { fetchedAt, pagination, products[] } (verbatim API rows)
 *   dataEntry/hotelProducts.json        { "<srcId>": normalized product } (LocalizedText title/descriptionHtml/descriptionText,
 *                                        priceUsd + raw price fields, unit/quantity, category/subcategory, images local paths)
 *   dataEntry/images/products/<slug>/hero.<ext> + gallery/<n>.<ext>
 *   dataEntry/images/subcategories/<slug>.<ext>
 *   dataEntry/hotel-scrape.log          run report (counts per category, mismatches, missing data)
 */

import * as cheerio from "cheerio";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BASE = "https://touristmarket-egypt.com";
const SHOP = `${BASE}/pages/shop`;

const OUT = path.join(ROOT, "dataEntry");
const IMAGES_DIR = path.join(OUT, "images");
const LOG_FILE = path.join(OUT, "hotel-scrape.log");

/* ----------------------------- CLI args ----------------------------- */
function parseArgs(argv) {
  const opts = { limit: Infinity, only: null, images: true, maxImages: Infinity };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--limit") opts.limit = Number(argv[++i]);
    else if (a === "--only") opts.only = argv[++i];
    else if (a === "--no-images") opts.images = false;
    else if (a === "--max-images") opts.maxImages = Number(argv[++i]);
  }
  return opts;
}
const OPTS = parseArgs(process.argv.slice(2));

/* ----------------------------- Helpers ----------------------------- */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const logLines = [];
function log(...a) {
  const line = a.join(" ");
  logLines.push(line);
  console.log(line);
}

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

async function fetchJson(url) {
  return JSON.parse(await fetchText(url));
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

function htmlToText(html) {
  if (!html) return "";
  const $ = cheerio.load(`<div>${html}</div>`);
  return cleanText($("div").first().text());
}

function extFromUrl(url) {
  const m = String(url).match(/\.(webp|jpe?g|png|gif)(?:\?|#|$)/i);
  return m ? m[1].toLowerCase().replace("jpeg", "jpg") : null;
}

function absUrl(src) {
  if (!src) return null;
  if (src.startsWith("http")) return src;
  if (src.startsWith("//")) return "https:" + src;
  return BASE + (src.startsWith("/") ? src : "/" + src);
}

// Windows-safe directory name from a product slug.
function safeName(s, fallback) {
  const cleaned = String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[-.]+|[-.]+$/g, "")
    .slice(0, 80);
  return cleaned || fallback;
}

function localizedFrom(src, { nameEn, nameKey, descEn, descKey }) {
  const t = src.translations || {};
  const pick = (lang, key) => {
    const v = t[lang]?.[key === "name" ? "name" : "description"];
    return typeof v === "string" && v.trim() ? v : null;
  };
  return {
    en: (nameEn ?? descEn) || "",
    de: pick("de", nameKey || descKey) || (nameEn ?? descEn) || "",
    fr: pick("fr", nameKey || descKey) || (nameEn ?? descEn) || "",
    ru: pick("ru", nameKey || descKey) || (nameEn ?? descEn) || "",
  };
}

/* ------------------------- Pass 1: category tree ------------------------- */
async function collectCategories() {
  log("== Pass 1: categories/subcategories tree ==");
  const html = await fetchText(`${SHOP}/index.php`);
  const $ = cheerio.load(html);

  const tabs = [];
  $("a.category-card-new").each((_, el) => {
    const id = $(el).attr("data-category") || "";
    if (!/^\d+$/.test(id)) return; // skip "all" and template rows
    const raw = cleanText($(el).text());
    const countMatch = raw.match(/(\d+)\s*items?/i);
    const nameEn = raw.replace(/\s*\d+\s*items?\s*$/i, "").trim();
    tabs.push({ id: Number(id), nameEn, tabCount: countMatch ? Number(countMatch[1]) : 0 });
  });
  log(`  found ${tabs.length} category tabs`);

  const categories = [];
  for (const tab of tabs) {
    // subcategories
    let subs = [];
    try {
      const j = await fetchJson(`${SHOP}/api/get_category_subcategories.php?category_id=${tab.id}`);
      subs = (j?.subcategories || []).map((s) => {
        const tr = s.translations || {};
        const nameOf = (l) => cleanText(tr[l]?.name || "");
        const en = nameOf("en") || s.slug || "";
        return {
          id: s.id,
          slug: s.slug,
          name: {
            en,
            de: nameOf("de") || en,
            fr: nameOf("fr") || en,
            ru: nameOf("ru") || en,
          },
          productsCount: Number(s.products_count || 0),
          remoteImage: s.image ? absUrl("/" + String(s.image).replace(/^\/+/, "")) : null,
          imagePath: null, // filled by image pass
        };
      });
    } catch (e) {
      log(`  ! subcategories failed for category ${tab.id}: ${e.message}`);
    }

    // category slug: the products of this tab carry a `category` slug field
    let catSlug = null;
    try {
      const j = await fetchJson(`${SHOP}/api/get_category_products.php?category_id=${tab.id}`);
      const first = (Array.isArray(j) ? j : j?.products || [])[0];
      catSlug = first?.category || null;
    } catch (e) {
      log(`  ! category products failed for ${tab.id}: ${e.message}`);
    }

    categories.push({
      id: tab.id,
      slug: catSlug || `category-${tab.id}`,
      slugSource: catSlug ? "products" : "fallback",
      nameEn: tab.nameEn,
      tabCount: tab.tabCount,
      subcategories: subs,
    });
    log(`  [${tab.id}] ${tab.nameEn} -> slug=${catSlug || "?"} subs=${subs.length} tabCount=${tab.tabCount}`);
    await sleep(350);
  }
  return categories;
}

/* ------------------------- Pass 2: all products ------------------------- */
async function collectProducts() {
  log("== Pass 2: all products (paginated) ==");
  const products = new Map();
  let page = 1;
  let totalPages = 1;
  let declared = null;
  do {
    const j = await fetchJson(`${SHOP}/api/get_all_products.php?page=${page}`);
    const pg = j?.pagination || {};
    totalPages = Number(pg.total_pages || 1);
    declared = Number(pg.total_products || 0) || declared;
    const rows = j?.products || [];
    for (const r of rows) {
      if (!r || r.id == null) continue;
      if (OPTS.only && r.slug !== OPTS.only) continue;
      if (!products.has(r.id)) products.set(r.id, r);
    }
    log(`  page ${page}/${totalPages}: +${rows.length} (seen ${products.size})`);
    if (products.size >= OPTS.limit) break;
    page++;
    await sleep(350);
  } while (page <= totalPages);

  return { rows: [...products.values()].slice(0, Number.isFinite(OPTS.limit) ? OPTS.limit : undefined), declared, pages: totalPages };
}

/* ------------------------- Pass 3: images ------------------------- */
async function downloadImage(url, file) {
  // zero-byte leftovers (partial writes) are re-downloaded
  if (fs.existsSync(file) && fs.statSync(file).size > 0) return { skipped: true };
  const buf = await fetchBuffer(url);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, buf);
  return { skipped: false, bytes: buf.length };
}

async function downloadProductImages(row) {
  const slugDir = safeName(row.slug, `id-${row.id}`);
  const dir = path.join(IMAGES_DIR, "products", slugDir);
  const urls = Array.isArray(row.images) ? row.images : [];
  const kept = [];
  const skipped = [];
  for (const raw of urls) {
    const u = absUrl(raw);
    if (!u) continue;
    const ext = extFromUrl(u);
    if (!ext) {
      // AVIF/unknown: backend rejects AVIF; record and skip
      skipped.push({ url: raw, reason: "unsupported-format" });
      continue;
    }
    if (kept.length >= OPTS.maxImages) {
      skipped.push({ url: raw, reason: "max-images-limit" });
      continue;
    }
    const target =
      kept.length === 0
        ? path.join(dir, `hero.${ext}`)
        : path.join(dir, "gallery", `${kept.length - 1}.${ext}`);
    try {
      const r = await downloadImage(u, target);
      kept.push(path.relative(ROOT, target).replace(/\\/g, "/"));
      if (!r.skipped) await sleep(120);
    } catch (e) {
      skipped.push({ url: raw, reason: `error: ${e.message}` });
      log(`    ! image failed ${raw}: ${e.message}`);
    }
  }
  return { localPaths: kept, skipped };
}

async function downloadSubcategoryImages(categories) {
  for (const cat of categories) {
    for (const sub of cat.subcategories) {
      if (!sub.remoteImage) continue;
      const ext = extFromUrl(sub.remoteImage);
      if (!ext) continue;
      const file = path.join(IMAGES_DIR, "subcategories", `${safeName(sub.slug, `sub-${sub.id}`)}.${ext}`);
      try {
        await downloadImage(sub.remoteImage, file);
        sub.imagePath = path.relative(ROOT, file).replace(/\\/g, "/");
      } catch (e) {
        log(`  ! subcategory image failed ${sub.slug}: ${e.message}`);
      }
      await sleep(80);
    }
  }
}

/* ------------------------- Pass 4: normalize ------------------------- */
function normalizeProduct(row, localPaths) {
  const price = Number(row.price ?? 0);
  const salePrice = Number(row.sale_price ?? 0);
  const hasDiscount = Boolean(row.has_discount);
  const priceUsd = hasDiscount && salePrice > 0 ? salePrice : price;

  const title = localizedFrom(row, { nameEn: cleanText(row.name_en), nameKey: "name" });
  const descHtmlEn = row.desc_en || "";
  const descriptionHtml = localizedFrom(row, { descEn: descHtmlEn, descKey: "description" });
  // re-run text extraction per language from the html we have
  const descriptionText = {
    en: htmlToText(descHtmlEn),
    de: htmlToText(descriptionHtml.de),
    fr: htmlToText(descriptionHtml.fr),
    ru: htmlToText(descriptionHtml.ru),
  };

  const unitTr = row.unit_translations || {};
  const unitEn = cleanText(unitTr.en || row.unit || row.trans_unit || "");
  const priceFor = {
    en: unitEn,
    de: cleanText(unitTr.de || "") || unitEn,
    fr: cleanText(unitTr.fr || "") || unitEn,
    ru: cleanText(unitTr.ru || "") || unitEn,
  };

  const subTr = row.subcategory_translations || {};
  const subEn = cleanText(subTr.en?.name || row.subcategory_en || row.subcategory_slug || "");
  const subcategoryName = {
    en: subEn,
    de: cleanText(subTr.de?.name || "") || subEn,
    fr: cleanText(subTr.fr?.name || "") || subEn,
    ru: cleanText(subTr.ru?.name || "") || subEn,
  };

  return {
    srcId: row.id,
    slug: row.slug,
    title,
    descriptionHtml,
    descriptionText,
    priceUsd,
    priceRaw: {
      price,
      discount_price: Number(row.discount_price ?? 0),
      discount_type: row.discount_type ?? null,
      sale_price: salePrice,
      has_discount: hasDiscount,
    },
    quantity: Number(row.quantity ?? 0),
    unit: cleanText(row.unit || ""),
    unitCode: row.unit_code || null,
    priceFor,
    categorySlug: row.category || null,
    subCategoryId: row.sub_category_id ?? null,
    subcategorySlug: row.subcategory_slug || null,
    subcategoryName,
    ratings: {
      average: Number(row.average_rating ?? 0),
      count: Number(row.reviews_count ?? 0),
    },
    remoteImages: row.images || [],
    heroPath: localPaths[0] || null,
    galleryPaths: localPaths.slice(1),
    hasFullTranslations: Boolean(row.translations?.de?.name && row.translations?.fr?.name && row.translations?.ru?.name),
  };
}

/* ------------------------- Report ------------------------- */
function buildReport(categories, rawRows, normalized, imageIssues) {
  const lines = [];
  const byCatSlug = new Map();
  for (const p of rawRows) byCatSlug.set(p.category, (byCatSlug.get(p.category) || 0) + 1);

  lines.push(`fetchedAt: ${new Date().toISOString()}`);
  lines.push(`products scraped: ${rawRows.length} (site declared: ${lastDeclared})`);
  lines.push(`categories: ${categories.length}`);
  for (const c of categories) {
    const got = byCatSlug.get(c.slug) || 0;
    const subSum = c.subcategories.reduce((a, s) => a + s.productsCount, 0);
    const flags = [];
    if (c.tabCount && got !== c.tabCount) flags.push(`tab=${c.tabCount}`);
    if (subSum && subSum !== got) flags.push(`subSum=${subSum}`);
    lines.push(`  [${c.id}] ${c.nameEn} (slug=${c.slug}): scraped=${got} ${flags.length ? "MISMATCH " + flags.join(" ") : "OK"}`);
  }
  const noTrans = normalized.filter((p) => !p.hasFullTranslations).map((p) => p.slug);
  const noPrice = normalized.filter((p) => !(p.priceUsd > 0)).map((p) => p.slug);
  const noImage = normalized.filter((p) => !p.heroPath && OPTS.images).map((p) => p.slug);
  const discounted = normalized.filter((p) => p.priceRaw.has_discount).map((p) => `${p.slug} ${p.priceRaw.price}->${p.priceUsd}`);
  lines.push(`products missing full de/fr/ru name translations: ${noTrans.length}${noTrans.length ? " -> " + noTrans.join(", ") : ""}`);
  lines.push(`products missing/zero price: ${noPrice.length}${noPrice.length ? " -> " + noPrice.join(", ") : ""}`);
  lines.push(`products with no downloaded hero image: ${noImage.length}${noImage.length ? " -> " + noImage.join(", ") : ""}`);
  lines.push(`discounted products (priceUsd = sale_price): ${discounted.length}`);
  if (discounted.length) lines.push("  " + discounted.join("; "));
  lines.push(`image skips/issues: ${imageIssues.length}`);
  for (const i of imageIssues) lines.push(`  ${i.slug}: ${i.url} (${i.reason})`);
  return lines;
}

/* ------------------------- Main ------------------------- */
let lastDeclared = null;

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  log("Scraping Hotel Deliveries shop ->", path.relative(ROOT, OUT));

  const categories = await collectCategories();

  const { rows, declared, pages } = await collectProducts();
  lastDeclared = declared;
  log(`  collected ${rows.length} products over up to ${pages} pages (declared ${declared})`);

  const normalized = [];
  const imageIssues = [];
  if (OPTS.images) {
    log("== Pass 3a: product images ==");
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const { localPaths, skipped } = await downloadProductImages(row);
      for (const s of skipped) imageIssues.push({ slug: row.slug, url: s.url, reason: s.reason });
      normalized.push(normalizeProduct(row, localPaths));
      if ((i + 1) % 25 === 0 || i === rows.length - 1) log(`  images: ${i + 1}/${rows.length} products done`);
    }
    log("== Pass 3b: subcategory images ==");
    await downloadSubcategoryImages(categories);
  } else {
    for (const row of rows) normalized.push(normalizeProduct(row, []));
  }

  const byId = {};
  for (const p of normalized) byId[String(p.srcId)] = p;

  fs.writeFileSync(
    path.join(OUT, "hotelCategories.json"),
    JSON.stringify(categories, null, 2),
    "utf8"
  );
  fs.writeFileSync(
    path.join(OUT, "hotelProducts.raw.json"),
    JSON.stringify({ fetchedAt: new Date().toISOString(), declared, products: rows }, null, 2),
    "utf8"
  );
  fs.writeFileSync(path.join(OUT, "hotelProducts.json"), JSON.stringify(byId, null, 2), "utf8");

  log("== Report ==");
  const report = buildReport(categories, rows, normalized, imageIssues);
  for (const l of report) log(l);

  fs.writeFileSync(LOG_FILE, logLines.join("\n") + "\n", "utf8");
  log("Done. Files written under dataEntry/.");
}

main().catch((e) => {
  log("FATAL", e?.stack || String(e));
  try {
    fs.writeFileSync(LOG_FILE, logLines.join("\n") + "\n", "utf8");
  } catch {}
  process.exit(1);
});
