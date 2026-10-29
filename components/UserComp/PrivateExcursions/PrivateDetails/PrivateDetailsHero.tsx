"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PRIVATE_EXCURSION_FALLBACK_IMAGE } from "../utils/privateExcursionAdapter";

interface PrivateDetailsHeroProps {
  title?: string;
  subtitle?: string;
  duration?: string;
  pickup?: string;
  locale?: string;
  heroImage?: string;
}

export function PrivateDetailsHero({
  title = "PRIVATE HURGHADA CITY TOUR",
  subtitle = "Discover the timeless wonders of Cairo — stand before the Great Pyramids, explore the Sphinx, and dive into the treasures of the Egyptian Museum.",
  duration = "20 hours",
  pickup = "From Your Hotel",
  locale = "en",
  heroImage = "/PrivateExcursions/Privatedetails/Hero-pic.png",
}: PrivateDetailsHeroProps) {
  // Format title if it contains TOUR or break for desktop
  const formattedTitle = title.includes("TOUR")
    ? title.replace("TOUR", "\nTOUR")
    : title;

  const targetImage = heroImage || "/PrivateExcursions/Privatedetails/Hero-pic.png";

  const [imgSrc, setImgSrc] = useState(targetImage);
  if (imgSrc !== targetImage && imgSrc !== PRIVATE_EXCURSION_FALLBACK_IMAGE) {
    setImgSrc(targetImage);
  }
  const isFallback =
    !targetImage ||
    targetImage === PRIVATE_EXCURSION_FALLBACK_IMAGE ||
    imgSrc === PRIVATE_EXCURSION_FALLBACK_IMAGE;

  return (
    <section className="relative w-full overflow-hidden bg-[#FFF8ED] pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-24 lg:pb-16 min-h-[520px] lg:min-h-[580px] flex items-center">
      {/* Background Hero Image with Group Excursion Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imgSrc}
          alt={title}
          fill
          priority
          sizes="100vw"
          onError={() => {
            if (imgSrc !== PRIVATE_EXCURSION_FALLBACK_IMAGE) {
              setImgSrc(PRIVATE_EXCURSION_FALLBACK_IMAGE);
            }
          }}
          className={`object-right-bottom sm:object-right ${
            isFallback
              ? "object-contain p-6 sm:p-12 opacity-50"
              : "object-cover"
          }`}
        />
        {/* Gradient overlay matching group excursions */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(270deg, rgba(255, 255, 255, 0) 18.27%, #FFEACD 54.33%)",
          }}
        />
        {/* Soft gradient overlay on left for readable text */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF8ED] via-[#FFF8ED]/95 sm:via-[#FFF8ED]/80 to-transparent lg:w-[65%]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href={`/${locale}/private-excursions`}
            className="inline-flex items-center gap-2 text-[15px] sm:text-[16px] font-medium text-[#0E4A68] hover:text-[#DE7423] transition-colors"
          >
            <span className="text-lg">←</span>
            <span>back to Excursions</span>
          </Link>
        </div>

        {/* Main Content Block */}
        <div className="max-w-[560px]">
          {/* Main Title: #DE7423, bold, 58px on desktop */}
          <h1 className="text-[34px] sm:text-[46px] lg:text-[56px] xl:text-[58px] font-bold leading-[1.08] tracking-tight text-[#DE7423] uppercase whitespace-pre-line font-poppins">
            {formattedTitle}
          </h1>

          {/* Subtitle: #0E4A68 */}
          <p className="mt-5 text-[15px] sm:text-[16px] lg:text-[17px] font-normal leading-[1.65] text-[#0E4A68] font-poppins">
            {subtitle}
          </p>

          {/* Stats Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-6 sm:gap-8 pt-2">
            {/* Stat 1: Duration */}
            <div className="flex items-center gap-3.5">
              <div className="relative w-11 h-11 shrink-0">
                <Image
                  src="/PrivateExcursions/Privatedetails/Frame 487.svg"
                  alt="Duration icon"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-normal text-[#666666] font-poppins">
                  Duration
                </span>
                <span className="text-[17px] sm:text-[19px] font-bold text-[#DE7423] font-poppins">
                  {duration}
                </span>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden sm:block w-[1px] h-10 bg-[#BBBBBB]" />

            {/* Stat 2: Pickup */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#DE7423]"
                >
                  <path
                    d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2ZM12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9C14.5 10.3807 13.3807 11.5 12 11.5Z"
                    fill="#DE7423"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-normal text-[#666666] font-poppins">
                  Pickup
                </span>
                <span className="text-[17px] sm:text-[19px] font-bold text-[#DE7423] font-poppins">
                  {pickup}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
