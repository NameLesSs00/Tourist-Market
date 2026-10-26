import { Suspense } from "react";
import type { Metadata } from "next";
import { PrivateDetailsSection } from "@/components/UserComp/PrivateExcursions";

export const instant = false;

export const metadata: Metadata = {
  title: "Private Hurghada City Tour | Egypt Tourist Market",
  description:
    "Discover the timeless wonders of Cairo & Hurghada — stand before the Great Pyramids, explore the Sphinx, and dive into the treasures of the Egyptian Museum.",
};

export function generateStaticParams() {
  return [
    { local: "en", slug: "private-hurghada-city-tour" },
    { local: "fr", slug: "private-hurghada-city-tour" },
    { local: "de", slug: "private-hurghada-city-tour" },
    { local: "ru", slug: "private-hurghada-city-tour" },
  ];
}

interface PageProps {
  params: Promise<{
    local: string;
    slug: string;
  }>;
}

async function PrivateDetailsResolved({ params }: PageProps) {
  const { local, slug } = await params;
  return <PrivateDetailsSection slug={slug} locale={local} />;
}

export default function LocalPrivateExcursionDetailCamelPage(props: PageProps) {
  return (
    <Suspense fallback={<PrivateDetailsSection />}>
      <PrivateDetailsResolved {...props} />
    </Suspense>
  );
}
