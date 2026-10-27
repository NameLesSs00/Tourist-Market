// FAQ data contracts matching the backend `GET /api/faqs` response shape.
// The backend `id` field is intentionally omitted: the UI never surfaces it.

/** A single question/answer pair. */
export interface FaqItem {
  id?: string;
  question: string;
  answer: string;
  displayOrder: number;
}

/** Paged envelope returned by the backend. */
export interface FaqPage {
  items: FaqItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

/** Full backend envelope: `{ success, isSuccess, message, data, errors }`. */
export interface FaqResponse {
  success: boolean;
  isSuccess: boolean;
  message: string | null;
  data: FaqPage;
  errors: unknown | null;
}

/** Supported query string parameters. */
export interface FaqQueryParams {
  language?: string;
  search?: string;
  pageNumber?: number;
  pageSize?: number;
}

import type { LocalizedText } from "./localization";

// ---------------------------------------------------------------------------
// Admin contracts
// ---------------------------------------------------------------------------

/**
 * FAQ as returned by admin endpoints. `id` is kept for edit/delete calls
 * but must never be rendered in the UI.
 */
export interface AdminFaq {
  id: string;
  question: string;
  answer: string;
  displayOrder: number;
}

export interface AdminFaqPage {
  items: AdminFaq[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

/** Body for `POST /faqs` and `PUT /faqs/{id}`. */
export interface FaqUpsertRequest {
  question: LocalizedText;
  answer: LocalizedText;
  displayOrder: number;
}
