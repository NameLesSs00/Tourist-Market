"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface CoverageExpansionProps {
  locale?: string;
}

export function CoverageExpansion({ locale = "en" }: CoverageExpansionProps) {
  const isRTL = locale === "ar";

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#FFF4E5]"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Coverage & Expansion Card matching Map.png */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 flex justify-center lg:justify-start"
          >
            <div
              style={{
                backgroundColor: "#FFFEF5",
                border: "0.5px solid #888888CC",
                borderRadius: "20px",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.04)",
              }}
              className="w-full max-w-[680px] p-8 sm:p-10 lg:p-12"
            >
              {/* Header Title matching Map.png */}
              <h2 className="font-['Poppins'] text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0C3B53] tracking-tight">
                Coverage & Expansion
              </h2>

              {/* Horizontal Divider Line (~75% width matching Map.png) */}
              <div
                style={{ borderTop: "0.8px solid #8A8A8A" }}
                className="w-3/4 my-6 sm:my-8"
              />

              {/* Timeline Items with cirline.svg */}
              <div className="relative flex gap-5 sm:gap-6 items-start pt-2">
                {/* Timeline Vector Graphic */}
                <div className="shrink-0 w-4 pt-1 flex justify-center select-none pointer-events-none">
                  <Image
                    src="/about/cirline.svg"
                    alt=""
                    width={16}
                    height={272}
                    className="w-4 h-auto object-contain"
                  />
                </div>

                {/* Locations Text matching Map.png exactly */}
                <div className="flex flex-col gap-10 sm:gap-14 pt-0">
                  {/* Current Locations */}
                  <div>
                    <h3 className="font-['Poppins'] text-lg sm:text-[21px] font-bold text-[#0E4A68]">
                      Current Locations
                    </h3>
                    <p className="mt-2 font-['Poppins'] text-[15px] sm:text-base text-[#0E4A68] leading-relaxed max-w-[480px]">
                      Hurghada, Sahl Hasheesh, El Gouna, Makadi Bay, Soma Bay, and Safaga
                    </p>
                  </div>

                  {/* Coming Soon */}
                  <div>
                    <h3 className="font-['Poppins'] text-lg sm:text-[21px] font-bold text-[#0E4A68]">
                      Coming Soon
                    </h3>
                    <p className="mt-2 font-['Poppins'] text-[15px] sm:text-base text-[#0E4A68] leading-relaxed max-w-[480px]">
                      Marsa Alam, Sharm El Sheikh, and Luxor
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Circular Map matching map-pic.png */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center items-center"
          >
            <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] xl:w-[460px] xl:h-[460px] select-none transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src="/about/map-pic.png"
                alt="Tourist Market coverage locations map"
                fill
                priority
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 460px"
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CoverageExpansion;
