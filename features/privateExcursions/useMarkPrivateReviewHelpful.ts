import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markExcursionReviewHelpful } from "@/clientApi/excursionReviewApi";
import { PRIVATE_EXCURSION_DETAILS_KEY } from "./usePrivateExcursionDetails";

/**
 * Marks a private excursion review as helpful (POST /excursion-reviews/{id}/helpful).
 */
export function useMarkPrivateReviewHelpfulMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: string) => markExcursionReviewHelpful(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRIVATE_EXCURSION_DETAILS_KEY });
    },
  });
}

