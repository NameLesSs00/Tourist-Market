import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createExcursionCategory,
  deleteExcursionCategory,
  getExcursionCategories,
  getExcursionCategoryAllLanguages,
  updateExcursionCategory,
} from "@/api/excursionCategoryApi";
import { extractErrorMessage } from "@/features/auth/useAuth";
import { LANGS, type LocalizedText } from "@/models/faq";
import type {
  ExcursionCategoryCreateRequest,
  ExcursionCategoryQueryParams,
  ExcursionCategoryUpdateRequest,
} from "@/models/excursionCategory";

export const EXCURSION_CATEGORIES_KEY = ["admin", "excursion-categories"] as const;

/**
 * Fills in any missing or blank non-English language fields with the English value
 * to avoid backend 400 validation errors.
 */
export function fillMissingCategoryLanguages(
  name: LocalizedText
): LocalizedText {
  const fallback = name.en?.trim() || "";
  const result: LocalizedText = { ...name };

  for (const lang of LANGS) {
    if (!result[lang] || !result[lang].trim()) {
      result[lang] = fallback;
    }
  }

  return result;
}

/**
 * Hook to query paginated excursion categories list.
 */
export function useExcursionCategoriesQuery(
  params: ExcursionCategoryQueryParams = {},
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: [...EXCURSION_CATEGORIES_KEY, "list", params],
    queryFn: async () => {
      const res = await getExcursionCategories(params);
      return res.data;
    },
    placeholderData: keepPreviousData,
    enabled: options?.enabled ?? true,
  });
}

/**
 * Hook to query full multi-language translations for editing.
 */
export function useExcursionCategoryAllLanguagesQuery(id: string | null) {
  return useQuery({
    queryKey: [...EXCURSION_CATEGORIES_KEY, "detail", id],
    queryFn: () => (id ? getExcursionCategoryAllLanguages(id) : null),
    enabled: Boolean(id),
  });
}

/**
 * Hook to create an excursion category.
 */
export function useCreateExcursionCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: ExcursionCategoryCreateRequest) => {
      const sanitized: ExcursionCategoryCreateRequest = {
        ...body,
        name: fillMissingCategoryLanguages(body.name),
      };
      const res = await createExcursionCategory(sanitized);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(
        `Category “${data.name}” created successfully.`
      );
      queryClient.invalidateQueries({ queryKey: EXCURSION_CATEGORIES_KEY });
    },
    onError: (err) => {
      toast.error(
        extractErrorMessage(err) || "Failed to create excursion category."
      );
    },
  });
}

/**
 * Hook to update an existing excursion category.
 */
export function useUpdateExcursionCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      body,
    }: {
      id: string;
      body: ExcursionCategoryUpdateRequest;
    }) => {
      const sanitized: ExcursionCategoryUpdateRequest = {
        ...body,
        name: fillMissingCategoryLanguages(body.name),
      };
      const res = await updateExcursionCategory(id, sanitized);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(
        `Category “${data.name}” updated successfully.`
      );
      queryClient.invalidateQueries({ queryKey: EXCURSION_CATEGORIES_KEY });
    },
    onError: (err) => {
      toast.error(
        extractErrorMessage(err) || "Failed to update excursion category."
      );
    },
  });
}

/**
 * Hook to delete an excursion category.
 */
export function useDeleteExcursionCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await deleteExcursionCategory(id);
      return id;
    },
    onSuccess: () => {
      toast.success("Excursion category deleted successfully.");
      queryClient.invalidateQueries({ queryKey: EXCURSION_CATEGORIES_KEY });
    },
    onError: (err) => {
      toast.error(
        extractErrorMessage(err) || "Failed to delete excursion category."
      );
    },
  });
}
