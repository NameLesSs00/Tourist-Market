import { Suspense } from "react";
import type { Metadata } from "next";
import { CarRentalSection } from "@/components/UserComp/Services";

export const metadata: Metadata = {
  title: "Car Rental | Egypt Tourist Market",
  description:
    "Experience Egypt at your own pace with our car rental service!",
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

async function CarRentalResolved({ params }: PageProps) {
  const { local } = await params;
  return <CarRentalSection locale={local} />;
}

export default function CarRentalPage(props: PageProps) {
  return (
    <Suspense fallback={<CarRentalSection locale="en" />}>
      <CarRentalResolved {...props} />
    </Suspense>
  );
}
