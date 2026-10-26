"use client";

import React, { useState, useRef, useEffect } from "react";

export interface CurrencyOption {
  code: string;
  symbol: string;
  label: string;
}

const CURRENCIES: CurrencyOption[] = [
  { code: "USD", symbol: "$", label: "USD" },
  { code: "EUR", symbol: "€", label: "EUR" },
  { code: "GBP", symbol: "£", label: "GBP" },
];

export interface CurrencySelectorProps {
  className?: string;
  dropdownDirection?: "up" | "down";
}

export function CurrencySelector({
  className = "",
  dropdownDirection = "down",
}: CurrencySelectorProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<CurrencyOption>(CURRENCIES[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="flex items-center gap-1.5 xl:gap-2 rounded-full border border-[#08395240] bg-transparent px-2.5 py-1.5 xl:px-4 xl:py-2 text-xs xl:text-sm 2xl:text-base font-semibold text-[#083952] transition-all hover:bg-[#FFFFFF33] hover:border-[#08395280] focus:outline-none cursor-pointer whitespace-nowrap"
      >
        <span className="font-bold">{selected.symbol}</span>
        <span>{selected.label}</span>
        <svg
          className={`h-4 w-4 text-[#083952] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 w-36 rounded-xl border border-[#08395226] bg-[#FFF9F2] p-1.5 shadow-lg backdrop-blur-md z-50 animate-in fade-in zoom-in-95 duration-150 ${
            dropdownDirection === "up" ? "bottom-full mb-2 origin-bottom-right" : "mt-2 origin-top-right"
          }`}
        >
          {CURRENCIES.map((currency) => {
            const isCurrent = currency.code === selected.code;
            return (
              <button
                key={currency.code}
                type="button"
                onClick={() => {
                  setSelected(currency);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 font-poppins-semibold-16 transition-colors ${
                  isCurrent
                    ? "bg-[#F4DAB6] text-[#083952]"
                    : "text-[#083952] hover:bg-[#F4DAB666]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#083952]">{currency.symbol}</span>
                  <span>{currency.code}</span>
                </div>
                {isCurrent && (
                  <svg className="h-4 w-4 text-[#083952]" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CurrencySelector;
