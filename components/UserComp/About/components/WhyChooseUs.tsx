"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getDictionary } from "@/shared/utils/getDictionary";

interface FeatureCardItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface WhyChooseUsProps {
  locale?: string;
}

export function WhyChooseUs({ locale = "en" }: WhyChooseUsProps) {
  const isRTL = locale === "ar";
  const dict = getDictionary(locale);
  const t = dict.about.whyChooseUs;

  const featureCards: FeatureCardItem[] = useMemo(
    () => [
      {
        id: "local-expertise",
        icon: "/about/Frame1.svg",
        title: t.localExpertise.title,
        description: t.localExpertise.description,
      },
      {
        id: "trusted-reliable",
        icon: "/about/Frame2.svg",
        title: t.trustedReliable.title,
        description: t.trustedReliable.description,
      },
      {
        id: "great-value",
        icon: "/about/Frame3.svg",
        title: t.greatValue.title,
        description: t.greatValue.description,
      },
      {
        id: "24-hour-support",
        icon: "/about/Frame4.svg",
        title: t.support24.title,
        description: t.support24.description,
      },
    ],
    [t]
  );

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#FFF4E5]"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* Upper Part */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 sm:mb-20">
          {/* Left Column: pics.png */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="lg:col-span-6 flex justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.02, rotate: -0.5 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full max-w-[540px] aspect-[800/540] cursor-pointer"
            >
              <Image
                src="/about/pics.png"
                alt={t.imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 540px"
                className="object-contain drop-shadow-md select-none transition-transform duration-500 hover:scale-102"
              />
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            {/* Heading with flourish */}
            <div className="relative inline-block mb-6 sm:mb-8 pl-6">
              <h2 className="font-['Poppins'] text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[#0E4A68] leading-tight">
                {t.title}
              </h2>
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="absolute pointer-events-none select-none"
                style={{
                  left: isRTL ? "auto" : "-15px",
                  right: isRTL ? "-15px" : "0px",
                  top: "0px",
                  bottom: "-10px",
                  width: "calc(100% + 20px)",
                }}
              >
                <Image
                  src="/about/whoWeAreArrow.svg"
                  alt=""
                  fill
                  className="object-contain object-right-bottom"
                  style={{
                    transform: isRTL ? "none" : "scaleX(-1)",
                  }}
                />
              </motion.div>
            </div>

            {/* Content text */}
            <div className="space-y-6 text-[#0E4A68] font-['Poppins'] text-[15px] sm:text-[17px] leading-[1.8] max-w-[540px]">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {t.paragraph1}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {t.paragraph2}
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Lower Part: 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {featureCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                backgroundColor: "transparent",
                border: "1.5px solid #D48C28",
                borderRadius: "15px",
                boxShadow: "0px 2px 15px 1px rgba(0, 0, 0, 0.25)",
              }}
              className="p-6 sm:p-7 flex flex-col justify-between transition-shadow duration-300 hover:shadow-[0_8px_25px_rgba(212,140,40,0.25)] cursor-pointer select-none"
            >
              <div className="flex flex-col items-center">
                {/* Circular Icon with hover animation */}
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                  className="w-[52px] h-[52px] relative mb-4"
                >
                  <Image
                    src={card.icon}
                    alt={card.title}
                    width={52}
                    height={52}
                    className="w-full h-full object-contain"
                  />
                </motion.div>

                {/* Card Title */}
                <h3 className="font-['Poppins'] text-[18px] sm:text-[19px] font-bold text-[#0E4A68] leading-snug">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="mt-2.5 font-['Poppins'] text-[13px] sm:text-[14px] text-[#0E4A68]/85 leading-[1.6] text-center">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
