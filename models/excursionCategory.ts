import type { LocalizedText } from "./localization";

/**
 * Summary of an Excursion Category returned in the paged list or detail view.
 */
export interface ExcursionCategoryItem {
  id: string; // GUID, hidden in UI
  name: string;
  slug: string;
  displayOrder: number;
  isActive: boolean;
  noOfItems: number;
  createdAt: string;
  updatedAt?: string | null;
}

/**
 * Paged result returned by GET /api/excursion-categories
 */
export interface PagedExcursionCategoriesResult {
  items: ExcursionCategoryItem[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Filter & pagination parameters for GET /api/excursion-categories
 */
export interface ExcursionCategoryQueryParams {
  search?: string;
  language?: string;
  lang?: string;
  pageNumber?: number;
  pageSize?: number;
  page?: number;
}

/**
 * Request payload for creating a new Excursion Category (POST /api/excursion-categories).
 */
export interface ExcursionCategoryCreateRequest {
  name: LocalizedText;
  displayOrder: number;
}

/**
 * Request payload for updating an existing Excursion Category (PUT /api/excursion-categories/{id}).
 */
export interface ExcursionCategoryUpdateRequest {
  name: LocalizedText;
  displayOrder: number;
  isActive: boolean;
}

/**
 * Full localized entity used when editing an Excursion Category in the slide panel.
 */
export interface ExcursionCategoryLocalizedDetail {
  id: string;
  slug: string;
  displayOrder: number;
  isActive: boolean;
  name: LocalizedText;
}
