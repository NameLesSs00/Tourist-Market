import { Suspense } from "react";
import type { Metadata } from "next";
import { GroupExcursionsSection } from "@/components/UserComp/GroupExcursions";

export const instant = false;

export const metadata: Metadata = {
  title: "Group Excursions | Egypt Tourist Market",
  description:
    "Discover amazing Group excursions in the Red Sea with the best prices and services.",
};

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

async function GroupExcursionsResolved({ params }: PageProps) {
  const { local } = await params;
  return <GroupExcursionsSection locale={local} />;
}

export default function LocalGroupExcursionsPage(props: PageProps) {
  return (
    <Suspense fallback={<GroupExcursionsSection locale="en" />}>
      <GroupExcursionsResolved {...props} />
    </Suspense>
  );
}
