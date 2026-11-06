// ---------------------------------------------------------------------------
// "Does this detail URL point at real content?" - answered before the page renders.
//
// A detail route cannot decide its own status code. With partial prerendering the
// static shell (the layout plus a placeholder for the route's dynamic hole) is put on
// the wire with HTTP 200 before that hole is filled in, so the notFound() the page
// wrapper calls only manages to add the <meta name="robots" content="noindex"> tag -
// the response is still a soft 404. The documented way to get a real 404 for a
// request-time check is to run it in proxy.ts, which is what this module serves.
// (The pages keep their own notFound() call regardless: it is what a client-side
// navigation and the streamed body still need, and what keeps the not-found UI.)
//
// The verdict comes from the same list endpoints the sitemap enumerates and the
// detail loaders read, so a URL this module denies can never be a URL the app
// publishes itself. Two rules keep the answer honest:
//
//   1. Evidence only. An index that could not be built (the backend did not answer)
//      reports "present", because guessing would take the whole catalogue offline.
//   2. Fresh evidence on a miss. An item created in the admin UI after the index was
//      built is not in it, so a miss re-reads the list once - rate limited to one
//      re-read per source per REBUILD_COOLDOWN_MS, so a crawler probing random slugs
//      cannot turn every miss into a full catalogue sweep.
//
// Server-only (it reads the backend), imported by proxy.ts.
// ---------------------------------------------------------------------------

import { getPublicBlogs } from "@/clientApi/blogApi";
import { getGroupExcursions } from "@/clientApi/groupExcursionApi";
import { getClientPrivateExcursions } from "@/clientApi/privateExcursionApi";
import { getProducts } from "@/clientApi/productApi";
import { getSiteServiceSubItems } from "@/clientApi/siteServiceItemApi";
import { SITE_SERVICES_CONFIG } from "@/components/UserComp/Services/config/siteServicesConfig";
import { hotelDeliveryIdFromSlug } from "@/shared/utils/contentUrl";
import { cachedValue } from "@/shared/utils/serverCache";
import { DEFAULT_LOCALE, isLocale } from "@/shared/utils/siteConfig";
import {
  isServiceSectionSlug,
  serviceItemSlug,
  type ServiceSectionSlug,
} from "@/shared/utils/serviceItemUrl";

/** One build of an index stays the answer for this long. */
const INDEX_TTL_MS = 30 * 60 * 1000;
/** Minimum gap between two re-reads of the same source, both on a miss. */
const REBUILD_COOLDOWN_MS = 30 * 1000;
/** Items per backend page while enumerating. */
const PAGE_SIZE = 100;
/** Crawl guard: a misbehaving hasNextPage must not turn the loop into a long one. */
const MAX_PAGES = 25;

/** section route segment -> the parent service key holding its backend id */
const SERVICE_CONFIG_KEY: Record<ServiceSectionSlug, keyof typeof SITE_SERVICES_CONFIG> = {
  tourist: "touristServices",
  "car-rental": "carRental",
  "vip-airport": "vipAirport",
  "real-estate": "realEstate",
};

export type DetailPresence =
  /** the path is not a content detail route, so nothing is decided here */
  | "notDetail"
  /** the catalogue knows this key, or there is no evidence that it does not */
  | "present"
  /** the catalogue was read and has no such item: the URL is a 404 */
  | "absent";

/** What one detail URL has to be looked up in, and under which key. */
interface DetailLookup {
  /** identity of the index, also its cache key */
  source: string;
  /** the segment as published (lower-cased, so a GUID's case never matters) */
  key: string;
  build: () => Promise<Set<string>>;
}

// ---------------------------------------------------------------------------
// Index builders. Each throws if the backend cannot be reached (that is reported
// as "no evidence"), and returns the set of URL segments that resolve to a row.
// ---------------------------------------------------------------------------

/**
 * The service items of one section, exactly as the detail loader sees them: the same
 * single page of at most 200 active rows, keyed by both the readable slug and the
 * sub-item GUID.
 */
async function serviceItemIndex(
  section: ServiceSectionSlug,
  locale: string
): Promise<Set<string>> {
  const serviceId = SITE_SERVICES_CONFIG[SERVICE_CONFIG_KEY[section]].id;
  const res = await getSiteServiceSubItems({
    serviceId,
    lang: locale,
    pageSize: 200,
    isActive: true,
  });
  const keys = new Set<string>();
  for (const item of res.data?.items ?? []) {
    if (item.isDeleted) continue;
    keys.add(serviceItemSlug(item).toLowerCase());
    keys.add(item.id.toLowerCase());
  }
  return keys;
}

/**
 * Group and private excursions. Unlike the sitemap, an inactive row is indexed: the
 * loader keeps a hidden excursion reachable (a booking link may still point at it) and
 * only takes it out of the index, so this check must not be stricter than the page.
 */
async function excursionIndex(
  kind: "group" | "private",
  locale: string
): Promise<Set<string>> {
  const keys = new Set<string>();
  for (let pageNumber = 1; pageNumber <= MAX_PAGES; pageNumber++) {
    const res =
      kind === "group"
        ? await getGroupExcursions({
            lang: locale,
            currency: "USD",
            page: pageNumber,
            pageSize: PAGE_SIZE,
          })
        : await getClientPrivateExcursions({
            lang: locale,
            currency: "USD",
            page: pageNumber,
            pageSize: PAGE_SIZE,
          });
    const rows = res?.items ?? [];
    for (const row of rows) {
      if (!row?.id) continue;
      keys.add(String(row.id).toLowerCase());
      const slug = (row.slug ?? "").trim();
      if (slug) keys.add(slug.toLowerCase());
    }
    if (!res?.hasNextPage || rows.length === 0) break;
  }
  return keys;
}

