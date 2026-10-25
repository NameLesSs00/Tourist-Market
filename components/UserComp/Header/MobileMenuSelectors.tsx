"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FiCheck, FiChevronDown } from "react-icons/fi";

interface CurrencyOption {
  code: string;
  symbol: string;
  label: string;
}

const CURRENCIES: CurrencyOption[] = [
  { code: "USD", symbol: "$", label: "USD - US Dollar" },
  { code: "EUR", symbol: "€", label: "EUR - Euro" },
  { code: "GBP", symbol: "£", label: "GBP - British Pound" },
];

interface LanguageOption {
  code: string;
  name: string;
  flagSrc: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English", flagSrc: "/flags/gb.svg" },
  { code: "fr", name: "Français", flagSrc: "/flags/fr.svg" },
  { code: "de", name: "Deutsch", flagSrc: "/flags/de.svg" },
  { code: "ru", name: "Русский", flagSrc: "/flags/ru.svg" },
];

export function MobileMenuSelectors({ className = "" }: { className?: string }) {
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption>(CURRENCIES[0]);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(LANGUAGES[0]);

  const currencyRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) {
        setCurrencyOpen(false);
      }
      if (languageRef.current && !languageRef.current.contains(e.target as Node)) {
        setLanguageOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`w-full space-y-3.5 ${className}`}>
      {/* Full-width Currency Dropdown */}
      <div className="relative w-full" ref={currencyRef}>
        <label className="mb-1.5 block text-xs font-semibold tracking-wider uppercase text-[#08395299]">
          Currency
        </label>
        <button
          type="button"
          onClick={() => {
            setCurrencyOpen((prev) => !prev);
            setLanguageOpen(false);
          }}
          className="flex h-12 w-full items-center justify-between rounded-xl border border-[#08395225] bg-[#FFFFFF] px-4 text-sm font-semibold text-[#083952] shadow-sm transition hover:border-[#08395260] focus:outline-none cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#08395210] font-bold text-[#083952]">
              {selectedCurrency.symbol}
            </span>
            <span>{selectedCurrency.label}</span>
          </div>
          <FiChevronDown
            className={`h-4 w-4 text-[#083952] transition-transform duration-200 ${
              currencyOpen ? "rotate-180 text-[#D9943B]" : ""
            }`}
          />
        </button>

        {currencyOpen && (
          <div className="mt-1.5 w-full overflow-hidden rounded-xl border border-[#08395220] bg-[#FFFDF9] p-1.5 shadow-lg animate-in fade-in duration-150">
            {CURRENCIES.map((item) => {
              const isActive = item.code === selectedCurrency.code;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setSelectedCurrency(item);
                    setCurrencyOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-sm font-semibold transition cursor-pointer ${
                    isActive
                      ? "bg-[#083952] text-[#FFFFFF]"
                      : "text-[#083952] hover:bg-[#0839520D]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`font-bold ${isActive ? "text-[#D48C28]" : "text-[#083952]"}`}>
                      {item.symbol}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {isActive && <FiCheck className="h-4 w-4 text-[#D48C28]" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Full-width Language Dropdown */}
      <div className="relative w-full" ref={languageRef}>
        <label className="mb-1.5 block text-xs font-semibold tracking-wider uppercase text-[#08395299]">
          Language
        </label>
        <button
          type="button"
          onClick={() => {
            setLanguageOpen((prev) => !prev);
            setCurrencyOpen(false);
          }}
          className="flex h-12 w-full items-center justify-between rounded-xl border border-[#08395225] bg-[#FFFFFF] px-4 text-sm font-semibold text-[#083952] shadow-sm transition hover:border-[#08395260] focus:outline-none cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-4 w-5 shrink-0 overflow-hidden rounded-xs border border-[#08395220]">
              <Image
                src={selectedLanguage.flagSrc}
                alt={selectedLanguage.name}
                fill
                className="object-cover"
                sizes="24px"
              />
            </span>
            <span>{selectedLanguage.name}</span>
          </div>
          <FiChevronDown
            className={`h-4 w-4 text-[#083952] transition-transform duration-200 ${
              languageOpen ? "rotate-180 text-[#D9943B]" : ""
            }`}
          />
        </button>

        {languageOpen && (
          <div className="mt-1.5 w-full overflow-hidden rounded-xl border border-[#08395220] bg-[#FFFDF9] p-1.5 shadow-lg animate-in fade-in duration-150">
            {LANGUAGES.map((item) => {
              const isActive = item.code === selectedLanguage.code;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setSelectedLanguage(item);
                    setLanguageOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-sm font-semibold transition cursor-pointer ${
                    isActive
                      ? "bg-[#083952] text-[#FFFFFF]"
                      : "text-[#083952] hover:bg-[#0839520D]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-4 w-5 shrink-0 overflow-hidden rounded-xs border border-[#08395220]">
                      <Image
                        src={item.flagSrc}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="24px"
                      />
                    </span>
                    <span>{item.name}</span>
                  </div>
                  {isActive && <FiCheck className="h-4 w-4 text-[#D48C28]" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MobileMenuSelectors;
