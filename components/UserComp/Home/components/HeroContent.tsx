"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Dictionary } from "@/shared/utils/getDictionary";
import { useIsFallbackHeading } from "@/components/UserComp/Shared/ContentHeading";

interface HeroContentProps {
  dict: Dictionary;
  currentLocale: string;
}

export function HeroContent({ dict, currentLocale }: HeroContentProps) {
  const { hero } = dict;
  // the home page ships this tree twice (the shell fallback and the resolved content),
  // so only the copy outside the fallback may own the document heading
  const Heading = (useIsFallbackHeading() ? motion.div : motion.h1) as typeof motion.h1;

  return (
    <div className="flex flex-col items-start text-left z-20 w-full max-w-[450px] xl:max-w-[540px] 2xl:max-w-[600px] shrink-0">
      {/* 1. Tagline: UNVEIL AMAZING */}
      <motion.span
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="font-['Montserrat'] font-bold text-[28px] sm:text-[34px] lg:text-[32px] xl:text-[38px] 2xl:text-[40px] leading-[100%] text-[#D48C28] tracking-tight"
      >
        {hero.tagline}
      </motion.span>

      {/* 2. Headline: DESTINATIONS */}
      <Heading
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="mt-2.5 font-['Montserrat'] font-bold text-[44px] sm:text-[60px] lg:text-[48px] xl:text-[68px] 2xl:text-[75px] leading-[105%] text-[#0E4A68] tracking-tight"
      >
        {hero.headline}
      </Heading>

      {/* 3. Description Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.28, ease: "easeOut" }}
        className="mt-4 xl:mt-5 font-['Poppins'] font-light text-[16px] sm:text-[20px] lg:text-[17px] xl:text-[22px] 2xl:text-[25px] leading-[26px] sm:leading-[33px] lg:leading-[30px] xl:leading-[36px] text-[#000000] max-w-[480px]"
      >
        {hero.description}
      </motion.p>

      {/* 4. Action Buttons (Desktop Row) */}
      <div className="mt-6 xl:mt-8 hidden lg:flex items-center gap-3 xl:gap-4 2xl:gap-5">
        {/* Hotel Deliveries Button */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.42, ease: "easeOut" }}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href={`/${currentLocale}/hotel-deliveries`}
            className="inline-flex items-center justify-center gap-2.5 xl:gap-3 rounded-[14px] bg-[#0E4A68] px-5 py-2 xl:px-7 font-['Poppins'] text-[16px] xl:text-[19px] font-medium leading-[38px] xl:leading-[42px] text-white shadow-md transition-colors hover:bg-[#093247] focus:outline-none"
          >
            <Image
              src="/homepage/hero/cart.svg"
              alt="Cart"
              width={24}
              height={24}
              className="h-5 w-5 xl:h-6 xl:w-6 object-contain"
            />
            <span>{hero.buttons.hotelDeliveries}</span>
          </Link>
        </motion.div>

        {/* Explore Services Button */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.52, ease: "easeOut" }}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href={`/${currentLocale}/services/tourist`}
            className="inline-flex items-center justify-center gap-2.5 xl:gap-3 rounded-[14px] bg-[#D48C28] px-5 py-2 xl:px-7 font-['Poppins'] text-[16px] xl:text-[19px] font-medium leading-[38px] xl:leading-[42px] text-white shadow-md transition-colors hover:bg-[#B9741A] focus:outline-none"
          >
            <Image
              src="/homepage/hero/campas.svg"
              alt="Explore"
              width={24}
              height={24}
              className="h-5 w-5 xl:h-6 xl:w-6 object-contain"
            />
            <span>{hero.buttons.exploreServices}</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default HeroContent;
