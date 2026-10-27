import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getGroupExcursions } from "@/clientApi/groupExcursionApi";
import { getExcursionCategories } from "@/clientApi/excursionCategoryApi";
import type {
  GroupExcursionListResponse,
  GroupExcursionQueryParams,
} from "@/models/groupExcursion";
import type { ExcursionCategoryItem } from "@/models/excursionCategory";

export const CLIENT_GROUP_EXCURSIONS_KEY = ["client", "group-excursions"] as const;
export const CLIENT_EXCURSION_CATEGORIES_KEY = ["client", "excursion-categories"] as const;

/**
 * Fetches public / client group excursions with caching and localization.
 */
export function useClientGroupExcursionsQuery(
  params: GroupExcursionQueryParams = {},
  locale: string = "en"
) {
  return useQuery<GroupExcursionListResponse>({
    queryKey: [...CLIENT_GROUP_EXCURSIONS_KEY, "list", params, locale],
    queryFn: async () => {
      return await getGroupExcursions({
        lang: locale,
        currency: "USD",
        ...params,
      });
    },
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });
}

/**
 * Infinite query for endless scrolling group excursions.
 */
export function useClientInfiniteGroupExcursionsQuery(
  params: Omit<GroupExcursionQueryParams, "page"> = {},
  locale: string = "en"
) {
  const pageSize = params.pageSize ?? 9;

  return useInfiniteQuery<GroupExcursionListResponse>({
    queryKey: [...CLIENT_GROUP_EXCURSIONS_KEY, "infinite", params, locale],
    queryFn: async ({ pageParam = 1 }) => {
      return await getGroupExcursions({
        lang: locale,
        currency: "USD",
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

/**
 * Fetches available excursion categories for filter dropdowns.
 */
export function useExcursionCategoriesQuery(locale: string = "en") {
  return useQuery<ExcursionCategoryItem[]>({
    queryKey: [...CLIENT_EXCURSION_CATEGORIES_KEY, "list", locale],
    queryFn: async () => {
      const response = await getExcursionCategories({
        lang: locale,
        pageSize: 50,
      });
      const raw = response as any;
      const list = raw?.data?.items || raw?.items || [];
      return list as ExcursionCategoryItem[];
    },
    staleTime: 5 * 60 * 1000,
  });
}

