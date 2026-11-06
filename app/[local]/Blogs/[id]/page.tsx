import { Suspense } from "react";
import type { Metadata } from "next";
import { BlogDetailSection } from "@/components/UserComp/Blogs";
import { StructuredData } from "@/components/UserComp/Shared/JsonLd";
import { blogDetailGraph } from "@/features/seo/structuredData";
import {
  blogDetailMetadata,
  resolveBlogDetail,
} from "@/features/blogs/getBlogForPath";

export const instant = false;

interface PageProps {
  params: Promise<{
    local: string;
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { local, id } = await params;
  return blogDetailMetadata(local, id);
}

// The resolution happens outside the Suspense boundary on purpose: inside the hole of
// a partial-prerendered route nothing can change the response status any more, because
// the shell is already on the wire - proxy.ts is what turns an unknown detail URL into
// a real 404. This call is still what renders the right document, for a visitor who
// arrives through the router rather than a fresh request.
export default async function BlogDetailPage({ params }: PageProps) {
  const { local, id } = await params;
  // an unknown post id answers 404 here instead of reaching the client component's
  // "not found" card, which used to return it with HTTP 200
  await resolveBlogDetail(id, local);
  return (
    <Suspense fallback={null}>
      <BlogDetailSection blogId={id} locale={local} />
      {/*
        BlogPosting. The backend returns no date for a post, so none is invented:
        a fabricated datePublished would be a false claim about freshness.
      */}
      <StructuredData graph={blogDetailGraph(local, id)} />
    </Suspense>
  );
}
