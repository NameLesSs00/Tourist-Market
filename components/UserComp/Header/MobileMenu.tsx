"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronDown, FiX } from "react-icons/fi";
import { MobileMenuSelectors } from "./MobileMenuSelectors";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocale?: string;
}

export function MobileMenu({ isOpen, onClose, currentLocale = "en" }: MobileMenuProps) {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const serviceCategories = [
    { title: "Guided Market Tours", href: `/${currentLocale}/services/tours` },
    { title: "Artisan Handicrafts & Souvenirs", href: `/${currentLocale}/services/crafts` },
    { title: "Authentic Culinary Tastings", href: `/${currentLocale}/services/food` },
    { title: "Local Transportation & Guides", href: `/${currentLocale}/services/guides` },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#FFF4E5] text-[#083952] lg:hidden animate-in fade-in duration-200">
      {/* Top Bar with Brand Logo and Close button */}
      <div className="flex h-20 shrink-0 items-center justify-between border-b border-[#08395215] px-4 sm:px-6">
        <Link href={`/${currentLocale}`} onClick={onClose} className="flex items-center">
          <Image
            src="/shared/logoHeader.svg"
            alt="Egypt Tourist Market"
            width={150}
            height={46}
            className="h-10 w-auto object-contain sm:h-11"
          />
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="rounded-full p-2.5 text-[#083952] transition hover:bg-[#08395210] focus:outline-none cursor-pointer"
        >
          <FiX className="h-7 w-7" />
        </button>
      </div>

      {/* Middle scrollable navigation links */}
      <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
        <nav className="flex flex-col space-y-3 text-lg font-semibold">
          <Link
            href={`/${currentLocale}`}
            onClick={onClose}
            className="rounded-xl px-3 py-2.5 text-[#083952] transition hover:bg-[#0839520D] hover:text-[#D9943B]"
          >
            Home
          </Link>

          {/* Explore Services Accordion */}
          <div>
            <button
              type="button"
              onClick={() => setIsServicesOpen((prev) => !prev)}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[#083952] transition hover:bg-[#0839520D] hover:text-[#D9943B] cursor-pointer"
            >
              <span>Explore Services</span>
              <FiChevronDown
                className={`h-5 w-5 text-[#083952] transition-transform duration-200 ${
                  isServicesOpen ? "rotate-180 text-[#D9943B]" : ""
                }`}
              />
            </button>
            {isServicesOpen && (
              <div className="mt-1 ml-3 flex flex-col space-y-1.5 border-l-2 border-[#D48C2840] pl-3 py-1">
                {serviceCategories.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={onClose}
                    className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-[#083952CC] transition hover:bg-[#0839520D] hover:text-[#D9943B]"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href={`/${currentLocale}/hotel-deliveries`}
            onClick={onClose}
            className="rounded-xl px-3 py-2.5 text-[#083952] transition hover:bg-[#0839520D] hover:text-[#D9943B]"
          >
            Hotel Deliveries
          </Link>

          <Link
            href={`/${currentLocale}/Blogs`}
            onClick={onClose}
            className="rounded-xl px-3 py-2.5 text-[#083952] transition hover:bg-[#0839520D] hover:text-[#D9943B]"
          >
            Blogs
          </Link>

          <Link
            href={`/${currentLocale}/FAQ`}
            onClick={onClose}
            className="rounded-xl px-3 py-2.5 text-[#083952] transition hover:bg-[#0839520D] hover:text-[#D9943B]"
          >
            FAQ
          </Link>

          <Link
            href={`/${currentLocale}/About`}
            onClick={onClose}
            className="rounded-xl px-3 py-2.5 text-[#083952] transition hover:bg-[#0839520D] hover:text-[#D9943B]"
          >
            About Us
          </Link>

          <Link
            href={`/${currentLocale}/Contact`}
            onClick={onClose}
            className="rounded-xl px-3 py-2.5 text-[#083952] transition hover:bg-[#0839520D] hover:text-[#D9943B]"
          >
            Contact Us
          </Link>

          {/* Dedicated full-width Currency & Language Selectors directly under the tabs */}
          <div className="pt-5 mt-2 border-t border-[#0839521A] px-1 w-full">
            <MobileMenuSelectors />
          </div>
        </nav>
      </div>
    </div>
  );
}

export default MobileMenu;
