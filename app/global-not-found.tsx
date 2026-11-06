import type { Metadata } from "next";
import "./globals.css";
import { NotFoundComp } from "@/components/UserComp/NotFound";
import { BRAND } from "@/shared/utils/siteConfig";
import { BODY_FONT_CLASSES, HTML_FONT_CLASSES } from "@/shared/utils/fonts";

// ---------------------------------------------------------------------------
// The document served for a real 404.
//
// app/[local]/not-found.tsx is the boundary inside the locale tree, but it can only
// answer a notFound() that runs before the response starts streaming, and under
// partial prerendering that is never the case for a request-time lookup (see
// shared/utils/detailPresence.server.ts). proxy.ts therefore answers an unknown
// detail URL by rewriting it to a path that has no route, and Next.js renders this
// file for it - the only not-found document that is guaranteed to arrive with the
// 404 status attached.
//
// It is a root document of its own: there is no layout above it, so it has to render
// <html>/<body> and import the global stylesheet, exactly like app/layout.tsx used
// to. It also receives no params, hence the fixed lang; NotFoundComp still localises
// the visible copy from the URL the visitor asked for.
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: { absolute: `Page Not Found | ${BRAND}` },
  description:
    "The requested page could not be found. Discover Egypt tours, excursions, transfers and services in Hurghada.",
  // never indexed, but the links out of it are followed: it is the crawler's way
  // back to the catalogue after a dead legacy URL
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={HTML_FONT_CLASSES}>
      <body className={BODY_FONT_CLASSES}>
        <main className="flex-1">
          <NotFoundComp />
        </main>
      </body>
    </html>
  );
}
