import apiClient from "./apiConfig";
import type { ApiResponse } from "@/models/auth";
import { LANGS, type LangCode, type LocalizedText } from "@/models/faq";
import type {
  PagedProductCategoriesResult,
  ProductCategoryItem,
  ProductCategoryLocalizedDetail,
  ProductCategoryQueryParams,
  ProductCategoryUpsertRequest,
} from "@/models/productCategory";

/**
 * Fetches paginated product categories with optional search and language.
 */
export async function getProductCategories(
  params: ProductCategoryQueryParams = {}
): Promise<ApiResponse<PagedProductCategoriesResult>> {
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

  const { data } = await apiClient.get<ApiResponse<PagedProductCategoriesResult>>(
    "/Productcategories",
    { params: queryParams }
  );
  return data;
}

/**
 * Fetches a single product category by ID for a specific language.
 */
export async function getProductCategoryById(
  id: number,
  lang: string = "en"
): Promise<ApiResponse<ProductCategoryItem>> {
  const { data } = await apiClient.get<ApiResponse<ProductCategoryItem>>(
    `/Productcategories/${id}`,
    {
      params: { lang, language: lang },
    }
  );
  return data;
}

/**
 * Creates a new product category with localized names.
 */
export async function createProductCategory(
  body: ProductCategoryUpsertRequest
): Promise<ApiResponse<ProductCategoryItem>> {
  const { data } = await apiClient.post<ApiResponse<ProductCategoryItem>>(
    "/Productcategories",
    body
  );
  return data;
}

/**
 * Updates an existing product category.
 */
export async function updateProductCategory(
  id: number,
  body: ProductCategoryUpsertRequest
): Promise<ApiResponse<ProductCategoryItem>> {
  const { data } = await apiClient.put<ApiResponse<ProductCategoryItem>>(
    `/Productcategories/${id}`,
    body
  );
  return data;
}

/**
 * Permanently deletes a product category.
 */
export async function deleteProductCategory(
  id: number
): Promise<ApiResponse<boolean | null>> {
  const { data } = await apiClient.delete<ApiResponse<boolean | null>>(
    `/Productcategories/${id}`
  );
  return data;
}

/**
 * Uploads a cover image for a product category.
 */
export async function uploadProductCategoryImage(
  id: number,
  file: File
): Promise<ApiResponse<ProductCategoryItem>> {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await apiClient.post<ApiResponse<ProductCategoryItem>>(
    `/Productcategories/${id}/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
}

/**
 * Deletes the cover image from a product category.
 */
export async function deleteProductCategoryImage(
  id: number
): Promise<ApiResponse<null>> {
  const { data } = await apiClient.delete<ApiResponse<null>>(
    `/Productcategories/${id}/image`
  );
  return data;
}

/**
 * Queries all supported languages in parallel to reconstruct full localized names for editing.
 */
export async function getProductCategoryAllLanguages(
  id: number
): Promise<ProductCategoryLocalizedDetail> {
  const results = await Promise.allSettled(
    LANGS.map(async (lang: LangCode) => {
      const res = await getProductCategoryById(id, lang);
      return { lang, data: res.data };
    })
  );

  const name: LocalizedText = { en: "", ru: "", de: "", fr: "" };
  let baseItem: ProductCategoryItem | null = null;

  for (const r of results) {
    if (r.status === "fulfilled" && r.value.data) {
      name[r.value.lang] = r.value.data.name || "";
      if (!baseItem) baseItem = r.value.data;
    }
  }

  return {
    id,
    name,
    displayOrder: baseItem?.displayOrder ?? 0,
    imageUrl: baseItem?.imageUrl ?? null,
    noOfItems: baseItem?.noOfItems ?? 0,
  };
}
