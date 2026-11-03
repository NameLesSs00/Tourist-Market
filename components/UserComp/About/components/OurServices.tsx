"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getDictionary } from "@/shared/utils/getDictionary";
import { ConcentricRings } from "./ConcentricRings";

interface ServiceCardItem {
  id: string;
  title: string;
  description: string;
}

interface OurServicesProps {
  locale?: string;
}

export function OurServices({ locale = "en" }: OurServicesProps) {
  const isRTL = locale === "ar";
  const dict = getDictionary(locale);
  const t = dict.about.ourServices;

  const leftServices: ServiceCardItem[] = useMemo(
    () => [
      {
        id: "hotel-deliveries",
        title: t.hotelDeliveries.title,
        description: t.hotelDeliveries.description,
      },
      {
        id: "tourist-services",
        title: t.touristServices.title,
        description: t.touristServices.description,
      },
      {
        id: "red-sea-real-estate",
        title: t.redSeaRealEstate.title,
        description: t.redSeaRealEstate.description,
      },
    ],
    [t]
  );

  const rightServices: ServiceCardItem[] = useMemo(
    () => [
      {
        id: "car-rental",
        title: t.carRental.title,
        description: t.carRental.description,
      },
      {
        id: "vip-services",
        title: t.vipServices.title,
        description: t.vipServices.description,
      },
      {
        id: "transfer-services",
        title: t.transferServices.title,
        description: t.transferServices.description,
      },
    ],
    [t]
  );

  const renderCard = (
    service: ServiceCardItem,
    index: number,
    desktopOffsetClass: string = ""
  ) => (
    <motion.div
      key={service.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      style={{
        backgroundColor: "transparent",
        border: "1.5px solid #D48C28",
        borderRadius: "15px",
        boxShadow: "0px 2px 15px 1px rgba(0, 0, 0, 0.25)",
      }}
      className={`w-full max-w-[420px] p-6 sm:p-7 transition-shadow duration-300 hover:shadow-[0_8px_25px_rgba(212,140,40,0.3)] cursor-pointer select-none ${desktopOffsetClass}`}
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
        {/* Section Header with Right-Loop Flourish */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-18 lg:mb-20">
          <div className="relative inline-block pr-6 pb-2">
            <h2 className="font-['Poppins'] text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-[#0E4A68]">
              {t.title}
            </h2>
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
                style={{ transform: isRTL ? "scaleX(-1)" : "none" }}
              />
            </motion.div>
          </div>
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden lg:grid grid-cols-12 items-center gap-4 xl:gap-8 min-h-[580px]">
          {/* Left 3 Cards */}
          <div className="col-span-4 flex flex-col justify-between h-full gap-8 py-2">
            <div className="flex justify-end">
              {renderCard(
                leftServices[0],
                0,
                isRTL
                  ? "lg:-translate-x-12 xl:-translate-x-16"
                  : "lg:translate-x-12 xl:translate-x-16"
              )}
            </div>
            <div className="flex justify-start">
              {renderCard(leftServices[1], 1, "lg:translate-x-0")}
            </div>
            <div className="flex justify-end">
              {renderCard(
                leftServices[2],
                2,
                isRTL
                  ? "lg:-translate-x-12 xl:-translate-x-16"
                  : "lg:translate-x-12 xl:translate-x-16"
              )}
            </div>
          </div>

          {/* Center Column: Dual Concentric Rings */}
          <div className="col-span-4 flex justify-center items-center py-4">
            <ConcentricRings
              size="desktop"
              text={t.badgeText}
              gradientPrefix="aboutDesk"
            />
          </div>

          {/* Right 3 Cards */}
          <div className="col-span-4 flex flex-col justify-between h-full gap-8 py-2">
            <div className="flex justify-start">
              {renderCard(
                rightServices[0],
                3,
                isRTL
                  ? "lg:translate-x-12 xl:translate-x-16"
                  : "lg:-translate-x-12 xl:-translate-x-16"
              )}
            </div>
            <div className="flex justify-end">
              {renderCard(rightServices[1], 4, "lg:translate-x-0")}
            </div>
            <div className="flex justify-start">
              {renderCard(
                rightServices[2],
                5,
                isRTL
                  ? "lg:translate-x-12 xl:translate-x-16"
                  : "lg:-translate-x-12 xl:-translate-x-16"
              )}
            </div>
          </div>
        </div>

        {/* TABLET VIEW */}
        <div className="hidden md:flex lg:hidden flex-col items-center gap-10">
          <ConcentricRings
            size="tablet"
            text={t.badgeText}
            gradientPrefix="aboutTab"
          />
          <div className="grid grid-cols-2 gap-6 w-full max-w-[760px]">
            {renderCard(leftServices[0], 0)}
            {renderCard(rightServices[0], 3)}
            {renderCard(leftServices[1], 1)}
            {renderCard(rightServices[1], 4)}
            {renderCard(leftServices[2], 2)}
            {renderCard(rightServices[2], 5)}
          </div>
        </div>

        {/* MOBILE VIEW */}
        <div className="flex flex-col items-center gap-8 md:hidden">
          <ConcentricRings
            size="mobile"
            text={t.badgeText}
            gradientPrefix="aboutMob"
          />
          <div className="flex flex-col gap-4 w-full max-w-[420px]">
            {[...leftServices, ...rightServices].map((s, i) =>
              renderCard(s, i)
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurServices;
