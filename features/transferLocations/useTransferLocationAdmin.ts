import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
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
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to create pickup location."
          : "Failed to create pickup location.";
      toast.error(msg);
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
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to update pickup location."
          : "Failed to update pickup location.";
      toast.error(msg);
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
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to delete pickup location."
          : "Failed to delete pickup location.";
      toast.error(msg);
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
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to create destination location."
          : "Failed to create destination location.";
      toast.error(msg);
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
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to update destination location."
          : "Failed to update destination location.";
      toast.error(msg);
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
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to delete destination location."
          : "Failed to delete destination location.";
      toast.error(msg);
    },
  });
}
