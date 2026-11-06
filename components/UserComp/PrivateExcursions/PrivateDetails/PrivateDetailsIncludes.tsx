"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useClientDictionary } from "@/shared/providers/ClientDictionaryContext";

interface PrivateDetailsIncludesProps {
  includes?: string[];
  excludes?: string[];
  locale?: string;
}

export function PrivateDetailsIncludes({
  includes,
  excludes,
  locale = "en",
}: PrivateDetailsIncludesProps) {
  const dict = useClientDictionary();
  const t = dict.privateExcursions.details.includes;

  const fallbackIncludes = ((t as any).defaultIncludes as string[]) || [];
  const fallbackExcludes = ((t as any).defaultExcludes as string[]) || [];

  const displayIncludes = includes && includes.length > 0 ? includes : fallbackIncludes;
  const displayExcludes = excludes && excludes.length > 0 ? excludes : fallbackExcludes;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch font-poppins">
      {/* ─── PRICE INCLUDES CARD ─── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full bg-white rounded-2xl p-6 sm:p-7 flex flex-col"
        style={{
          border: "0.8px solid #BBBBBB",
          boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-[#E5E5E5]">
          <div className="relative w-6 h-6 shrink-0">
            <Image
              src="/PrivateExcursions/Privatedetails/Vector.svg"
              alt="Included checkmark"
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-[20px] sm:text-[22px] font-bold text-[#DE7423]">
            {t.priceIncludes || "Price Includes"}
          </h3>
        </div>

        {/* Bullets List */}
        <ul className="mt-5 space-y-3.5 flex-1">
          {displayIncludes.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-[14px] sm:text-[15px] text-[#000000] leading-[1.6]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-2" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* ─── PRICE EXCLUDES CARD ─── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        className="w-full bg-white rounded-2xl p-6 sm:p-7 flex flex-col"
        style={{
          border: "0.8px solid #BBBBBB",
          boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-[#E5E5E5]">
          <div className="relative w-6 h-6 shrink-0">
            <Image
              src="/PrivateExcursions/Privatedetails/Vector (1).svg"
              alt="Excluded cross icon"
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-[20px] sm:text-[22px] font-bold text-[#DE7423]">
            {t.priceExcludes || "Price Excludes"}
          </h3>
        </div>

        {/* Bullets List */}
        <ul className="mt-5 space-y-3.5 flex-1">
          {displayExcludes.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-[14px] sm:text-[15px] text-[#000000] leading-[1.6]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-2" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default PrivateDetailsIncludes;
