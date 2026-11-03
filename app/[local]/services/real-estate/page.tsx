import { Suspense } from "react";
import type { Metadata } from "next";
import { RealEstateSection } from "@/components/UserComp/Services";
import { localizedMetadata } from "@/shared/utils/localizedMetadata";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { local } = await params;
  return localizedMetadata(local, "realEstate");
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
