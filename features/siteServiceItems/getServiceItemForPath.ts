// ---------------------------------------------------------------------------
// Server-side resolution of a service detail URL segment.
//
// A `/[locale]/services/[section]/[slug]` request arrives with either the readable
// slug (what the cards now link to) or a bare sub-item GUID (every URL the app
// published before the slug change, plus anything search engines already indexed).
// Both forms have to resolve to the same entity, so that the page can redirect the
// GUID form to the slug form and answer a real 404 for anything unknown instead of
// the "Service not found" panel the client component used to render with HTTP 200.
//
// Both `generateMetadata` and the page call this, and React.cache collapses the two
// into a single backend request per render.
// ---------------------------------------------------------------------------

import { cache } from "react";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import {
  getSiteServiceSubItemById,
  getSiteServiceSubItems,
} from "@/clientApi/siteServiceItemApi";
import { SITE_SERVICES_CONFIG, type SiteServiceKey } from "@/components/UserComp/Services/config/siteServicesConfig";
import type { SiteServiceSubItem } from "@/models/siteServiceItem";
import { isUUID } from "@/shared/utils/uuid";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";
import { buildMetadata, withDestinationTitle } from "@/shared/utils/localizedMetadata";
import {
  isServiceSectionSlug,
  serviceItemHref,
  serviceItemSlug,
  type ServiceSectionSlug,
} from "@/shared/utils/serviceItemUrl";

/** section route segment -> the parent service key in SITE_SERVICES_CONFIG */
const SECTION_CONFIG_KEY: Record<ServiceSectionSlug, SiteServiceKey> = {
  tourist: "touristServices",
  "car-rental": "carRental",
  "vip-airport": "vipAirport",
  "real-estate": "realEstate",
};

export interface ResolvedServiceItem {
  /** the backend entity, already localized to `locale` */
  item: SiteServiceSubItem;
  section: ServiceSectionSlug;
  locale: string;
  /** the readable URL segment this item should be served under */
  slug: string;
  /**
   * False when the request arrived as a GUID, i.e. the URL is valid but not the one
   * to publish, so the caller must redirect to `slug`.
   */
  isCanonical: boolean;
}

/**
 * The active sub-items of one section, localized for `locale`. Cached per
 * (section, locale) pair, and only fetched when a slug (rather than a GUID) has to
 * be matched, so a GUID request costs a single record read.
 */
export const getServiceSectionItems = cache(
  async (
    section: ServiceSectionSlug,
    locale: string
  ): Promise<SiteServiceSubItem[]> => {
    const serviceId = SITE_SERVICES_CONFIG[SECTION_CONFIG_KEY[section]]?.id;
    if (!serviceId) return [];
    try {
      const res = await getSiteServiceSubItems({
        serviceId,
        lang: locale,
        pageSize: 200,
        isActive: true,
      });
      return res.data?.items ?? [];
    } catch {
      // A backend outage must read as "this URL does not exist" (a 404), never as a
      // crash of the whole route, and never as the old soft 404 page either.
      return [];
    }
  }
);

/**
 * Resolve `[slug]` for a section and locale. Returns null when nothing matches,
 * which is the caller's signal to call `notFound()`.
 */
export const getServiceItemForPath = cache(
  async (
    locale: string,
    section: ServiceSectionSlug,
    slug: string
  ): Promise<ResolvedServiceItem | null> => {
    if (!isServiceSectionSlug(section) || !slug) return null;

    if (isUUID(slug)) {
      try {
        const res = await getSiteServiceSubItemById(slug, locale);
        const item = res.data;
        if (!item?.id || item.isActive === false) return null;
        const canonical = serviceItemSlug(item);
        return {
          item,
          section,
          locale,
          slug: canonical,
          // a GUID is never the canonical form, so the caller redirects
          isCanonical: false,
        };
      } catch {
        return null;
      }
    }

    const items = await getServiceSectionItems(section, locale);
    const item = items.find((candidate) => serviceItemSlug(candidate) === slug);
    if (!item) return null;
    return { item, section, locale, slug, isCanonical: true };
  }
);

/** Every gallery image of an item, absolute and in display order. */
export function getServiceItemImages(item: SiteServiceSubItem): string[] {
  const sorted = [...(item.images ?? [])].sort(
    (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
  );
  return sorted
    .map((image) => getBackendImageUrl(image.imageUrl) ?? "")
    .filter(Boolean);
}

/** section route segment -> dictionary node holding the section's SEO copy */
const SECTION_DICTIONARY_KEY: Record<ServiceSectionSlug, string> = {
  tourist: "touristServices",
  "car-rental": "carRental",
  "vip-airport": "vipAirport",
  "real-estate": "realEstate",
};

/**
 * The detail route's single resolution step: 404 for an unknown segment, a
 * permanent redirect when a valid item was addressed by its GUID, and the resolved
 * item otherwise. Called by the page wrapper, never by `generateMetadata` (throwing
 * from there does not produce a status code).
 */
export async function resolveServiceDetail(
  locale: string,
  section: ServiceSectionSlug,
  slug: string
): Promise<ResolvedServiceItem> {
  const resolved = await getServiceItemForPath(locale, section, slug);
  if (!resolved) notFound();
  if (!resolved.isCanonical) {
    redirect(serviceItemHref(locale, section, resolved.item));
  }
  return resolved;
}

/**
 * Metadata for one service detail page. An unknown id still answers (the page
 * wrapper is what raises the 404) but is kept out of the index, so a stale link can
 * never publish a duplicate or a soft 404 title.
 */
export async function serviceDetailMetadata(
  locale: string,
  section: ServiceSectionSlug,
  slug: string
): Promise<Metadata> {
  const listPath = `/${SITE_SERVICES_CONFIG[SECTION_CONFIG_KEY[section]].routePath}`;
  const resolved = await getServiceItemForPath(locale, section, slug);

  if (!resolved) {
    return buildMetadata({
      locale,
      path: listPath,
      section: SECTION_DICTIONARY_KEY[section],
      canonicalPath: listPath,
      noindex: true,
    });
  }

  const [firstImage] = getServiceItemImages(resolved.item);
  return buildMetadata({
    locale,
    path: `/services/${section}/${resolved.slug}`,
    section: SECTION_DICTIONARY_KEY[section],
    // a service item is defined by where it happens: "in Hurghada" is the term the
    // page is searched with, and the visible <h1> gets the same string
    title: withDestinationTitle(locale, resolved.item.title),
    description: resolved.item.description,
    ...(firstImage ? { ogImage: firstImage } : {}),
  });
}
