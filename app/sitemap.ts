import type { MetadataRoute } from "next";
import { getPublicBlogs } from "@/clientApi/blogApi";
import { getGroupExcursions } from "@/clientApi/groupExcursionApi";
import { getClientPrivateExcursions } from "@/clientApi/privateExcursionApi";
import { getProducts } from "@/clientApi/productApi";
import { getSiteServiceSubItems } from "@/clientApi/siteServiceItemApi";
import { SITE_SERVICES_CONFIG } from "@/components/UserComp/Services/config/siteServicesConfig";
import {
  blogPath,
  excursionPath,
  hotelDeliveryPath,
} from "@/shared/utils/contentUrl";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";
import { cachedValue } from "@/shared/utils/serverCache";
import {
  IS_INDEXABLE,
  SUPPORTED_LOCALES,
  X_DEFAULT_LOCALE,
  absoluteUrl,
  localeLessUrl,
} from "@/shared/utils/siteConfig";
import {
  SERVICE_SECTION_SLUGS,
  serviceItemSlug,
  type ServiceSectionSlug,
} from "@/shared/utils/serviceItemUrl";

// ---------------------------------------------------------------------------
// /sitemap.xml
//
// Enumerating the catalogue means asking the backend for it, so Next.js serves this
// file on demand (with cacheComponents enabled a route that fetches cannot be pinned
// to build time) and the answer is memoized for an hour: a crawl of Googlebot costs
// one catalogue read instead of a paged sweep of the API on every hit, while a new
// product still reaches the map within the hour instead of the next deploy.
//
// Everything indexable is listed - and nothing else: the cart, both thank-you pages
// and the duplicate /[locale]/transfer route stay out, which is exactly what their
// own metadata says about them, so the two indexing signals can never disagree.
//
// The catalogue is enumerated page by page instead of assumed to fit on one page,
// and a backend that will not answer costs only the part of the sitemap it owns -
// never a failing request.
// ---------------------------------------------------------------------------

/** Items per backend page while enumerating. */
const PAGE_SIZE = 100;
/** Crawl guard: a misbehaving hasNextPage must not turn the loop into a long one. */
const MAX_PAGES = 20;
/** How long one build of a family's URL list stays the answer. */
const REFRESH_MS = 60 * 60 * 1000;

/** Every URL this sitemap can publish, grouped by what it is. */
type ContentKind =
  | "home"
  | "serviceList"
  | "serviceItem"
  | "excursionList"
  | "excursionItem"
  | "deliveryList"
  | "deliveryItem"
  | "blogList"
  | "blogItem"
  | "staticPage";

/**
 * Crawl hints set once per content type: a hand-tuned value per URL would drift
 * the moment a row is added, and Google weighs these signals far below relevance.
 */
const SITEMAP_SETTINGS: Record<
  ContentKind,
  { changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>; priority: number }
> = {
  home: { changeFrequency: "weekly", priority: 1 },
  serviceList: { changeFrequency: "weekly", priority: 0.9 },
  serviceItem: { changeFrequency: "weekly", priority: 0.8 },
  excursionList: { changeFrequency: "weekly", priority: 0.9 },
  excursionItem: { changeFrequency: "weekly", priority: 0.8 },
  deliveryList: { changeFrequency: "weekly", priority: 0.8 },
  deliveryItem: { changeFrequency: "weekly", priority: 0.7 },
  blogList: { changeFrequency: "daily", priority: 0.7 },
  blogItem: { changeFrequency: "monthly", priority: 0.6 },
  staticPage: { changeFrequency: "monthly", priority: 0.5 },
};

/** section route segment -> the parent service key holding its backend id */
const SERVICE_CONFIG_KEY: Record<ServiceSectionSlug, keyof typeof SITE_SERVICES_CONFIG> = {
  tourist: "touristServices",
  "car-rental": "carRental",
  "vip-airport": "vipAirport",
  "real-estate": "realEstate",
};

/** The full hreflang cluster of one page, including its language-neutral form. */
function alternates(path: string): MetadataRoute.Sitemap[number]["alternates"] {
  const languages: Record<string, string> = {};
  for (const locale of SUPPORTED_LOCALES) languages[locale] = absoluteUrl(locale, path);
  // x-default is this same page without a locale: proxy.ts negotiates a locale for
  // it, which answers an international visitor better than the home page would.
  languages[X_DEFAULT_LOCALE] = localeLessUrl(path);
  return { languages };
}

/**
 * Expands one locale-relative path into the four `<url>` entries a crawler
 * expects, each carrying the whole cluster.
 */
function page(
  path: string,
  kind: ContentKind,
  extra: { lastModified?: string | Date | null; images?: string[] } = {}
): MetadataRoute.Sitemap {
  const settings = SITEMAP_SETTINGS[kind];
  return SUPPORTED_LOCALES.map((locale) => ({
    url: absoluteUrl(locale, path),
    changeFrequency: settings.changeFrequency,
    priority: settings.priority,
    alternates: alternates(path),
    ...(extra.lastModified ? { lastModified: extra.lastModified } : {}),
    ...(extra.images?.length ? { images: extra.images } : {}),
  }));
}

