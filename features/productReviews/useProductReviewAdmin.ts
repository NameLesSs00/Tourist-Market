import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  deleteProductReview,
  getProductReviewById,
  getProductReviews,
  markProductReviewHelpful,
  publishProductReview,
  unpublishProductReview,
} from "@/clientApi/productReviewApi";
import type { ProductReviewQueryParams } from "@/models/productReview";

export const PRODUCT_REVIEWS_QUERY_KEY = ["admin", "product-reviews"] as const;

export function useProductReviewsQuery(params: ProductReviewQueryParams = {}) {
  return useQuery({
    queryKey: [...PRODUCT_REVIEWS_QUERY_KEY, params],
    queryFn: () => getProductReviews(params),
  });
}

export function useProductReviewDetailQuery(id?: number | null) {
  return useQuery({
    queryKey: ["admin", "product-review-detail", id],
    queryFn: () => getProductReviewById(id!),
    enabled: typeof id === "number" && id > 0,
  });
}

export function usePublishProductReviewMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => publishProductReview(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PRODUCT_REVIEWS_QUERY_KEY });
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

export function useUnpublishProductReviewMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => unpublishProductReview(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PRODUCT_REVIEWS_QUERY_KEY });
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

export function useDeleteProductReviewMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteProductReview(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PRODUCT_REVIEWS_QUERY_KEY });
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

export function useMarkProductReviewHelpfulMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => markProductReviewHelpful(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PRODUCT_REVIEWS_QUERY_KEY });
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
