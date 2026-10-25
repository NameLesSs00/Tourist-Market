import { apiClient } from "./apiConfig";
import type {
  GroupBookingItem,
  GroupBookingQueryParams,
  GroupBookingStatusUpdateRequest,
  PagedGroupBookingsResult,
} from "@/models/groupBooking";

export async function getGroupBookings(
  params: GroupBookingQueryParams = {}
): Promise<PagedGroupBookingsResult> {
  const { data } = await apiClient.get<PagedGroupBookingsResult>(
    "/bookings/excursions/group",
    { params }
  );
  return data;
}

export async function getGroupBookingById(id: string): Promise<GroupBookingItem> {
  const { data } = await apiClient.get<GroupBookingItem>(
    `/bookings/excursions/group/${id}`
  );
  return data;
}

export async function updateGroupBookingStatus(
  id: string,
  body: GroupBookingStatusUpdateRequest
): Promise<void> {
  await apiClient.patch(`/bookings/excursions/group/${id}/status`, body);
}
