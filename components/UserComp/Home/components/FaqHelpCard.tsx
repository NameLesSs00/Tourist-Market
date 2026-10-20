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
        className="object-contain object-center rotate-90 lg:hidden absolute inset-0 scale-120 -ml-7"
        priority
      />

      {/* Copy shifted up and enlarged so it sits in the upper-center of the curve */}
      <div className="absolute left-[45%] top-[40%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-8 lg:gap-9 w-[250px]">
        <h3 className="whitespace-nowrap font-poppins text-[22px] font-semibold leading-[30px] text-[#0E4A68] lg:text-[32px] lg:leading-[38px]">
          {faq.helpTitle}
        </h3>

        <Link
          href={`/${currentLocale}/contact`}
          className="inline-flex items-center justify-center rounded-[12px] border-[0.4px] border-black bg-[#0E4A68] px-8 py-3.5 font-poppins text-[17px] font-semibold leading-none text-white transition-all duration-300 hover:bg-[#093247] hover:scale-[1.02] focus:outline-none lg:text-[20px]"
        >
          {faq.helpButton}
        </Link>
      </div>
    </div>
  );
}

export default FaqHelpCard;
