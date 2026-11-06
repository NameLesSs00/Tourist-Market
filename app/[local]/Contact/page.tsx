import { Suspense } from "react";
import type { Metadata } from "next";
import { ContactSection } from "@/components/UserComp/Contact/sections/ContactSection";
import { JsonLd } from "@/components/UserComp/Shared/JsonLd";
import { staticPageGraph } from "@/features/seo/structuredData";
import { buildMetadata } from "@/shared/utils/localizedMetadata";


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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { local } = await params;
  return buildMetadata({ locale: local, path: "/Contact", section: "contact" });
}

async function ContactResolved({ params }: PageProps) {
  const { local } = await params;
  return <ContactSection locale={local} />;
}

export default async function LocalContactPage(props: PageProps) {
  const { local } = await props.params;
  return (
    <>
      {/* rendered in the shell, not in the hole, so a postponed boundary cannot hide it */}
      <JsonLd data={staticPageGraph(local, "/Contact", "contact", "nav.contact")} />
      <Suspense fallback={<ContactSection locale="en" />}>
        <ContactResolved {...props} />
      </Suspense>
    </>
  );
}
