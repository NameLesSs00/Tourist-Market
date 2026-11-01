import apiClient from "./apiConfig";
import type {
  CreateVehicleTypeTransferRequest,
  PagedVehicleTypeTransfersResult,
  UpdateVehicleTypeTransferRequest,
  VehicleTypeTransferDetails,
  VehicleTypeTransferItem,
  VehicleTypeTransferQueryParams,
} from "@/models/vehicleTypeTransfer";

export async function getVehicleTypeTransfers(
  params: VehicleTypeTransferQueryParams = {}
): Promise<PagedVehicleTypeTransfersResult> {
  const query: Record<string, string | number> = {};

  if (params.pageNumber) query.pageNumber = params.pageNumber;
  if (params.pageSize) query.pageSize = params.pageSize;
  if (params.currency) query.currency = params.currency;
  if (params.lang) query.lang = params.lang;

  const { data } = await apiClient.get<
    PagedVehicleTypeTransfersResult | { data: PagedVehicleTypeTransfersResult }
  >("/vehicle-type-transfers", { params: query });

  if (data && typeof data === "object" && "items" in data) {
    return data as PagedVehicleTypeTransfersResult;
  }
  if (
    data &&
    typeof data === "object" &&
    "data" in data &&
    data.data &&
    "items" in data.data
  ) {
    return data.data as PagedVehicleTypeTransfersResult;
  }

  return {
    items: [],
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  };
}

export async function getVehicleTypeTransferById(
  id: string,
  currency?: string,
  lang?: string
): Promise<VehicleTypeTransferDetails> {
  const query: Record<string, string> = {};
  if (currency) query.currency = currency;
  if (lang) query.lang = lang;

  const { data } = await apiClient.get<
    VehicleTypeTransferDetails | { data: VehicleTypeTransferDetails }
  >(`/vehicle-type-transfers/${id}`, { params: query });

  if (data && typeof data === "object" && "data" in data && data.data) {
    return data.data as VehicleTypeTransferDetails;
  }
  return data as VehicleTypeTransferDetails;
}

export async function createVehicleTypeTransfer(
  body: CreateVehicleTypeTransferRequest
): Promise<VehicleTypeTransferItem> {
  const { data } = await apiClient.post<
    VehicleTypeTransferItem | { data: VehicleTypeTransferItem }
  >("/vehicle-type-transfers", body);

  if (data && typeof data === "object" && "data" in data && data.data) {
    return data.data as VehicleTypeTransferItem;
  }
  return data as VehicleTypeTransferItem;
}

export async function updateVehicleTypeTransfer(
  id: string,
  body: UpdateVehicleTypeTransferRequest
): Promise<VehicleTypeTransferItem> {
  const { data } = await apiClient.put<
    VehicleTypeTransferItem | { data: VehicleTypeTransferItem }
  >(`/vehicle-type-transfers/${id}`, body);

  if (data && typeof data === "object" && "data" in data && data.data) {
    return data.data as VehicleTypeTransferItem;
  }
  return data as VehicleTypeTransferItem;
}

export async function deleteVehicleTypeTransfer(id: string): Promise<void> {
  await apiClient.delete(`/vehicle-type-transfers/${id}`);
}

export async function getVehicleTypeTransferByPassengerCount(
  passengerCount: number
): Promise<VehicleTypeTransferItem> {
  const { data } = await apiClient.get<
    VehicleTypeTransferItem | { data: VehicleTypeTransferItem }
  >(`/vehicle-type-transfers/by-passenger-count/${passengerCount}`);

  if (data && typeof data === "object" && "data" in data && data.data) {
    return data.data as VehicleTypeTransferItem;
  }
  return data as VehicleTypeTransferItem;
}

