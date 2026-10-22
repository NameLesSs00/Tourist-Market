import type { LangCode, LocalizedText } from "./localization";

export interface ExcursionServicePrice {
  currencyCode: string;
  adultPrice: number;
  childPrice: number;
  infantPrice: number;
}

export interface ExcursionServiceImage {
  id: string;
  imageUrl: string;
}

export interface ExcursionServiceItem {
  id: string;
  title: string;
  description: string;
  heroImage?: string | null;
  displayOrder: number;
  basePriceUSD: number;
  basePrice?: number;
  displayedPrice?: number;
  currency?: string;
  imageUrls?: string[];
  images?: ExcursionServiceImage[];
  prices?: ExcursionServicePrice[];
}

export interface ExcursionServiceUpsertRequest {
  basePriceUSD: number;
  displayOrder: number;
  title: LocalizedText;
  description: LocalizedText;
}

export interface ExcursionServiceListParams {
  excursionId?: string;
  lang?: LangCode;
  currency?: string;
  page?: number;
  pageSize?: number;
}

export interface ExcursionServiceListResponse {
  items: ExcursionServiceItem[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ExcursionServiceHeroUploadResponse {
  imageUrl: string;
}

export interface ExcursionServiceImageUploadResponse {
  success?: boolean;
  images?: ExcursionServiceImage | ExcursionServiceImage[];
}

export interface ExcursionServiceActionResponse {
  success: boolean;
  message?: string;
}

/** Fallback missing translations to English so the backend never receives empty values */
export function fillMissingExcursionServiceLanguages(
  text: LocalizedText
): LocalizedText {
  const fallback = text.en?.trim() || "";
  return {
    en: fallback,
    ru: text.ru?.trim() || fallback,
    de: text.de?.trim() || fallback,
    fr: text.fr?.trim() || fallback,
  };
}
