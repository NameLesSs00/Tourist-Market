import { Suspense } from "react";
import type { Metadata } from "next";
import { ServiceThankYouSection } from "@/components/UserComp/Services/components/ServiceThankYouSection";

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

export const metadata: Metadata = {
  title: "Thank You for Your Service Booking | Egypt Tourist Market",
  description: "Your reservation request has been received.",
};

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
