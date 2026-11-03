import type { GroupExcursionListItem } from "@/models/groupExcursion";
import type { GroupExcursion } from "../types";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";

/** Local placeholder used when the backend provides no usable image. */
export const GROUP_EXCURSION_FALLBACK_IMAGE = "/GroupExcursions/HeroLogo.webp";

export interface GroupCategoryLookupItem {
  id: string;
  name?: string;
  slug?: string;
}

/**
 * Maps a backend GroupExcursionListItem into the GroupExcursion interface
 * consumed by GroupExcursionCard.
 *
 * Resolves ribbon badge in order:
 * 1. Matching translated category name from the localized category catalog
 * 2. Localized excursionType tag (translated by the backend per locale)
 * 3. Unlocalized backend categoryTitle
 * 4. Localized fallback badge
 */
export function mapBackendGroupExcursionToCard(
  item: GroupExcursionListItem,
  categories?: GroupCategoryLookupItem[] | unknown,
  fallbackBadge: string = "Historical"
): GroupExcursion {
  const catList = Array.isArray(categories) ? (categories as GroupCategoryLookupItem[]) : undefined;
  const catId = (item.categoryId || item.category?.id || "").toLowerCase();
  const catSlug = (item.categorySlug || item.category?.slug || "").toLowerCase();

  const matchedCat = catList?.find(
    (c) =>
      (catId && c.id.toLowerCase() === catId) ||
      (catSlug && c.slug && c.slug.toLowerCase() === catSlug)
  );

  const matchedCategoryName = matchedCat?.name?.trim();
  const localizedExcursionType = item.excursionType?.trim();
  const rawCategoryTitle = item.category?.categoryTitle?.trim() || item.categoryTitle?.trim();

  const badge =
    matchedCategoryName ||
    localizedExcursionType ||
    rawCategoryTitle ||
    fallbackBadge;

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
    category: matchedCategoryName || rawCategoryTitle || badge,
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
