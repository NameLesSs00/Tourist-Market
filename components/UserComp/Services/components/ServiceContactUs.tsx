"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaViber, FaTelegramPlane } from "react-icons/fa";
import { getDictionary } from "@/shared/utils/getDictionary";

interface ServiceContactUsProps {
  locale?: string;
}

export function ServiceContactUs({ locale = "en" }: ServiceContactUsProps) {
  const dict = getDictionary(locale);
  const t = dict.serviceDetail;

  return (
    <div className="w-full max-w-[960px] mx-auto my-8 sm:my-10 font-poppins">
      <div
        style={{
          backgroundColor: "#F5F7F8",
          borderRadius: "8px",
          border: "0.5px solid #E2D7CB",
        }}
        className="py-6 sm:py-8 px-4 sm:px-10 flex flex-col items-center justify-center text-center gap-4 sm:gap-5"
      >
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0E4A68]">
          {t.contactUs}
        </h3>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 w-full max-w-lg mx-auto">
          {/* WhatsApp */}
          <motion.a
            href="https://wa.me/201289494715"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              backgroundColor: "#17DB55",
              borderRadius: "5px",
            }}
            className="inline-flex items-center justify-center gap-2 py-2.5 px-5 text-white font-semibold text-xs sm:text-sm transition-colors duration-200 hover:brightness-105 shadow-sm"
          >
            <FaWhatsapp className="w-4 h-4 shrink-0" />
            <span>WhatsApp</span>
          </motion.a>

          {/* Viber */}
          <motion.a
            href="viber://chat?number=%2B201289494715"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              backgroundColor: "#59569D",
              borderRadius: "5px",
            }}
            className="inline-flex items-center justify-center gap-2 py-2.5 px-5 text-white font-semibold text-xs sm:text-sm transition-colors duration-200 hover:brightness-105 shadow-sm"
          >
            <FaViber className="w-4 h-4 shrink-0" />
            <span>Viber</span>
          </motion.a>

          {/* Telegram */}
          <motion.a
            href="https://t.me/+201289494715"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              backgroundColor: "#2FA2D6",
              borderRadius: "5px",
            }}
            className="inline-flex items-center justify-center gap-2 py-2.5 px-5 text-white font-semibold text-xs sm:text-sm transition-colors duration-200 hover:brightness-105 shadow-sm"
          >
            <FaTelegramPlane className="w-4 h-4 shrink-0" />
            <span>Telegram</span>
          </motion.a>
        </div>

        {/* Working Hours & Phone Info */}
        <p className="text-xs sm:text-sm font-medium text-[#646464] mt-1">
          {t.workingHours}
        </p>
      </div>
    </div>
  );
}

export default ServiceContactUs;
