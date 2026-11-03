import apiClient from "./apiConfig";
import type { PrivateExcursionDetail } from "@/models/privateExcursion";
import type {
  PrivateAttractionItem,
  PrivateServiceItem,
  PrivateExcursionFullDetail,
} from "@/models/privateExcursionDetails";
import {
  unwrap,
  normalizePrivateExcursionImages,
  fetchExcursionDetails,
  fetchPrivateAttractions,
  fetchPrivateServices,
  fetchExcursionReviews,
  fetchAvailabilityDays,
} from "./privateExcursionFetchers";

export type {
  PrivateAttractionItem,
  PrivateServiceItem,
  PrivateExcursionFullDetail,
};

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function resolvePrivateExcursionId(
  idOrSlug: string,
  lang: string = "en"
): Promise<string> {
  if (!idOrSlug) return "";
  const cleanSlug = decodeURIComponent(idOrSlug).trim();
  if (UUID_REGEX.test(cleanSlug)) {
    return cleanSlug;
  }

  try {
    const { data } = await apiClient.get("/private-excursions", {
      params: { lang, pageSize: 100 },
    });
    const payload = unwrap<{ items?: Array<{ id: string; slug: string }> }>(data);
    const items = payload?.items || (Array.isArray(payload) ? payload : []);
    const match = items.find(
      (item) =>
        item.slug === cleanSlug ||
        item.slug?.toLowerCase() === cleanSlug.toLowerCase() ||
        item.id === cleanSlug
    );
    if (match?.id) return match.id;

    if (lang !== "en") {
      const { data: enData } = await apiClient.get("/private-excursions", {
        params: { lang: "en", pageSize: 100 },
      });
      const enPayload = unwrap<{ items?: Array<{ id: string; slug: string }> }>(enData);
      const enItems = enPayload?.items || (Array.isArray(enPayload) ? enPayload : []);
      const enMatch = enItems.find(
        (item) =>
          item.slug === cleanSlug ||
          item.slug?.toLowerCase() === cleanSlug.toLowerCase() ||
          item.id === cleanSlug
      );
      if (enMatch?.id) return enMatch.id;
    }

    return cleanSlug;
  } catch {
    return cleanSlug;
  }
}

export async function getPrivateExcursionFullDetails(
  excursionIdOrSlug: string,
  lang: string = "en",
  currency: string = "USD"
): Promise<PrivateExcursionFullDetail> {
  const excursionId = await resolvePrivateExcursionId(excursionIdOrSlug, lang);

  const { data: excursionData } = await apiClient.get(
    `/admin/excursions/${excursionId}`,
    { params: { lang, currency } }
  );
  let excursion = unwrap<PrivateExcursionDetail>(excursionData);

  if (!excursion?.id) {
    throw new Error(`Private excursion "${excursionId}" was not found.`);
  }

  const isStubContent =
    !excursion.fullProgram ||
    excursion.fullProgram.trim().length === 0 ||
    excursion.subtitle === "sub" ||
    excursion.shortDescription === "desc";

  if (lang !== "en" && isStubContent) {
    try {
      const { data: enData } = await apiClient.get(
        `/admin/excursions/${excursionId}`,
        { params: { lang: "en", currency } }
      );
      const enExcursion = unwrap<PrivateExcursionDetail>(enData);
      if (enExcursion) {
        excursion = {
          ...excursion,
          fullProgram: excursion.fullProgram?.trim() || enExcursion.fullProgram || "",
          subtitle:
            excursion.subtitle && excursion.subtitle !== "sub"
              ? excursion.subtitle
              : enExcursion.subtitle || excursion.subtitle,
          shortDescription:
            excursion.shortDescription && excursion.shortDescription !== "desc"
              ? excursion.shortDescription
              : enExcursion.shortDescription || excursion.shortDescription,
          title: excursion.title || enExcursion.title,
          category: excursion.category || enExcursion.category,
        };
      }
    } catch {
      // Continue with localized excursion
    }
  }

  const [
    details,
    attractions,
    services,
    { reviews, totalCount },
    availabilityDays,
  ] = await Promise.all([
    fetchExcursionDetails(excursionId, lang),
    fetchPrivateAttractions(excursionId, lang, currency),
    fetchPrivateServices(excursionId, lang, currency),
    fetchExcursionReviews(excursionId),
    fetchAvailabilityDays(excursionId),
  ]);

  const ratingCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let totalRating = 0;
  reviews.forEach((review) => {
    const star = Math.min(5, Math.max(1, Math.round(review.rating)));
    ratingCounts[star] = (ratingCounts[star] || 0) + 1;
    totalRating += review.rating;
  });

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
    excursion: normalizePrivateExcursionImages(excursion),
    details,
    attractions,
    services,
    reviews,
    availabilityDays,
    reviewStats: {
      totalReviews: totalCount,
      averageRating,
      ratingDistribution,
    },
  };
}
