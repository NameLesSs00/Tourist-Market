"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { FiPlus, FiUploadCloud, FiX } from "react-icons/fi";
import { toast } from "sonner";
import type { ProductImage } from "@/models/product";
import { ProductGalleryItem } from "./ProductGalleryItem";

interface ProductGalleryManagerProps {
  existingImages: ProductImage[];
  newPreviews: string[];
  onAddFiles: (files: File[]) => void;
  onRemoveExisting: (id: number) => void;
  onRemoveNew: (index: number) => void;
  onReorderExisting?: (reordered: ProductImage[]) => void;
  onSetHero?: (id: number) => void;
  isReordering?: boolean;
}

export function ProductGalleryManager({
  existingImages,
  newPreviews,
  onAddFiles,
  onRemoveExisting,
  onRemoveNew,
  onReorderExisting,
  onSetHero,
  isReordering,
}: ProductGalleryManagerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (fileInputRef.current) fileInputRef.current.value = "";
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

  const handleMove = (index: number, direction: "left" | "right") => {
    if (!onReorderExisting) return;
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= existingImages.length) return;

    const updated = [...existingImages];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    onReorderExisting(updated);
  };

  const totalPhotos = existingImages.length + newPreviews.length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs font-semibold text-[#083952]">
            Product Gallery & Hero Photo
          </label>
          <span className="ml-2 text-[11px] text-[#64748B]">
            ({totalPhotos} image{totalPhotos !== 1 ? "s" : ""})
          </span>
          <p className="text-[11px] text-[#64748B]">
            Order 1 is the main Hero cover. Use arrows or click &quot;Set Hero&quot; to reorder.
          </p>
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#0E4A6820] bg-[#0E4A680C] px-3 py-1.5 text-xs font-semibold text-[#0E4A68] hover:bg-[#0E4A6818] cursor-pointer transition-colors"
        >
          <FiPlus className="h-3.5 w-3.5" />
          <span>Add Images</span>
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/png,image/jpeg,image/webp,image/jpg"
        onChange={handleFileChange}
        className="hidden"
      />

      {totalPhotos === 0 ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-7 text-center transition-colors hover:border-[#0E4A68] hover:bg-[#0E4A6805]"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0E4A68] shadow-2xs transition-transform group-hover:scale-105">
            <FiUploadCloud className="h-5 w-5" />
          </div>
          <p className="mt-2 text-xs font-semibold text-[#083952]">
            Upload product photos (PNG, JPG, WebP)
          </p>
          <p className="mt-0.5 text-[11px] text-[#94A3B8]">
            First image uploaded will be set as Hero (Order 1)
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
          {/* Saved Backend Images */}
          {existingImages.map((img, idx) => (
            <ProductGalleryItem
              key={img.id}
              img={img}
              index={idx}
              total={existingImages.length}
              isHero={img.displayOrder === 1 || idx === 0}
              onSetHero={onSetHero || (() => {})}
              onMoveLeft={(i) => handleMove(i, "left")}
              onMoveRight={(i) => handleMove(i, "right")}
              onRemove={onRemoveExisting}
              disabled={isReordering}
            />
          ))}

          {/* Staged New Previews */}
          {newPreviews.map((previewUrl, idx) => (
            <div
              key={`new-${idx}`}
              className="group relative aspect-square overflow-hidden rounded-xl border border-emerald-300 bg-emerald-50/40"
            >
              <Image
                src={previewUrl}
                alt="New Preview"
                fill
                className="object-cover"
                sizes="120px"
                unoptimized
              />
              <button
                type="button"
                onClick={() => onRemoveNew(idx)}
                title="Remove preview"
                className="absolute right-1.5 top-1.5 rounded-full bg-black/60 p-1 text-white hover:bg-[#DC2626] cursor-pointer transition-colors"
              >
                <FiX className="h-3 w-3" />
              </button>
              <div className="absolute bottom-1 left-1 rounded-sm bg-emerald-700/80 px-1 text-[9px] text-white font-medium">
                Pending Upload
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
