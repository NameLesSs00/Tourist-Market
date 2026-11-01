import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/errorUtils";
import {
  createTransferVehiclePrice,
  deleteTransferVehiclePrice,
  getTransferVehiclePriceById,
  getTransferVehiclePrices,
  updateTransferVehiclePrice,
} from "@/clientApi/transferVehiclePriceApi";
import type {
  CreateTransferVehiclePriceRequest,
  TransferVehiclePriceQueryParams,
  UpdateTransferVehiclePriceRequest,
} from "@/models/transferVehiclePrice";

export const transferVehiclePriceKeys = {
  all: ["admin", "transfer-vehicle-prices"] as const,
  lists: () => [...transferVehiclePriceKeys.all, "list"] as const,
  list: (params: TransferVehiclePriceQueryParams) =>
    [...transferVehiclePriceKeys.lists(), params] as const,
  details: () => [...transferVehiclePriceKeys.all, "detail"] as const,
  detail: (id: string) => [...transferVehiclePriceKeys.details(), id] as const,
};

export function useTransferVehiclePricesQuery(
  params: TransferVehiclePriceQueryParams = {}
) {
  return useQuery({
    queryKey: transferVehiclePriceKeys.list(params),
    queryFn: () => getTransferVehiclePrices(params),
  });
}

export function useTransferVehiclePriceByIdQuery(id?: string | null) {
  return useQuery({
    queryKey: transferVehiclePriceKeys.detail(id || ""),
    queryFn: () => getTransferVehiclePriceById(id!),
    enabled: Boolean(id),
    staleTime: 0,
  });
}

export function useCreateTransferVehiclePriceMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateTransferVehiclePriceRequest) =>
      createTransferVehiclePrice(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: transferVehiclePriceKeys.all });
      toast.success("Vehicle route price created successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to create vehicle route price."));
    },
  });
}

export function useUpdateTransferVehiclePriceMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: UpdateTransferVehiclePriceRequest;
    }) => updateTransferVehiclePrice(id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: transferVehiclePriceKeys.all });
      toast.success("Vehicle route price updated successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to update vehicle route price."));
    },
  });
}

export function useDeleteTransferVehiclePriceMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTransferVehiclePrice(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: transferVehiclePriceKeys.all });
      toast.success("Vehicle route price deleted successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to delete vehicle route price."));
    },
  });
}

