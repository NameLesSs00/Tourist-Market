import { Suspense } from "react";
import type { Metadata } from "next";
import {
  ProductDetailsSection,
  ProductDetailsSkeleton,
} from "@/components/UserComp/HotelDeliveries";
import { StructuredData } from "@/components/UserComp/Shared/JsonLd";
import { productDetailGraph } from "@/features/seo/structuredData";
import {
  productDetailMetadata,
  resolveProductDetail,
} from "@/features/products/getProductForPath";

// the segment resolves to a backend product at request time, so nothing about this
// route can be known while it is being built (and no demo slug can be prerendered)
export const instant = false;

interface PageProps {
  params: Promise<{
    local: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, local } = await params;
  return productDetailMetadata(local, slug);
}

// The resolution happens outside the Suspense boundary on purpose: inside the hole of
// a partial-prerendered route nothing can change the response status any more, because
// the shell is already on the wire - proxy.ts is what turns an unknown detail URL into
// a real 404. This call is still what renders the right document, for a visitor who
// arrives through the router rather than a fresh request.
export default async function LocalHotelDeliveryProductDetailsPage({ params }: PageProps) {
  const { local, slug } = await params;
  // an unknown product answers 404 instead of the client component's "not found" card
  // with HTTP 200, and the legacy "{name}-{id}" form redirects onto the product id
  await resolveProductDetail(local, slug);
  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetailsSection slug={slug} locale={local} />
      {/*
        Product + Offer + published ratings, built on the product the line above
        resolved. The catalogue stores no currency, so the offer reads in US dollars.
      */}
      <StructuredData graph={productDetailGraph(local, slug)} />
    </Suspense>
  );
}
