import { Suspense } from "react";
import type { Metadata } from "next";
import { HotelDeliveriesSection } from "@/components/UserComp/HotelDeliveries";
import { FallbackHeadingScope } from "@/components/UserComp/Shared/ContentHeading";
import { JsonLd } from "@/components/UserComp/Shared/JsonLd";
import { listPageGraph } from "@/features/seo/structuredData";
import { buildMetadata } from "@/shared/utils/localizedMetadata";

export const instant = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ local: string }>;
}): Promise<Metadata> {
  const { local } = await params;
  return buildMetadata({
    locale: local,
    path: "/hotel-deliveries",
    section: "hotelDeliveriesPage",
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

async function HotelDeliveriesResolved({ params }: PageProps) {
  const { local } = await params;
  return <HotelDeliveriesSection locale={local} />;
}

export default async function LocalHotelDeliveriesPage(props: PageProps) {
  const { local } = await props.params;
  return (
    <>
      {/*
        WebPage + BreadcrumbList; each product is marked up on its own detail page.
        Rendered in the shell, not in the hole, so a postponed boundary cannot hide it.
      */}
      <JsonLd data={listPageGraph(local, "hotelDeliveries")} />
      <Suspense
        fallback={
          // the fallback repeats the hero tree, so its heading is demoted here
          <FallbackHeadingScope>
            <HotelDeliveriesSection locale="en" />
          </FallbackHeadingScope>
        }
      >
        <HotelDeliveriesResolved {...props} />
      </Suspense>
    </>
  );
}
