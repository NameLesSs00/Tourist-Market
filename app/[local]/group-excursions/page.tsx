import { Suspense } from "react";
import type { Metadata } from "next";
import { GroupExcursionsSection } from "@/components/UserComp/GroupExcursions";
import { FallbackHeadingScope } from "@/components/UserComp/Shared/ContentHeading";
import { JsonLd } from "@/components/UserComp/Shared/JsonLd";
import { listPageGraph } from "@/features/seo/structuredData";
import { buildMetadata } from "@/shared/utils/localizedMetadata";

export const instant = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { local } = await params;
  return buildMetadata({
    locale: local,
    path: "/group-excursions",
    section: "groupExcursions",
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

async function GroupExcursionsResolved({ params }: PageProps) {
  const { local } = await params;
  return <GroupExcursionsSection locale={local} />;
}

export default async function LocalGroupExcursionsPage(props: PageProps) {
  const { local } = await props.params;
  return (
    <>
      {/*
        WebPage + BreadcrumbList; the excursions themselves are marked up on their
        detail pages. In the shell, not in the hole, so a postponed boundary cannot
        hide it.
      */}
      <JsonLd data={listPageGraph(local, "groupExcursions")} />
      <Suspense
        fallback={
          // the fallback repeats the hero tree, so its heading is demoted here
          <FallbackHeadingScope>
            <GroupExcursionsSection locale="en" />
          </FallbackHeadingScope>
        }
      >
        <GroupExcursionsResolved {...props} />
      </Suspense>
    </>
  );
}
