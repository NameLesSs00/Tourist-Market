import apiClient from "./apiConfig";
import type {
  PagedTransferRoutePricesResult,
  TransferRoutePriceItem,
  TransferRoutePriceQueryParams,
  TransferRoutePriceUpsertRequest,
} from "@/models/transferRoutePrice";

export async function getTransferRoutePrices(
  params: TransferRoutePriceQueryParams = {}
): Promise<PagedTransferRoutePricesResult> {
  const query: Record<string, string | number | boolean> = {};

  if (params.fromLocationId) query.fromLocationId = params.fromLocationId;
  if (params.toLocationId) query.toLocationId = params.toLocationId;
  if (params.vehicleType !== undefined && params.vehicleType !== null) {
    query.vehicleType = params.vehicleType;
  }
  if (typeof params.isActive === "boolean") query.isActive = params.isActive;
  if (typeof params.minPrice === "number") query.minPrice = params.minPrice;
  if (typeof params.maxPrice === "number") query.maxPrice = params.maxPrice;
  if (params.displayCurrency) query.displayCurrency = params.displayCurrency;

  query.pageNumber = params.pageNumber ?? 1;
  query.pageSize = params.pageSize ?? 10;
  if (params.sortBy) query.sortBy = params.sortBy;
  if (params.sortDirection) query.sortDirection = params.sortDirection;

  const { data } = await apiClient.get<
    PagedTransferRoutePricesResult | { data: PagedTransferRoutePricesResult }
  >("/transfer-route-prices", { params: query });

  if ("data" in data && data.data && Array.isArray((data.data as PagedTransferRoutePricesResult).items)) {
    return data.data as PagedTransferRoutePricesResult;
  }
  return data as PagedTransferRoutePricesResult;
}

export async function getTransferRoutePriceById(
  id: string,
  displayCurrency?: string
): Promise<TransferRoutePriceItem> {
  const { data } = await apiClient.get<
    TransferRoutePriceItem | { data: TransferRoutePriceItem }
  >(`/transfer-route-prices/${id}`, {
    params: displayCurrency ? { displayCurrency } : undefined,
  });

  if ("data" in data && (data as { data: TransferRoutePriceItem }).data) {
    return (data as { data: TransferRoutePriceItem }).data;
  }
  return data as TransferRoutePriceItem;
}

export async function createTransferRoutePrice(
  body: TransferRoutePriceUpsertRequest
): Promise<TransferRoutePriceItem> {
  const { data } = await apiClient.post<
    TransferRoutePriceItem | { data: TransferRoutePriceItem }
  >("/transfer-route-prices", body);

  if ("data" in data && (data as { data: TransferRoutePriceItem }).data) {
    return (data as { data: TransferRoutePriceItem }).data;
  }
  return data as TransferRoutePriceItem;
}

export async function updateTransferRoutePrice(
  id: string,
  body: TransferRoutePriceUpsertRequest
): Promise<TransferRoutePriceItem> {
  const { data } = await apiClient.put<
    TransferRoutePriceItem | { data: TransferRoutePriceItem }
  >(`/transfer-route-prices/${id}`, body);

  if ("data" in data && (data as { data: TransferRoutePriceItem }).data) {
    return (data as { data: TransferRoutePriceItem }).data;
  }
  return data as TransferRoutePriceItem;
}

export async function deleteTransferRoutePrice(id: string): Promise<void> {
  await apiClient.delete(`/transfer-route-prices/${id}`);
}
