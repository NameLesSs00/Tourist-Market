"use client";

import React, { useEffect, useMemo, useState } from "react";
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

// Shared class for the plain top-level rows so they cannot drift apart
const rowClass =
  "flex w-full items-center py-4 text-[19px] font-bold leading-none text-[#083952] transition-colors hover:text-[#D9943B]";

interface MenuSectionProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  links: { title: string; href: string }[];
  onClose: () => void;
  panelId: string;
}

/*
 * Top-level row that toggles a cream sub-card of links (Services, Excursions).
 * The card content comes from getHeaderServicesData, so adding a link only touches
 * headerServicesData.ts and the dictionaries.
 */
function MenuSection({
  label,
  isOpen,
  onToggle,
  links,
  onClose,
  panelId,
}: MenuSectionProps) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-4 py-4 text-left text-[19px] font-bold leading-none text-[#083952] transition-colors hover:text-[#D9943B] cursor-pointer"
      >
        <span>{label}</span>
        {/* No explicit color: the chevron inherits the row text color (#083952, gold on hover) */}
        <FiChevronDown
          className={`h-[18px] w-[18px] shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div
              id={panelId}
              className="mb-1 rounded-xl border border-[#08395215] bg-[#FFFEEF] px-6 py-1.5 shadow-sm"
            >
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="-mx-2 block rounded-lg py-3 text-[15px] font-semibold text-[#083952] transition-colors hover:text-[#D9943B]"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MobileMenu({ isOpen, onClose, currentLocale = "en" }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isExcursionsOpen, setIsExcursionsOpen] = useState(false);

  const dict = getDictionary(currentLocale);
  const nav = dict.nav;
  const categories = getHeaderServicesData(currentLocale);

  // Id lookup keeps the wiring independent of the order of the categories
  const byId = useMemo(
    () =>
      Object.fromEntries(
        categories.map((category) => [category.id, category] as const)
      ),
    [categories]
  );
  const serviceLinks = byId["all-services"]?.items ?? [];
  const excursionLinks = byId["excursions"]?.items ?? [];
  const transferHref =
    byId["transportation"]?.items?.[0]?.href ??
    `/${currentLocale}/services/transfer`;

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

  // Collapse both submenus once the overlay is closed, adjusted during render so the
  // next open always starts from the flat list shown in the design
  const [wasOpen, setWasOpen] = useState(isOpen);
  if (wasOpen !== isOpen) {
    setWasOpen(isOpen);
    if (!isOpen) {
      setIsServicesOpen(false);
      setIsExcursionsOpen(false);
    }
  }

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
          <div className="flex-1 overflow-y-auto">
            <nav
              aria-label="Main navigation"
              className="flex flex-col px-6 py-6 sm:px-8"
            >
              <Link
                href={`/${currentLocale}`}
                onClick={onClose}
                className={rowClass}
              >
                {nav.home}
              </Link>

              {/* Services sub-card: the tourist service destinations */}
              <MenuSection
                label={nav.services}
                panelId="mobile-menu-services"
                isOpen={isServicesOpen}
                onToggle={() => setIsServicesOpen((prev) => !prev)}
                links={serviceLinks}
                onClose={onClose}
              />

              {/* Excursions sub-card: group and private excursion pages */}
              <MenuSection
                label={nav.excursions}
                panelId="mobile-menu-excursions"
                isOpen={isExcursionsOpen}
                onToggle={() => setIsExcursionsOpen((prev) => !prev)}
                links={excursionLinks}
                onClose={onClose}
              />

              <Link href={transferHref} onClick={onClose} className={rowClass}>
                {nav.transfer}
              </Link>

              <Link
                href={`/${currentLocale}/hotel-deliveries`}
                onClick={onClose}
                className={rowClass}
              >
                {nav.hotelDeliveries}
              </Link>

              <Link
                href={`/${currentLocale}/Blogs`}
                onClick={onClose}
                className={rowClass}
              >
                {nav.blogs}
              </Link>

              <Link
                href={`/${currentLocale}/About`}
                onClick={onClose}
                className={rowClass}
              >
                {nav.about}
              </Link>

              <Link
                href={`/${currentLocale}/Contact`}
                onClick={onClose}
                className={rowClass}
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
