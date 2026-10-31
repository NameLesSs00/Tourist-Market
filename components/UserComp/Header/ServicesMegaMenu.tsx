"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MegaMenuCategory } from "./headerServicesData";

interface ServicesMegaMenuProps {
  categories: MegaMenuCategory[];
  isOpen: boolean;
  onClose: () => void;
}

export function ServicesMegaMenu({
  categories,
  isOpen,
  onClose,
}: ServicesMegaMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-[-24px] lg:left-[-32px] xl:left-[-40px] pt-3 z-50 animate-in fade-in zoom-in-95 duration-150">
      {/* Main Filter Panel Matching PromptsUi/Filter.png with #FFFEEF background */}
      <div
        className="w-[660px] lg:w-[700px] xl:w-[780px] rounded-[24px] xl:rounded-[28px] bg-[#FFFEEF] border border-[#08395215] p-6 lg:p-7 xl:p-8 shadow-[0px_16px_45px_rgba(8,57,82,0.12)]"
        style={{
          boxShadow: "0px 16px 45px 0px rgba(8, 57, 82, 0.12)",
        }}
      >
        <div className="grid grid-cols-3 gap-6 lg:gap-8 xl:gap-11 items-start">
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col">
              {/* Category Header with Icon and Underline */}
              <div className="inline-flex flex-col pb-1">
                <div className="flex items-center gap-2 lg:gap-2.5">
                  <div className="w-[18px] h-[18px] relative flex-shrink-0 flex items-center justify-center">
                    <Image
                      src={category.iconSrc}
                      alt={category.iconAlt}
                      width={18}
                      height={18}
                      className="w-auto h-auto object-contain max-h-[18px] max-w-[18px]"
                    />
                  </div>
                  <h4 className="font-poppins font-bold text-[#0A354A] text-[15.5px] lg:text-[16.5px] xl:text-[17.5px] tracking-tight whitespace-nowrap">
                    {category.title}
                  </h4>
                </div>
                {/* Dark underline spanning the category header */}
                <div className="mt-2 h-[2px] bg-[#0A354A] w-full rounded-full" />
              </div>

              {/* Items List */}
              <ul className="mt-4 lg:mt-5 space-y-3.5 lg:space-y-4 flex flex-col">
                {category.items.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="inline-block font-poppins font-semibold text-[#0A354A] hover:text-[#D48C28] text-[13px] lg:text-[14px] xl:text-[15px] leading-snug tracking-tight transition-all duration-200 hover:translate-x-1"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServicesMegaMenu;
