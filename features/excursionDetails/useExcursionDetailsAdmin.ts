import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createExcursionDetails,
  deleteExcursionDetails,
  getExcursionDetailsAllLanguages,
  updateExcursionDetails,
} from "@/clientApi/excursionDetailsApi";
import { extractErrorMessage } from "@/features/auth/useAuth";
import type { ExcursionDetailsUpsertRequest } from "@/models/excursionDetails";

export const EXCURSION_DETAILS_KEY = ["admin", "excursion-details"] as const;

export function useExcursionDetailsAllLanguagesQuery(excursionId?: string | null) {
  return useQuery({
    queryKey: [...EXCURSION_DETAILS_KEY, "all-languages", excursionId],
    queryFn: () => getExcursionDetailsAllLanguages(excursionId!),
    enabled: Boolean(excursionId),
  });
}

export function useCreateExcursionDetailsMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      excursionId,
      body,
      lang = "en",
    }: {
      excursionId: string;
      body: ExcursionDetailsUpsertRequest;
      lang?: string;
    }) => {
      return await createExcursionDetails(excursionId, body, lang);
    },
    onSuccess: (_, variables) => {
      toast.success("Excursion details created successfully.");
      qc.invalidateQueries({
        queryKey: [...EXCURSION_DETAILS_KEY, "all-languages", variables.excursionId],
      });
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });
}

export function useUpdateExcursionDetailsMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      excursionId,
      body,
      lang = "en",
    }: {
      excursionId: string;
      body: ExcursionDetailsUpsertRequest;
      lang?: string;
    }) => {
      return await updateExcursionDetails(excursionId, body, lang);
    },
    onSuccess: (_, variables) => {
      toast.success("Excursion details updated successfully.");
      qc.invalidateQueries({
        queryKey: [...EXCURSION_DETAILS_KEY, "all-languages", variables.excursionId],
      });
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });
}

export function useDeleteExcursionDetailsMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (excursionId: string) => {
      return await deleteExcursionDetails(excursionId);
    },
    onSuccess: (_, excursionId) => {
      toast.success("Excursion details removed successfully.");
      qc.invalidateQueries({
        queryKey: [...EXCURSION_DETAILS_KEY, "all-languages", excursionId],
      });
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });
}
