import apiClient from "./apiConfig";
import type { ApiResponse } from "@/models/auth";
import type {
  BlogItem, BlogQueryParams, BlogSectionCreateRequest, BlogSectionItem,
  BlogSectionUpdateRequest, BlogUpsertRequest, PagedBlogsResult,
} from "@/models/blog";

// Blogs Endpoints
export async function getAdminBlogs(
  params: BlogQueryParams = {}
): Promise<ApiResponse<PagedBlogsResult>> {
  const { data } = await apiClient.get<ApiResponse<PagedBlogsResult>>("/blogs", {
    params: {
      pageNumber: params.pageNumber ?? 1,
      pageSize: params.pageSize ?? 10,
    },
  });
  return data;
}

/**
 * Fetches localized paged list of blogs for client visitors.
 */
export async function getPublicBlogs(
  params: BlogQueryParams = {},
  locale: string = "en"
): Promise<ApiResponse<PagedBlogsResult>> {
  const { data } = await apiClient.get<ApiResponse<PagedBlogsResult>>("/blogs", {
    params: {
      pageNumber: params.pageNumber ?? 1,
      pageSize: params.pageSize ?? 12,
    },
    headers: { "Accept-Language": locale },
  });
  return data;
}

/**
 * Fetches a single blog by ID with its sections and image.
 */
export async function getBlogById(
  id: string,
  locale?: string
): Promise<ApiResponse<BlogItem>> {
  const headers: Record<string, string> = {};
  if (locale) headers["Accept-Language"] = locale;
  const { data } = await apiClient.get<ApiResponse<BlogItem>>(`/blogs/${id}`, {
    headers,
  });
  return data;
}

/**
 * Creates a new blog with localized title and description.
 */
export async function createBlog(
  body: BlogUpsertRequest
): Promise<ApiResponse<BlogItem>> {
  const { data } = await apiClient.post<ApiResponse<BlogItem>>("/blogs", body);
  return data;
}

/**
 * Updates an existing blog's localized title and description.
 */
export async function updateBlog(
  id: string,
  body: BlogUpsertRequest
): Promise<ApiResponse<BlogItem>> {
  const { data } = await apiClient.put<ApiResponse<BlogItem>>(`/blogs/${id}`, body);
  return data;
}

/**
 * Deletes a blog by ID.
 */
export async function deleteBlog(id: string): Promise<ApiResponse<boolean>> {
  const { data } = await apiClient.delete<ApiResponse<boolean>>(`/blogs/${id}`);
  return data;
}

/**
 * Uploads or replaces a cover image for a blog.
 */
export async function uploadBlogImage(
  id: string,
  file: File
): Promise<ApiResponse<BlogItem>> {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await apiClient.post<ApiResponse<BlogItem>>(
    `/blogs/${id}/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
}

/**
 * Removes the cover image from a blog.
 */
export async function deleteBlogImage(id: string): Promise<ApiResponse<boolean>> {
  const { data } = await apiClient.delete<ApiResponse<boolean>>(`/blogs/${id}/image`);
  return data;
}

// ---------------------------------------------------------------------------
// Blog Sections Endpoints
// ---------------------------------------------------------------------------

/**
 * Fetches all sections belonging to a specific blog.
 */
export async function getBlogSections(
  blogId: string
): Promise<ApiResponse<BlogSectionItem[]>> {
  const { data } = await apiClient.get<ApiResponse<BlogSectionItem[]>>(
    `/blogs/${blogId}/sections`
  );
  return data;
}

/**
 * Fetches a single section by its ID.
 */
export async function getBlogSectionById(
  id: string
): Promise<ApiResponse<BlogSectionItem>> {
  const { data } = await apiClient.get<ApiResponse<BlogSectionItem>>(
    `/blog-sections/${id}`
  );
  return data;
}

/**
 * Creates a new blog section with localized fields and power-point key/values.
 */
export async function createBlogSection(
  body: BlogSectionCreateRequest
): Promise<ApiResponse<BlogSectionItem>> {
  const { data } = await apiClient.post<ApiResponse<BlogSectionItem>>(
    "/blog-sections",
    body
  );
  return data;
}

/**
 * Updates an existing blog section.
 */
export async function updateBlogSection(
  id: string,
  body: BlogSectionUpdateRequest
): Promise<ApiResponse<BlogSectionItem>> {
  const { data } = await apiClient.put<ApiResponse<BlogSectionItem>>(
    `/blog-sections/${id}`,
    body
  );
  return data;
}

/**
 * Deletes a blog section by ID.
 */
export async function deleteBlogSection(
  id: string
): Promise<ApiResponse<boolean>> {
  const { data } = await apiClient.delete<ApiResponse<boolean>>(
    `/blog-sections/${id}`
  );
  return data;
}

const blogApi = {
  getAdminBlogs,
  getPublicBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  uploadBlogImage,
  deleteBlogImage,
  getBlogSections,
  getBlogSectionById,
  createBlogSection,
  updateBlogSection,
  deleteBlogSection,
};

export default blogApi;
