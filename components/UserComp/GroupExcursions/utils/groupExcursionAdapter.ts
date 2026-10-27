import type { GroupExcursionListItem } from "@/models/groupExcursion";
import type { GroupExcursion } from "../types";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";

/** Local placeholder used when the backend provides no usable image. */
export const GROUP_EXCURSION_FALLBACK_IMAGE = "/GroupExcursions/HeroLogo.webp";

/**
 * Maps a backend GroupExcursionListItem (matching PromptsUi/f.md)
 * into the GroupExcursion interface consumed by GroupExcursionCard.
 */
export function mapBackendGroupExcursionToCard(
  item: GroupExcursionListItem
): GroupExcursion {
  const badge =
    item.category?.categoryTitle ||
    item.categoryTitle ||
    "Historical";

  const resolvedImageUrl =
    getBackendImageUrl(item.primaryImageUrl) ||
    item.primaryImageUrl ||
    GROUP_EXCURSION_FALLBACK_IMAGE;

  const durationHours = item.durationHours || 12;
  const parsedStars = parseFloat(item.stars);
  const rating =
    typeof item.rating === "number" && !isNaN(item.rating)
      ? item.rating
      : !isNaN(parsedStars)
      ? parsedStars
      : 5;

  return {
    id: item.id,
    slug: item.slug || item.id,
    title: item.title,
    description: item.shortDescription || item.subtitle || "",
    badge,
    category: badge,
    duration: `${durationHours} hours`,
    durationHours,
    rating,
    adultPrice: item.price?.adultPrice ?? 0,
    childPrice: item.price?.childPrice ?? 0,
    infantPrice: item.price?.infantPrice ?? 0,
    currency: item.price?.currencyCode || "USD",
    imageUrl: resolvedImageUrl,
  };
}
