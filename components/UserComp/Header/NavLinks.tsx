"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ServicesMegaMenu } from "./ServicesMegaMenu";
import { getHeaderServicesData } from "./headerServicesData";

interface NavLinksProps {
  currentLocale?: string;
  onNavigate?: () => void;
  className?: string;
}

export function NavLinks({
  currentLocale = "en",
  onNavigate,
  className = "",
}: NavLinksProps) {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const servicesCategories = getHeaderServicesData(currentLocale);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsServicesOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsServicesOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleNavClick = () => {
    setIsServicesOpen(false);
    onNavigate?.();
  };

  const navItemClass =
    "font-poppins-semibold-16 text-[#083952] transition-colors hover:text-[#D9943B] text-[13.5px] xl:text-[15px] 2xl:text-base whitespace-nowrap";

  return (
    <nav className={`flex items-center gap-3 lg:gap-4 xl:gap-6 2xl:gap-8 ${className}`}>
      {/* Home */}
      <Link href={`/${currentLocale}`} onClick={handleNavClick} className={navItemClass}>
        Home
      </Link>

      {/* Explore Services Dropdown (Click to toggle, stays open until click outside or selection) */}
      <div className="relative" ref={containerRef}>
        <button
          type="button"
          onClick={() => setIsServicesOpen((prev) => !prev)}
          aria-expanded={isServicesOpen}
          aria-haspopup="true"
          className={`flex items-center gap-1.5 focus:outline-none cursor-pointer py-2 ${navItemClass} ${
            isServicesOpen ? "text-[#D9943B]" : ""
          }`}
        >
          <span>Explore Services</span>
          <svg
            className={`h-3.5 w-3.5 transition-transform duration-200 ${
              isServicesOpen ? "rotate-180 text-[#D9943B]" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
          </svg>
        </button>

        {/* 3-Column Services Mega Menu */}
        <ServicesMegaMenu
          categories={servicesCategories}
          isOpen={isServicesOpen}
          onClose={handleNavClick}
        />
      </div>

      {/* Hotel Deliveries */}
      <Link
        href={`/${currentLocale}/hotel-deliveries`}
        onClick={handleNavClick}
        className={navItemClass}
      >
        Hotel Deliveries
      </Link>

      {/* Blogs */}
      <Link href={`/${currentLocale}/Blogs`} onClick={handleNavClick} className={navItemClass}>
        Blogs
      </Link>

      {/* About Us */}
      <Link href={`/${currentLocale}/About`} onClick={handleNavClick} className={navItemClass}>
        About Us
      </Link>

      {/* Contact Us */}
      <Link href={`/${currentLocale}/Contact`} onClick={handleNavClick} className={navItemClass}>
        Contact Us
      </Link>
    </nav>
  );
}

export default NavLinks;
