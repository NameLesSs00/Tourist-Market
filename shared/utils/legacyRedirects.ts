// ---------------------------------------------------------------------------
// Legacy PHP site -> this app, the part that needs no data.
//
// The app replaces touristmarket-egypt.com, a single-language PHP site whose
// sitemap held 1659 URLs (audited in dataEntry/siteServices/legacy-sitemap-
// analysis.json). Every one of them has to keep answering, so proxy.ts asks this
// module first and only reaches for the API-backed lookups when the rule needs to
// know a slug. The old site was English-only, so every target lands on /en and
// hreflang takes care of the other three locales.
//
// Pure, synchronous and unit-testable: it returns null for anything it does not
// own, so a real route can never be shadowed by a redirect.
// ---------------------------------------------------------------------------

import { DEFAULT_LOCALE } from "./siteConfig";

/** The three families whose target depends on data held by the backend. */
export type LegacyLookupFamily = "service" | "blog" | "product";

/**
 * Exact page-for-page replacements, including the eight /pages/*.php files the old
 * sitemap published.
 */
const STATIC_PAGES: Record<string, string> = {
  "/pages/about.php": `/${DEFAULT_LOCALE}/About`,
  "/pages/contact.php": `/${DEFAULT_LOCALE}/Contact`,
  "/pages/static/faq.php": `/${DEFAULT_LOCALE}/faq`,
  "/pages/privacy-policy.php": `/${DEFAULT_LOCALE}/privacy`,
  "/pages/transfer.php": `/${DEFAULT_LOCALE}/services/transfer`,
  "/pages/shop/index.php": `/${DEFAULT_LOCALE}/hotel-deliveries`,
  "/pages/blog/index.php": `/${DEFAULT_LOCALE}/Blogs`,
  "/pages/sections.php": `/${DEFAULT_LOCALE}`,
  "/pages/index.php": `/${DEFAULT_LOCALE}`,
  "/blog": `/${DEFAULT_LOCALE}/Blogs`,
  "/product": `/${DEFAULT_LOCALE}/hotel-deliveries`,
  // the four catalogue landing pages, published without a locale prefix
  "/tourist-services": `/${DEFAULT_LOCALE}/services/tourist`,
  "/car-rental": `/${DEFAULT_LOCALE}/services/car-rental`,
  "/vip-services-hurghada-airport": `/${DEFAULT_LOCALE}/services/vip-airport`,
  "/red-sea-real-estate": `/${DEFAULT_LOCALE}/services/real-estate`,
};

/** Legacy list pages that map 1:1 onto a detail route, keeping their own slug. */
const STATIC_PREFIXES: Record<string, string> = {
  "/group-excursion/": `/${DEFAULT_LOCALE}/group-excursions/`,
  "/private-excursion/": `/${DEFAULT_LOCALE}/private-excursions/`,
};

/** Where each lookup family lands when its slug cannot be resolved. */
const LOOKUP_FALLBACKS: Record<LegacyLookupFamily, string> = {
  service: `/${DEFAULT_LOCALE}/services/tourist`,
  blog: `/${DEFAULT_LOCALE}/Blogs`,
  product: `/${DEFAULT_LOCALE}/hotel-deliveries`,
};

/** `/pages/service-details.php`, `/blog/x`, `/product/x` - never a real route here. */
const LOOKUP_ROUTES: Record<string, LegacyLookupFamily> = {
  "/pages/service-details.php": "service",
  "/blog": "blog",
  "/product": "product",
};

/** The query key that carried the item slug on the old service detail page. */
const LEGACY_SLUG_KEYS = ["slug", "id", "p", "post"];

function stripTrailingSlash(path: string): string {
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

/** True when the path belongs to a route this app actually serves. */
function isOwnRoute(pathname: string): boolean {
  return (
    pathname === `/${DEFAULT_LOCALE}` ||
    pathname.startsWith(`/${DEFAULT_LOCALE}/`) ||
    /^\/(en|fr|de|ru)(\/|$)/.test(pathname) ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api")
  );
}

/**
 * The redirect this path needs without asking the backend, or null when the request
 * belongs to a real route (or to a lookup family, which returns null here and is
 * answered by legacyLookups.server.ts).
 */
export function legacyStaticRedirect(pathname: string): string | null {
  const path = stripTrailingSlash(pathname);
  if (!path || isOwnRoute(path)) return null;

  if (legacyLookupFamily(path)) return null;

  const exact = STATIC_PAGES[path];
  if (exact) return exact;

  for (const [prefix, target] of Object.entries(STATIC_PREFIXES)) {
    if (path.startsWith(prefix)) {
      const slug = decodeURIComponent(path.slice(prefix.length));
      // an empty /group-excursion/ list still has to land somewhere
      return slug ? `${target}${slug}` : target.replace(/\/$/, "");
    }
  }

  // Any other /pages/*.php file is legacy-only: the old site had more of them than
  // its sitemap admitted, and a 301 to the home page beats a 404 for a dead link.
  if (path.startsWith("/pages/")) return `/${DEFAULT_LOCALE}`;

  return null;
}

/** Which slug-based lookup a path needs, or null when it is not a legacy item URL. */
export function legacyLookupFamily(pathname: string): LegacyLookupFamily | null {
  const path = stripTrailingSlash(pathname);
  if (!path) return null;
  if (path.startsWith("/pages/")) {
    return LOOKUP_ROUTES[path] ?? null;
  }
  const first = `/${path.split("/")[1] ?? ""}`;
  // /blog/{slug} and /product/{slug}; the bare list forms are already static
  if (LOOKUP_ROUTES[first] && path.split("/").length > 2) {
    return LOOKUP_ROUTES[first];
  }
  return null;
}

/**
 * The slug a legacy item URL asked for: the `?slug=` query for the PHP detail page,
 * otherwise the last path segment (`/blog/welcome-to-red-sea`).
 */
export function legacyLookupKey(family: LegacyLookupFamily, pathname: string, query: string): string {
  const params = new URLSearchParams(query);
  for (const key of LEGACY_SLUG_KEYS) {
    const value = params.get(key);
    if (value) return decodeURIComponent(value.trim());
  }
  const segments = stripTrailingSlash(pathname).split("/").filter(Boolean);
  return decodeURIComponent(segments[segments.length - 1] ?? "");
}

/** Indexable target for a slug that has no counterpart in this catalogue. */
export function legacyLookupFallback(family: LegacyLookupFamily): string {
  return LOOKUP_FALLBACKS[family];
}
