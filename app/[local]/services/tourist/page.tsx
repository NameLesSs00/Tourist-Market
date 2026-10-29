import { Suspense } from "react";
import type { Metadata } from "next";
import { TouristServicesSection } from "@/components/UserComp/Services";

export const metadata: Metadata = {
  title: "Tourist Services | Egypt Tourist Market",
  description:
    "Innovative services and solutions, that make your vacation in Egypt comfortable and free of any worries or stress.",
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
