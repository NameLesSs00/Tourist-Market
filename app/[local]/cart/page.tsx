import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductsCartSection } from "@/components/UserComp/Cart";
import { getDictionary } from "@/shared/utils/getDictionary";
import { buildMetadata } from "@/shared/utils/localizedMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ local: string }>;
}): Promise<Metadata> {
  const { local } = await params;
  const meta = getDictionary(local).cartPage.meta;
  // a cart is personal and always changing: keep it out of the index
  return buildMetadata({
    locale: local,
    path: "/cart",
    title: meta.title,
    description: meta.description,
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

async function ProductsCartResolved({ params }: PageProps) {
  const { local } = await params;
  return <ProductsCartSection locale={local} />;
}

export default function CartPage(props: PageProps) {
  return (
    <Suspense fallback={<ProductsCartSection locale="en" />}>
      <ProductsCartResolved {...props} />
    </Suspense>
  );
}

