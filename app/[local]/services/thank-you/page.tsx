import { Suspense } from "react";
import type { Metadata } from "next";
import { ServiceThankYouSection } from "@/components/UserComp/Services/components/ServiceThankYouSection";
import { buildMetadata } from "@/shared/utils/localizedMetadata";

export const instant = false;

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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { local } = await params;
  // order-confirmation page: kept out of the index, links still followed
  return buildMetadata({
    locale: local,
    path: "/services/thank-you",
    section: "serviceThankYou",
    noindex: true,
  });
}

async function ServiceThankYouResolved({ params }: PageProps) {
  const { local } = await params;
  return <ServiceThankYouSection locale={local} />;
}

export default function ServiceThankYouPage(props: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFF8ED]" />}>
      <ServiceThankYouResolved {...props} />
    </Suspense>
  );
}
