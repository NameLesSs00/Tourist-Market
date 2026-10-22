import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createAttraction,
  deleteAttraction,
  deleteAttractionHero,
  deleteAttractionImage,
  getAttractionAllLanguages,
  getAttractions,
  updateAttraction,
  uploadAttractionHero,
  uploadAttractionImages,
} from "@/api/attractionApi";
import { LANGS, type LocalizedText } from "@/models/localization";
import type {
  AttractionQueryParams,
  AttractionUpsertRequest,
} from "@/models/attraction";

/**
 * Fallback helper: fills any missing language with the English translation
 * to satisfy backend validation without 400 errors.
 */
export function fillMissingAttractionLanguages(
  body: AttractionUpsertRequest
): AttractionUpsertRequest {
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
 * Query hook for paginated attractions list.
 */
export function useAttractionsQuery(params: AttractionQueryParams = {}) {
  return useQuery({
    queryKey: ["admin", "attractions", params],
    queryFn: () => getAttractions(params),
  });
}

/**
 * Query hook to fetch multi-language attraction details for editing.
 */
export function useAttractionAllLanguagesQuery(id?: string | null) {
  return useQuery({
    queryKey: ["admin", "attraction-localized", id],
    queryFn: () => getAttractionAllLanguages(id!),
    enabled: Boolean(id),
    staleTime: 0,
  });
}

/**
 * Mutation hook for creating an attraction, plus optional hero and gallery images upload.
 */
export function useCreateAttractionMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      body,
      heroFile,
      galleryFiles,
    }: {
      body: AttractionUpsertRequest;
      heroFile?: File | null;
      galleryFiles?: File[];
    }) => {
      const sanitizedBody = fillMissingAttractionLanguages(body);
      const created = await createAttraction(sanitizedBody);
      const id = created.id;

      if (id) {
        if (heroFile) {
          try {
            await uploadAttractionHero(id, heroFile);
          } catch {
            toast.warning("Attraction created, but cover image upload failed.");
          }
        }

        if (galleryFiles && galleryFiles.length > 0) {
          try {
            await uploadAttractionImages(id, galleryFiles);
          } catch {
            toast.warning("Attraction created, but gallery images upload failed.");
          }
        }
      }

      return created;
    },
    onSuccess: () => {
      toast.success("Attraction created successfully.");
      qc.invalidateQueries({ queryKey: ["admin", "attractions"] });
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create attraction.";
      toast.error(msg);
    },
  });
}

/**
 * Mutation hook for updating an existing attraction, including media replacement/deletions.
 */
export function useUpdateAttractionMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      body,
      heroFile,
      removeHero = false,
      newGalleryFiles,
      deletedGalleryImageIds,
    }: {
      id: string;
      body: AttractionUpsertRequest;
      heroFile?: File | null;
      removeHero?: boolean;
      newGalleryFiles?: File[];
      deletedGalleryImageIds?: string[];
    }) => {
      const sanitizedBody = fillMissingAttractionLanguages(body);
      const updated = await updateAttraction(id, sanitizedBody);

      // Handle hero cover image
      if (heroFile) {
        try {
          await uploadAttractionHero(id, heroFile);
        } catch {
          toast.warning("Attraction updated, but cover image replacement failed.");
        }
      } else if (removeHero) {
        try {
          await deleteAttractionHero(id);
        } catch {
          toast.warning("Attraction updated, but cover image removal failed.");
        }
      }

      // Handle deleted gallery images
      if (deletedGalleryImageIds && deletedGalleryImageIds.length > 0) {
        await Promise.allSettled(
          deletedGalleryImageIds.map((imgId) => deleteAttractionImage(id, imgId))
        );
      }

      // Handle new gallery images
      if (newGalleryFiles && newGalleryFiles.length > 0) {
        try {
          await uploadAttractionImages(id, newGalleryFiles);
        } catch {
          toast.warning("Attraction updated, but gallery images upload failed.");
        }
      }

      return updated;
    },
    onSuccess: (_, vars) => {
      toast.success("Attraction updated successfully.");
      qc.invalidateQueries({ queryKey: ["admin", "attractions"] });
      qc.invalidateQueries({
        queryKey: ["admin", "attraction-localized", vars.id],
      });
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update attraction.";
      toast.error(msg);
    },
  });
}

/**
 * Mutation hook for deleting an attraction.
 */
export function useDeleteAttractionMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAttraction(id),
    onSuccess: () => {
      toast.success("Attraction deleted successfully.");
      qc.invalidateQueries({ queryKey: ["admin", "attractions"] });
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to delete attraction.";
      toast.error(msg);
    },
  });
}
