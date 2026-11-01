export interface TransferReviewItem {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  rate: number; // 1 to 5
  comment: string;
  isApproved: boolean;
  createdAt: string;
  approvedAt: string | null;
}

export interface CreateTransferReviewRequest {
  fullName: string;
  email: string;
  phone: string;
  rate: number;
  comment: string;
}

export interface ApproveTransferReviewRequest {
  isApproved: boolean;
}

export interface TransferReviewQueryParams {
  pageNumber?: number;
  pageSize?: number;
  isApproved?: boolean;
  language?: string;
  currency?: string;
}

export interface PagedTransferReviewsResult {
  items: TransferReviewItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface TransferReviewRatingDistributionItem {
  star: number;
  percentage: number;
  count: number;
}

