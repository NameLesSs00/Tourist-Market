"use client";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { FiImage, FiLoader, FiUploadCloud } from "react-icons/fi";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import {
  useDeleteExcursionImageMutation,
  useExcursionImagesQuery,
  useSetExcursionPrimaryImageMutation,
  useUploadExcursionImageMutation,
} from "@/features/privateExcursions/useExcursionImagesAdmin";
import { ExcursionGalleryCard } from "./ExcursionGalleryCard";
import { ExcursionHeroSection } from "./ExcursionHeroSection";
import { ACCEPT_IMAGE_TYPES, validateImageFile } from "@/shared/utils/imageValidation";
import { extractErrorMessage } from "@/shared/utils/errorUtils";

export interface ExcursionImageTarget {
  id: string;
  title: string;
  primaryImageUrl?: string | null;
  heroImageUrl?: string | null;
}

interface ExcursionImagesPanelProps {
  open: boolean;
  onClose: () => void;
  excursion: ExcursionImageTarget | null;
}

export function ExcursionImagesPanel({ open, onClose, excursion }: ExcursionImagesPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPrimary, setIsPrimary] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [primaryUrl, setPrimaryUrl] = useState<string | null>(null);
  const [heroUrl, setHeroUrl] = useState<string | null>(null);
  const [uploadQueue, setUploadQueue] = useState<{ current: number; total: number; name: string } | null>(null);

  useEffect(() => {
    if (excursion) {
      setPrimaryUrl(excursion.primaryImageUrl ?? null);
      setHeroUrl(excursion.heroImageUrl ?? null);
    }
  }, [excursion]);

  const imagesQuery = useExcursionImagesQuery(open ? excursion?.id : null);
  const uploadGalleryMutation = useUploadExcursionImageMutation();
  const setPrimaryMutation = useSetExcursionPrimaryImageMutation();
  const deleteGalleryMutation = useDeleteExcursionImageMutation();
  const images = imagesQuery.data ?? [];

  const formatUrl = (url?: string | null) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "") || "https://touristtt.runasp.net";
    return `${base}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const handleBatchGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFiles = Array.from(e.target.files || []);
    if (!rawFiles.length || !excursion) return;
    if (fileInputRef.current) fileInputRef.current.value = "";

    const validFiles: File[] = [];
    for (const file of rawFiles) {
      const err = validateImageFile(file, 5 * 1024 * 1024);
      if (err) {
        toast.error(err);
        continue;
      }
      validFiles.push(file);
    }

    if (!validFiles.length) return;

    setUploadQueue({ current: 1, total: validFiles.length, name: validFiles[0].name });
    let successCount = 0;

    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      setUploadQueue({ current: i + 1, total: validFiles.length, name: file.name });
      try {
        const markPrimary = i === 0 && isPrimary;
        const res = await uploadGalleryMutation.mutateAsync({
          excursionId: excursion.id,
          file,
          isPrimary: markPrimary,
          silent: validFiles.length > 1,
        });
        if (markPrimary && res?.imageUrl) setPrimaryUrl(res.imageUrl);
        successCount++;
      } catch (err) {
        toast.error(extractErrorMessage(err, `Failed to upload ${file.name}`));
      }
    }

    setUploadQueue(null);
    setIsPrimary(false);
    if (validFiles.length > 1 && successCount > 0) {
      toast.success(`Uploaded ${successCount} of ${validFiles.length} photos.`);
    }
  };

  const isUploading = Boolean(uploadQueue);

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title="Excursion Photos & Hero Image"
      subtitle={excursion ? `Manage media for "${excursion.title}"` : undefined}
      widthClassName="max-w-2xl"
    >
      <div className="space-y-6 pb-6">
        <ExcursionHeroSection
          excursionId={excursion?.id}
          heroUrl={heroUrl}
          onHeroUrlChange={setHeroUrl}
          formatUrl={formatUrl}
        />

        {/* Gallery Multi-upload Queue Box */}
        <div className="rounded-2xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-5 text-center transition hover:border-[#0E4A68]">
          <input ref={fileInputRef} type="file" multiple accept={ACCEPT_IMAGE_TYPES} className="hidden" id="gallery-img-upload" disabled={isUploading} onChange={handleBatchGalleryUpload} />
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0E4A6815] text-[#0E4A68]">
              {isUploading ? <FiLoader className="h-5 w-5 animate-spin" /> : <FiUploadCloud className="h-5 w-5" />}
            </div>
            {isUploading && uploadQueue ? (
              <div className="w-full max-w-xs space-y-1.5">
                <p className="text-xs font-semibold text-[#0E4A68]">
                  Uploading {uploadQueue.current} of {uploadQueue.total} photos...
                </p>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
                  <div
                    className="h-full bg-[#0E4A68] transition-all duration-300"
                    style={{ width: `${Math.round((uploadQueue.current / uploadQueue.total) * 100)}%` }}
                  />
                </div>
                <p className="text-[11px] text-[#64748B] truncate">{uploadQueue.name}</p>
              </div>
            ) : (
              <>
                <label htmlFor="gallery-img-upload" className="cursor-pointer font-semibold text-[#0E4A68] hover:underline text-sm">
                  Click to select photos (Upload in batch queue)
                </label>
                <p className="text-xs text-[#64748B]">Select one or multiple images (PNG, JPG, WEBP)</p>
                <label className="mt-1 flex items-center gap-2 text-xs font-medium text-[#475569] cursor-pointer">
                  <input type="checkbox" checked={isPrimary} onChange={(e) => setIsPrimary(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-[#0E4A68]" />
                  <span>Mark first uploaded image as Primary Thumbnail</span>
                </label>
              </>
            )}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">Gallery Photos ({images.length})</h4>
          {imagesQuery.isLoading ? (
            <div className="flex h-32 items-center justify-center"><FiLoader className="h-6 w-6 animate-spin text-[#0E4A68]" /></div>
          ) : images.length === 0 ? (
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 text-center text-xs text-gray-500">
              <FiImage className="mx-auto mb-2 h-7 w-7 text-gray-400" />
              No gallery images uploaded yet.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {images.map((img) => (
                <ExcursionGalleryCard
                  key={img.id}
                  img={img}
                  isPrimary={primaryUrl ? img.imageUrl === primaryUrl : img.isPrimary}
                  isDeleting={deletingId === img.id}
                  formatUrl={formatUrl}
                  onSetPrimary={async (id, url) => {
                    if (!excursion) return;
                    await setPrimaryMutation.mutateAsync({ excursionId: excursion.id, imageId: id });
                    setPrimaryUrl(url);
                  }}
                  onDelete={async (id) => {
                    if (!excursion) return;
                    setDeletingId(id);
                    try {
                      await deleteGalleryMutation.mutateAsync({ excursionId: excursion.id, imageId: id });
                    } finally {
                      setDeletingId(null);
                    }
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </SlidePanel>
  );
}

export default ExcursionImagesPanel;
