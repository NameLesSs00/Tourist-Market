import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getTransferBookingById,
  getTransferBookings,
  updateTransferBookingStatus,
} from "@/clientApi/transferBookingApi";
import type { TransferBookingStatus } from "@/models/transferBooking";

export const transferBookingKeys = {
  all: ["admin", "transfer-bookings"] as const,
  lists: () => [...transferBookingKeys.all, "list"] as const,
  details: () => [...transferBookingKeys.all, "detail"] as const,
  detail: (id: string) => [...transferBookingKeys.details(), id] as const,
};

function extractErrorMessage(err: unknown, fallback: string): string {
  if (err && typeof err === "object" && "response" in err) {
    const res = (err as { response?: { data?: { message?: string; detail?: string; title?: string } } }).response;
    return res?.data?.detail || res?.data?.message || res?.data?.title || fallback;
  }
  return fallback;
}

export function useTransferBookingsQuery() {
  return useQuery({
    queryKey: transferBookingKeys.lists(),
    queryFn: getTransferBookings,
  });
}

export function useTransferBookingDetailQuery(id?: string | null) {
  return useQuery({
    queryKey: transferBookingKeys.detail(id || ""),
    queryFn: () => getTransferBookingById(id!),
    enabled: Boolean(id),
  });
}

export function useUpdateTransferBookingStatusMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: TransferBookingStatus }) =>
      updateTransferBookingStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: transferBookingKeys.all });
      toast.success("Transfer booking status updated successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to update booking status."));
    },
  });
}
