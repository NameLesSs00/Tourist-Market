"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/shared/utils/getDictionary";
import {
  HeroBackground,
  HeroContent,
  DesktopHexGrid,
  MobileHexGrid,
} from "../components";

interface HeroSectionProps {
  locale?: string;
}

export function HeroSection({ locale = "en" }: HeroSectionProps) {
  const dict = getDictionary(locale);
  const { hero } = dict;

  return (
    <section className="relative w-full overflow-hidden min-h-[78vh] lg:min-h-[90vh] max-h-[980px] flex items-center justify-center -mt-20 pt-20 pb-8 lg:pt-24 lg:pb-8">
      {/* 1. Full-Bleed Background Texture & Centered Watermark Logo */}
      <HeroBackground />

      {/* 2. Main Content Container */}
      <div className="relative z-10 w-full max-w-[1740px] mx-auto px-6 sm:px-10 lg:pl-8 xl:pl-12 2xl:pl-16 lg:pr-0">
        {/* Desktop View: Side-by-Side Flex Layout Matching Master Design */}
        <div className="hidden lg:flex items-center justify-between gap-6 xl:gap-8">
          {/* Left Column: Big, Lively Headline, Description & Action Buttons */}
          <HeroContent dict={dict} currentLocale={locale} />

          {/* Right Column: Interlocking Honeycomb Hexagons & Big 3D Pyramid (Partly Cut at Right Edge) */}
          <DesktopHexGrid />
        </div>

        {/* Mobile View: Stacked Layout Matching HeroMobile.png */}
        <div className="flex lg:hidden flex-col items-center">
          {/* Top Title & Text */}
          <HeroContent dict={dict} currentLocale={locale} />

          {/* Centerpiece: Mobile Hexagons Cluster + 3D Pyramid */}
          <MobileHexGrid />

          {/* Bottom Stacked Action Buttons for Mobile */}
          <div className="w-full max-w-[340px] flex flex-col gap-3.5 z-20">
            {/* Explore Services Button */}
            <Link
              href={`/${locale}/services`}
              className="flex items-center justify-center gap-3 w-full rounded-[14px] bg-[#D48C28] py-3.5 px-6 font-['Poppins'] text-[18px] font-medium leading-none text-white shadow-md active:scale-95 transition-all"
            >
              <Image
                src="/homepage/hero/campas.svg"
                alt="Explore"
                width={22}
                height={22}
                className="h-5 w-5 object-contain"
              />
              <span>{hero.buttons.exploreServices}</span>
            </Link>

            {/* Hotel Deliveries Button */}
            <Link
              href={`/${locale}/hotel-deliveries`}
              className="flex items-center justify-center gap-3 w-full rounded-[14px] bg-[#0E4A68] py-3.5 px-6 font-['Poppins'] text-[18px] font-medium leading-none text-white shadow-md active:scale-95 transition-all"
            >
              <Image
                src="/homepage/hero/cart.svg"
                alt="Cart"
                width={22}
                height={22}
                className="h-5 w-5 object-contain"
              />
              <span>{hero.buttons.hotelDeliveries}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
