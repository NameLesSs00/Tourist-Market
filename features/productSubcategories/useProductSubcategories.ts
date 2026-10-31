import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/errorUtils";
import {
  createProductSubcategory,
  deleteProductSubcategory,
  deleteProductSubcategoryImage,
  getProductSubcategoryAllLanguages,
  getProductSubcategories,
  reorderProductSubcategories,
  updateProductSubcategory,
  uploadProductSubcategoryImage,
} from "@/clientApi/productSubcategoryApi";
import type {
  ProductSubcategoryQueryParams,
  ProductSubcategoryReorderItem,
  ProductSubcategoryUpsertRequest,
} from "@/models/productSubcategory";

/**
 * Query hook for paginated product subcategories list.
 */
export function useProductSubcategoriesQuery(
  params: ProductSubcategoryQueryParams = {}
) {
  return useQuery({
    queryKey: ["admin", "product-subcategories", params],
    queryFn: async () => {
      const res = await getProductSubcategories(params);
      return res.data;
    },
  });
}

/**
 * Query hook to fetch multi-language product subcategory details for editing.
 */
export function useProductSubcategoryAllLanguagesQuery(id?: number | null) {
  return useQuery({
    queryKey: ["admin", "product-subcategory-localized", id],
    queryFn: () => getProductSubcategoryAllLanguages(id!),
    enabled: Boolean(id && id > 0),
    staleTime: 0,
  });
}

/**
 * Mutation hook for creating a product subcategory, plus optional cover image upload.
 */
export function useCreateProductSubcategoryMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      body,
      imageFile,
    }: {
      body: ProductSubcategoryUpsertRequest;
      imageFile?: File | null;
    }) => {
      const res = await createProductSubcategory(body);
      const createdItem = res.data;

      if (createdItem?.id && imageFile) {
        try {
          await uploadProductSubcategoryImage(createdItem.id, imageFile);
        } catch (imageErr: unknown) {
          toast.error(
            extractErrorMessage(
              imageErr,
              "Subcategory created, but cover image upload failed."
            )
          );
        }
      }

      return createdItem;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "product-subcategories"] });
      toast.success("Product subcategory created successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to create product subcategory."));
    },
  });
}

/**
 * Mutation hook for updating a product subcategory, plus cover image replace/delete.
 */
export function useUpdateProductSubcategoryMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      body,
      imageFile,
      removeImage,
    }: {
      id: number;
      body: ProductSubcategoryUpsertRequest;
      imageFile?: File | null;
      removeImage?: boolean;
    }) => {
      const res = await updateProductSubcategory(id, body);
      const updatedItem = res.data;

      if (removeImage && !imageFile) {
        try {
          await deleteProductSubcategoryImage(id);
        } catch {
          // ignore or warn
        }
      } else if (imageFile) {
        try {
          await uploadProductSubcategoryImage(id, imageFile);
        } catch (imageErr: unknown) {
          toast.error(
            extractErrorMessage(
              imageErr,
              "Details updated, but cover image replacement failed."
            )
          );
        }
      }

      return updatedItem;
    },
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ["admin", "product-subcategories"] });
      qc.invalidateQueries({
        queryKey: ["admin", "product-subcategory-localized", variables.id],
      });
      toast.success("Product subcategory updated successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to update product subcategory."));
    },
  });
}

/**
 * Mutation hook for deleting a product subcategory.
 */
export function useDeleteProductSubcategoryMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteProductSubcategory(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "product-subcategories"] });
      toast.success("Product subcategory deleted successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to delete product subcategory."));
    },
  });
}

/**
 * Mutation hook for bulk reordering product subcategories.
 */
export function useReorderProductSubcategoriesMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (items: ProductSubcategoryReorderItem[]) =>
      reorderProductSubcategories(items),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "product-subcategories"] });
      toast.success("Product subcategories reordered successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to reorder product subcategories."));
    },
  });
}
