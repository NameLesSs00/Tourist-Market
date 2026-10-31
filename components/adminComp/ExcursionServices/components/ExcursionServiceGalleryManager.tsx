"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { FiPlus, FiX } from "react-icons/fi";
import { toast } from "sonner";
import type { ExcursionServiceImage } from "@/models/excursionService";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";
import { ACCEPT_IMAGE_TYPES, validateImageFile } from "@/shared/utils/imageValidation";

interface ExcursionServiceGalleryManagerProps {
  existingGallery: ExcursionServiceImage[];
  newGalleryPreviews: string[];
  onAddFiles: (files: File[]) => void;
  onRemoveExisting: (id: string) => void;
  onRemoveNew: (index: number) => void;
}

export function ExcursionServiceGalleryManager({
  existingGallery,
  newGalleryPreviews,
  onAddFiles,
  onRemoveExisting,
  onRemoveNew,
}: ExcursionServiceGalleryManagerProps) {
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const validFiles: File[] = [];

    for (const file of files) {
      const err = validateImageFile(file, 5 * 1024 * 1024);
      if (err) {
        toast.error(err);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      onAddFiles(validFiles);
    }

    if (galleryInputRef.current) galleryInputRef.current.value = "";
  };

  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-[#083952]">
          Gallery Photos
        </label>
        <button
          type="button"
          onClick={() => galleryInputRef.current?.click()}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#0E4A6820] bg-[#0E4A680C] px-3 py-1.5 text-xs font-semibold text-[#0E4A68] hover:bg-[#0E4A6818] cursor-pointer"
        >
          <FiPlus className="h-3.5 w-3.5" />
          <span>Add Photos</span>
        </button>
      </div>

      <input
        ref={galleryInputRef}
        type="file"
        multiple
        accept={ACCEPT_IMAGE_TYPES}
        onChange={handleGalleryChange}
        className="hidden"
      />

      {existingGallery.length === 0 && newGalleryPreviews.length === 0 ? (
        <p className="text-[11px] text-[#94A3B8]">
          No gallery images added yet. Click &quot;Add Photos&quot; to upload additional images.
        </p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
          {/* Existing Gallery Images */}
          {existingGallery.map((img) => {
            const fullUrl = getBackendImageUrl(img.imageUrl);
            return (
              <div
                key={img.id}
                className="group relative aspect-square overflow-hidden rounded-xl border border-[#E2E8F0] bg-slate-100"
              >
                {fullUrl && (
                  <Image
                    src={fullUrl}
                    alt="Gallery Photo"
                    fill
                    className="object-cover"
                    sizes="120px"
                    unoptimized
                  />
                )}
                <button
                  type="button"
                  onClick={() => onRemoveExisting(img.id)}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white transition-opacity hover:bg-red-600 cursor-pointer"
                  title="Remove image"
                >
                  <FiX className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}

          {/* Newly Picked Gallery Images */}
          {newGalleryPreviews.map((preview, idx) => (
            <div
              key={idx}
              className="group relative aspect-square overflow-hidden rounded-xl border border-[#0E4A6840] bg-slate-100"
            >
              <Image
                src={preview}
                alt="New Gallery Photo"
                fill
                className="object-cover"
                sizes="120px"
                unoptimized
              />
              <div className="absolute left-1 bottom-1 rounded bg-[#0E4A68] px-1 py-0.5 text-[9px] font-semibold text-white">
                New
              </div>
              <button
                type="button"
                onClick={() => onRemoveNew(idx)}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white transition-opacity hover:bg-red-600 cursor-pointer"
                title="Remove image"
              >
                <FiX className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
