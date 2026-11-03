import { Suspense } from "react";
import type { Metadata } from "next";
import { TransferSection } from "@/components/UserComp/Transfer";
import { localizedMetadata } from "@/shared/utils/localizedMetadata";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { local } = await params;
  return localizedMetadata(local, "transfer");
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
