import { Suspense } from "react";
import type { Metadata } from "next";
import { VipAirportSection } from "@/components/UserComp/Services";

export const metadata: Metadata = {
  title: "VIP Hurghada Airport Services | Egypt Tourist Market",
  description:
    "Elevate your Hurghada departure with our seamless, exclusive VIP airport services.",
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

async function VipAirportResolved({ params }: PageProps) {
  const { local } = await params;
  return <VipAirportSection locale={local} />;
}

export default function VipAirportPage(props: PageProps) {
  return (
    <Suspense fallback={<VipAirportSection locale="en" />}>
      <VipAirportResolved {...props} />
    </Suspense>
  );
}
