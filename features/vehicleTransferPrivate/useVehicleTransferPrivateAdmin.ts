import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createVehicleTransferPrivate,
  deleteVehicleTransferPrivate,
  getVehicleTransferPrivates,
  matchVehicleTransferPrivate,
  updateVehicleTransferPrivate,
} from "@/clientApi/vehicleTransferPrivateApi";
import type {
  VehicleTransferMatchParams,
  VehicleTransferPrivateCreateRequest,
  VehicleTransferPrivateQueryParams,
  VehicleTransferPrivateUpdateRequest,
} from "@/models/vehicleTransferPrivate";

export const vehicleTransferPrivateKeys = {
  all: ["admin", "vehicle-transfer-private"] as const,
  lists: () => [...vehicleTransferPrivateKeys.all, "list"] as const,
  list: (params: VehicleTransferPrivateQueryParams) =>
    [...vehicleTransferPrivateKeys.lists(), params] as const,
  details: () => [...vehicleTransferPrivateKeys.all, "detail"] as const,
  detail: (id: string) => [...vehicleTransferPrivateKeys.details(), id] as const,
  match: (params: VehicleTransferMatchParams) =>
    [...vehicleTransferPrivateKeys.all, "match", params] as const,
};

function extractErrorMessage(err: unknown, fallback: string): string {
  if (err && typeof err === "object" && "response" in err) {
    const res = (err as { response?: { data?: { message?: string; detail?: string; title?: string } } }).response;
    return res?.data?.detail || res?.data?.message || res?.data?.title || fallback;
  }
  return fallback;
}

export function useVehicleTransferPrivatesQuery(
  params: VehicleTransferPrivateQueryParams = {},
  enabled = true
) {
  return useQuery({
    queryKey: vehicleTransferPrivateKeys.list(params),
    queryFn: () => getVehicleTransferPrivates(params),
    enabled,
  });
}

export function useCreateVehicleTransferPrivateMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: VehicleTransferPrivateCreateRequest) =>
      createVehicleTransferPrivate(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: vehicleTransferPrivateKeys.all });
      toast.success("Vehicle transfer rate created successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to create vehicle transfer rate."));
    },
  });
}

export function useUpdateVehicleTransferPrivateMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: VehicleTransferPrivateUpdateRequest;
    }) => updateVehicleTransferPrivate(id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: vehicleTransferPrivateKeys.all });
      toast.success("Vehicle transfer rate updated successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to update vehicle transfer rate."));
    },
  });
}

export function useDeleteVehicleTransferPrivateMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteVehicleTransferPrivate(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: vehicleTransferPrivateKeys.all });
      toast.success("Vehicle transfer rate deleted successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to delete vehicle transfer rate."));
    },
  });
}

/** Match endpoint hook — implemented for client-side booking use */
export function useMatchVehicleTransferPrivateQuery(
  params: VehicleTransferMatchParams,
  enabled = false
) {
  return useQuery({
    queryKey: vehicleTransferPrivateKeys.match(params),
    queryFn: () => matchVehicleTransferPrivate(params),
    enabled: enabled && Boolean(params.privateExcursionId && params.passengerCount),
  });
}
