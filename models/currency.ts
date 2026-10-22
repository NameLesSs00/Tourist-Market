export interface CurrencyItem {
  id: number;
  code: string;
  name: string;
  symbol: string;
  exchangeRate: number;
  isActive: boolean;
  updatedAt?: string;
}

export interface PagedCurrenciesResult {
  items: CurrencyItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface CurrencyQueryParams {
  code?: string;
  isActive?: boolean;
  pageNumber?: number;
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface CurrencyUpsertRequest {
  code: string;
  name: string;
  symbol: string;
  exchangeRate: number;
  isActive: boolean;
}
