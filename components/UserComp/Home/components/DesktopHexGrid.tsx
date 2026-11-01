"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Pyramid3DVisual } from "./Pyramid3DVisual";
import type { Dictionary } from "@/shared/utils/getDictionary";

interface DesktopHexGridProps {
  dict?: Dictionary;
}

export function DesktopHexGrid({ dict }: DesktopHexGridProps) {
  const alt = dict?.hero?.alt;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative hidden lg:block w-[822px] xl:w-[904px] h-[742px] xl:h-[814px] select-none shrink-0 origin-right scale-[0.78] xl:scale-[0.92] 2xl:scale-100 -mr-10 xl:-mr-16 2xl:-mr-24 transition-transform duration-300"
    >
      {/* 1. West Centerpiece: 3D Pyramid filling the blue polygon with 3 #939393 orbit rings */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
        className="absolute left-0 top-[202px] xl:top-[220px] z-30"
      >
        <Pyramid3DVisual size="lg" dict={dict} />
      </motion.div>

      {/* 2. Top-Left: Restaurant Hexagon */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
        className="absolute left-[180px] xl:left-[199px] top-0 w-[246px] xl:w-[270px] z-20 cursor-pointer"
      >
        <Image
          src="/homepage/hero/hex-restaurant.webp"
          alt={alt?.dining ?? "Luxury Dining"}
          width={294}
          height={339}
          priority
          className="w-full h-auto object-contain drop-shadow-md"
        />
      </motion.div>

      {/* 3. Top-Right: Coral Reef Fish Hexagon */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.48 }}
        whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
        className="absolute left-[444px] xl:left-[489px] top-0 w-[246px] xl:w-[270px] z-15 cursor-pointer"
      >
        <Image
          src="/homepage/hero/hex-fish.webp"
          alt={alt?.diving ?? "Coral Reef Diving"}
          width={294}
          height={339}
          priority
          className="w-full h-auto object-contain drop-shadow-md"
        />
      </motion.div>

      {/* 4. Honeycomb Central Hub: Beach with Orange Umbrella Hexagon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.44 }}
        whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
        className="absolute left-[312px] xl:left-[344px] top-[229px] xl:top-[251px] w-[246px] xl:w-[270px] z-20 cursor-pointer"
      >
        <Image
          src="/homepage/hero/hex-beach.webp"
          alt={alt?.beach ?? "Beach Resorts"}
          width={381}
          height={440}
          priority
          className="w-full h-auto object-contain drop-shadow-md"
        />
      </motion.div>

      {/* 5. Middle-Right: Red Sea Coastline Waters Hexagon */}
      <motion.div
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.52 }}
        whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
        className="absolute left-[576px] xl:left-[634px] top-[229px] xl:top-[251px] w-[246px] xl:w-[270px] z-10 cursor-pointer"
      >
        <Image
          src="/homepage/hero/hex-cruise.webp"
          alt={alt?.coastline ?? "Red Sea Coastline"}
          width={323}
          height={372}
          priority
          className="w-full h-auto object-contain drop-shadow-md"
        />
      </motion.div>

      {/* 6. Bottom-Left: Sea Cruise Yacht Hexagon */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.56 }}
        whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
        className="absolute left-[180px] xl:left-[199px] top-[458px] xl:top-[502px] w-[246px] xl:w-[270px] z-20 cursor-pointer"
      >
        <Image
          src="/homepage/hero/hex-coast.webp"
          alt={alt?.cruise ?? "Yacht and Sea Cruises"}
          width={285}
          height={329}
          priority
          className="w-full h-auto object-contain drop-shadow-md"
        />
      </motion.div>

      {/* 7. Bottom-Right: Ancient Columns Hexagon */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
        className="absolute left-[444px] xl:left-[489px] top-[458px] xl:top-[502px] w-[246px] xl:w-[270px] z-15 cursor-pointer"
      >
        <Image
          src="/homepage/hero/hex-columns.webp"
          alt={alt?.temples ?? "Ancient Temples"}
          width={285}
          height={329}
          priority
          className="w-full h-auto object-contain drop-shadow-md"
        />
      </motion.div>
    </motion.div>
  );
}

export default DesktopHexGrid;
