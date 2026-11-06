// ---------------------------------------------------------------------------
// Server-side resolution of a hotel-delivery product for /hotel-deliveries/[slug].
//
// The segment has always been able to arrive as a bare id ("12") or in the legacy
// "{name}-{id}" shape, so the id is parsed first and the page then answers a real
// 404 for anything the backend does not know, instead of rendering the client
// component's "product not found" card with HTTP 200.
// ---------------------------------------------------------------------------

import { cache } from "react";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getProductById } from "@/clientApi/productApi";
import type { ProductDetail } from "@/models/product";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";
import { buildMetadata } from "@/shared/utils/localizedMetadata";
import { hotelDeliveryHref, hotelDeliveryIdFromSlug } from "@/shared/utils/contentUrl";

export interface ResolvedProduct {
  product: ProductDetail;
  id: number;
  locale: string;
  /** false when the URL carried the legacy "{name}-{id}" form */
  isCanonical: boolean;
}

/** Every product image, absolute, in display order. */
export function productImages(product: ProductDetail): string[] {
  return [...(product.images ?? [])]
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
    .map((image) => getBackendImageUrl(image.imageUrl) ?? "")
    .filter(Boolean);
}

export const getProductForPath = cache(
  async (
    slug: string,
    locale: string
  ): Promise<ResolvedProduct | null> => {
    const id = hotelDeliveryIdFromSlug(slug);
    if (!id) return null;
    try {
      const res = await getProductById(id, locale);
      const product = res.data;
      if (!product || product.id !== id) return null;
      return {
        product,
        id,
        locale,
        isCanonical: slug.trim() === String(id),
      };
    } catch {
      return null;
    }
  }
);

/** Page-wrapper half: 404 on a miss, redirect onto the numeric canonical URL. */
export async function resolveProductDetail(
  locale: string,
  slug: string
): Promise<ResolvedProduct> {
  const resolved = await getProductForPath(slug, locale);
  if (!resolved) notFound();
  if (!resolved.isCanonical) redirect(hotelDeliveryHref(locale, resolved.id));
  return resolved;
}

/**
 * Metadata half. `hotelDeliveriesPage.details` supplies the fallback wording and the
 * product's own title and subtitle win whenever they exist.
 */
export async function productDetailMetadata(
  locale: string,
  slug: string
): Promise<Metadata> {
  const listPath = "/hotel-deliveries";
  const resolved = await getProductForPath(slug, locale);

  if (!resolved) {
    return buildMetadata({
      locale,
      path: listPath,
      section: "hotelDeliveriesPage",
      canonicalPath: listPath,
      noindex: true,
    });
  }

  const [firstImage] = productImages(resolved.product);
  return buildMetadata({
    locale,
    path: `/hotel-deliveries/${resolved.id}`,
    section: "hotelDeliveriesPage.details",
    title: resolved.product.title || undefined,
    description: resolved.product.subTitle || undefined,
    ...(firstImage ? { ogImage: firstImage } : {}),
  });
}
