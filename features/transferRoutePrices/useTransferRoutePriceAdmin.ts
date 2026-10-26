import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createTransferRoutePrice,
  deleteTransferRoutePrice,
  getTransferRoutePriceById,
  getTransferRoutePrices,
  updateTransferRoutePrice,
} from "@/clientApi/transferRoutePriceApi";
import type {
  TransferRoutePriceQueryParams,
  TransferRoutePriceUpsertRequest,
} from "@/models/transferRoutePrice";

export const transferRoutePriceKeys = {
  all: ["admin", "transfer-route-prices"] as const,
  lists: () => [...transferRoutePriceKeys.all, "list"] as const,
  list: (params: TransferRoutePriceQueryParams) =>
    [...transferRoutePriceKeys.lists(), params] as const,
  details: () => [...transferRoutePriceKeys.all, "detail"] as const,
  detail: (id: string) => [...transferRoutePriceKeys.details(), id] as const,
};

function extractErrorMessage(err: unknown, fallback: string): string {
  if (err && typeof err === "object" && "response" in err) {
    const res = (err as { response?: { data?: { message?: string; detail?: string; title?: string } } }).response;
    return res?.data?.detail || res?.data?.message || res?.data?.title || fallback;
  }
  return fallback;
}

export function useTransferRoutePricesQuery(
  params: TransferRoutePriceQueryParams = {}
) {
  return useQuery({
    queryKey: transferRoutePriceKeys.list(params),
    queryFn: () => getTransferRoutePrices(params),
  });
}

export function useTransferRoutePriceByIdQuery(id?: string | null) {
  return useQuery({
    queryKey: transferRoutePriceKeys.detail(id || ""),
    queryFn: () => getTransferRoutePriceById(id!),
    enabled: Boolean(id),
    staleTime: 0,
  });
}

export function useCreateTransferRoutePriceMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: TransferRoutePriceUpsertRequest) =>
      createTransferRoutePrice(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: transferRoutePriceKeys.all });
      toast.success("Route price created successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to create route price."));
    },
  });
}

export function useUpdateTransferRoutePriceMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: TransferRoutePriceUpsertRequest;
    }) => updateTransferRoutePrice(id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: transferRoutePriceKeys.all });
      toast.success("Route price updated successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to update route price."));
    },
  });
}

export function useDeleteTransferRoutePriceMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTransferRoutePrice(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: transferRoutePriceKeys.all });
      toast.success("Route price deleted successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to delete route price."));
    },
  });
}