/** The published pages that have no backend counterpart. */
const STATIC_PAGES: Array<{ path: string; kind: ContentKind }> = [
  { path: "/", kind: "home" },
  { path: "/services/tourist", kind: "serviceList" },
  { path: "/services/car-rental", kind: "serviceList" },
  { path: "/services/vip-airport", kind: "serviceList" },
  { path: "/services/real-estate", kind: "serviceList" },
  // only the canonical transfer URL is listed; /[locale]/transfer canonicalizes here
  { path: "/services/transfer", kind: "serviceList" },
  { path: "/group-excursions", kind: "excursionList" },
  { path: "/private-excursions", kind: "excursionList" },
  { path: "/hotel-deliveries", kind: "deliveryList" },
  { path: "/Blogs", kind: "blogList" },
  { path: "/About", kind: "staticPage" },
  { path: "/Contact", kind: "staticPage" },
  { path: "/faq", kind: "staticPage" },
  { path: "/privacy", kind: "staticPage" },
];

/** Absolute form of a backend-relative upload path, empty when there is none. */
function imageUrls(paths: Array<string | null | undefined>): string[] {
  return paths.map((path) => (path ? getBackendImageUrl(path) ?? "" : "")).filter(Boolean);
}

/** Walks a paged list endpoint until it reports no next page. */
async function paged<T>(
  fetchPage: (pageNumber: number) => Promise<{ items: T[]; hasNextPage: boolean } | null>,
  collect: (item: T) => MetadataRoute.Sitemap
): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  for (let pageNumber = 1; pageNumber <= MAX_PAGES; pageNumber++) {
    // a family that will not answer is missing from this build's sitemap - it must
    // never fail the build or publish half a catalogue as the whole one
    const result = await fetchPage(pageNumber).catch(() => null);
    if (!result) break;
    for (const item of result.items) entries.push(...collect(item));
    if (!result.hasNextPage || result.items.length === 0) break;
  }
  return entries;
}

/**
 * The service items, addressed by the same readable slug the cards link to:
 * `serviceItemSlug` is the only function allowed to name an item, so a sitemap URL
 * and the link a visitor clicks cannot drift apart.
 */
async function serviceItemEntries(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  for (const section of SERVICE_SECTION_SLUGS) {
    const serviceId = SITE_SERVICES_CONFIG[SERVICE_CONFIG_KEY[section]].id;
    try {
      const res = await getSiteServiceSubItems({
        serviceId,
        lang: "en",
        pageSize: PAGE_SIZE,
        isActive: true,
      });
      for (const item of res.data?.items ?? []) {
        if (item.isDeleted) continue;
        entries.push(
          ...page(`/services/${section}/${serviceItemSlug(item)}`, "serviceItem", {
            // the only date this entity really carries; updatedAt is not returned
            lastModified: item.createdAt,
            images: imageUrls((item.images ?? []).map((image) => image.imageUrl)).slice(0, 4),
          })
        );
      }
    } catch {
      // a section that will not answer is simply absent from this build's sitemap
    }
  }
  return entries;
}

/** Group and private excursions, published rows only. */
async function excursionEntries(): Promise<MetadataRoute.Sitemap> {
  const group = await paged(
    async (pageNumber) => {
      const res = await getGroupExcursions({
        lang: "en",
        currency: "USD",
        page: pageNumber,
        pageSize: PAGE_SIZE,
        isActive: true,
      });
      return {
        items: (res?.items ?? []).filter((row) => row.isActive !== false),
        hasNextPage: !!res?.hasNextPage,
      };
    },
    (row) =>
      page(excursionPath("group", row.slug || row.id), "excursionItem", {
        images: imageUrls([row.primaryImageUrl, row.heroImageUrl]),
      })
  );

  const privateRows = await paged(
    async (pageNumber) => {
      const res = await getClientPrivateExcursions({
        lang: "en",
        currency: "USD",
        page: pageNumber,
        pageSize: PAGE_SIZE,
        isActive: true,
      });
      return {
        items: (res?.items ?? []).filter((row) => row.isActive !== false),
        hasNextPage: !!res?.hasNextPage,
      };
    },
    (row) =>
      page(excursionPath("private", row.slug || row.id), "excursionItem", {
        images: imageUrls([row.primaryImageUrl]),
      })
  );

  return [...group, ...privateRows];
}

/** Hotel-delivery products; the list endpoint already excludes deleted rows. */
async function productEntries(): Promise<MetadataRoute.Sitemap> {
  return paged(
    async (pageNumber) => {
      const res = await getProducts({ language: "en", pageNumber, pageSize: PAGE_SIZE });
      const data = res?.data;
      return {
        items: (data?.items ?? []).filter((row) => !row.isDeleted),
        hasNextPage: !!data?.hasNextPage,
      };
    },
    (row) =>
      page(hotelDeliveryPath(row.id), "deliveryItem", {
        images: imageUrls((row.images ?? []).map((image) => image.imageUrl)).slice(0, 4),
      })
  );
}

async function blogEntries(): Promise<MetadataRoute.Sitemap> {
  return paged(
    async (pageNumber) => {
      const res = await getPublicBlogs({ pageNumber, pageSize: PAGE_SIZE }, "en");
      const data = res?.data;
      return { items: data?.items ?? [], hasNextPage: !!data?.hasNextPage };
    },
    (row) => page(blogPath(row.id), "blogItem", { images: imageUrls([row.imageUrl]) })
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // a preview deploy must not publish a map that points crawlers at it
  if (!IS_INDEXABLE) return [];

  const entries = STATIC_PAGES.flatMap(({ path, kind }) => page(path, kind));

  const [services, excursions, products, blogs] = await Promise.all([
    cachedValue("sitemap:serviceItems", REFRESH_MS, serviceItemEntries),
    cachedValue("sitemap:excursions", REFRESH_MS, excursionEntries),
    cachedValue("sitemap:products", REFRESH_MS, productEntries),
    cachedValue("sitemap:blogs", REFRESH_MS, blogEntries),
  ]);

  return [...entries, ...services, ...excursions, ...products, ...blogs];
}
