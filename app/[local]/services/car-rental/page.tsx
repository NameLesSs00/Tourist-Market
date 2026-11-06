import { Suspense } from "react";
import type { Metadata } from "next";
import { CarRentalSection } from "@/components/UserComp/Services";
import { StructuredData } from "@/components/UserComp/Shared/JsonLd";
import { FallbackHeadingScope } from "@/components/UserComp/Shared/ContentHeading";
import { serviceListGraph } from "@/features/seo/structuredData";
import { buildMetadata } from "@/shared/utils/localizedMetadata";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { local } = await params;
  return buildMetadata({ locale: local, path: "/services/car-rental", section: "carRental" });
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

async function CarRentalResolved({ params }: PageProps) {
  const { local } = await params;
  return (
    <>
      <CarRentalSection locale={local} />
      {/* CollectionPage + ItemList of exactly the items this section lists */}
      <StructuredData graph={serviceListGraph(local, "car-rental")} />
    </>
  );
}

export default function CarRentalPage(props: PageProps) {
  return (
    <Suspense
      fallback={
        // the fallback repeats the section, so its heading is demoted here
        <FallbackHeadingScope>
          <CarRentalSection locale="en" />
        </FallbackHeadingScope>
      }
    >
      <CarRentalResolved {...props} />
    </Suspense>
  );
}
