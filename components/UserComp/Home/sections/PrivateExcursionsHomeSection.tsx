"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { PrivateVipHeroBanner } from "../components/PrivateVipHeroBanner";
import { PrivateCategoryCard } from "../components/PrivateCategoryCard";
import {
  getTopPrivateCategories,
  getBottomPrivateCategories,
  getLocalizedPrivateCategories,
} from "../config/privateExcursionCategories";
import { useClientDictionary } from "@/shared/providers/ClientDictionaryContext";

interface PrivateExcursionsHomeSectionProps {
  locale?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

export function PrivateExcursionsHomeSection({
  locale = "en",
}: PrivateExcursionsHomeSectionProps) {
  const dict = useClientDictionary();
  const t = dict.privateExcursions;

  const topCategories = getTopPrivateCategories(locale).map((cat) => ({
    ...cat,
    href: `/${locale}/private-excursions?category=${cat.categoryId}`,
  }));

  const bottomCategories = getBottomPrivateCategories(locale).map((cat) => ({
    ...cat,
    href: `/${locale}/private-excursions?category=${cat.categoryId}`,
  }));

  const allCategories = getLocalizedPrivateCategories(locale).map((cat) => ({
    ...cat,
    href: `/${locale}/private-excursions?category=${cat.categoryId}`,
  }));

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
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center mb-7 sm:mb-10 lg:mb-14 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 className="font-poppins font-semibold text-[26px] sm:text-[34px] lg:text-[42px] xl:text-[48px] text-center tracking-normal align-middle leading-[34px] sm:leading-[44px] lg:leading-[50px] xl:leading-[56px]">
          <span className="text-[#003D5B]">{t.titlePrefix}</span>{" "}
          <span className="text-[#D48C28]">{t.titleAccent}</span>
        </h2>
        <p className="font-poppins text-xs sm:text-sm lg:text-base xl:text-lg text-[#646464] mt-1.5 sm:mt-2.5 font-normal">
          {t.subtitle}
        </p>
      </motion.div>

      {/* Main Section Content */}
      <div className="w-full">
        {/* 1. MOBILE & TABLET VIEW (< lg) */}
        <div className="block lg:hidden w-full px-4 sm:px-6">
          <PrivateVipHeroBanner locale={locale} />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="mt-7 sm:mt-9 max-w-[580px] mx-auto flex flex-col space-y-4 sm:space-y-5"
          >
            {allCategories.map((cat) => (
              <motion.div
                key={cat.id}
                variants={cardItemVariants}
                className="w-full pl-[46px] sm:pl-[66px]"
              >
                <PrivateCategoryCard
                  title={cat.title}
                  description={cat.description}
                  imageSrc={cat.imageSrc}
                  href={cat.href}
                  exploreText={t.explore}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 2. LAPTOP & DESKTOP VIEW (>= lg) */}
        <div className="hidden lg:block w-full">
          {/* Top Row: VIP Banner Left + 3 Stacked Cards Right */}
          <div className="w-full max-w-[1650px] mx-auto px-6 lg:px-10 xl:px-14">
            <div className="flex flex-row items-stretch justify-between gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 w-full">
              {/* Left Column: VIP Banner */}
              <div className="w-[45%] xl:w-[46%] 2xl:w-[47%] relative shrink-0">
                <PrivateVipHeroBanner locale={locale} />
              </div>

              {/* Right Column: 3 Stacked Category Cards with Staggered Entrance */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="flex-1 max-w-[760px] xl:max-w-[800px] pl-[60px] lg:pl-[75px] xl:pl-[90px] 2xl:pl-[100px] flex flex-col justify-between gap-4 lg:gap-5 xl:gap-6 z-10"
              >
                {topCategories.map((cat) => (
                  <motion.div key={cat.id} variants={cardItemVariants}>
                    <PrivateCategoryCard
                      title={cat.title}
                      description={cat.description}
                      imageSrc={cat.imageSrc}
                      href={cat.href}
                      exploreText={t.explore}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Bottom Row: 2 Wide Category Cards */}
          <div className="w-full max-w-[1650px] mx-auto px-6 lg:px-10 xl:px-14 mt-10 lg:mt-12 xl:mt-16">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-2 gap-x-8 lg:gap-x-12 xl:gap-x-14"
            >
              {bottomCategories.map((cat) => (
                <motion.div
                  key={cat.id}
                  variants={cardItemVariants}
                  className="w-full pl-[75px] lg:pl-[90px] xl:pl-[100px]"
                >
                  <PrivateCategoryCard
                    title={cat.title}
                    description={cat.description}
                    imageSrc={cat.imageSrc}
                    href={cat.href}
                    exploreText={t.explore}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PrivateExcursionsHomeSection;
