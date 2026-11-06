"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getSiteServiceSubItems,
  getSiteServiceSubItemById,
} from "@/clientApi/siteServiceItemApi";
import { getSiteServices } from "@/clientApi/siteServiceApi";
import type { SiteServiceSubItem } from "@/models/siteServiceItem";
import type { ServiceCardItem } from "@/components/UserComp/Services/types";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";
import { serviceItemSlug } from "@/shared/utils/serviceItemUrl";
import { isUUID } from "@/shared/utils/uuid";

// ─── UUID validation ──────────────────────────────────────────────────────────
// re-exported so existing imports keep working; the implementation lives in
// shared/utils/uuid.ts because server code cannot call through this file's
// "use client" boundary.
export { isUUID };

// ─── Fallback image constant ─────────────────────────────────────────────────
export const SERVICE_FALLBACK_IMAGE = "/GroupExcursions/HeroLogo.webp";

// ─── Card mapper ──────────────────────────────────────────────────────────────
export function mapSubItemToCard(
  item: SiteServiceSubItem,
  serviceType: ServiceCardItem["serviceType"],
  billingLabels: { perHour: string; perDay: string }
): ServiceCardItem {
  const sortedImages = item.images && item.images.length > 0
    ? [...item.images].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
    : [];
  const rawImage = sortedImages[0]?.imageUrl || item.images?.[0]?.imageUrl;
  const firstImage = getBackendImageUrl(rawImage) || SERVICE_FALLBACK_IMAGE;
  const price = item.price ?? item.basePriceUSD ?? 0;

  const keyFeatures = item.features
    ? item.features.flatMap((f) => f.values.map((v) => v.name)).slice(0, 3)
    : [];

  return {
    id: item.id,
    // readable URL segment (the legacy slug, or the slugged title) - the detail route
    // accepts the old GUID form too and redirects it here
    slug: serviceItemSlug(item),
    title: item.title,
    description: item.description,
    imageUrl: firstImage,
    badge: undefined,
    price,
    pricePeriod:
      serviceType === "tourist" ? billingLabels.perHour : billingLabels.perDay,
    priceFormatted: price > 0 ? `$${price}` : undefined,
    keyFeatures: keyFeatures.length > 0 ? keyFeatures : undefined,
    serviceType,
  };
}

// ─── Fetch all site services (parent categories) ──────────────────────────────
export function useAllSiteServices(lang: string = "en") {
  return useQuery({
    queryKey: ["public", "site-services-all", lang],
    queryFn: async () => {
      const res = await getSiteServices({ lang, pageSize: 50 });
      return res.data?.items ?? [];
    },
    staleTime: 1000 * 60 * 10,
  });
}

// ─── Find service ID by title keyword ────────────────────────────────────────
export function useSiteServiceIdByTitle(titleKeyword: string, lang: string = "en") {
  const { data: all } = useAllSiteServices(lang);
  const lower = titleKeyword.toLowerCase();
  const match = all?.find((s) => s.title.toLowerCase().includes(lower));
  return match?.id;
}

// ─── Sub-items for a known serviceId ─────────────────────────────────────────
export function usePublicServiceSubItems(
  serviceId: string | undefined,
  lang: string = "en",
  pageSize: number = 100
) {
  return useQuery({
    queryKey: ["public", "service-sub-items", serviceId, lang],
    queryFn: async () => {
      if (!serviceId) return [];
      const res = await getSiteServiceSubItems({
        serviceId,
        lang,
        pageSize,
        isActive: true,
      });
      return res.data?.items ?? [];
    },
    enabled: !!serviceId,
    staleTime: 1000 * 60 * 5,
  });
}

// ─── Single sub-item by UUID ──────────────────────────────────────────────────
export function usePublicServiceSubItemById(id: string, lang: string = "en") {
  const valid = isUUID(id);
  return useQuery({
    queryKey: ["public", "service-sub-item", id, lang],
    queryFn: async () => {
      const res = await getSiteServiceSubItemById(id, lang);
      return res.data ?? null;
    },
    enabled: valid,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
