// ---------------------------------------------------------------------------
// Server-side assembly of the structured data every page publishes.
//
// shared/utils/jsonLd.ts knows the schema.org vocabulary, this file knows the
// catalogue. Each function returns the node list of one page and keeps three
// rules:
//
//   1. Only resolved, published data is described. A row that does not exist, is
//      deleted or is hidden produces an empty list, so no page can claim an
//      offer, a price or a rating the backend does not carry.
//   2. No catalogue read that the page did not already do. Every detail graph is
//      assembled from the same React.cache'd resolution the page and its
//      metadata used, so publishing JSON-LD costs no extra backend request.
//   3. A failing lookup degrades to "no structured data", never to a broken
//      page: a crawler that gets no markup still gets a working page, while a
//      throw here would land in the route's error boundary.
//
// Breadcrumb labels come from the dictionary the header itself renders, so the
// trail a crawler reads is the trail a visitor sees in the navigation.
// ---------------------------------------------------------------------------

import { cache } from "react";
import { getClientFaqs } from "@/clientApi/faqApi";
import { getProductReviews } from "@/clientApi/productReviewApi";
import { getProductSubcategoryById } from "@/clientApi/productSubcategoryApi";
import { getServiceReviews } from "@/clientApi/serviceReviewApi";
import type { GroupExcursionFullDetail } from "@/clientApi/groupExcursionDetailsApi";
import type { PrivateExcursionFullDetail } from "@/clientApi/privateExcursionDetailsApi";
import {
  SITE_SERVICES_CONFIG,
  type SiteServiceKey,
} from "@/components/UserComp/Services/config/siteServicesConfig";
import { getExcursionForPath, type ExcursionKind } from "@/features/excursions/getExcursionForPath";
import { blogImage, getBlogForPath } from "@/features/blogs/getBlogForPath";
import { mapGroupExcursionFullDetail } from "@/features/groupExcursions/groupExcursionDetailMapper";
import { getProductForPath, productImages } from "@/features/products/getProductForPath";
import { mapPrivateExcursionFullDetail } from "@/features/privateExcursions/privateExcursionDetailMapper";
import {
  getServiceItemForPath,
  getServiceItemImages,
  getServiceSectionItems,
} from "@/features/siteServiceItems/getServiceItemForPath";
import { blogPath, excursionPath, hotelDeliveryPath } from "@/shared/utils/contentUrl";
import { getDictionary } from "@/shared/utils/getDictionary";
import {
  blogPosting,
  breadcrumbs,
  collectionPage,
  faqPage,
  pageGraph,
  productSchema,
  serviceEntity,
  touristTrip,
  type Crumb,
  type JsonLdObject,
  type RatingSummary,
} from "@/shared/utils/jsonLd";
import { BRAND } from "@/shared/utils/siteConfig";
import {
  SERVICE_SECTION_SLUGS,
  serviceItemUrl,
  type ServiceSectionSlug,
} from "@/shared/utils/serviceItemUrl";

/**
 * How many published reviews a rating is averaged over - the same window the
 * review sections of these pages read. The backend reports the real total
 * separately, so `reviewCount` never claims fewer reviews than exist.
 */
const REVIEW_SAMPLE_SIZE = 50;

/** Per service section: its parent service id, its copy node and its nav label. */
const SECTION_META: Record<
  ServiceSectionSlug,
  { configKey: SiteServiceKey; dictNode: string; crumbPath: string }
> = {
  tourist: {
    configKey: "touristServices",
    dictNode: "touristServices",
    crumbPath: "headerServices.touristServices",
  },
  "car-rental": {
    configKey: "carRental",
    dictNode: "carRental",
    crumbPath: "headerServices.carRental",
  },
  "vip-airport": {
    configKey: "vipAirport",
    dictNode: "vipAirport",
    crumbPath: "headerServices.vipAirport",
  },
  "real-estate": {
    configKey: "realEstate",
    dictNode: "realEstate",
    crumbPath: "headerServices.realEstate",
  },
};

const EXCURSION_META: Record<ExcursionKind, { dictNode: string; crumbPath: string; folder: string }> = {
  group: {
    dictNode: "groupExcursions",
    crumbPath: "headerServices.groupExcursions",
    folder: "group-excursions",
  },
  private: {
    dictNode: "privateExcursions",
    crumbPath: "headerServices.privateExcursions",
    folder: "private-excursions",
  },
};

/**
 * The archive pages that publish a plain WebPage + BreadcrumbList: their title
 * and description come from the same dictionary node buildMetadata() reads, so
 * the markup and the <title> can never drift apart.
 */
