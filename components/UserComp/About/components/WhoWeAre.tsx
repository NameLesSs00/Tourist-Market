"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getDictionary } from "@/shared/utils/getDictionary";

interface WhoWeAreProps {
  locale?: string;
}

export function WhoWeAre({ locale = "en" }: WhoWeAreProps) {
  const isRTL = locale === "ar";
  const dict = getDictionary(locale);
  const t = dict.about.whoWeAre;

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="relative w-full py-14 sm:py-18 lg:py-20 bg-[#FFF4E5]"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading with flourish & descriptive text */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 24 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            {/* Heading with WhoWeAreArrow flourish */}
            <div className="relative inline-block mb-6 sm:mb-8">
              <h2 className="font-['Poppins'] text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[#0E4A68] leading-tight pr-6">
                {t.title}
              </h2>
              {/* Loop flourish wrapper */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="absolute pointer-events-none select-none"
                style={{
                  left: isRTL ? "auto" : "-10px",
                  right: isRTL ? "-10px" : "-20px",
                  top: "0px",
                  bottom: "-10px",
                  width: "calc(100% + 24px)",
                }}
              >
                <Image
                  src="/about/whoWeAreArrow.svg"
                  alt=""
                  fill
                  className="object-contain object-left-bottom"
                  style={{
                    transform: isRTL ? "scaleX(-1)" : "none",
                  }}
                />
              </motion.div>
            </div>

            {/* Paragraphs */}
            <div className="space-y-6 text-[#0E4A68] font-['Poppins'] text-[15px] sm:text-[17px] leading-[1.8] max-w-[540px]">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {t.paragraph1}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {t.paragraph2}
              </motion.p>
            </div>
          </motion.div>

          {/* Right Column: Family & Guide photo */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -24 : 24, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-6 flex justify-center lg:justify-end"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full max-w-[540px] aspect-[1200/896] rounded-[15px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] cursor-pointer"
            >
              <Image
                src="/about/WhoWeAre.jpg"
                alt={t.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 540px"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default WhoWeAre;
