"use client";

import React from "react";
import Link from "next/link";
import { getDictionary } from "@/shared/utils/getDictionary";

interface EmptyCartStateProps {
  locale?: string;
}

export function EmptyCartState({ locale = "en" }: EmptyCartStateProps) {
  const t = getDictionary(locale).cartPage.empty;
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderColor: "#888888",
      }}
      className="w-full min-h-[340px] sm:min-h-[380px] flex flex-col items-center justify-center p-6 sm:p-12 text-center border md:border-t-0 rounded-[8px] md:rounded-t-none"
    >
      <h3 className="font-poppins text-[20px] sm:text-[24px] font-semibold text-[#0E4A68] mb-6">
        {t.title}
      </h3>

      <Link
        href={`/${locale}/hotel-deliveries`}
        style={{
          backgroundColor: "#0E4A68",
          border: "0.25px solid #000000",
          borderRadius: "5px",
        }}
        className="px-8 py-3 text-white font-poppins text-[15px] font-semibold shadow-sm transition-all duration-200 hover:brightness-110 active:scale-[0.98] inline-block"
      >
        {t.cta}
      </Link>
    </div>
  );
}

export default EmptyCartState;
