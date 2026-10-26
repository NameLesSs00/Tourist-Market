import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createExcursionService,
  deleteExcursionService,
  deleteExcursionServiceHero,
  deleteExcursionServiceImage,
  getExcursionServiceAllLanguages,
  getExcursionServiceById,
  getExcursionServices,
  updateExcursionService,
  uploadExcursionServiceHero,
  uploadExcursionServiceImages,
} from "@/clientApi/excursionServiceApi";
import { LANGS, type LocalizedText } from "@/models/localization";
import type {
  ExcursionServiceListParams,
  ExcursionServiceUpsertRequest,
} from "@/models/excursionService";

/**
 * Fallback helper: fills any missing language with the English translation
 * to satisfy backend validation without 400 errors.
 */
export function fillMissingExcursionServiceLanguages(
  body: ExcursionServiceUpsertRequest
): ExcursionServiceUpsertRequest {
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
    description: fillText(body.description),
  };
}

/**
 * Query hook for paginated excursion services list.
 */
export function useExcursionServicesQuery(
  params: ExcursionServiceListParams = {}
) {
  return useQuery({
    queryKey: ["admin", "excursion-services", params],
    queryFn: () => getExcursionServices(params),
  });
}

/**
 * Query hook to fetch single excursion service details.
 */
export function useExcursionServiceDetailQuery(
  id?: string | null,
  lang: string = "en",
  currency: string = "USD"
) {
  return useQuery({
    queryKey: ["admin", "excursion-service", id, lang, currency],
    queryFn: () => getExcursionServiceById(id!, lang, currency),
    enabled: Boolean(id),
  });
}

/**
 * Query hook to fetch multi-language excursion service details for editing.
 */
export function useExcursionServiceAllLanguagesQuery(id?: string | null) {
  return useQuery({
    queryKey: ["admin", "excursion-service-localized", id],
    queryFn: () => getExcursionServiceAllLanguages(id!),
    enabled: Boolean(id),
    staleTime: 0,
  });
}

/**
 * Mutation hook for creating an excursion service, plus optional hero and gallery images upload.
 */
export function useCreateExcursionServiceMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      body,
      heroFile,
      galleryFiles,
    }: {
      body: ExcursionServiceUpsertRequest;
      heroFile?: File | null;
      galleryFiles?: File[];
    }) => {
      const sanitizedBody = fillMissingExcursionServiceLanguages(body);
      const created = await createExcursionService(sanitizedBody);
      const id = created.id;

      if (id) {
        if (heroFile) {
          try {
            await uploadExcursionServiceHero(id, heroFile);
          } catch {
            toast.warning("Service option created, but hero image upload failed.");
          }
        }

        if (galleryFiles && galleryFiles.length > 0) {
          try {
            await uploadExcursionServiceImages(id, galleryFiles);
          } catch {
            toast.warning("Service option created, but gallery images upload failed.");
          }
        }
      }

      return created;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "excursion-services"] });
      toast.success("Excursion service option created successfully.");
    },
    onError: (err: unknown) => {
      const message =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data
              ?.message || "Failed to create service option."
          : "Failed to create service option.";
      toast.error(message);
    },
  });
}

/**
 * Mutation hook for updating an excursion service, plus optional hero and gallery changes.
 */
export function useUpdateExcursionServiceMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      body,
      heroFile,
      removeHero,
      newGalleryFiles,
      deletedGalleryImageIds,
    }: {
      id: string;
      body: ExcursionServiceUpsertRequest;
      heroFile?: File | null;
      removeHero?: boolean;
      newGalleryFiles?: File[];
      deletedGalleryImageIds?: string[];
    }) => {
      const sanitizedBody = fillMissingExcursionServiceLanguages(body);
      const updated = await updateExcursionService(id, sanitizedBody);

      // Hero image management
      if (removeHero && !heroFile) {
        try {
          await deleteExcursionServiceHero(id);
        } catch {
          // ignore or warn
        }
      } else if (heroFile) {
        try {
          await uploadExcursionServiceHero(id, heroFile);
        } catch {
          toast.warning("Details updated, but hero image replacement failed.");
        }
      }

      // Gallery deletions
      if (deletedGalleryImageIds && deletedGalleryImageIds.length > 0) {
        await Promise.allSettled(
          deletedGalleryImageIds.map((imgId) =>
            deleteExcursionServiceImage(id, imgId)
          )
        );
      }

      // Gallery additions
      if (newGalleryFiles && newGalleryFiles.length > 0) {
        try {
          await uploadExcursionServiceImages(id, newGalleryFiles);
        } catch {
          toast.warning("Details updated, but gallery images upload failed.");
        }
      }

      return updated;
    },
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ["admin", "excursion-services"] });
      qc.invalidateQueries({
        queryKey: ["admin", "excursion-service-localized", variables.id],
      });
      qc.invalidateQueries({
        queryKey: ["admin", "excursion-service", variables.id],
      });
      toast.success("Excursion service option updated successfully.");
    },
    onError: (err: unknown) => {
      const message =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data
              ?.message || "Failed to update service option."
          : "Failed to update service option.";
      toast.error(message);
    },
  });
}

/**
 * Mutation hook for deleting an excursion service.
 */
export function useDeleteExcursionServiceMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteExcursionService(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "excursion-services"] });
      toast.success("Excursion service option deleted successfully.");
    },
    onError: (err: unknown) => {
      const message =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data
              ?.message || "Failed to delete service option."
          : "Failed to delete service option.";
      toast.error(message);
    },
  });
}
