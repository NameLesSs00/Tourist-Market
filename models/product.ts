import type { LocalizedText } from "./localization";

export interface ProductImage {
  id: number;
  imageUrl: string;
  displayOrder: number;
  productId: number;
}

export interface ProductListItem {
  id: number;
  title: string;
  subTitle: string;
  price: number;
  priceFor: string;
  subCategoryId: number;
  images: ProductImage[];
}

export interface ProductDetail extends ProductListItem {}

export interface ProductUpsertRequest {
  title: LocalizedText;
  subtitle: LocalizedText;
  price: number;
  priceFor: LocalizedText;
  subCategoryId: number;
}

export interface ProductAllLanguagesDetail {
  id: number;
  title: LocalizedText;
  subtitle: LocalizedText;
  price: number;
  priceFor: LocalizedText;
  subCategoryId: number;
  images: ProductImage[];
}

export interface ProductQueryParams {
  search?: string;
  subCategoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  language?: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface PagedProductsData {
  items: ProductListItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PagedProductsResult {
  success: boolean;
  isSuccess: boolean;
  message: string | null;
  data: PagedProductsData;
}

export interface ProductImageReorderItem {
  imageId: number;
  displayOrder: number;
}

/** Fallback missing translations to English so the backend never receives empty values */
export function fillMissingProductLanguages(
  body: ProductUpsertRequest
): ProductUpsertRequest {
  const fallbackTitle = body.title?.en?.trim() || "";
  const fallbackSubtitle = body.subtitle?.en?.trim() || "";
  const fallbackPriceFor = body.priceFor?.en?.trim() || "";

  return {
    ...body,
    title: {
      en: fallbackTitle,
      ru: body.title?.ru?.trim() || fallbackTitle,
      de: body.title?.de?.trim() || fallbackTitle,
      fr: body.title?.fr?.trim() || fallbackTitle,
    },
    subtitle: {
      en: fallbackSubtitle,
      ru: body.subtitle?.ru?.trim() || fallbackSubtitle,
      de: body.subtitle?.de?.trim() || fallbackSubtitle,
      fr: body.subtitle?.fr?.trim() || fallbackSubtitle,
    },
    priceFor: {
      en: fallbackPriceFor,
      ru: body.priceFor?.ru?.trim() || fallbackPriceFor,
      de: body.priceFor?.de?.trim() || fallbackPriceFor,
      fr: body.priceFor?.fr?.trim() || fallbackPriceFor,
    },
  };
}
