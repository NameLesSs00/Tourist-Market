import { Suspense } from "react";
import { ContactSection } from "@/components/UserComp/Contact/sections/ContactSection";


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

async function ContactResolved({ params }: PageProps) {
  const { local } = await params;
  return <ContactSection locale={local} />;
}

export default function LocalContactPage(props: PageProps) {
  return (
    <Suspense fallback={<ContactSection locale="en" />}>
      <ContactResolved {...props} />
    </Suspense>
  );
}
