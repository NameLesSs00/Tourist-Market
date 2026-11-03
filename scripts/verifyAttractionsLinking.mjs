#!/usr/bin/env node
/**
 * Verify Phase 2/3 seeding: attraction + service counts, prices, and that each
 * private trip actually has the expected attractions/services assigned on the
 * LIVE backend (compare against the local state + assignment files).
 *
 * Usage: ADMIN_TOKEN=<jwt> node scripts/verifyAttractionsLinking.mjs [--spot N]
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BASE_URL = (process.env.API_BASE_URL || "https://touristtt.runasp.net/api").replace(/\/+$/, "");
const TOKEN = process.env.ADMIN_TOKEN || "";
const OUT = path.join(ROOT, "dataEntry");

const spotN = Number((process.argv.find((a, i) => process.argv[i - 1] === "--spot") || 4));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const isTransient = (e) => /TIMEOUT|ECONNRESET|ECONNREFUSED|EAI_AGAIN|UND_ERR|SocketError|ETIMEDOUT/i.test(String(e?.cause?.code || e?.code || "") + " " + String(e?.message));

async function get(url, a = 0) {
  let res;
  try {
    res = await fetch(url, { headers: { Authorization: `Bearer ${TOKEN}`, Accept: "application/json" } });
  } catch (e) {
    if (a < 5 && isTransient(e)) { await sleep(2000 * (a + 1)); return get(url, a + 1); }
    throw e;
  }
  if (res.status >= 500 && a < 5) { await sleep(2000 * (a + 1)); return get(url, a + 1); }
  const t = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${t.slice(0, 200)}`);
  try { return JSON.parse(t); } catch { return { raw: t }; }
}

function itemsOf(j) {
  return j?.data?.items || j?.data?.data || j?.items || j?.data || (Array.isArray(j) ? j : []);
}

function readJson(f) { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return {}; } }

async function main() {
  if (!TOKEN) { console.log("ADMIN_TOKEN not set"); process.exit(1); }
  const state = readJson(path.join(OUT, ".seed-attractions-state.json"));
  const assign = readJson(path.join(OUT, "tripAssignments.json"));

  // ---- attraction inventory ----
  let attrItems = [];
  for (let p = 1; p <= 6; p++) {
    const j = await get(`${BASE_URL}/attractions?page=${p}&pageSize=100&lang=en&currency=USD`);
    const it = itemsOf(j);
    attrItems = attrItems.concat(it);
    if (it.length < 100) break;
  }
  const withHero = attrItems.filter((x) => x.heroImage).length;
  const withPrice = attrItems.filter((x) => (x.adultPriceUsd ?? x.adultPrice ?? 0) > 0).length;
  console.log(`ATTRACTIONS on backend: ${attrItems.length} (withHero=${withHero}, adultPrice>0=${withPrice})`);

  // ---- service inventory ----
  let svcItems = [];
  for (let p = 1; p <= 4; p++) {
    const j = await get(`${BASE_URL}/ExcursionServices/options?page=${p}&pageSize=100&lang=en&currency=USD`);
    const it = itemsOf(j);
    svcItems = svcItems.concat(it);
    if (it.length < 100) break;
  }
  const svcWithPrice = svcItems.filter((x) => (x.adultPriceUsd ?? x.basePriceUSD ?? x.displayedPrice ?? 0) > 0).length;
  console.log(`SERVICES on backend:    ${svcItems.length} (adultPrice>0=${svcWithPrice})`);

  // ---- state vs backend sanity ----
  const attrCreated = Object.keys(state).filter((k) => k.startsWith("attraction/")).length;
  const svcCreated = Object.keys(state).filter((k) => k.startsWith("service/")).length;
  const linked = Object.keys(state).filter((k) => k.startsWith("link/")).length;
  console.log(`STATE: attractions=${attrCreated} services=${svcCreated} linked=${linked}`);

  // ---- spot-check assignments ----
  const slugs = Object.keys(assign);
  let mismatches = 0;
  console.log(`\nSPOT-CHECKING ${Math.min(spotN, slugs.length)} of ${slugs.length} trips:`);
  for (const slug of slugs.slice(0, spotN)) {
    const tripId = readJson(path.join(OUT, ".seed-state.json"))[`private/${slug}`];
    if (!tripId) { console.log(`  ${slug}: NO trip id`); mismatches++; continue; }
    const expectedA = (assign[slug].attractionSrcIds || []).filter((s) => state[`attraction/${s}`]).length;
    const expectedS = (assign[slug].serviceSrcIds || []).filter((s) => state[`service/${s}`]).length;
    let gotA = [], gotS = [];
    try {
      const ja = await get(`${BASE_URL}/private-excursions/${tripId}/attractions?lang=en&currency=USD`);
      const js = await get(`${BASE_URL}/private-excursions/${tripId}/services?lang=en&currency=USD`);
      gotA = Array.isArray(ja?.data) ? ja.data : Array.isArray(ja) ? ja : itemsOf(ja);
      gotS = Array.isArray(js?.data) ? js.data : Array.isArray(js) ? js : itemsOf(js);
    } catch (e) {
      console.log(`  ${slug}: fetch error ${e.message}`); mismatches++; continue;
    }
    const okA = gotA.length === expectedA;
    const okS = gotS.length === expectedS;
    if (!okA || !okS) mismatches++;
    console.log(`  ${okA && okS ? "OK " : "!! "}${slug}: attractions ${gotA.length}/${expectedA}, services ${gotS.length}/${expectedS}, max=${assign[slug].maxAttractions}`);
  }

  console.log(`\n=== VERIFY ${mismatches === 0 ? "PASSED" : `DONE (${mismatches} mismatch)`} ===`);
}

main().catch((e) => { console.error("Fatal:", e); process.exit(1); });
