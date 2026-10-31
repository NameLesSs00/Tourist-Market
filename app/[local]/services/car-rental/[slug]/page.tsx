import { Suspense } from "react";
import type { Metadata } from "next";
import { ServiceDetailSection } from "@/components/UserComp/Services";

export const metadata: Metadata = {
  title: "Mercedes Benz | Car Rental",
  description:
    "Premium Mercedes Benz car rental with full air conditioning, automatic transmission, and 24/7 support.",
};

export function generateStaticParams() {
  const locales = ["en", "fr", "de", "ru"];
  const slugs = ["mercedes-benz", "hyundai-tucson-1", "mg-hs-1"];
  return locales.flatMap((local) => slugs.map((slug) => ({ local, slug })));
}

interface PageProps {
  params: Promise<{
    local: string;
    slug: string;
  }>;
}

async function CarRentalDetailResolved({ params }: PageProps) {
  const { local, slug } = await params;
  return (
    <ServiceDetailSection
      serviceType="car-rental"
      slug={slug}
      locale={local}
    />
  );
}

export default function CarRentalDetailPage(props: PageProps) {
  return (
    <Suspense
      fallback={
        <ServiceDetailSection
          serviceType="car-rental"
          slug="mercedes-benz"
          locale="en"
        />
      }
    >
      <CarRentalDetailResolved {...props} />
    </Suspense>
  );
}
