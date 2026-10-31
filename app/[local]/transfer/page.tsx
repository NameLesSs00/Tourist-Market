import { Suspense } from "react";
import type { Metadata } from "next";
import { TransferSection } from "@/components/UserComp/Transfer";

export const instant = false;

export const metadata: Metadata = {
  title: "Transfer Services | Egypt Tourist Market",
  description:
    "Comfortable & Reliable Airport Transfers in Hurghada. Book door-to-door transfer service between Hurghada Airport and hotels across the Red Sea Riviera.",
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

async function TransferResolved({ params }: PageProps) {
  const { local } = await params;
  return <TransferSection locale={local} />;
}

export default function DirectTransferPage(props: PageProps) {
  return (
    <Suspense fallback={<TransferSection locale="en" />}>
      <TransferResolved {...props} />
    </Suspense>
  );
}
