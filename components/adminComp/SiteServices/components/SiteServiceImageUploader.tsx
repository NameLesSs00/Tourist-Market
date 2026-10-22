"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { FiImage, FiTrash2, FiUploadCloud } from "react-icons/fi";
import { toast } from "sonner";

interface SiteServiceImageUploaderProps {
  currentImageUrl: string | null;
  imageFile: File | null;
  onFileSelect: (file: File) => void;
  onRemove: () => void;
}

export function SiteServiceImageUploader({
  currentImageUrl,
  imageFile,
  onFileSelect,
  onRemove,
}: SiteServiceImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file (PNG, JPG, WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.");
      return;
    }

    onFileSelect(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file (PNG, JPG, WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.");
      return;
    }

    onFileSelect(file);
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-[#083952]">
        Service Cover Image (Optional)
      </label>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {currentImageUrl ? (
        <div className="relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]">
          <div className="relative aspect-video w-full bg-slate-100">
            <Image
              src={currentImageUrl}
              alt="Service Cover Preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
              unoptimized
            />
          </div>

          <div className="flex items-center justify-between border-t border-[#E2E8F0] bg-white p-3">
            <div className="flex items-center gap-2 text-xs text-[#64748B]">
              <FiImage className="h-4 w-4 text-[#0E4A68]" />
              <span className="truncate max-w-[200px]">
                {imageFile ? imageFile.name : "Cover photo attached"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-semibold text-[#0E4A68] hover:bg-[#0E4A6814] cursor-pointer transition-colors"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={() => {
                  onRemove();
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="flex items-center gap-1 rounded-lg border border-[#EF444430] bg-[#FEF2F2] px-3 py-1.5 text-xs font-semibold text-[#DC2626] hover:bg-[#FEE2E2] cursor-pointer transition-colors"
              >
                <FiTrash2 className="h-3.5 w-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
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
            Upload service cover image
          </p>
          <p className="mt-0.5 text-[11px] text-[#94A3B8]">
            PNG, JPG, or WebP up to 5MB
          </p>
        </div>
      )}
    </div>
  );
}
