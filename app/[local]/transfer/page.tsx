import { Suspense } from "react";
import type { Metadata } from "next";
import { TransferSection } from "@/components/UserComp/Transfer";
import { buildMetadata } from "@/shared/utils/localizedMetadata";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { local } = await params;
  // duplicate of /services/transfer, which the navigation and the footer link to:
  // never indexed, and it canonicalizes onto the surviving URL
  return buildMetadata({
    locale: local,
    path: "/transfer",
    section: "transfer",
    canonicalPath: "/services/transfer",
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

export default function DirectTransferPage(props: PageProps) {
  return (
    <Suspense fallback={<TransferLoadingFallback />}>
      <TransferResolved {...props} />
    </Suspense>
  );
}
