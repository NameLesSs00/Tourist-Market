"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  approveTransferReview,
  deleteTransferReview,
  getAdminTransferReviewById,
  getAdminTransferReviews,
} from "@/clientApi/transferReviewApi";
import { extractErrorMessage } from "@/shared/utils/errorUtils";
import type {
  ApproveTransferReviewRequest,
  TransferReviewQueryParams,
} from "@/models/transferReview";

export const ADMIN_TRANSFER_REVIEWS_KEY = ["transfer-reviews", "admin"] as const;

export function useAdminTransferReviewsQuery(
  params: TransferReviewQueryParams = {}
) {
  const pageNumber = params.pageNumber ?? 1;
  const pageSize = params.pageSize ?? 10;
  const isApproved = params.isApproved;
  const language = params.language ?? "en";
  const currency = params.currency ?? "USD";

  return useQuery({
    queryKey: [
      ...ADMIN_TRANSFER_REVIEWS_KEY,
      pageNumber,
      pageSize,
      isApproved,
      language,
      currency,
    ],
    queryFn: () =>
      getAdminTransferReviews({
        pageNumber,
        pageSize,
        isApproved,
        language,
        currency,
      }),
    staleTime: 60 * 1000,
  });
}

export function useAdminTransferReviewDetailQuery(id?: string | null) {
  return useQuery({
    queryKey: [...ADMIN_TRANSFER_REVIEWS_KEY, "detail", id],
    queryFn: () => getAdminTransferReviewById(id!),
    enabled: Boolean(id),
  });
}

export function useApproveTransferReviewMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: ApproveTransferReviewRequest;
    }) => approveTransferReview(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_TRANSFER_REVIEWS_KEY });
      toast.success("Transfer review approval status updated.");
    },
    onError: (err: unknown) => {
      toast.error(
        extractErrorMessage(err, "Failed to update review approval status.")
      );
    },
  });
}

export function useDeleteTransferReviewMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTransferReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_TRANSFER_REVIEWS_KEY });
      toast.success("Transfer review deleted successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to delete transfer review."));
    },
  });
}

