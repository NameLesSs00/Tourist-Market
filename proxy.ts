import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED_LOCALES = ["en", "fr", "de", "ru"];
const DEFAULT_LOCALE = "en";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname starts with any supported locale
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
     * - icon.svg, favicon.ico
     * - public assets (/flags, /homepage, /shared)
     * - admin routes (/admin)
     */
    "/((?!_next|flags|homepage|shared|icon\\.svg|favicon\\.ico|admin|.*\\..*).*)",
  ],
};
