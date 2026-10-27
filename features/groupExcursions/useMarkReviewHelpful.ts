import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markExcursionReviewHelpful } from "@/clientApi/excursionReviewApi";
import { GROUP_EXCURSION_DETAILS_KEY } from "./useGroupExcursionDetails";

/**
 * Marks an excursion review as helpful on the backend. The response body is the
 * new authoritative helpful count, which the caller applies optimistically.
 * Successful marks also invalidate the detail query so the count stays fresh.
 */
export function useMarkReviewHelpfulMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: string) => markExcursionReviewHelpful(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GROUP_EXCURSION_DETAILS_KEY });
    },
  });
}
