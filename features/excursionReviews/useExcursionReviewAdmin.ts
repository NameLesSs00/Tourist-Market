import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/errorUtils";
import {
  deleteExcursionReview,
  getExcursionReviewById,
  getExcursionReviews,
  markExcursionReviewHelpful,
  publishExcursionReview,
  unpublishExcursionReview,
} from "@/clientApi/excursionReviewApi";
import type { ExcursionReviewQueryParams } from "@/models/excursionReview";

export const EXCURSION_REVIEWS_QUERY_KEY = ["admin", "excursion-reviews"] as const;

export function useExcursionReviewsQuery(params: ExcursionReviewQueryParams = {}) {
  return useQuery({
    queryKey: [...EXCURSION_REVIEWS_QUERY_KEY, params],
    queryFn: () => getExcursionReviews(params),
  });
}

export function useExcursionReviewDetailQuery(id?: string | null) {
  return useQuery({
    queryKey: ["admin", "excursion-review-detail", id],
    queryFn: () => getExcursionReviewById(id!),
    enabled: Boolean(id),
  });
}

export function usePublishExcursionReviewMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => publishExcursionReview(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: EXCURSION_REVIEWS_QUERY_KEY });
      toast.success("Review published successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to publish review."));
    },
  });
}

export function useUnpublishExcursionReviewMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => unpublishExcursionReview(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: EXCURSION_REVIEWS_QUERY_KEY });
      toast.success("Review unpublished successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to unpublish review."));
    },
  });
}

export function useDeleteExcursionReviewMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteExcursionReview(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: EXCURSION_REVIEWS_QUERY_KEY });
      toast.success("Review deleted successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to delete review."));
    },
  });
}

export function useMarkExcursionReviewHelpfulMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => markExcursionReviewHelpful(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: EXCURSION_REVIEWS_QUERY_KEY });
      toast.success("Review marked as helpful.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to mark as helpful."));
    },
  });
}
