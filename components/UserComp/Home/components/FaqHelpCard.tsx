import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Dictionary } from "@/shared/utils/getDictionary";

interface FaqHelpCardProps {
  dict: Dictionary;
  currentLocale: string;
  isMobile?: boolean;
}

export function FaqHelpCard({ dict, currentLocale, isMobile = false }: FaqHelpCardProps) {
  const { faq } = dict;

  if (isMobile) {
    return (
      <div className="relative mx-auto flex w-full max-w-[360px] flex-col items-center justify-center rounded-3xl border border-[#0E4A6826] bg-[#FFF8EF] p-8 text-center shadow-xs">
        <h3 className="whitespace-nowrap font-poppins text-xl font-bold text-[#0E4A68] sm:text-2xl">
          {faq.helpTitle}
        </h3>
        <Link
          href={`/${currentLocale}/contact`}
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#0E4A68] px-8 py-3.5 font-poppins text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#083952] hover:scale-105 cursor-pointer"
        >
          {faq.helpButton}
        </Link>
      </div>
    );
  }

  return (
    <div className="relative mx-auto flex h-[460px] w-full max-w-[380px] shrink-0 items-center justify-center text-center">
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

