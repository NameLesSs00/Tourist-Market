"use client";

import React from "react";
import Image from "next/image";
import { Pyramid3DVisual } from "./Pyramid3DVisual";

export function DesktopHexGrid() {
  return (
    <div className="relative hidden lg:block w-[822px] xl:w-[904px] h-[742px] xl:h-[814px] select-none shrink-0 -mr-16 xl:-mr-24">
      {/* 1. West Centerpiece: 3D Pyramid filling the blue polygon with 3 #939393 orbit rings */}
      <div className="absolute left-0 top-[202px] xl:top-[220px] z-30">
        <Pyramid3DVisual size="lg" />
      </div>

      {/* 2. Top-Left: Restaurant Hexagon */}
      <div className="absolute left-[180px] xl:left-[199px] top-0 w-[246px] xl:w-[270px] z-20">
        <Image
          src="/homepage/hero/hex-restaurant.webp"
          alt="Luxury Dining"
          width={294}
          height={339}
          priority
          className="w-full h-auto object-contain drop-shadow-md"
        />
      </div>

      {/* 3. Top-Right: Coral Reef Fish Hexagon (partly cut at right edge) */}
      <div className="absolute left-[444px] xl:left-[489px] top-0 w-[246px] xl:w-[270px] z-15">
        <Image
          src="/homepage/hero/hex-fish.webp"
          alt="Coral Reef Diving"
          width={294}
          height={339}
          priority
          className="w-full h-auto object-contain drop-shadow-md"
        />
      </div>

      {/* 4. Honeycomb Central Hub: Beach with Orange Umbrella Hexagon */}
      <div className="absolute left-[312px] xl:left-[344px] top-[229px] xl:top-[251px] w-[246px] xl:w-[270px] z-20">
        <Image
          src="/homepage/hero/hex-beach.webp"
          alt="Beach Resorts"
          width={381}
          height={440}
          priority
          className="w-full h-auto object-contain drop-shadow-md"
        />
      </div>

      {/* 5. Middle-Right: Red Sea Coastline Waters Hexagon (partly cut at right edge) */}
      <div className="absolute left-[576px] xl:left-[634px] top-[229px] xl:top-[251px] w-[246px] xl:w-[270px] z-10">
        <Image
          src="/homepage/hero/hex-cruise.webp"
          alt="Red Sea Coastline"
          width={323}
          height={372}
          priority
          className="w-full h-auto object-contain drop-shadow-md"
        />
      </div>

      {/* 6. Bottom-Left: Sea Cruise Yacht Hexagon */}
      <div className="absolute left-[180px] xl:left-[199px] top-[458px] xl:top-[502px] w-[246px] xl:w-[270px] z-20">
        <Image
          src="/homepage/hero/hex-coast.webp"
          alt="Yacht and Sea Cruises"
          width={285}
          height={329}
          priority
          className="w-full h-auto object-contain drop-shadow-md"
        />
      </div>

      {/* 7. Bottom-Right: Ancient Columns Hexagon (partly cut at right edge) */}
      <div className="absolute left-[444px] xl:left-[489px] top-[458px] xl:top-[502px] w-[246px] xl:w-[270px] z-15">
        <Image
          src="/homepage/hero/hex-columns.webp"
          alt="Ancient Temples"
          width={285}
          height={329}
          priority
          className="w-full h-auto object-contain drop-shadow-md"
        />
      </div>
    </div>
  );
}

export default DesktopHexGrid;
