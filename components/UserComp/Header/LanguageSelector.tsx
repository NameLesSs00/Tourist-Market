"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export interface LanguageOption {
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

export interface LanguageSelectorProps {
  className?: string;
  dropdownDirection?: "up" | "down";
  currentLocale?: string;
}

export function LanguageSelector({
  className = "",
  dropdownDirection = "down",
  currentLocale = "en",
}: LanguageSelectorProps = {}) {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const initial = LANGUAGES.find((l) => l.code === currentLocale) || LANGUAGES[0];
  const [selected, setSelected] = useState<LanguageOption>(initial);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const match = LANGUAGES.find((l) => l.code === currentLocale);
    if (match) setSelected(match);
  }, [currentLocale]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: LanguageOption) => {
    setSelected(lang);
    setIsOpen(false);

    // Save choice to cookie
    document.cookie = `NEXT_LOCALE=${lang.code}; path=/; max-age=31536000; SameSite=Lax`;

    // Swap locale in pathname
    const segments = pathname?.split("/").filter(Boolean) || [];
    if (segments.length > 0 && ["en", "fr", "de", "ru"].includes(segments[0])) {
      segments[0] = lang.code;
      router.push("/" + segments.join("/"));
    } else {
      router.push(`/${lang.code}${pathname === "/" ? "" : pathname}`);
    }
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <motion.button
        type="button"
        whileTap={{ scale: 0.96 }}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="flex items-center gap-1.5 xl:gap-2 rounded-full border border-[#08395240] bg-transparent px-2.5 py-1.5 xl:px-4 xl:py-2 text-xs xl:text-sm 2xl:text-base font-semibold text-[#083952] transition-all hover:bg-[#FFFFFF33] hover:border-[#08395280] focus:outline-none cursor-pointer whitespace-nowrap"
      >
        <span className="relative flex h-4 w-5 shrink-0 overflow-hidden rounded-xs border border-[#08395226]">
          <Image
            src={selected.flagSrc}
            alt={selected.name}
            fill
            className="object-cover"
            sizes="24px"
          />
        </span>
        <span>{selected.name}</span>
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
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: dropdownDirection === "up" ? 6 : -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: dropdownDirection === "up" ? 6 : -6, scale: 0.96 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className={`absolute right-0 w-40 rounded-xl border border-[#08395226] bg-[#FFF9F2] p-1.5 shadow-lg backdrop-blur-md z-50 ${
              dropdownDirection === "up" ? "bottom-full mb-2 origin-bottom-right" : "mt-2 origin-top-right"
            }`}
          >
            {LANGUAGES.map((lang) => {
              const isCurrent = lang.code === selected.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleLanguageChange(lang)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 font-poppins-semibold-16 transition-colors cursor-pointer ${
                    isCurrent
                      ? "bg-[#F4DAB6] text-[#083952]"
                      : "text-[#083952] hover:bg-[#F4DAB666]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-4 w-5 shrink-0 overflow-hidden rounded-xs border border-[#08395226]">
                      <Image
                        src={lang.flagSrc}
                        alt={lang.name}
                        fill
                        className="object-cover"
                        sizes="24px"
                      />
                    </span>
                    <span>{lang.name}</span>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LanguageSelector;
