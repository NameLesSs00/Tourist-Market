import { Suspense } from "react";
import type { Metadata } from "next";
import { TouristServicesSection } from "@/components/UserComp/Services";
import { localizedMetadata } from "@/shared/utils/localizedMetadata";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { local } = await params;
  return localizedMetadata(local, "touristServices");
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

async function TouristServicesResolved({ params }: PageProps) {
  const { local } = await params;
  return <TouristServicesSection locale={local} />;
}

export default function TouristServicesPage(props: PageProps) {
  return (
    <Suspense fallback={<TouristServicesSection locale="en" />}>
      <TouristServicesResolved {...props} />
    </Suspense>
  );
}
