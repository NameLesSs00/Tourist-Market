"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { GroupExcursionDetail } from "../types";

interface GroupDetailsHeroProps {
  detail: GroupExcursionDetail;
  locale?: string;
}

export function GroupDetailsHero({
  detail,
  locale = "en",
}: GroupDetailsHeroProps) {
  const { title, subtitle, duration, availability, pickup } = detail;

  return (
    <section className="relative w-full overflow-hidden bg-[#FFF8ED]">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/GroupExcursions/GroupDetails/Hero-pic.png"
          alt="Hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right-bottom sm:object-right"
        />
        {/* Soft gradient overlay on left for readable text */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF8ED]/95 via-[#FFF8ED]/80 to-transparent lg:w-[65%]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1340px] px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-12 sm:pb-16">
        {/* Back link */}
        <div className="mb-6">
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

        {/* Title */}
        <h1 className="max-w-[700px] font-poppins text-3xl sm:text-4xl md:text-[50px] font-bold text-[#0E4A68] leading-[1.18] tracking-tight">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="mt-4 max-w-[540px] font-poppins text-sm sm:text-base md:text-[17px] text-[#0E4A68] leading-relaxed">
          {subtitle}
        </p>

        {/* Information Stats Row */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-6 sm:gap-8">
          {/* Duration */}
          <div className="flex items-center gap-3">
            <div className="text-[#0E4A68]">
              <svg
                className="w-8 h-8 sm:w-9 sm:h-9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <div className="font-poppins text-xs text-[#646464]">Duration</div>
              <div className="font-poppins text-sm sm:text-base font-bold text-[#0E4A68]">
                {duration}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-10 w-[1px] bg-[#888888]/60" />

          {/* Availability */}
          <div className="flex items-center gap-3">
            <div className="text-[#0E4A68]">
              <svg
                className="w-8 h-8 sm:w-9 sm:h-9"
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
            <div>
              <div className="font-poppins text-xs text-[#646464]">Availability</div>
              <div className="font-poppins text-sm sm:text-base font-bold text-[#0E4A68]">
                {availability}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-10 w-[1px] bg-[#888888]/60" />

          {/* Pickup */}
          <div className="flex items-center gap-3">
            <div className="text-[#0E4A68]">
              <svg
                className="w-8 h-8 sm:w-9 sm:h-9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <div className="font-poppins text-xs text-[#646464]">Pickup</div>
              <div className="font-poppins text-sm sm:text-base font-bold text-[#0E4A68]">
                {pickup}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GroupDetailsHero;
