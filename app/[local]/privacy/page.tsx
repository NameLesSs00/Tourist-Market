import { Suspense } from "react";
import { PrivacyPageSection } from "@/components/UserComp/Privacy";

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

async function PrivacyResolved({ params }: PageProps) {
  const { local } = await params;
  return <PrivacyPageSection locale={local} />;
}

export default function LocalPrivacyPage(props: PageProps) {
  return (
    <Suspense fallback={<PrivacyPageSection locale="en" />}>
      <PrivacyResolved {...props} />
    </Suspense>
  );
}

