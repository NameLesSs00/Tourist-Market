"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getDictionary } from "@/shared/utils/getDictionary";

interface ContactInfoItem {
  id: string;
  title: string;
  icon: string;
  content: React.ReactNode;
}

interface ContactInfoCardsProps {
  locale?: string;
}

export function ContactInfoCards({ locale = "en" }: ContactInfoCardsProps) {
  const dict = getDictionary(locale);
  const t = dict.contact.cards;

  const infoItems: ContactInfoItem[] = [
    {
      id: "call-us",
      title: t.callUs,
      icon: "/contact/Frame 388.svg",
      content: (
        <a
          href={`tel:${t.phone.replace(/\s+/g, "")}`}
          className="font-['Poppins'] text-sm sm:text-base font-semibold text-[#0E4A68] hover:text-[#D48C28] transition-colors"
        >
          {t.phone}
        </a>
      ),
    },
    {
      id: "email-us",
      title: t.emailUs,
      icon: "/contact/Frame 388 (1).svg",
      content: (
        <a
          href={`mailto:${t.email}`}
          className="font-['Poppins'] text-sm sm:text-base font-semibold text-[#0E4A68] hover:text-[#D48C28] transition-colors break-all"
        >
          {t.email}
        </a>
      ),
    },
    {
      id: "visit-us",
      title: t.visitUs,
      icon: "/contact/Frame 387.svg",
      content: (
        <p className="font-['Poppins'] text-sm sm:text-base font-semibold text-[#0E4A68]">
          {t.address}
        </p>
      ),
    },
    {
      id: "working-hours",
      title: t.workingHours,
      icon: "/contact/Frame 387 (1).svg",
      content: (
        <div className="font-['Poppins'] text-sm sm:text-base font-semibold text-[#0E4A68] leading-snug">
          <p>{t.workingDays}</p>
          <p>{t.workingTime}</p>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4 sm:gap-5 w-full">
      {infoItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
          whileHover={{ y: -4, scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full rounded-[18px] p-5 sm:p-6 flex items-center gap-5 transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(14,74,104,0.14)] cursor-pointer select-none"
          style={{
            backgroundColor: "#FFFEF5",
            border: "0.5px solid #888888",
            boxShadow: "0px 1px 8px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* Circular SVG Icon with subtle hover wiggle */}
          <motion.div
            whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
            transition={{ duration: 0.4 }}
            className="shrink-0 w-[54px] sm:w-[60px] h-[54px] sm:h-[60px] relative"
          >
            <Image
              src={item.icon}
              alt={item.title}
              width={61}
              height={62}
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Details */}
          <div>
            <h3 className="font-['Poppins'] text-lg sm:text-[20px] font-bold text-[#0E4A68] leading-tight mb-1">
              {item.title}
            </h3>
            {item.content}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default ContactInfoCards;
