import { extractErrorMessage } from "@/shared/utils/errorUtils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createProductCategory,
  deleteProductCategory,
  deleteProductCategoryImage,
  getProductCategories,
  getProductCategoryAllLanguages,
  updateProductCategory,
  uploadProductCategoryImage,
} from "@/clientApi/productCategoryApi";
import { LANGS, type LocalizedText } from "@/models/localization";
import type {
  ProductCategoryQueryParams,
  ProductCategoryUpsertRequest,
} from "@/models/productCategory";

/**
 * Fallback helper: fills any missing language with the English translation
 * to satisfy backend validation without 400 errors.
 */
export function fillMissingProductCategoryLanguages(
  name: LocalizedText
): LocalizedText {
  const filled = { ...name };
  const fallback = name.en?.trim() || "";
  LANGS.forEach((lang) => {
    if (!filled[lang]?.trim()) {
      filled[lang] = fallback;
    }
  });
  return filled;
}

/**
 * Query hook for paginated product categories.
 */
export function useProductCategoriesQuery(
  params: ProductCategoryQueryParams = {}
) {
  return useQuery({
    queryKey: ["admin", "product-categories", params],
    queryFn: async () => {
      const res = await getProductCategories(params);
      return res.data;
    },
  });
}

/**
 * Query hook to fetch all product categories (for parent pickers and table name lookups).
 */
export function useAllProductCategoriesQuery() {
  return useQuery({
    queryKey: ["admin", "product-categories", "all-categories"],
    queryFn: async () => {
      const res = await getProductCategories({
        pageNumber: 1,
        pageSize: 100,
        lang: "en",
        language: "en",
      });
      const raw: any = res;
      if (Array.isArray(raw?.data?.items)) return raw.data.items;
      if (Array.isArray(raw?.items)) return raw.items;
      if (Array.isArray(raw?.data)) return raw.data;
      if (Array.isArray(raw)) return raw;
      return [];
    },
    staleTime: 60 * 1000,
  });
}

/**
 * Query hook to fetch multi-language category details for editing.
 */
export function useProductCategoryAllLanguagesQuery(id?: number | null) {
  return useQuery({
    queryKey: ["admin", "product-category-localized", id],
    queryFn: () => getProductCategoryAllLanguages(id!),
    enabled: typeof id === "number" && id > 0,
    staleTime: 0,
  });
}

/**
 * Mutation hook for creating a product category and optionally uploading its cover image.
 */
export function useCreateProductCategoryMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      body,
      imageFile,
    }: {
      body: ProductCategoryUpsertRequest;
      imageFile?: File | null;
    }) => {
      const sanitizedBody: ProductCategoryUpsertRequest = {
        ...body,
        name: fillMissingProductCategoryLanguages(body.name),
      };

      const res = await createProductCategory(sanitizedBody);
      const createdId = res.data?.id;

      if (imageFile && typeof createdId === "number") {
        try {
          await uploadProductCategoryImage(createdId, imageFile);
        } catch (imageErr: unknown) {
          toast.error(
            extractErrorMessage(
              imageErr,
              "Category created, but cover image upload failed."
            )
          );
        }
      }

      return res;
    },
    onSuccess: () => {
      toast.success("Product category created successfully.");
      qc.invalidateQueries({ queryKey: ["admin", "product-categories"] });
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err, "Failed to create product category."));
    },
  });
}

/**
 * Mutation hook for updating an existing product category, with image replacement/removal.
 */
export function useUpdateProductCategoryMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      body,
      imageFile,
      removeImage = false,
    }: {
      id: number;
      body: ProductCategoryUpsertRequest;
      imageFile?: File | null;
      removeImage?: boolean;
    }) => {
      const sanitizedBody: ProductCategoryUpsertRequest = {
        ...body,
        name: fillMissingProductCategoryLanguages(body.name),
      };

      const res = await updateProductCategory(id, sanitizedBody);

      if (imageFile) {
        try {
          await uploadProductCategoryImage(id, imageFile);
        } catch (imageErr: unknown) {
          toast.error(
            extractErrorMessage(
              imageErr,
              "Category updated, but image replacement failed."
            )
          );
        }
      } else if (removeImage) {
        try {
          await deleteProductCategoryImage(id);
        } catch (imageErr: unknown) {
          toast.error(
            extractErrorMessage(
              imageErr,
              "Category updated, but image removal failed."
            )
          );
        }
      }

      return res;
    },
    onSuccess: (_, vars) => {
      toast.success("Product category updated successfully.");
      qc.invalidateQueries({ queryKey: ["admin", "product-categories"] });
      qc.invalidateQueries({
        queryKey: ["admin", "product-category-localized", vars.id],
      });
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err, "Failed to update product category."));
    },
  });
}

/**
 * Mutation hook for deleting a product category.
 */
export function useDeleteProductCategoryMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteProductCategory(id),
    onSuccess: () => {
      toast.success("Product category deleted successfully.");
      qc.invalidateQueries({ queryKey: ["admin", "product-categories"] });
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err, "Failed to delete product category."));
    },
  });
}
