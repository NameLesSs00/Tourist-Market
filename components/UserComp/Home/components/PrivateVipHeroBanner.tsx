"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface PrivateVipHeroBannerProps {
  locale?: string;
}

export function PrivateVipHeroBanner({ locale = "en" }: PrivateVipHeroBannerProps) {
  const desktopBannerRef = React.useRef<HTMLDivElement>(null);
  const [screenLeftOffset, setScreenLeftOffset] = React.useState<number | null>(null);

  React.useEffect(() => {
    const updateOffset = () => {
      if (desktopBannerRef.current) {
        const rect = desktopBannerRef.current.getBoundingClientRect();
        setScreenLeftOffset(rect.left);
      }
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  const targetMargin =
    typeof window !== "undefined"
      ? window.innerWidth >= 1536
        ? 28
        : window.innerWidth >= 1280
        ? 22
        : 16
      : 22;

  return (
    <>
      {/* ========================================================= */}
      {/* 1. MOBILE & TABLET VIEW (< lg / < 1024px)                 */}
      {/* Self-contained inset card scaling smoothly sm -> md       */}
      {/* ========================================================= */}
      <div className="block lg:hidden relative w-full max-w-[345px] sm:max-w-[560px] mx-auto h-[175px] sm:h-[245px] select-none">
        {/* Base Dark Blue Box (#0E4A68) with Rounded Left Corners */}
        <div className="absolute inset-y-0 left-0 right-[40px] sm:right-[60px] bg-[#0E4A68] rounded-l-[14px] sm:rounded-l-[20px] z-0" />

        {/* Right-Hand Angled Chevron Cutout Shape */}
        <div className="absolute inset-y-0 right-0 w-[120px] sm:w-[170px] h-full pointer-events-none z-0">
          <Image
            src="/homepage/privateSection/bgshpae.png"
            alt="VIP Banner Background Shape"
            fill
            sizes="(max-width: 640px) 120px, 170px"
            priority
            className="object-fill object-right"
          />
        </div>

        {/* Vertical "Categories" Text along Far Left Margin */}
        <div
          className="absolute left-1.5 sm:left-3 top-1/2 -translate-y-1/2 text-white font-poppins font-semibold text-[13px] sm:text-[16px] tracking-[0.08em] select-none pointer-events-none whitespace-nowrap z-20"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          Categories
        </div>

        {/* Golden Hexagon VIP Card Container */}
        <div className="absolute left-[26px] sm:left-[45px] top-1/2 -translate-y-1/2 w-[145px] sm:w-[220px] h-[155px] sm:h-[220px] flex items-center z-10 pointer-events-none">
          <div className="absolute inset-0 pointer-events-none select-none">
            <Image
              src="/homepage/privateSection/Polygon 1 (2).png"
              alt="VIP Golden Frame"
              fill
              sizes="(max-width: 640px) 145px, 220px"
              priority
              className="object-contain"
            />
          </div>

          {/* Left-Aligned VIP Content */}
          <div className="relative z-10 flex flex-col items-start text-left pl-3 sm:pl-5 w-[120px] sm:w-[180px] pointer-events-auto">
            {/* Yacht SVG Icon */}
            <div className="relative w-[44px] sm:w-[65px] h-[23px] sm:h-[34px] mb-1 sm:mb-2 ml-1 sm:ml-2">
              <Image
                src="/homepage/privateSection/ship.svg"
                alt="VIP Ship Icon"
                fill
                sizes="(max-width: 640px) 44px, 65px"
                className="object-contain object-left"
              />
            </div>

            {/* Line 1: Exactly 1 line */}
            <h3 className="font-poppins font-medium text-[10px] sm:text-[13px] leading-[13px] sm:leading-[18px] text-white whitespace-nowrap">
              Exclusive VIP Escapes
            </h3>

            {/* Line 2: Exactly 1 line */}
            <p className="font-poppins font-medium text-[10px] sm:text-[13px] leading-[13px] sm:leading-[18px] text-white whitespace-nowrap mt-0.5">
              Unparalleled Privacy
            </p>

            {/* Plan Your Private Trip Button */}
            <Link
              href={`/${locale}/private-excursions`}
              className="mt-2 sm:mt-3 inline-flex items-center justify-center bg-[#D48C28] hover:bg-[#b8761f] active:scale-95 text-white font-poppins font-medium text-[8.5px] sm:text-[11px] h-[23px] sm:h-[30px] px-2.5 sm:px-4 rounded-[8px] sm:rounded-[10px] transition-all duration-200 shadow-sm whitespace-nowrap cursor-pointer"
            >
              Plan Your Private Trip
            </Link>
          </div>
        </div>

        {/* Top Hexagon Image: Yacht */}
        <div className="absolute right-[4px] sm:right-[16px] top-[14px] sm:top-[16px] w-[86px] sm:w-[125px] h-[88px] sm:h-[128px] z-20 pointer-events-none drop-shadow-md">
          <Image
            src="/homepage/privateSection/yaht.png"
            alt="Private Luxury Yacht"
            fill
            sizes="(max-width: 640px) 86px, 125px"
            className="object-contain"
            priority
          />
        </div>

        {/* Bottom Hexagon Image: Helicopter */}
        <div className="absolute right-[44px] sm:right-[68px] bottom-[12px] sm:bottom-[18px] w-[66px] sm:w-[96px] h-[66px] sm:h-[96px] z-20 pointer-events-none drop-shadow-md">
          <Image
            src="/homepage/privateSection/ElH.png"
            alt="Private Helicopter Tour"
            fill
            sizes="(max-width: 640px) 66px, 96px"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. LAPTOP & DESKTOP VIEW (>= lg / >= 1024px)              */}
      {/* Calibrated at lg (1024-1279px) to prevent 1226px overlaps */}
      {/* Full-scale at xl (1280px+) to match desktop reference     */}
      {/* ========================================================= */}
      {/* ========================================================= */}
      {/* 2. LAPTOP & DESKTOP VIEW (>= lg / >= 1024px)              */}
      {/* Calibrated across lg (1024px), xl (1280px-1535px), and    */}
      {/* 2xl (1536px+) to ensure zero collision at 1320px          */}
      {/* ========================================================= */}
      <div
        ref={desktopBannerRef}
        className="hidden lg:flex relative w-full h-[510px] xl:h-[570px] 2xl:h-[660px] items-center overflow-visible select-none"
      >
        {/* 0. Dark Blue Bleed extension to the left edge of the screen */}
        <div className="absolute inset-y-0 right-full w-screen bg-[#0E4A68] pointer-events-none z-0" />

        {/* 1. Dark Blue Banner Angled Background Shape (#0E4A68) */}
        <div className="absolute inset-y-0 left-0 w-[430px] xl:w-[500px] 2xl:w-[600px] h-full pointer-events-none select-none z-0">
          <Image
            src="/homepage/privateSection/bgshpae.png"
            alt="VIP Banner Background Shape"
            fill
            sizes="(max-width: 1280px) 430px, (max-width: 1536px) 500px, 600px"
            priority
            className="object-fill object-left"
          />
        </div>

        {/* 2. Vertical "Categories" Text along Far Left Screen Margin */}
        <div
          className="absolute top-1/2 -translate-y-1/2 text-white font-poppins font-semibold text-[26px] xl:text-[32px] 2xl:text-[38px] tracking-[0.1em] select-none pointer-events-none whitespace-nowrap z-20"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            left:
              screenLeftOffset !== null
                ? `-${Math.max(0, screenLeftOffset - targetMargin)}px`
                : "calc(-1 * max(40px, (100vw - 1650px) / 2 + 56px) + 22px)",
          }}
        >
          Categories
        </div>

        {/* 3. Golden Hexagon VIP Card Container */}
        <div className="absolute left-[45px] xl:left-[70px] 2xl:left-[115px] top-[46%] -translate-y-1/2 w-[260px] xl:w-[325px] 2xl:w-[410px] h-[360px] xl:h-[445px] 2xl:h-[540px] flex items-center z-10 pointer-events-none">
          {/* Hexagon Golden Border Frame */}
          <div className="absolute inset-0 pointer-events-none select-none">
            <Image
              src="/homepage/privateSection/Polygon 1 (2).png"
              alt="VIP Golden Frame"
              fill
              sizes="(max-width: 1280px) 260px, (max-width: 1536px) 325px, 410px"
              priority
              className="object-contain"
            />
          </div>

          {/* Left-Aligned VIP Content in Left Half of Polygon */}
          <div className="relative z-10 flex flex-col items-start text-left pl-5 xl:pl-7 2xl:pl-10 w-[200px] xl:w-[250px] 2xl:w-[320px] pointer-events-auto">
            {/* Yacht SVG Icon */}
            <div className="relative w-[70px] xl:w-[85px] 2xl:w-[115px] h-[36px] xl:h-[46px] 2xl:h-[60px] mb-2 xl:mb-2.5 2xl:mb-3 ml-2.5 xl:ml-4 2xl:ml-6">
              <Image
                src="/homepage/privateSection/ship.svg"
                alt="VIP Ship Icon"
                fill
                sizes="(max-width: 1280px) 70px, (max-width: 1536px) 85px, 115px"
                className="object-contain object-left"
              />
            </div>

            {/* Line 1: Exactly 1 line */}
            <h3 className="font-poppins font-medium text-[14px] xl:text-[17px] 2xl:text-[20px] leading-[20px] xl:leading-[24px] 2xl:leading-[28px] text-white whitespace-nowrap">
              Exclusive VIP Escapes
            </h3>

            {/* Line 2: Exactly 1 line */}
            <p className="font-poppins font-medium text-[14px] xl:text-[17px] 2xl:text-[20px] leading-[20px] xl:leading-[24px] 2xl:leading-[28px] text-white whitespace-nowrap mt-1">
              Unparalleled Privacy
            </p>

            {/* Plan Your Private Trip Button */}
            <Link
              href={`/${locale}/private-excursions`}
              className="mt-3 xl:mt-4 2xl:mt-5 inline-flex items-center justify-center bg-[#D48C28] hover:bg-[#b8761f] active:scale-95 text-white font-poppins font-medium text-[10.5px] xl:text-[12.5px] 2xl:text-[14px] h-[30px] xl:h-[35px] 2xl:h-[40px] px-3.5 xl:px-5 2xl:px-6 rounded-[10px] xl:rounded-[12px] 2xl:rounded-[14px] transition-all duration-200 shadow-md whitespace-nowrap cursor-pointer"
            >
              Plan Your Private Trip
            </Link>
          </div>
        </div>

        {/* 4. Top Hexagon Image: Yacht */}
        <div className="absolute left-[260px] xl:left-[345px] 2xl:left-[430px] top-[1%] xl:top-[1.5%] 2xl:top-[1%] w-[170px] xl:w-[225px] 2xl:w-[285px] h-[175px] xl:h-[230px] 2xl:h-[290px] z-20 pointer-events-none drop-shadow-xl">
          <Image
            src="/homepage/privateSection/yaht.png"
            alt="Private Luxury Yacht"
            fill
            sizes="(max-width: 1280px) 170px, (max-width: 1536px) 225px, 285px"
            className="object-contain"
            priority
          />
        </div>

        {/* 5. Bottom Hexagon Image: Helicopter */}
        <div className="absolute left-[235px] xl:left-[315px] 2xl:left-[395px] top-[52%] xl:top-[51.5%] 2xl:top-[51%] w-[135px] xl:w-[175px] 2xl:w-[225px] h-[135px] xl:h-[175px] 2xl:h-[225px] z-20 pointer-events-none drop-shadow-xl">
          <Image
            src="/homepage/privateSection/ElH.png"
            alt="Private Helicopter Tour"
            fill
            sizes="(max-width: 1280px) 135px, (max-width: 1536px) 175px, 225px"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </>
  );
}

export default PrivateVipHeroBanner;
