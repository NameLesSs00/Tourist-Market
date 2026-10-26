import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  deleteExcursionHeroImage,
  deleteExcursionImage,
  getExcursionImages,
  setExcursionPrimaryImage,
  uploadExcursionHeroImage,
  uploadExcursionImage,
} from "@/clientApi/excursionImageApi";
import { extractErrorMessage } from "@/features/auth/useAuth";

export const EXCURSION_IMAGES_KEY = ["admin", "excursion-images"] as const;

export function useExcursionImagesQuery(excursionId?: string | null) {
  return useQuery({
    queryKey: [...EXCURSION_IMAGES_KEY, excursionId],
    queryFn: () => (excursionId ? getExcursionImages(excursionId) : []),
    enabled: Boolean(excursionId),
  });
}

export function useUploadExcursionImageMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      excursionId,
      file,
      isPrimary,
      silent,
    }: {
      excursionId: string;
      file: File;
      isPrimary: boolean;
      silent?: boolean;
    }) => uploadExcursionImage(excursionId, file, isPrimary),
    onSuccess: (_, variables) => {
      if (!variables.silent) toast.success("Image uploaded successfully.");
      qc.invalidateQueries({
        queryKey: [...EXCURSION_IMAGES_KEY, variables.excursionId],
      });
      qc.invalidateQueries({ queryKey: ["admin", "private-excursions"] });
      qc.invalidateQueries({ queryKey: ["admin", "group-excursions"] });
    },
    onError: (err, variables) => {
      if (!variables.silent) toast.error(extractErrorMessage(err));
    },
  });
}

export function useSetExcursionPrimaryImageMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      excursionId,
      imageId,
    }: {
      excursionId: string;
      imageId: string;
    }) => setExcursionPrimaryImage(excursionId, imageId),
    onSuccess: (_, variables) => {
      toast.success("Primary image updated successfully.");
      qc.invalidateQueries({
        queryKey: [...EXCURSION_IMAGES_KEY, variables.excursionId],
      });
      qc.invalidateQueries({ queryKey: ["admin", "private-excursions"] });
      qc.invalidateQueries({ queryKey: ["admin", "group-excursions"] });
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err));
    },
  });
}

export function useDeleteExcursionImageMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      excursionId,
      imageId,
    }: {
      excursionId: string;
      imageId: string;
    }) => deleteExcursionImage(excursionId, imageId),
    onSuccess: (_, variables) => {
      toast.success("Image deleted successfully.");
      qc.invalidateQueries({
        queryKey: [...EXCURSION_IMAGES_KEY, variables.excursionId],
      });
      qc.invalidateQueries({ queryKey: ["admin", "private-excursions"] });
      qc.invalidateQueries({ queryKey: ["admin", "group-excursions"] });
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err));
    },
  });
}

export function useUploadExcursionHeroImageMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      excursionId,
      file,
    }: {
      excursionId: string;
      file: File;
    }) => uploadExcursionHeroImage(excursionId, file),
    onSuccess: (_, variables) => {
      toast.success("Hero image uploaded successfully.");
      qc.invalidateQueries({ queryKey: ["admin", "private-excursions"] });
      qc.invalidateQueries({ queryKey: ["admin", "group-excursions"] });
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err));
    },
  });
}

export function useDeleteExcursionHeroImageMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (excursionId: string) => deleteExcursionHeroImage(excursionId),
    onSuccess: () => {
      toast.success("Hero image deleted successfully.");
      qc.invalidateQueries({ queryKey: ["admin", "private-excursions"] });
      qc.invalidateQueries({ queryKey: ["admin", "group-excursions"] });
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err));
    },
  });
}
