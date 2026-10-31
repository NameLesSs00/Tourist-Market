import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createProductReview,
  getProductReviews,
  markProductReviewHelpful,
} from "@/clientApi/productReviewApi";
import type {
  CreateProductReviewRequest,
  PagedProductReviewsResult,
  ProductReviewItem,
} from "@/models/productReview";

export const CLIENT_PRODUCT_REVIEWS_KEY = ["client-product-reviews"] as const;

/**
 * Fetches published reviews for a single product (GET /api/reviews?productId={id}&isPublished=true).
 * Strictly filters for item.isPublished === true as a client-side safeguard.
 */
export function useClientProductReviewsQuery(productId?: number | null) {
  return useQuery<ProductReviewItem[]>({
    queryKey: [...CLIENT_PRODUCT_REVIEWS_KEY, productId],
    queryFn: async () => {
      if (!productId || productId <= 0) return [];
      const res: PagedProductReviewsResult = await getProductReviews({
        productId,
        isPublished: true,
        pageNumber: 1,
        pageSize: 50,
      });

      const raw = res as unknown as {
        data?: { items?: ProductReviewItem[] };
        items?: ProductReviewItem[];
      };

      const items: ProductReviewItem[] = (
        raw?.data?.items ||
        raw?.items ||
        []
      ).filter((item: ProductReviewItem) => item.isPublished === true);

      return items;
    },
    enabled: Boolean(productId && productId > 0),
    staleTime: 30 * 1000,
  });
}

/**
 * Submits a new product review (POST /api/reviews).
 */
export function useCreateClientProductReviewMutation() {
  return useMutation({
    mutationFn: (body: CreateProductReviewRequest) => createProductReview(body),
  });
}

/**
 * Marks a product review as helpful (POST /api/reviews/{id}/helpful).
 */
export function useMarkClientProductReviewHelpfulMutation() {
  return useMutation({
    mutationFn: (reviewId: number) => markProductReviewHelpful(reviewId),
  });
}

