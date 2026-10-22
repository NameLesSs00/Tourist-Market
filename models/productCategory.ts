import type { LocalizedText } from "./localization";

export interface ProductCategoryItem {
  id: number;
  name: string;
  imageUrl?: string | null;
  displayOrder: number;
  noOfItems: number;
}

export interface PagedProductCategoriesResult {
  items: ProductCategoryItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ProductCategoryQueryParams {
  search?: string;
  language?: string;
  lang?: string;
  pageNumber?: number;
  page?: number;
  pageSize?: number;
}

export interface ProductCategoryUpsertRequest {
  name: LocalizedText;
  displayOrder: number;
}

export interface ProductCategoryLocalizedDetail {
  id: number;
  name: LocalizedText;
  displayOrder: number;
  imageUrl?: string | null;
  noOfItems: number;
}
