import type { ApiResponse } from "./auth";

export interface ExcursionReviewItem {
  id: string;
  excursionId: string;
  excursionName?: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  title?: string;
  comment: string;
  helpfulCount: number;
  isPublished: boolean;
  createdAt: string;
}

export interface CreateExcursionReviewRequest {
  excursionId: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  title?: string;
  comment: string;
}

export interface ExcursionReviewQueryParams {
  excursionId?: string;
  minRate?: number;
  maxRate?: number;
  isPublished?: boolean;
  isApproved?: boolean;
  languageCode?: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface PagedExcursionReviewsData {
  items: ExcursionReviewItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export type PagedExcursionReviewsResult = ApiResponse<PagedExcursionReviewsData>;
