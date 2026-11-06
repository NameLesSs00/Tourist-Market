import type { Metadata } from "next";
import { NotFoundComp } from "@/components/UserComp/NotFound";

// ---------------------------------------------------------------------------
// 404 boundary of the public locale tree. It renders inside app/[local]/layout.tsx,
// so the document already carries the right <html lang>.
//
// A not-found boundary receives no params, so its <title> cannot be looked up in
// the dictionary; NotFoundComp renders the visible copy in the visitor's own
// locale from the URL instead. The page is never indexed anyway, so the robots
// directive is what matters here.
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: { absolute: "Page Not Found | Egypt Tourist Market" },
  description:
    "The requested page could not be found. Discover Egypt tours, excursions, transfers and services in Hurghada.",
  robots: { index: false, follow: true },
};

export default function LocalNotFoundPage() {
  return <NotFoundComp />;
}
