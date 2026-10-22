"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ServiceCardItem {
  id: string;
  title: string;
  description: string;
}

const LEFT_SERVICES: ServiceCardItem[] = [
  {
    id: "hotel-deliveries",
    title: "Hotel Deliveries",
    description: "Comfortable stays, anywhere you go.",
  },
  {
    id: "tourist-services",
    title: "Tourist Services",
    description: "Guided tours & local experiences.",
  },
  {
    id: "red-sea-real-estate",
    title: "Red Sea Real Estate",
    description: "Invest in a lifestyle by the sea.",
  },
];

const RIGHT_SERVICES: ServiceCardItem[] = [
  {
    id: "car-rental",
    title: "Car Rental",
    description: "Freedom to explore at your own pace.",
  },
  {
    id: "vip-services",
    title: "VIP Services",
    description: "Hurghada Airport & private transfers.",
  },
  {
    id: "transfer-services",
    title: "Transfer Services",
    description: "Reliable rides, from airport to destination",
  },
];

interface OurServicesProps {
  locale?: string;
}

export function OurServices({ locale = "en" }: OurServicesProps) {
  const isRTL = locale === "ar";

  // Reusable card renderer matching exact Figma specifications:
  // bg: transparent #FFFFFF00; border: 1.5px solid #D48C28; box-shadow: 0px 2px 15px 1px #00000040; border-radius: 15px
  const renderCard = (
    service: ServiceCardItem,
    index: number,
    desktopOffsetClass: string = ""
  ) => (
    <motion.div
      key={service.id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      style={{
        backgroundColor: "transparent",
        border: "1.5px solid #D48C28",
        borderRadius: "15px",
        boxShadow: "0px 2px 15px 1px rgba(0, 0, 0, 0.25)",
      }}
      className={`w-full max-w-[420px] p-6 sm:p-7 transition-all duration-2800 hover:scale-[1.02] hover:shadow-[0_6px_22px_rgba(212,140,40,0.3)] ${desktopOffsetClass}`}
    >
      <h3 className="font-['Poppins'] text-[19px] sm:text-[21px] font-bold text-[#0E4A68] leading-snug">
        {service.title}
      </h3>
      <p className="mt-2 font-['Poppins'] text-[13.5px] sm:text-[14.5px] text-[#0E4A68] leading-relaxed">
        {service.description}
      </p>
    </motion.div>
  );

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="relative w-full py-16 sm:py-20 lg:py-28 bg-[#FFF4E5] overflow-hidden"
    >
      {/* Scoped CSS Fallback for 2800ms linear concentric circle rotation */}
      <style>{`
        @keyframes spinCW2800 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinCCW2800 {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-circle-cw-2800 {
          animation: spinCW2800 2800ms linear infinite;
          transform-origin: center center;
        }
        .animate-circle-ccw-2800 {
          animation: spinCCW2800 2800ms linear infinite;
          transform-origin: center center;
        }
      `}</style>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-12">
        {/* Section Header with Right-Loop Flourish matching Frame 577.png */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-18 lg:mb-20">
          <div className="relative inline-block pr-6 pb-2">
            <h2 className="font-['Poppins'] text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-[#0E4A68]">
              Our Services
            </h2>
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
        </div>

        {/* ─── DESKTOP VIEW (lg / xl): Hexagonal Radial Wrap Around Concentric Rings ─── */}
        <div className="hidden lg:grid grid-cols-12 items-center gap-4 xl:gap-8 min-h-[580px]">
          {/* Left 3 Cards: Curved around the circle (Top/Bottom indented inwards, Middle pushed out) */}
          <div className="col-span-4 flex flex-col justify-between h-full gap-8 py-2">
            {/* Top-Left: Hotel Deliveries - indented towards circle */}
            <div className="flex justify-end">
              {renderCard(
                LEFT_SERVICES[0],
                0,
                isRTL
                  ? "lg:-translate-x-12 xl:-translate-x-16"
                  : "lg:translate-x-12 xl:translate-x-16"
              )}
            </div>

            {/* Middle-Left: Tourist Services - pushed to outer left edge */}
            <div className="flex justify-start">
              {renderCard(LEFT_SERVICES[1], 1, "lg:translate-x-0")}
            </div>

            {/* Bottom-Left: Red Sea Real Estate - indented towards circle */}
            <div className="flex justify-end">
              {renderCard(
                LEFT_SERVICES[2],
                2,
                isRTL
                  ? "lg:-translate-x-12 xl:-translate-x-16"
                  : "lg:translate-x-12 xl:translate-x-16"
              )}
            </div>
          </div>

          {/* Center Column: Dual Concentric Rings (Both 2800ms speed, same gradient, opposite directions, transparent bg) */}
          <div className="col-span-4 flex justify-center items-center py-4">
            <div className="relative w-[340px] h-[340px] xl:w-[370px] xl:h-[370px] flex items-center justify-center">
              {/* Outer Ring: 10px gradient, spinning Clockwise at 2800ms */}
              <svg
                viewBox="0 0 380 380"
                className="absolute inset-0 w-full h-full animate-circle-cw-2800 pointer-events-none select-none"
              >
                <defs>
                  {/* Outer Gradient: Gold at top, White middle, Blue bottom (180deg) */}
                  <linearGradient
                    id="outerCircleGrad"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="39.9%" stopColor="#D48C28" />
                    <stop offset="54.33%" stopColor="#FFFFFF" />
                    <stop offset="56.73%" stopColor="#FFFFFF" />
                    <stop offset="74.04%" stopColor="#0E597F" />
                  </linearGradient>
                </defs>
                <circle
                  cx="190"
                  cy="190"
                  r="178"
                  fill="none"
                  stroke="url(#outerCircleGrad)"
                  strokeWidth="10"
                />
              </svg>

              {/* Inner Ring: Inset concentric circle with same gradient facing in OPPOSITE direction (0deg), spinning Counter-Clockwise at 2800ms */}
              <svg
                viewBox="0 0 380 380"
                className="absolute inset-0 w-full h-full animate-circle-ccw-2800 pointer-events-none select-none"
              >
                <defs>
                  {/* Inner Gradient: Blue at top, White middle, Gold at bottom (0deg - opposite direction) */}
                  <linearGradient
                    id="innerCircleGrad"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                  >
                    <stop offset="39.9%" stopColor="#D48C28" />
                    <stop offset="54.33%" stopColor="#FFFFFF" />
                    <stop offset="56.73%" stopColor="#FFFFFF" />
                    <stop offset="74.04%" stopColor="#0E597F" />
                  </linearGradient>
                </defs>
                <circle
                  cx="190"
                  cy="190"
                  r="132"
                  fill="none"
                  stroke="url(#innerCircleGrad)"
                  strokeWidth="8"
                />
              </svg>

              {/* Center Text: Transparent background showing section peach color, text in #0E4A68 */}
              <div className="relative z-10 w-[210px] h-[210px] xl:w-[230px] xl:h-[230px] rounded-full bg-transparent flex items-center justify-center p-6 text-center select-none pointer-events-none">
                <span className="font-['Poppins'] text-[24px] xl:text-[28px] font-bold text-[#0E4A68] leading-tight">
                  What we serve
                </span>
              </div>
            </div>
          </div>

          {/* Right 3 Cards: Curved around the circle (Top/Bottom indented inwards, Middle pushed out) */}
          <div className="col-span-4 flex flex-col justify-between h-full gap-8 py-2">
            {/* Top-Right: Car Rental - indented towards circle */}
            <div className="flex justify-start">
              {renderCard(
                RIGHT_SERVICES[0],
                3,
                isRTL
                  ? "lg:translate-x-12 xl:translate-x-16"
                  : "lg:-translate-x-12 xl:-translate-x-16"
              )}
            </div>

            {/* Middle-Right: VIP Services - pushed to outer right edge */}
            <div className="flex justify-end">
              {renderCard(RIGHT_SERVICES[1], 4, "lg:translate-x-0")}
            </div>

            {/* Bottom-Right: Transfer Services - indented towards circle */}
            <div className="flex justify-start">
              {renderCard(
                RIGHT_SERVICES[2],
                5,
                isRTL
                  ? "lg:translate-x-12 xl:translate-x-16"
                  : "lg:-translate-x-12 xl:-translate-x-16"
              )}
            </div>
          </div>
        </div>

        {/* ─── TABLET VIEW (md to lg): Center Badge + 2-Column Responsive Grid ─── */}
        <div className="hidden md:flex lg:hidden flex-col items-center gap-10">
          {/* Central Animated Badge */}
          <div className="relative w-[280px] h-[280px] flex items-center justify-center">
            {/* Outer Ring */}
            <svg
              viewBox="0 0 380 380"
              className="absolute inset-0 w-full h-full animate-circle-cw-2800 pointer-events-none select-none"
            >
              <defs>
                <linearGradient id="outerCircleGradTab" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="39.9%" stopColor="#D48C28" />
                  <stop offset="54.33%" stopColor="#FFFFFF" />
                  <stop offset="56.73%" stopColor="#FFFFFF" />
                  <stop offset="74.04%" stopColor="#0E597F" />
                </linearGradient>
              </defs>
              <circle
                cx="190"
                cy="190"
                r="178"
                fill="none"
                stroke="url(#outerCircleGradTab)"
                strokeWidth="10"
              />
            </svg>
            {/* Inner Ring */}
            <svg
              viewBox="0 0 380 380"
              className="absolute inset-0 w-full h-full animate-circle-ccw-2800 pointer-events-none select-none"
            >
              <defs>
                <linearGradient id="innerCircleGradTab" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="39.9%" stopColor="#D48C28" />
                  <stop offset="54.33%" stopColor="#FFFFFF" />
                  <stop offset="56.73%" stopColor="#FFFFFF" />
                  <stop offset="74.04%" stopColor="#0E597F" />
                </linearGradient>
              </defs>
              <circle
                cx="190"
                cy="190"
                r="132"
                fill="none"
                stroke="url(#innerCircleGradTab)"
                strokeWidth="8"
              />
            </svg>
            {/* Center Text */}
            <div className="relative z-10 w-[180px] h-[180px] rounded-full bg-transparent flex items-center justify-center p-4 text-center select-none">
              <span className="font-['Poppins'] text-[22px] font-bold text-[#0E4A68] leading-tight">
                What we serve
              </span>
            </div>
          </div>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-2 gap-6 w-full max-w-[760px]">
            {renderCard(LEFT_SERVICES[0], 0)}
            {renderCard(RIGHT_SERVICES[0], 3)}
            {renderCard(LEFT_SERVICES[1], 1)}
            {renderCard(RIGHT_SERVICES[1], 4)}
            {renderCard(LEFT_SERVICES[2], 2)}
            {renderCard(RIGHT_SERVICES[2], 5)}
          </div>
        </div>

        {/* ─── MOBILE VIEW (< md): Center Badge + Single-Column Responsive Flow ─── */}
        <div className="flex flex-col items-center gap-8 md:hidden">
          {/* Scaled Center Badge */}
          <div className="relative w-[230px] h-[230px] flex items-center justify-center">
            {/* Outer Ring */}
            <svg
              viewBox="0 0 380 380"
              className="absolute inset-0 w-full h-full animate-circle-cw-2800 pointer-events-none select-none"
            >
              <defs>
                <linearGradient id="outerCircleGradMob" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="39.9%" stopColor="#D48C28" />
                  <stop offset="54.33%" stopColor="#FFFFFF" />
                  <stop offset="56.73%" stopColor="#FFFFFF" />
                  <stop offset="74.04%" stopColor="#0E597F" />
                </linearGradient>
              </defs>
              <circle
                cx="190"
                cy="190"
                r="178"
                fill="none"
                stroke="url(#outerCircleGradMob)"
                strokeWidth="10"
              />
            </svg>
            {/* Inner Ring */}
            <svg
              viewBox="0 0 380 380"
              className="absolute inset-0 w-full h-full animate-circle-ccw-2800 pointer-events-none select-none"
            >
              <defs>
                <linearGradient id="innerCircleGradMob" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="39.9%" stopColor="#D48C28" />
                  <stop offset="54.33%" stopColor="#FFFFFF" />
                  <stop offset="56.73%" stopColor="#FFFFFF" />
                  <stop offset="74.04%" stopColor="#0E597F" />
                </linearGradient>
              </defs>
              <circle
                cx="190"
                cy="190"
                r="132"
                fill="none"
                stroke="url(#innerCircleGradMob)"
                strokeWidth="8"
              />
            </svg>
            {/* Center Text */}
            <div className="relative z-10 w-[150px] h-[150px] rounded-full bg-transparent flex items-center justify-center p-3 text-center select-none">
              <span className="font-['Poppins'] text-xl font-bold text-[#0E4A68] leading-tight">
                What we serve
              </span>
            </div>
          </div>

          {/* Stacked Cards */}
          <div className="flex flex-col gap-4 w-full max-w-[420px]">
            {[...LEFT_SERVICES, ...RIGHT_SERVICES].map((s, i) =>
              renderCard(s, i)
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurServices;
