"use client";

import React from "react";
import { motion } from "framer-motion";
import { PrivateVipHeroBanner } from "../components/PrivateVipHeroBanner";
import { PrivateCategoryCard } from "../components/PrivateCategoryCard";

interface PrivateExcursionsHomeSectionProps {
  locale?: string;
}

export function PrivateExcursionsHomeSection({
  locale = "en",
}: PrivateExcursionsHomeSectionProps) {
  const topCategories = [
    {
      id: "historical",
      title: "Private Historical Trips",
      description:
        "Explore ancient landmarks, iconic monuments, and fascinating stories from the past.",
      imageSrc: "/homepage/privateSection/PrivateHistoricalTrips.png",
      href: `/${locale}/private-excursions?category=Historical`,
    },
    {
      id: "sea",
      title: "Private Sea Trips",
      description:
        "Discover crystal-clear waters, vibrant marine life, and breathtaking coastal scenery.",
      imageSrc: "/homepage/privateSection/PrivateSeaTrips.png",
      href: `/${locale}/private-excursions?category=Sea%20Trips`,
    },
    {
      id: "safari",
      title: "Private Super Safari Trips",
      description:
        "Enjoy thrilling off-road rides, exciting desert activities, and unforgettable safari experiences.",
      imageSrc: "/homepage/privateSection/PrivateSuperSafariTrips.png",
      href: `/${locale}/private-excursions?category=Adventure`,
    },
  ];

  const bottomCategories = [
    {
      id: "city",
      title: "Private City Trips",
      description:
        "Discover famous attractions, charming streets, and local culture at your own pace.",
      imageSrc: "/homepage/privateSection/PrivateCityTrips.png",
      href: `/${locale}/private-excursions?category=Historical`,
    },
    {
      id: "fun",
      title: "Private Fun Trips",
      description:
        "Explore golden dunes, stunning desert landscapes, and the peaceful beauty of nature.",
      imageSrc: "/homepage/privateSection/PrivateFunTrips.png",
      href: `/${locale}/private-excursions?category=FUN%20Trips`,
    },
  ];

  const allCategories = [...topCategories, ...bottomCategories];

  return (
    <section
      id="private-excursions"
      className="w-full bg-[#FFEFDA] py-10 sm:py-14 lg:py-20 xl:py-26 relative overflow-x-clip"
      aria-label="Private Excursions"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center mb-7 sm:mb-10 lg:mb-14 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2
          className="font-poppins font-semibold text-[26px] sm:text-[34px] lg:text-[42px] xl:text-[48px] text-center tracking-normal align-middle leading-[34px] sm:leading-[44px] lg:leading-[50px] xl:leading-[56px]"
        >
          <span className="text-[#003D5B]">Private</span>{" "}
          <span className="text-[#D48C28]">Excursions</span>
        </h2>
        <p className="font-poppins text-xs sm:text-sm lg:text-base xl:text-lg text-[#646464] mt-1.5 sm:mt-2.5 font-normal">
          Discover Privacy, Enjoy Exclusivity
        </p>
      </motion.div>

      {/* Main Section Content */}
      <div className="w-full">
        {/* ========================================================= */}
        {/* 1. MOBILE & TABLET VIEW (< lg): Matches PrivateMobile.png */}
        {/* Inset Banner Box + 5-Card Vertical Fluid Stack            */}
        {/* ========================================================= */}
        <div className="block lg:hidden w-full px-4 sm:px-6">
          <PrivateVipHeroBanner locale={locale} />

          <div className="mt-7 sm:mt-9 max-w-[580px] mx-auto flex flex-col space-y-4 sm:space-y-5">
            {allCategories.map((cat) => (
              <div key={cat.id} className="w-full pl-[46px] sm:pl-[66px]">
                <PrivateCategoryCard
                  title={cat.title}
                  description={cat.description}
                  imageSrc={cat.imageSrc}
                  href={cat.href}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. LAPTOP & DESKTOP VIEW (>= lg): PrivateDesktop.png       */}
        {/* Left-Bleed Banner + 3 Right Cards + 2 Wide Bottom Cards   */}
        {/* ========================================================= */}
        <div className="hidden lg:block w-full">
          {/* Top Row: VIP Banner Left + 3 Stacked Cards Right */}
          <div className="w-full max-w-[1650px] mx-auto px-6 lg:px-10 xl:px-14">
            <div className="flex flex-row items-stretch justify-between gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 w-full">
              {/* Left Column: VIP Banner (Starts at Left Edge of Screen) */}
              <div className="w-[45%] xl:w-[46%] 2xl:w-[47%] relative shrink-0">
                <PrivateVipHeroBanner locale={locale} />
              </div>

              {/* Right Column: 3 Stacked Category Cards */}
              <div className="flex-1 max-w-[760px] xl:max-w-[800px] pl-[60px] lg:pl-[75px] xl:pl-[90px] 2xl:pl-[100px] flex flex-col justify-between gap-4 lg:gap-5 xl:gap-6 z-10">
                {topCategories.map((cat) => (
                  <PrivateCategoryCard
                    key={cat.id}
                    title={cat.title}
                    description={cat.description}
                    imageSrc={cat.imageSrc}
                    href={cat.href}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row: 2 Wide Category Cards (City & Fun Trips) */}
          <div className="w-full max-w-[1650px] mx-auto px-6 lg:px-10 xl:px-14 mt-10 lg:mt-12 xl:mt-16">
            <div className="grid grid-cols-2 gap-x-8 lg:gap-x-12 xl:gap-x-14">
              {bottomCategories.map((cat) => (
                <div key={cat.id} className="w-full pl-[75px] lg:pl-[90px] xl:pl-[100px]">
                  <PrivateCategoryCard
                    title={cat.title}
                    description={cat.description}
                    imageSrc={cat.imageSrc}
                    href={cat.href}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PrivateExcursionsHomeSection;
