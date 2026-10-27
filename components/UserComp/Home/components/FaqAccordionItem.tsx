import React from "react";
import Image from "next/image";
import type { FaqItem } from "@/models/faq";

interface FaqAccordionItemProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
  isDesktop?: boolean;
}

/** Circled plus, shown when the question is closed. */
function PlusIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5 sm:h-6 sm:w-6 xl:h-7 xl:w-7"
    >
      <circle cx="14" cy="14" r="13" stroke="#0E4A68" strokeWidth="1.5" />
      <path d="M8.5 14H19.5M14 8.5V19.5" stroke="#0E4A68" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/** Circled cross, shown when the question is open. Two equal strokes at 45deg. */
function CrossIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className="h-5 w-5 sm:h-6 sm:w-6 xl:h-7 xl:w-7"
    >
      <circle cx="14" cy="14" r="13" stroke="#0E4A68" strokeWidth="1.5" />
      <path
        d="M9.5 9.5L18.5 18.5M18.5 9.5L9.5 18.5"
        stroke="#0E4A68"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
  className = "",
  isDesktop = false,
}: FaqAccordionItemProps) {
  return (
    <div className={`relative select-none ${className}`}>
      <button
        type="button"
        onClick={onToggle}
        onDragStart={(e) => e.preventDefault()}
        aria-expanded={isOpen}
        className={`relative flex min-h-[72px] sm:min-h-[82px] xl:min-h-[88px] 2xl:min-h-[92px] w-full items-center justify-between gap-3.5 rounded-[16px] sm:rounded-[18px] border border-[#0E4A68] bg-[#FFF4E5] py-4 sm:py-5 xl:py-5.5 pl-11 sm:pl-13 xl:pl-14 pr-4 sm:pr-5 text-left transition-all duration-200 hover:bg-[#FFF9F0] focus:outline-none cursor-pointer shadow-2xs select-none ${
          isOpen ? "ring-2 ring-[#0E4A6826] bg-[#FFF8EF]" : ""
        }`}
      >
        {/* Question badge: vertically centered on the left border */}
        <span className="pointer-events-none select-none absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 xl:h-[52px] xl:w-[52px] items-center justify-center rounded-full border border-[#0E4A68] bg-[#FFF8EF] shadow-2xs">
          <Image
            src="/homepage/Faq/mark.svg"
            alt=""
            width={16}
            height={26}
            draggable={false}
            className="h-4.5 w-auto sm:h-5.5 xl:h-[25px] xl:w-auto pointer-events-none select-none"
          />
        </span>

        <span className="flex-1 font-poppins text-[15px] sm:text-[16.5px] xl:text-[17.5px] 2xl:text-[18px] font-semibold leading-snug text-[#0E4A68] select-none pointer-events-none">
          {item.question}
        </span>

        <span className="shrink-0 text-[#0E4A68] select-none pointer-events-none">
          {isOpen ? <CrossIcon /> : <PlusIcon />}
        </span>
      </button>

      {/* Mobile & Tablet: inline expandable answer */}
      {!isDesktop && (
        <div
          className={`grid overflow-hidden transition-all duration-300 ease-out ${
            isOpen ? "grid-rows-[1fr] opacity-100 mt-2.5" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0">
            <div className="rounded-[16px] border border-[#0E4A6880] bg-[#FFF8EF] p-4.5 sm:p-5 shadow-2xs">
              <p className="font-poppins text-xs sm:text-sm font-normal leading-relaxed text-[#1E293B]">
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FaqAccordionItem;

