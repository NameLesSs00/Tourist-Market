import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getProductById, getProducts } from "@/clientApi/productApi";
import { getProductSubcategoryById } from "@/clientApi/productSubcategoryApi";
import { createProductBooking } from "@/clientApi/productBookingApi";
import type { ProductDetail, ProductListItem, ProductQueryParams } from "@/models/product";
import type { CreateProductBookingRequest, ProductBookingItem } from "@/models/productBooking";
import { extractErrorMessage } from "@/features/auth/useAuth";

export const CLIENT_PRODUCTS_KEY = ["products"] as const;

/**
 * Fetches paginated products for client visitors with smooth transition caching.
 */
export function useClientProductsQuery(params: ProductQueryParams = {}) {
  return useQuery({
    queryKey: [...CLIENT_PRODUCTS_KEY, "client-list", params],
    queryFn: async () => {
      const res = await getProducts(params);
      return res.data;
    },
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
  });
}

/**
 * Fetches single product detail by numeric ID for client visitors.
 */
export function useClientProductDetailQuery(
  id: number | null | undefined,
  language: string = "en"
) {
  return useQuery<ProductDetail | null>({
    queryKey: [...CLIENT_PRODUCTS_KEY, "client-detail", id, language],
    queryFn: async () => {
      if (!id || id <= 0) return null;
      const res = await getProductById(id, language);
      return res.data ?? null;
    },
    enabled: Boolean(id && id > 0),
    staleTime: 30 * 1000,
  });
}

/**
 * Fetches subcategory detail to retrieve the category/subcategory name for a product.
 */
export function useClientProductSubcategoryQuery(
  subCategoryId: number | null | undefined,
  language: string = "en"
) {
  return useQuery({
    queryKey: ["client", "product-subcategory", subCategoryId, language],
    queryFn: async () => {
      if (!subCategoryId || subCategoryId <= 0) return null;
      const res = await getProductSubcategoryById(subCategoryId, language);
      return res.data ?? null;
    },
    enabled: Boolean(subCategoryId && subCategoryId > 0),
    staleTime: 60 * 1000,
  });
}

/**
 * Fetches related products (from same subcategory or general products, excluding current).
 */
export function useClientRelatedProductsQuery(
  currentProductId: number | null | undefined,
  subCategoryId?: number,
  language: string = "en"
) {
  return useQuery<ProductListItem[]>({
    queryKey: [
      ...CLIENT_PRODUCTS_KEY,
      "client-related",
      currentProductId,
      subCategoryId,
      language,
    ],
    queryFn: async () => {
      const res = await getProducts({
        subCategoryId: subCategoryId && subCategoryId > 0 ? subCategoryId : undefined,
        language,
        pageNumber: 1,
        pageSize: 8,
      });

      let items = res.data?.items ?? [];
      let candidates = items.filter((p) => p.id !== currentProductId);

      if (candidates.length < 4 && subCategoryId && subCategoryId > 0) {
        const fallbackRes = await getProducts({
          language,
          pageNumber: 1,
          pageSize: 8,
        });
        const fallbackItems = fallbackRes.data?.items ?? [];
        for (const item of fallbackItems) {
          if (
            item.id !== currentProductId &&
            !candidates.some((c) => c.id === item.id)
          ) {
            candidates.push(item);
          }
          if (candidates.length >= 4) break;
        }
      }

      return candidates.slice(0, 4);
    },
    enabled: Boolean(currentProductId),
    staleTime: 30 * 1000,
  });
}

/**
 * Mutation hook for customers placing a product delivery booking from HotelDeliveries.
 */
export function useCreateProductBookingMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProductBookingRequest): Promise<ProductBookingItem> =>
      createProductBooking(payload),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["admin", "product-bookings"] });
      toast.success(
        `Booking submitted successfully! Ref: ${data.bookingReference || "Pending"}`
      );
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to submit booking. Please check your details and try again."));
    },
  });
}
