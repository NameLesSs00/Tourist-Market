import {
  GroupExcursion,
  GroupExcursionFilterParams,
  GroupExcursionsResponse,
} from "../types";
import { DUMMY_GROUP_EXCURSIONS } from "./dummyGroupExcursions";

/**
 * Backend-ready Group Excursions service.
 * Simulates API requests with search, category, price, duration filtering,
 * and pagination.
 */
export async function getGroupExcursions(
  params: GroupExcursionFilterParams = {}
): Promise<GroupExcursionsResponse> {
  const {
    search,
    category,
    price,
    duration,
    page = 1,
    pageSize = 12,
  } = params;

  let filtered: GroupExcursion[] = [...DUMMY_GROUP_EXCURSIONS];

  // 1. Filter by search query
  if (search && search.trim() !== "") {
    const query = search.trim().toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
  }

  // 2. Filter by category
  if (category && category !== "All Categories" && category !== "all") {
    filtered = filtered.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  }

  // 3. Filter by price
  if (price && price !== "All Prices" && price !== "all") {
    if (price === "0-50" || price === "under-50") {
      filtered = filtered.filter((item) => item.adultPrice <= 50);
    } else if (price === "50-100") {
      filtered = filtered.filter(
        (item) => item.adultPrice > 50 && item.adultPrice <= 100
      );
    } else if (price === "100+" || price === "over-100") {
      filtered = filtered.filter((item) => item.adultPrice > 100);
    }
  }

  // 4. Filter by duration
  if (duration && duration !== "All Durations" && duration !== "all") {
    if (duration === "under-12") {
      filtered = filtered.filter((item) => item.durationHours < 12);
    } else if (duration === "12-18") {
      filtered = filtered.filter(
        (item) => item.durationHours >= 12 && item.durationHours <= 18
      );
    } else if (duration === "18+") {
      filtered = filtered.filter((item) => item.durationHours > 18);
    }
  }

  const totalCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);

  const startIndex = (safePage - 1) * pageSize;
  const items = filtered.slice(startIndex, startIndex + pageSize);

  return {
    items,
    meta: {
      page: safePage,
      pageSize,
      totalCount,
      totalPages,
      hasNextPage: safePage < totalPages,
      hasPrevPage: safePage > 1,
    },
  };
}

/**
 * Backend-ready service function to fetch excursion details by slug.
 * Simulates server request and falls back to Cairo excursion detail.
 */
export async function getGroupExcursionBySlug(
  slug: string
): Promise<import("../types").GroupExcursionDetail | null> {
  const { DUMMY_GROUP_EXCURSION_DETAIL } = await import("./dummyGroupDetails");
  if (!slug) return DUMMY_GROUP_EXCURSION_DETAIL;

  const match = DUMMY_GROUP_EXCURSIONS.find((e) => e.slug === slug);
  if (match) {
    return {
      ...DUMMY_GROUP_EXCURSION_DETAIL,
      slug,
      title: match.title,
      description: match.description,
      badge: match.badge,
      duration: match.duration,
      durationHours: match.durationHours,
      rating: match.rating,
      adultPrice: match.adultPrice,
      childPrice: match.childPrice,
      infantPrice: match.infantPrice,
    };
  }

  return {
    ...DUMMY_GROUP_EXCURSION_DETAIL,
    slug,
  };
}

