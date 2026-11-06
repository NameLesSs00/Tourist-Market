import { Suspense } from "react";
import type { Metadata } from "next";
import { PrivateDetailsSection } from "@/components/UserComp/PrivateExcursions";
import { StructuredData } from "@/components/UserComp/Shared/JsonLd";
import { excursionDetailGraph } from "@/features/seo/structuredData";
import {
  excursionDetailMetadata,
  resolveExcursionDetail,
} from "@/features/excursions/getExcursionForPath";

export const instant = false;

interface PageProps {
  params: Promise<{
    local: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, local } = await params;
  return excursionDetailMetadata(local, "private", slug);
}

function PrivateDetailsLoadingFallback() {
  return (
    <div className="w-full min-h-screen bg-[#FFF8ED] font-poppins flex items-center justify-center py-32">
      <div className="w-12 h-12 rounded-full border-4 border-[#DE7423] border-t-transparent animate-spin" />
    </div>
  );
}

// The resolution happens outside the Suspense boundary on purpose: inside the hole of
// a partial-prerendered route nothing can change the response status any more, because
// the shell is already on the wire - proxy.ts is what turns an unknown detail URL into
// a real 404. This call is still what renders the right document, for a visitor who
// arrives through the router rather than a fresh request.
export default async function LocalPrivateExcursionDetailPage({ params }: PageProps) {
  const { local, slug } = await params;
  // an unknown excursion answers 404 instead of the client component's "not found"
  // card with HTTP 200, and a GUID segment redirects onto the stored slug
  await resolveExcursionDetail(local, "private", slug);
  return (
    <Suspense fallback={<PrivateDetailsLoadingFallback />}>
      <PrivateDetailsSection slug={slug} locale={local} />
      {/*
        TouristTrip with the itinerary, price and rating the tabs above show, read
        from the same cached resolution; a hidden excursion publishes nothing.
      */}
      <StructuredData graph={excursionDetailGraph(local, "private", slug)} />
    </Suspense>
  );
}
