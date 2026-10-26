import { Suspense } from "react";
import {
  HeroSection,
  GroupExcursionsHomeSection,
  Services,
  FaqSection,
} from "@/components/UserComp/Home";

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

async function HomeResolved({ params }: PageProps) {
  const { local } = await params;
  return (
    <>
      <HeroSection locale={local} />
      <GroupExcursionsHomeSection locale={local} />
      <Services locale={local} />
      <FaqSection locale={local} />
    </>
  );
}

export default function LocalHomePage(props: PageProps) {
  return (
    <Suspense fallback={<HeroSection locale="en" />}>
      <HomeResolved {...props} />
    </Suspense>
  );
}
