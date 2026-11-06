import { Suspense } from "react";
import type { Metadata } from "next";
import {
  HeroSection,
  GroupExcursionsHomeSection,
  PrivateExcursionsHomeSection,
  Services,
  BlogsHomeSection,
  FaqSection,
} from "@/components/UserComp/Home";
import { JsonLd } from "@/components/UserComp/Shared/JsonLd";
import { FallbackHeadingScope } from "@/components/UserComp/Shared/ContentHeading";
import { homeGraph } from "@/features/seo/structuredData";
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
  return buildMetadata({ locale: local, path: "/", section: "home" });
}

async function HomeResolved({ params }: PageProps) {
  const { local } = await params;
  return (
    <>
      <HeroSection locale={local} />
      <GroupExcursionsHomeSection locale={local} />
      <PrivateExcursionsHomeSection locale={local} />
      <Services locale={local} />
      <BlogsHomeSection locale={local} />
      <FaqSection locale={local} />
    </>
  );
}

export default async function LocalHomePage(props: PageProps) {
  const { local } = await props.params;
  return (
    <>
      {/*
        The home page is the only page without a breadcrumb: it is the trail root.
        Rendered in the shell, not in the hole, so a postponed boundary cannot hide it.
      */}
      <JsonLd data={homeGraph(local)} />
      {/*
        The fallback repeats the hero tree in the same document, so its heading is
        demoted inside this scope: the bytes then carry exactly one `<h1>`. The real
        locale is passed because the fallback also paints links, and an English
        prefix on a French home page is a trail a crawler can follow into the wrong
        language.
      */}
      <Suspense
        fallback={
          <FallbackHeadingScope>
            <HeroSection locale={local} />
          </FallbackHeadingScope>
        }
      >
        <HomeResolved {...props} />
      </Suspense>
    </>
  );
}
