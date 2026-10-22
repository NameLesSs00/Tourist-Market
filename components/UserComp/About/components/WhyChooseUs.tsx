"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface FeatureCardItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const FEATURE_CARDS: FeatureCardItem[] = [
  {
    id: "local-expertise",
    icon: "/about/Frame1.svg",
    title: "Local Expertise",
    description: "We know the best places, hidden gems and real local experiences.",
  },
  {
    id: "trusted-reliable",
    icon: "/about/Frame2.svg",
    title: "Trusted and Reliable",
    description: "Your safety and comfort are always our top priority.",
  },
  {
    id: "great-value",
    icon: "/about/Frame3.svg",
    title: "Great Value",
    description: "High-quality experiences at fair and transparent prices.",
  },
  {
    id: "24-hour-support",
    icon: "/about/Frame4.svg",
    title: "24 hour Support",
    description:
      "We're always experiences private transfers and here whenever you need us.",
  },
];

interface WhyChooseUsProps {
  locale?: string;
}

export function WhyChooseUs({ locale = "en" }: WhyChooseUsProps) {
  const isRTL = locale === "ar";

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#FFF4E5]"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* Upper Part: Collage Images on Left, Text on Right matching Frame 570.png */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 sm:mb-20">
          {/* Left Column: pics.png (Exact two tilted photos with borders and drop shadows) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="lg:col-span-6 flex justify-center items-center"
          >
            <div className="relative w-full max-w-[540px] aspect-[800/540]">
              <Image
                src="/about/pics.png"
                alt="Why choose us - scenic travel collage"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 540px"
                className="object-contain drop-shadow-md select-none"
              />
            </div>
          </motion.div>

          {/* Right Column: Heading with Left-Loop Flourish & Content matching Frame 570.png */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            {/* Heading with flourish (loop on left as in Frame 570.png) */}
            <div className="relative inline-block mb-6 sm:mb-8 pl-6">
              <h2 className="font-['Poppins'] text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[#0E4A68] leading-tight">
                Why Choose Us
              </h2>
              {/* Horizontally flipped flourish so the loop wraps around "W" */}
              <div
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
              </div>
            </div>

            {/* Content text matching Frame 570.png */}
            <div className="space-y-6 text-[#0E4A68] font-['Poppins'] text-[15px] sm:text-[17px] leading-[1.8] max-w-[540px]">
              <p>
                A personalized approach tailored to your exact desires. Our reputation
                for integrity ensures a worry-free journey. Deep local connections
                provide unparalleled access and insights.
              </p>
              <p>
                Because we go beyond the ordinary. We don&apos;t just plan trips — we
                create meaningful experiences with care, trust and local expertise.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Lower Part: 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {FEATURE_CARDS.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
              style={{
                backgroundColor: "transparent",
                border: "1.5px solid #D48C28",
                borderRadius: "15px",
                boxShadow: "0px 2px 15px 1px rgba(0, 0, 0, 0.25)",
              }}
              className="p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(212,140,40,0.2)]"
            >
              <div className="flex flex-col items-center">
                {/* Circular Icon */}
                <div className="w-[52px] h-[52px] relative mb-4">
                  <Image
                    src={card.icon}
                    alt={card.title}
                    width={52}
                    height={52}
                    className="w-full h-full object-contain"
                  />
                </div>

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
