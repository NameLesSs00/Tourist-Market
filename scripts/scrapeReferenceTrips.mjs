/**
 * Scrape real group + private excursions from the reference site
 * (touristmarket-egypt.com) and write model-aligned trip data + downloaded
 * images into the dataEntry/ folder.
 *
 * Usage:
 *   node scripts/scrapeReferenceTrips.mjs [--type group|private|all] [--limit N] [--no-images]
 *
 * Output:
 *   dataEntry/trips/{group,private}/<slug>.json
 *   dataEntry/trips/index.json
 *   dataEntry/categoryMap.json
 *   dataEntry/images/{group,private}/<slug>/hero.<ext>
 *   dataEntry/images/{group,private}/<slug>/gallery/<n>.<ext>
 */

import * as cheerio from "cheerio";
import fs from "node:fs";
import path from "node:path";

const BASE = "https://touristmarket-egypt.com";
const ROOT = path.resolve(process.cwd());
const OUT = path.join(ROOT, "dataEntry");
const TRIPS_DIR = path.join(OUT, "trips");
const IMAGES_DIR = path.join(OUT, "images");

const LIST_PAGES = {
  group: `${BASE}/pages/excursions/index.php`,
  private: `${BASE}/pages/private_excursions/index.php`,
};
const DETAIL_PATH = {
  group: "/pages/excursions/details.php",
  private: "/pages/private_excursions/details.php",
};

/* ----------------------------- CLI args ----------------------------- */
function parseArgs() {
  const args = process.argv.slice(2);
  const get = (name) => {
    const i = args.indexOf(`--${name}`);
    return i === -1 ? undefined : args[i + 1];
  };
  return {
    type: get("type") || "all",
    limit: Number(get("limit") || 0) || 0,
    noImages: args.includes("--no-images"),
  };
}

/* ----------------------------- Helpers ----------------------------- */
async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.text();
}

