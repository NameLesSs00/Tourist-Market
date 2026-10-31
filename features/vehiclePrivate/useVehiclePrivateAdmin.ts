import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/errorUtils";
import {
  createVehiclePrivate,
  deleteVehiclePrivate,
  getVehiclePrivateAllLanguages,
  getVehiclePrivates,
  updateVehiclePrivate,
} from "@/clientApi/vehiclePrivateApi";
import type {
  VehiclePrivateQueryParams,
  VehiclePrivateUpsertRequest,
} from "@/models/vehiclePrivate";

export const vehiclePrivateKeys = {
  all: ["admin", "vehicle-private"] as const,
  lists: () => [...vehiclePrivateKeys.all, "list"] as const,
  list: (params: VehiclePrivateQueryParams) =>
    [...vehiclePrivateKeys.lists(), params] as const,
  details: () => [...vehiclePrivateKeys.all, "detail"] as const,
  detail: (id: string) => [...vehiclePrivateKeys.details(), id] as const,
  localized: (id: string) => [...vehiclePrivateKeys.all, "localized", id] as const,
};

export function useVehiclePrivatesQuery(
  params: VehiclePrivateQueryParams = {}
) {
  return useQuery({
    queryKey: vehiclePrivateKeys.list(params),
    queryFn: () => getVehiclePrivates(params),
  });
}

export function useVehiclePrivateAllLanguagesQuery(id?: string | null) {
  return useQuery({
    queryKey: vehiclePrivateKeys.localized(id || ""),
    queryFn: () => getVehiclePrivateAllLanguages(id!),
    enabled: Boolean(id),
    staleTime: 0,
  });
}

export function useCreateVehiclePrivateMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: VehiclePrivateUpsertRequest) =>
      createVehiclePrivate(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: vehiclePrivateKeys.all });
      toast.success("Vehicle created successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to create vehicle."));
    },
  });
}

export function useUpdateVehiclePrivateMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: VehiclePrivateUpsertRequest;
    }) => updateVehiclePrivate(id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: vehiclePrivateKeys.all });
      toast.success("Vehicle updated successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to update vehicle."));
    },
  });
}

export function useDeleteVehiclePrivateMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteVehiclePrivate(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: vehiclePrivateKeys.all });
      toast.success("Vehicle deleted successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to delete vehicle."));
    },
  });
}
