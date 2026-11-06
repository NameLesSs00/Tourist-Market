import { Suspense } from "react";
import type { Metadata } from "next";
import { ServiceDetailSection } from "@/components/UserComp/Services";
import { StructuredData } from "@/components/UserComp/Shared/JsonLd";
import { serviceDetailGraph } from "@/features/seo/structuredData";
import {
  resolveServiceDetail,
  serviceDetailMetadata,
} from "@/features/siteServiceItems/getServiceItemForPath";

// the URL segment resolves to a backend sub-item at request time, so nothing about
// this route can be known while it is being built
export const instant = false;

interface PageProps {
  params: Promise<{
    local: string;
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { local, slug } = await params;
  return serviceDetailMetadata(local, "real-estate", slug);
}

// The resolution happens outside the Suspense boundary on purpose: inside the hole of
// a partial-prerendered route nothing can change the response status any more, because
// the shell is already on the wire - proxy.ts is what turns an unknown detail URL into
// a real 404. This call is still what renders the right document, for a visitor who
// arrives through the router rather than a fresh request.
export default async function RealEstateDetailPage({ params }: PageProps) {
  const { local, slug } = await params;
  // an unknown segment answers 404 instead of the "service not found" panel with HTTP
  // 200, and a legacy GUID segment redirects to the readable URL
  const { item } = await resolveServiceDetail(local, "real-estate", slug);
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFF8ED]" aria-hidden="true" />}>
      <ServiceDetailSection serviceType="real-estate" itemId={item.id} locale={local} />
      {/* Service + Offer + rating, built from the item the line above resolved */}
      <StructuredData graph={serviceDetailGraph(local, "real-estate", slug)} />
    </Suspense>
  );
}