/** Hotel-delivery products, keyed by the numeric id the route resolves. */
async function productIndex(): Promise<Set<string>> {
  const keys = new Set<string>();
  for (let pageNumber = 1; pageNumber <= MAX_PAGES; pageNumber++) {
    const res = await getProducts({
      language: DEFAULT_LOCALE,
      pageNumber,
      pageSize: PAGE_SIZE,
    });
    const data = res?.data;
    const rows = data?.items ?? [];
    for (const row of rows) {
      if (row?.isDeleted || row?.id === undefined) continue;
      keys.add(String(row.id));
    }
    if (!data?.hasNextPage || rows.length === 0) break;
  }
  return keys;
}

/** Blog posts, keyed by the GUID the route resolves. */
async function blogIndex(): Promise<Set<string>> {
  const keys = new Set<string>();
  for (let pageNumber = 1; pageNumber <= MAX_PAGES; pageNumber++) {
    const res = await getPublicBlogs({ pageNumber, pageSize: PAGE_SIZE }, DEFAULT_LOCALE);
    const data = res?.data;
    const rows = data?.items ?? [];
    for (const row of rows) {
      if (!row?.id) continue;
      keys.add(String(row.id).toLowerCase());
    }
    if (!data?.hasNextPage || rows.length === 0) break;
  }
  return keys;
}

// ---------------------------------------------------------------------------
// Path parsing
// ---------------------------------------------------------------------------

function segment(value: string): string {
  try {
    return decodeURIComponent(value).trim().toLowerCase();
  } catch {
    // a malformed escape is not a key any page can resolve
    return "";
  }
}

/**
 * The lookup for one pathname, or null when the path is not a content detail route.
 * Only the four families whose [slug]/[id] segment is resolved against the backend
 * are described here; every other route is left to Next.js.
 */
function lookupFor(pathname: string): DetailLookup | null {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length < 3) return null;

  const locale = parts[0];
  if (!isLocale(locale)) return null;

  // /{locale}/services/{section}/{slug} is four segments, every other detail
  // route is three
  const folder = parts[1];
  if (parts.length === 4 && folder === "services") {
    if (!isServiceSectionSlug(parts[2])) return null;
    const key = segment(parts[3]);
    if (!key) return null;
    const section = parts[2] as ServiceSectionSlug;
    return {
      source: `presence:service:${section}:${locale}`,
      key,
      build: () => serviceItemIndex(section, locale),
    };
  }
  if (parts.length !== 3) return null;

  const key = segment(parts[2]);
  if (!key) return null;

  if (folder === "group-excursions" || folder === "private-excursions") {
    const kind = folder === "group-excursions" ? "group" : "private";
    return {
      source: `presence:excursion:${kind}:${locale}`,
      key,
      build: () => excursionIndex(kind, locale),
    };
  }

  if (folder === "hotel-deliveries") {
    // the route takes a bare id and the legacy "{name}-{id}" form alike, so the
    // key is the id either way; a segment with no id cannot resolve and simply
    // never matches the index
    const id = hotelDeliveryIdFromSlug(key);
    return {
      source: "presence:product",
      key: id ? String(id) : key,
      build: productIndex,
    };
  }

  if (folder === "Blogs") {
    return { source: "presence:blog", key, build: blogIndex };
  }

  return null;
}

// ---------------------------------------------------------------------------
// Verdict
// ---------------------------------------------------------------------------

/** When an index was last re-read because of a miss, so misses stay cheap. */
const lastRebuildAt = new Map<string, number>();

async function readIndex(lookup: DetailLookup): Promise<Set<string> | null> {
  try {
    return await cachedValue(lookup.source, INDEX_TTL_MS, lookup.build);
  } catch {
    // no evidence: the page is allowed to render and answer for itself
    return null;
  }
}

/**
 * `absent` only after a second read of the same source has confirmed the miss, and
 * never while that re-read is inside its cooldown window (the index that just missed
 * the key is fresh evidence in that case).
 */
async function confirmMiss(lookup: DetailLookup): Promise<DetailPresence> {
  const since = Date.now() - (lastRebuildAt.get(lookup.source) ?? -Infinity);
  if (since < REBUILD_COOLDOWN_MS) return "absent";

  lastRebuildAt.set(lookup.source, Date.now());
  try {
    const fresh = await cachedValue(lookup.source, INDEX_TTL_MS, lookup.build, {
      force: true,
    });
    return fresh.has(lookup.key) ? "present" : "absent";
  } catch {
    // the confirmation could not be read either, so the miss stays unproven
    return "present";
  }
}

/**
 * Whether a detail URL names content the catalogue actually holds. proxy.ts answers
 * `absent` with a real 404; every other verdict leaves the request alone.
 */
export async function detailPathPresence(pathname: string): Promise<DetailPresence> {
  const lookup = lookupFor(pathname);
  if (!lookup) return "notDetail";

  const index = await readIndex(lookup);
  if (index === null) return "present";
  if (index.has(lookup.key)) return "present";
  return confirmMiss(lookup);
}
