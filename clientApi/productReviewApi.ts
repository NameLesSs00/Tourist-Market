import apiClient from "./apiConfig";
import type { ApiResponse } from "@/models/auth";
import type {
  CreateProductReviewRequest,
  PagedProductReviewsResult,
  ProductReviewItem,
  ProductReviewQueryParams,
} from "@/models/productReview";

export async function getProductReviews(
  params: ProductReviewQueryParams = {}
): Promise<PagedProductReviewsResult> {
  const queryParams: Record<string, string | number | boolean> = {};

  if (params.search?.trim()) queryParams.search = params.search.trim();
  if (params.productId && Number(params.productId) > 0) {
    queryParams.productId = Number(params.productId);
  }
  if (params.rate !== undefined && params.rate !== null && Number(params.rate) > 0) {
    queryParams.rate = Number(params.rate);
  }
  if (params.minRate !== undefined && params.minRate !== null) {
    queryParams.minRate = Number(params.minRate);
  }
  if (params.maxRate !== undefined && params.maxRate !== null) {
    queryParams.maxRate = Number(params.maxRate);
  }
  if (params.sortBy) queryParams.sortBy = params.sortBy;
  if (params.isPublished !== undefined && params.isPublished !== null) {
    queryParams.isPublished = params.isPublished;
  }
  queryParams.pageNumber = params.pageNumber ?? 1;
  queryParams.pageSize = params.pageSize ?? 10;

  const { data } = await apiClient.get<PagedProductReviewsResult>("/reviews", {
    params: queryParams,
  });
  return data;
}

export async function getProductReviewById(
  id: number
): Promise<ApiResponse<ProductReviewItem>> {
  const { data } = await apiClient.get<ApiResponse<ProductReviewItem>>(
    `/reviews/${id}`
  );
  return data;
}

export async function createProductReview(
  body: CreateProductReviewRequest
): Promise<ApiResponse<ProductReviewItem>> {
  const { data } = await apiClient.post<ApiResponse<ProductReviewItem>>(
    "/reviews",
    body
  );
  return data;
}

export async function deleteProductReview(
  id: number
): Promise<ApiResponse<null>> {
  const { data } = await apiClient.delete<ApiResponse<null>>(`/reviews/${id}`);
  return data;
}

export async function publishProductReview(
  id: number
): Promise<ApiResponse<ProductReviewItem>> {
  const { data } = await apiClient.put<ApiResponse<ProductReviewItem>>(
    `/reviews/${id}/publish`
  );
  return data;
}

export async function unpublishProductReview(
  id: number
): Promise<ApiResponse<ProductReviewItem>> {
  const { data } = await apiClient.put<ApiResponse<ProductReviewItem>>(
    `/reviews/${id}/unpublish`
  );
  return data;
}

export async function markProductReviewHelpful(
  id: number
): Promise<ApiResponse<number>> {
  const { data } = await apiClient.post<ApiResponse<number>>(
    `/reviews/${id}/helpful`
  );
  return data;
}
