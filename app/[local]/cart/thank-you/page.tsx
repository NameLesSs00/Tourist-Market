import { Suspense } from "react";
import { CartThankYouSection } from "@/components/UserComp/Cart/components";

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

async function ThankYouResolved({ params }: PageProps) {
  const { local } = await params;
  return <CartThankYouSection locale={local} />;
}

export default function ThankYouPage(props: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFF8ED]" />}>
      <ThankYouResolved {...props} />
    </Suspense>
  );
}

