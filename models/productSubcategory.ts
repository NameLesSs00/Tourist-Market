import type { LangCode, LocalizedText } from "./localization";

export interface ProductSubcategoryItem {
  id: number;
  name: string;
  imageUrl?: string | null;
  displayOrder: number;
  categoryId: number;
  noOfItems: number;
}

export interface PagedProductSubcategoriesResult {
  items: ProductSubcategoryItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ProductSubcategoryQueryParams {
  search?: string;
  categoryId?: number;
  language?: string;
  lang?: string;
  pageNumber?: number;
  page?: number;
  pageSize?: number;
}

export interface ProductSubcategoryUpsertRequest {
  name: LocalizedText;
  displayOrder: number;
  categoryId: number;
}

export interface ProductSubcategoryLocalizedDetail {
  id: number;
  name: LocalizedText;
  displayOrder: number;
  categoryId: number;
  imageUrl?: string | null;
  noOfItems: number;
}

export interface ProductSubcategoryReorderItem {
  id: number;
  displayOrder: number;
}

/** Fallback missing translations to English so the backend never receives empty values */
export function fillMissingProductSubcategoryLanguages(
  name: LocalizedText
): LocalizedText {
  const fallback = name.en?.trim() || "";
  return {
    en: fallback,
    ru: name.ru?.trim() || fallback,
    de: name.de?.trim() || fallback,
    fr: name.fr?.trim() || fallback,
  };
}
