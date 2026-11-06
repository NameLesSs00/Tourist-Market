"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { GroupExcursionCard } from "@/components/UserComp/GroupExcursions/components/GroupExcursionCard";
import { useClientGroupExcursionsQuery } from "@/features/groupExcursions/useClientGroupExcursions";
import { mapBackendGroupExcursionToCard } from "@/components/UserComp/GroupExcursions/utils/groupExcursionAdapter";
import { useClientDictionary } from "@/shared/providers/ClientDictionaryContext";

interface GroupExcursionsHomeSectionProps {
  locale?: string;
}

const GRID_CLASS =
  "grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 xl:gap-8 items-stretch";

const GRID_ITEM_CLASS = "w-full max-w-[390px] md:max-w-none mx-auto h-full";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function GroupExcursionsHomeSection({
  locale = "en",
}: GroupExcursionsHomeSectionProps) {
  const dict = useClientDictionary();
  const t = dict.groupExcursions;

  // Fetch live group excursions from backend (Top 3)
  const { data, isLoading, isError, refetch } = useClientGroupExcursionsQuery(
    { page: 1, pageSize: 3 },
    locale
  );

  // Map real backend items only
  const excursions = useMemo(
    () => data?.items?.map((item) => mapBackendGroupExcursionToCard(item)) ?? [],
    [data]
  );

  return (
    <section
      id="group-excursions"
      className="w-full bg-[rgb(255,248,238)] py-14 sm:py-16 lg:py-20 relative overflow-hidden"
      aria-label="Group Excursions"
    >
      <div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with smooth scroll entrance */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2
            className="font-poppins font-semibold text-[32px] sm:text-[36px] lg:text-[40px] text-center tracking-normal align-middle"
            style={{ lineHeight: "42px" }}
          >
            <span className="text-[#003D5B]">{t.titlePrefix}</span>{" "}
            <span className="text-[#D48C28]">{t.titleAccent}</span>
          </h2>
          <p className="font-poppins text-sm sm:text-base text-[#646464] mt-2 font-normal">
            {t.subtitle}
          </p>
        </motion.div>

        {/* 1. Loading State: 3 Grid Skeletons */}
        {isLoading && (
          <div className={GRID_CLASS}>
            {[...Array(3)].map((_, i) => (
              <div key={i} className={GRID_ITEM_CLASS}>
                <div className="bg-white rounded-[12px] border-[0.5px] border-[#888888] overflow-hidden flex flex-col justify-between h-full min-h-[440px] sm:min-h-[490px] md:min-h-[440px] lg:min-h-[540px] animate-pulse">
                  <div className="w-full aspect-[16/10] lg:aspect-[390/248] bg-slate-200" />
                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="h-4 bg-slate-200 rounded w-1/3" />
                        <div className="h-4 bg-slate-200 rounded w-1/4" />
                      </div>
                      <div className="h-5 bg-slate-200 rounded w-3/4" />
                      <div className="h-3.5 bg-slate-200 rounded w-full" />
                      <div className="h-3.5 bg-slate-200 rounded w-5/6" />
                    </div>
                    <div className="space-y-3 pt-2">
                      <div className="h-4 bg-slate-200 rounded w-2/3" />
                      <div className="h-11 bg-slate-200 rounded-[12px] w-full" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. Error State */}
        {!isLoading && isError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl mx-auto my-6 p-8 sm:p-10 text-center bg-white rounded-[18px] border-[0.5px] border-[#888888] shadow-sm"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#165F84]/10 flex items-center justify-center text-[#165F84]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h3 className="font-poppins text-xl sm:text-2xl font-semibold text-[#0E4A68]">
              {t.error.title}
            </h3>
            <p className="font-poppins text-sm sm:text-base text-[#646464] mt-2 mb-6 max-w-md mx-auto">
              {t.error.description}
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="inline-flex items-center justify-center bg-[#165F84] hover:bg-[#0E4A68] active:scale-95 text-white font-poppins font-semibold text-sm sm:text-base py-2.5 px-8 rounded-[12px] shadow-sm transition-all duration-200 cursor-pointer"
            >
              {t.error.retry}
            </button>
          </motion.div>
        )}

        {/* 3. Empty State */}
        {!isLoading && !isError && excursions.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl mx-auto my-6 p-8 sm:p-10 text-center bg-white rounded-[18px] border-[0.5px] border-[#D48C28]/40 shadow-sm"
          >
            <h3 className="font-poppins text-xl sm:text-2xl font-semibold text-[#0E4A68]">
              {t.empty.title}
            </h3>
            <p className="font-poppins text-sm sm:text-base text-[#646464] mt-2 mb-6 max-w-md mx-auto">
              {t.empty.description}
            </p>
            <Link
              href={`/${locale}/private-excursions`}
              className="inline-flex items-center justify-center bg-[#D48C28] hover:bg-[#b8761f] active:scale-95 text-white font-poppins font-medium text-sm sm:text-base py-2.5 px-8 rounded-[12px] shadow-sm transition-all duration-200 cursor-pointer"
            >
              {t.empty.action}
            </Link>
          </motion.div>
        )}

        {/* 4. Success State: Live Excursions Grid with Staggered Entrance */}
        {!isLoading && !isError && excursions.length > 0 && (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              className={GRID_CLASS}
            >
              {excursions.map((excursion) => (
                <motion.div
                  key={excursion.id}
                  variants={cardItemVariants}
                  className={GRID_ITEM_CLASS}
                >
                  <GroupExcursionCard excursion={excursion} locale={locale} dict={dict} />
                </motion.div>
              ))}
            </motion.div>

            {/* Center CTA Button with Smooth Hover & Tap Animation */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
              className="mt-10 sm:mt-12 flex justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={`/${locale}/group-excursions`}
                  className="inline-flex items-center justify-center bg-[#165F84] hover:bg-[#0E4A68] text-white font-poppins font-semibold text-sm sm:text-base py-3 px-10 rounded-[14px] shadow-[0px_4px_16px_rgba(0,0,0,0.2)] transition-colors cursor-pointer"
                  style={{
                    boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  {t.viewAll}
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}

export default GroupExcursionsHomeSection;
