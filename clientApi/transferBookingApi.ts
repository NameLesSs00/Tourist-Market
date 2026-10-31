import apiClient from "./apiConfig";
import type {
  TransferBookingItem,
  TransferBookingPreviewParams,
  TransferBookingPreviewResult,
  TransferBookingStatus,
  CreateTransferBookingRequest,
  CreateTransferBookingResponse,
} from "@/models/transferBooking";

export async function getTransferBookings(): Promise<TransferBookingItem[]> {
  const { data } = await apiClient.get<TransferBookingItem[] | { data: TransferBookingItem[] }>(
    "/transfer-bookings"
  );
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object" && "data" in data && Array.isArray(data.data)) {
    return data.data;
  }
  return [];
}

export async function getTransferBookingById(id: string): Promise<TransferBookingItem> {
  const { data } = await apiClient.get<TransferBookingItem | { data: TransferBookingItem }>(
    `/transfer-bookings/${id}`
  );
  if (data && typeof data === "object" && "data" in data && data.data) {
    return data.data as TransferBookingItem;
  }
  return data as TransferBookingItem;
}

export async function updateTransferBookingStatus(
  id: string,
  status: TransferBookingStatus
): Promise<void> {
  await apiClient.patch(
    `/transfer-bookings/${id}/status`,
    status,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function previewTransferBooking(
  params: TransferBookingPreviewParams
): Promise<TransferBookingPreviewResult> {
  const { data } = await apiClient.get<TransferBookingPreviewResult>(
    "/transfer-bookings/preview",
    { params }
  );
  return data;
}

export async function createTransferBooking(
  payload: CreateTransferBookingRequest
): Promise<CreateTransferBookingResponse> {
  const { data } = await apiClient.post<CreateTransferBookingResponse>(
    "/transfer-bookings",
    payload
  );
  return data;
}
