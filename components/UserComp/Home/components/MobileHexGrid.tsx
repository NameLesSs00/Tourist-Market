"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Pyramid3DVisual } from "./Pyramid3DVisual";
import type { Dictionary } from "@/shared/utils/getDictionary";

interface MobileHexGridProps {
  dict?: Dictionary;
}

export function MobileHexGrid({ dict }: MobileHexGridProps) {
  const altText = dict?.hero?.alt?.background ?? "Egyptian Destinations Showcase";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
      className="relative flex lg:hidden flex-col items-center justify-center w-full max-w-[360px] sm:max-w-[400px] mx-auto select-none mt-4 mb-6"
    >
      {/* 3D Pyramid Visual positioned at the top of the mobile cluster */}
      <div className="relative z-20 mb-[-70px] sm:mb-[-80px]">
        <Pyramid3DVisual size="sm" dict={dict} />
      </div>

      {/* Pre-arranged Mobile Hexagons Cluster */}
      <div className="relative z-10 w-full">
        <Image
          src="/homepage/hero/mobileImages.webp"
          alt={altText}
          width={400}
          height={460}
          priority
          className="w-full h-auto object-contain drop-shadow-xl"
        />
      </div>
    </motion.div>
  );
}

export default MobileHexGrid;
