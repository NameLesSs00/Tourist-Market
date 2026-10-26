import { apiClient } from "./apiConfig";
import type {
  CreatePrivateBookingRequest,
  CreatePrivateBookingResponse,
  PagedPrivateBookingsResult,
  PrivateBookingItem,
  PrivateBookingQueryParams,
  PrivateBookingStatus,
} from "@/models/privateBooking";

export async function getPrivateBookings(
  params: PrivateBookingQueryParams = {}
): Promise<PagedPrivateBookingsResult> {
  const { data } = await apiClient.get<PagedPrivateBookingsResult>(
    "/bookings/excursions/private",
    { params }
  );
  return data;
}

export async function getPrivateBookingById(id: string): Promise<PrivateBookingItem> {
  const { data } = await apiClient.get<PrivateBookingItem>(
    `/bookings/excursions/private/${id}`
  );
  return data;
}

export async function updatePrivateBookingStatus(
  id: string,
  status: PrivateBookingStatus
): Promise<void> {
  await apiClient.patch(`/bookings/excursions/private/${id}/status`, { status });
}

export async function createPrivateBooking(
  body: CreatePrivateBookingRequest
): Promise<CreatePrivateBookingResponse> {
  const { data } = await apiClient.post<CreatePrivateBookingResponse>(
    "/bookings/excursions/private",
    body
  );
  return data;
}
