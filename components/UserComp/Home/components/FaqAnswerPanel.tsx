import React from "react";
import type { FaqItem } from "@/models/faq";

interface FaqAnswerPanelProps {
  item?: FaqItem;
}

export function FaqAnswerPanel({ item }: FaqAnswerPanelProps) {
  return (
    <div className="relative hidden lg:block">
      {/* Single stroked triangle: even 1px outline on all visible edges,
          so it lines up with the panel border instead of drifting. */}
      <svg
        width="16"
        height="28"
        viewBox="0 0 16 28"
        fill="none"
        className="absolute -left-[15px] top-4 z-0"
        aria-hidden="true"
      >
        <path
          d="M15.5 1.5 L15.5 26.5 L1 14 Z"
          fill="#FFF4E5"
          stroke="#0E4A68CC"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>

      {/* Always mounted on desktop at a fixed height, so it never unmounts
          and never reflows the row when the selection changes. */}
      <div className="relative z-10 flex min-h-[440px] w-full flex-col rounded-[14px] border border-[#0E4A68CC] bg-[#FFF4E5] px-8 py-7">
        {item ? (
          <>
            <h3 className="font-poppins text-[20px] font-semibold leading-[28px] text-[#0E4A68]">
              {item.question}
            </h3>
            <p className="mt-5 font-poppins text-[20px] font-normal leading-[30px] text-[#000000]">
              {item.answer}
            </p>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="font-poppins text-[18px] font-normal leading-[28px] text-[#0E4A68AA]">
              Select a question to see the answer.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FaqAnswerPanel;
