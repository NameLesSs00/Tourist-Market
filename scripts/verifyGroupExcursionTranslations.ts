/**
 * Diagnostic Script: Verify Group Excursion Translations
 * 
 * This script fetches the group excursion data in all 4 languages
 * and generates a report showing which translations are complete.
 * 
 * Run with: bun run scripts/verifyGroupExcursionTranslations.ts
 */

import axios, { AxiosInstance } from "axios";

// Configuration
const EXCURSION_ID = "292df7dc-f7b7-4056-bc9b-3b368717ad2d";
const API_BASE_URL = "https://touristtt.runasp.net/api";
const ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjJmMDU2MDhkLTUzZDEtNDJhMy1iZGM1LTA0OWQ5ZjlhMjNmMCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTMwNjMwMzgsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.j-RXAU8-Zk6Q6ozPX2HpPTrooFTD4Vi9nAuf3S90zz0";

const LANGUAGES = ["en", "ru", "de", "fr"];
const LANGUAGE_NAMES = {
  en: "English",
  ru: "Russian",
  de: "German",
  fr: "French",
};

// Create API client
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${ADMIN_TOKEN}`,
  },
  timeout: 30000,
});

interface TranslationReport {
  language: string;
  languageName: string;
  core: {
    success: boolean;
    title: string;
    subtitle: string;
    excursionType: string;
    shortDescription: string;
    fullProgramLength: number;
  } | null;
  details: {
    success: boolean;
    highlightsCount: number;
    includesCount: number;
    excludesCount: number;
    whatToBringCount: number;
    cancellationPolicyCount: number;
    literallyCount: number;
  } | null;
  faqs: {
    success: boolean;
    count: number;
  } | null;
  errors: string[];
}

async function fetchCoreExcursion(lang: string): Promise<any> {
  const { data } = await apiClient.get(
    `/admin/excursions/${EXCURSION_ID}`,
    { params: { lang, currency: "USD" } }
  );
  return data?.data || data;
}

async function fetchExcursionDetails(lang: string): Promise<any> {
  try {
    const { data } = await apiClient.get(
      `/excursions-details/excursion/${EXCURSION_ID}`,
      { params: { lang, currency: "USD" } }
    );
    return data?.data || data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

async function fetchFaqs(lang: string): Promise<any[]> {
  try {
    const { data } = await apiClient.get(
      `/admin/excursions/${EXCURSION_ID}/faqs`,
      { params: { lang } }
    );
    return data?.data || data || [];
  } catch (error: any) {
    if (error.response?.status === 404) {
      return [];
    }
    throw error;
  }
}

async function verifyLanguage(lang: string): Promise<TranslationReport> {
  const report: TranslationReport = {
    language: lang,
    languageName: LANGUAGE_NAMES[lang as keyof typeof LANGUAGE_NAMES],
    core: null,
    details: null,
    faqs: null,
    errors: [],
  };

  // 1. Check core excursion
  try {
    const core = await fetchCoreExcursion(lang);
    report.core = {
      success: true,
      title: core.title || "",
      subtitle: core.subtitle || "",
      excursionType: core.excursionType || "",
      shortDescription: core.shortDescription || "",
      fullProgramLength: (core.fullProgram || "").length,
    };
  } catch (error: any) {
    report.errors.push(`Core excursion: ${error.message}`);
  }

  // 2. Check excursion details
  try {
    const details = await fetchExcursionDetails(lang);
    if (details) {
      report.details = {
        success: true,
        highlightsCount: details.highlights?.length || 0,
        includesCount: details.includes?.length || 0,
        excludesCount: details.excludes?.length || 0,
        whatToBringCount: details.whatToBring?.length || 0,
        cancellationPolicyCount: details.cancellationPolicy?.length || 0,
        literallyCount: details.literally?.length || 0,
      };
    } else {
      report.details = {
        success: false,
        highlightsCount: 0,
        includesCount: 0,
        excludesCount: 0,
        whatToBringCount: 0,
        cancellationPolicyCount: 0,
        literallyCount: 0,
      };
      report.errors.push("Details: Not found (404)");
    }
  } catch (error: any) {
    report.errors.push(`Details: ${error.message}`);
  }

  // 3. Check FAQs
  try {
    const faqs = await fetchFaqs(lang);
    report.faqs = {
      success: faqs.length > 0,
      count: faqs.length,
    };
  } catch (error: any) {
    report.errors.push(`FAQs: ${error.message}`);
  }

  return report;
}

async function generateReport() {
  console.log("\n" + "=".repeat(80));
  console.log("GROUP EXCURSION TRANSLATION VERIFICATION REPORT");
  console.log("=".repeat(80));
  console.log(`Excursion ID: ${EXCURSION_ID}`);
  console.log(`API Base URL: ${API_BASE_URL}`);
  console.log("=".repeat(80) + "\n");

  const reports: TranslationReport[] = [];

  for (const lang of LANGUAGES) {
    console.log(`[${lang.toUpperCase()}] Fetching ${LANGUAGE_NAMES[lang as keyof typeof LANGUAGE_NAMES]} data...`);
    const report = await verifyLanguage(lang);
    reports.push(report);
  }

  console.log("\n" + "=".repeat(80));
  console.log("DETAILED RESULTS");
  console.log("=".repeat(80) + "\n");

  for (const report of reports) {
    console.log(`\n${"*".repeat(80)}`);
    console.log(`LANGUAGE: ${report.languageName.toUpperCase()} (${report.language})`);
    console.log("*".repeat(80));

    // Core Excursion
    console.log("\n[1] CORE EXCURSION DATA:");
    if (report.core) {
      console.log(`  Status: ${report.core.success ? "SUCCESS" : "FAILED"}`);
      console.log(`  Title: ${report.core.title ? `"${report.core.title.substring(0, 50)}..."` : "MISSING"}`);
      console.log(`  Subtitle: ${report.core.subtitle ? `"${report.core.subtitle.substring(0, 50)}..."` : "MISSING"}`);
      console.log(`  Type: ${report.core.excursionType || "MISSING"}`);
      console.log(`  Short Desc: ${report.core.shortDescription ? `${report.core.shortDescription.length} chars` : "MISSING"}`);
      console.log(`  Full Program: ${report.core.fullProgramLength > 0 ? `${report.core.fullProgramLength} chars` : "MISSING"}`);
    } else {
      console.log("  Status: FAILED - Could not fetch");
    }

    // Excursion Details
    console.log("\n[2] EXCURSION DETAILS:");
    if (report.details) {
      console.log(`  Status: ${report.details.success ? "SUCCESS" : "NOT FOUND"}`);
      console.log(`  Highlights: ${report.details.highlightsCount} items`);
      console.log(`  Includes: ${report.details.includesCount} items`);
      console.log(`  Excludes: ${report.details.excludesCount} items`);
      console.log(`  What to Bring: ${report.details.whatToBringCount} items`);
      console.log(`  Cancellation Policy: ${report.details.cancellationPolicyCount} items`);
      console.log(`  Literally (Key-Value): ${report.details.literallyCount} pairs`);
    } else {
      console.log("  Status: FAILED - Could not fetch");
    }

    // FAQs
    console.log("\n[3] FAQS:");
    if (report.faqs) {
      console.log(`  Status: ${report.faqs.success ? "SUCCESS" : "EMPTY"}`);
      console.log(`  Count: ${report.faqs.count} FAQs`);
    } else {
      console.log("  Status: FAILED - Could not fetch");
    }

    // Errors
    if (report.errors.length > 0) {
      console.log("\n[!] ERRORS:");
      report.errors.forEach((err) => console.log(`  - ${err}`));
    }
  }

  // Summary comparison
  console.log("\n" + "=".repeat(80));
  console.log("TRANSLATION COMPLETENESS SUMMARY");
  console.log("=".repeat(80));
  
  console.log("\n| Language | Core | Details | FAQs | Status |");
  console.log("|----------|------|---------|------|--------|");
  
  for (const report of reports) {
    const coreStatus = report.core?.success ? "OK" : "FAIL";
    const detailsStatus = report.details?.success ? "OK" : "FAIL";
    const faqsStatus = report.faqs?.success ? "OK" : "EMPTY";
    const overallStatus = 
      coreStatus === "OK" && detailsStatus === "OK" && faqsStatus === "OK" 
        ? "COMPLETE" 
        : "INCOMPLETE";
    
    console.log(
      `| ${report.languageName.padEnd(8)} | ${coreStatus.padEnd(4)} | ${detailsStatus.padEnd(7)} | ${faqsStatus.padEnd(4)} | ${overallStatus.padEnd(6)} |`
    );
  }

  console.log("\n" + "=".repeat(80));
  console.log("RECOMMENDATIONS");
  console.log("=".repeat(80) + "\n");

  const englishReport = reports.find((r) => r.language === "en");
  const incompleteLanguages = reports.filter((r) => 
    r.language !== "en" && 
    (!r.core?.success || !r.details?.success || !r.faqs?.success)
  );

  if (englishReport?.core?.success) {
    console.log("1. English data is present - can be used as reference for translations");
  } else {
    console.log("1. WARNING: English data is incomplete - fix this first!");
  }

  if (incompleteLanguages.length > 0) {
    console.log(`2. Missing translations for: ${incompleteLanguages.map((r) => r.languageName).join(", ")}`);
    console.log("3. Action: Run populate script with per-language updates");
  } else {
    console.log("2. All translations are complete!");
  }

  console.log("\n" + "=".repeat(80) + "\n");
}

// Run the report
generateReport().catch((error) => {
  console.error("\nFATAL ERROR:", error);
  process.exit(1);
});
