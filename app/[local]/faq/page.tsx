import { Suspense } from "react";
import { FaqPageSection } from "@/components/UserComp/Faq";
import { FaqSkeleton } from "@/components/UserComp/Home/components/FaqSkeleton";

export const instant = false;

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

async function FaqResolved({ params }: PageProps) {
  const { local } = await params;
  return <FaqPageSection locale={local} />;
}

export default function LocalFaqPage(props: PageProps) {
  return (
    <Suspense fallback={<FaqSkeleton />}>
      <FaqResolved {...props} />
    </Suspense>
  );
}
