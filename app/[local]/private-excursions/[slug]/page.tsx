import { Suspense } from "react";
import type { Metadata } from "next";
import { PrivateDetailsSection } from "@/components/UserComp/PrivateExcursions";
import { getPrivateExcursionFullDetails } from "@/clientApi/privateExcursionDetailsApi";

export const instant = false;

interface PageProps {
  params: Promise<{
    local: string;
    slug: string;
  }>;
}

const FALLBACK_TITLE = "Private Excursion Details | Egypt Tourist Market";
const FALLBACK_DESCRIPTION =
  "Discover the timeless wonders of Egypt with exclusive private excursions tailored for you.";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, local } = await params;
  try {
    const { excursion } = await getPrivateExcursionFullDetails(slug, local);
    return {
      title: excursion.title ? `${excursion.title} | Egypt Tourist Market` : FALLBACK_TITLE,
      description: excursion.shortDescription || FALLBACK_DESCRIPTION,
    };
  } catch {
    return { title: FALLBACK_TITLE, description: FALLBACK_DESCRIPTION };
  }
}

function PrivateDetailsLoadingFallback() {
  return (
    <div className="w-full min-h-screen bg-[#FFF8ED] font-poppins flex items-center justify-center py-32">
      <div className="w-12 h-12 rounded-full border-4 border-[#DE7423] border-t-transparent animate-spin" />
    </div>
  );
}

async function PrivateDetailsResolved({ params }: PageProps) {
  const { local, slug } = await params;
  return <PrivateDetailsSection slug={slug} locale={local} />;
}

export default function LocalPrivateExcursionDetailPage(props: PageProps) {
  return (
    <Suspense fallback={<PrivateDetailsLoadingFallback />}>
      <PrivateDetailsResolved {...props} />
    </Suspense>
  );
}
