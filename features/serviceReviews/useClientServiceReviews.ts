"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createServiceReview,
  getServiceReviews,
  markServiceReviewHelpful,
} from "@/clientApi/serviceReviewApi";
import type {
  CreateServiceReviewRequest,
  PagedServiceReviewsResult,
  ServiceReviewItem,
} from "@/models/serviceReview";

export const CLIENT_SERVICE_REVIEWS_KEY = ["client-service-reviews"] as const;

export interface ClientServiceReviewsData {
  items: ServiceReviewItem[];
  totalCount: number;
}

/**
 * Fetches published reviews for a single sub-service (GET /api/services/reviews?subServiceId={id}&isPublished=true).
 * Strictly filters for item.isPublished === true and matching subServiceId as a client-side safeguard.
 */
export function useClientServiceReviewsQuery(
  subServiceId?: string | null,
  pageSize: number = 50
) {
  const normalizedId = subServiceId?.trim();

  return useQuery<ClientServiceReviewsData>({
    queryKey: [...CLIENT_SERVICE_REVIEWS_KEY, normalizedId],
    queryFn: async () => {
      if (!normalizedId) {
        return { items: [], totalCount: 0 };
      }

      const res: PagedServiceReviewsResult = await getServiceReviews({
        subServiceId: normalizedId,
        isPublished: true,
        pageNumber: 1,
        pageSize,
      });

      const rawItems = res?.data?.items || [];
      const publishedItems = rawItems.filter(
        (item) => item.isPublished === true && item.subServiceId === normalizedId
      );

      const totalCount =
        typeof res?.data?.totalCount === "number"
          ? res.data.totalCount
          : publishedItems.length;

      return {
        items: publishedItems,
        totalCount,
      };
    },
    enabled: Boolean(normalizedId),
    staleTime: 30 * 1000,
  });
}

/**
 * Submits a new service review (POST /api/services/reviews).
 */
export function useCreateClientServiceReviewMutation() {
  return useMutation({
    mutationFn: (body: CreateServiceReviewRequest) => createServiceReview(body),
  });
}

/**
 * Marks a service review as helpful (POST /api/services/reviews/{id}/helpful).
 */
export function useMarkClientServiceReviewHelpfulMutation() {
  return useMutation({
    mutationFn: (reviewId: string) => markServiceReviewHelpful(reviewId),
  });
}

