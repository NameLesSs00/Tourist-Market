"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

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
  const servicesDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target as Node)
      ) {
        setIsServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const serviceCategories = [
    { title: "Guided Market Tours", href: `/${currentLocale}/services/tours` },
    { title: "Artisan Handicrafts & Souvenirs", href: `/${currentLocale}/services/crafts` },
    { title: "Authentic Culinary Tastings", href: `/${currentLocale}/services/food` },
    { title: "Local Transportation & Guides", href: `/${currentLocale}/services/guides` },
  ];

  const navItemClass =
    "font-poppins-semibold-16 text-[#083952] transition-colors hover:text-[#D9943B]";

  return (
    <nav className={`flex items-center gap-7 lg:gap-8 ${className}`}>
      {/* Home */}
      <Link href={`/${currentLocale}`} onClick={onNavigate} className={navItemClass}>
        Home
      </Link>

      {/* Explore Services Dropdown */}
      <div className="relative" ref={servicesDropdownRef}>
        <button
          type="button"
          onClick={() => setIsServicesOpen((prev) => !prev)}
          className={`flex items-center gap-1.5 focus:outline-none ${navItemClass}`}
        >
          <span>Explore Services</span>
          <svg
            className={`h-3.5 w-3.5 transition-transform duration-200 ${
              isServicesOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
          </svg>
        </button>

        {isServicesOpen && (
          <div className="absolute left-0 mt-3 w-64 rounded-2xl border border-[#08395226] bg-[#FFF9F2] p-2 shadow-xl backdrop-blur-md z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-1.5 font-poppins text-[12px] font-semibold uppercase tracking-wider text-[#08395280]">
              Market Services
            </div>
            {serviceCategories.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => {
                  setIsServicesOpen(false);
                  onNavigate?.();
                }}
                className="block rounded-lg px-3 py-2 font-poppins-semibold-16 text-[#083952] transition-colors hover:bg-[#F4DAB666] hover:text-[#D9943B]"
              >
                {item.title}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Hotel Deliveries */}
      <Link
        href={`/${currentLocale}/hotel-deliveries`}
        onClick={onNavigate}
        className={navItemClass}
      >
        Hotel Deliveries
      </Link>

      {/* Blogs */}
      <Link href={`/${currentLocale}/blogs`} onClick={onNavigate} className={navItemClass}>
        Blogs
      </Link>

      {/* FAQ */}
      <Link href={`/${currentLocale}/faq`} onClick={onNavigate} className={navItemClass}>
        FAQ
      </Link>

      {/* About Us */}
      <Link href={`/${currentLocale}/about`} onClick={onNavigate} className={navItemClass}>
        About Us
      </Link>

      {/* Contact Us */}
      <Link href={`/${currentLocale}/contact`} onClick={onNavigate} className={navItemClass}>
        Contact Us
      </Link>
    </nav>
  );
}

export default NavLinks;
