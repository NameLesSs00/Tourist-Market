"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SERVICE_FALLBACK_IMAGE } from "@/features/siteServiceItems/usePublicServiceItems";

interface ServiceImageGalleryProps {
  mainImage: string;
  galleryImages?: string[];
  title: string;
}

export function ServiceImageGallery({
  mainImage,
  galleryImages,
  title,
}: ServiceImageGalleryProps) {
  const images =
    galleryImages && galleryImages.length > 0
      ? Array.from(new Set([mainImage, ...galleryImages].filter(Boolean)))
      : [mainImage].filter(Boolean);

  const displayImages = images.length > 0 ? images : [SERVICE_FALLBACK_IMAGE];
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [failedIndices, setFailedIndices] = useState<Record<number, boolean>>({});

  const activeSrc = failedIndices[activeIndex]
    ? SERVICE_FALLBACK_IMAGE
    : displayImages[activeIndex] || SERVICE_FALLBACK_IMAGE;

  const isFallback = activeSrc === SERVICE_FALLBACK_IMAGE;

  return (
    <div className="flex flex-col gap-3">
      {/* Active Featured Image */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[960/480] bg-slate-100 overflow-hidden rounded-t-lg flex items-center justify-center">
        <Image
          src={activeSrc}
          alt={`${title} - Photo ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 960px"
          onError={() => {
            setFailedIndices((prev) => ({ ...prev, [activeIndex]: true }));
          }}
          className={`transition-all duration-300 ${
            isFallback ? "object-contain p-8 sm:p-12 opacity-60" : "object-cover object-center"
          }`}
        />
      </div>

      {/* Thumbnails Row if multiple images */}
      {!isFallback && displayImages.length > 1 && (
        <div className="px-4 sm:px-8 flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {displayImages.map((img, idx) => {
            const isActive = idx === activeIndex;
            const thumbSrc = failedIndices[idx] ? SERVICE_FALLBACK_IMAGE : img;
            return (
              <button
                type="button"
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-md overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  isActive
                    ? "border-[#0E4A68] scale-105 shadow-sm"
                    : "border-gray-200 opacity-70 hover:opacity-100"
                }`}
                aria-label={`View photo ${idx + 1}`}
              >
                <Image
                  src={thumbSrc}
                  alt={`${title} thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  onError={() => {
                    setFailedIndices((prev) => ({ ...prev, [idx]: true }));
                  }}
                  className="object-cover object-center"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ServiceImageGallery;

