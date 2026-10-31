import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductDetailsSection } from "@/components/UserComp/HotelDeliveries";

export const instant = false;

interface PageProps {
  params: Promise<{
    local: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: "Hotel Delivery Product | Egypt Tourist Market",
    description: `Order delivery straight to your hotel room with Egypt Tourist Market. Product: ${slug}`,
  };
}

export function generateStaticParams() {
  return [
    { local: "en", slug: "ananas-1" },
    { local: "fr", slug: "ananas-1" },
    { local: "de", slug: "ananas-1" },
    { local: "ru", slug: "ananas-1" },
    { local: "en", slug: "1" },
    { local: "fr", slug: "1" },
    { local: "de", slug: "1" },
    { local: "ru", slug: "1" },
  ];
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
