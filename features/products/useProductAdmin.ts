import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/errorUtils";
import {
  createProduct,
  deleteProduct,
  deleteProductImage,
  getProductAllLanguages,
  getProductImages,
  getProducts,
  reorderProductImages,
  updateProduct,
  uploadProductImages,
} from "@/clientApi/productApi";
import type {
  ProductImageReorderItem,
  ProductQueryParams,
  ProductUpsertRequest,
} from "@/models/product";

export function useProductsQuery(params: ProductQueryParams = {}) {
  return useQuery({
    queryKey: ["admin", "products", params],
    queryFn: () => getProducts(params),
  });
}

export function useProductAllLanguagesQuery(id?: number | null) {
  return useQuery({
    queryKey: ["admin", "product-localized", id],
    queryFn: () => getProductAllLanguages(id!),
    enabled: Boolean(id && id > 0),
    staleTime: 0,
  });
}

export function useProductImagesQuery(productId?: number | null) {
  return useQuery({
    queryKey: ["admin", "product-images", productId],
    queryFn: async () => {
      const res = await getProductImages(productId!);
      return res.data || [];
    },
    enabled: Boolean(productId && productId > 0),
  });
}

export function useCreateProductMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      body,
      newImages,
    }: {
      body: ProductUpsertRequest;
      newImages?: File[];
    }) => {
      const res = await createProduct(body);
      const created = res.data;

      if (created?.id && newImages && newImages.length > 0) {
        try {
          await uploadProductImages(created.id, newImages);
        } catch (imageErr: unknown) {
          toast.error(
            extractErrorMessage(
              imageErr,
              "Product created, but some images failed to upload."
            )
          );
        }
      }
      return created;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "products"] });
      toast.success("Product created successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to create product."));
    },
  });
}

export function useUpdateProductMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      body,
      newImages,
      deletedImageIds,
    }: {
      id: number;
      body: ProductUpsertRequest;
      newImages?: File[];
      deletedImageIds?: number[];
    }) => {
      const res = await updateProduct(id, body);

      if (deletedImageIds && deletedImageIds.length > 0) {
        await Promise.allSettled(
          deletedImageIds.map((imgId) => deleteProductImage(id, imgId))
        );
      }

      if (newImages && newImages.length > 0) {
        try {
          await uploadProductImages(id, newImages);
        } catch (imageErr: unknown) {
          toast.error(
            extractErrorMessage(
              imageErr,
              "Product updated, but image upload failed."
            )
          );
        }
      }

      return res.data;
    },
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ["admin", "products"] });
      qc.invalidateQueries({
        queryKey: ["admin", "product-localized", variables.id],
      });
      qc.invalidateQueries({
        queryKey: ["admin", "product-images", variables.id],
      });
      toast.success("Product updated successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to update product."));
    },
  });
}

export function useDeleteProductMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "products"] });
      toast.success("Product deleted successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to delete product."));
    },
  });
}

export function useReorderProductImagesMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      images,
    }: {
      productId: number;
      images: ProductImageReorderItem[];
    }) => reorderProductImages(productId, images),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({
        queryKey: ["admin", "product-images", variables.productId],
      });
      qc.invalidateQueries({ queryKey: ["admin", "products"] });
      toast.success("Images reordered successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to reorder images."));
    },
  });
}
