import { API_BASE_URL, apiClient } from "./apiConfig";
import type { ApiResponse } from "@/models/auth";
import {
  LANGS,
  type AdminFaq,
  type AdminFaqPage,
  type FaqQueryParams,
  type FaqResponse,
  type FaqUpsertRequest,
  type LangCode,
  type LocalizedText,
} from "@/models/faq";

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

// ---------------------------------------------------------------------------
// Admin endpoints (authenticated through the shared axios client)
// ---------------------------------------------------------------------------

export async function getAdminFaqs(
  params: FaqQueryParams = {}
): Promise<ApiResponse<AdminFaqPage>> {
  const { data } = await apiClient.get<ApiResponse<AdminFaqPage>>("/faqs", {
    params: {
      language: params.language || undefined,
      search: params.search || undefined,
      pageNumber: params.pageNumber,
      pageSize: params.pageSize,
    },
  });
  return data;
}

export async function getFaqById(
  id: string,
  language: LangCode
): Promise<ApiResponse<AdminFaq>> {
  const { data } = await apiClient.get<ApiResponse<AdminFaq>>(`/faqs/${id}`, {
    params: { language },
  });
  return data;
}

/**
 * The backend returns one language per GET, but PUT needs all four.
 * Fetch every language in parallel and merge into an upsert-shaped object.
 */
export async function getFaqAllLanguages(id: string): Promise<FaqUpsertRequest> {
  const responses = await Promise.all(LANGS.map((lang) => getFaqById(id, lang)));

  const question = {} as LocalizedText;
  const answer = {} as LocalizedText;
  LANGS.forEach((lang, i) => {
    question[lang] = responses[i].data?.question ?? "";
    answer[lang] = responses[i].data?.answer ?? "";
  });

  return {
    question,
    answer,
    displayOrder: responses[0].data?.displayOrder ?? 0,
  };
}

export async function createFaq(body: FaqUpsertRequest): Promise<ApiResponse<AdminFaq>> {
  const { data } = await apiClient.post<ApiResponse<AdminFaq>>("/faqs", body);
  return data;
}

export async function updateFaq(
  id: string,
  body: FaqUpsertRequest
): Promise<ApiResponse<AdminFaq>> {
  const { data } = await apiClient.put<ApiResponse<AdminFaq>>(`/faqs/${id}`, body);
  return data;
}

export async function deleteFaq(id: string): Promise<ApiResponse<null>> {
  const { data } = await apiClient.delete<ApiResponse<null>>(`/faqs/${id}`);
  return data;
}
