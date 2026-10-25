import apiClient from "./apiConfig";
import { LANGS, type LocalizedText } from "@/models/localization";
import type {
  ExcursionFaqItem,
  ExcursionFaqUpsertRequest,
} from "@/models/excursionDetails";

/**
 * Fetches FAQs for an excursion in a given language.
 */
export async function getExcursionFaqs(
  excursionId: string,
  lang: string = "en"
): Promise<ExcursionFaqItem[]> {
  const { data } = await apiClient.get<ExcursionFaqItem[]>(
    `/admin/excursions/${excursionId}/faqs`,
    { params: { lang } }
  );
  const raw = data as any;
  return (raw?.data || raw || []) as ExcursionFaqItem[];
}

/**
 * Fetches all 4 language variants for a specific excursion FAQ in parallel.
 */
export async function getExcursionFaqAllLanguages(
  excursionId: string,
  faqId: string
): Promise<{ displayOrder: number; question: LocalizedText; answer: LocalizedText }> {
  const responses = await Promise.all(
    LANGS.map((lang) => getExcursionFaqs(excursionId, lang))
  );
  const question: LocalizedText = { en: "", ru: "", de: "", fr: "" };
  const answer: LocalizedText = { en: "", ru: "", de: "", fr: "" };
  let displayOrder = 1;

  LANGS.forEach((lang, i) => {
    const list = responses[i] || [];
    const item = list.find((f) => f.id === faqId);
    if (item) {
      question[lang] = item.question || "";
      answer[lang] = item.answer || "";
      displayOrder = item.displayOrder ?? 1;
    }
  });

  return { displayOrder, question, answer };
}

/**
 * Creates an excursion FAQ with multi-language question and answer.
 */
export async function createExcursionFaq(
  excursionId: string,
  payload: ExcursionFaqUpsertRequest
): Promise<ExcursionFaqItem> {
  const { data } = await apiClient.post<ExcursionFaqItem>(
    `/admin/excursions/${excursionId}/faqs`,
    payload
  );
  const raw = data as any;
  return (raw?.data || raw) as ExcursionFaqItem;
}

/**
 * Updates an existing excursion FAQ with multi-language question and answer.
 */
export async function updateExcursionFaq(
  excursionId: string,
  faqId: string,
  payload: ExcursionFaqUpsertRequest
): Promise<ExcursionFaqItem> {
  const { data } = await apiClient.put<ExcursionFaqItem>(
    `/admin/excursions/${excursionId}/faqs/${faqId}`,
    payload
  );
  const raw = data as any;
  return (raw?.data || raw) as ExcursionFaqItem;
}

/**
 * Soft-deletes an excursion FAQ.
 */
export async function deleteExcursionFaq(
  excursionId: string,
  faqId: string
): Promise<{ success: boolean; message: string }> {
  const { data } = await apiClient.delete<{ success: boolean; message: string }>(
    `/admin/excursions/${excursionId}/faqs/${faqId}`
  );
  return data;
}
