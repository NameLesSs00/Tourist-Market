"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GroupExcursionDetail } from "../types";
import { GROUP_EXCURSION_FALLBACK_IMAGE } from "../utils/groupExcursionAdapter";

interface GroupDetailsHeroProps {
  detail: GroupExcursionDetail;
  locale?: string;
}

export function GroupDetailsHero({
  detail,
  locale = "en",
}: GroupDetailsHeroProps) {
  const {
    title,
    subtitle,
    shortDescription,
    badge,
    duration,
    availability,
    pickup,
    maxParticipants,
    heroImage,
    imageUrl,
    gallery,
  } = detail;

  // Use hero image or excursion primary/gallery image from the admin payload, falling back to HeroLogo.webp
  const targetImage =
    heroImage ||
    imageUrl ||
    (gallery && gallery[0]) ||
    GROUP_EXCURSION_FALLBACK_IMAGE;

  const [imgSrc, setImgSrc] = useState(targetImage);
  if (imgSrc !== targetImage && imgSrc !== GROUP_EXCURSION_FALLBACK_IMAGE) {
    setImgSrc(targetImage);
  }
  const isFallback =
    !targetImage ||
    targetImage === GROUP_EXCURSION_FALLBACK_IMAGE ||
    imgSrc === GROUP_EXCURSION_FALLBACK_IMAGE;

  return (
    <section className="relative w-full overflow-hidden bg-[#FFF8ED]">
      {/* Background Hero Image (first backend image, or the shared fallback) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imgSrc}
          alt={title}
          fill
          priority
          sizes="100vw"
          onError={() => {
            if (imgSrc !== GROUP_EXCURSION_FALLBACK_IMAGE) {
              setImgSrc(GROUP_EXCURSION_FALLBACK_IMAGE);
            }
          }}
          className={`object-right-bottom sm:object-right ${
            isFallback
              ? "object-contain p-6 sm:p-12 opacity-50"
              : "object-cover"
          }`}
        />
        {/* Gradient overlay from your specification */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(270deg, rgba(255, 255, 255, 0) 18.27%, #FFEACD 54.33%)'
          }}
        />
        {/* Soft gradient overlay on left for readable text */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF8ED] via-[#FFF8ED]/95 sm:via-[#FFF8ED]/80 to-transparent lg:w-[65%]" />
      </div>

      <div className="relative z-10 w-full px-3.5 sm:px-6 lg:px-10 xl:px-16 pt-20 sm:pt-28 lg:pt-36 pb-8 sm:pb-12 lg:pb-16">
        {/* Back link */}
        <div className="mb-4 sm:mb-6">
          <Link
            href={`/${locale}/group-excursions`}
            className="inline-flex items-center gap-2 font-poppins text-sm sm:text-base font-medium text-[#0E4A68] hover:underline transition-all"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>back to Excursions</span>
          </Link>
        </div>

        {/* Excursion type badge */}
        {badge && (
          <div
            className="inline-flex mb-3 sm:mb-4 text-[#0E4A68] font-poppins text-xs sm:text-sm font-semibold px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-[30px]"
            style={{
              background: "#FFFFFFE5",
              boxShadow: "0px 2px 10px 3px #FFFFFF40",
            }}
          >
            {badge}
          </div>
        )}

        {/* Title */}
        <h1 className="max-w-[900px] font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-bold text-[#0E4A68] leading-[1.18] tracking-tight break-words">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="mt-3 sm:mt-4 max-w-[680px] font-poppins text-sm sm:text-base md:text-[17px] text-[#0E4A68] leading-relaxed break-words">
          {subtitle}
        </p>

        {/* Short description summary */}
        {shortDescription && shortDescription !== subtitle && (
          <p className="mt-2 max-w-[680px] font-poppins text-xs sm:text-sm md:text-base text-[#0E4A68]/80 leading-relaxed break-words">
            {shortDescription}
          </p>
        )}

        {/* Information Stats Row */}
        <div className="mt-6 sm:mt-8 lg:mt-10 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-4 sm:gap-6 lg:gap-8">
          {/* Duration */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="text-[#0E4A68] shrink-0">
              <svg
                className="w-7 h-7 sm:w-9 sm:h-9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="font-poppins text-[11px] sm:text-xs text-[#646464]">Duration</div>
              <div className="font-poppins text-xs sm:text-sm lg:text-base font-bold text-[#0E4A68] truncate">
                {duration}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-8 lg:h-10 w-[1px] bg-[#888888]/60 shrink-0" />

          {/* Availability */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="text-[#0E4A68] shrink-0">
              <svg
                className="w-7 h-7 sm:w-9 sm:h-9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="font-poppins text-[11px] sm:text-xs text-[#646464]">Availability</div>
              <div className="font-poppins text-xs sm:text-sm lg:text-base font-bold text-[#0E4A68] truncate">
                {availability}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-8 lg:h-10 w-[1px] bg-[#888888]/60 shrink-0" />

          {/* Pickup */}
          <div className="flex items-center gap-2.5 sm:gap-3 col-span-2 sm:col-span-1">
            <div className="text-[#0E4A68] shrink-0">
              <svg
                className="w-7 h-7 sm:w-9 sm:h-9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="font-poppins text-[11px] sm:text-xs text-[#646464]">Pickup</div>
              <div className="font-poppins text-xs sm:text-sm lg:text-base font-bold text-[#0E4A68] truncate">
                {pickup}
              </div>
            </div>
          </div>

          {/* Group Size (when maxParticipants is provided) */}
          {maxParticipants && maxParticipants > 0 ? (
            <>
              <div className="hidden sm:block h-8 lg:h-10 w-[1px] bg-[#888888]/60 shrink-0" />
              <div className="flex items-center gap-2.5 sm:gap-3 col-span-2 sm:col-span-1">
                <div className="text-[#0E4A68] shrink-0">
                  <svg
                    className="w-7 h-7 sm:w-9 sm:h-9"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="font-poppins text-[11px] sm:text-xs text-[#646464]">Group Size</div>
                  <div className="font-poppins text-xs sm:text-sm lg:text-base font-bold text-[#0E4A68] truncate">
                    Up to {maxParticipants} {maxParticipants === 1 ? "Person" : "People"}
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default GroupDetailsHero;
