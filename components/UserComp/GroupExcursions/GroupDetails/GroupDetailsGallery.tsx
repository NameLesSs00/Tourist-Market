"use client";

import React, { useState } from "react";
import Image from "next/image";

interface GroupDetailsGalleryProps {
  gallery: string[];
  badge?: string;
}

export function GroupDetailsGallery({
  gallery,
  badge = "Featured",
}: GroupDetailsGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = gallery.length > 0 ? gallery : ["/GroupExcursions/GroupDetails/7b777cbdc9da0fa5b151e67b42e2d3da14ee38aa.png"];
  const total = images.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  // Thumbnail list (displaying up to 4 thumbnails as in screenshot)
  const thumbnails = images.slice(0, 4);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
        {/* Main Featured Image (col-span-9 / col-span-10) */}
        <div className="md:col-span-9 lg:col-span-9 relative w-full aspect-[540/380] overflow-hidden rounded-[20px] border-[4px] border-[#FFFFFF] shadow-[0px_4px_25px_0px_rgba(0,0,0,0.25)] bg-slate-100">
          <Image
            src={images[activeIndex]}
            alt={`Excursion gallery view ${activeIndex + 1}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-cover object-center transition-all duration-300"
          />

          {/* Badge: Featured */}
          {badge && (
            <div className="absolute top-4 left-4 z-10 bg-white/95 text-[#0E4A68] font-poppins text-xs font-semibold px-4 py-1 rounded-full shadow-sm">
              {badge}
            </div>
          )}

          {/* Bottom Navigation Controls Overlay */}
          <div className="absolute bottom-4 inset-x-0 z-10 flex items-center justify-between px-4 sm:px-6 pointer-events-none">
            {/* Left Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="pointer-events-auto flex items-center justify-center w-[33px] h-[33px] rounded-[15.65px] bg-[#F3F3F3E5] border-[0.39px] border-[#00000066] shadow-sm hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            >
              <svg
                className="w-4 h-4 text-[#1C3A27]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Counter with camera icon */}
            <div className="pointer-events-auto flex items-center gap-1.5 px-3 py-1 rounded-[15.65px] bg-[#F3F3F3E5] border-[0.39px] border-[#00000066] shadow-sm font-poppins text-xs font-semibold text-[#1C3A27]">
              <svg
                className="w-3.5 h-3.5 text-[#1C3A27]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <circle cx="12" cy="13" r="3" />
              </svg>
              <span>
                {activeIndex + 1}/{total}
              </span>
            </div>

            {/* Right Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="pointer-events-auto flex items-center justify-center w-[33px] h-[33px] rounded-[15.65px] bg-[#F3F3F3E5] border-[0.39px] border-[#00000066] shadow-sm hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            >
              <svg
                className="w-4 h-4 text-[#1C3A27]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Thumbnails Column (col-span-3) */}
        <div className="md:col-span-3 grid grid-cols-4 md:grid-cols-1 gap-2.5 sm:gap-3">
          {thumbnails.map((thumb, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative w-full aspect-[130/84] overflow-hidden rounded-[10px] border-[0.5px] border-[#888888] bg-[#FFFFFF] transition-all cursor-pointer ${
                  isSelected ? "ring-2 ring-[#0E4A68] opacity-100" : "opacity-85 hover:opacity-100"
                }`}
              >
                <Image
                  src={thumb}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="160px"
                  className="object-cover object-center"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GroupDetailsGallery;
