import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/errorUtils";
import {
  deleteServiceReview,
  getServiceReviewById,
  getServiceReviews,
  markServiceReviewHelpful,
  publishServiceReview,
  unpublishServiceReview,
} from "@/clientApi/serviceReviewApi";
import type { ServiceReviewQueryParams } from "@/models/serviceReview";

export const SERVICE_REVIEWS_QUERY_KEY = ["admin", "service-reviews"] as const;

export function useServiceReviewsQuery(params: ServiceReviewQueryParams = {}) {
  return useQuery({
    queryKey: [...SERVICE_REVIEWS_QUERY_KEY, params],
    queryFn: () => getServiceReviews(params),
  });
}

export function useServiceReviewDetailQuery(id?: string | null) {
  return useQuery({
    queryKey: ["admin", "service-review-detail", id],
    queryFn: () => getServiceReviewById(id!),
    enabled: Boolean(id),
  });
}

export function usePublishServiceReviewMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => publishServiceReview(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SERVICE_REVIEWS_QUERY_KEY });
      toast.success("Review published successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to publish review."));
    },
  });
}

export function useUnpublishServiceReviewMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => unpublishServiceReview(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SERVICE_REVIEWS_QUERY_KEY });
      toast.success("Review unpublished successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to unpublish review."));
    },
  });
}

export function useDeleteServiceReviewMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteServiceReview(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SERVICE_REVIEWS_QUERY_KEY });
      toast.success("Review deleted successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to delete review."));
    },
  });
}

export function useMarkServiceReviewHelpfulMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => markServiceReviewHelpful(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SERVICE_REVIEWS_QUERY_KEY });
      toast.success("Review marked as helpful.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to mark as helpful."));
    },
  });
}
