import React from "react";
import type { FaqItem } from "@/models/faq";

interface FaqAnswerPanelProps {
  item?: FaqItem;
}

export function FaqAnswerPanel({ item }: FaqAnswerPanelProps) {
  return (
    <div className="relative w-full">
      {/* Speech callout pointer arrow on left edge */}
      <svg
        width="14"
        height="24"
        viewBox="0 0 14 24"
        fill="none"
        className="absolute -left-[13px] top-8 z-20 pointer-events-none"
        aria-hidden="true"
      >
        <path
          d="M13.5 1.5 L1.5 12 L13.5 22.5"
          fill="#FFF4E5"
          stroke="#0E4A68"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        {/* Inner fill masking the card border */}
        <path d="M14 2 L3 12 L14 22 Z" fill="#FFF4E5" />
      </svg>

      {/* Proportional, fluid answer card matching FAQDesktop.png */}
      <div className="relative z-10 flex min-h-[280px] xl:min-h-[300px] w-full flex-col rounded-[18px] border border-[#0E4A68] bg-[#FFF4E5] p-6 sm:p-7.5 xl:p-8 shadow-xs transition-all duration-200">
        {item ? (
          <div className="animate-in fade-in duration-200 space-y-4">
            <h3 className="font-poppins text-base font-bold leading-snug text-[#0E4A68] sm:text-[17.5px] xl:text-[18.5px]">
              {item.question}
            </h3>
            <p className="font-poppins text-sm leading-relaxed text-[#1E293B] sm:text-[15.5px] xl:text-[16px]">
              {item.answer}
            </p>
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center text-center py-8">
            <p className="font-poppins text-sm text-[#0E4A6899]">
              Select a question on the left to read the answer.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FaqAnswerPanel;
