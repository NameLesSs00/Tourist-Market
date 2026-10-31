import { Suspense } from "react";
import type { Metadata } from "next";
import { RealEstateSection } from "@/components/UserComp/Services";

export const metadata: Metadata = {
  title: "Red Sea Real Estate | Egypt Tourist Market",
  description:
    "Do you dream of owning a piece of Red Sea paradise? We are here to guide you every step of the way.",
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

async function RealEstateResolved({ params }: PageProps) {
  const { local } = await params;
  return <RealEstateSection locale={local} />;
}

export default function RealEstatePage(props: PageProps) {
  return (
    <Suspense fallback={<RealEstateSection locale="en" />}>
      <RealEstateResolved {...props} />
    </Suspense>
  );
}
