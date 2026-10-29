import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createPrivateBooking } from "@/clientApi/privateBookingApi";
import { extractErrorMessage } from "@/features/auth/useAuth";
import type {
  CreatePrivateBookingRequest,
  CreatePrivateBookingResponse,
} from "@/models/privateBooking";

export function useCreatePrivateBookingMutation() {
  return useMutation<CreatePrivateBookingResponse, Error, CreatePrivateBookingRequest>({
    mutationFn: (body) => createPrivateBooking(body),
    onError: (err) => {
      toast.error(extractErrorMessage(err) || "Failed to create private booking.");
    },
  });
}

