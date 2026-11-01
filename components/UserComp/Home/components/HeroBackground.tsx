"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Dictionary } from "@/shared/utils/getDictionary";

interface HeroBackgroundProps {
  dict?: Dictionary;
}

export function HeroBackground({ dict }: HeroBackgroundProps) {
  const bgAlt = dict?.hero?.alt?.background ?? "Egyptian Desert and Palm Shadows Background";
  const watermarkAlt = dict?.hero?.alt?.watermark ?? "Tourist Market Watermark Emblem";

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
      {/* 1. Full-Bleed Background with Natural Sand & Palm Leaves on the Left */}
      <div className="absolute inset-0">
        <Image
          src="/homepage/hero/homeHeroBg.webp"
          alt={bgAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* 2. Emblem Logo Watermark - Centered & Clearly Visible with soft entrance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 0.38, scale: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="absolute left-[45%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] xl:w-[750px] pointer-events-none z-1"
      >
        <Image
          src="/homepage/hero/HeroLogo.webp"
          alt={watermarkAlt}
          width={750}
          height={650}
          priority
          style={{ width: "100%", height: "auto" }}
          className="w-full h-auto object-contain"
        />
      </motion.div>
    </div>
  );
}

export default HeroBackground;
