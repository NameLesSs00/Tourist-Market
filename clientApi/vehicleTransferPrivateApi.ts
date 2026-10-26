import apiClient from "./apiConfig";
import type { ApiResponse } from "@/models/auth";
import type {
  PagedVehicleTransferPrivateResult,
  VehicleTransferMatchParams,
  VehicleTransferPrivateCreateRequest,
  VehicleTransferPrivateItem,
  VehicleTransferPrivateQueryParams,
  VehicleTransferPrivateUpdateRequest,
} from "@/models/vehicleTransferPrivate";

export async function getVehicleTransferPrivates(
  params: VehicleTransferPrivateQueryParams = {}
): Promise<PagedVehicleTransferPrivateResult> {
  const query: Record<string, string | number | boolean> = {};

  if (params.privateExcursionId) query.PrivateExcursionId = params.privateExcursionId;
  if (params.vehiclePrivateId) query.VehiclePrivateId = params.vehiclePrivateId;
  if (typeof params.passengerCount === "number") query.PassengerCount = params.passengerCount;
  if (typeof params.isActive === "boolean") query.IsActive = params.isActive;
  query.PageNumber = params.pageNumber ?? 1;
  query.PageSize = params.pageSize ?? 50;
  if (params.lang) query.lang = params.lang;
  if (params.currency) query.currency = params.currency;

  const { data } = await apiClient.get<PagedVehicleTransferPrivateResult>(
    "/vehicle-transfer-private",
    { params: query }
  );

  return data;
}

export async function getVehicleTransferPrivateById(
  id: string,
  lang?: string,
  currency?: string
): Promise<ApiResponse<VehicleTransferPrivateItem>> {
  const { data } = await apiClient.get<ApiResponse<VehicleTransferPrivateItem>>(
    `/vehicle-transfer-private/${id}`,
    { params: { lang, currency } }
  );
  return data;
}

export async function createVehicleTransferPrivate(
  body: VehicleTransferPrivateCreateRequest
): Promise<ApiResponse<VehicleTransferPrivateItem>> {
  const { data } = await apiClient.post<ApiResponse<VehicleTransferPrivateItem>>(
    "/vehicle-transfer-private",
    body
  );
  return data;
}

export async function updateVehicleTransferPrivate(
  id: string,
  body: VehicleTransferPrivateUpdateRequest
): Promise<ApiResponse<VehicleTransferPrivateItem>> {
  const { data } = await apiClient.put<ApiResponse<VehicleTransferPrivateItem>>(
    `/vehicle-transfer-private/${id}`,
    body
  );
  return data;
}

export async function deleteVehicleTransferPrivate(
  id: string
): Promise<ApiResponse<null>> {
  const { data } = await apiClient.delete<ApiResponse<null>>(
    `/vehicle-transfer-private/${id}`
  );
  return data;
}

export async function matchVehicleTransferPrivate(
  params: VehicleTransferMatchParams
): Promise<ApiResponse<VehicleTransferPrivateItem>> {
  const { data } = await apiClient.get<ApiResponse<VehicleTransferPrivateItem>>(
    "/vehicle-transfer-private/match",
    { params }
  );
  return data;
}
