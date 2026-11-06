import { Suspense } from "react";
import type { Metadata } from "next";
import { GroupDetailsSection } from "@/components/UserComp/GroupExcursions";
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
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id, local } = await params;
  return excursionDetailMetadata(local, "group", id);
}

function GroupDetailsLoadingFallback() {
  return (
    <div className="w-full min-h-screen bg-[#FFF8ED] font-poppins flex items-center justify-center py-32">
      <div className="w-12 h-12 rounded-full border-4 border-[#0E4A68] border-t-transparent animate-spin" />
    </div>
  );
}

// The resolution happens outside the Suspense boundary on purpose: inside the hole of
// a partial-prerendered route nothing can change the response status any more, because
// the shell is already on the wire - proxy.ts is what turns an unknown detail URL into
// a real 404. This call is still what renders the right document, for a visitor who
// arrives through the router rather than a fresh request.
export default async function LocalGroupExcursionDetailPage({ params }: PageProps) {
  const { local, id } = await params;
  // an unknown excursion answers 404 instead of the client component's "not found"
  // card with HTTP 200, and a GUID segment redirects onto the stored slug
  await resolveExcursionDetail(local, "group", id);
  return (
    <Suspense fallback={<GroupDetailsLoadingFallback />}>
      <GroupDetailsSection excursionId={id} locale={local} />
      {/*
        TouristTrip with the itinerary, price and rating the tabs above show, read
        from the same cached resolution; a hidden excursion publishes nothing.
      */}
      <StructuredData graph={excursionDetailGraph(local, "group", id)} />
    </Suspense>
  );
}
