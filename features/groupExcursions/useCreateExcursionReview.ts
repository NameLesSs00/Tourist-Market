import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExcursionReview } from "@/clientApi/excursionReviewApi";
import type { CreateExcursionReviewRequest } from "@/models/excursionReview";
import { GROUP_EXCURSION_DETAILS_KEY } from "./useGroupExcursionDetails";

/**
 * Submits a new excursion review (POST /excursion-reviews). Successful submits
 * invalidate the excursion detail query so freshly published reviews can appear.
 */
export function useCreateExcursionReviewMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateExcursionReviewRequest) => createExcursionReview(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GROUP_EXCURSION_DETAILS_KEY });
    },
  });
}
