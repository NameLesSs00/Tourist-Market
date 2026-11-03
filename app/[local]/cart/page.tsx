import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductsCartSection } from "@/components/UserComp/Cart";
import { getDictionary } from "@/shared/utils/getDictionary";

export function generateMetadata({
  params,
}: {
  params: Promise<{ local: string }>;
}): Promise<Metadata> {
  return params.then(({ local }) => {
    const meta = getDictionary(local).cartPage.meta;
    return {
      title: meta.title,
      description: meta.description,
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

