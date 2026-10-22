import type { ApiResponse } from "./auth";

export interface ProductReviewItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  comment: string;
  rate: number;
  productId: number;
  productName?: string;
  isPublished: boolean;
  helpfulCount: number;
}

export interface CreateProductReviewRequest {
  name: string;
  email: string;
  phone: string;
  comment: string;
  rate: number;
  productId: number;
}

export interface ProductReviewQueryParams {
  search?: string;
  productId?: number;
  rate?: number;
  minRate?: number;
  maxRate?: number;
  sortBy?: string;
  isPublished?: boolean;
  pageNumber?: number;
  pageSize?: number;
}

export interface PagedProductReviewsData {
  items: ProductReviewItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export type PagedProductReviewsResult = ApiResponse<PagedProductReviewsData>;
