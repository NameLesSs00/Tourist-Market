import { Suspense } from "react";
import type { Metadata } from "next";
import { VipAirportSection } from "@/components/UserComp/Services";
import { localizedMetadata } from "@/shared/utils/localizedMetadata";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { local } = await params;
  return localizedMetadata(local, "vipAirport");
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
