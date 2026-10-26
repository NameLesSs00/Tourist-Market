import { Suspense } from "react";
import type { Metadata } from "next";
import { HotelDeliveriesSection } from "@/components/UserComp/HotelDeliveries";

export const instant = false;

export const metadata: Metadata = {
  title: "Hotel Deliveries | Egypt Tourist Market",
  description:
    "Enjoy a seamless stay with essential services delivered right to your hotel. From everyday conveniences to thoughtful extras.",
};

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
