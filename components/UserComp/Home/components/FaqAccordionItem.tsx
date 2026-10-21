import React from "react";
import Image from "next/image";
import type { FaqItem } from "@/models/faq";

interface FaqAccordionItemProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

/** Circled plus, shown when the question is closed. */
function PlusIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5 lg:h-[26px] lg:w-[26px]"
    >
      <circle cx="13" cy="13" r="12" stroke="#0E4A68" strokeWidth="1.5" />
      <path d="M8 13H18M13 8V18" stroke="#0E4A68" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/** Circled cross, shown when the question is open. Two equal strokes at 45deg. */
function CrossIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5 lg:h-[26px] lg:w-[26px]"
    >
      <circle cx="13" cy="13" r="12" stroke="#0E4A68" strokeWidth="1.5" />
      <path
        d="M8.8 8.8L17.2 17.2M17.2 8.8L8.8 17.2"
        stroke="#0E4A68"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FaqAccordionItem({ item, isOpen, onToggle, className = "" }: FaqAccordionItemProps) {
  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="relative flex min-h-[76px] w-full items-center   gap-3 rounded-[10px] border border-[#0E4A68] bg-[#FFF4E5] py-4 pl-[56px] pr-3 text-left transition-colors hover:bg-[#FFF9F0] focus:outline-none lg:min-h-[92px] lg:gap-5 lg:py-5 lg:pl-[64px] lg:pr-4 flex-center"
      >
        {/* Question badge: centered on the left edge, overhanging naturally */}
        <span className="absolute left-0 top-4 -translate-x-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-[#0E4A68] bg-[#FFF8EF] lg:top-5 lg:h-[64px] lg:w-[64px]">
          <Image
            src="/homepage/Faq/mark.svg"
            alt=""
            width={20}
            height={34}
            className="h-[18px] w-auto lg:h-[30px] lg:w-auto"
          />
        </span>

        <span className="flex-1 font-poppins text-[13px] font-semibold leading-[18px] text-[#0E4A68] lg:text-[20px] lg:leading-[28px]">
          {item.question}
        </span>

        <span className="mt-[3px] shrink-0 lg:mt-[6px]">{isOpen ? <CrossIcon /> : <PlusIcon />}</span>
      </button>

      {/* Mobile: answer expands inline under the question with a clean bg box */}
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-out lg:hidden ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <div className="mt-2 rounded-[10px] border border-[#0E4A68] bg-[#FFF4E5] p-4">
            <p className="font-poppins text-[13px] font-normal leading-[21px] text-[#000000]">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaqAccordionItem;
