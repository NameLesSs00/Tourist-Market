import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/errorUtils";
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
      toast.error(extractErrorMessage(err, "Failed to publish review."));
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
      toast.error(extractErrorMessage(err, "Failed to unpublish review."));
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
      toast.error(extractErrorMessage(err, "Failed to delete review."));
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
      toast.error(extractErrorMessage(err, "Failed to mark as helpful."));
    },
  });
}
