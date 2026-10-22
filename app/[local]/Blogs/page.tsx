import { Suspense } from "react";
import { BlogsSection } from "@/components/UserComp/Blogs";

export const instant = false;

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

async function BlogsResolved({ params }: PageProps) {
  const { local } = await params;
  return <BlogsSection locale={local} />;
}

export default function LocalBlogsPage(props: PageProps) {
  return (
    <Suspense fallback={<BlogsSection locale="en" />}>
      <BlogsResolved {...props} />
    </Suspense>
  );
}
