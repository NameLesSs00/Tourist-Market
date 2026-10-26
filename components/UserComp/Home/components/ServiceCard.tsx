"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { ServiceItem } from "@/shared/utils/servicesData";

interface ServiceCardProps {
  item: ServiceItem;
}

export function ServiceCard({ item }: ServiceCardProps) {
  return (
    <div className="relative pt-[74px] sm:pt-[82px] xl:pt-[88px] w-full flex-shrink-0 group">
      <Link
        href={item.href}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        aria-label={`${item.title} - Explore service`}
        className="block relative w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D48C28] rounded-[22px] select-none"
      >
        {/* Floating Circular Image (Ellipse): Fades out smoothly on hover */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 w-[145px] h-[145px] sm:w-[160px] sm:h-[160px] xl:w-[172px] xl:h-[172px] rounded-full border-[4px] sm:border-[5px] border-white shadow-[0_10px_28px_rgba(0,0,0,0.2)] overflow-hidden bg-white z-30 transition-all duration-500 ease-out group-hover:opacity-0 group-hover:scale-95 pointer-events-none">
          <Image
            src={item.floatingImage}
            alt={`${item.title} preview`}
            width={220}
            height={220}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Card Body: Balanced portrait card */}
        <div className="relative w-full h-[385px] sm:h-[415px] xl:h-[435px] rounded-[20px] sm:rounded-[22px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out group-hover:-translate-y-3 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)]">
          {/* Main Card Background Photo */}
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority
          />

          {/* Default Bottom Gradient Overlay (Subtle) */}
          <div
            className="absolute inset-0 transition-opacity duration-500 ease-out group-hover:opacity-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.75) 85%, #000000 100%)",
            }}
          />

          {/* Hover Bottom Gradient Overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(134, 102, 102, 0) 56.73%, #000000 95%)",
            }}
          />

          {/* Bottom Card Content: Title shifts upward, Explore button appears below */}
          <div className="absolute inset-x-0 bottom-0 pb-6 px-3.5 z-20 flex flex-col items-center justify-end text-center pointer-events-none">
            <h3 className="font-poppins font-bold text-white text-[15.5px] sm:text-[17px] xl:text-[18px] leading-tight tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:group-hover:-translate-y-2">
              {item.title}
            </h3>

            {/* Explore Button: revealed on hover */}
            <div
              className="mt-3.5 px-8 py-2 bg-white text-black font-poppins font-bold text-sm sm:text-base rounded-full shadow-[3px_3px_20px_3px_rgba(0,0,0,0.25)] border-[0.31px] border-black transition-all duration-500 ease-out opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0"
              style={{
                boxShadow: "3px 3px 20px 3px rgba(0, 0, 0, 0.25)",
                border: "0.31px solid #000000",
              }}
            >
              Explore
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ServiceCard;
