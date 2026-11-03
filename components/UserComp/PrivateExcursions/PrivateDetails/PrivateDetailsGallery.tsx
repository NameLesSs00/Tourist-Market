"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiCamera } from "react-icons/fi";
import { getDictionary } from "@/shared/utils/getDictionary";

interface PrivateDetailsGalleryProps {
  images: string[];
  badge?: string;
  title?: string;
  locale?: string;
}

export function PrivateDetailsGallery({
  images,
  badge,
  title = "Private Excursion Tour",
  locale = "en",
}: PrivateDetailsGalleryProps) {
  const dict = getDictionary(locale);
  const t = dict.privateExcursions.details.gallery;
  const resolvedBadge = badge || t.featured || "Featured";

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

  const displayThumbnails = safeImages.slice(0, 4);

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 items-stretch select-none">
      {/* ─── MAIN LARGE PHOTO ─── */}
      <div
        className="relative flex-1 min-h-[320px] sm:min-h-[420px] lg:min-h-[460px] overflow-hidden bg-white"
        style={{
          borderRadius: "20px",
          border: "4px solid #FFFFFF",
          boxShadow: "0px 4px 25px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0.85 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={safeImages[activeIndex]}
              alt={`${title} - ${t.photoCount || "Photo"} ${activeIndex + 1}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Top-Left Badge */}
        {resolvedBadge && (
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/95 text-[#0E4A68] text-[13px] font-semibold shadow-sm backdrop-blur-sm">
              {resolvedBadge}
            </span>
          </div>
        )}

        {/* Bottom Navigation Row: Prev Arrow + Counter Pill + Next Arrow */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            type="button"
            onClick={handlePrev}
            aria-label={t.prevImage || "Previous image"}
            className="pointer-events-auto w-9 h-9 flex items-center justify-center text-[#0E4A68] shadow-sm cursor-pointer"
            style={{
              background: "#F5F5F5",
              border: "0.39px solid rgba(0, 0, 0, 0.4)",
              borderRadius: "15.65px",
            }}
          >
            <FiChevronLeft size={20} />
          </motion.button>

          <div className="pointer-events-auto px-3.5 py-1.5 rounded-full bg-black/60 text-white text-[13px] font-medium flex items-center gap-1.5 backdrop-blur-sm shadow">
            <FiCamera size={14} className="text-white" />
            <span>
              {activeIndex + 1}/{safeImages.length}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            type="button"
            onClick={handleNext}
            aria-label={t.nextImage || "Next image"}
            className="pointer-events-auto w-9 h-9 flex items-center justify-center text-[#0E4A68] shadow-sm cursor-pointer"
            style={{
              background: "#F5F5F5",
              border: "0.39px solid rgba(0, 0, 0, 0.4)",
              borderRadius: "15.65px",
            }}
          >
            <FiChevronRight size={20} />
          </motion.button>
        </div>
      </div>

      {/* ─── RIGHT VERTICAL THUMBNAILS (Up to 4 images) ─── */}
      <div className="flex md:flex-col gap-3 justify-between overflow-x-auto md:overflow-visible no-scrollbar">
        {displayThumbnails.map((img, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={`relative w-[75px] sm:w-[95px] md:w-[110px] h-[65px] sm:h-[85px] md:h-[98px] rounded-[14px] overflow-hidden transition-all duration-200 cursor-pointer shrink-0 ${
              activeIndex === idx
                ? "ring-2 ring-[#DE7423] opacity-100 shadow-md"
                : "opacity-75 hover:opacity-100"
            }`}
            style={{
              border: "2px solid #FFFFFF",
              boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.15)",
            }}
          >
            <Image
              src={img}
              alt={`${title} - Thumbnail ${idx + 1}`}
              fill
              sizes="110px"
              className="object-cover"
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default PrivateDetailsGallery;
