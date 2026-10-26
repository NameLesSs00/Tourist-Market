"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GroupExcursion } from "../types";

interface GroupExcursionCardProps {
  excursion: GroupExcursion;
  locale?: string;
}

export function GroupExcursionCard({
  excursion,
  locale = "en",
}: GroupExcursionCardProps) {
  const {
    slug,
    title,
    description,
    badge,
    duration,
    rating,
    adultPrice,
    childPrice,
    infantPrice,
    imageUrl,
  } = excursion;

  // Render 5 stars based on rating
  const renderStars = () => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const filled = rating >= starIndex - 0.5;
          return (
            <svg
              key={starIndex}
              className={`w-3.5 h-3.5 ${
                filled
                  ? "fill-[#8CC63F] text-[#8CC63F]"
                  : "fill-[#8CC63F]/40 text-[#8CC63F]/40"
              }`}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        })}
      </div>
    );
  };

  return (
    <Link
      href={`/${locale}/group-excursions/${slug}`}
      className="group block h-full text-inherit no-underline"
    >
      <div
        className="bg-[#FFFFFF] text-[#0E4A68] rounded-[12px] border-[0.5px] border-[#888888] p-3 sm:p-3.5 flex flex-col justify-between h-full transition-all duration-200 group-hover:-translate-y-1.5 cursor-pointer"
        style={{
          boxShadow: "0px 2px 20px 2px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div>
          {/* Card Image Container with Badge */}
          <div className="relative w-full aspect-[370/220] overflow-hidden rounded-[10px] bg-slate-100">
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
            {badge && (
              <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-[#0E4A68] font-poppins text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs">
                {badge}
              </div>
            )}
          </div>

          {/* Duration & Rating Row */}
          <div className="flex items-center justify-between mt-3 text-xs sm:text-sm font-semibold text-[#0E4A68]">
            <div className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-[#0E4A68]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="font-poppins">{duration}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-poppins font-bold text-sm text-[#0E4A68]">
                {rating.toFixed(1)}
              </span>
              {renderStars()}
            </div>
          </div>

          {/* Title */}
          <h3 className="font-poppins font-bold text-[15px] sm:text-[16px] text-[#0E4A68] mt-2.5 leading-snug line-clamp-1 uppercase">
            {title}
          </h3>

          {/* Description */}
          <p className="font-poppins text-xs sm:text-[13px] text-[#0E4A68] font-normal leading-relaxed mt-1.5 line-clamp-3">
            {description}
          </p>
        </div>

        <div>
          {/* Pricing Info Row */}
          <div className="font-poppins text-xs sm:text-[13px] font-semibold text-[#0E4A68] mt-3.5 mb-3">
            Adult: {adultPrice.toFixed(2)} $ | Child: {childPrice.toFixed(2)} $ | Infant:{" "}
            {infantPrice.toFixed(2)} $
          </div>

          {/* View Details Action Button */}
          <div
            className="w-full flex items-center justify-center bg-[#165F84] group-hover:bg-[#0E4A68] active:scale-[0.99] text-[#FFFFFF] font-poppins text-sm sm:text-base font-semibold py-2.5 px-4 rounded-[8px] transition-colors"
            style={{
              border: "0.31px solid #000000",
              boxShadow: "0px 2px 20px 2px rgba(0, 0, 0, 0.25)",
            }}
          >
            View Details
          </div>
        </div>
      </div>
    </Link>
  );
}

export default GroupExcursionCard;
