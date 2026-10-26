"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GroupExcursionCard } from "@/components/UserComp/GroupExcursions/components/GroupExcursionCard";
import { DUMMY_GROUP_EXCURSIONS } from "@/components/UserComp/GroupExcursions/data/dummyGroupExcursions";

interface GroupExcursionsHomeSectionProps {
  locale?: string;
}

export function GroupExcursionsHomeSection({
  locale = "en",
}: GroupExcursionsHomeSectionProps) {
  // Top 3 featured excursions matching PromptsUi/Group.png (Cairo, Aquarium, Luxor)
  const featuredExcursions = DUMMY_GROUP_EXCURSIONS.slice(0, 3);

  return (
    <section
      id="group-excursions"
      className="w-full bg-[#FFF4E5] py-14 sm:py-16 lg:py-20 relative overflow-hidden"
      aria-label="Group Excursions"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Matching Group.png */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="font-poppins text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-[#0E4A68]">
            Group <span className="text-[#DE7423]">Excursions</span>
          </h2>
          <p className="font-poppins text-sm sm:text-base text-[#646464] mt-2 font-normal">
            Group Adventures, Endless Joy
          </p>
        </motion.div>

        {/* 3 Featured Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 xl:gap-8 items-stretch"
        >
          {featuredExcursions.map((excursion) => (
            <div key={excursion.id} className="h-full">
              <GroupExcursionCard excursion={excursion} locale={locale} />
            </div>
          ))}
        </motion.div>

        {/* Center CTA Button: View All Trips */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <Link
            href={`/${locale}/group-excursions`}
            className="inline-flex items-center justify-center bg-[#165F84] hover:bg-[#0E4A68] active:scale-95 text-white font-poppins font-semibold text-sm sm:text-base py-3 px-10 rounded-[14px] shadow-[0px_4px_16px_rgba(0,0,0,0.2)] transition-all duration-200 cursor-pointer"
            style={{
              boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.2)",
            }}
          >
            View All Trips
          </Link>
        </div>
      </div>
    </section>
  );
}

export default GroupExcursionsHomeSection;
