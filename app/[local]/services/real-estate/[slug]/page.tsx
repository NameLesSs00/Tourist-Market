import { Suspense } from "react";
import type { Metadata } from "next";
import { ServiceDetailSection } from "@/components/UserComp/Services";

export const metadata: Metadata = {
  title: "Long Beach Residence | Red Sea Real Estate",
  description:
    "Do you dream of owning a piece of Red Sea paradise? Discover luxury properties and residences.",
};

export function generateStaticParams() {
  const locales = ["en", "fr", "de", "ru"];
  const slugs = ["long-beach-residence", "one7-residence-hurghada-1"];
  return locales.flatMap((local) => slugs.map((slug) => ({ local, slug })));
}

interface PageProps {
  params: Promise<{
    local: string;
    slug: string;
  }>;
}

async function RealEstateDetailResolved({ params }: PageProps) {
  const { local, slug } = await params;
  return (
    <ServiceDetailSection
      serviceType="real-estate"
      slug={slug}
      locale={local}
    />
  );
}

export default function RealEstateDetailPage(props: PageProps) {
  return (
    <Suspense
      fallback={
        <ServiceDetailSection
          serviceType="real-estate"
          slug="long-beach-residence"
          locale="en"
        />
      }
    >
      <RealEstateDetailResolved {...props} />
    </Suspense>
  );
}
