"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ServiceHeroProps {
  imageSrc: string;
  altText: string;
}

export function ServiceHero({ imageSrc, altText }: ServiceHeroProps) {
  return (
    <div className="w-full max-w-[1320px] mx-auto px-3 sm:px-4 lg:px-6 pt-3 sm:pt-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full overflow-hidden shadow-sm rounded-xl sm:rounded-2xl aspect-[16/9] sm:aspect-[21/9] md:aspect-[1280/540] min-h-[160px] sm:min-h-[220px] md:min-h-[260px] group"
      >
        <Image
          src={imageSrc}
          alt={altText}
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1320px"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
        />
      </motion.div>
    </div>
  );
}

export default ServiceHero;
