import { Suspense } from "react";
import type { Metadata } from "next";
import { CartThankYouSection } from "@/components/UserComp/Cart/components";
import { getDictionary } from "@/shared/utils/getDictionary";
import { buildMetadata } from "@/shared/utils/localizedMetadata";

export const instant = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ local: string }>;
}): Promise<Metadata> {
  const { local } = await params;
  const meta = getDictionary(local).cartPage.meta;
  // order-confirmation page: kept out of the index, links still followed
  return buildMetadata({
    locale: local,
    path: "/cart/thank-you",
    title: meta.thankYouTitle,
    description: meta.thankYouDescription,
    noindex: true,
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

