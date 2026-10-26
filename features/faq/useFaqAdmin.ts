import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createFaq,
  deleteFaq,
  getAdminFaqs,
  getFaqAllLanguages,
  updateFaq,
} from "@/clientApi/faqApi";
import { extractErrorMessage } from "@/features/auth/useAuth";
import { LANGS, type LocalizedText } from "@/models/localization";
import type {
  FaqQueryParams,
  FaqUpsertRequest,
} from "@/models/faq";

export const ADMIN_FAQS_KEY = ["admin", "faqs"] as const;

/** Paged FAQ list. The admin table always reads English. */
export function useAdminFaqsQuery(params: FaqQueryParams) {
  return useQuery({
    queryKey: [...ADMIN_FAQS_KEY, "list", params],
    queryFn: async () => {
      const res = await getAdminFaqs({ ...params, language: "en" });
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
}

/** All four languages of a single FAQ; only runs while the edit panel is open. */
export function useFaqAllLanguagesQuery(id: string | null) {
  return useQuery({
    queryKey: [...ADMIN_FAQS_KEY, "detail", id],
    queryFn: () => getFaqAllLanguages(id as string),
    enabled: Boolean(id),
    staleTime: 0,
    gcTime: 0,
  });
}

/**
 * On create only English is required. Any language left blank inherits the
 * English text so the backend always receives all four values.
 */
export function fillMissingLanguages(body: FaqUpsertRequest): FaqUpsertRequest {
  const fill = (text: LocalizedText): LocalizedText => {
    const out = { ...text };
    LANGS.forEach((lang) => {
      if (!out[lang]?.trim()) out[lang] = text.en;
    });
    return out;
  };
  return { ...body, question: fill(body.question), answer: fill(body.answer) };
}

export function useCreateFaq() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: FaqUpsertRequest) => createFaq(fillMissingLanguages(body)),
    onSuccess: (res) => {
      toast.success(res.message || "FAQ created successfully.");
      qc.invalidateQueries({ queryKey: ADMIN_FAQS_KEY });
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });
}

export function useUpdateFaq() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: FaqUpsertRequest }) =>
      updateFaq(id, body),
    onSuccess: (res) => {
      toast.success(res.message || "FAQ updated successfully.");
      qc.invalidateQueries({ queryKey: ADMIN_FAQS_KEY });
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });
}

export function useDeleteFaq() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteFaq(id),
    onSuccess: (res) => {
      toast.success(res.message || "FAQ deleted successfully.");
      qc.invalidateQueries({ queryKey: ADMIN_FAQS_KEY });
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });
}
