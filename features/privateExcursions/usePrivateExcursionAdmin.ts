import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import type { PrivateExcursionQueryParams, PrivateExcursionUpsertRequest } from "@/models/privateExcursion";

export const PRIVATE_EXCURSIONS_KEY = ["admin", "private-excursions"] as const;

export function fillMissingPrivateExcursionLanguages(body: PrivateExcursionUpsertRequest): PrivateExcursionUpsertRequest {
  const fillText = (text: LocalizedText): LocalizedText => {
    const out = { ...text };
    const fallback = text.en?.trim() || "";
    LANGS.forEach((lang) => { if (!out[lang]?.trim()) out[lang] = fallback; });
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

export function usePrivateExcursionsQuery(params: PrivateExcursionQueryParams = {}) {
  return useQuery({
    queryKey: [...PRIVATE_EXCURSIONS_KEY, "list", params],
    queryFn: () => getPrivateExcursions(params),
    placeholderData: keepPreviousData,
  });
}

export function usePrivateExcursionAllLanguagesQuery(id?: string | null) {
  return useQuery({
    queryKey: [...PRIVATE_EXCURSIONS_KEY, "all-languages", id],
    queryFn: () => getPrivateExcursionAllLanguages(id!),
    enabled: Boolean(id),
  });
}

export function usePrivateExcursionAttractionsQuery(id?: string | null) {
  return useQuery({
    queryKey: [...PRIVATE_EXCURSIONS_KEY, "attractions", id],
    queryFn: () => getPrivateExcursionAttractions(id!),
    enabled: Boolean(id),
  });
}

export function usePrivateExcursionServicesQuery(id?: string | null) {
  return useQuery({
    queryKey: [...PRIVATE_EXCURSIONS_KEY, "services", id],
    queryFn: () => getPrivateExcursionServices(id!),
    enabled: Boolean(id),
  });
}

export function useCreatePrivateExcursionMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      body, attractionIds, serviceIds,
    }: {
      body: PrivateExcursionUpsertRequest;
      attractionIds?: string[];
      serviceIds?: string[];
    }) => {
      const sanitized = fillMissingPrivateExcursionLanguages(body);
      const res = await createPrivateExcursion(sanitized);
      const createdId = res.data?.id || (res as any)?.id || (res as any)?.data?.id;

      if (createdId) {
        if (attractionIds && attractionIds.length > 0) {
          try { await assignPrivateExcursionAttractions(createdId, attractionIds); }
          catch (e) { console.error(e); toast.error("Excursion created, but assigning attractions failed."); }
        }
        if (serviceIds && serviceIds.length > 0) {
          try { await assignPrivateExcursionServices(createdId, serviceIds); }
          catch (e) { console.error(e); toast.error("Excursion created, but assigning extra services failed."); }
        }
      }
      return res;
    },
    onSuccess: () => {
      toast.success("Private excursion created successfully.");
      qc.invalidateQueries({ queryKey: [...PRIVATE_EXCURSIONS_KEY] });
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });
}

export function useUpdatePrivateExcursionMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id, body, attractionIds, serviceIds, previousAttractionIds, previousServiceIds,
    }: {
      id: string;
      body: PrivateExcursionUpsertRequest;
      attractionIds?: string[];
      serviceIds?: string[];
      previousAttractionIds?: string[];
      previousServiceIds?: string[];
    }) => {
      const sanitized = fillMissingPrivateExcursionLanguages(body);
      const res = await updatePrivateExcursion(id, sanitized);

      // Delta sync attractions
      if (attractionIds !== undefined) {
        const prev = previousAttractionIds ?? [];
        const toAdd = attractionIds.filter((aid) => !prev.includes(aid));
        const toRemove = prev.filter((aid) => !attractionIds.includes(aid));
        if (toAdd.length > 0) {
          try { await assignPrivateExcursionAttractions(id, toAdd); }
          catch (e) { console.error(e); toast.error("Failed to assign new attractions."); }
        }
        for (const remId of toRemove) {
          try { await removePrivateExcursionAttraction(id, remId); } catch (e) { console.error(e); }
        }
      }

      // Delta sync services
      if (serviceIds !== undefined) {
        const prev = previousServiceIds ?? [];
        const toAdd = serviceIds.filter((sid) => !prev.includes(sid));
        const toRemove = prev.filter((sid) => !serviceIds.includes(sid));
        if (toAdd.length > 0) {
          try { await assignPrivateExcursionServices(id, toAdd); }
          catch (e) { console.error(e); toast.error("Failed to assign new extra services."); }
        }
        for (const remId of toRemove) {
          try { await removePrivateExcursionService(id, remId); } catch (e) { console.error(e); }
        }
      }

      return res;
    },
    onSuccess: () => {
      toast.success("Private excursion updated successfully.");
      qc.invalidateQueries({ queryKey: [...PRIVATE_EXCURSIONS_KEY] });
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });
}

export function useDeletePrivateExcursionMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePrivateExcursion(id),
    onSuccess: () => {
      toast.success("Private excursion deleted successfully.");
      qc.invalidateQueries({ queryKey: [...PRIVATE_EXCURSIONS_KEY] });
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });
}
