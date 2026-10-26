import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createGroupExcursion,
  deleteGroupExcursion,
  getGroupExcursionAllLanguages,
  getGroupExcursions,
  updateGroupExcursion,
} from "@/clientApi/groupExcursionApi";
import { extractErrorMessage } from "@/features/auth/useAuth";
import { LANGS, type LocalizedText } from "@/models/localization";
import type {
  GroupExcursionCreateRequest,
  GroupExcursionQueryParams,
  GroupExcursionUpdateRequest,
} from "@/models/groupExcursion";

export const GROUP_EXCURSIONS_KEY = ["admin", "group-excursions"] as const;

export function fillMissingGroupExcursionLanguages<
  T extends {
    title: LocalizedText;
    subtitle: LocalizedText;
    excursionType: LocalizedText;
    shortDescription: LocalizedText;
    fullProgram: LocalizedText;
  }
>(body: T): T {
  const fillText = (text: LocalizedText): LocalizedText => {
    const out = { ...text };
    const fallback = text.en?.trim() || "";
    LANGS.forEach((lang) => {
      if (!out[lang]?.trim()) out[lang] = fallback;
    });
    return out;
  };

  return {
    ...body,
    title: fillText(body.title),
    subtitle: fillText(body.subtitle),
    excursionType: fillText(body.excursionType),
    shortDescription: fillText(body.shortDescription),
    fullProgram: fillText(body.fullProgram),
  };
}

export function useGroupExcursionsQuery(params: GroupExcursionQueryParams = {}) {
  return useQuery({
    queryKey: [...GROUP_EXCURSIONS_KEY, "list", params],
    queryFn: () => getGroupExcursions(params),
    placeholderData: keepPreviousData,
  });
}

export function useGroupExcursionAllLanguagesQuery(id?: string | null) {
  return useQuery({
    queryKey: [...GROUP_EXCURSIONS_KEY, "all-languages", id],
    queryFn: () => getGroupExcursionAllLanguages(id!),
    enabled: Boolean(id),
  });
}

export function useCreateGroupExcursionMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (body: GroupExcursionCreateRequest) => {
      const filled = fillMissingGroupExcursionLanguages(body);
      return createGroupExcursion(filled, "en");
    },
    onSuccess: () => {
      toast.success("Group excursion created successfully.");
      qc.invalidateQueries({ queryKey: GROUP_EXCURSIONS_KEY });
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err));
    },
  });
}

export function useUpdateGroupExcursionMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: GroupExcursionUpdateRequest;
    }) => {
      const filledTranslations = fillMissingGroupExcursionLanguages(body.translations);
      return updateGroupExcursion(id, { ...body, translations: filledTranslations }, "en");
    },
    onSuccess: (_, variables) => {
      toast.success("Group excursion updated successfully.");
      qc.invalidateQueries({ queryKey: GROUP_EXCURSIONS_KEY });
      qc.invalidateQueries({
        queryKey: [...GROUP_EXCURSIONS_KEY, "all-languages", variables.id],
      });
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err));
    },
  });
}

export function useDeleteGroupExcursionMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteGroupExcursion(id),
    onSuccess: () => {
      toast.success("Group excursion deleted successfully.");
      qc.invalidateQueries({ queryKey: GROUP_EXCURSIONS_KEY });
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err));
    },
  });
}
