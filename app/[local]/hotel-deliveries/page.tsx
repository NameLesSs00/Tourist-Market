import { Suspense } from "react";
import type { Metadata } from "next";
import { HotelDeliveriesSection } from "@/components/UserComp/HotelDeliveries";
import { getDictionary } from "@/shared/utils/getDictionary";

export const instant = false;

export function generateMetadata({
  params,
}: {
  params: Promise<{ local: string }>;
}): Promise<Metadata> {
  return params.then(({ local }) => {
    const meta = getDictionary(local).hotelDeliveriesPage.meta;
    return {
      title: meta.listTitle,
      description: meta.listDescription,
    };
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

export default function LocalHotelDeliveriesPage(props: PageProps) {
  return (
    <Suspense fallback={<HotelDeliveriesSection locale="en" />}>
      <HotelDeliveriesResolved {...props} />
    </Suspense>
  );
}
