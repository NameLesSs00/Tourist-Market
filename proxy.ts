import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/shared/utils/siteConfig";
import { SERVICE_ITEM_SLUGS } from "@/shared/data/serviceItemSlugs";
import { detailPathPresence } from "@/shared/utils/detailPresence.server";
import {
  legacyLookupFamily,
  legacyLookupKey,
  legacyStaticRedirect,
} from "@/shared/utils/legacyRedirects";
import { legacyLookupTarget } from "@/shared/utils/legacyLookups.server";

const LOCALES: string[] = SUPPORTED_LOCALES;
const DEFAULT = DEFAULT_LOCALE;

/**
 * `/{locale}/services/{section}/{guid}` - the URL form this app published before the
 * service items got readable slugs. Every GUID the seed table knows is 301'd here,
 * without touching the backend, so that the published and indexed links keep their
 * PageRank and one canonical URL per item survives.
 */
const LEGACY_SERVICE_ITEM_RE =
  /^\/(en|fr|de|ru)\/(services)\/(tourist|car-rental|vip-airport|real-estate)\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\/?$/i;

function legacyServiceItemRedirect(pathname: string): string | null {
  const match = LEGACY_SERVICE_ITEM_RE.exec(pathname);
  if (!match) return null;
  const [, locale, , section, id] = match;
  const slug = SERVICE_ITEM_SLUGS[id.toLowerCase()];
  if (!slug) return null;
  return `/${locale}/services/${section}/${slug}`;
}

/**
 * A path no route can match, prefixed with the locale the visitor asked for so that
 * app/global-not-found.tsx can still localise the copy it renders. Rewriting to it is
 * how a dead detail URL is answered here: the not-found document then arrives with a
 * real 404 status, which the page itself cannot produce - by the time its lookup knows
 * the item is missing, partial prerendering has already sent the shell with HTTP 200.
 */
const NOT_FOUND_SENTINEL = "/__not-found__";

function localeOf(pathname: string): string {
  const [, first] = pathname.split("/");
  return LOCALES.includes(first) ? first : DEFAULT;
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 0. Legacy PHP site (touristmarket-egypt.com) -> this app, permanently moved.
  //    Handled before anything else, because these paths are not routes here and
  //    the locale negotiation below would otherwise turn them into a 404.
  const staticTarget = legacyStaticRedirect(pathname);
  if (staticTarget) {
    return NextResponse.redirect(new URL(staticTarget, request.url), 301);
  }

  const itemTarget = legacyServiceItemRedirect(pathname);
  if (itemTarget) {
    return NextResponse.redirect(new URL(itemTarget, request.url), 301);
  }

  const family = legacyLookupFamily(pathname);
  if (family) {
    const target = await legacyLookupTarget(
      family,
      legacyLookupKey(family, pathname, search)
    );
    return NextResponse.redirect(new URL(target, request.url), 301);
  }

  // 1. Admin Authentication Route Guard
  if (pathname.startsWith("/admin")) {
    const adminToken = request.cookies.get("admin_token")?.value;
    const isLoginPage = pathname === "/admin/login" || pathname === "/admin/login/";

    // If already authenticated with token, prevent access to login page -> redirect to dashboard
    if (isLoginPage && adminToken) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    // If unauthenticated, prevent access to dashboard or admin subpages -> redirect to login
    if (!isLoginPage && !adminToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // If navigating to root /admin with token -> redirect to dashboard
    if (pathname === "/admin" || pathname === "/admin/") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    return NextResponse.next();
  }

  // 2. Public / Client Route Locale Handling
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // A detail URL the catalogue does not know is a 404, and the status has to be
    // settled before the route renders (see NOT_FOUND_SENTINEL). Everything else -
    // including a lookup that could not be answered because the backend is silent -
    // is left to the page, whose own notFound() still draws the not-found document.
    const presence = await detailPathPresence(pathname);
    if (presence === "absent") {
      return NextResponse.rewrite(
        new URL(`/${localeOf(pathname)}${NOT_FOUND_SENTINEL}`, request.url)
      );
    }
    return NextResponse.next();
  }

  // Determine locale from cookie or accept-language header
  let locale = request.cookies.get("NEXT_LOCALE")?.value;
  if (!locale || !LOCALES.includes(locale)) {
    const acceptLanguage = request.headers.get("accept-language");
    if (acceptLanguage) {
      const preferred = acceptLanguage
        .split(",")
        .map((lang) => lang.split(";")[0].trim().toLowerCase().substring(0, 2))
        .find((lang) => LOCALES.includes(lang));
      if (preferred) {
        locale = preferred;
      }
    }
  }

  const targetLocale = locale || DEFAULT;

  // Redirect to /[locale]
  const newUrl = new URL(
    `/${targetLocale}${pathname === "/" ? "" : pathname}`,
    request.url
  );
  newUrl.search = request.nextUrl.search;
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static, _next/image, _next/data
     * - api routes (/api/*)
     * - icon.svg, favicon.ico
     * - public assets (/flags, /homepage, /shared, /admin/*.png)
     * - files with extensions (.*\\..*)
     *
     * The second entry re-admits /pages/*, which the legacy PHP site used for every
     * one of its detail and static pages: those URLs carry a dot, so the extension
     * rule above would otherwise keep them out of the redirect map.
     */
    "/((?!api|_next|flags|homepage|shared|icon\\.svg|favicon\\.ico|.*\\..*).*)",
    "/pages/:path*",
  ],
};
