import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductDetailsSection } from "@/components/UserComp/HotelDeliveries";

export const instant = false;

export const metadata: Metadata = {
  title: "Ananas-Pineapples - Hotel Deliveries | Egypt Tourist Market",
  description:
    "Order fresh pineapples delivered straight to your hotel with Egypt Tourist Market.",
};

export function generateStaticParams() {
  return [
    { local: "en", slug: "ananas-1" },
    { local: "fr", slug: "ananas-1" },
    { local: "de", slug: "ananas-1" },
    { local: "ru", slug: "ananas-1" },
  ];
}

interface PageProps {
  params: Promise<{
    local: string;
    slug: string;
  }>;
}

async function ProductDetailsResolved({ params }: PageProps) {
  const { local, slug } = await params;
  return <ProductDetailsSection slug={slug} locale={local} />;
}

export default function LocalHotelDeliveryProductDetailsPage(props: PageProps) {
  return (
    <Suspense fallback={<ProductDetailsSection />}>
      <ProductDetailsResolved {...props} />
    </Suspense>
  );
}
