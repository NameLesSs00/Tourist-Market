"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiCamera } from "react-icons/fi";

interface ProductDetailsGalleryProps {
  images?: string[];
}

const DEFAULT_IMAGES = [
  "/Hoteldeliveries/product-details/cea97bfaa2b16182bcbbfa00313df019dd4ecbb1.png",
  "/Hoteldeliveries/product-details/cea97bfaa2b16182bcbbfa00313df019dd4ecbb1.png",
  "/Hoteldeliveries/product-details/cea97bfaa2b16182bcbbfa00313df019dd4ecbb1.png",
  "/Hoteldeliveries/product-details/cea97bfaa2b16182bcbbfa00313df019dd4ecbb1.png",
  "/Hoteldeliveries/product-details/cea97bfaa2b16182bcbbfa00313df019dd4ecbb1.png",
  "/Hoteldeliveries/product-details/cea97bfaa2b16182bcbbfa00313df019dd4ecbb1.png",
];

export function ProductDetailsGallery({
  images = DEFAULT_IMAGES,
}: ProductDetailsGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full select-none font-poppins">
      {/* ─── Main Large Image Box ─── */}
      <div
        className="relative flex-1 aspect-[4/3.5] sm:aspect-square md:aspect-[540/490] flex items-center justify-center p-6 overflow-hidden transition-all"
        style={{
          background: "#FFFFF2",
          borderRadius: "9.52px",
          border: "0.95px solid #888888",
        }}
      >
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous image"
          className="absolute left-4 z-20 w-8 h-8 flex items-center justify-center text-[#0E4A68] hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-sm"
          style={{
            background: "#F3F3F3E5",
            border: "0.39px solid rgba(0, 0, 0, 0.4)",
            borderRadius: "15.65px",
          }}
        >
          <FiChevronLeft size={18} />
        </button>

        {/* Product Image */}
        <div className="relative w-[78%] h-[78%] transition-transform duration-300">
          <Image
            src={images[activeIndex] || images[0]}
            alt="Product view"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 550px"
            className="object-contain"
          />
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next image"
          className="absolute right-4 z-20 w-8 h-8 flex items-center justify-center text-[#0E4A68] hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-sm"
          style={{
            background: "#F3F3F3E5",
            border: "0.39px solid rgba(0, 0, 0, 0.4)",
            borderRadius: "15.65px",
          }}
        >
          <FiChevronRight size={18} />
        </button>

        {/* Bottom Counter Badge */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1 text-[12px] font-medium"
          style={{
            background: "#000000",
            boxShadow: "0px 2px 10px 3px rgba(255, 255, 255, 0.25)",
            borderRadius: "15px",
            color: "#FFFFFF",
          }}
        >
          <FiCamera size={14} className="text-white" />
          <span>
            {activeIndex + 1}/{images.length}
          </span>
        </div>
      </div>

      {/* ─── Vertical Thumbnails (4 shown) ─── */}
      <div className="flex sm:flex-col gap-3 justify-between sm:w-[120px] md:w-[135px] shrink-0">
        {images.slice(0, 4).map((img, idx) => {
          const isSelected = activeIndex === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative flex-1 aspect-square sm:aspect-auto sm:h-[115px] flex items-center justify-center p-2 overflow-hidden transition-all cursor-pointer ${
                isSelected ? "ring-2 ring-[#0E4A68] shadow-sm" : "hover:opacity-85"
              }`}
              style={{
                background: "#FFFFF2",
                borderRadius: "10px",
                border: "0.27px solid #888888",
              }}
            >
              <div className="relative w-[75%] h-[75%]">
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="135px"
                  className="object-contain"
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ProductDetailsGallery;
