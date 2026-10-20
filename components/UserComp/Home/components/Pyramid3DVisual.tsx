"use client";

import React from "react";
import Image from "next/image";

interface Pyramid3DVisualProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Pyramid3DVisual({
  className = "",
  size = "lg",
}: Pyramid3DVisualProps) {
  const sizeClasses = {
    sm: "w-[220px] h-[254px]",
    md: "w-[250px] h-[289px]",
    lg: "w-[294px] h-[339px] xl:w-[324px] xl:h-[374px]",
  }[size];

  return (
    <div
      className={`relative flex items-center justify-center select-none ${sizeClasses} ${className}`}
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

      {/* 2. Middle Layer: 3 Concentric Broken Orbit Rings (Spinning round and round) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          viewBox="0 0 360 360"
          className="h-[84%] w-[84%] overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="orbit-ring-shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="2" dy="2" stdDeviation="5" floodColor="#FFFFFF" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Orbit Ring 1 (Outer - Clockwise) */}
          <g className="animate-orbit-1" filter="url(#orbit-ring-shadow)">
            <circle
              cx="180"
              cy="180"
              r="152"
              stroke="#939393"
              strokeWidth="2.2"
              strokeDasharray="140 70 80 50"
              strokeLinecap="round"
            />
          </g>

          {/* Orbit Ring 2 (Middle - Counter Clockwise) */}
          <g className="animate-orbit-2" filter="url(#orbit-ring-shadow)">
            <circle
              cx="180"
              cy="180"
              r="128"
              stroke="#939393"
              strokeWidth="2.2"
              strokeDasharray="90 80 120 60"
              strokeLinecap="round"
            />
          </g>

          {/* Orbit Ring 3 (Inner - Clockwise) */}
          <g className="animate-orbit-3" filter="url(#orbit-ring-shadow)">
            <circle
              cx="180"
              cy="180"
              r="104"
              stroke="#939393"
              strokeWidth="2.2"
              strokeDasharray="60 50 90 40"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>

      {/* 3. Top Layer: 3D Pyramid - Fills the entire space of the polygon base */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <Image
          src="/homepage/hero/3dPirm.webp"
          alt="3D Golden Pyramid"
          width={350}
          height={350}
          priority
          className="h-[96%] w-[96%] object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.52)]"
        />
      </div>
    </div>
  );
}

export default Pyramid3DVisual;
