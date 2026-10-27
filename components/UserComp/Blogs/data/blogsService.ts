import { BlogFilterParams, BlogPaginationResponse, BlogPost } from "../types";

/**
 * Backend-ready blog service.
 * Simulates server-side filtering, pagination, and data contracts.
 * Can be swapped directly with TanStack Query / Axios API calls when backend is ready.
 */
export async function getBlogs(
  params: BlogFilterParams
): Promise<BlogPaginationResponse> {
  const { category, page = 1, limit = 12, search } = params;

  let filtered: BlogPost[] = [];

  // 1. Filter by category
  if (category && category !== "All") {
    filtered = filtered.filter(
      (blog) => blog.category.toLowerCase() === category.toLowerCase()
    );
  }

  // 2. Filter by search query if provided
  if (search && search.trim() !== "") {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (blog) =>
        blog.title.toLowerCase().includes(q) ||
        blog.excerpt.toLowerCase().includes(q)
    );
  }

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const safePage = Math.min(Math.max(1, page), totalPages);

  const startIndex = (safePage - 1) * limit;
  const endIndex = startIndex + limit;
  const data: BlogPost[] = filtered.slice(startIndex, endIndex);

  return {
    data,
    meta: {
      currentPage: safePage,
      totalPages,
      totalItems,
      itemsPerPage: limit,
      hasNextPage: safePage < totalPages,
      hasPrevPage: safePage > 1,
    },
  };
}
