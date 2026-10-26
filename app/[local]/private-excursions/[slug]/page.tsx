import { Suspense } from "react";
import type { Metadata } from "next";
import { PrivateDetailsSection } from "@/components/UserComp/PrivateExcursions";

export const instant = false;

export const metadata: Metadata = {
  title: "Private Hurghada City Tour | Egypt Tourist Market",
  description:
    "Experience the vibrant highlights of Hurghada on an exclusive private tour — explore the historic El Dahar square, the Marina, and the Grand Mosque.",
};

export function generateStaticParams() {
  const locales = ["en", "fr", "de", "ru"];
  const slugs = [
    "private-hurghada-city-tour",
    "one-day-trip-to-cairo-full-program-private-1",
    "hurghada-grand-aquarium-private-1",
  ];
  return locales.flatMap((local) => slugs.map((slug) => ({ local, slug })));
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

export default function LocalPrivateExcursionDetailPage(props: PageProps) {
  return (
    <Suspense fallback={<PrivateDetailsSection />}>
      <PrivateDetailsResolved {...props} />
    </Suspense>
  );
}
