"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiX } from "react-icons/fi";
import { MobileMenuSelectors } from "./MobileMenuSelectors";
import { getHeaderServicesData } from "./headerServicesData";
import { getDictionary } from "@/shared/utils/getDictionary";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocale?: string;
}

export function MobileMenu({ isOpen, onClose, currentLocale = "en" }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const dict = getDictionary(currentLocale);
  const nav = dict.nav;
  const categories = getHeaderServicesData(currentLocale);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) return null;

  const content = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col bg-[#FFF4E5] text-[#083952] lg:hidden"
        >
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
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              aria-label="Close navigation menu"
              className="rounded-full p-2.5 text-[#083952] transition hover:bg-[#08395210] focus:outline-none cursor-pointer"
            >
              <FiX className="h-7 w-7" />
            </motion.button>
          </div>

          {/* Middle scrollable navigation links */}
          <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
            <nav className="flex flex-col space-y-3 text-lg font-semibold">
              <Link
                href={`/${currentLocale}`}
                onClick={onClose}
                className="rounded-xl px-3 py-2.5 text-[#083952] transition hover:bg-[#0839520D] hover:text-[#D9943B]"
              >
                {nav.home}
              </Link>

              {/* Explore Services Accordion matching Filter.png grouping */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsServicesOpen((prev) => !prev)}
                  aria-expanded={isServicesOpen}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[#083952] transition hover:bg-[#0839520D] hover:text-[#D9943B] cursor-pointer"
                >
                  <span>{nav.exploreServices}</span>
                  <FiChevronDown
                    className={`h-5 w-5 text-[#083952] transition-transform duration-200 ${
                      isServicesOpen ? "rotate-180 text-[#D9943B]" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 ml-1 flex flex-col space-y-4 rounded-2xl bg-[#FFFEEF] p-4 border border-[#08395215] shadow-sm">
                        {categories.map((category) => (
                          <div key={category.id} className="flex flex-col">
                            {/* Category Header with Icon and Underline */}
                            <div className="inline-flex flex-col pb-1">
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 relative flex-shrink-0 flex items-center justify-center">
                                  <Image
                                    src={category.iconSrc}
                                    alt={category.iconAlt}
                                    width={16}
                                    height={16}
                                    className="w-auto h-auto object-contain max-h-4 max-w-4"
                                  />
                                </div>
                                <h5 className="font-poppins font-bold text-[#0A354A] text-sm tracking-tight">
                                  {category.title}
                                </h5>
                              </div>
                              <div className="mt-1 h-[1.5px] bg-[#0A354A] w-full rounded-full" />
                            </div>

                            {/* Category Links */}
                            <div className="mt-2 flex flex-col space-y-1 pl-1">
                              {category.items.map((item) => (
                                <Link
                                  key={item.title}
                                  href={item.href}
                                  onClick={onClose}
                                  className="rounded-lg px-2 py-1.5 text-[13.5px] font-semibold text-[#083952CC] transition hover:bg-[#0839520D] hover:text-[#D9943B]"
                                >
                                  {item.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href={`/${currentLocale}/hotel-deliveries`}
                onClick={onClose}
                className="rounded-xl px-3 py-2.5 text-[#083952] transition hover:bg-[#0839520D] hover:text-[#D9943B]"
              >
                {nav.hotelDeliveries}
              </Link>

              <Link
                href={`/${currentLocale}/Blogs`}
                onClick={onClose}
                className="rounded-xl px-3 py-2.5 text-[#083952] transition hover:bg-[#0839520D] hover:text-[#D9943B]"
              >
                {nav.blogs}
              </Link>

              <Link
                href={`/${currentLocale}/About`}
                onClick={onClose}
                className="rounded-xl px-3 py-2.5 text-[#083952] transition hover:bg-[#0839520D] hover:text-[#D9943B]"
              >
                {nav.about}
              </Link>

              <Link
                href={`/${currentLocale}/Contact`}
                onClick={onClose}
                className="rounded-xl px-3 py-2.5 text-[#083952] transition hover:bg-[#0839520D] hover:text-[#D9943B]"
              >
                {nav.contact}
              </Link>

              {/* Dedicated full-width Currency & Language Selectors directly under the tabs */}
              <div className="pt-5 mt-2 border-t border-[#0839521A] px-1 w-full">
                <MobileMenuSelectors currentLocale={currentLocale} onSelectLocale={onClose} />
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}

export default MobileMenu;
