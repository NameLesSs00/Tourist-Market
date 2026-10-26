import apiClient from "./apiConfig";
import type { ApiResponse } from "@/models/auth";
import { LANGS, type LangCode, type LocalizedText } from "@/models/localization";
import {
  fillMissingProductSubcategoryLanguages,
  type PagedProductSubcategoriesResult,
  type ProductSubcategoryItem,
  type ProductSubcategoryLocalizedDetail,
  type ProductSubcategoryQueryParams,
  type ProductSubcategoryReorderItem,
  type ProductSubcategoryUpsertRequest,
} from "@/models/productSubcategory";

/**
 * Fetches paginated product subcategories with optional search, parent category filter, and language.
 */
export async function getProductSubcategories(
  params: ProductSubcategoryQueryParams = {}
): Promise<ApiResponse<PagedProductSubcategoriesResult>> {
  const queryParams: Record<string, string | number> = {};

  if (params.search?.trim()) queryParams.search = params.search.trim();
  if (params.categoryId && Number(params.categoryId) > 0) {
    queryParams.categoryId = Number(params.categoryId);
  }

  const lang = params.lang || params.language || "en";
  queryParams.lang = lang;
  queryParams.language = lang;

  const page = params.pageNumber ?? params.page ?? 1;
  const pageSize = params.pageSize ?? 10;
  queryParams.pageNumber = page;
  queryParams.page = page;
  queryParams.pageSize = pageSize;

  const { data } = await apiClient.get<ApiResponse<PagedProductSubcategoriesResult>>(
    "/subcategories",
    { params: queryParams }
  );
  return data;
}

/**
 * Fetches a single product subcategory by ID for a specific language.
 */
export async function getProductSubcategoryById(
  id: number,
  language: string = "en"
): Promise<ApiResponse<ProductSubcategoryItem>> {
  const { data } = await apiClient.get<ApiResponse<ProductSubcategoryItem>>(
    `/subcategories/${id}`,
    {
      params: { language, lang: language },
    }
  );
  return data;
}

/**
 * Queries all supported languages in parallel to reconstruct full localized names for editing.
 */
export async function getProductSubcategoryAllLanguages(
  id: number
): Promise<ProductSubcategoryLocalizedDetail> {
  const results = await Promise.allSettled(
    LANGS.map(async (lang: LangCode) => {
      const res = await getProductSubcategoryById(id, lang);
      return { lang, item: res.data };
    })
  );

  const localizedName: LocalizedText = { en: "", ru: "", de: "", fr: "" };
  let baseItem: ProductSubcategoryItem | null = null;

  for (const res of results) {
    if (res.status === "fulfilled" && res.value.item) {
      const { lang, item } = res.value;
      if (!baseItem || lang === "en") {
        baseItem = item;
      }
      if (item.name) localizedName[lang] = item.name;
    }
  }

  if (!baseItem) {
    throw new Error(`Failed to load product subcategory ${id} in any language`);
  }

  return {
    id: baseItem.id,
    name: localizedName,
    displayOrder: baseItem.displayOrder,
    categoryId: baseItem.categoryId,
    imageUrl: baseItem.imageUrl,
    noOfItems: baseItem.noOfItems,
  };
}

/**
 * Creates a new product subcategory.
 */
export async function createProductSubcategory(
  body: ProductSubcategoryUpsertRequest
): Promise<ApiResponse<ProductSubcategoryItem>> {
  const payload: ProductSubcategoryUpsertRequest = {
    ...body,
    name: fillMissingProductSubcategoryLanguages(body.name),
  };

  const { data } = await apiClient.post<ApiResponse<ProductSubcategoryItem>>(
    "/subcategories",
    payload
  );
  return data;
}

/**
 * Updates an existing product subcategory.
 */
export async function updateProductSubcategory(
  id: number,
  body: ProductSubcategoryUpsertRequest
): Promise<ApiResponse<ProductSubcategoryItem>> {
  const payload: ProductSubcategoryUpsertRequest = {
    ...body,
    name: fillMissingProductSubcategoryLanguages(body.name),
  };

  const { data } = await apiClient.put<ApiResponse<ProductSubcategoryItem>>(
    `/subcategories/${id}`,
    payload
  );
  return data;
}

/**
 * Deletes a product subcategory by ID.
 */
export async function deleteProductSubcategory(
  id: number
): Promise<ApiResponse<null>> {
  const { data } = await apiClient.delete<ApiResponse<null>>(
    `/subcategories/${id}`
  );
  return data;
}

/**
 * Bulk reorders product subcategories.
 */
export async function reorderProductSubcategories(
  items: ProductSubcategoryReorderItem[]
): Promise<ApiResponse<null>> {
  const { data } = await apiClient.put<ApiResponse<null>>(
    "/subcategories/reorder",
    items
  );
  return data;
}

/**
 * Uploads a cover image for a product subcategory.
 */
export async function uploadProductSubcategoryImage(
  id: number,
  file: File
): Promise<ApiResponse<ProductSubcategoryItem>> {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await apiClient.post<ApiResponse<ProductSubcategoryItem>>(
    `/subcategories/${id}/image`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
}

/**
 * Deletes the cover image of a product subcategory.
 */
export async function deleteProductSubcategoryImage(
  id: number
): Promise<ApiResponse<null>> {
  const { data } = await apiClient.delete<ApiResponse<null>>(
    `/subcategories/${id}/image`
  );
  return data;
}
