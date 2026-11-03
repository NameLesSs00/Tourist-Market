"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getDictionary } from "@/shared/utils/getDictionary";

interface BlogsHeroProps {
  locale?: string;
}

export function BlogsHero({ locale = "en" }: BlogsHeroProps) {
  const isRTL = locale === "ar";
  const dict = getDictionary(locale);
  const t = dict.blogs;
  const h = t.hero;

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="relative isolate w-full overflow-hidden pt-28 pb-14 sm:pt-32 sm:pb-20 lg:pt-24 lg:pb-24"
      style={{
        background:
          "linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, #FFEACD 41.35%)",
      }}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Column: Headings & Flourish */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center"
          >
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
              className="font-['Poppins'] text-[36px] sm:text-[46px] md:text-[52px] lg:text-[56px] xl:text-[60px] font-bold leading-[1.12] tracking-tight text-[#0E4A68]"
            >
              {h.headingLine1}
              <br />
              {h.headingLine2} <span className="text-[#D48C28]">{h.headingAccent}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: "easeOut" }}
              className="mt-5 max-w-[500px] font-['Poppins'] text-[15px] sm:text-[17px] lg:text-[18px] leading-[1.6] text-[#0E4A68]"
            >
              {h.subtitle}
            </motion.p>

            {/* Handwritten Flourish */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.36, ease: "easeOut" }}
              className="mt-8 sm:mt-12"
            >
              <p className="font-['Poppins'] text-[24px] sm:text-[28px] lg:text-[32px] italic text-[#0E4A68] tracking-tight">
                {h.flourish}
              </p>
              <div className="mt-2 w-[240px] sm:w-[280px] lg:w-[320px]">
                <svg
                  viewBox="0 0 375 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M1.00032 23.7799C1.00032 23.7799 72.9352 16.0113 111.878 12.0259C150.822 8.04045 368.07 -15.7179 373.56 22.0832"
                    stroke="#0E4A68"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.55, ease: "easeOut" }}
                  />
                </svg>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Collage Graphic */}
          <motion.div
            initial={{ opacity: 0, x: 28, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[560px] lg:max-w-[620px] aspect-[1009/796]">
              <Image
                src="/Blogs/blogsHero.png"
                alt={h.heroImageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 620px"
                className="object-contain drop-shadow-sm select-none"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default BlogsHero;
