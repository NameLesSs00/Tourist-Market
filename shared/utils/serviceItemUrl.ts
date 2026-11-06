// ---------------------------------------------------------------------------
// The readable URL of a site service sub-item, defined in exactly one place so
// the cards, the detail pages, the sitemap and the JSON-LD builders can never
// disagree about what an item's canonical URL is.
//
// The 33 catalog items inherited from the legacy PHP site carry their original
// `service-details.php?slug=...` slugs through the generated SERVICE_ITEM_SLUGS
// table. Anything created later in the admin UI has no entry there, so the slug
// is derived from the item title - which is why every consumer of this helper
// must pass the item it fetched for the *same* locale it is rendering.
// ---------------------------------------------------------------------------

import { SERVICE_ITEM_SLUGS } from "@/shared/data/serviceItemSlugs";
import { slugify } from "./slugify";
import { absoluteUrl } from "./siteConfig";

/** Route segment of each service section (matches the [slug] folder routes). */
export type ServiceSectionSlug = "tourist" | "car-rental" | "vip-airport" | "real-estate";

export const SERVICE_SECTION_SLUGS: ServiceSectionSlug[] = [
  "tourist",
  "car-rental",
  "vip-airport",
  "real-estate",
];

/** The two fields a slug needs: the backend id and the displayed title. */
export interface SlugSourceItem {
  id: string;
  title: string;
}

export function isServiceSectionSlug(value: string): value is ServiceSectionSlug {
  return (SERVICE_SECTION_SLUGS as string[]).includes(value);
}

/**
 * Readable URL segment for one sub-item: the inherited legacy slug when the table
 * has one, otherwise the item title slugged, and only as a last resort the raw id
 * (a title with no word characters at all must still produce a working link).
 */
export function serviceItemSlug(item: SlugSourceItem): string {
  const stored = SERVICE_ITEM_SLUGS[item.id];
  if (stored) return stored;
  return slugify(item.title) ?? item.id;
}

/** `/en/services/car-rental/mercedes-benz` */
export function serviceItemHref(
  locale: string,
  section: ServiceSectionSlug,
  item: SlugSourceItem
): string {
  return `/${locale}/services/${section}/${serviceItemSlug(item)}`;
}

/** Absolute version of serviceItemHref, for sitemaps and JSON-LD `url` fields. */
export function serviceItemUrl(
  locale: string,
  section: ServiceSectionSlug,
  item: SlugSourceItem
): string {
  return absoluteUrl(locale, `/services/${section}/${serviceItemSlug(item)}`);
}