async function fetchBuffer(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
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
    .replace(/[ \t]+/g, " ")
    .replace(/\s*\n\s*/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function oneLine(s) {
  return cleanText(s).replace(/\n/g, " ").replace(/\s+/g, " ").trim();
}

function toNum(str) {
  if (!str) return null;
  const n = parseFloat(String(str).replace(/,/g, ".").replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : null;
}

function extFromUrl(url) {
  const m = url.match(/\.(webp|jpe?g|png|avif)(?:\?|#|$)/i);
  return m ? m[1].toLowerCase().replace("jpeg", "jpg") : "jpg";
}

function absUrl(src) {
  if (!src) return null;
  if (src.startsWith("http")) return src;
  if (src.startsWith("//")) return "https:" + src;
  return BASE + (src.startsWith("/") ? src : "/" + src);
}

// LocalizedText contract: en filled, others empty for later translation.
function lt(en) {
  return { en: en || "", de: "", ru: "", fr: "" };
}

// Join block-level children of a container into newline-separated text.
function blockText($, body) {
  if (!body || !body.length) return "";
  const parts = [];
  const keys = new Set();
  body.find("h3,h4,h5,p,li").each((_, el) => {
    const t = oneLine($(el).text());
    const key = t.replace(/\s+/g, "").toLowerCase();
    if (t && !keys.has(key)) {
      keys.add(key);
      parts.push(t);
    }
  });
  if (!parts.length) {
    const t = oneLine(body.text());
    if (t) parts.push(t);
  }
  return parts.join("\n");
}

function listItems($, body) {
  const out = [];
  if (!body || !body.length) return out;
  body.find("li").each((_, el) => {
    const t = oneLine($(el).text());
    if (t && !out.includes(t)) out.push(t);
  });
  return out;
}

// Find a Bootstrap card whose .card-header matches a label regex, return its .card-body.
function sectionBody($, labelRe) {
  let found = null;
  $(".card-header").each((_, el) => {
    if (found) return;
    const t = oneLine($(el).text());
    if (labelRe.test(t)) {
      const card = $(el).closest(".card");
      found = card.length ? card.children(".card-body").first() : $(el).next(".card-body");
    }
  });
  return found;
}

/* --------------------------- Listing parse --------------------------- */
// Returns Map<slug, {slug, title, category, rating, shortDescription, heroImage, prices}>
async function parseListing(type) {
  const html = await fetchText(LIST_PAGES[type]);
  const $ = cheerio.load(html);
  const map = new Map();

  $(`a[href*='details.php?slug=']`).each((_, el) => {
    const href = $(el).attr("href") || "";
    const slug = (href.match(/slug=([\w-]+)/i) || [])[1];
    if (!slug || map.has(slug)) return;

    const card = $(el).closest(".card, .col, .col-md-4, .col-lg-4, li, .item").first();
    const scope = card.length ? card : $(el);
    const img = scope.find("img").attr("src") || scope.find("img").attr("data-src") || "";
    const cardText = oneLine(scope.text());

    // Category label + rating appear near the title on the card.
    const ratingMatch = cardText.match(/(\d)[.,](\d)/);
    const titleEl = scope.find("h2,h3,h4,h5,h6").first();
    const title = oneLine(titleEl.text()) || null;

    // Prices like "Adult:65.00 $ | Child:40.00 $ | Infant:35.00 $"
    const adult = toNum((cardText.match(/Adult:\s*([\d.,]+)\s*\$/i) || [])[1]);
    const child = toNum((cardText.match(/Child:\s*([\d.,]+)\s*\$/i) || [])[1]);
    const infant = toNum((cardText.match(/Infant:\s*([\d.,]+)\s*\$/i) || [])[1]);

    // Category label: text before the rating on the card (best-effort).
    let category = null;
    const catMatch = cardText.match(/(Historical|Sea Trips|Desert Safari Trips|Fun Trips|Private Historical Trips|Private Sea Trips|Private City Tours|Private Desert Safari|Private Fun Trips)/i);
    if (catMatch) category = catMatch[1];

    map.set(slug, {
      slug,
      title,
      category,
      rating: ratingMatch ? Number(ratingMatch[1] + "." + ratingMatch[2]) : null,
      shortDescription: null,
      heroImage: absUrl(img),
      prices: { adult, child, infant },
    });
  });

  return map;
}

/* ---------------------------- Detail parse ---------------------------- */
async function parseDetail(type, slug) {
  const url = `${BASE}${DETAIL_PATH[type]}?slug=${slug}`;
  const html = await fetchText(url);
  const $ = cheerio.load(html);

  const title = oneLine($("h1").first().text());

  // Duration (e.g. "16 Hours")
  const durMatch = oneLine($("body").text()).match(/Duration\s*(\d+)\s*Hours/i);
  const durationHours = durMatch ? Number(durMatch[1]) : null;

  // Prices from the price card region
  const priceRegion = oneLine(($(".price-card").length ? $(".price-card") : $("body")).text());
  const adult = toNum((priceRegion.match(/([\d.,]+)\s*\$\s*Per Adult/i) || [])[1]);
  const child = toNum((priceRegion.match(/([\d.,]+)\s*\$\s*Per Child/i) || [])[1]);
  let infant = toNum((priceRegion.match(/([\d.,]+)\s*\$\s*Per Infant/i) || [])[1]);
  if (infant === null && /Infant[^$]*free/i.test(priceRegion)) infant = 0;

  // Max participants (group) if shown
  const mpMatch = priceRegion.match(/(\d+)\s*(?:max|participants|pax)/i) ||
    oneLine($("body").text()).match(/Max(?:imum)?\s*(?:Participants|Group Size)[:\s]*(\d+)/i);
  const maxParticipants = mpMatch ? Number(mpMatch[1]) : null;

  // Sections
  const descBody = sectionBody($, /^description$/i);
  const itinBody = sectionBody($, /^itinerary|^program|^full program/i);
  const highlightsBody = sectionBody($, /^highlights/i);
  const includesBody = sectionBody($, /^includes?/i);
  const excludesBody = sectionBody($, /^excludes?/i);
  const bringBody = sectionBody($, /^what to bring/i);
  const cancelBody = sectionBody($, /^cancellation/i);

  const descriptionText = descBody ? blockText($, descBody) : "";
  const fullProgram = itinBody ? blockText($, itinBody) : descriptionText;

  // Lead subtitle = first paragraph/sentence of description
  const lead = descBody ? oneLine(descBody.find("h3,p").first().text()) : "";
  const subtitle = lead || (descriptionText.split("\n")[0] || "");
  const shortDescription = descriptionText.replace(/\n+/g, " ").slice(0, 200).trim();

  // FAQ (accordion pairs) if present
  const faqs = [];
  const faqBody = sectionBody($, /^faq|^frequently|questions/i);
  if (faqBody) {
    faqBody.find("[data-toggle='collapse'], .accordion-header, .card-header").each((_, el) => {
      const q = oneLine($(el).text());
      const a = oneLine($(el).next().text());
      if (q) faqs.push({ question: q, answer: a });
    });
  }

  // Attractions (numbered itinerary sub-sections) as reference titles
  const attractions = [];
  if (itinBody) {
    itinBody.find("h3,h4").each((_, el) => {
      const t = oneLine($(el).text());
      if (t && /^\d+[\.\)]\s/.test(t)) attractions.push(t.replace(/^\d+[\.\)]\s*/, ""));
    });
  }

  // Images
  const heroCandidates = [];
  $("img").each((_, el) => {
    const s = $(el).attr("src") || $(el).attr("data-src") || "";
    if (/uploads\/excursions\//.test(s) && !/\/gallery\//.test(s)) heroCandidates.push(absUrl(s));
  });
  const gallery = [];
  const seen = new Set();
  $("img").each((_, el) => {
    const s = $(el).attr("src") || $(el).attr("data-src") || "";
    if (/uploads\/excursions\/gallery\//.test(s)) {
      const a = absUrl(s);
      if (!seen.has(a)) {
        seen.add(a);
        gallery.push(a);
      }
    }
  });

  return {
    title,
    subtitle,
    shortDescription,
    fullProgram,
    durationHours,
    prices: { adult, child, infant },
    maxParticipants,
    highlights: highlightsBody ? listItems($, highlightsBody) : [],
    includes: includesBody ? listItems($, includesBody) : [],
    excludes: excludesBody ? listItems($, excludesBody) : [],
    whatToBring: bringBody ? listItems($, bringBody) : [],
    cancellationPolicy: cancelBody ? blockText($, cancelBody) : "",
    faqs,
    attractions,
    heroImage: heroCandidates[0] || null,
    gallery,
  };
}

/* --------------------------- Image download --------------------------- */
async function downloadImages(type, slug, urls) {
  const dir = path.join(IMAGES_DIR, type, slug);
  const results = {};
  if (urls.hero) {
    try {
      fs.mkdirSync(dir, { recursive: true });
      const ext = extFromUrl(urls.hero);
      const file = path.join(dir, `hero.${ext}`);
      fs.writeFileSync(file, await fetchBuffer(urls.hero));
      results.hero = path.relative(ROOT, file).replace(/\\/g, "/");
    } catch (e) {
      console.warn(`  hero download failed (${slug}): ${e.message}`);
    }
  }
  if (urls.gallery && urls.gallery.length) {
    const gdir = path.join(dir, "gallery");
    fs.mkdirSync(gdir, { recursive: true });
    results.gallery = [];
    for (let i = 0; i < urls.gallery.length; i++) {
      const u = urls.gallery[i];
      try {
        const ext = extFromUrl(u);
        const file = path.join(gdir, `${i}.${ext}`);
        fs.writeFileSync(file, await fetchBuffer(u));
        results.gallery.push({ index: i, path: path.relative(ROOT, file).replace(/\\/g, "/") });
      } catch (e) {
        console.warn(`  gallery[${i}] download failed (${slug}): ${e.message}`);
        results.gallery.push({ index: i, path: null });
      }
    }
  }
  return results;
}

/* ---------------------------- Build trip ---------------------------- */
function buildTrip(type, listing, detail, imagePaths) {
  const category = listing.category || detail.subtitle || "General";
  const rating = listing.rating ?? null;
  const adult = detail.prices.adult ?? listing.prices.adult ?? 0;
  const child = detail.prices.child ?? listing.prices.child ?? 0;
  const infant = detail.prices.infant ?? listing.prices.infant ?? 0;

  const base = {
    type,
    slug: listing.slug,
    source: `${BASE}${DETAIL_PATH[type]}?slug=${listing.slug}`,
    category,
    rating,
    durationHours: detail.durationHours,
    prices: { currencyCode: "USD", adultPrice: adult, childPrice: child, infantPrice: infant },
    images: {
      hero: { remoteUrl: detail.heroImage || listing.heroImage, path: imagePaths.hero || null },
      gallery: (detail.gallery || []).map((u, i) => ({
        remoteUrl: u,
        path: (imagePaths.gallery && imagePaths.gallery[i] && imagePaths.gallery[i].path) || null,
      })),
    },
    content: {
      highlights: detail.highlights,
      includes: detail.includes,
      excludes: detail.excludes,
      whatToBring: detail.whatToBring,
      cancellationPolicy: detail.cancellationPolicy,
      faqs: detail.faqs,
      attractions: detail.attractions,
    },
  };

  if (type === "group") {
    base.create = {
      slug: listing.slug,
      categoryId: null,
      adultPriceUsd: adult,
      childPriceUsd: child,
      infantPriceUsd: infant,
      maxParticipants: detail.maxParticipants ?? 0,
      stars: rating != null ? String(rating) : "0",
      durationHours: detail.durationHours ?? 0,
      videoUrl: "",
      isFeatured: false,
      isActive: true,
      title: lt(detail.title),
      subtitle: lt(detail.subtitle),
      excursionType: lt(category),
      shortDescription: lt(detail.shortDescription),
      fullProgram: lt(detail.fullProgram),
    };
  } else {
    base.create = {
      slug: listing.slug,
      categoryId: null,
      stars: rating != null ? String(rating) : "0",
      maxAttractions: detail.attractions.length || 0,
      durationHours: detail.durationHours ?? 0,
      videoUrl: "",
      isFeatured: false,
      isActive: true,
      title: lt(detail.title),
      subtitle: lt(detail.subtitle),
      excursionType: lt(category),
      shortDescription: lt(detail.shortDescription),
      fullProgram: lt(detail.fullProgram),
    };
  }

  return base;
}

/* ------------------------------ Main ------------------------------ */
async function main() {
  const { type, limit, noImages } = parseArgs();
  const types = type === "all" ? ["group", "private"] : [type];
  const manifest = { generatedAt: new Date().toISOString(), base: BASE, types: {} };
  const categories = new Set();

  for (const t of types) {
    console.log(`\n=== ${t.toUpperCase()} ===`);
    const listingMap = await parseListing(t);
    let slugs = [...listingMap.keys()];
    if (limit > 0) slugs = slugs.slice(0, limit);
    console.log(`found ${listingMap.size} slugs, processing ${slugs.length}`);

    const outDir = path.join(TRIPS_DIR, t);
    fs.mkdirSync(outDir, { recursive: true });

    const entries = [];
    for (const slug of slugs) {
      const listing = listingMap.get(slug);
      try {
        const detail = await parseDetail(t, slug);
        if (detail.category || listing.category) categories.add(listing.category || detail.subtitle || "General");
        const imagePaths = noImages
          ? {}
          : await downloadImages(t, slug, {
              hero: detail.heroImage || listing.heroImage,
              gallery: detail.gallery,
            });
        const trip = buildTrip(t, listing, detail, imagePaths);
        fs.writeFileSync(path.join(outDir, `${slug}.json`), JSON.stringify(trip, null, 2), "utf-8");
        entries.push({
          slug,
          title: detail.title,
          category: trip.category,
          hasHero: !!trip.images.hero.path,
          galleryCount: trip.images.gallery.filter((g) => g.path).length,
          prices: trip.prices,
        });
        console.log(`  ok ${slug} (hero:${trip.images.hero.path ? "y" : "n"}, gallery:${entries[entries.length - 1].galleryCount})`);
      } catch (e) {
        console.warn(`  FAIL ${slug}: ${e.message}`);
        entries.push({ slug, error: e.message });
      }
    }
    manifest.types[t] = { count: entries.length, trips: entries };
  }

  fs.mkdirSync(TRIPS_DIR, { recursive: true });
  fs.writeFileSync(path.join(TRIPS_DIR, "index.json"), JSON.stringify(manifest, null, 2), "utf-8");

  // categoryMap: reference label -> our category id (null until resolved at seed time).
  const categoryMap = {};
  [...categories].sort().forEach((c) => (categoryMap[c] = { ourId: null, ourSlug: null }));
  fs.writeFileSync(path.join(OUT, "categoryMap.json"), JSON.stringify(categoryMap, null, 2), "utf-8");

  console.log("\n=== DONE ===");
  console.log(`trips written under dataEntry/trips/, images under dataEntry/images/`);
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
