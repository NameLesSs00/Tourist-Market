import type { LocalizedText } from "./localization";

export interface ProductImage {
  id: number;
  imageUrl: string;
  displayOrder: number;
  productId: number;
}

/** Single value for a key in GET response */
export interface ProductKeyValueItem {
  id?: number;
  value: string;
  displayOrder?: number;
}

/** Single key specification item in GET response */
export interface ProductKeyItem {
  id?: number;
  name: string; // Title
  displayOrder?: number;
  values: ProductKeyValueItem[]; // Description in values[0].value
}

export interface ProductListItem {
  id: number;
  title: string;
  subTitle: string;
  price: number;
  priceFor: string;
  subCategoryId: number;
  images: ProductImage[];
  keys?: ProductKeyItem[];
}

export interface ProductDetail extends ProductListItem {}

/** Value object for a key in POST/PUT request */
export interface ProductKeyUpsertValue {
  id?: number;
  value: LocalizedText; // Multilingual description
  displayOrder?: number;
}

/** Key specification item in POST/PUT request */
export interface ProductKeyUpsertItem {
  id?: number;
  name: LocalizedText; // Multilingual title
  displayOrder?: number;
  values: ProductKeyUpsertValue[];
}

export interface ProductUpsertRequest {
  title: LocalizedText;
  subtitle: LocalizedText;
  price: number;
  priceFor: LocalizedText;
  subCategoryId: number;
  keys?: ProductKeyUpsertItem[];
}

export interface ProductAllLanguagesDetail {
  id: number;
  title: LocalizedText;
  subtitle: LocalizedText;
  price: number;
  priceFor: LocalizedText;
  subCategoryId: number;
  images: ProductImage[];
  keys?: ProductKeyUpsertItem[];
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

  const sanitizedKeys: ProductKeyUpsertItem[] | undefined = body.keys?.map(
    (key, keyIdx) => {
      const fallbackKeyName = key.name?.en?.trim() || "";
      const sanitizedValues: ProductKeyUpsertValue[] = (key.values || []).map(
        (val, valIdx) => {
          const fallbackVal = val.value?.en?.trim() || "";
          return {
            id: val.id && val.id > 0 ? val.id : 0,
            displayOrder: val.displayOrder ?? valIdx + 1,
            value: {
              en: fallbackVal,
              ru: val.value?.ru?.trim() || fallbackVal,
              de: val.value?.de?.trim() || fallbackVal,
              fr: val.value?.fr?.trim() || fallbackVal,
            },
          };
        }
      );

      return {
        id: key.id && key.id > 0 ? key.id : 0,
        displayOrder: key.displayOrder ?? keyIdx + 1,
        name: {
          en: fallbackKeyName,
          ru: key.name?.ru?.trim() || fallbackKeyName,
          de: key.name?.de?.trim() || fallbackKeyName,
          fr: key.name?.fr?.trim() || fallbackKeyName,
        },
        values: sanitizedValues,
      };
    }
  );

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
    keys: sanitizedKeys,
  };
}
