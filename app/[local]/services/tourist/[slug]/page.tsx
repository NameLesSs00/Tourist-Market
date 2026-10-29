import { Suspense } from "react";
import type { Metadata } from "next";
import { ServiceDetailSection } from "@/components/UserComp/Services";

export const metadata: Metadata = {
  title: "Personal Translator | Tourist Services",
  description:
    "Ensure a worry-free visit to Egypt with our personal translator service.",
};

export function generateStaticParams() {
  const locales = ["en", "fr", "de", "ru"];
  const slugs = ["personal-translator", "trusted-legal-support-1"];
  return locales.flatMap((local) => slugs.map((slug) => ({ local, slug })));
}

interface PageProps {
  params: Promise<{
    local: string;
    slug: string;
  }>;
}

async function TouristDetailResolved({ params }: PageProps) {
  const { local, slug } = await params;
  return (
    <ServiceDetailSection
      serviceType="tourist"
      slug={slug}
      locale={local}
    />
  );
}

export default function TouristDetailPage(props: PageProps) {
  return (
    <Suspense
      fallback={
        <ServiceDetailSection
          serviceType="tourist"
          slug="personal-translator"
          locale="en"
        />
      }
    >
      <TouristDetailResolved {...props} />
    </Suspense>
  );
}
