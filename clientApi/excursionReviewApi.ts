import apiClient from "./apiConfig";
import type { ApiResponse } from "@/models/auth";
import type {
  CreateExcursionReviewRequest,
  ExcursionReviewItem,
  ExcursionReviewQueryParams,
  PagedExcursionReviewsResult,
} from "@/models/excursionReview";

export async function getExcursionReviews(
  params: ExcursionReviewQueryParams = {}
): Promise<PagedExcursionReviewsResult> {
  const queryParams: Record<string, string | number | boolean> = {};

  if (params.excursionId?.trim()) {
    queryParams.excursionId = params.excursionId.trim();
  }
  if (params.minRate !== undefined && params.minRate !== null) {
    queryParams.minRate = Number(params.minRate);
  }
  if (params.maxRate !== undefined && params.maxRate !== null) {
    queryParams.maxRate = Number(params.maxRate);
  }
  if (params.isPublished !== undefined && params.isPublished !== null) {
    queryParams.isPublished = params.isPublished;
  }
  if (params.isApproved !== undefined && params.isApproved !== null) {
    queryParams.isApproved = params.isApproved;
  }
  if (params.languageCode?.trim()) {
    queryParams.languageCode = params.languageCode.trim();
  }
  queryParams.pageNumber = params.pageNumber ?? 1;
  queryParams.pageSize = params.pageSize ?? 10;

  const { data } = await apiClient.get<PagedExcursionReviewsResult>(
    "/excursion-reviews",
    { params: queryParams }
  );
  return data;
}

export async function getExcursionReviewById(
  id: string
): Promise<ApiResponse<ExcursionReviewItem>> {
  const { data } = await apiClient.get<ApiResponse<ExcursionReviewItem>>(
    `/excursion-reviews/${id}`
  );
  return data;
}

export async function createExcursionReview(
  body: CreateExcursionReviewRequest
): Promise<ApiResponse<ExcursionReviewItem>> {
  const { data } = await apiClient.post<ApiResponse<ExcursionReviewItem>>(
    "/excursion-reviews",
    body
  );
  return data;
}

export async function deleteExcursionReview(
  id: string
): Promise<ApiResponse<null>> {
  const { data } = await apiClient.delete<ApiResponse<null>>(
    `/excursion-reviews/${id}`
  );
  return data;
}

export async function publishExcursionReview(
  id: string
): Promise<ApiResponse<ExcursionReviewItem>> {
  const { data } = await apiClient.put<ApiResponse<ExcursionReviewItem>>(
    `/excursion-reviews/${id}/publish`
  );
  return data;
}

export async function unpublishExcursionReview(
  id: string
): Promise<ApiResponse<ExcursionReviewItem>> {
  const { data } = await apiClient.put<ApiResponse<ExcursionReviewItem>>(
    `/excursion-reviews/${id}/unpublish`
  );
  return data;
}

export async function markExcursionReviewHelpful(
  id: string
): Promise<ApiResponse<number>> {
  const { data } = await apiClient.post<ApiResponse<number>>(
    `/excursion-reviews/${id}/helpful`
  );
  return data;
}
