import type { MetadataRoute } from "next";
import { IS_INDEXABLE, SITE_ORIGIN } from "@/shared/utils/siteConfig";

// ---------------------------------------------------------------------------
// /robots.txt
//
// Prerendered at build (no request-time API), so the answer a crawler reads is the
// answer the deployment was built for. `IS_INDEXABLE` is false on any host that is
// not the production domain and on every `next dev` run: a preview deploy then asks
// to be left alone entirely rather than half-indexing itself.
//
// The PHP block is kept from the site this app replaces, whose robots.txt disallowed
// /config/, /includes/ and /vendor/. Those URLs do not exist here and the legacy map
// 301s the /pages/*.php files that do, so the patterns stay disallowed for continuity
// and to keep a stray backlink from being crawled as a 404.
// ---------------------------------------------------------------------------

/** Paths that must never be crawled, whatever the environment. */
const DISALLOW = ["/admin", "/cart", "/api", "/_next/", "/*.php$", "/*?*_rsc*"];

export default function robots(): MetadataRoute.Robots {
  if (!IS_INDEXABLE) {
    return {
      rules: [{ userAgent: "*", disallow: ["/"] }],
      host: SITE_ORIGIN,
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW,
      },
    ],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: SITE_ORIGIN,
  };
}
