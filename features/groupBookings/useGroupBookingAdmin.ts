import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getGroupBookingById,
  getGroupBookings,
  updateGroupBookingStatus,
} from "@/api/groupBookingApi";
import { extractErrorMessage } from "@/features/auth/useAuth";
import type {
  GroupBookingQueryParams,
  GroupBookingStatus,
} from "@/models/groupBooking";

export const GROUP_BOOKINGS_KEY = ["admin", "group-bookings"] as const;

export function useGroupBookingsQuery(params: GroupBookingQueryParams = {}) {
  return useQuery({
    queryKey: [...GROUP_BOOKINGS_KEY, "list", params],
    queryFn: () => getGroupBookings(params),
    placeholderData: keepPreviousData,
  });
}

export function useGroupBookingDetailQuery(id?: string | null) {
  return useQuery({
    queryKey: [...GROUP_BOOKINGS_KEY, "detail", id],
    queryFn: () => getGroupBookingById(id!),
    enabled: Boolean(id),
  });
}

export function useUpdateGroupBookingStatusMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: GroupBookingStatus;
    }) => {
      await updateGroupBookingStatus(id, { status });
    },
    onSuccess: () => {
      toast.success("Group booking status updated successfully.");
      qc.invalidateQueries({ queryKey: [...GROUP_BOOKINGS_KEY] });
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });
}
