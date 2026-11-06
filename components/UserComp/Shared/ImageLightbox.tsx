"use client";

import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

interface ImageLightboxProps {
  images: string[];
  startIndex: number;
  title?: string;
  onClose: () => void;
}

export function ImageLightbox({
  images,
  startIndex,
  title,
  onClose,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handlePrev, handleNext, onClose]);

  if (!mounted) return null;

  const content = (
    <AnimatePresence>
      <motion.div
        key="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        style={{ background: "rgba(0, 0, 0, 0.92)" }}
        onClick={onClose}
      >
        {/* Top Bar */}
        <div
          className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-4 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Title */}
          {title && (
            <p className="text-white/70 text-sm font-medium truncate max-w-[60%]">
              {title}
            </p>
          )}

          {/* Counter + Close */}
          <div className="flex items-center gap-4 ml-auto">
            <span className="text-white/80 text-sm font-semibold tabular-nums">
              {currentIndex + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close lightbox"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Main Image Area */}
        <div
          className="relative w-full h-full flex items-center justify-center px-16 py-20"
          onClick={(e) => e.stopPropagation()}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full h-full"
            >
              <Image
                src={images[currentIndex]}
                alt={`${title ? `${title} - ` : ""}Photo ${currentIndex + 1}`}
                fill
                priority
                sizes="100vw"
                className="object-contain"
                unoptimized={
                  typeof images[currentIndex] === "string" &&
                  images[currentIndex].startsWith("http")
                }
              />
            </motion.div>
          </AnimatePresence>

          {/* Prev Button */}
          {images.length > 1 && (
            <motion.button
              type="button"
              onClick={handlePrev}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              aria-label="Previous image"
              className="absolute left-4 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer shadow-lg"
            >
              <FiChevronLeft size={26} />
            </motion.button>
          )}

          {/* Next Button */}
          {images.length > 1 && (
            <motion.button
              type="button"
              onClick={handleNext}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              aria-label="Next image"
              className="absolute right-4 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer shadow-lg"
            >
              <FiChevronRight size={26} />
            </motion.button>
          )}
        </div>

        {/* Dot Indicators */}
        {images.length > 1 && (
          <div
            className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to photo ${idx + 1}`}
                className={`rounded-full transition-all cursor-pointer ${
                  idx === currentIndex
                    ? "w-5 h-2 bg-white"
                    : "w-2 h-2 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}

export default ImageLightbox;

