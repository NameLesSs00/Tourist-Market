import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import {
  assignPrivateExcursionAttractions,
  assignPrivateExcursionServices,
  createPrivateExcursion,
  deletePrivateExcursion,
  getPrivateExcursionAllLanguages,
  getPrivateExcursionAttractions,
  getPrivateExcursions,
  getPrivateExcursionServices,
  removePrivateExcursionAttraction,
  removePrivateExcursionService,
  updatePrivateExcursion,
} from "@/api/privateExcursionApi";
import { extractErrorMessage } from "@/features/auth/useAuth";
import { LANGS, type LocalizedText } from "@/models/localization";
import type {
  PrivateExcursionQueryParams,
  PrivateExcursionUpsertRequest,
} from "@/models/privateExcursion";

export const PRIVATE_EXCURSIONS_KEY = ["admin", "private-excursions"] as const;

/**
 * Fallback helper: fills any missing language with the English translation
 * to satisfy backend validation without 400 errors.
 */
export function fillMissingPrivateExcursionLanguages(
  body: PrivateExcursionUpsertRequest
): PrivateExcursionUpsertRequest {
  const fillText = (text: LocalizedText): LocalizedText => {
    const out = { ...text };
    const fallback = text.en?.trim() || "";
    LANGS.forEach((lang) => {
      if (!out[lang]?.trim()) {
        out[lang] = fallback;
      }
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

/**
 * Query hook for paginated private excursions list.
 */
export function usePrivateExcursionsQuery(
  params: PrivateExcursionQueryParams = {}
) {
  return useQuery({
    queryKey: [...PRIVATE_EXCURSIONS_KEY, "list", params],
    queryFn: () => getPrivateExcursions(params),
    placeholderData: keepPreviousData,
  });
}

/**
 * Query hook for multi-language detail view.
 */
export function usePrivateExcursionAllLanguagesQuery(id?: string | null) {
  return useQuery({
    queryKey: [...PRIVATE_EXCURSIONS_KEY, "all-languages", id],
    queryFn: () => getPrivateExcursionAllLanguages(id!),
    enabled: Boolean(id),
  });
}

/**
 * Query hook for assigned attractions.
 */
export function usePrivateExcursionAttractionsQuery(id?: string | null) {
  return useQuery({
    queryKey: [...PRIVATE_EXCURSIONS_KEY, "attractions", id],
    queryFn: () => getPrivateExcursionAttractions(id!),
    enabled: Boolean(id),
  });
}

/**
 * Query hook for assigned services.
 */
export function usePrivateExcursionServicesQuery(id?: string | null) {
  return useQuery({
    queryKey: [...PRIVATE_EXCURSIONS_KEY, "services", id],
    queryFn: () => getPrivateExcursionServices(id!),
    enabled: Boolean(id),
  });
}

/**
 * Mutation hook for creating private excursion.
 */
export function useCreatePrivateExcursionMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      body,
      attractionIds,
      serviceIds,
    }: {
      body: PrivateExcursionUpsertRequest;
      attractionIds?: string[];
      serviceIds?: string[];
    }) => {
      const sanitized = fillMissingPrivateExcursionLanguages(body);
      const res = await createPrivateExcursion(sanitized);
      const createdId = res.data?.id;

      if (createdId && attractionIds && attractionIds.length > 0) {
        try {
          await assignPrivateExcursionAttractions(createdId, attractionIds);
        } catch {
          // ignore relation assignment warning
        }
      }

      if (createdId && serviceIds && serviceIds.length > 0) {
        try {
          await assignPrivateExcursionServices(createdId, serviceIds);
        } catch {
          // ignore relation assignment warning
        }
      }

      return res;
    },
    onSuccess: () => {
      toast.success("Private excursion created successfully.");
      qc.invalidateQueries({ queryKey: [...PRIVATE_EXCURSIONS_KEY] });
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err));
    },
  });
}

/**
 * Mutation hook for updating private excursion.
 */
export function useUpdatePrivateExcursionMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      body,
      attractionIds,
      serviceIds,
    }: {
      id: string;
      body: PrivateExcursionUpsertRequest;
      attractionIds?: string[];
      serviceIds?: string[];
    }) => {
      const sanitized = fillMissingPrivateExcursionLanguages(body);
      const res = await updatePrivateExcursion(id, sanitized);

      if (attractionIds && attractionIds.length > 0) {
        try {
          await assignPrivateExcursionAttractions(id, attractionIds);
        } catch {
          // ignore relation warning
        }
      }

      if (serviceIds && serviceIds.length > 0) {
        try {
          await assignPrivateExcursionServices(id, serviceIds);
        } catch {
          // ignore relation warning
        }
      }

      return res;
    },
    onSuccess: () => {
      toast.success("Private excursion updated successfully.");
      qc.invalidateQueries({ queryKey: [...PRIVATE_EXCURSIONS_KEY] });
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err));
    },
  });
}

/**
 * Mutation hook for deleting private excursion.
 */
export function useDeletePrivateExcursionMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePrivateExcursion(id),
    onSuccess: () => {
      toast.success("Private excursion deleted successfully.");
      qc.invalidateQueries({ queryKey: [...PRIVATE_EXCURSIONS_KEY] });
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err));
    },
  });
}
