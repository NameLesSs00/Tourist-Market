import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  cancelProductBooking,
  getProductBookingById,
  getProductBookings,
  updateProductBookingStatus,
} from "@/clientApi/productBookingApi";
import type {
  BookingStatus,
  ProductBookingQueryParams,
} from "@/models/productBooking";

export const PRODUCT_BOOKINGS_QUERY_KEY = ["admin", "product-bookings"] as const;

export function useProductBookingsQuery(params: ProductBookingQueryParams = {}) {
  return useQuery({
    queryKey: [...PRODUCT_BOOKINGS_QUERY_KEY, params],
    queryFn: () => getProductBookings(params),
  });
}

export function useProductBookingDetailQuery(id?: string, currency?: string) {
  return useQuery({
    queryKey: [...PRODUCT_BOOKINGS_QUERY_KEY, "detail", id, currency],
    queryFn: () => (id ? getProductBookingById(id, currency) : Promise.reject("No id")),
    enabled: Boolean(id),
  });
}

export function useUpdateProductBookingStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: BookingStatus }) =>
      updateProductBookingStatus(id, status),
    onSuccess: () => {
      toast.success("Booking status updated successfully.");
      queryClient.invalidateQueries({ queryKey: PRODUCT_BOOKINGS_QUERY_KEY });
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        error?.message ||
        "Failed to update booking status.";
      toast.error(msg);
    },
  });
}

export function useCancelProductBookingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cancelProductBooking(id),
    onSuccess: (data) => {
      toast.success(data?.message || "Booking has been cancelled.");
      queryClient.invalidateQueries({ queryKey: PRODUCT_BOOKINGS_QUERY_KEY });
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        error?.message ||
        "Failed to cancel booking.";
      toast.error(msg);
    },
  });
}
