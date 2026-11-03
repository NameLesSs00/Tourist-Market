"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getDictionary } from "@/shared/utils/getDictionary";

interface ContactMapSectionProps {
  locale?: string;
}

export function ContactMapSection({ locale = "en" }: ContactMapSectionProps) {
  const dict = getDictionary(locale);
  const t = dict.contact.map;

  return (
    <div
      className="w-full rounded-[20px] p-6 sm:p-8 lg:p-10 transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(14,74,104,0.12)]"
      style={{
        backgroundColor: "#FFFEF5",
        border: "0.5px solid #888888",
        boxShadow: "0px 1px 8px 2px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Header with Map Pin Icon */}
      <div className="flex items-center gap-3.5 mb-6 sm:mb-8">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
          transition={{ duration: 0.35 }}
          className="shrink-0 cursor-pointer"
        >
          <Image
            src="/contact/Vector (1).svg"
            alt="Map Pin"
            width={26}
            height={34}
            className="w-6 sm:w-7 h-auto object-contain"
          />
        </motion.div>
        <h2 className="font-['Poppins'] text-2xl sm:text-[28px] font-bold text-[#0E4A68] leading-tight">
          {t.title}
        </h2>
      </div>

      {/* Grid: Map on Left, Destination Beach Photo on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left Column: Hurghada / El Kawther Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-full h-[280px] sm:h-[340px] lg:h-[380px] rounded-[18px] overflow-hidden border border-[#D1D5DB] shadow-inner bg-[#E5E3DF] group"
        >
          <iframe
            title={t.mapAriaTitle}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56965.132896590214!2d33.77884218731175!3d27.20037136017845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145287e029199d79%3A0x6a053c8477ffdfc3!2sEl%20Kawther%2C%20Hurghada%2C%20Red%20Sea%20Governorate%2C%20Egypt!5e0!3m2!1sen!2seg!4v1710000000000!5m2!1sen!2seg"
            className="w-full h-full border-0 transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        {/* Right Column: Resort & Coastal Scenery Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="relative w-full h-[280px] sm:h-[340px] lg:h-[380px] rounded-[18px] overflow-hidden shadow-inner group cursor-pointer"
        >
          <Image
            src="/contact/92c63fb4ec109bf6958da7955414959b315fc292.jpg"
            alt={t.resortImageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default ContactMapSection;
