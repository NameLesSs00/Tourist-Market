// ---------------------------------------------------------------------------
// Server-side resolution of a blog post for /Blogs/[id].
//
// The route used to inherit the site-wide title and answer HTTP 200 with an
// in-page "not found" card for any unknown id. Now the title, the description and
// the social image come from the post itself, and the page wrapper raises a 404.
// ---------------------------------------------------------------------------

import { cache } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogById } from "@/clientApi/blogApi";
import type { BlogItem } from "@/models/blog";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";
import { buildMetadata } from "@/shared/utils/localizedMetadata";

export const getBlogForPath = cache(
  async (id: string, locale: string): Promise<BlogItem | null> => {
    if (!id) return null;
    try {
      const res = await getBlogById(id, locale);
      return res.data?.id ? res.data : null;
    } catch {
      // a 404 from the API is the answer to "this post does not exist", and an
      // outage must not take the route down: both read as "nothing to index here"
      return null;
    }
  }
);

/** Page-wrapper half: a real 404 instead of the client component's 200 card. */
export async function resolveBlogDetail(
  id: string,
  locale: string
): Promise<BlogItem> {
  const blog = await getBlogForPath(id, locale);
  if (!blog) notFound();
  return blog;
}

/** Absolute social image of a post, when it has one. */
export function blogImage(blog: BlogItem): string | undefined {
  return getBackendImageUrl(blog.imageUrl) ?? undefined;
}

/**
 * Metadata half. Dictionary `blogs.detail` copy is the fallback, so a post without
 * a description still gets a well-formed one instead of an empty snippet.
 */
export async function blogDetailMetadata(
  locale: string,
  id: string
): Promise<Metadata> {
  const blog = await getBlogForPath(id, locale);

  if (!blog) {
    return buildMetadata({
      locale,
      path: "/Blogs",
      section: "blogs",
      canonicalPath: "/Blogs",
      noindex: true,
    });
  }

  const image = blogImage(blog);
  return buildMetadata({
    locale,
    path: `/Blogs/${blog.id}`,
    section: "blogs.detail",
    title: blog.title || undefined,
    description: blog.description || undefined,
    ogType: "article",
    ...(image ? { ogImage: image } : {}),
  });
}
