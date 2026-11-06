import { Suspense } from "react";
import type { Metadata } from "next";
import { PrivacyPageSection } from "@/components/UserComp/Privacy";
import { JsonLd } from "@/components/UserComp/Shared/JsonLd";
import { staticPageGraph } from "@/features/seo/structuredData";
import { buildMetadata } from "@/shared/utils/localizedMetadata";

export const instant = false;

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { local } = await params;
  return buildMetadata({ locale: local, path: "/privacy", section: "privacy" });
}

async function PrivacyResolved({ params }: PageProps) {
  const { local } = await params;
  return <PrivacyPageSection locale={local} />;
}

export default async function LocalPrivacyPage(props: PageProps) {
  const { local } = await props.params;
  return (
    <>
      {/*
        Rendered in the shell, not in the hole, so a postponed boundary cannot hide it.
        The crumb is the page's own title: the navigation has no privacy entry.
      */}
      <JsonLd data={staticPageGraph(local, "/privacy", "privacy", "privacy.metadataTitle")} />
      <Suspense fallback={<PrivacyPageSection locale="en" />}>
        <PrivacyResolved {...props} />
      </Suspense>
    </>
  );
}

