import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createSiteService,
  deleteSiteService,
  deleteSiteServiceImage,
  getSiteServiceAllLanguages,
  getSiteServices,
  updateSiteService,
  uploadSiteServiceImage,
} from "@/clientApi/siteServiceApi";
import { LANGS, type LocalizedText } from "@/models/localization";
import type {
  SiteServiceQueryParams,
  SiteServiceUpsertRequest,
} from "@/models/siteService";

/**
 * Fallback helper: fills any missing language with the English translation
 * to satisfy backend validation without 400 errors.
 */
export function fillMissingSiteServiceLanguages(
  text: LocalizedText
): LocalizedText {
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
 * Query hook for paginated site services.
 */
export function useSiteServicesQuery(params: SiteServiceQueryParams = {}) {
  return useQuery({
    queryKey: ["admin", "site-services", params],
    queryFn: async () => {
      const res = await getSiteServices(params);
      return res.data;
    },
  });
}

/**
 * Query hook to fetch multi-language site service details for editing.
 */
export function useSiteServiceAllLanguagesQuery(id?: string | null) {
  return useQuery({
    queryKey: ["admin", "site-service-localized", id],
    queryFn: () => getSiteServiceAllLanguages(id!),
    enabled: typeof id === "string" && id.length > 0,
    staleTime: 0,
  });
}

/**
 * Mutation hook for creating a site service and optionally uploading its cover image.
 */
export function useCreateSiteServiceMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      body,
      imageFile,
    }: {
      body: SiteServiceUpsertRequest;
      imageFile?: File | null;
    }) => {
      const sanitizedBody: SiteServiceUpsertRequest = {
        ...body,
        title: fillMissingSiteServiceLanguages(body.title),
        description: fillMissingSiteServiceLanguages(body.description),
      };

      const res = await createSiteService(sanitizedBody);
      const createdId = res.data?.id;

      if (imageFile && createdId) {
        try {
          await uploadSiteServiceImage(createdId, imageFile);
        } catch {
          toast.warning("Site service created, but cover image upload failed.");
        }
      }

      return res;
    },
    onSuccess: () => {
      toast.success("Site service created successfully.");
      qc.invalidateQueries({ queryKey: ["admin", "site-services"] });
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create site service.";
      toast.error(msg);
    },
  });
}

/**
 * Mutation hook for updating an existing site service, with image replacement/removal.
 */
export function useUpdateSiteServiceMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      body,
      imageFile,
      removeImage,
    }: {
      id: string;
      body: SiteServiceUpsertRequest;
      imageFile?: File | null;
      removeImage?: boolean;
    }) => {
      const sanitizedBody: SiteServiceUpsertRequest = {
        ...body,
        title: fillMissingSiteServiceLanguages(body.title),
        description: fillMissingSiteServiceLanguages(body.description),
      };

      const res = await updateSiteService(id, sanitizedBody);

      if (removeImage && !imageFile) {
        try {
          await deleteSiteServiceImage(id);
        } catch {
          toast.warning("Service updated, but image deletion failed.");
        }
      } else if (imageFile) {
        try {
          await uploadSiteServiceImage(id, imageFile);
        } catch {
          toast.warning("Service updated, but image upload failed.");
        }
      }

      return res;
    },
    onSuccess: (_, variables) => {
      toast.success("Site service updated successfully.");
      qc.invalidateQueries({ queryKey: ["admin", "site-services"] });
      qc.invalidateQueries({
        queryKey: ["admin", "site-service-localized", variables.id],
      });
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update site service.";
      toast.error(msg);
    },
  });
}

/**
 * Mutation hook for permanently deleting a site service.
 */
export function useDeleteSiteServiceMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteSiteService(id);
    },
    onSuccess: () => {
      toast.success("Site service deleted successfully.");
      qc.invalidateQueries({ queryKey: ["admin", "site-services"] });
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to delete site service.";
      toast.error(msg);
    },
  });
}
