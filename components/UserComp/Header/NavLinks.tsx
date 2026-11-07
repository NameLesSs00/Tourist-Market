"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getHeaderServicesData } from "./headerServicesData";
import { useClientDictionary } from "@/shared/providers/ClientDictionaryContext";

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
  const [openMenu, setOpenMenu] = useState<"services" | "excursions" | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const dict = useClientDictionary();
  const nav = dict.nav;
  const categories = useMemo(() => getHeaderServicesData(currentLocale), [currentLocale]);

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
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
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
    setOpenMenu(null);
    onNavigate?.();
  };

  const navItemClass =
    "font-poppins-semibold-16 text-[#083952] transition-colors hover:text-[#D9943B] text-[13px] xl:text-[14.5px] 2xl:text-base whitespace-nowrap";

  return (
    <nav
      ref={navRef}
      className={`flex items-center gap-2.5 lg:gap-3 xl:gap-5 2xl:gap-7 ${className}`}
    >
      {/* Home */}
      <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
        <Link href={`/${currentLocale}`} onClick={handleNavClick} className={navItemClass}>
          {nav.home}
        </Link>
      </motion.div>

      {/* Services Dropdown */}
      <div className="relative">
        <motion.button
          type="button"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          onClick={() =>
            setOpenMenu((prev) => (prev === "services" ? null : "services"))
          }
          aria-expanded={openMenu === "services"}
          aria-haspopup="true"
          className={`flex items-center gap-1 focus:outline-none cursor-pointer py-2 ${navItemClass} ${
            openMenu === "services" ? "text-[#D9943B]" : ""
          }`}
        >
          <span>{nav.services}</span>
          <svg
            className={`h-3.5 w-3.5 transition-transform duration-200 ${
              openMenu === "services" ? "rotate-180 text-[#D9943B]" : ""
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
          {openMenu === "services" && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute top-full left-0 pt-2 z-50 origin-top"
            >
              <div className="min-w-[240px] xl:min-w-[260px] rounded-2xl bg-[#FFFEEF] border border-[#08395215] p-2 shadow-[0px_16px_45px_rgba(8,57,82,0.12)]">
                {serviceLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick}
                    className="block rounded-xl px-3.5 py-2.5 font-poppins-semibold-16 text-[#083952] hover:bg-[#0839520A] hover:text-[#D9943B] text-[13px] xl:text-[14px] transition-colors whitespace-nowrap"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Excursions Dropdown */}
      <div className="relative">
        <motion.button
          type="button"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          onClick={() =>
            setOpenMenu((prev) => (prev === "excursions" ? null : "excursions"))
          }
          aria-expanded={openMenu === "excursions"}
          aria-haspopup="true"
          className={`flex items-center gap-1 focus:outline-none cursor-pointer py-2 ${navItemClass} ${
            openMenu === "excursions" ? "text-[#D9943B]" : ""
          }`}
        >
          <span>{nav.excursions}</span>
          <svg
            className={`h-3.5 w-3.5 transition-transform duration-200 ${
              openMenu === "excursions" ? "rotate-180 text-[#D9943B]" : ""
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
          {openMenu === "excursions" && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute top-full left-0 pt-2 z-50 origin-top"
            >
              <div className="min-w-[210px] xl:min-w-[230px] rounded-2xl bg-[#FFFEEF] border border-[#08395215] p-2 shadow-[0px_16px_45px_rgba(8,57,82,0.12)]">
                {excursionLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick}
                    className="block rounded-xl px-3.5 py-2.5 font-poppins-semibold-16 text-[#083952] hover:bg-[#0839520A] hover:text-[#D9943B] text-[13px] xl:text-[14px] transition-colors whitespace-nowrap"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Transfer Link */}
      <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
        <Link href={transferHref} onClick={handleNavClick} className={navItemClass}>
          {nav.transfer}
        </Link>
      </motion.div>

      {/* Hotel Deliveries */}
      <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
        <Link
          href={`/${currentLocale}/hotel-deliveries`}
          onClick={handleNavClick}
          className={navItemClass}
        >
          {nav.hotelDeliveries}
        </Link>
      </motion.div>

      {/* Blogs */}
      <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
        <Link href={`/${currentLocale}/Blogs`} onClick={handleNavClick} className={navItemClass}>
          {nav.blogs}
        </Link>
      </motion.div>

      {/* About Us */}
      <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
        <Link href={`/${currentLocale}/About`} onClick={handleNavClick} className={navItemClass}>
          {nav.about}
        </Link>
      </motion.div>

      {/* Contact Us */}
      <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
        <Link href={`/${currentLocale}/Contact`} onClick={handleNavClick} className={navItemClass}>
          {nav.contact}
        </Link>
      </motion.div>
    </nav>
  );
}

export default NavLinks;
