// ---------------------------------------------------------------------------
// The URL shape of every crawlable content type, in one place, so the cards, the
// detail routes, the sitemap and the JSON-LD builders always emit the same string.
// ---------------------------------------------------------------------------

import { SITE_ORIGIN } from "./siteConfig";
import { slugify } from "./slugify";

/** `/Blogs/{guid}` - blog posts are addressed by their backend id. */
export function blogPath(id: string): string {
  return `/Blogs/${id}`;
}

/** `/en/Blogs/{guid}` */
export function blogHref(locale: string, id: string): string {
  return `/${locale}${blogPath(id)}`;
}

/** `/hotel-deliveries/{numericId}` */
export function hotelDeliveryPath(id: number | string): string {
  return `/hotel-deliveries/${id}`;
}

/** `/en/hotel-deliveries/{numericId}` */
export function hotelDeliveryHref(locale: string, id: number | string): string {
  return `/${locale}${hotelDeliveryPath(id)}`;
}

/**
 * The URL of one page of a paginated archive. Page 1 is the clean path and page
 * N >= 2 carries `?page=N`, which is the same form `buildMetadata()` puts in the
 * canonical and the hreflang set, so a followed link and the canonical the page
 * then declares are the same URL. Page 1 alone is listed in the sitemap; the
 * later pages are reached through the pagination links rendered on page 1.
 */
export function paginatedHref(locale: string, path: string, page: number): string {
  const base = `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
  return page > 1 ? `${base}?page=${page}` : base;
}

/** `/group-excursions/{slug}` or `/private-excursions/{slug}` */
export function excursionPath(
  kind: "group" | "private",
  slugOrId: string
): string {
  const folder = kind === "group" ? "group-excursions" : "private-excursions";
  return `/${folder}/${slugOrId}`;
}

/**
 * `/en/group-excursions/{slug}` and `/en/private-excursions/{slug}`: the backend
 * stores a slug per excursion, and a row created without one falls back to its id.
 */
export function excursionHref(
  locale: string,
  kind: "group" | "private",
  slugOrId: string
): string {
  return `/${locale}${excursionPath(kind, slugOrId)}`;
}

/**
 * The numeric product id behind a `/hotel-deliveries/[slug]` segment.
 *
 * The route has always accepted both forms - a bare id ("12") and the legacy
 * "{name}-{id}" shape the old site published ("ananas-1") - and the client detail
 * component parses it the same way, so both stay in sync through this one function.
 */
export function hotelDeliveryIdFromSlug(slug: string | null | undefined): number | null {
  const value = (slug ?? "").trim();
  if (!value) return null;

  const direct = Number(value);
  if (Number.isFinite(direct) && direct > 0) return direct;

  const last = Number(value.split("-").pop());
  if (Number.isFinite(last) && last > 0) return last;

  return null;
}

/** Readable slug for a product name, used when a legacy URL has to be matched. */
export function productTitleSlug(title: string): string | null {
  return slugify(title);
}

/**
 * Absolute form of one of the hrefs above (they already carry their locale
 * segment), for <sitemap><loc> and JSON-LD `url`/`@id`.
 */
export function absoluteContentHref(href: string): string {
  return `${SITE_ORIGIN}${href.startsWith("/") ? href : `/${href}`}`;
}
