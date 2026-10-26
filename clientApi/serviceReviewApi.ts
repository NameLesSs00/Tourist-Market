import apiClient from "./apiConfig";
import type { ApiResponse } from "@/models/auth";
import type {
  CreateServiceReviewRequest,
  PagedServiceReviewsResult,
  ServiceReviewItem,
  ServiceReviewQueryParams,
} from "@/models/serviceReview";

export async function getServiceReviews(
  params: ServiceReviewQueryParams = {}
): Promise<PagedServiceReviewsResult> {
  const queryParams: Record<string, string | number | boolean> = {};

  if (params.subServiceId?.trim()) {
    queryParams.subServiceId = params.subServiceId.trim();
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
  queryParams.pageNumber = params.pageNumber ?? 1;
  queryParams.pageSize = params.pageSize ?? 10;

  const { data } = await apiClient.get<PagedServiceReviewsResult>(
    "/services/reviews",
    { params: queryParams }
  );
  return data;
}

export async function getServiceReviewById(
  id: string
): Promise<ApiResponse<ServiceReviewItem>> {
  const { data } = await apiClient.get<ApiResponse<ServiceReviewItem>>(
    `/services/reviews/${id}`
  );
  return data;
}

export async function createServiceReview(
  body: CreateServiceReviewRequest
): Promise<ApiResponse<ServiceReviewItem>> {
  const { data } = await apiClient.post<ApiResponse<ServiceReviewItem>>(
    "/services/reviews",
    body
  );
  return data;
}

export async function deleteServiceReview(
  id: string
): Promise<ApiResponse<null>> {
  const { data } = await apiClient.delete<ApiResponse<null>>(
    `/services/reviews/${id}`
  );
  return data;
}

export async function publishServiceReview(
  id: string
): Promise<ApiResponse<ServiceReviewItem>> {
  const { data } = await apiClient.put<ApiResponse<ServiceReviewItem>>(
    `/services/reviews/${id}/publish`
  );
  return data;
}

export async function unpublishServiceReview(
  id: string
): Promise<ApiResponse<ServiceReviewItem>> {
  const { data } = await apiClient.put<ApiResponse<ServiceReviewItem>>(
    `/services/reviews/${id}/unpublish`
  );
  return data;
}

export async function markServiceReviewHelpful(
  id: string
): Promise<ApiResponse<number>> {
  const { data } = await apiClient.post<ApiResponse<number>>(
    `/services/reviews/${id}/helpful`
  );
  return data;
}
