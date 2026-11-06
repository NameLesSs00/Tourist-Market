import { Suspense } from "react";
import type { Metadata } from "next";
import {
  PrivateExcursionsSection,
  PrivateExcursionsHero,
} from "@/components/UserComp/PrivateExcursions";
import { JsonLd } from "@/components/UserComp/Shared/JsonLd";
import { listPageGraph } from "@/features/seo/structuredData";
import { buildMetadata } from "@/shared/utils/localizedMetadata";

export const instant = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { local } = await params;
  // filter facets are followed but never self-canonicalized: the canonical always
  // points at the unfiltered list, so the facet space cannot create duplicates
  return buildMetadata({
    locale: local,
    path: "/private-excursions",
    section: "privateExcursions",
  });
}

export function generateStaticParams() {
  return [
    { local: "en" },
    { local: "fr" },
    { local: "de" },
    { local: "ru" },
  ];
}

interface PageProps {
  params: Promise<{
    local: string;
  }>;
}

async function PrivateExcursionsResolved({ params }: PageProps) {
  const { local } = await params;
  return <PrivateExcursionsSection locale={local} />;
}

export default async function LocalPrivateExcursionsKebabPage(props: PageProps) {
  const { local } = await props.params;
  return (
    <>
      {/*
        WebPage + BreadcrumbList; the excursions themselves are marked up on their
        detail pages. In the shell, not in the hole, so a postponed boundary cannot
        hide it.
      */}
      <JsonLd data={listPageGraph(local, "privateExcursions")} />
      {/*
        The fallback paints the hero the section starts with, inside the same cream
        wrapper: the boundary below is postponed, so without it the delivered HTML
        would carry no heading at all. It keeps the real heading element (unlike the
        lists whose fallback repeats the whole section) because here the resolved
        copy reaches the browser as data, not as markup, and cannot double the `<h1>`.
      */}
      <Suspense
        fallback={
          <div className="w-full min-h-screen bg-[#FFF8ED] text-[#0E4A68] font-poppins">
            <PrivateExcursionsHero locale={local} />
          </div>
        }
      >
        <PrivateExcursionsResolved {...props} />
      </Suspense>
    </>
  );
}
