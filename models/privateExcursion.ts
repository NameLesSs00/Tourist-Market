import type { LocalizedText } from "./localization";

export interface PrivateExcursionPriceItem {
  currencyCode: string;
  adultPrice: number;
  childPrice: number;
  infantPrice: number;
}

export interface PrivateExcursionCategoryRef {
  id: string;
  categoryTitle?: string;
  slug?: string;
}

export interface PrivateExcursionListItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  excursionType: string;
  durationHours: number;
  stars: string;
  maxAttractions: number;
  primaryImageUrl: string | null;
  category?: PrivateExcursionCategoryRef | null;
  categoryId?: string | null;
  categorySlug?: string | null;
  categoryTitle?: string;
  isFeatured: boolean;
  rating: number;
  prices?: PrivateExcursionPriceItem[];
}

export interface PrivateExcursionDetail extends PrivateExcursionListItem {
  fullProgram: string;
  videoUrl: string;
  imageList: Array<{ id: string; imageUrl: string; isPrimary: boolean }>;
  faqs: Array<{ id: string; question: string; answer: string }>;
  attractions: Array<{
    id: string;
    title: string;
    description: string;
    heroImage: string | null;
    displayOrder: number;
    adultPriceUsd: number;
    childPriceUsd: number;
    infantPriceUsd: number;
    prices?: PrivateExcursionPriceItem[];
  }>;
  services: Array<{
    id: string;
    title: string;
    description: string;
    heroImage: string | null;
    displayOrder: number;
    basePriceUSD: number;
    prices?: PrivateExcursionPriceItem[];
  }>;
}

export interface PrivateExcursionUpsertRequest {
  slug: string;
  categoryId: string;
  stars: string;
  maxAttractions: number;
  durationHours: number;
  videoUrl: string;
  isFeatured: boolean;
  isActive: boolean;
  title: LocalizedText;
  subtitle: LocalizedText;
  excursionType: LocalizedText;
  shortDescription: LocalizedText;
  fullProgram: LocalizedText;
}

export interface PrivateExcursionAllLanguagesDetail {
  id: string;
  slug: string;
  categoryId: string;
  stars: string;
  maxAttractions: number;
  durationHours: number;
  videoUrl: string;
  isFeatured: boolean;
  isActive: boolean;
  title: LocalizedText;
  subtitle: LocalizedText;
  excursionType: LocalizedText;
  shortDescription: LocalizedText;
  fullProgram: LocalizedText;
  assignedAttractions: Array<{ id: string; title: string }>;
  assignedServices: Array<{ id: string; title: string }>;
}

export interface PrivateExcursionQueryParams {
  categoryId?: string;
  lang?: string;
  currency?: string;
  page?: number;
  pageSize?: number;
}

export interface PagedPrivateExcursionsResult {
  success: boolean;
  isSuccess: boolean;
  message: string | null;
  data: {
    items: PrivateExcursionListItem[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}
