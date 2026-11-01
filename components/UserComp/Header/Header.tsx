"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { CurrencySelector } from "./CurrencySelector";
import { LanguageSelector } from "./LanguageSelector";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

interface HeaderProps {
  currentLocale?: string;
}

export function Header({ currentLocale = "en" }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Automatically close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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

  // Detect active locale from pathname (e.g. /en/..., /fr/..., /de/..., /ru/...)
  const segments = pathname?.split("/").filter(Boolean) || [];
  const activeLocale =
    segments[0] && ["en", "ru", "de", "fr"].includes(segments[0])
      ? segments[0]
      : currentLocale;

  // Transparent header only on the home page (/<locale> and /<locale>/)
  const isHomePage = /^\/[a-z]{2,5}(\/)?$/.test(pathname ?? "");

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 w-full font-poppins font-poppins-semibold-16"
    >
      {/* Background layer: Isolated so backdrop-blur never traps fixed descendants */}
      <div
        className={`absolute inset-0 -z-10 transition-all duration-300 ${
          !isHomePage || isScrolled
            ? "bg-[#F4DAB6E6] backdrop-blur-md shadow-sm border-b border-[#0839521A]"
            : "bg-transparent border-b border-transparent pointer-events-none"
        }`}
      />

      <div className="flex h-20 w-full items-center justify-between px-4 sm:px-8 lg:px-12 xl:px-14 2xl:px-16">
        {/* Left: Brand Logo with subtle hover interaction */}
        <motion.div
          className="flex shrink-0 items-center"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <Link href={`/${activeLocale}`} className="flex items-center">
            <Image
              src="/shared/logoHeader.svg"
              alt="Egypt Tourist Market"
              width={160}
              height={50}
              priority
              className="h-10 w-auto object-contain sm:h-12"
            />
          </Link>
        </motion.div>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center px-4">
          <NavLinks currentLocale={activeLocale} />
        </div>

        {/* Right: Desktop Currency & Language Selectors */}
        <div className="hidden lg:flex lg:shrink-0 lg:items-center lg:gap-3">
          <CurrencySelector />
          <LanguageSelector currentLocale={activeLocale} />
        </div>

        {/* Mobile & Tablet Hamburger Menu Button */}
        <div className="flex items-center lg:hidden">
          <motion.button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            whileTap={{ scale: 0.9 }}
            aria-label="Open Navigation Menu"
            className="rounded-xl p-2.5 text-[#083952] hover:bg-[#FFFFFF33] focus:outline-none cursor-pointer"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Full-Screen Mobile & Tablet Menu Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentLocale={activeLocale}
      />
    </motion.header>
  );
}

export default Header;
