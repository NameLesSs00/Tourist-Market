"use client";

import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import { HotelDeliveriesHero } from "../components/HotelDeliveriesHero";
import { HotelDeliveriesCategories } from "../components/HotelDeliveriesCategories";
import { HotelDeliveriesProducts } from "../components/HotelDeliveriesProducts";
import { FloatingCartButton } from "../components/FloatingCartButton";
import { useClientDictionary } from "@/shared/providers/ClientDictionaryContext";

interface HotelDeliveriesSectionProps {
  locale?: string;
}

export function HotelDeliveriesSection({ locale = "en" }: HotelDeliveriesSectionProps) {
  const dict = useClientDictionary();
  const t = dict.hotelDeliveriesPage.categories;
  const [activeSubcategoryId, setActiveSubcategoryId] = useState<number | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <div className="w-full bg-[#FFF9F0] min-h-screen">
      {/* ─── 1. Hero Section ─── */}
      <HotelDeliveriesHero locale={locale} />

      {/* ─── 2. Categories & Products Main Section ─── */}
      <div className="w-full bg-[#FFF9F0] py-6 sm:py-10 lg:py-16">
        <div className="mx-auto w-full max-w-[1440px] px-3.5 sm:px-6 md:px-10 lg:px-16">
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-10 xl:gap-14">
            {/* Left Column: Categories Sidebar (Desktop only) */}
            <div className="hidden lg:block shrink-0">
              <HotelDeliveriesCategories
                activeSubcategoryId={activeSubcategoryId}
                onSelectSubcategory={setActiveSubcategoryId}
                locale={locale}
              />
            </div>

            {/* Right Column: Search, Sort, Product Grid, Pagination */}
            <HotelDeliveriesProducts
              locale={locale}
              activeSubcategoryId={activeSubcategoryId}
              onToggleFilter={() => setIsMobileFilterOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* ─── 3. Mobile Categories Filter Drawer ─── */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: -32, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-[300px] max-w-[85vw] bg-[#FFF9F0] h-full shadow-2xl z-10 p-5 sm:p-6 overflow-y-auto flex flex-col justify-between font-poppins"
          >
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-[#0E4A68]/15 mb-4">
                <h3 className="text-[18px] sm:text-[20px] font-bold text-[#0E4A68]">
                  {t.title}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#0E4A68] hover:bg-[#0E4A68]/10 transition-colors"
                  aria-label={t.closeFilters}
                >
                  <FiX size={18} />
                </button>
              </div>

              <HotelDeliveriesCategories
                activeSubcategoryId={activeSubcategoryId}
                onSelectSubcategory={(subId) => {
                  setActiveSubcategoryId(subId);
                  setIsMobileFilterOpen(false);
                }}
                hideTitle
                locale={locale}
              />
            </div>

            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full mt-6 py-2.5 bg-[#0E4A68] text-white rounded-[5px] text-[13px] sm:text-[14px] font-semibold text-center hover:bg-[#0A3850] active:scale-98 transition-all cursor-pointer"
            >
              {t.applyFilter}
            </button>
          </motion.div>
        </div>
      )}

      {/* ─── 4. Floating Cart Button ─── */}
      <FloatingCartButton locale={locale} />
    </div>
  );
}

export default HotelDeliveriesSection;
