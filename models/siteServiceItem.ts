import type { LocalizedText } from "./localization";

/**
 * Gallery image attached to a site service item.
 */
export interface SiteServiceItemImage {
  id: string; // GUID
  subServiceId: string;
  imageUrl: string;
  displayOrder: number;
  createdAt: string;
}

/**
 * Single value under an option group (e.g. key: "1-3 Days", value: "55 USD per day").
 */
export interface SiteServiceOptionValueItem {
  id: string;
  optionId: string;
  key: string;
  value: string;
  isActive: boolean;
  displayOrder: number;
}

/**
 * Option group for customer customization (e.g. "Rental Duration").
 */
export interface SiteServiceOptionItem {
  id: string;
  name: string;
  isActive: boolean;
  displayOrder: number;
  values: SiteServiceOptionValueItem[];
}

/**
 * Single perk / specification item under a feature group (e.g. "Automatic Transmission").
 */
export interface SiteServiceFeatureValueItem {
  id: string;
  featureId: string;
  name: string;
  isActive: boolean;
  displayOrder: number;
}

/**
 * Feature group for included perks or specifications (e.g. "Vehicle Specifications").
 */
export interface SiteServiceFeatureItem {
  id: string;
  name: string;
  isActive: boolean;
  displayOrder: number;
  values: SiteServiceFeatureValueItem[];
}

/**
 * Single site service sub-item entity returned by GET /api/services/subservices.
 */
export interface SiteServiceSubItem {
  id: string; // GUID
  serviceId: string;
  title: string;
  subtitle?: string;
  description: string;
  textTopImage?: string;
  note?: string;
  alert?: string;
  basePriceUSD: number;
  price?: number;
  currency?: string;
  isActive: boolean;
  createdAt: string;
  images: SiteServiceItemImage[];
  options: SiteServiceOptionItem[];
  features: SiteServiceFeatureItem[];
}

/**
 * Paged result envelope for site service items.
 */
export interface PagedSiteServiceSubItemsResult {
  items: SiteServiceSubItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

/**
 * Query parameters for fetching site service items.
 */
export interface SiteServiceSubItemQueryParams {
  serviceId?: string;
  search?: string;
  isActive?: boolean;
  currency?: string;
  pageNumber?: number;
  pageSize?: number;
  lang?: string;
}

/**
 * Localized Option Value upsert payload.
 */
export interface SiteServiceOptionValueUpsert {
  id?: string;
  key: LocalizedText;
  value: LocalizedText;
}

/**
 * Localized Option Group upsert payload.
 */
export interface SiteServiceOptionUpsert {
  id?: string;
  name: LocalizedText;
  values: SiteServiceOptionValueUpsert[];
}

/**
 * Localized Feature Value upsert payload.
 */
export interface SiteServiceFeatureValueUpsert {
  id?: string;
  name: LocalizedText;
}

/**
 * Localized Feature Group upsert payload.
 */
export interface SiteServiceFeatureUpsert {
  id?: string;
  name: LocalizedText;
  values: SiteServiceFeatureValueUpsert[];
}

/**
 * Body payload for POST and PUT /api/services/subservices.
 */
export interface SiteServiceSubItemUpsertRequest {
  serviceId: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  textTopImage: LocalizedText;
  note: LocalizedText;
  alert: LocalizedText;
  basePriceUSD: number;
  isActive: boolean;
  options: SiteServiceOptionUpsert[];
  features: SiteServiceFeatureUpsert[];
}

/**
 * Multi-language detail reconstructed for editing in all supported languages.
 */
export interface SiteServiceSubItemLocalizedDetail {
  id: string;
  serviceId: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  textTopImage: LocalizedText;
  note: LocalizedText;
  alert: LocalizedText;
  basePriceUSD: number;
  isActive: boolean;
  images: SiteServiceItemImage[];
  options: SiteServiceOptionUpsert[];
  features: SiteServiceFeatureUpsert[];
  createdAt: string;
}
