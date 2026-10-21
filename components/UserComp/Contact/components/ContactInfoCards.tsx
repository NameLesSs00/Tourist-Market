"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ContactInfoItem {
  id: string;
  title: string;
  icon: string;
  content: React.ReactNode;
}

export function ContactInfoCards() {
  const infoItems: ContactInfoItem[] = [
    {
      id: "call-us",
      title: "Call Us",
      icon: "/contact/Frame 388.svg",
      content: (
        <a
          href="tel:+201234567890"
          className="font-['Poppins'] text-sm sm:text-base font-semibold text-[#0E4A68] hover:text-[#D48C28] transition-colors"
        >
          +20 123 456 7890
        </a>
      ),
    },
    {
      id: "email-us",
      title: "Email Us",
      icon: "/contact/Frame 388 (1).svg",
      content: (
        <a
          href="mailto:info@etouristmarket.com"
          className="font-['Poppins'] text-sm sm:text-base font-semibold text-[#0E4A68] hover:text-[#D48C28] transition-colors break-all"
        >
          info@etouristmarket .com
        </a>
      ),
    },
    {
      id: "visit-us",
      title: "Visit Us",
      icon: "/contact/Frame 387.svg",
      content: (
        <p className="font-['Poppins'] text-sm sm:text-base font-semibold text-[#0E4A68]">
          El Kawther , Hurghada, Egypt
        </p>
      ),
    },
    {
      id: "working-hours",
      title: "Working Hours",
      icon: "/contact/Frame 387 (1).svg",
      content: (
        <div className="font-['Poppins'] text-sm sm:text-base font-semibold text-[#0E4A68] leading-snug">
          <p>Sat – Tues</p>
          <p>9:00 AM – 10:00 PM</p>
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
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
          className="w-full rounded-[18px] p-5 sm:p-6 flex items-center gap-5 transition-transform hover:-translate-y-0.5 duration-200"
          style={{
            backgroundColor: "#FFFEF5",
            border: "0.5px solid #888888",
            boxShadow: "0px 1px 8px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* Circular SVG Icon */}
          <div className="shrink-0 w-[54px] sm:w-[60px] h-[54px] sm:h-[60px] relative">
            <Image
              src={item.icon}
              alt={item.title}
              width={61}
              height={62}
              className="w-full h-full object-contain"
            />
          </div>

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
