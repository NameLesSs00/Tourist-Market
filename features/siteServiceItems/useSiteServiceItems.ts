import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createSiteServiceSubItem,
  deleteSiteServiceItemImage,
  deleteSiteServiceSubItem,
  getSiteServiceSubItemAllLanguages,
  getSiteServiceSubItems,
  updateSiteServiceSubItem,
  uploadSiteServiceItemImages,
} from "@/clientApi/siteServiceItemApi";
import { LANGS, type LocalizedText } from "@/models/localization";
import type {
  SiteServiceSubItemQueryParams,
  SiteServiceSubItemUpsertRequest,
} from "@/models/siteServiceItem";

/**
 * Fallback helper: fills any missing language with the English translation
 * to satisfy backend validation without 400 errors.
 */
export function fillMissingItemLanguages(text: LocalizedText): LocalizedText {
  const filled = { ...text };
  const fallback = text.en?.trim() || "";
  LANGS.forEach((lang) => {
    if (!filled[lang]?.trim()) {
      filled[lang] = fallback;
    }
  });
  return filled;
}

/**
 * Deep sanitizer for options and features before sending to the backend.
 */
function sanitizeSubItemPayload(
  body: SiteServiceSubItemUpsertRequest
): SiteServiceSubItemUpsertRequest {
  return {
    ...body,
    title: fillMissingItemLanguages(body.title),
    subtitle: fillMissingItemLanguages(body.subtitle),
    description: fillMissingItemLanguages(body.description),
    textTopImage: fillMissingItemLanguages(body.textTopImage),
    note: fillMissingItemLanguages(body.note),
    alert: fillMissingItemLanguages(body.alert),
    options: (body.options || []).map((opt) => ({
      ...opt,
      name: fillMissingItemLanguages(opt.name),
      values: (opt.values || []).map((val) => ({
        ...val,
        key: fillMissingItemLanguages(val.key),
        value: fillMissingItemLanguages(val.value),
      })),
    })),
    features: (body.features || []).map((feat) => ({
      ...feat,
      name: fillMissingItemLanguages(feat.name),
      values: (feat.values || []).map((val) => ({
        ...val,
        name: fillMissingItemLanguages(val.name),
      })),
    })),
  };
}

/**
 * Query hook for paginated site service sub-items.
 */
export function useSiteServiceSubItemsQuery(
  params: SiteServiceSubItemQueryParams = {}
) {
  return useQuery({
    queryKey: ["admin", "site-service-items", params],
    queryFn: async () => {
      const res = await getSiteServiceSubItems(params);
      return res.data;
    },
  });
}

/**
 * Query hook to fetch multi-language item details for editing.
 */
export function useSiteServiceSubItemAllLanguagesQuery(id?: string | null) {
  return useQuery({
    queryKey: ["admin", "site-service-item-localized", id],
    queryFn: () => getSiteServiceSubItemAllLanguages(id!),
    enabled: typeof id === "string" && id.length > 0,
    staleTime: 0,
  });
}

/**
 * Mutation hook for creating a site service item and uploading gallery images.
 */
export function useCreateSiteServiceSubItemMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      body,
      newGalleryFiles,
    }: {
      body: SiteServiceSubItemUpsertRequest;
      newGalleryFiles?: File[];
    }) => {
      const sanitized = sanitizeSubItemPayload(body);
      const res = await createSiteServiceSubItem(sanitized);
      const createdId = res.data?.id;

      if (newGalleryFiles && newGalleryFiles.length > 0 && createdId) {
        try {
          await uploadSiteServiceItemImages(createdId, newGalleryFiles);
        } catch {
          toast.warning("Item created, but gallery upload failed.");
        }
      }

      return res;
    },
    onSuccess: () => {
      toast.success("Site service item created successfully.");
      qc.invalidateQueries({ queryKey: ["admin", "site-service-items"] });
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create site service item.";
      toast.error(msg);
    },
  });
}

/**
 * Mutation hook for updating an existing site service item.
 */
export function useUpdateSiteServiceSubItemMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      body,
      newGalleryFiles,
      deletedImageIds,
    }: {
      id: string;
      body: SiteServiceSubItemUpsertRequest;
      newGalleryFiles?: File[];
      deletedImageIds?: string[];
    }) => {
      const sanitized = sanitizeSubItemPayload(body);
      const res = await updateSiteServiceSubItem(id, sanitized);

      // Delete removed images in parallel
      if (deletedImageIds && deletedImageIds.length > 0) {
        await Promise.allSettled(
          deletedImageIds.map((imgId) => deleteSiteServiceItemImage(imgId))
        );
      }

      // Upload newly staged gallery images
      if (newGalleryFiles && newGalleryFiles.length > 0) {
        try {
          await uploadSiteServiceItemImages(id, newGalleryFiles);
        } catch {
          toast.warning("Item updated, but new gallery upload failed.");
        }
      }

      return res;
    },
    onSuccess: (_, variables) => {
      toast.success("Site service item updated successfully.");
      qc.invalidateQueries({ queryKey: ["admin", "site-service-items"] });
      qc.invalidateQueries({
        queryKey: ["admin", "site-service-item-localized", variables.id],
      });
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update site service item.";
      toast.error(msg);
    },
  });
}

/**
 * Mutation hook for deleting a site service item.
 */
export function useDeleteSiteServiceSubItemMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteSiteServiceSubItem(id);
    },
    onSuccess: () => {
      toast.success("Site service item deleted successfully.");
      qc.invalidateQueries({ queryKey: ["admin", "site-service-items"] });
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to delete site service item.";
      toast.error(msg);
    },
  });
}