const LIST_PAGES: Record<string, { path: string; section: string; crumbPath: string }> = {
  groupExcursions: {
    path: "/group-excursions",
    section: "groupExcursions",
    crumbPath: EXCURSION_META.group.crumbPath,
  },
  privateExcursions: {
    path: "/private-excursions",
    section: "privateExcursions",
    crumbPath: EXCURSION_META.private.crumbPath,
  },
  hotelDeliveries: {
    path: "/hotel-deliveries",
    section: "hotelDeliveriesPage",
    crumbPath: "nav.hotelDeliveries",
  },
  blogs: { path: "/Blogs", section: "blogs", crumbPath: "nav.blogs" },
  transfer: {
    path: "/services/transfer",
    section: "transfer",
    crumbPath: "headerServices.transferServices",
  },
};

// ---------------------------------------------------------------------------
// Dictionary and payload access
// ---------------------------------------------------------------------------

/** One dotted dictionary path, so a missing key degrades to "" instead of throwing. */
function dictText(locale: string, path: string): string {
  const value = path
    .split(".")
    .reduce<unknown>(
      (node, key) =>
        node && typeof node === "object" ? (node as Record<string, unknown>)[key] : undefined,
      getDictionary(locale)
    );
  return typeof value === "string" ? value.trim() : "";
}

