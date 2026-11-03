import type { PrivateExcursionListItem } from "@/models/privateExcursion";
import type { PrivateExcursion } from "../types";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";
import { isRibbonLabel, trimDanglingTail } from "@/shared/utils/excursionText";
import { formatPrivateDuration } from "./privateDetailLocalization";

/** Local placeholder used when the backend provides no usable image. */
export const PRIVATE_EXCURSION_FALLBACK_IMAGE = "/GroupExcursions/HeroLogo.webp";

export interface CategoryLookupItem {
  id: string;
  name?: string;
  slug?: string;
}

/**
 * Maps a backend PrivateExcursionListItem into the PrivateExcursion interface
 * consumed by PrivateExcursionCard and PrivateExcursionsGrid.
 *
 * Resolves ribbon badge in order:
 * 1. Matching translated category name from the localized category catalog
 * 2. Localized excursionType tag (translated by the backend per locale)
 * 3. Unlocalized backend categoryTitle
 * 4. Localized fallback badge
 */
export function mapBackendPrivateExcursionToCard(
  item: PrivateExcursionListItem,
  categories?: CategoryLookupItem[] | unknown,
  fallbackBadge: string = "Private Tour",
  locale: string = "en",
  dict?: any
): PrivateExcursion {
  const catList = Array.isArray(categories) ? (categories as CategoryLookupItem[]) : undefined;
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

  const resolvedFallbackBadge = dict?.privateExcursions?.details?.defaultBadge || fallbackBadge;

  const badge =
    matchedCategoryName ||
    (isRibbonLabel(localizedExcursionType) ? localizedExcursionType : "") ||
    rawCategoryTitle ||
    resolvedFallbackBadge;

  const resolvedImageUrl =
    getBackendImageUrl(item.primaryImageUrl) ||
    item.primaryImageUrl ||
    PRIVATE_EXCURSION_FALLBACK_IMAGE;

  const durationHours = item.durationHours || 6;
  const localizedDuration = formatPrivateDuration(
    durationHours,
    "",
    locale,
    dict?.privateExcursions?.details
  );
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
    shortDescription: trimDanglingTail(item.shortDescription || item.subtitle || ""),
    excursionType: localizedExcursionType || badge,
    duration: localizedDuration,
    durationHours,
    stars: item.stars || "5",
    rating,
    category: matchedCategoryName || rawCategoryTitle || badge,
    categorySlug: matchedCat?.slug || item.category?.slug || item.categorySlug || "",
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
