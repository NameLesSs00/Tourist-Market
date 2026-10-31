"use client";

import React, { useRef, useState } from "react";
import { FiImage, FiLoader, FiStar, FiTrash2, FiUploadCloud } from "react-icons/fi";
import { toast } from "sonner";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import {
  useDeleteExcursionImageMutation,
  useExcursionImagesQuery,
  useUploadExcursionImageMutation,
} from "@/features/privateExcursions/useExcursionImagesAdmin";
import type { PrivateExcursionListItem } from "@/models/privateExcursion";
import { ACCEPT_IMAGE_TYPES, validateImageFile } from "@/shared/utils/imageValidation";

interface ExcursionImagesPanelProps {
  open: boolean;
  onClose: () => void;
  excursion: PrivateExcursionListItem | null;
}

export function ExcursionImagesPanel({
  open,
  onClose,
  excursion,
}: ExcursionImagesPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPrimary, setIsPrimary] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const imagesQuery = useExcursionImagesQuery(open ? excursion?.id : null);
  const uploadMutation = useUploadExcursionImageMutation();
  const deleteMutation = useDeleteExcursionImageMutation();

  const images = imagesQuery.data ?? [];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !excursion) return;

    const err = validateImageFile(file, 5 * 1024 * 1024);
    if (err) {
      toast.error(err);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    try {
      await uploadMutation.mutateAsync({
        excursionId: excursion.id,
        file,
        isPrimary,
      });
    } catch {
      // Error handled by mutation onError
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsPrimary(false);
  };

  const handleDelete = async (imageId: string) => {
    if (!excursion) return;
    setDeletingId(imageId);
    try {
      await deleteMutation.mutateAsync({ excursionId: excursion.id, imageId });
    } finally {
      setDeletingId(null);
    }
  };

  const formatImageUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "") || "https://touristtt.runasp.net";
    return `${base}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title="Excursion Gallery Images"
      subtitle={excursion ? `Manage photos for "${excursion.title}"` : undefined}
      widthClassName="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Upload Box */}
        <div className="rounded-2xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-5 text-center transition hover:border-[#0E4A68]">
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPT_IMAGE_TYPES}
            className="hidden"
            id="excursion-img-upload"
            disabled={uploadMutation.isPending}
            onChange={handleFileChange}
          />
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0E4A6815] text-[#0E4A68]">
              {uploadMutation.isPending ? (
                <FiLoader className="h-6 w-6 animate-spin" />
              ) : (
                <FiUploadCloud className="h-6 w-6" />
              )}
            </div>
            <label
              htmlFor="excursion-img-upload"
              className="cursor-pointer font-semibold text-[#0E4A68] hover:underline text-sm"
            >
              {uploadMutation.isPending ? "Uploading image..." : "Click to upload an image"}
            </label>
            <p className="text-xs text-[#64748B]">PNG, JPG, WEBP up to 10MB</p>

            <label className="mt-2 flex items-center gap-2 text-xs font-medium text-[#475569] cursor-pointer">
              <input
                type="checkbox"
                checked={isPrimary}
                onChange={(e) => setIsPrimary(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[#0E4A68] focus:ring-[#0E4A68]"
              />
              <span>Set as Primary (Hero) Image</span>
            </label>
          </div>
        </div>

        {/* Existing Images Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
              Uploaded Photos ({images.length})
            </h4>
          </div>

          {imagesQuery.isLoading ? (
            <div className="flex h-36 items-center justify-center">
              <FiLoader className="h-6 w-6 animate-spin text-[#0E4A68]" />
            </div>
          ) : images.length === 0 ? (
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 text-center text-xs text-gray-500">
              <FiImage className="mx-auto mb-2 h-8 w-8 text-gray-400" />
              No images uploaded yet. Upload the first image above.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-100 aspect-video"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formatImageUrl(img.imageUrl)}
                    alt="Excursion photo"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  {img.isPrimary && (
                    <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-md bg-[#D48C28] px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                      <FiStar className="h-2.5 w-2.5 fill-current" /> Primary
                    </span>
                  )}
                  <button
                    type="button"
                    disabled={deletingId === img.id}
                    onClick={() => handleDelete(img.id)}
                    className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-lg bg-red-600/90 text-white opacity-0 transition-opacity hover:bg-red-700 group-hover:opacity-100 disabled:opacity-50 cursor-pointer shadow-xs"
                    title="Delete image"
                  >
                    {deletingId === img.id ? (
                      <FiLoader className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <FiTrash2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </SlidePanel>
  );
}

export default ExcursionImagesPanel;
