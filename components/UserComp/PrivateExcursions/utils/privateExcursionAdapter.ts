import type { PrivateExcursionListItem } from "@/models/privateExcursion";
import type { PrivateExcursion } from "../types";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";

/** Local placeholder used when the backend provides no usable image. */
export const PRIVATE_EXCURSION_FALLBACK_IMAGE = "/GroupExcursions/HeroLogo.webp";

/**
 * Maps a backend PrivateExcursionListItem into the PrivateExcursion interface
 * consumed by PrivateExcursionCard and PrivateExcursionsGrid.
 */
export function mapBackendPrivateExcursionToCard(
  item: PrivateExcursionListItem
): PrivateExcursion {
  const badge =
    item.category?.categoryTitle ||
    item.categoryTitle ||
    item.excursionType ||
    "Private Tour";

  const resolvedImageUrl =
    getBackendImageUrl(item.primaryImageUrl) ||
    item.primaryImageUrl ||
    PRIVATE_EXCURSION_FALLBACK_IMAGE;

  const durationHours = item.durationHours || 6;
  const parsedStars = parseFloat(item.stars);
  const rating =
    typeof item.rating === "number" && !isNaN(item.rating) && item.rating > 0
      ? item.rating
      : !isNaN(parsedStars) && parsedStars > 0
      ? parsedStars
      : 5;

  const prices = item.prices || [];
  const primaryPrice = prices[0];
  const adultPrice = primaryPrice?.adultPrice ?? 0;
  const childPrice = primaryPrice?.childPrice ?? 0;
  const infantPrice = primaryPrice?.infantPrice ?? 0;
  const currency = primaryPrice?.currencyCode || "USD";

  return {
    id: item.id,
    slug: item.slug || item.id,
    title: item.title,
    subtitle: item.subtitle || "",
    shortDescription: item.shortDescription || item.subtitle || "",
    excursionType: item.excursionType || badge,
    duration: `${durationHours} hours`,
    durationHours,
    stars: item.stars || "5",
    rating,
    category: badge,
    categorySlug: item.category?.slug || item.categorySlug || "",
    badge,
    imageUrl: resolvedImageUrl,
    isFeatured: item.isFeatured,
    prices,
    adultPrice,
    childPrice,
    infantPrice,
    currency,
  };
}
