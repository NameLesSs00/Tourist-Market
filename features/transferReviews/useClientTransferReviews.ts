"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createTransferReview,
  getTransferReviews,
} from "@/clientApi/transferReviewApi";
import { extractErrorMessage } from "@/shared/utils/errorUtils";
import type {
  CreateTransferReviewRequest,
  TransferReviewQueryParams,
} from "@/models/transferReview";

export const CLIENT_TRANSFER_REVIEWS_KEY = ["transfer-reviews", "public"] as const;

export function useClientTransferReviewsQuery(
  params: TransferReviewQueryParams = {}
) {
  const pageNumber = params.pageNumber ?? 1;
  const pageSize = params.pageSize ?? 10;
  const language = params.language ?? "en";
  const currency = params.currency ?? "USD";

  return useQuery({
    queryKey: [...CLIENT_TRANSFER_REVIEWS_KEY, pageNumber, pageSize, language, currency],
    queryFn: () =>
      getTransferReviews({
        pageNumber,
        pageSize,
        language,
        currency,
        isApproved: true,
      }),
    staleTime: 3 * 60 * 1000,
  });
}

export function useCreateTransferReviewMutation(options?: {
  onSuccess?: () => void;
  onError?: (err: unknown) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTransferReviewRequest) =>
      createTransferReview(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: CLIENT_TRANSFER_REVIEWS_KEY });
      const msg =
        data.message ||
        "Transfer review created successfully. It will be visible after approval.";
      toast.success(msg);
      options?.onSuccess?.();
    },
    onError: (err: unknown) => {
      const msg = extractErrorMessage(
        err,
        "Failed to submit transfer review. Please check your inputs and try again."
      );
      toast.error(msg);
      options?.onError?.(err);
    },
  });
}

