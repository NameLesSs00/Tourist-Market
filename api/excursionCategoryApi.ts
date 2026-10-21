import apiClient from "./apiConfig";
import type { ApiResponse } from "@/models/auth";
import { LANGS, type LangCode, type LocalizedText } from "@/models/faq";
import type {
  ExcursionCategoryCreateRequest,
  ExcursionCategoryItem,
  ExcursionCategoryLocalizedDetail,
  ExcursionCategoryQueryParams,
  ExcursionCategoryUpdateRequest,
  PagedExcursionCategoriesResult,
} from "@/models/excursionCategory";

/**
 * Fetches paginated excursion categories list with optional search and language.
 */
export async function getExcursionCategories(
  params: ExcursionCategoryQueryParams = {}
): Promise<ApiResponse<PagedExcursionCategoriesResult>> {
  const queryParams: Record<string, string | number> = {};

  if (params.search?.trim()) queryParams.search = params.search.trim();
  const lang = params.lang || params.language || "en";
  queryParams.lang = lang;
  queryParams.language = lang;

  const page = params.pageNumber ?? params.page ?? 1;
  const pageSize = params.pageSize ?? 10;
  queryParams.pageNumber = page;
  queryParams.page = page;
  queryParams.pageSize = pageSize;

  const { data } = await apiClient.get<ApiResponse<PagedExcursionCategoriesResult>>(
    "/excursion-categories",
    { params: queryParams }
  );
  return data;
}

/**
 * Fetches a single excursion category by ID for a specific language.
 */
export async function getExcursionCategoryById(
  id: string,
  lang: string = "en"
): Promise<ApiResponse<ExcursionCategoryItem>> {
  const { data } = await apiClient.get<ApiResponse<ExcursionCategoryItem>>(
    `/excursion-categories/${id}`,
    {
      params: { lang, language: lang },
    }
  );
  return data;
}

/**
 * Creates a new excursion category with localized names.
 */
export async function createExcursionCategory(
  body: ExcursionCategoryCreateRequest
): Promise<ApiResponse<ExcursionCategoryItem>> {
  const { data } = await apiClient.post<ApiResponse<ExcursionCategoryItem>>(
    "/excursion-categories",
    body
  );
  return data;
}

/**
 * Updates an existing excursion category's localized names, order, and active status.
 */
export async function updateExcursionCategory(
  id: string,
  body: ExcursionCategoryUpdateRequest
): Promise<ApiResponse<ExcursionCategoryItem>> {
  const { data } = await apiClient.put<ApiResponse<ExcursionCategoryItem>>(
    `/excursion-categories/${id}`,
    body
  );
  return data;
}

/**
 * Permanently deletes an excursion category by ID.
 */
export async function deleteExcursionCategory(
  id: string
): Promise<ApiResponse<null>> {
  const { data } = await apiClient.delete<ApiResponse<null>>(
    `/excursion-categories/${id}`
  );
  return data;
}

/**
 * Fetches all 4 language variants in parallel to assemble full localized details for editing.
 */
export async function getExcursionCategoryAllLanguages(
  id: string
): Promise<ExcursionCategoryLocalizedDetail | null> {
  const results = await Promise.allSettled(
    LANGS.map(async (lang) => {
      const res = await getExcursionCategoryById(id, lang);
      return { lang, item: res.data };
    })
  );

  let baseItem: ExcursionCategoryItem | null = null;
  const localizedName: LocalizedText = {
    en: "",
    ru: "",
    de: "",
    fr: "",
  };

  for (const res of results) {
    if (res.status === "fulfilled" && res.value.item) {
      const { lang, item } = res.value;
      if (!baseItem) baseItem = item;
      localizedName[lang as LangCode] = item.name || "";
    }
  }

  if (!baseItem) return null;

  // Fallback missing translations to English if available
  const fallback = localizedName.en || baseItem.name;
  for (const lang of LANGS) {
    if (!localizedName[lang]) {
      localizedName[lang] = fallback;
    }
  }

  return {
    id: baseItem.id,
    slug: baseItem.slug,
    displayOrder: baseItem.displayOrder,
    isActive: baseItem.isActive,
    name: localizedName,
  };
}
