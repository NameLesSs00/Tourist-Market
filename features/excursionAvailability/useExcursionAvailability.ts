import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  deleteExcursionAvailabilityDay,
  getExcursionAvailability,
  updateExcursionAvailabilityDay,
  updateWeeklyAvailability,
} from "@/api/excursionAvailabilityApi";
import type {
  UpdateDayAvailabilityItem,
  UpdateWeeklyAvailabilityRequest,
} from "@/models/excursionAvailability";

export const EXCURSION_AVAILABILITY_QUERY_KEY = ["admin", "excursion-availability"] as const;

export function useExcursionAvailabilityQuery(excursionId?: string | null) {
  return useQuery({
    queryKey: [...EXCURSION_AVAILABILITY_QUERY_KEY, excursionId],
    queryFn: () => getExcursionAvailability(excursionId!),
    enabled: Boolean(excursionId),
    staleTime: 30000,
  });
}

export function useUpdateWeeklyAvailabilityMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      excursionId,
      body,
    }: {
      excursionId: string;
      body: UpdateWeeklyAvailabilityRequest;
    }) => updateWeeklyAvailability(excursionId, body),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({
        queryKey: [...EXCURSION_AVAILABILITY_QUERY_KEY, vars.excursionId],
      });
      toast.success("Weekly availability updated successfully.");
    },
    onError: (err: unknown) => {
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to update weekly availability."
          : "Failed to update weekly availability.";
      toast.error(msg);
    },
  });
}

export function useUpdateExcursionAvailabilityDayMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      excursionId,
      availabilityId,
      body,
    }: {
      excursionId: string;
      availabilityId: string;
      body: UpdateDayAvailabilityItem;
    }) => updateExcursionAvailabilityDay(excursionId, availabilityId, body),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({
        queryKey: [...EXCURSION_AVAILABILITY_QUERY_KEY, vars.excursionId],
      });
      toast.success("Day availability updated.");
    },
    onError: (err: unknown) => {
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to update day availability."
          : "Failed to update day availability.";
      toast.error(msg);
    },
  });
}

export function useDeleteExcursionAvailabilityDayMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      excursionId,
      availabilityId,
    }: {
      excursionId: string;
      availabilityId: string;
    }) => deleteExcursionAvailabilityDay(excursionId, availabilityId),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({
        queryKey: [...EXCURSION_AVAILABILITY_QUERY_KEY, vars.excursionId],
      });
      toast.success("Availability record removed.");
    },
    onError: (err: unknown) => {
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to remove availability."
          : "Failed to remove availability.";
      toast.error(msg);
    },
  });
}
