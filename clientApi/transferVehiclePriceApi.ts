import apiClient from "./apiConfig";
import type {
  CreateTransferVehiclePriceRequest,
  PagedTransferVehiclePricesResult,
  TransferVehiclePriceItem,
  TransferVehiclePriceQueryParams,
  UpdateTransferVehiclePriceRequest,
} from "@/models/transferVehiclePrice";

export async function getTransferVehiclePrices(
  params: TransferVehiclePriceQueryParams = {}
): Promise<PagedTransferVehiclePricesResult> {
  const query: Record<string, string | number> = {};

  if (params.VehicleTypeTransferId) {
    query.VehicleTypeTransferId = params.VehicleTypeTransferId;
  }
  if (typeof params.MinPrice === "number") query.MinPrice = params.MinPrice;
  if (typeof params.MaxPrice === "number") query.MaxPrice = params.MaxPrice;
  if (params.DisplayCurrency) query.DisplayCurrency = params.DisplayCurrency;
  if (params.Lang) query.Lang = params.Lang;

  query.PageNumber = params.PageNumber ?? 1;
  query.PageSize = params.PageSize ?? 20;
  if (params.SortBy) query.SortBy = params.SortBy;
  if (params.SortDirection) query.SortDirection = params.SortDirection;

  const { data } = await apiClient.get<
    PagedTransferVehiclePricesResult | { data: PagedTransferVehiclePricesResult }
  >("/transfer-vehicle-prices", { params: query });

  if (data && typeof data === "object" && "items" in data) {
    return data as PagedTransferVehiclePricesResult;
  }
  if (
    data &&
    typeof data === "object" &&
    "data" in data &&
    data.data &&
    "items" in data.data
  ) {
    return data.data as PagedTransferVehiclePricesResult;
  }

  return {
    items: [],
    pageNumber: 1,
    pageSize: 20,
    totalCount: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  };
}

export async function getTransferVehiclePriceById(
  id: string,
  currency?: string,
  lang?: string
): Promise<TransferVehiclePriceItem> {
  const query: Record<string, string> = {};
  if (currency) query.currency = currency;
  if (lang) query.lang = lang;

  const { data } = await apiClient.get<
    TransferVehiclePriceItem | { data: TransferVehiclePriceItem }
  >(`/transfer-vehicle-prices/${id}`, { params: query });

  if (data && typeof data === "object" && "data" in data && data.data) {
    return data.data as TransferVehiclePriceItem;
  }
  return data as TransferVehiclePriceItem;
}

export async function createTransferVehiclePrice(
  body: CreateTransferVehiclePriceRequest
): Promise<TransferVehiclePriceItem> {
  const { data } = await apiClient.post<
    TransferVehiclePriceItem | { data: TransferVehiclePriceItem }
  >("/transfer-vehicle-prices", body);

  if (data && typeof data === "object" && "data" in data && data.data) {
    return data.data as TransferVehiclePriceItem;
  }
  return data as TransferVehiclePriceItem;
}

export async function updateTransferVehiclePrice(
  id: string,
  body: UpdateTransferVehiclePriceRequest
): Promise<TransferVehiclePriceItem> {
  const { data } = await apiClient.put<
    TransferVehiclePriceItem | { data: TransferVehiclePriceItem }
  >(`/transfer-vehicle-prices/${id}`, body);

  if (data && typeof data === "object" && "data" in data && data.data) {
    return data.data as TransferVehiclePriceItem;
  }
  return data as TransferVehiclePriceItem;
}

export async function deleteTransferVehiclePrice(id: string): Promise<void> {
  await apiClient.delete(`/transfer-vehicle-prices/${id}`);
}

