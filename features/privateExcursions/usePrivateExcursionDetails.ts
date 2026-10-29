import { useQuery } from "@tanstack/react-query";
import { getPrivateExcursionFullDetails } from "@/clientApi/privateExcursionDetailsApi";
import { getClientPrivateExcursions } from "@/clientApi/privateExcursionApi";
import { mapBackendPrivateExcursionToCard } from "@/components/UserComp/PrivateExcursions/utils/privateExcursionAdapter";
import type { PrivateExcursion } from "@/components/UserComp/PrivateExcursions/types";

export const PRIVATE_EXCURSION_DETAILS_KEY = ["client", "private-excursion-details"] as const;

/**
 * Fetches the aggregated details (excursion + details + attractions + services + reviews)
 * for a single private excursion.
 */
export function usePrivateExcursionDetailsQuery(
  idOrSlug: string,
  locale: string = "en",
  currency: string = "USD"
) {
  return useQuery({
    queryKey: [...PRIVATE_EXCURSION_DETAILS_KEY, idOrSlug, locale, currency],
    queryFn: () => getPrivateExcursionFullDetails(idOrSlug, locale, currency),
    enabled: Boolean(idOrSlug),
    staleTime: 60 * 1000,
  });
}

/**
 * Fetches related private excursions for the detail page,
 * excluding the currently viewed excursion. Max 3 items.
 */
export function useRelatedPrivateExcursionsQuery(
  currentId: string,
  locale: string = "en",
  currency: string = "USD"
) {
  return useQuery<PrivateExcursion[]>({
    queryKey: [...PRIVATE_EXCURSION_DETAILS_KEY, "related", currentId, locale, currency],
    queryFn: async () => {
      const response = await getClientPrivateExcursions({
        lang: locale,
        currency,
        page: 1,
        pageSize: 5,
      });
      return (response?.items || [])
        .filter((item) => item.id !== currentId && item.slug !== currentId)
        .slice(0, 3)
        .map(mapBackendPrivateExcursionToCard);
    },
    enabled: Boolean(currentId),
    staleTime: 60 * 1000,
  });
}

