import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductDetailsSection } from "@/components/UserComp/HotelDeliveries";
import { getDictionary } from "@/shared/utils/getDictionary";

export const instant = false;

interface PageProps {
  params: Promise<{
    local: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, local } = await params;
  const meta = getDictionary(local).hotelDeliveriesPage.meta;
  return {
    title: meta.detailsTitle,
    description: meta.detailsDescription.replace("{product}", slug),
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
