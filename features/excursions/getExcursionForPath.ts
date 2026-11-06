// ---------------------------------------------------------------------------
// Server-side resolution of an excursion detail URL, for both the group and the
// private catalogue.
//
// Same contract as the service item loader: `generateMetadata` reads the entity the
// URL points at, and the page wrapper raises a real 404 when nothing answers -
// instead of the client component rendering its own "not found" card with HTTP 200.
// A GUID segment is redirected onto the stored slug, so each excursion has exactly
// one indexable URL.
// ---------------------------------------------------------------------------

import { cache } from "react";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getGroupExcursionFullDetails } from "@/clientApi/groupExcursionDetailsApi";
import { getPrivateExcursionFullDetails } from "@/clientApi/privateExcursionDetailsApi";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";
import { buildMetadata, withDestinationTitle } from "@/shared/utils/localizedMetadata";
import { excursionHref } from "@/shared/utils/contentUrl";

export type ExcursionKind = "group" | "private";

/**
 * The fields this loader needs, present on both
 * `GroupExcursionDetailItem` and `PrivateExcursionDetail`.
 */
interface ExcursionEntity {
  id: string;
  slug?: string | null;
  title?: string | null;
  shortDescription?: string | null;
  primaryImageUrl?: string | null;
  heroImageUrl?: string | null;
  imageList?: Array<{ imageUrl: string; isPrimary?: boolean }> | null;
  isActive?: boolean;
}

export interface ResolvedExcursion {
  kind: ExcursionKind;
  locale: string;
  id: string;
  /** the stored slug, or the id when the row has none */
  slug: string;
  title: string;
  description: string;
  /** every image of the excursion, absolute, primary first */
  images: string[];
  isActive: boolean;
  /** false when the request came in as a GUID, so the caller redirects to `slug` */
  isCanonical: boolean;
  /** the untouched API payload, reused later by the JSON-LD builders */
  detail: unknown;
}

const DICTIONARY_SECTION: Record<ExcursionKind, string> = {
  group: "groupExcursions",
  private: "privateExcursions",
};

function folder(kind: ExcursionKind): string {
  return kind === "group" ? "group-excursions" : "private-excursions";
}

/**
 * Absolute image URLs, ordered so the first entry is the one worth sharing on
 * social: the primary image, then the hero, then the gallery.
 */
function excursionImages(entity: ExcursionEntity): string[] {
  const gallery = (entity.imageList ?? [])
    .slice()
    .sort((a, b) => Number(b.isPrimary ?? false) - Number(a.isPrimary ?? false))
    .map((image) => getBackendImageUrl(image.imageUrl) ?? "");
  const singles = [entity.primaryImageUrl, entity.heroImageUrl]
    .map((url) => (url ? getBackendImageUrl(url) ?? "" : ""))
    .filter(Boolean);
  return [...new Set([...singles, ...gallery])].filter(Boolean);
}

async function fetchExcursion(
  kind: ExcursionKind,
  segment: string,
  locale: string
): Promise<{ excursion: ExcursionEntity; detail: unknown } | null> {
  try {
    // Both APIs throw when the entity behind the id/slug cannot be loaded.
    const detail =
      kind === "group"
        ? await getGroupExcursionFullDetails(segment, locale)
        : await getPrivateExcursionFullDetails(segment, locale);
    const excursion = (detail as { excursion: ExcursionEntity })?.excursion;
    if (!excursion?.id) return null;
    return { excursion, detail };
  } catch {
    return null;
  }
}

export const getExcursionForPath = cache(
  async (
    locale: string,
    kind: ExcursionKind,
    segment: string
  ): Promise<ResolvedExcursion | null> => {
    if (!segment) return null;
    const fetched = await fetchExcursion(kind, segment, locale);
    if (!fetched) return null;

    const entity = fetched.excursion;
    const slug = entity.slug?.trim() || entity.id;
    return {
      kind,
      locale,
      id: entity.id,
      slug,
      title: entity.title?.trim() ?? "",
      description: entity.shortDescription?.trim() ?? "",
      images: excursionImages(entity),
      isActive: entity.isActive !== false,
      isCanonical: segment === slug,
      detail: fetched.detail,
    };
  }
);

/** Page-wrapper half: 404 on a miss, permanent redirect onto the slug. */
export async function resolveExcursionDetail(
  locale: string,
  kind: ExcursionKind,
  segment: string
): Promise<ResolvedExcursion> {
  const resolved = await getExcursionForPath(locale, kind, segment);
  if (!resolved) notFound();
  if (!resolved.isCanonical) redirect(excursionHref(locale, kind, resolved.slug));
  return resolved;
}

/**
 * Metadata half. A hidden (inactive) excursion stays reachable - a booking link may
 * still exist - but is never indexed, and an unknown one defers to the 404 the page
 * wrapper raises.
 */
export async function excursionDetailMetadata(
  locale: string,
  kind: ExcursionKind,
  segment: string
): Promise<Metadata> {
  const listPath = `/${folder(kind)}`;
  const resolved = await getExcursionForPath(locale, kind, segment);

  if (!resolved) {
    return buildMetadata({
      locale,
      path: listPath,
      section: DICTIONARY_SECTION[kind],
      canonicalPath: listPath,
      noindex: true,
    });
  }

  const [firstImage] = resolved.images;
  return buildMetadata({
    locale,
    path: `/${folder(kind)}/${resolved.slug}`,
    section: DICTIONARY_SECTION[kind],
    // "Private Desert Safari" alone never mentions the place; the pattern comes from
    // the dictionary so the title and the visible <h1> say the same thing
    title: withDestinationTitle(locale, resolved.title) || undefined,
    description: resolved.description || undefined,
    ...(firstImage ? { ogImage: firstImage } : {}),
    ...(resolved.isActive ? {} : { noindex: true }),
  });
}
