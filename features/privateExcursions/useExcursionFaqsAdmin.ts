import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createExcursionFaq,
  deleteExcursionFaq,
  getExcursionFaqAllLanguages,
  getExcursionFaqs,
  updateExcursionFaq,
} from "@/api/excursionFaqApi";
import { extractErrorMessage } from "@/features/auth/useAuth";
import type { ExcursionFaqUpsertRequest } from "@/models/excursionDetails";

export const EXCURSION_FAQS_KEY = ["admin", "excursion-faqs"] as const;

export function useExcursionFaqsQuery(
  excursionId?: string | null,
  lang: string = "en"
) {
  return useQuery({
    queryKey: [...EXCURSION_FAQS_KEY, excursionId, lang],
    queryFn: () => (excursionId ? getExcursionFaqs(excursionId, lang) : []),
    enabled: Boolean(excursionId),
  });
}

export function useExcursionFaqAllLanguagesQuery(
  excursionId?: string | null,
  faqId?: string | null
) {
  return useQuery({
    queryKey: [...EXCURSION_FAQS_KEY, excursionId, "detail", faqId],
    queryFn: () =>
      excursionId && faqId ? getExcursionFaqAllLanguages(excursionId, faqId) : null,
    enabled: Boolean(excursionId && faqId),
    staleTime: 0,
    gcTime: 0,
  });
}

export function useCreateExcursionFaqMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      excursionId,
      payload,
    }: {
      excursionId: string;
      payload: ExcursionFaqUpsertRequest;
    }) => createExcursionFaq(excursionId, payload),
    onSuccess: (_, variables) => {
      toast.success("FAQ created successfully.");
      qc.invalidateQueries({
        queryKey: [...EXCURSION_FAQS_KEY, variables.excursionId],
      });
      qc.invalidateQueries({ queryKey: ["admin", "private-excursions"] });
      qc.invalidateQueries({ queryKey: ["admin", "group-excursions"] });
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err));
    },
  });
}

export function useUpdateExcursionFaqMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      excursionId,
      faqId,
      payload,
    }: {
      excursionId: string;
      faqId: string;
      payload: ExcursionFaqUpsertRequest;
    }) => updateExcursionFaq(excursionId, faqId, payload),
    onSuccess: (_, variables) => {
      toast.success("FAQ updated successfully.");
      qc.invalidateQueries({
        queryKey: [...EXCURSION_FAQS_KEY, variables.excursionId],
      });
      qc.invalidateQueries({ queryKey: ["admin", "private-excursions"] });
      qc.invalidateQueries({ queryKey: ["admin", "group-excursions"] });
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err));
    },
  });
}

export function useDeleteExcursionFaqMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      excursionId,
      faqId,
    }: {
      excursionId: string;
      faqId: string;
    }) => deleteExcursionFaq(excursionId, faqId),
    onSuccess: (_, variables) => {
      toast.success("FAQ deleted successfully.");
      qc.invalidateQueries({
        queryKey: [...EXCURSION_FAQS_KEY, variables.excursionId],
      });
      qc.invalidateQueries({ queryKey: ["admin", "private-excursions"] });
      qc.invalidateQueries({ queryKey: ["admin", "group-excursions"] });
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err));
    },
  });
}
