"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface PrivateCategoryCardProps {
  title: string;
  description: string;
  imageSrc: string;
  href: string;
}

export function PrivateCategoryCard({
  title,
  description,
  imageSrc,
  href,
}: PrivateCategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative block w-full no-underline transition-transform duration-300 hover:-translate-y-1"
    >
      <div
        className="relative flex items-center justify-between min-h-[105px] sm:min-h-[135px] lg:min-h-[155px] xl:min-h-[175px] 2xl:min-h-[195px] bg-[#FFF4E5] rounded-[16px] sm:rounded-[20px] lg:rounded-[22px] pl-[54px] sm:pl-[85px] lg:pl-[90px] xl:pl-[105px] 2xl:pl-[120px] pr-3.5 sm:pr-5 lg:pr-6 xl:pr-8 py-3 sm:py-4 lg:py-4 xl:py-5 2xl:py-6 shadow-sm"
        style={{
          border: "1px solid #D48C28",
        }}
      >
        {/* Hexagonal Image Centered Exactly on Left Border (50% Outside) */}
        <div className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[84px] sm:w-[125px] lg:w-[140px] xl:w-[170px] 2xl:w-[185px] h-[90px] sm:h-[135px] lg:h-[150px] xl:h-[180px] 2xl:h-[195px] shrink-0 transition-transform duration-300 group-hover:scale-105 pointer-events-none z-10">
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 640px) 84px, (max-width: 1024px) 125px, (max-width: 1280px) 140px, (max-width: 1536px) 170px, 185px"
            className="object-contain drop-shadow-md select-none"
          />
        </div>

        {/* Content: Title & Full Description */}
        <div className="flex-1 pr-2.5 sm:pr-4 lg:pr-5">
          <h3 className="font-poppins font-semibold text-[14px] sm:text-[17px] lg:text-[18px] xl:text-[21px] 2xl:text-[23px] text-[#0E4A68] text-left leading-[18px] sm:leading-[22px] lg:leading-[24px] xl:leading-[28px] 2xl:leading-[32px]">
            {title}
          </h3>
          <p className="font-poppins font-normal text-[10.5px] sm:text-[12.5px] lg:text-[13px] xl:text-[14.5px] 2xl:text-[15.5px] text-[#0E4A68] text-left leading-[14px] sm:leading-[17px] lg:leading-[18px] xl:leading-[21px] 2xl:leading-[23px] mt-1 sm:mt-1.5 whitespace-normal">
            {description}
          </p>
        </div>

        {/* "Explore" CTA on Bottom-Right */}
        <div className="shrink-0 self-end mb-0.5 sm:mb-1">
          <span className="font-poppins font-bold text-[11.5px] sm:text-[14px] lg:text-[16px] xl:text-[19px] text-[#0E4A68] underline decoration-solid underline-offset-[3px] sm:underline-offset-[4px] leading-[22px] sm:leading-[28px] lg:leading-[32px] xl:leading-[38px] group-hover:text-[#DE7423] transition-colors whitespace-nowrap">
            Explore
          </span>
        </div>
      </div>
    </Link>
  );
}

export default PrivateCategoryCard;
