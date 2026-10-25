import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getBlogById, getPublicBlogs } from "@/api/blogApi";
import type { BlogItem, BlogQueryParams } from "@/models/blog";

export const CLIENT_BLOGS_KEY = ["client", "blogs"] as const;

/**
 * Fetches localized paged blogs for client visitors with smooth transition caching.
 */
export function useClientBlogsQuery(
  params: BlogQueryParams = {},
  locale: string = "en"
) {
  return useQuery({
    queryKey: [...CLIENT_BLOGS_KEY, "list", params, locale],
    queryFn: async () => {
      const res = await getPublicBlogs(params, locale);
      return res.data;
    },
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });
}

/**
 * Fetches single blog detail by ID for client visitors.
 */
export function useClientBlogDetailQuery(
  id: string | null | undefined,
  locale: string = "en"
) {
  return useQuery({
    queryKey: [...CLIENT_BLOGS_KEY, "detail", id, locale],
    queryFn: async () => {
      if (!id) return null;
      const res = await getBlogById(id, locale);
      return res.data;
    },
    enabled: Boolean(id),
    staleTime: 60 * 1000,
  });
}

/**
 * Fetches up to 3 related blogs excluding the currently viewed blog.
 */
export function useClientRelatedBlogsQuery(
  currentBlogId: string | null | undefined,
  locale: string = "en"
) {
  return useQuery<BlogItem[]>({
    queryKey: [...CLIENT_BLOGS_KEY, "related", currentBlogId, locale],
    queryFn: async () => {
      const res = await getPublicBlogs({ pageNumber: 1, pageSize: 12 }, locale);
      const items = res.data?.items ?? [];
      const candidates = items.filter((b) => b.id !== currentBlogId);
      return candidates.slice(0, 3);
    },
    staleTime: 60 * 1000,
  });
}

