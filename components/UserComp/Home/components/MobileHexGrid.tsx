"use client";

import Image from "next/image";
import { Pyramid3DVisual } from "./Pyramid3DVisual";

export function MobileHexGrid() {
  return (
    <div className="relative flex lg:hidden flex-col items-center justify-center w-full max-w-[360px] sm:max-w-[400px] mx-auto select-none mt-4 mb-6">
      {/* 3D Pyramid Visual positioned at the top of the mobile cluster */}
      <div className="relative z-20 mb-[-70px] sm:mb-[-80px]">
        <Pyramid3DVisual size="sm" />
      </div>

      {/* Pre-arranged Mobile Hexagons Cluster */}
      <div className="relative z-10 w-full">
        <Image
          src="/homepage/hero/mobileImages.webp"
          alt="Egyptian Destinations Showcase"
          width={400}
          height={460}
          priority
          className="w-full h-auto object-contain drop-shadow-xl"
        />
      </div>
    </div>
  );
}

export default MobileHexGrid;
