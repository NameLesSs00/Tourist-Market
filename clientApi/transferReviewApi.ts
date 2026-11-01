import apiClient from "./apiConfig";
import type { ApiResponse } from "@/models/auth";
import type {
  ApproveTransferReviewRequest,
  CreateTransferReviewRequest,
  PagedTransferReviewsResult,
  TransferReviewItem,
  TransferReviewQueryParams,
} from "@/models/transferReview";

export async function getTransferReviews(
  params: TransferReviewQueryParams = {}
): Promise<PagedTransferReviewsResult> {
  const query: Record<string, string | number | boolean> = {};
  if (params.pageNumber) query.pageNumber = params.pageNumber;
  if (params.pageSize) query.pageSize = params.pageSize;
  if (params.isApproved !== undefined) query.isApproved = params.isApproved;
  if (params.language) query.language = params.language;
  if (params.currency) query.currency = params.currency;

  const { data } = await apiClient.get<
    ApiResponse<PagedTransferReviewsResult> | PagedTransferReviewsResult
  >("/transfer-reviews", { params: query });

  if (data && typeof data === "object" && "data" in data && data.data) {
    return data.data;
  }
  if (data && typeof data === "object" && "items" in data) {
    return data as PagedTransferReviewsResult;
  }

  return {
    items: [],
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  };
}

export async function createTransferReview(
  payload: CreateTransferReviewRequest
): Promise<ApiResponse<TransferReviewItem>> {
  const { data } = await apiClient.post<ApiResponse<TransferReviewItem>>(
    "/transfer-reviews",
    payload
  );
  return data;
}

export async function getAdminTransferReviews(
  params: TransferReviewQueryParams = {}
): Promise<PagedTransferReviewsResult> {
  const query: Record<string, string | number | boolean> = {};
  if (params.pageNumber) query.pageNumber = params.pageNumber;
  if (params.pageSize) query.pageSize = params.pageSize;
  if (params.isApproved !== undefined) query.isApproved = params.isApproved;
  if (params.language) query.language = params.language;
  if (params.currency) query.currency = params.currency;

  const { data } = await apiClient.get<
    ApiResponse<PagedTransferReviewsResult> | PagedTransferReviewsResult
  >("/transfer-reviews/admin", { params: query });

  if (data && typeof data === "object" && "data" in data && data.data) {
    return data.data;
  }
  if (data && typeof data === "object" && "items" in data) {
    return data as PagedTransferReviewsResult;
  }

  return {
    items: [],
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  };
}

export async function getTransferReviewById(
  id: string
): Promise<TransferReviewItem> {
  const { data } = await apiClient.get<
    ApiResponse<TransferReviewItem> | TransferReviewItem
  >(`/transfer-reviews/${id}`);

  if (data && typeof data === "object" && "data" in data && data.data) {
    return data.data;
  }
  return data as TransferReviewItem;
}

export async function getAdminTransferReviewById(
  id: string
): Promise<TransferReviewItem> {
  const { data } = await apiClient.get<
    ApiResponse<TransferReviewItem> | TransferReviewItem
  >(`/transfer-reviews/admin/${id}`);

  if (data && typeof data === "object" && "data" in data && data.data) {
    return data.data;
  }
  return data as TransferReviewItem;
}

export async function approveTransferReview(
  id: string,
  payload: ApproveTransferReviewRequest
): Promise<void> {
  await apiClient.put(`/transfer-reviews/${id}/approve`, payload);
}

export async function deleteTransferReview(id: string): Promise<void> {
  await apiClient.delete(`/transfer-reviews/${id}`);
}

