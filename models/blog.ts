import type { LangCode, LocalizedText } from "./faq";

/**
 * A single section within a Blog.
 * Contains localized content and power-point key/value pairs.
 */
export interface BlogSectionItem {
  id: string; // GUID, hidden in UI
  blogId: string;
  title: string;
  description: string;
  shortDescription: string;
  keys: string[]; // Power points keys / headlines
  values: string[]; // Power points values / details
}

/**
 * Blog summary item returned in the paged list or detail view.
 */
export interface BlogItem {
  id: string; // GUID, hidden in UI
  title: string;
  description: string;
  imageUrl: string | null;
  sections: BlogSectionItem[] | null;
}

/**
 * Paged response payload for Blogs.
 */
export interface PagedBlogsResult {
  items: BlogItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

/**
 * Request payload for creating and updating a Blog.
 */
export interface BlogUpsertRequest {
  title: LocalizedText;
  description: LocalizedText;
}

/**
 * Localized array structure used for keys and values in blog sections.
 */
export type LocalizedArray = Record<LangCode, string[]>;

/**
 * Request payload for creating a BlogSection.
 */
export interface BlogSectionCreateRequest {
  blogId: string;
  title: LocalizedText;
  description: LocalizedText;
  shortDescription: LocalizedText;
  keys: LocalizedArray;
  values: LocalizedArray;
}

/**
 * Request payload for updating an existing BlogSection.
 */
export interface BlogSectionUpdateRequest {
  title: LocalizedText;
  description: LocalizedText;
  shortDescription: LocalizedText;
  keys: LocalizedArray;
  values: LocalizedArray;
}

/**
 * UI helper representation of a single Key-Value power point pair.
 */
export interface PowerPointPair {
  key: string;
  value: string;
}

/**
 * Query parameters for fetching blogs.
 */
export interface BlogQueryParams {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
}
