import { Suspense } from "react";
import type { Metadata } from "next";
import { CartThankYouSection } from "@/components/UserComp/Cart/components";
import { getDictionary } from "@/shared/utils/getDictionary";

export const instant = false;

export function generateMetadata({
  params,
}: {
  params: Promise<{ local: string }>;
}): Promise<Metadata> {
  return params.then(({ local }) => {
    const meta = getDictionary(local).cartPage.meta;
    return {
      title: meta.thankYouTitle,
      description: meta.thankYouDescription,
    };
  });
}

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