function trimmed(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** The home crumb every trail starts from. */
function homeCrumb(locale: string): Crumb {
  return { name: dictText(locale, "nav.home") || "Home", path: "/" };
}

/** Home plus the given crumbs; the last one is the current page and gets no link. */
function trail(locale: string, crumbs: Crumb[]): Crumb[] {
  return [homeCrumb(locale), ...crumbs.filter((crumb) => crumb.name)];
}

/** The backend answers both `{ data: { items, totalCount } }` and a bare paged object. */
function readPaged<T>(result: unknown): { items: T[]; totalCount: number } {
  const raw = result as { data?: { items?: T[]; totalCount?: number } } & {
    items?: T[];
    totalCount?: number;
  };
  const page = raw?.data ?? raw;
  const items = Array.isArray(page?.items) ? page.items : [];
  return { items, totalCount: Number(page?.totalCount ?? items.length) };
}

/** Mean of one numeric field over published reviews, or null when there are none. */
function summarizeRatings(
  items: Array<Record<string, unknown> | null | undefined>,
  field: string,
  totalCount: number
): RatingSummary | null {
  const values = items
    .map((item) => Number(item?.[field]))
    .filter((value) => Number.isFinite(value) && value > 0);
  if (values.length === 0) return null;
  return {
    ratingValue: values.reduce((sum, value) => sum + value, 0) / values.length,
    reviewCount: Math.max(totalCount, values.length),
  };
}

/** Turns any thrown lookup into "this page has nothing to declare". */
async function guard(build: () => Promise<JsonLdObject[]>): Promise<JsonLdObject[]> {
  try {
    return await build();
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// The shared page-level shape
// ---------------------------------------------------------------------------

export interface PageLevelInput {
  locale: string;
  /** path inside the locale */
  path: string;
  /** dictionary node carrying metadataTitle / metadataDescription */
  section: string;
  /** set for data-driven pages, where the entity names itself */
  name?: string;
  description?: string;
  image?: string;
  /** every crumb between Home and this page; the last one is this page */
  crumbs?: Crumb[];
  /** the content nodes of the page, linked from its WebPage */
  entities?: Array<JsonLdObject | null>;
}

/** WebPage + BreadcrumbList + main entities, assembled the same way everywhere. */
export function pageLevelGraph(input: PageLevelInput): JsonLdObject[] {
  const name =
    (input.name ?? dictText(input.locale, `${input.section}.metadataTitle`)).trim() || BRAND;
  const description =
    input.description ?? dictText(input.locale, `${input.section}.metadataDescription`);

  return pageGraph({
    locale: input.locale,
    path: input.path,
    name,
    description,
    image: input.image,
    trail: trail(input.locale, input.crumbs ?? []),
    entities: input.entities ?? [],
  });
}

// ---------------------------------------------------------------------------
// Pages with no catalogue read of their own
// ---------------------------------------------------------------------------

/** The locale home page: a WebPage under that locale's WebSite, no breadcrumb. */
export function homeGraph(locale: string): JsonLdObject[] {
  return pageLevelGraph({ locale, path: "/", section: "home" });
}

/** About, Contact and privacy: one crumb, named by a dictionary path. */
export function staticPageGraph(
  locale: string,
  path: string,
  section: string,
  crumbPath: string
): JsonLdObject[] {
  return pageLevelGraph({
    locale,
    path,
    section,
    crumbs: [{ name: dictText(locale, crumbPath) }],
  });
}

/** The archive pages of LIST_PAGES. */
export function listPageGraph(
  locale: string,
  page: keyof typeof LIST_PAGES
): JsonLdObject[] {
  const entry = LIST_PAGES[page];
  return staticPageGraph(locale, entry.path, entry.section, entry.crumbPath);
}

/**
 * The FAQ page: the same questions the catalog section lists, in one FAQPage
 * node. Nothing is invented - a question without an answer is dropped.
 */
export const faqGraph = cache(async (locale: string): Promise<JsonLdObject[]> =>
  guard(async () => {
    const page = await getClientFaqs({ language: locale, pageNumber: 1, pageSize: 50 });
    const items = [...(page?.items ?? [])].sort(
      (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
    );

    return pageLevelGraph({
      locale,
      path: "/faq",
      section: "faq",
      crumbs: [{ name: dictText(locale, "nav.faq") }],
      entities: [
        faqPage({
          locale,
          path: "/faq",
          name: dictText(locale, "faq.metadataTitle"),
          faqs: items,
        }),
      ],
    });
  })
);

// ---------------------------------------------------------------------------
// Service sections
// ---------------------------------------------------------------------------

/**
 * One service section as a CollectionPage whose ItemList is exactly the items the
 * page renders, each addressed by the same readable slug the cards link to.
 */
export const serviceListGraph = cache(async (
  locale: string,
  section: ServiceSectionSlug
): Promise<JsonLdObject[]> =>
  guard(async () => {
    if (!SERVICE_SECTION_SLUGS.includes(section)) return [];
    const meta = SECTION_META[section];
    const path = `/${SITE_SERVICES_CONFIG[meta.configKey].routePath}`;
    const items = await getServiceSectionItems(section, locale);

    return [
      collectionPage({
        locale,
        path,
        name: dictText(locale, `${meta.dictNode}.metadataTitle`) || BRAND,
        description: dictText(locale, `${meta.dictNode}.metadataDescription`),
        parts: items
          .filter((item) => item.id && item.title && !item.isDeleted && item.isActive !== false)
          .map((item) => ({ name: item.title, url: serviceItemUrl(locale, section, item) })),
      }),
      breadcrumbs(trail(locale, [{ name: dictText(locale, meta.crumbPath), path }]), locale),
    ];
  })
);

/**
 * One catalogued service: Service + Offer, plus an aggregateRating only when the
 * review API really returns published ratings.
 */
export const serviceDetailGraph = cache(async (
  locale: string,
  section: ServiceSectionSlug,
  slug: string
): Promise<JsonLdObject[]> =>
  guard(async () => {
    const meta = SECTION_META[section];
    const resolved = await getServiceItemForPath(locale, section, slug);
    if (!resolved) return [];

    const { item } = resolved;
    const path = `/services/${section}/${resolved.slug}`;
    const listPath = `/${SITE_SERVICES_CONFIG[meta.configKey].routePath}`;
    const images = getServiceItemImages(item);

    const reviews = await getServiceReviews({
      subServiceId: item.id,
      isPublished: true,
      pageNumber: 1,
      pageSize: REVIEW_SAMPLE_SIZE,
    }).catch(() => null);
    const page = readPaged<{ rate?: number; isPublished?: boolean }>(reviews);
    const rating = summarizeRatings(
      page.items.filter((review) => review?.isPublished !== false),
      "rate",
      page.totalCount
    );

    return pageLevelGraph({
      locale,
      path,
      section: meta.dictNode,
      name: item.title,
      description: item.description,
      image: images[0],
      crumbs: [{ name: dictText(locale, meta.crumbPath), path: listPath }, { name: item.title }],
      entities: [
        serviceEntity({
          locale,
          path,
          name: item.title,
          description: item.description,
          images,
          price: item.price ?? item.basePriceUSD,
          currency: item.currency,
          rating,
        }),
      ],
    });
  })
);

// ---------------------------------------------------------------------------
// Excursions
// ---------------------------------------------------------------------------

/**
 * A group or private excursion. The itinerary, the price, the pickup point and
 * the rating all come from the detail mapper the page renders, so the markup
 * cannot contradict the visible tabs.
 */
export const excursionDetailGraph = cache(async (
  locale: string,
  kind: ExcursionKind,
  segment: string
): Promise<JsonLdObject[]> =>
  guard(async () => {
    const meta = EXCURSION_META[kind];
    const resolved = await getExcursionForPath(locale, kind, segment);
    // a hidden excursion is noindexed by its own metadata, so there is no indexed
    // page here for a rich result to appear on either
    if (!resolved || !resolved.isActive) return [];

    const detail = resolved.detail as GroupExcursionFullDetail | PrivateExcursionFullDetail;
    const path = excursionPath(kind, resolved.slug);

    let itinerary: Array<{ name: string; description?: string }> = [];
    let price: number | null = null;
    let currency = "USD";
    let rating: RatingSummary | null = null;
    let touristType = "";
    let pickup = "";
    // declared only for the pages that actually list questions: markup describing
    // content a visitor cannot read on the page is a rich-result violation
    let faqs: Array<{ question?: string; answer?: string }> | undefined;

    if (kind === "group") {
      const view = mapGroupExcursionFullDetail(detail as GroupExcursionFullDetail);
      itinerary = view.itinerary.map((stop) => ({ name: stop.title, description: stop.description }));
      price = view.adultPrice > 0 ? view.adultPrice : null;
      currency = view.currency || "USD";
      rating = { ratingValue: view.rating, reviewCount: view.totalReviews };
      touristType = view.category;
      pickup = view.pickup;
      faqs = view.faqs;
    } else {
      const view = mapPrivateExcursionFullDetail(
        detail as PrivateExcursionFullDetail,
        locale,
        getDictionary(locale)
      );
      itinerary = view.itinerary.map((stop) => ({ name: stop.title, description: stop.description }));
      price = view.adultPrice > 0 ? view.adultPrice : null;
      currency = view.currency || "USD";
      rating = { ratingValue: view.rating, reviewCount: view.totalReviews };
      touristType = view.category;
    }

    return pageLevelGraph({
      locale,
      path,
      section: meta.dictNode,
      name: resolved.title,
      description: resolved.description,
      image: resolved.images[0],
      crumbs: [
        { name: dictText(locale, meta.crumbPath), path: `/${meta.folder}` },
        { name: resolved.title },
      ],
      entities: touristTrip({
        locale,
        kind,
        path,
        name: resolved.title,
        description: resolved.description,
        images: resolved.images,
        touristType,
        itinerary,
        price,
        currency,
        rating,
        ...(pickup ? { pickup } : {}),
        ...(faqs ? { faqs } : {}),
      }),
    });
  })
);

// ---------------------------------------------------------------------------
// Hotel deliveries
// ---------------------------------------------------------------------------

/**
 * A deliverable product: Product + Offer + published ratings. The price is read
 * as US dollars, which is how the catalogue stores it and how the cart prices it.
 */
export const productDetailGraph = cache(async (
  locale: string,
  slug: string
): Promise<JsonLdObject[]> =>
  guard(async () => {
    const resolved = await getProductForPath(slug, locale);
    if (!resolved) return [];

    const { product } = resolved;
    const path = hotelDeliveryPath(product.id);
    const images = productImages(product);

    const reviews = await getProductReviews({
      productId: product.id,
      isPublished: true,
      pageNumber: 1,
      pageSize: REVIEW_SAMPLE_SIZE,
    }).catch(() => null);
    const page = readPaged<{ rate?: number; isPublished?: boolean }>(reviews);
    const rating = summarizeRatings(
      page.items.filter((review) => review?.isPublished !== false),
      "rate",
      page.totalCount
    );

    const subcategory = await getProductSubcategoryById(product.subCategoryId, locale).catch(
      () => null
    );
    const category = trimmed(subcategory?.data?.name);

    return pageLevelGraph({
      locale,
      path,
      section: "hotelDeliveriesPage.details",
      name: product.title,
      description: product.subTitle,
      image: images[0],
      crumbs: [
        { name: dictText(locale, "nav.hotelDeliveries"), path: "/hotel-deliveries" },
        { name: product.title },
      ],
      entities: [
        productSchema({
          locale,
          path,
          name: product.title,
          description: product.subTitle,
          images,
          price: product.price,
          currency: "USD",
          category,
          rating,
        }),
      ],
    });
  })
);

// ---------------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------------

/**
 * A blog post. No date is emitted: the backend returns none for a blog, and an
 * invented `datePublished` is both a rich-result violation and a false claim
 * about freshness.
 */
export const blogDetailGraph = cache(async (
  locale: string,
  id: string
): Promise<JsonLdObject[]> =>
  guard(async () => {
    const blog = await getBlogForPath(id, locale);
    if (!blog) return [];

    const path = blogPath(blog.id);
    const image = blogImage(blog);

    return pageLevelGraph({
      locale,
      path,
      section: "blogs.detail",
      name: blog.title,
      description: blog.description,
      image,
      crumbs: [{ name: dictText(locale, "nav.blogs"), path: "/Blogs" }, { name: blog.title }],
      entities: [
        blogPosting({
          locale,
          path,
          headline: blog.title,
          description: blog.description,
          ...(image ? { image } : {}),
        }),
      ],
    });
  })
);
