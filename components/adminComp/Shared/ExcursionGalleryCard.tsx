"use client";

import React from "react";
import { FiLoader, FiStar, FiTrash2 } from "react-icons/fi";
import type { ExcursionImageItem } from "@/models/excursionDetails";

interface ExcursionGalleryCardProps {
  img: ExcursionImageItem;
  isPrimary: boolean;
  isDeleting: boolean;
  formatUrl: (url?: string | null) => string;
  onSetPrimary: (id: string, url: string) => void;
  onDelete: (id: string) => void;
}

export function ExcursionGalleryCard({
  img,
  isPrimary,
  isDeleting,
  formatUrl,
  onSetPrimary,
  onDelete,
}: ExcursionGalleryCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-100 aspect-video">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={formatUrl(img.imageUrl)}
        alt="Excursion photo"
        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
      />
      {isPrimary ? (
        <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-md bg-[#D48C28] px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
          <FiStar className="h-2.5 w-2.5 fill-current" /> Primary
        </span>
      ) : (
        <button
          type="button"
          onClick={() => onSetPrimary(img.id, img.imageUrl)}
          className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-md bg-[#0E4A68]/90 px-2 py-0.5 text-[10px] font-semibold text-white opacity-0 transition-opacity hover:bg-[#0E4A68] group-hover:opacity-100 cursor-pointer shadow-xs"
          title="Set as primary thumbnail"
        >
          <FiStar className="h-2.5 w-2.5" /> Make Primary
        </button>
      )}
      <button
        type="button"
        disabled={isDeleting}
        onClick={() => onDelete(img.id)}
        className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-lg bg-red-600/90 text-white opacity-0 transition-opacity hover:bg-red-700 group-hover:opacity-100 disabled:opacity-50 cursor-pointer shadow-xs"
        title="Delete image"
      >
        {isDeleting ? <FiLoader className="h-3.5 w-3.5 animate-spin" /> : <FiTrash2 className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

export default ExcursionGalleryCard;
