import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/errorUtils";
import {
  createVehicleTypeTransfer,
  deleteVehicleTypeTransfer,
  getVehicleTypeTransferById,
  getVehicleTypeTransfers,
  updateVehicleTypeTransfer,
} from "@/clientApi/vehicleTypeTransferApi";
import type {
  CreateVehicleTypeTransferRequest,
  UpdateVehicleTypeTransferRequest,
  VehicleTypeTransferQueryParams,
} from "@/models/vehicleTypeTransfer";

export const vehicleTypeTransferKeys = {
  all: ["admin", "vehicle-type-transfers"] as const,
  lists: () => [...vehicleTypeTransferKeys.all, "list"] as const,
  list: (params: VehicleTypeTransferQueryParams) =>
    [...vehicleTypeTransferKeys.lists(), params] as const,
  details: () => [...vehicleTypeTransferKeys.all, "detail"] as const,
  detail: (id: string) => [...vehicleTypeTransferKeys.details(), id] as const,
};

export function useVehicleTypeTransfersQuery(
  params: VehicleTypeTransferQueryParams = {}
) {
  return useQuery({
    queryKey: vehicleTypeTransferKeys.list(params),
    queryFn: () => getVehicleTypeTransfers(params),
  });
}

export function useVehicleTypeTransferByIdQuery(id?: string | null) {
  return useQuery({
    queryKey: vehicleTypeTransferKeys.detail(id || ""),
    queryFn: () => getVehicleTypeTransferById(id!),
    enabled: Boolean(id),
    staleTime: 0,
  });
}

export function useCreateVehicleTypeTransferMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateVehicleTypeTransferRequest) =>
      createVehicleTypeTransfer(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: vehicleTypeTransferKeys.all });
      toast.success("Vehicle type created successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to create vehicle type."));
    },
  });
}

export function useUpdateVehicleTypeTransferMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: UpdateVehicleTypeTransferRequest;
    }) => updateVehicleTypeTransfer(id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: vehicleTypeTransferKeys.all });
      toast.success("Vehicle type updated successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to update vehicle type."));
    },
  });
}

export function useDeleteVehicleTypeTransferMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteVehicleTypeTransfer(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: vehicleTypeTransferKeys.all });
      toast.success("Vehicle type deleted successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to delete vehicle type."));
    },
  });
}

