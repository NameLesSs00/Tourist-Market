import { API_BASE_URL } from "./apiConfig";
import type { FaqQueryParams, FaqResponse } from "@/models/faq";

/**
 * Builds the `/faqs` query string, omitting empty values so the backend
 * keeps applying its own defaults (pageNumber=1, pageSize=10).
 */
function buildFaqsQuery(params: FaqQueryParams = {}): string {
  const search = new URLSearchParams();

  if (params.language) search.set("language", params.language);
  if (params.search) search.set("search", params.search);
  if (params.pageNumber !== undefined) search.set("pageNumber", String(params.pageNumber));
  if (params.pageSize !== undefined) search.set("pageSize", String(params.pageSize));

  const query = search.toString();
  return query ? `?${query}` : "";
}

/**
 * Fetches FAQs from the backend.
 *
 * Not wired into the UI yet — the FAQ section currently renders
 * placeholder data from `shared/utils/faqDummyData`.
 */
export async function fetchFaqs(params: FaqQueryParams = {}): Promise<FaqResponse> {
  const response = await fetch(`${API_BASE_URL}/faqs${buildFaqsQuery(params)}`, {
    headers: { accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch FAQs: ${response.status} ${response.statusText}`);
  }

  const payload = (await response.json()) as FaqResponse;

  if (!payload.isSuccess) {
    throw new Error(payload.message || "Failed to fetch FAQs");
  }

  return payload;
}
