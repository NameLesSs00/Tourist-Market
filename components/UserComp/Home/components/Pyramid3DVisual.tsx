"use client";

import React from "react";
import Image from "next/image";

interface Pyramid3DVisualProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: "w-[152px] h-[176px] sm:w-[175px] sm:h-[202px]",
  md: "w-[250px] h-[289px]",
  lg: "w-[294px] h-[339px] xl:w-[324px] xl:h-[374px]",
};

export function Pyramid3DVisual({
  className = "",
  size = "lg",
}: Pyramid3DVisualProps) {
  const sizeClass = sizeConfig[size];

  return (
    <div
      className={`relative flex items-center justify-center select-none ${sizeClass} ${className}`}
    >
      {/* 1. Base Layer: Hexagonal Blue Polygon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/homepage/hero/poly.webp"
          alt="Hexagon Polygon Base"
          width={325}
          height={375}
          priority
          className="h-full w-full object-contain drop-shadow-[0_20px_35px_rgba(14,74,104,0.35)]"
        />
      </div>

      {/* 2. Middle Layer: 3 Concentric Orbit Rings (CSS-animated via wrapper divs) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="relative h-[96%] w-[96%]">
          {/* Ring 1 - Outer (Clockwise 8s) */}
          <div
            className="absolute inset-0"
            style={{ animation: "spinClockwise 8s linear infinite", transformOrigin: "center" }}
          >
            <svg viewBox="0 0 360 360" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="180"
                cy="180"
                r="154"
                stroke="#939393"
                strokeWidth="2.8"
                strokeDasharray="772 196"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Ring 2 - Middle (Counter-clockwise 6s) */}
          <div
            className="absolute inset-0"
            style={{ animation: "spinCounterClockwise 6s linear infinite", transformOrigin: "center" }}
          >
            <svg viewBox="0 0 360 360" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="180"
                cy="180"
                r="130"
                stroke="#939393"
                strokeWidth="2.6"
                strokeDasharray="651 166"
                strokeDashoffset="270"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Ring 3 - Inner (Clockwise 10s) */}
          <div
            className="absolute inset-0"
            style={{ animation: "spinClockwise 10s linear infinite", transformOrigin: "center" }}
          >
            <svg viewBox="0 0 360 360" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="180"
                cy="180"
                r="106"
                stroke="#939393"
                strokeWidth="2.2"
                strokeDasharray="531 135"
                strokeDashoffset="440"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 3. Top Layer: 3D Pyramid - Balanced size with rings orbiting around it */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <Image
          src="/homepage/hero/3dPirm.webp"
          alt="3D Golden Pyramid"
          width={350}
          height={350}
          priority
          className="h-[88%] w-[88%] object-contain drop-shadow-[0_20px_28px_rgba(0,0,0,0.52)]"
        />
      </div>
    </div>
  );
}

export default Pyramid3DVisual;