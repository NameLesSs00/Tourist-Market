export interface DeliveryProductLocalizedArea {
  en: string;
  ru: string;
  de: string;
  fr: string;
}

export interface DeliveryProductItem {
  id: number;
  area: string;
  priceUsd: number;
  isActive: boolean;
  createdAt: string;
}

export interface CreateDeliveryProductRequest {
  area: DeliveryProductLocalizedArea;
  priceUsd: number;
}

export interface UpdateDeliveryProductRequest {
  area: DeliveryProductLocalizedArea;
  priceUsd: number;
  isActive: boolean;
}

export interface DeliveryProductQueryParams {
  isActive?: boolean;
  currency?: string;
  language?: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface PagedDeliveryProductsResult {
  items: DeliveryProductItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

