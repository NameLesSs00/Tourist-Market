"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface AboutHeroProps {
  locale?: string;
}

export function AboutHero({ locale = "en" }: AboutHeroProps) {
  const isRTL = locale === "ar";

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="relative isolate w-full overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-16 lg:pb-12 xl:pt-20 xl:pb-16 min-h-[540px] xl:min-h-[580px] flex items-center"
      style={{
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFEACD 41%, #FFEACD 100%)",
      }}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* ─── DESKTOP VIEW (lg / xl): Side-by-side matching PromptsUi/about/image.png (1440x547) ─── */}
        <div className="hidden lg:grid grid-cols-12 items-center min-h-[520px]">
          {/* Left Text Block */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="col-span-6 xl:col-span-6 flex flex-col justify-center pr-4 xl:pr-8 z-10"
          >
            <h1 className="font-['Poppins'] text-[48px] xl:text-[58px] font-bold leading-[1.12] tracking-tight text-[#0E4A68]">
              More Than a Trip
              <br />
              It’s a <span className="text-[#D48C28]">Story</span>
            </h1>

            <p className="mt-6 max-w-[480px] font-['Poppins'] text-[16px] xl:text-[17px] leading-[1.7] text-[#0E4A68]">
              we believe that travel is not just about visiting new places, it&apos;s about
              discovering new perspectives, creating unforgettable memories, and living
              experiences that stay with you forever.
            </p>
          </motion.div>

          {/* Right Column: Hero Photo + Dotted Arrow + Caveat Real Text (anchored exactly as in image.png) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="col-span-6 xl:col-span-6 flex justify-end items-center relative"
          >
            <div className="relative w-full max-w-[530px] xl:max-w-[620px] translate-x-10 aspect-[1116/1094]">
              {/* Pure Photo Cutout (no baked-in text) */}
              <Image
                src="/about/abouthero.png"
                alt="Traveler with backpack admiring the Red Sea"
                fill
                priority
                sizes="(max-width: 1440px) 50vw, 620px"
                className="object-contain object-right drop-shadow-sm select-none"
              />

              {/* Dotted Arrow: positioned further down to point smoothly towards the image */}
              <div
                className={`absolute pointer-events-none -translate-x-10 select-none z-20 ${
                  isRTL
                    ? "-right-36 xl:-right-44 top-[32%] xl:top-[34%]"
                    : "-left-36 xl:-left-44 top-[32%] xl:top-[34%]"
                }`}
                style={{
                  width: "220px",
                  height: "105px",
                }}
              >
                <Image
                  src="/about/arrow.svg"
                  alt=""
                  fill
                  priority
                  className="object-contain"
                  style={{
                    transform: isRTL ? "scaleX(-1)" : "none",
                  }}
                />
              </div>

              {/* Real Text Callout: Rotated -29.23 deg nestled into the curve below the arrow */}
              <div
                className={`absolute pointer-events-none  -translate-y-10 select-none z-20 ${
                  isRTL
                    ? "-right-28 xl:-right-36 top-[58%] xl:top-[60%]"
                    : "-left-28 xl:-left-36 top-[58%] xl:top-[60%]"
                }`}
                style={{
                  transform: isRTL ? "rotate(29.23deg)" : "rotate(-29.23deg)",
                  transformOrigin: isRTL ? "top right" : "top left",
                }}
              >
                <p
                  className={`${caveat.className} font-caveat text-[#0E4A68] text-[36px] xl:text-[42px] leading-[1.08] tracking-tight whitespace-pre text-left`}
                >
                  {`Travel\nConnects\nPeople`}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── MOBILE & TABLET VIEW (< lg): Same exact anchored layout scaled for mobile ─── */}
        <div className="flex flex-col items-center gap-8 lg:hidden">
          {/* Headline & Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="w-full text-center sm:text-left max-w-[560px]"
          >
            <h1 className="font-['Poppins'] text-[32px] sm:text-[42px] font-bold leading-[1.16] tracking-tight text-[#0E4A68]">
              More Than a Trip
              <br />
              It’s a <span className="text-[#D48C28]">Story</span>
            </h1>

            <p className="mt-4 font-['Poppins'] text-[15px] sm:text-[16px] leading-[1.65] text-[#0E4A68]">
              we believe that travel is not just about visiting new places, it&apos;s about
              discovering new perspectives, creating unforgettable memories, and living
              experiences that stay with you forever.
            </p>
          </motion.div>

          {/* Unified Photo + Arrow + "Travel Connects People" Graphic (Same anchored composition as desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="w-full flex justify-end pr-2 sm:justify-center sm:pr-0 mt-6 sm:mt-8 pt-4 pb-2 overflow-visible"
          >
            <div className="relative w-[230px] sm:w-[320px] aspect-[1116/1094]">
              {/* Photo Cutout */}
              <Image
                src="/about/abouthero.png"
                alt="Traveler with backpack admiring the Red Sea"
                fill
                priority
                sizes="(max-width: 640px) 230px, 320px"
                className="object-contain object-right drop-shadow-sm select-none"
              />

              {/* Dotted Arrow: positioned further down pointing smoothly towards the image */}
              <div
                className={`absolute pointer-events-none mt-10 -translate-x-10 select-none z-20 ${
                  isRTL
                    ? "-right-24 sm:-right-32 top-[28%]"
                    : "-left-24 sm:-left-32 top-[28%]"
                }`}
                style={{
                  width: "140px",
                  height: "70px",
                }}
              >
                <Image
                  src="/about/arrow.svg"
                  alt=""
                  fill
                  className="object-contain"
                  style={{
                    transform: isRTL ? "scaleX(-1)" : "none",
                  }}
                />
              </div>

              {/* Real Text Callout: Rotated -29.23 deg nestled into the photo curve below the arrow */}
              <div
                className={`absolute pointer-events-none select-none mt-10 -ml-5 z-20 ${
                  isRTL
                    ? "-right-18 sm:-right-26 top-[56%]"
                    : "-left-18 sm:-left-26 top-[56%]"
                }`}
                style={{
                  transform: isRTL ? "rotate(29.23deg)" : "rotate(-29.23deg)",
                  transformOrigin: isRTL ? "top right" : "top left",
                }}
              >
                <p
                  className={`${caveat.className} font-caveat text-[#0E4A68] text-[24px] sm:text-[28px]  leading-[1.06] tracking-tight whitespace-pre text-left`}
                >
                  {`Travel\nConnects\nPeople`}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
