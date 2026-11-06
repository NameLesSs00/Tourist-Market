import { Suspense } from "react";
import type { Metadata } from "next";
import { FaqPageSection } from "@/components/UserComp/Faq";
import { FaqSkeleton } from "@/components/UserComp/Home/components/FaqSkeleton";
import { StructuredData } from "@/components/UserComp/Shared/JsonLd";
import { faqGraph } from "@/features/seo/structuredData";
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { local } = await params;
  return buildMetadata({ locale: local, path: "/faq", section: "faq" });
}

async function FaqResolved({ params }: PageProps) {
  const { local } = await params;
  return (
    <>
      <FaqPageSection locale={local} />
      {/* FAQPage over the questions the catalog section actually lists */}
      <StructuredData graph={faqGraph(local)} />
    </>
  );
}

export default function LocalFaqPage(props: PageProps) {
  return (
    <Suspense fallback={<FaqSkeleton />}>
      <FaqResolved {...props} />
    </Suspense>
  );
}
