"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface HotelDeliveriesHeroProps {
  locale?: string;
}

export function HotelDeliveriesHero({ locale = "en" }: HotelDeliveriesHeroProps) {
  const isRTL = locale === "ar";
  const shouldReduceMotion = useReducedMotion();

  // Desktop linear transition: 10s duration, seamless infinite loop
  const desktopTransition = {
    duration: 10,
    ease: "linear" as const,
    repeat: Infinity,
    repeatType: "loop" as const,
  };

  // Mobile linear transition: 10s duration, seamless infinite loop
  const mobileTransition = {
    duration: 10,
    ease: "linear" as const,
    repeat: Infinity,
    repeatType: "loop" as const,
  };

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="relative w-full bg-[#0E2A47] text-white overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-0 lg:pb-0 font-poppins select-none min-h-[480px] lg:h-[540px] xl:h-[580px]"
    >
      <div className="relative mx-auto w-full max-w-[1440px] h-full px-6 sm:px-10 lg:px-16 flex flex-col lg:flex-row items-center justify-between">
        {/* ─── Hero Left Column: Headings & Description ─── */}
        <div className="w-full lg:w-[46%] xl:w-[44%] z-20 text-center lg:text-left pt-2 pb-6 lg:py-0">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-[38px] sm:text-[46px] md:text-[52px] lg:text-[54px] xl:text-[62px] font-bold leading-[1.08] tracking-tight text-white"
          >
            Your Stay, Elevated.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="mt-3 sm:mt-4 text-[18px] sm:text-[20px] lg:text-[22px] font-normal text-white"
          >
            Everything You Need, Delivered.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="mt-5 sm:mt-6 text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.65] text-white/90 max-w-[490px] mx-auto lg:mx-0 font-normal"
          >
            Enjoy a seamless stay with essential services delivered right to your
            hotel. From everyday conveniences to thoughtful extras, we take care of
            the details so you can focus on enjoying every moment of your
            vacation.
          </motion.p>
        </div>

        {/* ─── Desktop Hero (lg+): Exactly 3 visible diagonal image strips tilted at -25.12deg ─── */}
        <div className="hidden lg:flex absolute right-0 top-0 bottom-0 w-[56%] xl:w-[58%] items-center justify-end pointer-events-none z-10">
          <div
            className="relative flex items-center gap-3.5 xl:gap-5"
            style={{
              transform: "rotate(25.12deg)",
              transformOrigin: "center center",
              marginRight: "-30px",
            }}
          >
            {/* Strip 1 (Left): Moves DOWNWARD */}
            <div className="relative w-[190px] xl:w-[215px] 2xl:w-[235px] shrink-0">
              <motion.div
                className="flex flex-col w-full"
                animate={
                  shouldReduceMotion
                    ? { y: 0 }
                    : { y: ["-33.333333%", "0%"] }
                }
                transition={desktopTransition}
              >
                {[0, 1, 2].map((idx) => (
                  <div key={idx} className="relative w-full aspect-[666/3345] shrink-0">
                    <Image
                      src="/Hoteldeliveries/heroimg.png"
                      alt="Hotel deliveries preview"
                      fill
                      sizes="(max-width: 1440px) 215px, 235px"
                      priority={idx === 0}
                      className="object-cover"
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Strip 2 (Middle): Moves UPWARD */}
            <div className="relative w-[190px] xl:w-[215px] 2xl:w-[235px] shrink-0">
              <motion.div
                className="flex flex-col w-full"
                animate={
                  shouldReduceMotion
                    ? { y: 0 }
                    : { y: ["0%", "-33.333333%"] }
                }
                transition={desktopTransition}
              >
                {[0, 1, 2].map((idx) => (
                  <div key={idx} className="relative w-full aspect-[666/3345] shrink-0">
                    <Image
                      src="/Hoteldeliveries/heroimg.png"
                      alt="Hotel deliveries preview"
                      fill
                      sizes="(max-width: 1440px) 215px, 235px"
                      priority={idx === 0}
                      className="object-cover"
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Strip 3 (Right): Moves DOWNWARD */}
            <div className="relative w-[190px] xl:w-[215px] 2xl:w-[235px] shrink-0">
              <motion.div
                className="flex flex-col w-full"
                animate={
                  shouldReduceMotion
                    ? { y: 0 }
                    : { y: ["-33.333333%", "0%"] }
                }
                transition={desktopTransition}
              >
                {[0, 1, 2].map((idx) => (
                  <div key={idx} className="relative w-full aspect-[666/3345] shrink-0">
                    <Image
                      src="/Hoteldeliveries/heroimg.png"
                      alt="Hotel deliveries preview"
                      fill
                      sizes="(max-width: 1440px) 215px, 235px"
                      priority={idx === 0}
                      className="object-cover"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Mobile Hero (< lg): Exactly ONE horizontal animated strip below hero text (left to right) ─── */}
      <div className="block lg:hidden w-full overflow-hidden mt-6 pb-2 pointer-events-none z-10">
        <motion.div
          className="flex w-max"
          animate={
            shouldReduceMotion
              ? { x: 0 }
              : { x: ["-33.333333%", "0%"] }
          }
          transition={mobileTransition}
        >
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              className="relative w-[500px] sm:w-[680px] shrink-0 pr-3 sm:pr-4"
            >
              <div className="relative w-full aspect-[1080/130]">
                <Image
                  src="/Hoteldeliveries/responsive/Component 14.png"
                  alt="Hotel deliveries preview"
                  fill
                  sizes="(max-width: 640px) 500px, 680px"
                  priority={idx === 0}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default HotelDeliveriesHero;
