"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { GroupExcursion } from "../types";
import { GroupExcursionCard } from "../components/GroupExcursionCard";
import { getDictionary } from "@/shared/utils/getDictionary";

interface GroupDetailsRelatedProps {
  relatedTrips: GroupExcursion[];
  currentId?: string;
  currentSlug?: string;
  locale?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export function GroupDetailsRelated({
  relatedTrips = [],
  currentId,
  currentSlug,
  locale = "en",
}: GroupDetailsRelatedProps) {
  const dict = getDictionary(locale);
  const t = dict.groupExcursions.details.related;

  const displayTrips = (relatedTrips || [])
    .filter(
      (trip) =>
        (!currentId || (trip.id !== currentId && trip.slug !== currentId)) &&
        (!currentSlug || (trip.slug !== currentSlug && trip.id !== currentSlug))
    )
    .slice(0, 3);

  if (displayTrips.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="w-full pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 lg:pb-24 font-poppins"
    >
      {/* Title */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0E4A68] tracking-tight uppercase">
          {t.title}
        </h2>
      </div>

      {/* 3 Related Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7"
      >
        {displayTrips.map((trip, idx) => {
          const isThirdOnSemiSmall = idx === 2;
          return (
            <motion.div
              key={trip.id}
              variants={cardItemVariants}
              className={`w-full max-w-[360px] mx-auto h-full ${
                isThirdOnSemiSmall
                  ? "sm:col-span-2 sm:w-[calc(50%-0.75rem)] sm:max-w-none sm:mx-auto lg:col-span-1 lg:w-full"
                  : "sm:max-w-none"
              }`}
            >
              <GroupExcursionCard excursion={trip} locale={locale} />
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}

export default GroupDetailsRelated;
