import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Dictionary } from "@/shared/utils/getDictionary";

interface FaqHelpCardProps {
  dict: Dictionary;
  currentLocale: string;
}

export function FaqHelpCard({ dict, currentLocale }: FaqHelpCardProps) {
  const { faq } = dict;

  return (
    <div className="relative mx-auto w-full max-w-[360px] lg:w-[330px] h-[340px] lg:h-[460px]">
      {/* Desktop: curve facing right (flat left edge, arc bulging right) */}
      <Image
        src="/homepage/Faq/curve.png"
        alt=""
        fill
        className="object-contain object-center hidden lg:block absolute inset-0"
        priority
      />

      {/* Mobile: curve rotated 90deg (arc up, flat bottom) */}
      <Image
        src="/homepage/Faq/curve.png"
        alt=""
        fill
        className="object-contain object-center rotate-90 lg:hidden absolute inset-0"
        priority
      />

      {/* Copy sits inside the shape */}
      <div className="relative z-10 flex flex-col items-start gap-7 lg:gap-8">
        <h3 className="whitespace-nowrap font-poppins text-[19px] font-semibold leading-[26px] text-[#0E4A68] lg:text-[28px] lg:leading-[34px]">
          {faq.helpTitle}
        </h3>

        <Link
          href={`/${currentLocale}/contact`}
          className="inline-flex items-center justify-center rounded-[10px] border-[0.4px] border-black bg-[#0E4A68] px-6 py-3 font-poppins text-[15px] font-semibold leading-none text-white transition-all duration-300 hover:bg-[#093247] hover:scale-[1.02] focus:outline-none lg:text-[17px]"
        >
          {faq.helpButton}
        </Link>
      </div>
    </div>
  );
}

export default FaqHelpCard;
