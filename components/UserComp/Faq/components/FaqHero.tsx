"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getDictionary } from "@/shared/utils/getDictionary";

interface FaqHeroProps {
  locale?: string;
}

export function FaqHero({ locale = "en" }: FaqHeroProps) {
  const dict = getDictionary(locale);
  const isRTL = locale === "ar";

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="relative isolate w-full overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-32 lg:pb-16 min-h-[380px] lg:min-h-[440px] flex items-center"
      style={{
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFEACD 41%, #FFEACD 100%)",
      }}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Column: Breadcrumb, Main Headings, Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="lg:col-span-8 flex flex-col justify-center"
          >
            {/* Breadcrumb Navigation */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 font-poppins text-xs sm:text-sm text-[#0E4A6899] mb-4"
            >
              <Link
                href={`/${locale}`}
                className="transition-colors hover:text-[#D48C28] cursor-pointer"
              >
                {dict.nav?.home || "Home"}
              </Link>
              <span className="text-[#0E4A6840]">/</span>
              <span className="font-semibold text-[#D48C28]">
                {dict.nav?.faq || "FAQ"}
              </span>
            </nav>

            {/* Main Heading */}
            <h1 className="font-poppins text-[34px] sm:text-[44px] md:text-[50px] lg:text-[54px] font-bold leading-[1.14] tracking-tight text-[#0E4A68]">
              Find Answers to Your
              <br />
              Travel <span className="text-[#D48C28]">Questions</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 max-w-[620px] font-poppins text-sm sm:text-base lg:text-[17px] leading-relaxed text-[#0E4A68CC]">
              Everything you need to know about our excursions, hotel deliveries,
              private VIP experiences, and booking policies in one convenient place.
            </p>
          </motion.div>

          {/* Right Column: Themed Visual Accent Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-4 hidden lg:flex justify-end items-center"
          >
            <div className="relative flex h-36 w-36 xl:h-44 xl:w-44 items-center justify-center rounded-3xl border border-[#0E4A6826] bg-[#FFF8EF] shadow-md p-6">
              <Image
                src="/homepage/Faq/Questions.svg"
                alt="Questions Badge"
                width={90}
                height={90}
                className="h-20 w-auto xl:h-24 object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default FaqHero;
