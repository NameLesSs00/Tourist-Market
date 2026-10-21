"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CurrencySelector } from "./CurrencySelector";
import { LanguageSelector } from "./LanguageSelector";
import { NavLinks } from "./NavLinks";

interface HeaderProps {
  currentLocale?: string;
}

export function Header({ currentLocale = "en" }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Must come after all hooks to keep hook order stable across routes.
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full font-poppins font-poppins-semibold-16 transition-all duration-300 ${
        isScrolled
          ? "bg-[#F4DAB6E6] backdrop-blur-md shadow-sm border-b border-[#0839521A]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo */}
        <div className="flex shrink-0 items-center">
          <Link href={`/${currentLocale}`} className="flex items-center">
            <Image
              src="/shared/logoHeader.svg"
              alt="Egypt Tourist Market"
              width={160}
              height={50}
              priority
              className="h-10 w-auto object-contain sm:h-12"
            />
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden lg:flex lg:items-center lg:justify-center">
          <NavLinks currentLocale={currentLocale} />
        </div>

        {/* Right: Currency & Language Selectors */}
        <div className="hidden md:flex md:items-center md:gap-3">
          <CurrencySelector />
          <LanguageSelector />
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <CurrencySelector />
          <LanguageSelector />
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Navigation Menu"
            className="rounded-lg p-2 text-[#083952] hover:bg-[#FFFFFF33] focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="border-t border-[#0839521A] bg-[#F4DAB6FA] px-4 py-6 shadow-lg backdrop-blur-lg lg:hidden">
          <NavLinks
            currentLocale={currentLocale}
            onNavigate={() => setIsMobileMenuOpen(false)}
            className="flex flex-col items-start gap-4"
          />
        </div>
      )}
    </header>
  );
}

export default Header;
