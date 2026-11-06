import { Suspense } from "react";
import type { Metadata } from "next";
import { BlogsSection } from "@/components/UserComp/Blogs";
import { FallbackHeadingScope } from "@/components/UserComp/Shared/ContentHeading";
import { JsonLd } from "@/components/UserComp/Shared/JsonLd";
import { listPageGraph } from "@/features/seo/structuredData";
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
  searchParams: Promise<{
    page?: string | string[];
  }>;
}

/** Reads ?page=N, treating anything invalid or absent as page 1. */
function readPage(value?: string | string[]): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(raw ?? "", 10);
  return Number.isFinite(parsed) && parsed > 1 ? parsed : 1;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { local } = await params;
  const page = readPage((await searchParams).page);
  // paginated archives are indexed as distinct pages: page 2+ canonicalizes onto
  // its own ?page=N URL, while page 1 stays clean so it is the canonical archive
  return buildMetadata({
    locale: local,
    path: "/Blogs",
    section: "blogs",
    canonicalQuery: page > 1 ? { page } : null,
  });
}

async function BlogsResolved({ params, searchParams }: PageProps) {
  const { local } = await params;
  const page = readPage((await searchParams).page);
  return <BlogsSection locale={local} initialPage={page} />;
}

export default async function LocalBlogsPage(props: PageProps) {
  const { local } = await props.params;
  return (
    <>
      {/*
        Every archive page is marked up under the canonical URL of the archive
        (page 1), so ?page=2 never publishes a second WebPage for the same node.
        The graph is rendered in the shell, not in the hole, so a postponed
        boundary cannot hide it.
      */}
      <JsonLd data={listPageGraph(local, "blogs")} />
      <Suspense
        fallback={
          // the fallback repeats the hero tree, so its heading is demoted here
          <FallbackHeadingScope>
            <BlogsSection locale="en" />
          </FallbackHeadingScope>
        }
      >
        <BlogsResolved {...props} />
      </Suspense>
    </>
  );
}
