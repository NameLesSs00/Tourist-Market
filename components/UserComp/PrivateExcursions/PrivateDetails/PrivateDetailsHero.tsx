"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PRIVATE_EXCURSION_FALLBACK_IMAGE } from "../utils/privateExcursionAdapter";
import { getDictionary } from "@/shared/utils/getDictionary";

interface PrivateDetailsHeroProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  duration?: string;
  pickup?: string;
  locale?: string;
  heroImage?: string;
}

export function PrivateDetailsHero({
  title = "PRIVATE HURGHADA CITY TOUR",
  subtitle = "Discover the timeless wonders of Cairo — stand before the Great Pyramids, explore the Sphinx, and dive into the treasures of the Egyptian Museum.",
  badge,
  duration = "20 hours",
  pickup = "From Your Hotel",
  locale = "en",
  heroImage = "/PrivateExcursions/Privatedetails/Hero-pic.png",
}: PrivateDetailsHeroProps) {
  const dict = getDictionary(locale);
  const t = dict.privateExcursions.details;

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
    <section className="relative w-full overflow-hidden bg-[#FFF8ED]">
      {/* Background Hero Image with Gradient Overlays */}
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
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(270deg, rgba(255, 255, 255, 0) 18.27%, #FFEACD 54.33%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF8ED] via-[#FFF8ED]/95 sm:via-[#FFF8ED]/80 to-transparent lg:w-[65%]" />
      </div>

      <div className="relative z-10 w-full px-3.5 sm:px-6 lg:px-10 xl:px-16 pt-20 sm:pt-28 lg:pt-36 pb-8 sm:pb-12 lg:pb-16">
        {/* Back Link */}
        <div className="mb-4 sm:mb-6">
          <motion.div whileHover={{ x: -4 }} className="inline-block">
            <Link
              href={`/${locale}/private-excursions`}
              className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-[#0E4A68] hover:text-[#DE7423] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>{t.backToExcursions || "back to Excursions"}</span>
            </Link>
          </motion.div>
        </div>

        {/* Main Content Block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {badge && (
            <div
              className="inline-flex mb-3 sm:mb-4 text-[#0E4A68] font-poppins text-xs sm:text-sm font-semibold px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-[30px]"
              style={{ background: "#FFFFFFE5", boxShadow: "0px 2px 10px 3px #FFFFFF40" }}
            >
              {badge}
            </div>
          )}

          <h1 className="max-w-[900px] font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-bold text-[#DE7423] leading-[1.18] tracking-tight break-words uppercase">
            {title}
          </h1>

          <p className="mt-3 sm:mt-4 max-w-[680px] font-poppins text-sm sm:text-base md:text-[17px] text-[#0E4A68] leading-relaxed break-words">
            {subtitle}
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
          className="mt-6 sm:mt-8 lg:mt-10 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-4 sm:gap-6 lg:gap-8"
        >
          {/* Stat 1: Duration */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="text-[#DE7423] shrink-0">
              <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="font-poppins text-[11px] sm:text-xs text-[#646464]">{t.durationLabel || "Duration"}</div>
              <div className="font-poppins text-xs sm:text-sm lg:text-base font-bold text-[#DE7423] truncate">
                {duration}
              </div>
            </div>
          </div>

          <div className="hidden sm:block h-8 lg:h-10 w-[1px] bg-[#888888]/60 shrink-0" />

          {/* Stat 2: Pickup */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="text-[#DE7423] shrink-0">
              <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="font-poppins text-[11px] sm:text-xs text-[#646464]">{t.pickupLabel || "Pickup"}</div>
              <div className="font-poppins text-xs sm:text-sm lg:text-base font-bold text-[#DE7423] truncate">
                {pickup}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PrivateDetailsHero;
