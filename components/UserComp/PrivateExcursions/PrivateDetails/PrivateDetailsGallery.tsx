"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiCamera } from "react-icons/fi";

interface PrivateDetailsGalleryProps {
  images: string[];
  badge?: string;
  title?: string;
}

export function PrivateDetailsGallery({
  images,
  badge = "Featured",
  title = "Private Hurghada City Tour",
}: PrivateDetailsGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const safeImages = images && images.length > 0 ? images : [
    "/PrivateExcursions/Privatedetails/7b777cbdc9da0fa5b151e67b42e2d3da14ee38aa.png"
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));
  };

  // We display up to 4 thumbnails in vertical column matching Frame 531.png
  const displayThumbnails = safeImages.slice(0, 4);

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 items-stretch">
      {/* ─── MAIN LARGE PHOTO ─── */}
      <div
        className="relative flex-1 min-h-[320px] sm:min-h-[420px] lg:min-h-[460px] overflow-hidden bg-white"
        style={{
          borderRadius: "20px",
          border: "4px solid #FFFFFF",
          boxShadow: "0px 4px 25px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Image
          src={safeImages[activeIndex]}
          alt={`${title} - Photo ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover transition-opacity duration-300"
        />

        {/* Top-Left Badge: Featured */}
        {badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/95 text-[#0E4A68] text-[13px] font-semibold shadow-sm backdrop-blur-sm">
              {badge}
            </span>
          </div>
        )}

        {/* Bottom Navigation Row: Prev Arrow + Counter Pill + Next Arrow */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
          {/* Prev Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous image"
            className="pointer-events-auto w-9 h-9 flex items-center justify-center transition-all hover:scale-105 active:scale-95 text-[#0E4A68] shadow-sm"
            style={{
              background: "#F5F5F5",
              border: "0.39px solid rgba(0, 0, 0, 0.4)",
              borderRadius: "15.65px",
            }}
          >
            <FiChevronLeft size={20} />
          </button>

          {/* Image Counter Pill: Camera icon + 1/6 */}
          <div className="pointer-events-auto px-3.5 py-1.5 rounded-full bg-black/60 text-white text-[13px] font-medium flex items-center gap-1.5 backdrop-blur-sm shadow">
            <FiCamera size={14} className="text-white" />
            <span>
              {activeIndex + 1}/{safeImages.length}
            </span>
          </div>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next image"
            className="pointer-events-auto w-9 h-9 flex items-center justify-center transition-all hover:scale-105 active:scale-95 text-[#0E4A68] shadow-sm"
            style={{
              background: "#F5F5F5",
              border: "0.39px solid rgba(0, 0, 0, 0.4)",
              borderRadius: "15.65px",
            }}
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* ─── 4 THUMBNAILS (Vertical on desktop/tablet, horizontal on mobile) ─── */}
      <div className="flex md:flex-col gap-3.5 shrink-0 overflow-x-auto md:overflow-visible pb-1 md:pb-0 w-full md:w-[150px] lg:w-[170px]">
        {displayThumbnails.map((thumbUrl, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <button
              key={`thumb-${idx}`}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-[16/10] md:h-[102px] w-[110px] md:w-full shrink-0 overflow-hidden cursor-pointer transition-all duration-200 hover:opacity-90 ${
                isSelected ? "ring-2 ring-[#DE7423] scale-[1.02]" : "opacity-95"
              }`}
              style={{
                borderRadius: "10px",
                border: "3px solid #FFFFFF",
                boxShadow: "0px 1px 10px 2px rgba(0, 0, 0, 0.3)",
                backgroundColor: "#FFFFFF",
              }}
            >
              <Image
                src={thumbUrl}
                alt={`Thumbnail ${idx + 1}`}
                fill
                sizes="170px"
                className="object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
