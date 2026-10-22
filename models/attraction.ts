import type { LocalizedText } from "./localization";

export interface AttractionGalleryImage {
  id: string;
  imageUrl: string;
}

export interface AttractionPriceTier {
  currencyCode: string;
  adultPrice: number;
  childPrice: number;
  infantPrice: number;
}

export interface AttractionItem {
  id: string;
  title: string;
  description: string;
  heroImage?: string | null;
  displayOrder: number;
  adultPriceUsd: number;
  childPriceUsd: number;
  infantPriceUsd: number;
  adultPrice?: number;
  childPrice?: number;
  infantPrice?: number;
  currency?: string;
  images?: AttractionGalleryImage[];
  prices?: AttractionPriceTier[];
}

export interface PagedAttractionsResult {
  items: AttractionItem[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface AttractionQueryParams {
  excursionId?: string;
  lang?: string;
  currency?: string;
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface AttractionUpsertRequest {
  title: LocalizedText;
  description: LocalizedText;
  adultPriceUsd: number;
  childPriceUsd: number;
  infantPriceUsd: number;
  displayOrder: number;
}

export interface AttractionLocalizedDetail {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  displayOrder: number;
  adultPriceUsd: number;
  childPriceUsd: number;
  infantPriceUsd: number;
  heroImage?: string | null;
  images?: AttractionGalleryImage[];
}
