"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { GroupExcursionDetail } from "../types";
import { useClientDictionary } from "@/shared/providers/ClientDictionaryContext";

interface GroupDetailsIncludesProps {
  detail: GroupExcursionDetail;
  locale?: string;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export function GroupDetailsIncludes({
  detail,
  locale = "en",
}: GroupDetailsIncludesProps) {
  const { priceIncludes, priceExcludes } = detail;
  const dict = useClientDictionary();
  const t = dict.groupExcursions.details.includes;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      transition={{ staggerChildren: 0.12 }}
      className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-7"
    >
      {/* 1. Price Includes Card */}
      <motion.div
        variants={cardVariants}
        className="w-full bg-[#FFFFFF] rounded-[12px] border-[0.8px] border-[#BBBBBB] p-4 sm:p-6 flex flex-col justify-start"
      >
        <div className="flex items-center gap-2.5 pb-3 sm:pb-4 border-b border-[#BBBBBB]/60 mb-4 sm:mb-5">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0E4A68] text-white shrink-0">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-poppins text-base sm:text-lg lg:text-xl font-bold text-[#0E4A68]">
            {t.priceIncludes}
          </h3>
        </div>

        <ul className="space-y-2.5 sm:space-y-3 font-poppins text-xs sm:text-sm text-[#000000] leading-relaxed">
          {priceIncludes.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <span className="font-bold text-[#0E4A68] mt-0.5 shrink-0">•</span>
              <span className="break-words">{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* 2. Price Excludes Card */}
      <motion.div
        variants={cardVariants}
        className="w-full bg-[#FFFFFF] rounded-[12px] border-[0.8px] border-[#BBBBBB] p-4 sm:p-6 flex flex-col justify-start"
      >
        <div className="flex items-center gap-2.5 pb-3 sm:pb-4 border-b border-[#BBBBBB]/60 mb-4 sm:mb-5">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E53E3E] text-white shrink-0">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="font-poppins text-base sm:text-lg lg:text-xl font-bold text-[#0E4A68]">
            {t.priceExcludes}
          </h3>
        </div>

        <div className="space-y-3 sm:space-y-3.5 font-poppins text-xs sm:text-sm text-[#000000] leading-relaxed">
          {/* Round trip transfer */}
          <div>
            <div className="font-bold text-[#000000] flex items-center gap-2">
              <span className="shrink-0">•</span>
              <span className="break-words">{t.roundTripTransfer}</span>
            </div>
            <ul className="pl-5 space-y-1 mt-1 text-[#333333]">
              {priceExcludes.roundTripTransfer.map((subItem, sIdx) => (
                <li key={sIdx} className="list-disc list-inside break-words">
                  {subItem}
                </li>
              ))}
            </ul>
          </div>

          {/* Entrance inside pyramids */}
          <div>
            <div className="font-bold text-[#000000] flex items-center gap-2">
              <span className="shrink-0">•</span>
              <span className="break-words">{t.entranceTickets}</span>
            </div>
            <ul className="pl-5 space-y-1 mt-1 text-[#333333]">
              {priceExcludes.entranceTickets.map((ticket, tIdx) => (
                <li key={tIdx} className="list-disc list-inside break-words">
                  {ticket}
                </li>
              ))}
            </ul>
          </div>

          {/* Other excluded items */}
          {priceExcludes.other.map((item, oIdx) => (
            <div key={oIdx} className="flex items-start gap-2.5">
              <span className="font-bold text-[#0E4A68] mt-0.5 shrink-0">•</span>
              <span className="break-words">{item}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default GroupDetailsIncludes;