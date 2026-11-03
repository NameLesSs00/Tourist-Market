"use client";

import React from "react";
import { motion } from "framer-motion";

interface ConcentricRingsProps {
  size?: "desktop" | "tablet" | "mobile";
  text?: string;
  gradientPrefix?: string;
}

export function ConcentricRings({
  size = "desktop",
  text = "What we serve",
  gradientPrefix = "about",
}: ConcentricRingsProps) {
  const outerGradId = `${gradientPrefix}OuterGrad`;
  const innerGradId = `${gradientPrefix}InnerGrad`;

  const sizeClasses = {
    desktop: "w-[340px] h-[340px] xl:w-[370px] xl:h-[370px]",
    tablet: "w-[280px] h-[280px]",
    mobile: "w-[230px] h-[230px]",
  }[size];

  const textWrapClasses = {
    desktop: "w-[210px] h-[210px] xl:w-[230px] xl:h-[230px] p-6 text-[24px] xl:text-[28px]",
    tablet: "w-[180px] h-[180px] p-4 text-[22px]",
    mobile: "w-[150px] h-[150px] p-3 text-xl",
  }[size];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className={`relative flex items-center justify-center ${sizeClasses}`}
    >
      {/* Outer Ring: spinning Clockwise at 2800ms */}
      <svg
        viewBox="0 0 380 380"
        className="absolute inset-0 w-full h-full animate-circle-cw-2800 pointer-events-none select-none"
      >
        <defs>
          <linearGradient id={outerGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="39.9%" stopColor="#D48C28" />
            <stop offset="54.33%" stopColor="#FFFFFF" />
            <stop offset="56.73%" stopColor="#FFFFFF" />
            <stop offset="74.04%" stopColor="#0E597F" />
          </linearGradient>
        </defs>
        <circle
          cx="190"
          cy="190"
          r="178"
          fill="none"
          stroke={`url(#${outerGradId})`}
          strokeWidth="10"
        />
      </svg>

      {/* Inner Ring: spinning Counter-Clockwise at 2800ms */}
      <svg
        viewBox="0 0 380 380"
        className="absolute inset-0 w-full h-full animate-circle-ccw-2800 pointer-events-none select-none"
      >
        <defs>
          <linearGradient id={innerGradId} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="39.9%" stopColor="#D48C28" />
            <stop offset="54.33%" stopColor="#FFFFFF" />
            <stop offset="56.73%" stopColor="#FFFFFF" />
            <stop offset="74.04%" stopColor="#0E597F" />
          </linearGradient>
        </defs>
        <circle
          cx="190"
          cy="190"
          r="132"
          fill="none"
          stroke={`url(#${innerGradId})`}
          strokeWidth="8"
        />
      </svg>

      {/* Center Text with subtle pulsing glow */}
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className={`relative z-10 rounded-full bg-transparent flex items-center justify-center text-center select-none pointer-events-none ${textWrapClasses}`}
      >
        <span className="font-['Poppins'] font-bold text-[#0E4A68] leading-tight">
          {text}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default ConcentricRings;

