import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/errorUtils";
import {
  getServicesBookingById,
  getServicesBookingsByType,
  updateServicesBookingStatus,
} from "@/clientApi/servicesBookingApi";
import type {
  ServicesBookingQueryParams,
  ServicesBookingType,
  UpdateServicesBookingStatusRequest,
} from "@/models/servicesBooking";

export const SERVICES_BOOKINGS_QUERY_KEY = ["admin", "services-bookings"] as const;

export function useServicesBookingsQuery(
  type: ServicesBookingType,
  params: ServicesBookingQueryParams = {}
) {
  return useQuery({
    queryKey: [...SERVICES_BOOKINGS_QUERY_KEY, type, params],
    queryFn: () => getServicesBookingsByType(type, params),
  });
}

export function useServicesBookingDetailQuery(
  type: ServicesBookingType,
  id?: string
) {
  return useQuery({
    queryKey: [...SERVICES_BOOKINGS_QUERY_KEY, "detail", type, id],
    queryFn: () => (id ? getServicesBookingById(type, id) : Promise.reject("No id provided")),
    enabled: Boolean(id),
  });
}

export function useUpdateServicesBookingStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateServicesBookingStatusRequest) =>
      updateServicesBookingStatus(payload),
    onSuccess: (updated) => {
      toast.success(
        `Booking status updated successfully.`
      );
      queryClient.invalidateQueries({ queryKey: SERVICES_BOOKINGS_QUERY_KEY });
    },
    onError: (error: unknown) => {
      toast.error(extractErrorMessage(error, "Failed to update booking status."));
    },
  });
}
