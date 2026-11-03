#!/usr/bin/env node
/**
 * Live translation audit for the Site Services content (no admin token needed —
 * public read endpoints). For each private service category, fetch its sub-items
 * in all four locales (via Accept-Language) and check that title/description are
 * present and, for de/ru/fr, actually differ from the English source.
 *
 * This only READS from the backend to report translation coverage; fixing missing
 * backend content requires the admin token and is out of scope here.
 *
 * Usage: node scripts/checkServiceTranslations.mjs [--base URL]
 */

const BASE = (process.argv.find((a, i) => process.argv[i - 1] === "--base") ||
  process.env.API_BASE_URL ||
  "https://touristtt.runasp.net/api").replace(/\/+$/, "");

// Mirrors components/UserComp/Services/config/siteServicesConfig.ts
const SERVICES = [
  { key: "touristServices", name: "Tourist Services", id: "17e7c22e-e19e-431d-9b24-1b6f75cd01f9" },
  { key: "realEstate", name: "Red Sea Real Estate", id: "ab273263-625a-4a30-b7a7-1514a37f63ab" },
  { key: "carRental", name: "Car Rental", id: "f28eafbc-fe21-4d0f-92c8-66965c761e4e" },
  { key: "vipAirport", name: "VIP Hurghada Airport", id: "a275d037-ad85-4a4f-9c75-14c0249b4783" },
];

const LANGS = ["en", "de", "ru", "fr"];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const isTransient = (e) =>
  /TIMEOUT|ECONNRESET|ECONNREFUSED|EAI_AGAIN|UND_ERR|SocketError|ETIMEDOUT/i.test(
    String(e?.cause?.code || e?.code || "") + " " + String(e?.message)
  );

async function getItems(serviceId, lang) {
  const url =
    `${BASE}/services/subservices?serviceId=${serviceId}` +
    `&pageNumber=1&pageSize=100&isActive=true&currency=USD`;
  let res;
  for (let a = 0; a < 5; a++) {
    try {
      res = await fetch(url, { headers: { Accept: "application/json", "Accept-Language": lang } });
      break;
    } catch (e) {
      if (a < 4 && isTransient(e)) { await sleep(2000 * (a + 1)); continue; }
      throw e;
    }
  }
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${lang}`);
  const j = await res.json();
  const items = j?.data?.items ?? j?.items ?? (Array.isArray(j?.data) ? j.data : []);
  return Array.isArray(items) ? items : [];
}

// Map id -> { en, de, ru, fr } title/description snapshot
function indexById(items) {
  const m = new Map();
  for (const it of items) m.set(it.id, it);
  return m;
}

function norm(s) {
  return String(s ?? "").trim();
}

async function main() {
  let gaps = 0;
  let totalItems = 0;

  for (const svc of SERVICES) {
    console.log(`\n=== ${svc.name} (${svc.key}) ===`);
    let byLang;
    try {
      byLang = {};
      for (const lang of LANGS) byLang[lang] = indexById(await getItems(svc.id, lang));
    } catch (e) {
      console.log(`  fetch failed: ${e.message}`);
      continue;
    }

    const enIds = [...byLang.en.keys()];
    if (!enIds.length) { console.log("  (no active sub-items in EN)"); continue; }

    for (const id of enIds) {
      totalItems++;
      const row = [];
      for (const lang of LANGS) {
        const it = byLang[lang].get(id);
        const title = norm(it?.title);
        const desc = norm(it?.description);
        const enIt = byLang.en.get(id);
        let flag = "ok";
        if (!it || !title || !desc) flag = "MISSING";
        else if (lang !== "en") {
          // untranslated if BOTH title and description are byte-identical to EN
          if (title === norm(enIt?.title) && desc === norm(enIt?.description)) flag = "SAME-AS-EN";
        }
        if (flag !== "ok") gaps++;
        row.push(`${lang}:${flag}`);
      }
      const enTitle = norm(byLang.en.get(id)?.title);
      console.log(`  ${row.join("  ")}  "${enTitle}"`);
    }
  }

  console.log(`\n=== AUDIT: ${totalItems} sub-items checked, ${gaps} language-gaps flagged ===`);
}

main().catch((e) => { console.error("Fatal:", e); process.exit(1); });
