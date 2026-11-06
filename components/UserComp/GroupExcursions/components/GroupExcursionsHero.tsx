"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useClientDictionary } from "@/shared/providers/ClientDictionaryContext";
import { ContentHeading } from "@/components/UserComp/Shared/ContentHeading";

interface GroupExcursionsHeroProps {
  locale?: string;
}

export function GroupExcursionsHero({ locale = "en" }: GroupExcursionsHeroProps) {
  const dict = useClientDictionary();
  const t = dict.groupExcursions;

  return (
    <section className="w-full pt-28 sm:pt-32 pb-8 sm:pb-12">
      <div className="mx-auto w-full max-w-[1340px] px-4 sm:px-6 lg:px-8">
        {/* Header Title & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-8 sm:mb-10"
        >
          <ContentHeading
            className="font-poppins font-semibold text-[32px] sm:text-[36px] md:text-[40px] text-center tracking-normal align-middle"
            style={{ lineHeight: "42px" }}
          >
            <span className="text-[#003D5B]">{t.titlePrefix}</span>{" "}
            <span className="text-[#D48C28]">{t.titleAccent}</span>
          </ContentHeading>
          <p className="font-poppins text-sm sm:text-base md:text-[18px] text-[#646464] mt-2 sm:mt-3 max-w-3xl mx-auto">
            {t.catalogHeroSubtitle}
          </p>
        </motion.div>

        {/* Hero Image Banner with border-radius: 15px */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          className="relative w-full aspect-[16/7.5] sm:aspect-[16/7] md:aspect-[1320/540] overflow-hidden rounded-[15px] shadow-sm"
        >
          <Image
            src="/GroupExcursions/herobg.png"
            alt="Group Excursions in Egypt"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1400px) 95vw, 1340px"
            className="object-cover object-center select-none"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default GroupExcursionsHero;
