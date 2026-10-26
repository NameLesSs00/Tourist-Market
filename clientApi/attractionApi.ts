import apiClient from "./apiConfig";
import { LANGS, type LangCode, type LocalizedText } from "@/models/localization";
import type {
  AttractionGalleryImage,
  AttractionItem,
  AttractionLocalizedDetail,
  AttractionQueryParams,
  AttractionUpsertRequest,
  PagedAttractionsResult,
} from "@/models/attraction";

/**
 * Fetches paginated attractions list with language and currency support.
 */
export async function getAttractions(
  params: AttractionQueryParams = {}
): Promise<PagedAttractionsResult> {
  const queryParams: Record<string, string | number> = {};

  if (params.excursionId?.trim()) queryParams.excursionId = params.excursionId.trim();
  queryParams.lang = params.lang || "en";
  queryParams.currency = params.currency || "USD";

  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 10;
  queryParams.page = page;
  queryParams.pageNumber = page;
  queryParams.pageSize = pageSize;

  const { data } = await apiClient.get<any>("/attractions", {
    params: queryParams,
  });
  return (data?.data ?? data) as PagedAttractionsResult;
}

/**
 * Fetches a single attraction by ID for a specific language and currency.
 */
export async function getAttractionById(
  id: string,
  lang: string = "en",
  currency: string = "USD"
): Promise<AttractionItem> {
  const { data } = await apiClient.get<any>(`/attractions/${id}`, {
    params: { lang, currency },
  });
  return (data?.data ?? data) as AttractionItem;
}

/**
 * Queries all supported languages in parallel to reconstruct full localized title and description for editing.
 */
export async function getAttractionAllLanguages(
  id: string
): Promise<AttractionLocalizedDetail> {
  const results = await Promise.allSettled(
    LANGS.map(async (lang: LangCode) => {
      const item = await getAttractionById(id, lang, "USD");
      return { lang, item };
    })
  );

  const title: LocalizedText = { en: "", ru: "", de: "", fr: "" };
  const description: LocalizedText = { en: "", ru: "", de: "", fr: "" };
  let baseItem: AttractionItem | null = null;

  for (const r of results) {
    if (r.status === "fulfilled" && r.value.item) {
      title[r.value.lang] = r.value.item.title || "";
      description[r.value.lang] = r.value.item.description || "";
      if (!baseItem) baseItem = r.value.item;
    }
  }

  return {
    id,
    title,
    description,
    displayOrder: baseItem?.displayOrder ?? 0,
    adultPriceUsd: baseItem?.adultPriceUsd ?? 0,
    childPriceUsd: baseItem?.childPriceUsd ?? 0,
    infantPriceUsd: baseItem?.infantPriceUsd ?? 0,
    heroImage: baseItem?.heroImage ?? null,
    images: baseItem?.images ?? [],
  };
}

/**
 * Creates a new attraction.
 */
export async function createAttraction(
  body: AttractionUpsertRequest
): Promise<AttractionItem> {
  const { data } = await apiClient.post<any>("/attractions", body);
  return (data?.data ?? data) as AttractionItem;
}

/**
 * Updates an existing attraction.
 */
export async function updateAttraction(
  id: string,
  body: AttractionUpsertRequest
): Promise<AttractionItem> {
  const { data } = await apiClient.put<any>(`/attractions/${id}`, body);
  return (data?.data ?? data) as AttractionItem;
}

/**
 * Deletes an attraction permanently.
 */
export async function deleteAttraction(id: string): Promise<void> {
  await apiClient.delete(`/attractions/${id}`);
}

/**
 * Uploads a hero cover image for an attraction.
 */
export async function uploadAttractionHero(
  id: string,
  file: File
): Promise<{ imageUrl: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await apiClient.post<{ imageUrl: string }>(
    `/attractions/${id}/hero`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
}

/**
 * Deletes the hero cover image from an attraction.
 */
export async function deleteAttractionHero(id: string): Promise<void> {
  await apiClient.delete(`/attractions/${id}/hero`);
}

/**
 * Uploads one or more gallery images for an attraction.
 */
export async function uploadAttractionImages(
  id: string,
  files: File[]
): Promise<{ success: boolean; images: AttractionGalleryImage[] }> {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  const { data } = await apiClient.post<{ success: boolean; images: AttractionGalleryImage[] }>(
    `/attractions/${id}/images`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
}

/**
 * Fetches gallery images of an attraction.
 */
export async function getAttractionImages(
  id: string
): Promise<AttractionGalleryImage[]> {
  const { data } = await apiClient.get<AttractionGalleryImage[]>(
    `/attractions/${id}/images`
  );
  return data;
}

/**
 * Deletes a single gallery image from an attraction.
 */
export async function deleteAttractionImage(
  attractionId: string,
  imageId: string
): Promise<{ success: boolean; message?: string }> {
  const { data } = await apiClient.delete<{ success: boolean; message?: string }>(
    `/attractions/${attractionId}/images/${imageId}`
  );
  return data;
}
