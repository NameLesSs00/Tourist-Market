import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/errorUtils";
import {
  createTransferFromLocation,
  createTransferToLocation,
  deleteTransferFromLocation,
  deleteTransferToLocation,
  getTransferFromLocationAllLanguages,
  getTransferFromLocations,
  getTransferToLocationAllLanguages,
  getTransferToLocations,
  updateTransferFromLocation,
  updateTransferToLocation,
} from "@/clientApi/transferLocationApi";
import type {
  TransferLocationQueryParams,
  TransferLocationUpsertRequest,
} from "@/models/transferLocation";

// ---------------------------------------------------------------------------
// From Locations (Pickups)
// ---------------------------------------------------------------------------

export function useTransferFromLocationsQuery(
  params: TransferLocationQueryParams = {}
) {
  return useQuery({
    queryKey: ["admin", "transfer-from-locations", params],
    queryFn: () => getTransferFromLocations(params),
  });
}

export function useTransferFromLocationAllLanguagesQuery(id?: string | null) {
  return useQuery({
    queryKey: ["admin", "transfer-from-location-localized", id],
    queryFn: () => getTransferFromLocationAllLanguages(id!),
    enabled: Boolean(id),
    staleTime: 0,
  });
}

export function useCreateTransferFromLocationMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: TransferLocationUpsertRequest) =>
      createTransferFromLocation(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "transfer-from-locations"] });
      toast.success("Pickup location created successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to create pickup location."));
    },
  });
}

export function useUpdateTransferFromLocationMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: TransferLocationUpsertRequest;
    }) => updateTransferFromLocation(id, body),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ["admin", "transfer-from-locations"] });
      qc.invalidateQueries({
        queryKey: ["admin", "transfer-from-location-localized", variables.id],
      });
      toast.success("Pickup location updated successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to update pickup location."));
    },
  });
}

export function useDeleteTransferFromLocationMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTransferFromLocation(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "transfer-from-locations"] });
      toast.success("Pickup location deleted successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to delete pickup location."));
    },
  });
}

// ---------------------------------------------------------------------------
// To Locations (Destinations)
// ---------------------------------------------------------------------------

export function useTransferToLocationsQuery(
  params: TransferLocationQueryParams = {}
) {
  return useQuery({
    queryKey: ["admin", "transfer-to-locations", params],
    queryFn: () => getTransferToLocations(params),
  });
}

export function useTransferToLocationAllLanguagesQuery(id?: string | null) {
  return useQuery({
    queryKey: ["admin", "transfer-to-location-localized", id],
    queryFn: () => getTransferToLocationAllLanguages(id!),
    enabled: Boolean(id),
    staleTime: 0,
  });
}

export function useCreateTransferToLocationMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: TransferLocationUpsertRequest) =>
      createTransferToLocation(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "transfer-to-locations"] });
      toast.success("Destination location created successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to create destination location."));
    },
  });
}

export function useUpdateTransferToLocationMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: TransferLocationUpsertRequest;
    }) => updateTransferToLocation(id, body),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ["admin", "transfer-to-locations"] });
      qc.invalidateQueries({
        queryKey: ["admin", "transfer-to-location-localized", variables.id],
      });
      toast.success("Destination location updated successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to update destination location."));
    },
  });
}

export function useDeleteTransferToLocationMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTransferToLocation(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "transfer-to-locations"] });
      toast.success("Destination location deleted successfully.");
    },
    onError: (err: unknown) => {
      toast.error(extractErrorMessage(err, "Failed to delete destination location."));
    },
  });
}
