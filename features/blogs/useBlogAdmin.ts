import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createBlog,
  createBlogSection,
  deleteBlog,
  deleteBlogImage,
  deleteBlogSection,
  getAdminBlogs,
  getBlogById,
  getBlogSections,
  updateBlog,
  updateBlogSection,
  uploadBlogImage,
} from "@/api/blogApi";
import { extractErrorMessage } from "@/features/auth/useAuth";
import { LANGS, type LocalizedText } from "@/models/faq";
import type {
  BlogQueryParams,
  BlogSectionCreateRequest,
  BlogSectionUpdateRequest,
  BlogUpsertRequest,
  LocalizedArray,
} from "@/models/blog";

export const ADMIN_BLOGS_KEY = ["admin", "blogs"] as const;

/**
 * Paged blogs list for the admin table.
 */
export function useAdminBlogsQuery(params: BlogQueryParams = {}) {
  return useQuery({
    queryKey: [...ADMIN_BLOGS_KEY, "list", params],
    queryFn: async () => {
      const res = await getAdminBlogs(params);
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
}

/**
 * Single blog detail query.
 */
export function useBlogDetailQuery(id: string | null) {
  return useQuery({
    queryKey: [...ADMIN_BLOGS_KEY, "detail", id],
    queryFn: () => getBlogById(id as string),
    enabled: Boolean(id),
    staleTime: 0,
  });
}

/**
 * Sections of a specific blog.
 */
export function useBlogSectionsQuery(blogId: string | null) {
  return useQuery({
    queryKey: [...ADMIN_BLOGS_KEY, "sections", blogId],
    queryFn: async () => {
      const res = await getBlogSections(blogId as string);
      return res.data ?? [];
    },
    enabled: Boolean(blogId),
    staleTime: 0,
  });
}

/**
 * Fallback helper for blog creation: any language left blank inherits English.
 */
export function fillMissingBlogLanguages(body: BlogUpsertRequest): BlogUpsertRequest {
  const fill = (text: LocalizedText): LocalizedText => {
    const out = { ...text };
    LANGS.forEach((lang) => {
      if (!out[lang]?.trim()) out[lang] = text.en;
    });
    return out;
  };
  return {
    title: fill(body.title),
    description: fill(body.description),
  };
}

/**
 * Fallback helper for section creation: any language left blank inherits English.
 */
export function fillMissingSectionLanguages(
  body: BlogSectionCreateRequest
): BlogSectionCreateRequest {
  const fillText = (text: LocalizedText): LocalizedText => {
    const out = { ...text };
    LANGS.forEach((lang) => {
      if (!out[lang]?.trim()) out[lang] = text.en;
    });
    return out;
  };

  const fillArray = (arr: LocalizedArray): LocalizedArray => {
    const out = { ...arr };
    LANGS.forEach((lang) => {
      if (!out[lang] || out[lang].length === 0) {
        out[lang] = arr.en ?? [];
      }
    });
    return out;
  };

  return {
    ...body,
    title: fillText(body.title),
    description: fillText(body.description),
    shortDescription: fillText(body.shortDescription),
    keys: fillArray(body.keys),
    values: fillArray(body.values),
  };
}

export function useCreateBlogMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      body,
      imageFile,
    }: {
      body: BlogUpsertRequest;
      imageFile?: File | null;
    }) => {
      const res = await createBlog(fillMissingBlogLanguages(body));
      if (imageFile && res.data?.id) {
        try {
          await uploadBlogImage(res.data.id, imageFile);
        } catch {
          toast.warning("Blog created, but cover image upload failed.");
        }
      }
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Blog created successfully.");
      qc.invalidateQueries({ queryKey: ADMIN_BLOGS_KEY });
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });
}

export function useUpdateBlogMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      body,
      imageFile,
      removeImage,
    }: {
      id: string;
      body: BlogUpsertRequest;
      imageFile?: File | null;
      removeImage?: boolean;
    }) => {
      const res = await updateBlog(id, body);
      if (removeImage) {
        await deleteBlogImage(id);
      } else if (imageFile) {
        await uploadBlogImage(id, imageFile);
      }
      return res;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Blog updated successfully.");
      qc.invalidateQueries({ queryKey: ADMIN_BLOGS_KEY });
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });
}

export function useDeleteBlogMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteBlog(id),
    onSuccess: (res) => {
      toast.success(res.message || "Blog deleted successfully.");
      qc.invalidateQueries({ queryKey: ADMIN_BLOGS_KEY });
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });
}

export function useCreateBlogSectionMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: BlogSectionCreateRequest) =>
      createBlogSection(fillMissingSectionLanguages(body)),
    onSuccess: (res, vars) => {
      toast.success(res.message || "Section added successfully.");
      qc.invalidateQueries({
        queryKey: [...ADMIN_BLOGS_KEY, "sections", vars.blogId],
      });
      qc.invalidateQueries({ queryKey: [...ADMIN_BLOGS_KEY, "list"] });
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });
}

export function useUpdateBlogSectionMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      blogId: string;
      body: BlogSectionUpdateRequest;
    }) => updateBlogSection(id, body),
    onSuccess: (res, vars) => {
      toast.success(res.message || "Section updated successfully.");
      qc.invalidateQueries({
        queryKey: [...ADMIN_BLOGS_KEY, "sections", vars.blogId],
      });
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });
}

export function useDeleteBlogSectionMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string; blogId: string }) =>
      deleteBlogSection(id),
    onSuccess: (res, vars) => {
      toast.success(res.message || "Section deleted successfully.");
      qc.invalidateQueries({
        queryKey: [...ADMIN_BLOGS_KEY, "sections", vars.blogId],
      });
      qc.invalidateQueries({ queryKey: [...ADMIN_BLOGS_KEY, "list"] });
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });
}
