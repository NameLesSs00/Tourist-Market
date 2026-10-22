"use client";

import React from "react";
import Image from "next/image";
import {
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiX,
} from "react-icons/fi";
import type { ProductImage } from "@/models/product";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";

interface ProductGalleryItemProps {
  img: ProductImage;
  index: number;
  total: number;
  isHero: boolean;
  onSetHero: (id: number) => void;
  onMoveLeft: (index: number) => void;
  onMoveRight: (index: number) => void;
  onRemove: (id: number) => void;
  disabled?: boolean;
}

export function ProductGalleryItem({
  img,
  index,
  total,
  isHero,
  onSetHero,
  onMoveLeft,
  onMoveRight,
  onRemove,
  disabled,
}: ProductGalleryItemProps) {
  const fullUrl = getBackendImageUrl(img.imageUrl);

  return (
    <div
      className={`group relative aspect-square overflow-hidden rounded-xl border bg-slate-100 transition-all ${
        isHero
          ? "border-[#D48C28] ring-2 ring-[#D48C28]/40 shadow-sm"
          : "border-[#E2E8F0] hover:border-[#0E4A6840]"
      }`}
    >
      {fullUrl && (
        <Image
          src={fullUrl}
          alt={`Product photo ${img.displayOrder}`}
          fill
          className="object-cover"
          sizes="140px"
          unoptimized
        />
      )}

      {/* Hero Badge or Order Badge */}
      <div className="absolute top-1.5 left-1.5 z-10">
        {isHero ? (
          <span className="inline-flex items-center gap-1 rounded-md bg-[#D48C28] px-1.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
            <FiStar className="h-3 w-3 fill-white" />
            <span>Hero (1)</span>
          </span>
        ) : (
          <span className="rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-xs">
            #{img.displayOrder || index + 1}
          </span>
        )}
      </div>

      {/* Remove Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onRemove(img.id)}
        title="Delete image"
        className="absolute right-1.5 top-1.5 z-10 rounded-full bg-black/60 p-1 text-white hover:bg-[#DC2626] cursor-pointer transition-colors disabled:opacity-50"
      >
        <FiX className="h-3 w-3" />
      </button>

      {/* Hover Actions: Make Hero & Move */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-gradient-to-t from-black/85 via-black/50 to-transparent p-1.5 opacity-90 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
        {!isHero ? (
          <button
            type="button"
            disabled={disabled}
            onClick={() => onSetHero(img.id)}
            title="Make this the Hero image (Order 1)"
            className="inline-flex items-center gap-1 rounded bg-[#D48C28] px-1.5 py-0.5 text-[10px] font-medium text-white hover:bg-[#B9741A] cursor-pointer transition-colors disabled:opacity-50"
          >
            <FiStar className="h-2.5 w-2.5" />
            <span>Set Hero</span>
          </button>
        ) : (
          <span className="text-[10px] font-medium text-[#F4DAB6]">Main Image</span>
        )}

        {total > 1 && (
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              disabled={disabled || index === 0}
              onClick={() => onMoveLeft(index)}
              title="Move left"
              className="rounded bg-white/20 p-1 text-white hover:bg-white/40 disabled:opacity-30 cursor-pointer transition-colors"
            >
              <FiChevronLeft className="h-3 w-3" />
            </button>
            <button
              type="button"
              disabled={disabled || index === total - 1}
              onClick={() => onMoveRight(index)}
              title="Move right"
              className="rounded bg-white/20 p-1 text-white hover:bg-white/40 disabled:opacity-30 cursor-pointer transition-colors"
            >
              <FiChevronRight className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
