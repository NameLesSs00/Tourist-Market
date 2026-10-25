import type { LocalizedText } from "./localization";
import type { PrivateExcursionPriceItem } from "./privateExcursion";

export interface ExcursionImageItem {
  id: string;
  excursionId: string;
  imageUrl: string;
  isPrimary: boolean;
}

export interface ExcursionFaqItem {
  id: string;
  excursionId: string;
  question: string;
  answer: string;
  displayOrder: number;
}

export interface ExcursionFaqUpsertRequest {
  displayOrder: number;
  isActive: boolean;
  question: LocalizedText;
  answer: LocalizedText;
}

export interface ExcursionAdminDetailResponse {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullProgram: string;
  videoUrl: string;
  excursionType: string;
  durationHours: number;
  stars: string;
  maxAttractions: number;
  primaryImageUrl: string | null;
  categorySlug: string | null;
  categoryTitle: string;
  isFeatured: boolean;
  rating: number;
  prices: PrivateExcursionPriceItem[];
  imageList: ExcursionImageItem[];
  faqs: ExcursionFaqItem[];
  attractions: Array<{
    id: string;
    title: string;
    description?: string;
    heroImage?: string | null;
    displayOrder?: number;
    adultPriceUsd?: number;
    childPriceUsd?: number;
    infantPriceUsd?: number;
  }>;
  services: Array<{
    id: string;
    title: string;
    description?: string;
    heroImage?: string | null;
    displayOrder?: number;
    basePriceUSD?: number;
  }>;
}

export interface KeyValuePair {
  key: string;
  value: string;
}

export interface LocalizedArray {
  en: string[];
  ru: string[];
  de: string[];
  fr: string[];
}

export interface LocalizedKeyValueArray {
  en: KeyValuePair[];
  ru: KeyValuePair[];
  de: KeyValuePair[];
  fr: KeyValuePair[];
}

export interface ExcursionDetailsUpsertRequest {
  excursionId: string;
  highlights: LocalizedArray;
  includes: LocalizedArray;
  excludes: LocalizedArray;
  whatToBring: LocalizedArray;
  cancellationPolicy: LocalizedArray;
  literally: LocalizedKeyValueArray;
}

export interface ExcursionDetailsDto {
  id: string;
  excursionId: string;
  languageCode: string;
  highlights: string[];
  excludes: string[];
  includes: string[];
  whatToBring: string[];
  cancellationPolicy: string[];
  literally: KeyValuePair[];
}

export interface ExcursionDetailsAllLanguages {
  id?: string;
  excursionId: string;
  exists: boolean;
  highlights: LocalizedArray;
  includes: LocalizedArray;
  excludes: LocalizedArray;
  whatToBring: LocalizedArray;
  cancellationPolicy: LocalizedArray;
  literally: LocalizedKeyValueArray;
}
