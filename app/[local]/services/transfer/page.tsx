import { Suspense } from "react";
import type { Metadata } from "next";
import { TransferSection } from "@/components/UserComp/Transfer";

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

function TransferLoadingFallback() {
  return (
    <div className="w-full min-h-screen bg-[#FFF8ED] font-poppins flex items-center justify-center py-32">
      <div className="w-12 h-12 rounded-full border-4 border-[#0E4A68] border-t-transparent animate-spin" />
    </div>
  );
}

async function TransferResolved({ params }: PageProps) {
  const { local } = await params;
  return <TransferSection locale={local} />;
}

export default function LocalTransferPage(props: PageProps) {
  return (
    <Suspense fallback={<TransferLoadingFallback />}>
      <TransferResolved {...props} />
    </Suspense>
  );
}
