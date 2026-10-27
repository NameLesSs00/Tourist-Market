import { Suspense } from "react";
import type { Metadata } from "next";
import { GroupDetailsSection } from "@/components/UserComp/GroupExcursions";
import { getGroupExcursionFullDetails } from "@/clientApi/groupExcursionDetailsApi";

export const instant = false;

interface PageProps {
  params: Promise<{
    local: string;
    id: string;
  }>;
}

const FALLBACK_TITLE = "Group Excursion Details | Egypt Tourist Market";
const FALLBACK_DESCRIPTION =
  "Discover the timeless wonders of Egypt with our expertly guided group excursions.";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const { excursion } = await getGroupExcursionFullDetails(id);
    return {
      title: excursion.title ? `${excursion.title} | Egypt Tourist Market` : FALLBACK_TITLE,
      description: excursion.shortDescription || FALLBACK_DESCRIPTION,
    };
  } catch {
    return { title: FALLBACK_TITLE, description: FALLBACK_DESCRIPTION };
  }
}

function GroupDetailsLoadingFallback() {
  return (
    <div className="w-full min-h-screen bg-[#FFF8ED] font-poppins flex items-center justify-center py-32">
      <div className="w-12 h-12 rounded-full border-4 border-[#0E4A68] border-t-transparent animate-spin" />
    </div>
  );
}

async function GroupDetailsResolved({ params }: PageProps) {
  const { local, id } = await params;
  return <GroupDetailsSection excursionId={id} locale={local} />;
}

export default function LocalGroupExcursionDetailPage(props: PageProps) {
  return (
    <Suspense fallback={<GroupDetailsLoadingFallback />}>
      <GroupDetailsResolved {...props} />
    </Suspense>
  );
}
