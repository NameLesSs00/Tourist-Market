import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createPrivateBooking,
  getPrivateBookingById,
  getPrivateBookings,
  updatePrivateBookingStatus,
} from "@/clientApi/privateBookingApi";
import { extractErrorMessage } from "@/features/auth/useAuth";
import type {
  CreatePrivateBookingRequest,
  PrivateBookingQueryParams,
  PrivateBookingStatus,
} from "@/models/privateBooking";

export const PRIVATE_BOOKINGS_KEY = ["admin", "private-bookings"] as const;

export function usePrivateBookingsQuery(params: PrivateBookingQueryParams = {}) {
  return useQuery({
    queryKey: [...PRIVATE_BOOKINGS_KEY, "list", params],
    queryFn: () => getPrivateBookings(params),
    placeholderData: keepPreviousData,
  });
}

export function usePrivateBookingDetailQuery(id?: string | null) {
  return useQuery({
    queryKey: [...PRIVATE_BOOKINGS_KEY, "detail", id],
    queryFn: () => getPrivateBookingById(id!),
    enabled: Boolean(id),
  });
}

export function useUpdatePrivateBookingStatusMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: PrivateBookingStatus;
    }) => {
      await updatePrivateBookingStatus(id, status);
    },
    onSuccess: () => {
      toast.success("Private booking status updated successfully.");
      qc.invalidateQueries({ queryKey: [...PRIVATE_BOOKINGS_KEY] });
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });
}

export function useCreatePrivateBookingMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: CreatePrivateBookingRequest) => createPrivateBooking(body),
    onSuccess: () => {
      toast.success("Private excursion booking created successfully.");
      qc.invalidateQueries({ queryKey: [...PRIVATE_BOOKINGS_KEY] });
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });
}
