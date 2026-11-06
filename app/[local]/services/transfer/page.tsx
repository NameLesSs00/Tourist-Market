import { Suspense } from "react";
import type { Metadata } from "next";
import { TransferSection } from "@/components/UserComp/Transfer";
import { JsonLd } from "@/components/UserComp/Shared/JsonLd";
import { listPageGraph } from "@/features/seo/structuredData";
import { buildMetadata } from "@/shared/utils/localizedMetadata";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { local } = await params;
  return buildMetadata({ locale: local, path: "/services/transfer", section: "transfer" });
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

export default async function LocalTransferPage(props: PageProps) {
  const { local } = await props.params;
  return (
    <>
      {/*
        WebPage + BreadcrumbList; no transfer entity exists to describe. This page is
        the one route whose content boundary the prerender postpones, so the graph has
        to be rendered in the shell - inside the hole it would only reach the client
        payload and a crawler would read a page without structured data.
      */}
      <JsonLd data={listPageGraph(local, "transfer")} />
      <Suspense fallback={<TransferLoadingFallback />}>
        <TransferResolved {...props} />
      </Suspense>
    </>
  );
}
