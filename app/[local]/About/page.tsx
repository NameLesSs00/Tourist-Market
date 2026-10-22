import { Suspense } from "react";
import { AboutSection } from "@/components/UserComp/About";

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

async function AboutResolved({ params }: PageProps) {
  const { local } = await params;
  return <AboutSection locale={local} />;
}

export default function LocalAboutPage(props: PageProps) {
  return (
    <Suspense fallback={<AboutSection locale="en" />}>
      <AboutResolved {...props} />
    </Suspense>
  );
}
