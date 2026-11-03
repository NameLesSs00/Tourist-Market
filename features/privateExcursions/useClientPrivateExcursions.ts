import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getClientPrivateExcursions } from "@/clientApi/privateExcursionApi";
import { useCurrencyStore } from "@/features/currencies/currencyStore";
import type {
  PrivateExcursionListResponse,
  PrivateExcursionQueryParams,
} from "@/models/privateExcursion";

export const CLIENT_PRIVATE_EXCURSIONS_KEY = ["client", "private-excursions"] as const;

/**
 * Fetches public / client private excursions with caching and localization.
 */
export function useClientPrivateExcursionsQuery(
  params: PrivateExcursionQueryParams = {},
  locale: string = "en",
  currencyParam?: string
) {
  const storeCurrency = useCurrencyStore((state) => state.selectedCurrency.code);
  const currency = currencyParam || storeCurrency || "USD";

  return useQuery<PrivateExcursionListResponse>({
    queryKey: [...CLIENT_PRIVATE_EXCURSIONS_KEY, "list", params, locale, currency],
    queryFn: async () => {
      return await getClientPrivateExcursions({
        lang: locale,
        currency,
        ...params,
      });
    },
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });
}

/**
 * Infinite query for endless scrolling private excursions.
 */
export function useClientInfinitePrivateExcursionsQuery(
  params: Omit<PrivateExcursionQueryParams, "page"> = {},
  locale: string = "en",
  currencyParam?: string
) {
  const storeCurrency = useCurrencyStore((state) => state.selectedCurrency.code);
  const currency = currencyParam || storeCurrency || "USD";
  const pageSize = params.pageSize ?? 9;

  return useInfiniteQuery<PrivateExcursionListResponse>({
    queryKey: [...CLIENT_PRIVATE_EXCURSIONS_KEY, "infinite", params, locale, currency],
    queryFn: async ({ pageParam = 1 }) => {
      return await getClientPrivateExcursions({
        lang: locale,
        currency,
        ...params,
        page: pageParam as number,
        pageSize,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage && lastPage.pageNumber < lastPage.totalPages) {
        return lastPage.pageNumber + 1;
      }
      return undefined;
    },
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });
}
