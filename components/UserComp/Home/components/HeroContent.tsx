"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Dictionary } from "@/shared/utils/getDictionary";

interface HeroContentProps {
  dict: Dictionary;
  currentLocale: string;
}

export function HeroContent({ dict, currentLocale }: HeroContentProps) {
  const { hero } = dict;

  return (
    <div className="flex flex-col items-start text-left z-20 w-full max-w-[540px] xl:max-w-[600px] shrink-0">
      {/* 1. Tagline: UNVEIL AMAZING */}
      <span className="font-['Montserrat'] font-bold text-[30px] sm:text-[34px] lg:text-[38px] xl:text-[40px] leading-[100%] text-[#D48C28] tracking-tight">
        {hero.tagline}
      </span>

      {/* 2. Headline: DESTINATIONS */}
      <h1 className="mt-2.5 font-['Montserrat'] font-bold text-[50px] sm:text-[60px] lg:text-[68px] xl:text-[75px] leading-[105%] text-[#0E4A68] tracking-tight">
        {hero.headline}
      </h1>

      {/* 3. Description Paragraph */}
      <p className="mt-5 font-['Poppins'] font-light text-[17px] sm:text-[20px] lg:text-[23px] xl:text-[25px] leading-[28px] sm:leading-[33px] lg:leading-[38px] text-[#000000] max-w-[500px]">
        {hero.description}
      </p>

      {/* 4. Action Buttons (Desktop Row) */}
      <div className="mt-8 hidden lg:flex items-center gap-4 xl:gap-5">
        {/* Hotel Deliveries Button */}
        <Link
          href={`/${currentLocale}/hotel-deliveries`}
          className="inline-flex items-center justify-center gap-3 rounded-[14px] bg-[#0E4A68] px-7 py-2 font-['Poppins'] text-[19px] font-medium leading-[42px] text-white shadow-md transition-colors hover:bg-[#093247] focus:outline-none"
        >
          <Image
            src="/homepage/hero/cart.svg"
            alt="Cart"
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />
          <span>{hero.buttons.hotelDeliveries}</span>
        </Link>

        {/* Explore Services Button */}
        <Link
          href={`/${currentLocale}/services`}
          className="inline-flex items-center justify-center gap-3 rounded-[14px] bg-[#D48C28] px-7 py-2 font-['Poppins'] text-[19px] font-medium leading-[42px] text-white shadow-md transition-colors hover:bg-[#B9741A] focus:outline-none"
        >
          <Image
            src="/homepage/hero/campas.svg"
            alt="Explore"
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />
          <span>{hero.buttons.exploreServices}</span>
        </Link>
      </div>
    </div>
  );
}

export default HeroContent;
