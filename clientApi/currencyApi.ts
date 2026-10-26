import apiClient from "./apiConfig";
import type { ApiResponse } from "@/models/auth";
import type {
  CurrencyItem,
  CurrencyQueryParams,
  CurrencyUpsertRequest,
  PagedCurrenciesResult,
} from "@/models/currency";

/**
 * Fetches paginated currencies list with optional code and status filters.
 */
export async function getCurrencies(
  params: CurrencyQueryParams = {}
): Promise<ApiResponse<PagedCurrenciesResult>> {
  const queryParams: Record<string, string | number | boolean> = {};

  if (params.code?.trim()) queryParams.code = params.code.trim();
  if (typeof params.isActive === "boolean") queryParams.isActive = params.isActive;

  const page = params.pageNumber ?? params.page ?? 1;
  const pageSize = params.pageSize ?? 20;
  queryParams.pageNumber = page;
  queryParams.page = page;
  queryParams.pageSize = pageSize;

  const { data } = await apiClient.get<ApiResponse<PagedCurrenciesResult>>(
    "/currencies",
    { params: queryParams }
  );
  return data;
}

/**
 * Fetches all currently active currencies.
 */
export async function getActiveCurrencies(): Promise<ApiResponse<CurrencyItem[]>> {
  const { data } = await apiClient.get<ApiResponse<CurrencyItem[]>>(
    "/currencies/active"
  );
  return data;
}

/**
 * Fetches a single currency by its ID.
 */
export async function getCurrencyById(
  id: number
): Promise<ApiResponse<CurrencyItem>> {
  const { data } = await apiClient.get<ApiResponse<CurrencyItem>>(
    `/currencies/${id}`
  );
  return data;
}

/**
 * Fetches a single currency by its ISO code (e.g. "USD", "EUR").
 */
export async function getCurrencyByCode(
  code: string
): Promise<ApiResponse<CurrencyItem>> {
  const { data } = await apiClient.get<ApiResponse<CurrencyItem>>(
    `/currencies/code/${encodeURIComponent(code)}`
  );
  return data;
}

/**
 * Creates a new currency.
 */
export async function createCurrency(
  body: CurrencyUpsertRequest
): Promise<ApiResponse<CurrencyItem>> {
  const { data } = await apiClient.post<ApiResponse<CurrencyItem>>(
    "/currencies",
    body
  );
  return data;
}

/**
 * Updates an existing currency.
 */
export async function updateCurrency(
  id: number,
  body: CurrencyUpsertRequest
): Promise<ApiResponse<CurrencyItem>> {
  const { data } = await apiClient.put<ApiResponse<CurrencyItem>>(
    `/currencies/${id}`,
    body
  );
  return data;
}

/**
 * Permanently deletes a currency.
 */
export async function deleteCurrency(
  id: number
): Promise<ApiResponse<null>> {
  const { data } = await apiClient.delete<ApiResponse<null>>(
    `/currencies/${id}`
  );
  return data;
}
