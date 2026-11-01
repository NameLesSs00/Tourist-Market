import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductsCartSection } from "@/components/UserComp/Cart";

export const metadata: Metadata = {
  title: "Products Cart | Egypt Tourist Market",
  description: "View and manage items in your shopping cart.",
};

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

