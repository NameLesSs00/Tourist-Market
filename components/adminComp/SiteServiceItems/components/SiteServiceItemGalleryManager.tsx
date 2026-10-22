"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { FiPlus, FiUploadCloud, FiX } from "react-icons/fi";
import { toast } from "sonner";
import type { SiteServiceItemImage } from "@/models/siteServiceItem";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";

interface SiteServiceItemGalleryManagerProps {
  existingGallery: SiteServiceItemImage[];
  newGalleryPreviews: string[];
  onAddFiles: (files: File[]) => void;
  onRemoveExisting: (id: string) => void;
  onRemoveNew: (index: number) => void;
}

export function SiteServiceItemGalleryManager({
  existingGallery,
  newGalleryPreviews,
  onAddFiles,
  onRemoveExisting,
  onRemoveNew,
}: SiteServiceItemGalleryManagerProps) {
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const validFiles: File[] = [];

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image.`);
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 5MB limit.`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      onAddFiles(validFiles);
    }

    if (galleryInputRef.current) galleryInputRef.current.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files || []);
    if (!files.length) return;

    const validFiles: File[] = [];
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image.`);
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 5MB limit.`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      onAddFiles(validFiles);
    }
  };

  const totalPhotos = existingGallery.length + newGalleryPreviews.length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs font-semibold text-[#083952]">
            Photos & Gallery
          </label>
          <span className="ml-2 text-[11px] text-[#64748B]">
            ({totalPhotos} photo{totalPhotos !== 1 ? "s" : ""})
          </span>
        </div>
        <button
          type="button"
          onClick={() => galleryInputRef.current?.click()}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#0E4A6820] bg-[#0E4A680C] px-3 py-1.5 text-xs font-semibold text-[#0E4A68] hover:bg-[#0E4A6818] cursor-pointer transition-colors"
        >
          <FiPlus className="h-3.5 w-3.5" />
          <span>Add Photos</span>
        </button>
      </div>

      <input
        ref={galleryInputRef}
        type="file"
        multiple
        accept="image/png,image/jpeg,image/webp,image/jpg"
        onChange={handleGalleryChange}
        className="hidden"
      />

      {totalPhotos === 0 ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => galleryInputRef.current?.click()}
          className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-7 text-center transition-colors hover:border-[#0E4A68] hover:bg-[#0E4A6805]"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0E4A68] shadow-2xs transition-transform group-hover:scale-105">
            <FiUploadCloud className="h-5 w-5" />
          </div>
          <p className="mt-2 text-xs font-semibold text-[#083952]">
            Upload service item gallery photos
          </p>
          <p className="mt-0.5 text-[11px] text-[#94A3B8]">
            Click or drag & drop PNG, JPG, or WebP up to 5MB each
          </p>
        </div>
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
                  title="Delete image"
                  className="absolute right-1.5 top-1.5 rounded-full bg-black/60 p-1 text-white hover:bg-[#DC2626] cursor-pointer transition-colors"
                >
                  <FiX className="h-3 w-3" />
                </button>
                <div className="absolute bottom-1 left-1 rounded-sm bg-black/50 px-1 text-[9px] text-white">
                  Saved
                </div>
              </div>
            );
          })}

          {/* New Staged Gallery Previews */}
          {newGalleryPreviews.map((previewUrl, idx) => (
            <div
              key={`new-${idx}`}
              className="group relative aspect-square overflow-hidden rounded-xl border-2 border-dashed border-[#0E4A68] bg-slate-100"
            >
              <Image
                src={previewUrl}
                alt="New Gallery Preview"
                fill
                className="object-cover"
                sizes="120px"
                unoptimized
              />
              <button
                type="button"
                onClick={() => onRemoveNew(idx)}
                title="Cancel upload"
                className="absolute right-1.5 top-1.5 rounded-full bg-black/60 p-1 text-white hover:bg-[#DC2626] cursor-pointer transition-colors"
              >
                <FiX className="h-3 w-3" />
              </button>
              <div className="absolute bottom-1 left-1 rounded-sm bg-[#0E4A68] px-1 text-[9px] text-white font-medium">
                New
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
