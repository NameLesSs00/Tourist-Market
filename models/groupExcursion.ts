import type { LocalizedText } from "./localization";
import type { ExcursionFaqItem, ExcursionImageItem } from "./excursionDetails";

export interface GroupExcursionPrice {
  currencyCode: string;
  adultPrice: number;
  childPrice: number;
  infantPrice: number;
}

export interface ExcursionCategoryRef {
  id: string;
  categoryTitle?: string;
  slug?: string;
}

export interface GroupExcursionListItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  excursionType: string;
  durationHours: number;
  stars: string;
  maxAttractions: number;
  maxParticipants?: number | null;
  primaryImageUrl: string | null;
  heroImageUrl: string | null;
  category?: ExcursionCategoryRef | null;
  categoryId?: string | null;
  categorySlug?: string | null;
  categoryTitle?: string;
  isFeatured: boolean;
  rating: number;
  price: GroupExcursionPrice;
}

export interface GroupExcursionListResponse {
  items: GroupExcursionListItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface GroupExcursionQueryParams {
  categoryId?: string;
  lang?: string;
  currency?: string;
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface GroupExcursionCreateRequest {
  slug: string;
  categoryId: string;
  adultPriceUsd: number;
  childPriceUsd: number;
  infantPriceUsd: number;
  maxParticipants: number;
  stars: string;
  durationHours: number;
  videoUrl?: string;
  isFeatured: boolean;
  isActive: boolean;
  title: LocalizedText;
  subtitle: LocalizedText;
  excursionType: LocalizedText;
  shortDescription: LocalizedText;
  fullProgram: LocalizedText;
}

export interface GroupExcursionUpdateRequest {
  slug: string;
  categoryId: string;
  excursionType?: string;
  adultPriceUsd: number;
  childPriceUsd: number;
  infantPriceUsd: number;
  maxParticipants: number;
  stars: string;
  maxAttractions: number;
  durationHours: number;
  videoUrl?: string;
  isFeatured: boolean;
  isActive: boolean;
  translations: {
    title: LocalizedText;
    subtitle: LocalizedText;
    excursionType: LocalizedText;
    shortDescription: LocalizedText;
    fullProgram: LocalizedText;
  };
}

export interface GroupExcursionDetailItem {
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
  maxParticipants?: number | null;
  primaryImageUrl: string | null;
  heroImageUrl: string | null;
  heroImage?: string | null;
  imageList?: ExcursionImageItem[];
  faqs?: ExcursionFaqItem[];
  attractions?: Array<{ id: string; title: string }>;
  services?: Array<{ id: string; title: string }>;
  category?: ExcursionCategoryRef | null;
  categoryId?: string | null;
  categorySlug?: string | null;
  categoryTitle?: string;
  isFeatured: boolean;
  rating: number;
  price: GroupExcursionPrice;
}

export interface GroupExcursionAllLanguagesDetail {
  base: GroupExcursionDetailItem;
  categoryId?: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  excursionType: LocalizedText;
  shortDescription: LocalizedText;
  fullProgram: LocalizedText;
}
