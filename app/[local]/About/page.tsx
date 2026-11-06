import { Suspense } from "react";
import type { Metadata } from "next";
import { AboutSection } from "@/components/UserComp/About";
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
  return buildMetadata({ locale: local, path: "/About", section: "about" });
}

async function AboutResolved({ params }: PageProps) {
  const { local } = await params;
  return <AboutSection locale={local} />;
}

export default async function LocalAboutPage(props: PageProps) {
  const { local } = await props.params;
  return (
    <>
      {/*
        The graph reads nothing from the catalogue, so it belongs in the shell and not
        in the hole: a boundary the prerender postpones would otherwise deliver the
        structured data only inside the client payload, where a crawler that does not
        execute JavaScript never sees it.
      */}
      <JsonLd data={staticPageGraph(local, "/About", "about", "nav.about")} />
      <Suspense fallback={<AboutSection locale="en" />}>
        <AboutResolved {...props} />
      </Suspense>
    </>
  );
}
