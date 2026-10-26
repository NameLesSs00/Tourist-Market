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

  // Render 5 stars with full and half-star support matching Group.png
  const renderStars = () => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const isFull = rating >= starIndex;
          const isHalf = !isFull && rating >= starIndex - 0.5;
          return (
            <span key={starIndex} className="relative inline-block w-[18px] h-[18px]">
              {/* Background empty star */}
              <svg
                className="w-[18px] h-[18px] fill-[#8CC63F]/25 text-[#8CC63F]/25"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {/* Filled overlay (Full or Half) */}
              {(isFull || isHalf) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: isHalf ? "50%" : "100%" }}
                >
                  <svg
                    className="w-[18px] h-[18px] fill-[#8CC63F] text-[#8CC63F]"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
              )}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <Link
      href={`/${locale}/group-excursions/${slug}`}
      className="group block h-full text-inherit no-underline select-none"
    >
      <div
        className="bg-[#FFFFFF] text-[#0E4A68] rounded-[18px] sm:rounded-[20px] border-[0.5px] border-[#888888] overflow-hidden flex flex-col justify-between h-full transition-all duration-300 group-hover:-translate-y-1.5 cursor-pointer"
        style={{
          boxShadow: "0px 2px 20px 2px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Full-Bleed Card Image Flush with Top Borders */}
        <div className="relative w-full aspect-[390/230] overflow-hidden bg-slate-100">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          {badge && (
            <div className="absolute top-3.5 left-3.5 bg-white/95 text-[#0E4A68] font-poppins text-xs font-semibold px-3 py-1 rounded-[8px] shadow-sm">
              {badge}
            </div>
          )}
        </div>

        {/* Card Content with Padding */}
        <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
          <div>
            {/* Duration & Rating Row */}
            <div className="flex items-center justify-between text-sm sm:text-[15px] font-bold text-[#0E4A68]">
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-[#0E4A68]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="9" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="font-poppins">{duration}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-poppins font-bold text-sm sm:text-base text-[#0E4A68]">
                  {rating.toFixed(1)}
                </span>
                {renderStars()}
              </div>
            </div>

            {/* Title with Exact Figma Typography */}
            <h3
              className="font-poppins font-bold text-[18px] sm:text-[19px] text-[#0E4A68] mt-2.5 uppercase tracking-[-0.03em] text-center line-clamp-1"
              style={{
                lineHeight: "42px",
              }}
            >
              {title}
            </h3>

            {/* Description */}
            <p className="font-poppins text-xs sm:text-[13px] text-[#0E4A68] font-normal leading-relaxed mt-1 text-center line-clamp-3">
              {description}
            </p>
          </div>

          <div>
            {/* Pricing Info Row */}
            <div className="font-poppins text-xs sm:text-sm font-bold text-[#0E4A68] text-center mt-4 mb-3.5 tracking-tight">
              Adult: {adultPrice.toFixed(2)} $ | Child: {childPrice.toFixed(2)} $ | Infant:{" "}
              {infantPrice.toFixed(2)} $
            </div>

            {/* View Details Action Button with radius 15px & border 0.31px */}
            <div
              className="w-full flex items-center justify-center bg-[#165F84] group-hover:bg-[#0E4A68] active:scale-[0.99] text-[#FFFFFF] font-poppins text-sm sm:text-base font-semibold py-2.5 px-4 rounded-[15px] transition-colors"
              style={{
                border: "0.31px solid #000000",
                boxShadow: "0px 2px 20px 2px rgba(0, 0, 0, 0.25)",
              }}
            >
              View Details
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default GroupExcursionCard;
