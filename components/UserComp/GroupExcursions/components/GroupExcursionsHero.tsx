"use client";

import React from "react";
import Image from "next/image";

interface GroupExcursionsHeroProps {
  locale?: string;
}

export function GroupExcursionsHero({}: GroupExcursionsHeroProps) {
  return (
    <section className="w-full pt-28 sm:pt-32 pb-8 sm:pb-12">
      <div className="mx-auto w-full max-w-[1340px] px-4 sm:px-6 lg:px-8">
        {/* Header Title & Subtitle */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="font-poppins text-3xl sm:text-4xl md:text-[44px] font-bold text-[#0E4A68] tracking-tight leading-tight">
            Group Excursions
          </h1>
          <p className="font-poppins text-sm sm:text-base md:text-[18px] text-[#646464] mt-2 sm:mt-3 max-w-3xl mx-auto">
            Discover amazing Group excursions in the Red Sea with the best prices and services
          </p>
        </div>

        {/* Hero Image Banner with border-radius: 15px */}
        <div className="relative w-full aspect-[16/7.5] sm:aspect-[16/7] md:aspect-[1320/540] overflow-hidden rounded-[15px] shadow-sm">
          <Image
            src="/GroupExcursions/herobg.png"
            alt="Group Excursions in Egypt"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1400px) 95vw, 1340px"
            className="object-cover object-center select-none"
          />
        </div>
      </div>
    </section>
  );
}

export default GroupExcursionsHero;
