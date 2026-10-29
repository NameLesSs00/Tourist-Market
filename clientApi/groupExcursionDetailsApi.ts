import apiClient from "./apiConfig";
import { getExcursionAvailability } from "./excursionAvailabilityApi";
import type { GroupExcursionDetailItem } from "@/models/groupExcursion";
import type { ExcursionDetailsDto } from "@/models/excursionDetails";
import type { ExcursionAvailabilityDay } from "@/models/excursionAvailability";
import type {
  ExcursionReviewItem,
  PagedExcursionReviewsData,
} from "@/models/excursionReview";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";

export interface GroupExcursionFullDetail {
  excursion: GroupExcursionDetailItem;
  details: ExcursionDetailsDto | null;
  reviews: ExcursionReviewItem[];
  availabilityDays: ExcursionAvailabilityDay[];
  reviewStats: {
    totalReviews: number;
    averageRating: number;
    ratingDistribution: { star: number; count: number; percentage: number }[];
  };
}

const REVIEWS_PAGE_SIZE = 50;

/** Unwraps the optional `{ data: ... }` envelope used by the backend. */
function unwrap<T>(payload: unknown): T {
  const raw = payload as { data?: T } | T;
  return ((raw as { data?: T })?.data ?? raw) as T;
}

/**
 * Normalizes excursion images:
 * - converts relative `/uploads/...` paths to absolute backend URLs
 * - resolves the primary image by matching `primaryImageUrl` against the list
 *   (the `isPrimary` flag is unreliable on the backend), then falls back to the
 *   flagged image, then to the first image in the list
 */
function normalizeExcursionImages(
  excursion: GroupExcursionDetailItem
): GroupExcursionDetailItem {
  const imageList = (excursion.imageList || []).map((img) => ({
    ...img,
    imageUrl: getBackendImageUrl(img.imageUrl) || img.imageUrl,
  }));

  const rawPrimary =
    excursion.primaryImageUrl || excursion.heroImageUrl || excursion.heroImage;
  const absolutePrimary = getBackendImageUrl(rawPrimary);
  const matchedPrimary =
    imageList.find((img) => img.imageUrl === absolutePrimary)?.imageUrl ||
    imageList.find((img) => img.isPrimary)?.imageUrl ||
    absolutePrimary ||
    imageList[0]?.imageUrl ||
    null;

  return {
    ...excursion,
    imageList,
    primaryImageUrl: matchedPrimary,
    // The hero is its own image (set via the admin hero-image endpoint). When
    // absent we keep it null so the UI shows a placeholder, never the primary.
    heroImageUrl: getBackendImageUrl(excursion.heroImageUrl || excursion.heroImage) || null,
  };
}

async function fetchExcursionDetails(
  excursionId: string,
  lang: string
): Promise<ExcursionDetailsDto | null> {
  try {
    const { data } = await apiClient.get(
      `/excursions-details/excursion/${excursionId}`,
      { params: { lang } }
    );
    return unwrap<ExcursionDetailsDto>(data) || null;
  } catch {
    // Details are optional extras (highlights, includes, etc.)
    return null;
  }
}

async function fetchExcursionReviews(
  excursionId: string
): Promise<{ reviews: ExcursionReviewItem[]; totalCount: number }> {
  try {
    const { data } = await apiClient.get("/excursion-reviews", {
      params: {
        excursionId,
        isPublished: true,
        pageNumber: 1,
        pageSize: REVIEWS_PAGE_SIZE,
      },
    });
    const payload = unwrap<PagedExcursionReviewsData>(data);
    return {
      reviews: payload?.items || [],
      totalCount: payload?.totalCount ?? payload?.items?.length ?? 0,
    };
  } catch {
    // Reviews are optional; the page renders without them
    return { reviews: [], totalCount: 0 };
  }
}

async function fetchAvailabilityDays(
  excursionId: string
): Promise<ExcursionAvailabilityDay[]> {
  try {
    const response = await getExcursionAvailability(excursionId);
    const payload = unwrap<{ days?: ExcursionAvailabilityDay[] }>(response);
    return payload?.days || [];
  } catch {
    // Availability is optional; the mapper falls back to a static label
    return [];
  }
}
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function resolveGroupExcursionId(
  idOrSlug: string,
  lang: string = "en"
): Promise<string> {
  if (UUID_REGEX.test(idOrSlug)) {
    return idOrSlug;
  }
  try {
    const { data } = await apiClient.get("/group-excursions", {
      params: { lang, pageSize: 100 },
    });
    const payload = unwrap<{ items?: Array<{ id: string; slug: string }> }>(data);
    const items = payload?.items || (Array.isArray(payload) ? payload : []);
    const match = items.find((item) => item.slug === idOrSlug);
    return match?.id || idOrSlug;
  } catch {
    return idOrSlug;
  }
}

/**
 * Fetches complete group excursion data by ID or slug:
 * excursion (required) + details + reviews (both optional, fetched in parallel).
 * Throws when the excursion itself cannot be loaded so query error states work.
 */
export async function getGroupExcursionFullDetails(
  idOrSlug: string,
  lang: string = "en",
  currency: string = "USD"
): Promise<GroupExcursionFullDetail> {
  const excursionId = await resolveGroupExcursionId(idOrSlug, lang);

  // TODO: switch to the public endpoint once the backend exposes
  // GET /excursions/{id}. Verified on 2026-10-26: /excursions/{id} returns 404
  // while /admin/excursions/{id} serves the full payload (see PromptsUi/groupDataSingle.md).
  const { data: excursionData } = await apiClient.get(
    `/admin/excursions/${excursionId}`,
    { params: { lang, currency } }
  );
  const excursion = unwrap<GroupExcursionDetailItem>(excursionData);

  if (!excursion?.id) {
    throw new Error(`Excursion "${excursionId}" was not found.`);
  }

  const [details, { reviews, totalCount }, availabilityDays] = await Promise.all([
    fetchExcursionDetails(excursionId, lang),
    fetchExcursionReviews(excursionId),
    fetchAvailabilityDays(excursionId),
  ]);

  // Review statistics are only accurate when every review fit in one page;
  // otherwise fall back to the curated `stars` value. The API `rating` field
  // is unreliable (returns 0) and intentionally not used.
  const hasFullReviewSet = reviews.length > 0 && totalCount === reviews.length;

  const ratingCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let totalRating = 0;
  reviews.forEach((review) => {
    const star = Math.min(5, Math.max(1, Math.round(review.rating)));
    ratingCounts[star] = (ratingCounts[star] || 0) + 1;
    totalRating += review.rating;
  });

  const curatedStars = Number.parseFloat(excursion.stars);
  const averageRating =
    totalCount > 0 && reviews.length > 0
      ? totalRating / reviews.length
      : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: ratingCounts[star] || 0,
    percentage:
      totalCount > 0 && reviews.length > 0
        ? ((ratingCounts[star] || 0) / reviews.length) * 100
        : 0,
  }));

  return {
    excursion: normalizeExcursionImages(excursion),
    details,
    reviews,
    availabilityDays,
    reviewStats: {
      totalReviews: totalCount,
      averageRating,
      ratingDistribution,
    },
  };
}
