import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { excursionPricePreviewApi } from "@/api/excursionPricePreviewApi";
import { extractErrorMessage } from "@/features/auth/useAuth";
import type {
  PreviewGroupPriceRequest,
  PreviewGroupPriceResponse,
  PreviewPrivatePriceRequest,
  PreviewPrivatePriceResponse,
} from "@/models/excursionPricePreview";

export interface PreviewPrivatePriceArgs {
  excursionId: string;
  data: PreviewPrivatePriceRequest;
}

export interface PreviewGroupPriceArgs {
  excursionId: string;
  data: PreviewGroupPriceRequest;
}

export function usePrivatePricePreviewMutation() {
  return useMutation<PreviewPrivatePriceResponse, Error, PreviewPrivatePriceArgs>({
    mutationFn: ({ excursionId, data }) =>
      excursionPricePreviewApi.previewPrivatePrice(excursionId, data),
    onError: (err) => {
      toast.error(extractErrorMessage(err) || "Failed to calculate private excursion price preview.");
    },
  });
}

export function useGroupPricePreviewMutation() {
  return useMutation<PreviewGroupPriceResponse, Error, PreviewGroupPriceArgs>({
    mutationFn: ({ excursionId, data }) =>
      excursionPricePreviewApi.previewGroupPrice(excursionId, data),
    onError: (err) => {
      toast.error(extractErrorMessage(err) || "Failed to calculate group excursion price preview.");
    },
  });
}
