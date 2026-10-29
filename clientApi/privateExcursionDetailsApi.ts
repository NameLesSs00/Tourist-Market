import apiClient from "./apiConfig";
import { getExcursionAvailability } from "./excursionAvailabilityApi";
import type { PrivateExcursionDetail } from "@/models/privateExcursion";
import type { ExcursionDetailsDto } from "@/models/excursionDetails";
import type { ExcursionAvailabilityDay } from "@/models/excursionAvailability";
import type {
  ExcursionReviewItem,
  PagedExcursionReviewsData,
} from "@/models/excursionReview";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";

export interface PrivateAttractionItem {
  id: string;
  title: string;
  description: string;
  heroImage: string | null;
  displayOrder: number;
  adultPrice: number;
  childPrice: number;
  infantPrice: number;
  currency: string;
  images: string[];
}

export interface PrivateServiceItem {
  id: string;
  title: string;
  description: string;
  heroImage: string | null;
  displayOrder: number;
  adultPrice: number;
  childPrice: number;
  infantPrice: number;
  currency: string;
  images: string[];
}

export interface PrivateExcursionFullDetail {
  excursion: PrivateExcursionDetail;
  details: ExcursionDetailsDto | null;
  attractions: PrivateAttractionItem[];
  services: PrivateServiceItem[];
  reviews: ExcursionReviewItem[];
  availabilityDays: ExcursionAvailabilityDay[];
  reviewStats: {
    totalReviews: number;
    averageRating: number;
    ratingDistribution: { star: number; count: number; percentage: number }[];
  };
}

const REVIEWS_PAGE_SIZE = 50;

function unwrap<T>(payload: unknown): T {
  const raw = payload as { data?: T } | T;
  return ((raw as { data?: T })?.data ?? raw) as T;
}

function normalizePrivateExcursionImages(
  excursion: PrivateExcursionDetail
): PrivateExcursionDetail {
  const imageList = (excursion.imageList || []).map((img) => ({
    ...img,
    imageUrl: getBackendImageUrl(img.imageUrl) || img.imageUrl,
  }));

  const rawPrimary =
    excursion.primaryImageUrl || excursion.heroImageUrl || (excursion as any).heroImage;
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
    heroImageUrl:
      getBackendImageUrl(excursion.heroImageUrl || (excursion as any).heroImage) || null,
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
    return null;
  }
}

async function fetchPrivateAttractions(
  excursionId: string,
  lang: string,
  currency: string
): Promise<PrivateAttractionItem[]> {
  try {
    const { data } = await apiClient.get(
      `/private-excursions/${excursionId}/attractions`,
      { params: { lang, currency } }
    );
    const rawList = unwrap<any[]>(data);
    if (!Array.isArray(rawList)) return [];

    return rawList.map((item) => {
      const hero = getBackendImageUrl(item.heroImage);
      const rawImages: string[] = Array.isArray(item.images)
        ? item.images
        : Array.isArray(item.imageUrls)
        ? item.imageUrls
        : [];
      const normalizedImages = rawImages
        .map((img: string) => getBackendImageUrl(img))
        .filter(Boolean) as string[];

      if (hero && !normalizedImages.includes(hero)) {
        normalizedImages.unshift(hero);
      }

      return {
        id: item.id,
        title: item.title || "",
        description: item.description || "",
        heroImage: hero,
        displayOrder: item.displayOrder ?? 0,
        adultPrice: item.adultPrice ?? item.adultPriceUsd ?? 0,
        childPrice: item.childPrice ?? item.childPriceUsd ?? 0,
        infantPrice: item.infantPrice ?? item.infantPriceUsd ?? 0,
        currency: item.currency || item.prices?.[0]?.currencyCode || "USD",
        images: normalizedImages,
      };
    });
  } catch {
    return [];
  }
}

async function fetchPrivateServices(
  excursionId: string,
  lang: string,
  currency: string
): Promise<PrivateServiceItem[]> {
  try {
    const { data } = await apiClient.get(
      `/private-excursions/${excursionId}/services`,
      { params: { lang, currency } }
    );
    const rawList = unwrap<any[]>(data);
    if (!Array.isArray(rawList)) return [];

    return rawList.map((item) => {
      const hero = getBackendImageUrl(item.heroImage);
      const rawImages: string[] = Array.isArray(item.images)
        ? item.images
        : Array.isArray(item.imageUrls)
        ? item.imageUrls
        : [];
      const normalizedImages = rawImages
        .map((img: string) => getBackendImageUrl(img))
        .filter(Boolean) as string[];

      if (hero && !normalizedImages.includes(hero)) {
        normalizedImages.unshift(hero);
      }

      return {
        id: item.id,
        title: item.title || "",
        description: item.description || "",
        heroImage: hero,
        displayOrder: item.displayOrder ?? 0,
        adultPrice: item.adultPrice ?? item.adultPriceUsd ?? 0,
        childPrice: item.childPrice ?? item.childPriceUsd ?? 0,
        infantPrice: item.infantPrice ?? item.infantPriceUsd ?? 0,
        currency: item.currency || item.prices?.[0]?.currencyCode || "USD",
        images: normalizedImages,
      };
    });
  } catch {
    return [];
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
    return [];
  }
}

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function resolvePrivateExcursionId(
  idOrSlug: string,
  lang: string = "en"
): Promise<string> {
  if (!idOrSlug) return "";
  if (UUID_REGEX.test(idOrSlug)) {
    return idOrSlug;
  }

  try {
    const { data } = await apiClient.get("/private-excursions", {
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
 * Fetches complete private excursion data by ID or slug:
 * excursion + details + attractions + services + reviews + availability.
 */
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
  const excursion = unwrap<PrivateExcursionDetail>(excursionData);

  if (!excursion?.id) {
    throw new Error(`Private excursion "${excursionId}" was not found.`);
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
