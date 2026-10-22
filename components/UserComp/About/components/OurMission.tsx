"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface OurMissionProps {
  locale?: string;
}

export function OurMission({ locale = "en" }: OurMissionProps) {
  const isRTL = locale === "ar";

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="relative w-full py-14 sm:py-18 lg:py-20 bg-[#FFF4E5]"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading with flourish & Mission Text matching who we are.png */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            {/* Heading with flourish matching who we are.png */}
            <div className="relative inline-block mb-6 sm:mb-8 pr-6">
              <h2 className="font-['Poppins'] text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[#0E4A68] leading-tight">
                Our Mission
              </h2>
              {/* Loop flourish wrapper matching who we are.png */}
              <div
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
              </div>
            </div>

            {/* Mission Statement matching who we are.png exactly */}
            <p className="text-[#0E4A68] font-['Poppins'] text-[15px] sm:text-[17px] leading-[1.8] max-w-[540px]">
              To make travel simple, safe and unforgettable by connecting people with
              the world&apos;s most beautiful places and unique experiences. We aim to
              inspire, support and create lasting memories for every traveler.
            </p>
          </motion.div>

          {/* Right Column: Mission Image with border-radius: 15px */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-6 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[540px] aspect-[16/10] sm:aspect-[16/9.5] rounded-[15px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
              <Image
                src="/about/OurMission.jpg"
                alt="Traveler standing on cliff overlooking coastal town at sunset"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 540px"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default OurMission;
