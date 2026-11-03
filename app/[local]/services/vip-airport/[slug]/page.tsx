import { Suspense } from "react";
import type { Metadata } from "next";
import { ServiceDetailSection } from "@/components/UserComp/Services";
import { localizedMetadata } from "@/shared/utils/localizedMetadata";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { local } = await params;
  return localizedMetadata(local, "vipAirport");
}

export function generateStaticParams() {
  const locales = ["en", "fr", "de", "ru"];
  const slugs = ["vip-lounge", "vip-lounge-1"];
  return locales.flatMap((local) => slugs.map((slug) => ({ local, slug })));
}

interface PageProps {
  params: Promise<{
    local: string;
    slug: string;
  }>;
}

async function VipAirportDetailResolved({ params }: PageProps) {
  const { local, slug } = await params;
  return (
    <ServiceDetailSection
      serviceType="vip-airport"
      slug={slug}
      locale={local}
    />
  );
}

export default function VipAirportDetailPage(props: PageProps) {
  return (
    <Suspense
      fallback={
        <ServiceDetailSection
          serviceType="vip-airport"
          slug="vip-lounge"
          locale="en"
        />
      }
    >
      <VipAirportDetailResolved {...props} />
    </Suspense>
  );
}
