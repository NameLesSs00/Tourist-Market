import apiClient from "./apiConfig";
import type { ApiResponse } from "@/models/auth";
import { LANGS, type LangCode, type LocalizedText } from "@/models/localization";
import {
  fillMissingProductLanguages,
  type PagedProductsResult,
  type ProductAllLanguagesDetail,
  type ProductDetail,
  type ProductImage,
  type ProductImageReorderItem,
  type ProductQueryParams,
  type ProductUpsertRequest,
} from "@/models/product";

export async function getProducts(
  params: ProductQueryParams = {}
): Promise<PagedProductsResult> {
  const queryParams: Record<string, string | number> = {};

  if (params.search?.trim()) queryParams.search = params.search.trim();
  if (params.subCategoryId && Number(params.subCategoryId) > 0) {
    queryParams.subCategoryId = Number(params.subCategoryId);
  }
  if (params.minPrice !== undefined && params.minPrice !== null) {
    queryParams.minPrice = Number(params.minPrice);
  }
  if (params.maxPrice !== undefined && params.maxPrice !== null) {
    queryParams.maxPrice = Number(params.maxPrice);
  }
  if (params.sortBy) queryParams.sortBy = params.sortBy;
  queryParams.language = params.language || "en";
  queryParams.pageNumber = params.pageNumber ?? 1;
  queryParams.pageSize = params.pageSize ?? 10;

  const { data } = await apiClient.get<PagedProductsResult>("/products", {
    params: queryParams,
  });
  return data;
}

export async function getProductById(
  id: number,
  language: string = "en"
): Promise<ApiResponse<ProductDetail>> {
  const { data } = await apiClient.get<ApiResponse<ProductDetail>>(
    `/products/${id}`,
    { params: { language } }
  );
  return data;
}

export async function getProductAllLanguages(
  id: number
): Promise<ProductAllLanguagesDetail> {
  const results = await Promise.allSettled(
    LANGS.map(async (lang) => {
      const res = await getProductById(id, lang);
      return { lang, data: res.data };
    })
  );

  const title: LocalizedText = { en: "", ru: "", de: "", fr: "" };
  const subtitle: LocalizedText = { en: "", ru: "", de: "", fr: "" };
  const priceFor: LocalizedText = { en: "", ru: "", de: "", fr: "" };
  let price = 0;
  let subCategoryId = 0;
  let images: ProductImage[] = [];

  for (const r of results) {
    if (r.status === "fulfilled" && r.value.data) {
      const { lang, data } = r.value;
      title[lang as LangCode] = data.title || "";
      subtitle[lang as LangCode] = data.subTitle || "";
      priceFor[lang as LangCode] = data.priceFor || "";
      price = data.price ?? price;
      subCategoryId = data.subCategoryId ?? subCategoryId;
      if (data.images && data.images.length > 0) {
        images = data.images;
      }
    }
  }

  return { id, title, subtitle, price, priceFor, subCategoryId, images };
}

export async function createProduct(
  body: ProductUpsertRequest
): Promise<ApiResponse<ProductDetail>> {
  const payload = fillMissingProductLanguages(body);
  const { data } = await apiClient.post<ApiResponse<ProductDetail>>(
    "/products",
    payload
  );
  return data;
}

export async function updateProduct(
  id: number,
  body: ProductUpsertRequest
): Promise<ApiResponse<ProductDetail>> {
  const payload = fillMissingProductLanguages(body);
  const { data } = await apiClient.put<ApiResponse<ProductDetail>>(
    `/products/${id}`,
    payload
  );
  return data;
}

export async function deleteProduct(id: number): Promise<ApiResponse<null>> {
  const { data } = await apiClient.delete<ApiResponse<null>>(`/products/${id}`);
  return data;
}

export async function getProductImages(
  productId: number
): Promise<ApiResponse<ProductImage[]>> {
  const { data } = await apiClient.get<ApiResponse<ProductImage[]>>(
    `/products/${productId}/images`
  );
  return data;
}

export async function uploadProductImages(
  productId: number,
  files: File[]
): Promise<ApiResponse<ProductImage[]>> {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  const { data } = await apiClient.post<ApiResponse<ProductImage[]>>(
    `/products/${productId}/images`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
}

export async function reorderProductImages(
  productId: number,
  images: ProductImageReorderItem[]
): Promise<ApiResponse<ProductImage[]>> {
  const { data } = await apiClient.put<ApiResponse<ProductImage[]>>(
    `/products/${productId}/images/reorder`,
    { images }
  );
  return data;
}

export async function deleteProductImage(
  productId: number,
  imageId: number
): Promise<ApiResponse<null>> {
  const { data } = await apiClient.delete<ApiResponse<null>>(
    `/products/${productId}/images/${imageId}`
  );
  return data;
}
