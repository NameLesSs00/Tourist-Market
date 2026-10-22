import type { LocalizedText } from "./localization";

/**
 * Single site service entity returned by GET /api/services/services
 */
export interface SiteServiceItem {
  id: string; // GUID / UUID
  imageUrl: string | null;
  title: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}

/**
 * Paged result envelope for site services.
 */
export interface PagedSiteServicesResult {
  items: SiteServiceItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

/**
 * Query parameters for fetching site services list.
 */
export interface SiteServiceQueryParams {
  search?: string;
  pageNumber?: number;
  pageSize?: number;
  lang?: string;
}

/**
 * Payload for POST /api/services/services and PUT /api/services/services/{id}.
 */
export interface SiteServiceUpsertRequest {
  title: LocalizedText;
  description: LocalizedText;
  isActive: boolean;
}

/**
 * Multi-language detail reconstructed for editing in all supported languages.
 */
export interface SiteServiceLocalizedDetail {
  id: string;
  imageUrl: string | null;
  title: LocalizedText;
  description: LocalizedText;
  isActive: boolean;
  createdAt: string;
}
