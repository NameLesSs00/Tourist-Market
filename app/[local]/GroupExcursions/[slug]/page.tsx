import { Suspense } from "react";
import type { Metadata } from "next";
import { GroupDetailsSection } from "@/components/UserComp/GroupExcursions";

export const instant = false;

export const metadata: Metadata = {
  title: "Cairo Full Day Pyramids & Museum Tour | Egypt Tourist Market",
  description:
    "Discover the timeless wonders of Cairo — stand before the Great Pyramids, explore the Sphinx, and dive into the treasures of the Egyptian Museum.",
};

export function generateStaticParams() {
  return [
    { local: "en", slug: "one-day-trip-to-cairo-full-program-1" },
    { local: "fr", slug: "one-day-trip-to-cairo-full-program-1" },
    { local: "de", slug: "one-day-trip-to-cairo-full-program-1" },
    { local: "ru", slug: "one-day-trip-to-cairo-full-program-1" },
  ];
}

interface PageProps {
  params: Promise<{
    local: string;
    slug: string;
  }>;
}

async function GroupDetailsResolved({ params }: PageProps) {
  const { local, slug } = await params;
  return <GroupDetailsSection slug={slug} locale={local} />;
}

export default function LocalGroupExcursionDetailCamelPage(props: PageProps) {
  return (
    <Suspense fallback={<GroupDetailsSection />}>
      <GroupDetailsResolved {...props} />
    </Suspense>
  );
}
