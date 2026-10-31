"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { FiLoader, FiTrash2, FiUploadCloud } from "react-icons/fi";
import { toast } from "sonner";
import {
  useDeleteExcursionHeroImageMutation,
  useUploadExcursionHeroImageMutation,
} from "@/features/privateExcursions/useExcursionImagesAdmin";
import { ACCEPT_IMAGE_TYPES, validateImageFile } from "@/shared/utils/imageValidation";

interface ExcursionHeroSectionProps {
  excursionId?: string;
  heroUrl: string | null;
  onHeroUrlChange: (url: string | null) => void;
  formatUrl: (url?: string | null) => string;
}

export function ExcursionHeroSection({
  excursionId,
  heroUrl,
  onHeroUrlChange,
  formatUrl,
}: ExcursionHeroSectionProps) {
  const heroInputRef = useRef<HTMLInputElement>(null);
  const uploadHeroMutation = useUploadExcursionHeroImageMutation();
  const deleteHeroMutation = useDeleteExcursionHeroImageMutation();

  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !excursionId) return;

    const err = validateImageFile(file, 5 * 1024 * 1024);
    if (err) {
      toast.error(err);
      if (heroInputRef.current) heroInputRef.current.value = "";
      return;
    }

    const res = await uploadHeroMutation.mutateAsync({ excursionId, file });
    if (res?.heroImageUrl) onHeroUrlChange(res.heroImageUrl);
    if (heroInputRef.current) heroInputRef.current.value = "";
  };

  const handleDeleteHero = async () => {
    if (!excursionId) return;
    await deleteHeroMutation.mutateAsync(excursionId);
    onHeroUrlChange(null);
  };

  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0E4A68]">Hero Banner Image</h4>
        <input ref={heroInputRef} type="file" accept={ACCEPT_IMAGE_TYPES} className="hidden" id="hero-img-input" onChange={handleHeroUpload} />
        <label htmlFor="hero-img-input" className="inline-flex items-center gap-1.5 rounded-lg bg-[#0E4A68] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#0A374E] cursor-pointer">
          {uploadHeroMutation.isPending ? <FiLoader className="h-3.5 w-3.5 animate-spin" /> : <FiUploadCloud className="h-3.5 w-3.5" />}
          <span>{heroUrl ? "Replace Hero" : "Upload Hero"}</span>
        </label>
      </div>
      {heroUrl ? (
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
          <Image src={formatUrl(heroUrl)} alt="Hero banner" fill className="object-cover" sizes="600px" />
          <button
            type="button"
            onClick={handleDeleteHero}
            disabled={deleteHeroMutation.isPending}
            className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-lg bg-red-600/90 text-white hover:bg-red-700 cursor-pointer shadow-xs disabled:opacity-50"
            title="Delete Hero Banner"
          >
            {deleteHeroMutation.isPending ? <FiLoader className="h-3.5 w-3.5 animate-spin" /> : <FiTrash2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 text-center text-xs text-gray-500">
          No hero banner set. Upload a wide landscape image for the excursion header.
        </div>
      )}
    </div>
  );
}

export default ExcursionHeroSection;
