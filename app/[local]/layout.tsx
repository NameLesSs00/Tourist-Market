import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import "../globals.css";
import { Header } from "@/components/UserComp/Header";
import { Footer } from "@/components/UserComp/Footer";
import { JsonLd } from "@/components/UserComp/Shared/JsonLd";
import { WhatsAppFloatingButton } from "@/components/UserComp/Shared/WhatsAppFloatingButton";
import { QueryProvider, ScrollToTop } from "@/shared/providers";
import { ClientDictionaryProvider } from "@/shared/providers/ClientDictionaryProvider";
import { BODY_FONT_CLASSES, HTML_FONT_CLASSES } from "@/shared/utils/fonts";
import { organization, webSite } from "@/shared/utils/jsonLd";
import { BRAND, SITE_ORIGIN, SUPPORTED_LOCALES, isLocale } from "@/shared/utils/siteConfig";

// ---------------------------------------------------------------------------
// Root layout of the public site.
//
// app/layout.tsx no longer exists: this app deliberately has several root
// layouts (this one for the locale tree, one for /admin), which is how <html
// lang> can follow the route - the Metadata API in this Next version has no
// `lang` field, so the language can only be set on the document element here.
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((local) => ({ local }));
}

/**
 * Site-wide defaults merged into every public page. Deliberately document-level
 * only: title, description, canonical, hreflang, Open Graph and robots belong to
 * the page itself (shared/utils/localizedMetadata.ts), so the layout can never
 * leak the home page's canonical onto a detail URL.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  applicationName: BRAND,
  publisher: BRAND,
  category: "travel",
  // Explicit tel:/mailto: links in the footer stay clickable; this only stops
  // Safari from auto-detecting numbers and addresses inside body copy.
  formatDetection: { telephone: false, address: false, email: false },
};

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ local: string }>;
}) {
  const { local } = await params;
  // a first path segment that is not a supported locale must be a real 404, not a
  // page that renders English content under a nonsense language prefix
  if (!isLocale(local)) notFound();

  return (
    <html lang={local} className={HTML_FONT_CLASSES}>
      <body className={BODY_FONT_CLASSES}>
        {/*
          The two site-wide JSON-LD nodes, rendered once for the whole locale tree:
          the Organization (one entity for the brand, never repeated per page) and
          the WebSite of this locale, which every page's WebPage points back to.
        */}
        <JsonLd data={[organization(), webSite(local)]} />
        {/*
          One dictionary for the whole client tree: the locale is resolved here and
          handed down, so the components below read their copy from context instead
          of importing the language module (which would ship all four languages in
          every chunk that reaches it).
        */}
        <ClientDictionaryProvider locale={local}>
          <QueryProvider>
            <ScrollToTop />
            <Suspense fallback={<div className="h-20 w-full" />}>
              <Header />
            </Suspense>
            <main className="flex-1 pt-20 min-h-[calc(100vh-5rem)]">{children}</main>
            <Footer />
            <WhatsAppFloatingButton />
            <Toaster
              richColors
              closeButton
              position="top-right"
              offset="90px"
              duration={4000}
              style={{ zIndex: 99999 }}
              toastOptions={{
                className: "font-poppins text-xs sm:text-sm shadow-xl",
              }}
            />
          </QueryProvider>
        </ClientDictionaryProvider>
      </body>
    </html>
  );
}
