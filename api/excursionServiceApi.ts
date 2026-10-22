import apiClient from "./apiConfig";
import { LANGS, type LangCode, type LocalizedText } from "@/models/localization";
import {
  fillMissingExcursionServiceLanguages,
  type ExcursionServiceActionResponse,
  type ExcursionServiceHeroUploadResponse,
  type ExcursionServiceImage,
  type ExcursionServiceItem,
  type ExcursionServiceListParams,
  type ExcursionServiceListResponse,
  type ExcursionServiceUpsertRequest,
} from "@/models/excursionService";

export interface ExcursionServiceLocalizedDetail extends ExcursionServiceItem {
  titleLocalized: LocalizedText;
  descriptionLocalized: LocalizedText;
}

/**
 * Fetches paginated excursion services list with optional excursionId, language, and currency filters.
 */
export async function getExcursionServices(
  params: ExcursionServiceListParams = {}
): Promise<ExcursionServiceListResponse> {
  const queryParams: Record<string, string | number> = {};

  if (params.excursionId?.trim()) queryParams.excursionId = params.excursionId.trim();
  queryParams.lang = params.lang || "en";
  queryParams.currency = params.currency || "USD";

  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 10;
  queryParams.page = page;
  queryParams.pageSize = pageSize;

  const { data } = await apiClient.get<ExcursionServiceListResponse>(
    "/ExcursionServices/options",
    { params: queryParams }
  );
  return data;
}

/**
 * Fetches a single service option by ID for a specific language and currency.
 */
export async function getExcursionServiceById(
  id: string,
  lang: string = "en",
  currency: string = "USD"
): Promise<ExcursionServiceItem> {
  const { data } = await apiClient.get<ExcursionServiceItem>(
    `/ExcursionServices/options/${id}`,
    { params: { lang, currency } }
  );
  return data;
}

/**
 * Queries all supported languages in parallel to reconstruct full localized title and description for editing.
 */
export async function getExcursionServiceAllLanguages(
  id: string
): Promise<ExcursionServiceLocalizedDetail> {
  const results = await Promise.allSettled(
    LANGS.map(async (lang: LangCode) => {
      const item = await getExcursionServiceById(id, lang, "USD");
      return { lang, item };
    })
  );

  const titleLocalized: LocalizedText = { en: "", ru: "", de: "", fr: "" };
  const descriptionLocalized: LocalizedText = { en: "", ru: "", de: "", fr: "" };
  let baseItem: ExcursionServiceItem | null = null;

  for (const res of results) {
    if (res.status === "fulfilled") {
      const { lang, item } = res.value;
      if (!baseItem || lang === "en") {
        baseItem = item;
      }
      if (item.title) titleLocalized[lang] = item.title;
      if (item.description) descriptionLocalized[lang] = item.description;
    }
  }

  if (!baseItem) {
    throw new Error(`Failed to load excursion service ${id} in any language`);
  }

  return {
    ...baseItem,
    titleLocalized,
    descriptionLocalized,
  };
}

/**
 * Creates a new excursion service option.
 */
export async function createExcursionService(
  body: ExcursionServiceUpsertRequest
): Promise<ExcursionServiceItem> {
  const payload: ExcursionServiceUpsertRequest = {
    ...body,
    title: fillMissingExcursionServiceLanguages(body.title),
    description: fillMissingExcursionServiceLanguages(body.description),
  };

  const { data } = await apiClient.post<ExcursionServiceItem>(
    "/ExcursionServices/options",
    payload
  );
  return data;
}

/**
 * Updates an existing excursion service option.
 */
export async function updateExcursionService(
  id: string,
  body: ExcursionServiceUpsertRequest
): Promise<ExcursionServiceItem> {
  const payload: ExcursionServiceUpsertRequest = {
    ...body,
    title: fillMissingExcursionServiceLanguages(body.title),
    description: fillMissingExcursionServiceLanguages(body.description),
  };

  const { data } = await apiClient.put<ExcursionServiceItem>(
    `/ExcursionServices/options/${id}`,
    payload
  );
  return data;
}

/**
 * Deletes an excursion service option.
 */
export async function deleteExcursionService(
  id: string
): Promise<ExcursionServiceActionResponse> {
  const { data } = await apiClient.delete<ExcursionServiceActionResponse>(
    `/ExcursionServices/options/${id}`
  );
  return data ?? { success: true };
}

/**
 * Uploads a hero cover image for a service option.
 */
export async function uploadExcursionServiceHero(
  optionId: string,
  file: File
): Promise<ExcursionServiceHeroUploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await apiClient.post<ExcursionServiceHeroUploadResponse>(
    `/ExcursionServices/options/${optionId}/hero`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
}

/**
 * Gets the hero image URL of a service option.
 */
export async function getExcursionServiceHero(
  optionId: string
): Promise<ExcursionServiceHeroUploadResponse> {
  const { data } = await apiClient.get<ExcursionServiceHeroUploadResponse>(
    `/ExcursionServices/options/${optionId}/hero`
  );
  return data;
}

/**
 * Deletes the hero cover image of a service option.
 */
export async function deleteExcursionServiceHero(
  optionId: string
): Promise<ExcursionServiceActionResponse> {
  const { data } = await apiClient.delete<ExcursionServiceActionResponse>(
    `/ExcursionServices/options/${optionId}/hero`
  );
  return data ?? { success: true };
}

/**
 * Uploads multiple gallery photos for a service option.
 */
export async function uploadExcursionServiceImages(
  optionId: string,
  files: File[]
): Promise<unknown> {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  const { data } = await apiClient.post(
    `/ExcursionServices/options/${optionId}/images`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
}

/**
 * Gets the gallery images list of a service option.
 */
export async function getExcursionServiceImages(
  optionId: string
): Promise<ExcursionServiceImage[]> {
  const { data } = await apiClient.get<ExcursionServiceImage[]>(
    `/ExcursionServices/options/${optionId}/images`
  );
  return data;
}

/**
 * Deletes a single gallery photo from a service option.
 */
export async function deleteExcursionServiceImage(
  optionId: string,
  imageId: string
): Promise<ExcursionServiceActionResponse> {
  const { data } = await apiClient.delete<ExcursionServiceActionResponse>(
    `/ExcursionServices/options/${optionId}/images/${imageId}`
  );
  return data ?? { success: true };
}
