"use client";

import React from "react";
import Image from "next/image";

export function HeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
      {/* 1. Full-Bleed Background with Natural Sand & Palm Leaves on the Left */}
      <div className="absolute inset-0">
        <Image
          src="/homepage/hero/homeHeroBg.webp"
          alt="Egyptian Desert and Palm Shadows Background"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* 2. Emblem Logo Watermark - Centered & Clearly Visible */}
      <div className="absolute left-[45%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] xl:w-[750px] opacity-[0.38] pointer-events-none z-1">
        <Image
          src="/homepage/hero/HeroLogo.webp"
          alt="Tourist Market Watermark Emblem"
          width={750}
          height={650}
          priority
          style={{ width: "100%", height: "auto" }}
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}

export default HeroBackground;
