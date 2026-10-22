import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  deleteServiceReview,
  getServiceReviewById,
  getServiceReviews,
  markServiceReviewHelpful,
  publishServiceReview,
  unpublishServiceReview,
} from "@/api/serviceReviewApi";
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
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to publish review."
          : "Failed to publish review.";
      toast.error(msg);
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
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to unpublish review."
          : "Failed to unpublish review.";
      toast.error(msg);
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
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to delete review."
          : "Failed to delete review.";
      toast.error(msg);
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
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to mark as helpful."
          : "Failed to mark as helpful.";
      toast.error(msg);
    },
  });
}
