import {
  GroupExcursionFilterParams,
  GroupExcursionsResponse,
} from "../types";
import { getGroupExcursions as fetchBackendGroupExcursions } from "@/clientApi/groupExcursionApi";
import { mapBackendGroupExcursionToCard } from "../utils/groupExcursionAdapter";

/**
 * Service function fetching live group excursions from GET /api/admin/excursions/group
 * and adapting them to the client GroupExcursionsResponse interface.
 */
export async function getGroupExcursions(
  params: GroupExcursionFilterParams = {},
  locale: string = "en"
): Promise<GroupExcursionsResponse> {
  const {
    search,
    category,
    page = 1,
    pageSize = 12,
  } = params;

  const isAllCategories =
    !category || category === "All Categories" || category === "all";

  const response = await fetchBackendGroupExcursions({
    lang: locale,
    currency: "USD",
    page,
    pageSize,
    categoryId: isAllCategories ? undefined : category,
    search: search?.trim() || undefined,
  });

  const rawItems = response.items || [];
  const items = rawItems.map(mapBackendGroupExcursionToCard);

  return {
    items,
    meta: {
      page: response.pageNumber || page,
      pageSize: response.pageSize || pageSize,
      totalCount: response.totalCount || items.length,
      totalPages: response.totalPages || 1,
      hasNextPage: response.hasNextPage || false,
      hasPrevPage: response.hasPreviousPage || false,
    },
  };
}
