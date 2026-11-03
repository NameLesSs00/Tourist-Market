import apiClient from "./apiConfig";
import { getExcursionAvailability } from "./excursionAvailabilityApi";
import type { PrivateExcursionDetail } from "@/models/privateExcursion";
import type { ExcursionDetailsDto } from "@/models/excursionDetails";
import type { ExcursionAvailabilityDay } from "@/models/excursionAvailability";
import type {
  ExcursionReviewItem,
  PagedExcursionReviewsData,
} from "@/models/excursionReview";
import type {
  PrivateAttractionItem,
  PrivateServiceItem,
} from "@/models/privateExcursionDetails";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";

const REVIEWS_PAGE_SIZE = 50;

export function unwrap<T>(payload: unknown): T {
  const raw = payload as { data?: T } | T;
  return ((raw as { data?: T })?.data ?? raw) as T;
}

export function normalizePrivateExcursionImages(
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

export async function fetchExcursionDetails(
  excursionId: string,
  lang: string
): Promise<ExcursionDetailsDto | null> {
  try {
    const { data } = await apiClient.get(
      `/excursions-details/excursion/${excursionId}`,
      { params: { lang } }
    );
    const result = unwrap<ExcursionDetailsDto>(data) || null;
    if (result && (result.highlights?.length || result.includes?.length)) {
      return result;
    }
    if (lang !== "en") {
      const { data: enData } = await apiClient.get(
        `/excursions-details/excursion/${excursionId}`,
        { params: { lang: "en" } }
      );
      return unwrap<ExcursionDetailsDto>(enData) || result;
    }
    return result;
  } catch {
    if (lang !== "en") {
      try {
        const { data: enData } = await apiClient.get(
          `/excursions-details/excursion/${excursionId}`,
          { params: { lang: "en" } }
        );
        return unwrap<ExcursionDetailsDto>(enData) || null;
      } catch {
        return null;
      }
    }
    return null;
  }
}

export async function fetchPrivateAttractions(
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

export async function fetchPrivateServices(
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

export async function fetchExcursionReviews(
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

export async function fetchAvailabilityDays(
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

