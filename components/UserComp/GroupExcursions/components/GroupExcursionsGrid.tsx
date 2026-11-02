"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { GroupExcursion } from "../types";
import { GroupExcursionCard } from "./GroupExcursionCard";
import { getDictionary } from "@/shared/utils/getDictionary";

interface GroupExcursionsGridProps {
  excursions: GroupExcursion[];
  isLoading?: boolean;
  locale?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

export function GroupExcursionsGrid({
  excursions,
  isLoading = false,
  locale = "en",
}: GroupExcursionsGridProps) {
  const dict = getDictionary(locale);
  const gridDict = dict.groupExcursions.grid;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 xl:gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-white rounded-[12px] border-[0.5px] border-[#888888] p-3 sm:p-3.5 space-y-3 w-full max-w-[390px] sm:max-w-none mx-auto"
          >
            <div className="w-full aspect-[370/220] bg-slate-200 rounded-[10px]" />
            <div className="h-4 bg-slate-200 rounded w-1/2" />
            <div className="h-5 bg-slate-200 rounded w-3/4" />
            <div className="space-y-1.5">
              <div className="h-3 bg-slate-200 rounded" />
              <div className="h-3 bg-slate-200 rounded w-5/6" />
            </div>
            <div className="h-4 bg-slate-200 rounded w-2/3" />
            <div className="h-10 bg-slate-200 rounded-[8px]" />
          </div>
        ))}
      </div>
    );
  }

  if (excursions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full py-16 text-center bg-white rounded-[18px] border-[0.5px] border-[#888888] shadow-sm"
      >
        <h3 className="font-poppins text-xl font-semibold text-[#0E4A68]">
          {gridDict.noExcursions}
        </h3>
        <p className="font-poppins text-sm text-[#646464] mt-2">
          {gridDict.noExcursionsDesc}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 xl:gap-8"
    >
      {excursions.map((excursion) => (
        <motion.div
          key={excursion.id}
          variants={cardItemVariants}
          className="w-full max-w-[390px] sm:max-w-none mx-auto h-full"
        >
          <GroupExcursionCard
            excursion={excursion}
            locale={locale}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default GroupExcursionsGrid;
