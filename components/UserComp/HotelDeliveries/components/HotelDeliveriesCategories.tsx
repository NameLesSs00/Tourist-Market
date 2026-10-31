"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";
import {
  useClientProductCategoriesQuery,
  useClientProductSubcategoriesQuery,
} from "@/features/productCategories/useClientProductCategories";
import type { ProductSubcategoryItem } from "@/models/productSubcategory";

interface HotelDeliveriesCategoriesProps {
  activeSubcategoryId: number | null;
  onSelectSubcategory: (id: number | null) => void;
  hideTitle?: boolean;
  locale?: string;
}

export function HotelDeliveriesCategories({
  activeSubcategoryId,
  onSelectSubcategory,
  hideTitle = false,
  locale = "en",
}: HotelDeliveriesCategoriesProps) {
  const categoriesQuery = useClientProductCategoriesQuery(locale);
  const subcategoriesQuery = useClientProductSubcategoriesQuery(undefined, locale);

  const categories = categoriesQuery.data || [];
  const subcategories = subcategoriesQuery.data || [];

  const [openSections, setOpenSections] = useState<Record<number, boolean>>({});

  // Group real subcategories by their parent categoryId
  const subcategoriesByCategory = useMemo(() => {
    const map = new Map<number, ProductSubcategoryItem[]>();
    subcategories.forEach((sub) => {
      const list = map.get(sub.categoryId) || [];
      list.push(sub);
      map.set(sub.categoryId, list);
    });
    return map;
  }, [subcategories]);

  const toggleSection = (categoryId: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId] === undefined ? false : !prev[categoryId],
    }));
  };

  const isLoading = categoriesQuery.isLoading || subcategoriesQuery.isLoading;

  return (
    <aside className="w-full lg:w-[260px] xl:w-[280px] shrink-0 font-poppins select-none">
      {/* Title */}
      {!hideTitle && (
        <h2 className="text-[26px] font-bold text-[#0E4A68] tracking-tight mb-5">
          Categories
        </h2>
      )}

      {/* "All Products" Item */}
      <div className="pb-4">
        <button
          type="button"
          onClick={() => onSelectSubcategory(null)}
          className={`flex items-center gap-2.5 text-[15px] font-semibold transition-opacity cursor-pointer ${
            activeSubcategoryId === null
              ? "text-[#0E4A68] font-bold"
              : "text-[#555555] hover:text-[#0E4A68]"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              activeSubcategoryId === null ? "bg-[#0E4A68]" : "bg-transparent border border-[#555555]"
            }`}
          />
          <span>All Products</span>
        </button>
      </div>

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="flex flex-col gap-3 py-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`cat-skel-${i}`}
              className="h-10 w-full rounded-lg bg-[#0E4A68]/10 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Real Categories Accordion */}
      {!isLoading && (
        <div className="flex flex-col">
          {categories.map((cat) => {
            const subs = subcategoriesByCategory.get(cat.id) || [];
            const hasSubs = subs.length > 0;
            // Default open if not explicitly toggled
            const isOpen =
              openSections[cat.id] === undefined ? true : openSections[cat.id];

            return (
              <div
                key={`cat-${cat.id}`}
                className="border-t-[0.8px] border-[#BBBBBB] py-4"
              >
                {/* Category Header */}
                <button
                  type="button"
                  onClick={() => {
                    if (hasSubs) {
                      toggleSection(cat.id);
                    }
                  }}
                  className="w-full flex items-center justify-between text-left text-[14px] font-semibold text-[#0E4A68] tracking-wide hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <span className="truncate pr-2">{cat.name}</span>
                  {hasSubs && (
                    <FiChevronDown
                      size={18}
                      className={`text-[#0E4A68] transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  )}
                </button>

                {/* Subcategories List */}
                {hasSubs && isOpen && (
                  <div className="mt-3.5 pl-1 flex flex-col gap-2.5">
                    {subs.map((sub) => {
                      const isSelected = activeSubcategoryId === sub.id;
                      return (
                        <button
                          key={`sub-${sub.id}`}
                          type="button"
                          onClick={() => onSelectSubcategory(sub.id)}
                          className={`w-full flex items-center justify-between text-[14px] transition-colors cursor-pointer text-left ${
                            isSelected
                              ? "text-[#0E4A68] font-bold"
                              : "text-[#555555] hover:text-[#0E4A68]"
                          }`}
                        >
                          <span className="truncate pr-2">{sub.name}</span>
                          {sub.noOfItems !== undefined && (
                            <span className="text-[#888888] font-normal text-xs shrink-0">
                              ({sub.noOfItems})
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </aside>
  );
}

export default HotelDeliveriesCategories;
