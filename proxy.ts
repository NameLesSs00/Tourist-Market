import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED_LOCALES = ["en", "fr", "de", "ru"];
const DEFAULT_LOCALE = "en";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
  const pathnameHasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Determine locale from cookie or accept-language header
  let locale = request.cookies.get("NEXT_LOCALE")?.value;
  if (!locale || !SUPPORTED_LOCALES.includes(locale)) {
    const acceptLanguage = request.headers.get("accept-language");
    if (acceptLanguage) {
      const preferred = acceptLanguage
        .split(",")
        .map((lang) => lang.split(";")[0].trim().toLowerCase().substring(0, 2))
        .find((lang) => SUPPORTED_LOCALES.includes(lang));
      if (preferred) {
        locale = preferred;
      }
    }
  }

  const targetLocale = locale || DEFAULT_LOCALE;

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
     */
    "/((?!api|_next|flags|homepage|shared|icon\\.svg|favicon\\.ico|.*\\..*).*)",
  ],
};
