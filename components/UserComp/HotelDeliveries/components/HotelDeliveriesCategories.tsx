"use client";

import React, { useState } from "react";
import Image from "next/image";

interface CategoryItem {
  id: string;
  name: string;
  count?: number;
  subcategories?: { id: string; name: string; count: number }[];
}

const CATEGORIES_DATA: CategoryItem[] = [
  {
    id: "fruits-drinks",
    name: "FRUITS & DRINKS",
    subcategories: [
      { id: "fd-all", name: "All", count: 30 },
      { id: "fd-fresh", name: "Fresh Fruit", count: 12 },
      { id: "fd-drinks", name: "Egyptian Drinks", count: 18 },
    ],
  },
  {
    id: "seafood",
    name: "SEA FOOD ORDERS",
  },
  {
    id: "nuts-spices",
    name: "NUTS & SPICES",
    subcategories: [
      { id: "ns-all", name: "All", count: 34 },
      { id: "ns-nuts", name: "Nuts", count: 17 },
      { id: "ns-spices", name: "Spices", count: 17 },
    ],
  },
  {
    id: "pharmacy",
    name: "ONLINE PHARMACY",
    subcategories: [
      { id: "op-all", name: "All", count: 72 },
      { id: "op-meds", name: "Medicines", count: 45 },
      { id: "op-care", name: "Care & Protection", count: 22 },
      { id: "op-vitamins", name: "Vitamins & Supplements", count: 5 },
    ],
  },
  {
    id: "sweets",
    name: "ORIENTAL SWEETS",
  },
];

interface HotelDeliveriesCategoriesProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  hideTitle?: boolean;
}

export function HotelDeliveriesCategories({
  activeCategory,
  onSelectCategory,
  hideTitle = false,
}: HotelDeliveriesCategoriesProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "fruits-drinks": true,
    seafood: false,
    "nuts-spices": true,
    pharmacy: true,
    sweets: false,
  });

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
          onClick={() => onSelectCategory("all")}
          className="flex items-center gap-2.5 text-[15px] font-semibold text-[#0E4A68] hover:opacity-80 transition-opacity cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-[#0E4A68]" />
          <span>All Products</span>
        </button>
      </div>

      {/* Accordion Categories */}
      <div className="flex flex-col">
        {CATEGORIES_DATA.map((cat) => {
          const isOpen = !!openSections[cat.id];
          const hasSubs = cat.subcategories && cat.subcategories.length > 0;

          return (
            <div
              key={cat.id}
              className="border-t-[0.8px] border-[#BBBBBB] py-4"
            >
              {/* Category Header */}
              <button
                type="button"
                onClick={() => {
                  if (hasSubs) {
                    toggleSection(cat.id);
                  } else {
                    onSelectCategory(cat.id);
                  }
                }}
                className="w-full flex items-center justify-between text-left text-[14px] font-semibold text-[#0E4A68] tracking-wide hover:opacity-80 transition-opacity cursor-pointer"
              >
                <span>{cat.name}</span>
                <span
                  className={`transition-transform duration-200 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <Image
                    src="/Hoteldeliveries/Vector (1).svg"
                    alt=""
                    width={14}
                    height={6}
                    className="object-contain"
                  />
                </span>
              </button>

              {/* Subcategories */}
              {hasSubs && isOpen && (
                <div className="mt-3.5 pl-1 flex flex-col gap-2.5">
                  {cat.subcategories!.map((sub) => {
                    const isSelected = activeCategory === sub.id;
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => onSelectCategory(sub.id)}
                        className={`w-full flex items-center justify-between text-[14px] transition-colors cursor-pointer ${
                          isSelected
                            ? "text-[#0E4A68] font-semibold"
                            : "text-[#555555] hover:text-[#0E4A68]"
                        }`}
                      >
                        <span>{sub.name}</span>
                        <span className="text-[#888888] font-normal">
                          ({sub.count})
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export default HotelDeliveriesCategories;
