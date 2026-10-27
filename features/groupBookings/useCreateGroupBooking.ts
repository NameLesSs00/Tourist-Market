import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createGroupBooking } from "@/clientApi/groupBookingApi";
import { extractErrorMessage } from "@/features/auth/useAuth";
import type {
  CreateGroupBookingRequest,
  CreateGroupBookingResponse,
} from "@/models/groupBooking";

export function useCreateGroupBookingMutation() {
  return useMutation<CreateGroupBookingResponse, Error, CreateGroupBookingRequest>({
    mutationFn: (body) => createGroupBooking(body),
    onError: (err) => {
      toast.error(extractErrorMessage(err) || "Failed to create group booking.");
    },
  });
}
