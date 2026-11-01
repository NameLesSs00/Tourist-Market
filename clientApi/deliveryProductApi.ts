import apiClient from "./apiConfig";
import type {
  CreateDeliveryProductRequest,
  DeliveryProductItem,
  DeliveryProductQueryParams,
  PagedDeliveryProductsResult,
  UpdateDeliveryProductRequest,
} from "@/models/deliveryProduct";

export async function getDeliveryProducts(
  params: DeliveryProductQueryParams = {}
): Promise<PagedDeliveryProductsResult> {
  const queryParams: Record<string, string | number | boolean> = {};

  if (params.isActive !== undefined && params.isActive !== null) {
    queryParams.isActive = params.isActive;
  }
  if (params.currency?.trim()) {
    queryParams.currency = params.currency.trim();
  }
  if (params.language?.trim()) {
    queryParams.language = params.language.trim();
  }
  queryParams.pageNumber = params.pageNumber ?? 1;
  queryParams.pageSize = params.pageSize ?? 20;

  const { data } = await apiClient.get<any>("/delivery-products", {
    params: queryParams,
  });

  if (data?.data?.items) {
    return data.data as PagedDeliveryProductsResult;
  }
  if (data?.items) {
    return data as PagedDeliveryProductsResult;
  }
  return {
    items: [],
    pageNumber: 1,
    pageSize: 20,
    totalCount: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  };
}

export async function getDeliveryProductById(
  id: number,
  language?: string
): Promise<DeliveryProductItem> {
  const params: Record<string, string> = {};
  if (language?.trim()) {
    params.language = language.trim();
  }

  const { data } = await apiClient.get<any>(`/delivery-products/${id}`, {
    params,
  });

  if (data?.data) {
    return data.data as DeliveryProductItem;
  }
  return data as DeliveryProductItem;
}

export async function createDeliveryProduct(
  payload: CreateDeliveryProductRequest
): Promise<DeliveryProductItem> {
  const { data } = await apiClient.post<any>("/delivery-products", payload);
  if (data?.data) {
    return data.data as DeliveryProductItem;
  }
  return data as DeliveryProductItem;
}

export async function updateDeliveryProduct(
  id: number,
  payload: UpdateDeliveryProductRequest
): Promise<DeliveryProductItem> {
  const { data } = await apiClient.put<any>(`/delivery-products/${id}`, payload);
  if (data?.data) {
    return data.data as DeliveryProductItem;
  }
  return data as DeliveryProductItem;
}

export async function deleteDeliveryProduct(id: number): Promise<void> {
  await apiClient.delete(`/delivery-products/${id}`);
}

