import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Dictionary } from "@/shared/utils/getDictionary";

interface FaqHelpCardProps {
  dict: Dictionary;
  currentLocale: string;
  isMobile?: boolean;
  className?: string;
}

export function FaqHelpCard({
  dict,
  currentLocale,
  isMobile = false,
  className = "",
}: FaqHelpCardProps) {
  const { faq } = dict;

  if (isMobile) {
    return (
      <div className="relative mx-auto flex h-[195px] sm:h-[220px] w-full max-w-[320px] sm:max-w-[360px] shrink-0 flex-col items-center justify-start text-center">
        {/* Mobile Downward Curve Asset (rotated 90deg clockwise so arc points down and is centered) */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible">
          <div className="translate-x-0">
            <div className="relative h-[270px] w-[180px] rotate-90 sm:h-[300px] sm:w-[200px]">
              <Image
                src="/homepage/Faq/curve.png"
                alt=""
                fill
                priority
                sizes="(max-width: 640px) 270px, 300px"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Content: Title on the top between curve tips, button centered inside the cradle */}
        <div className="relative z-10 flex flex-col items-center justify-start pt-5 sm:pt-6 gap-3 sm:gap-3.5">
          <h3 className="whitespace-nowrap font-poppins text-lg sm:text-xl font-bold tracking-tight text-[#0E4A68]">
            {faq.helpTitle}
          </h3>

          <Link
            href={`/${currentLocale}/contact`}
            className="inline-flex items-center justify-center rounded-xl bg-[#0E4A68] px-7 py-2.5 sm:px-8 sm:py-3 font-poppins text-xs sm:text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#083952] hover:scale-105 cursor-pointer"
          >
            {faq.helpButton}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative mx-auto flex h-[460px] w-full max-w-[380px] shrink-0 items-center justify-center text-center mt-7 sm:mt-8 xl:mt-10 2xl:mt-12 ${className}`}
    >
      {/* Original High-Res Curve Asset with Soft Blur/Shadow matching FAQDesktop.png */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/homepage/Faq/curve.png"
          alt=""
          fill
          priority
          sizes="(max-width: 1280px) 340px, 380px"
          className="object-contain object-right"
        />
      </div>

      {/* Single-line Title and Button on the line below */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-7 pr-6 sm:pr-8">
        <h3 className="whitespace-nowrap font-poppins text-2xl font-bold tracking-tight text-[#0E4A68] sm:text-[26px] xl:text-[28px]">
          {faq.helpTitle}
        </h3>

        <Link
          href={`/${currentLocale}/contact`}
          className="inline-flex items-center justify-center rounded-2xl bg-[#0E4A68] px-9 py-3.5 font-poppins text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#083952] hover:scale-105 cursor-pointer"
        >
          {faq.helpButton}
        </Link>
      </div>
    </div>
  );
}

export default FaqHelpCard;

