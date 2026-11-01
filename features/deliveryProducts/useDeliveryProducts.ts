import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createDeliveryProduct,
  deleteDeliveryProduct,
  getDeliveryProductById,
  getDeliveryProducts,
  updateDeliveryProduct,
} from "@/clientApi/deliveryProductApi";
import type {
  CreateDeliveryProductRequest,
  DeliveryProductItem,
  DeliveryProductQueryParams,
  PagedDeliveryProductsResult,
  UpdateDeliveryProductRequest,
} from "@/models/deliveryProduct";
import { extractErrorMessage } from "@/shared/utils/errorUtils";

export const DELIVERY_PRODUCTS_QUERY_KEY = ["delivery-products"] as const;

export function useDeliveryProductsQuery(params: DeliveryProductQueryParams = {}) {
  return useQuery<PagedDeliveryProductsResult>({
    queryKey: [...DELIVERY_PRODUCTS_QUERY_KEY, params],
    queryFn: () => getDeliveryProducts(params),
  });
}

export function useActiveDeliveryProductsQuery(language: string = "en") {
  return useQuery<PagedDeliveryProductsResult>({
    queryKey: [...DELIVERY_PRODUCTS_QUERY_KEY, "active", language],
    queryFn: () =>
      getDeliveryProducts({
        isActive: true,
        language,
        pageSize: 100,
      }),
    staleTime: 5 * 60 * 1000,
  });
}

export function useDeliveryProductDetailQuery(id?: number, language?: string) {
  return useQuery<DeliveryProductItem>({
    queryKey: [...DELIVERY_PRODUCTS_QUERY_KEY, "detail", id, language],
    queryFn: () => getDeliveryProductById(id!, language),
    enabled: typeof id === "number" && id > 0,
  });
}

export function useDeliveryProductAdmin() {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: DELIVERY_PRODUCTS_QUERY_KEY });
  };

  const createMutation = useMutation({
    mutationFn: (data: CreateDeliveryProductRequest) => createDeliveryProduct(data),
    onSuccess: () => {
      toast.success("Delivery area created successfully.");
      invalidate();
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(error, "Failed to create delivery area. Please try again.")
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateDeliveryProductRequest;
    }) => updateDeliveryProduct(id, data),
    onSuccess: () => {
      toast.success("Delivery area updated successfully.");
      invalidate();
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(error, "Failed to update delivery area. Please try again.")
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteDeliveryProduct(id),
    onSuccess: () => {
      toast.success("Delivery area deleted successfully.");
      invalidate();
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(error, "Failed to delete delivery area. Please try again.")
      );
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
}

