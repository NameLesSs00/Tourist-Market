import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExcursionReview } from "@/clientApi/excursionReviewApi";
import type { CreateExcursionReviewRequest } from "@/models/excursionReview";
import { PRIVATE_EXCURSION_DETAILS_KEY } from "./usePrivateExcursionDetails";

/**
 * Submits a new review for a private excursion (POST /excursion-reviews).
 * Invalidate the private excursion details query upon success so new reviews appear.
 */
export function useCreatePrivateExcursionReviewMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateExcursionReviewRequest) => createExcursionReview(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRIVATE_EXCURSION_DETAILS_KEY });
    },
  });
}

