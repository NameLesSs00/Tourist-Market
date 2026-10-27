import { useQuery } from "@tanstack/react-query";
import { getGroupExcursionFullDetails } from "@/clientApi/groupExcursionDetailsApi";
import { getGroupExcursions } from "@/clientApi/groupExcursionApi";
import { mapBackendGroupExcursionToCard } from "@/components/UserComp/GroupExcursions/utils/groupExcursionAdapter";
import type { GroupExcursion } from "@/components/UserComp/GroupExcursions/types";

export const GROUP_EXCURSION_DETAILS_KEY = ["client", "group-excursion-details"] as const;

/**
 * Fetches the aggregated details (excursion + details + reviews) for a single
 * group excursion. Errors propagate so the page can render a proper error state.
 */
export function useGroupExcursionDetailsQuery(
  id: string,
  locale: string = "en",
  currency: string = "USD"
) {
  return useQuery({
    queryKey: [...GROUP_EXCURSION_DETAILS_KEY, id, locale, currency],
    queryFn: () => getGroupExcursionFullDetails(id, locale, currency),
    enabled: Boolean(id),
    staleTime: 60 * 1000,
  });
}

/**
 * Fetches related group excursions for the detail page,
 * excluding the currently viewed excursion. Max 6 items.
 */
export function useRelatedGroupExcursionsQuery(
  currentId: string,
  locale: string = "en",
  currency: string = "USD"
) {
  return useQuery<GroupExcursion[]>({
    queryKey: [...GROUP_EXCURSION_DETAILS_KEY, "related", currentId, locale, currency],
    queryFn: async () => {
      const response = await getGroupExcursions({
        lang: locale,
        currency,
        page: 1,
        pageSize: 7,
      });
      return (response?.items || [])
        .filter((item) => item.id !== currentId)
        .slice(0, 6)
        .map(mapBackendGroupExcursionToCard);
    },
    enabled: Boolean(currentId),
    staleTime: 60 * 1000,
  });
}
