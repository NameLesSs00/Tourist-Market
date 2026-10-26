import { Suspense } from "react";
import type { Metadata } from "next";
import { PrivateExcursionsSection } from "@/components/UserComp/PrivateExcursions";

export const instant = false;

export const metadata: Metadata = {
  title: "Private Excursions | Egypt Tourist Market",
  description:
    "Discover amazing private excursions in the Red Sea with the best prices and services.",
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

async function PrivateExcursionsResolved({ params }: PageProps) {
  const { local } = await params;
  return <PrivateExcursionsSection locale={local} />;
}

export default function LocalPrivateExcursionsKebabPage(props: PageProps) {
  return (
    <Suspense fallback={<PrivateExcursionsSection locale="en" />}>
      <PrivateExcursionsResolved {...props} />
    </Suspense>
  );
}
