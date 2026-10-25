"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PrivateExcursion } from "../types";

interface PrivateExcursionCardProps {
  excursion: PrivateExcursion;
  locale?: string;
}

export function PrivateExcursionCard({
  excursion,
  locale = "en",
}: PrivateExcursionCardProps) {
  const {
    slug,
    title,
    shortDescription,
    duration,
    rating,
    category,
    badge,
    imageUrl,
    adultPrice,
    childPrice,
    infantPrice,
    currency,
  } = excursion;

  // Rating stars: lime green #8CC63F matching reference
  const fullStars = Math.floor(rating);

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "12px",
        border: "0.5px solid #888888",
        boxShadow: "0px 2px 20px 2px rgba(0, 0, 0, 0.2)",
      }}
      className="group relative w-full flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_8px_30px_rgba(0,0,0,0.25)]"
    >
      {/* 1. Excursion Image Banner with Pill Badge */}
      <div className="relative w-full h-[220px] sm:h-[240px] overflow-hidden bg-slate-100">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category Pill Badge */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span
            className={`inline-block px-3.5 py-1 rounded-[6px] font-poppins text-xs font-semibold shadow-sm ${
              category === "FUN Trips"
                ? "bg-[#00BCD4] text-white"
                : "bg-black/60 text-white backdrop-blur-sm"
            }`}
          >
            {badge || category}
          </span>
        </div>
      </div>

      {/* 2. Card Content Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
        {/* Top Meta: Duration (left) & Rating Stars (right) */}
        <div className="flex items-center justify-between gap-2 font-poppins text-sm text-[#0E4A68]">
          {/* Duration */}
          <div className="flex items-center gap-1.5 font-semibold">
            <svg
              className="w-4 h-4 text-[#0E4A68]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
            </svg>
            <span>{duration}</span>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-1">
            <span className="font-bold text-[#0E4A68] text-sm">
              {rating.toFixed(1)}
            </span>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-3.5 h-3.5 ${
                    star <= fullStars
                      ? "text-[#8CC63F] fill-[#8CC63F]"
                      : "text-[#8CC63F] fill-[#8CC63F]/40"
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-poppins text-base sm:text-[17px] font-bold text-[#0E4A68] uppercase line-clamp-1 leading-snug">
          {title}
        </h3>

        {/* Description */}
        <p className="font-poppins text-xs sm:text-sm text-[#0E4A68]/85 leading-relaxed line-clamp-3">
          {shortDescription}
        </p>

        {/* Pricing Row */}
        <div className="pt-2 font-poppins text-xs sm:text-sm font-bold text-[#0E4A68] tracking-tight">
          Adult: {adultPrice.toFixed(2)} {currency} | Child: {childPrice.toFixed(2)} {currency} | Infant: {infantPrice.toFixed(2)} {currency}
        </div>

        {/* View Details Action Button */}
        <Link
          href={`/${locale}/private-excursions/${slug}`}
          style={{
            backgroundColor: "#DE7423",
            border: "0.31px solid #DE7423",
            boxShadow: "0px 2px 20px 2px rgba(0, 0, 0, 0.25)",
            borderRadius: "8px",
          }}
          className="w-full mt-1 py-2.5 px-4 text-white font-poppins text-sm font-semibold tracking-wide text-center transition-all duration-200 hover:brightness-105 active:scale-[0.99] block cursor-pointer"
        >
          View Details
        </Link>
      </div>

      {/* Entire Card Clickable Overlay */}
      <Link
        href={`/${locale}/private-excursions/${slug}`}
        aria-label={`View details for ${title}`}
        className="absolute inset-0 z-0 opacity-0"
        tabIndex={-1}
      />
    </div>
  );
}

export default PrivateExcursionCard;
