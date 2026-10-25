import { Suspense } from "react";
import { BlogDetailSection } from "@/components/UserComp/Blogs";

export const instant = false;

interface PageProps {
  params: Promise<{
    local: string;
    id: string;
  }>;
}

async function BlogDetailResolved({ params }: PageProps) {
  const { local, id } = await params;
  return <BlogDetailSection blogId={id} locale={local} />;
}

export default function BlogDetailPage(props: PageProps) {
  return (
    <Suspense fallback={null}>
      <BlogDetailResolved {...props} />
    </Suspense>
  );
}
