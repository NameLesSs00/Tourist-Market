import type { ApiResponse } from "./auth";

export interface ServiceReviewItem {
  id: string;
  subServiceId: string;
  subServiceName?: string;
  fullName: string;
  email: string;
  phone: string;
  rate: number;
  comment: string;
  isPublished: boolean;
  helpfulCount: number;
  createdAt: string;
}

export interface CreateServiceReviewRequest {
  subServiceId: string;
  fullName: string;
  email: string;
  phone: string;
  rate: number;
  comment: string;
}

export interface ServiceReviewQueryParams {
  subServiceId?: string;
  minRate?: number;
  maxRate?: number;
  isPublished?: boolean;
  pageNumber?: number;
  pageSize?: number;
}

export interface PagedServiceReviewsData {
  items: ServiceReviewItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export type PagedServiceReviewsResult = ApiResponse<PagedServiceReviewsData>;
