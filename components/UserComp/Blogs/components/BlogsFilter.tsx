"use client";

import React from "react";
import { BlogCategory, BLOG_CATEGORIES } from "../types";

interface BlogsFilterProps {
  activeCategory: BlogCategory;
  onSelectCategory: (category: BlogCategory) => void;
  disabled?: boolean;
}

export function BlogsFilter({
  activeCategory,
  onSelectCategory,
  disabled = false,
}: BlogsFilterProps) {
  return (
    <nav
      aria-label="Blog category filter"
      className="w-full flex items-center flex-wrap gap-2.5 sm:gap-4 lg:gap-5"
    >
      {BLOG_CATEGORIES.map((category) => {
        const isActive = activeCategory === category;

        return (
          <button
            key={category}
            type="button"
            disabled={disabled}
            onClick={() => onSelectCategory(category)}
            style={{
              borderRadius: "25px",
              backgroundColor: isActive ? "#0E4A68" : "#FFFEF2",
              color: isActive ? "#FFFFFF" : "#000000",
              border: isActive ? "0.6px solid #0E4A68" : "0.6px solid #888888",
            }}
            className={`font-['Poppins'] text-[14px] sm:text-[15px] lg:text-[16px] font-medium px-5 sm:px-6 lg:px-7 py-2 sm:py-2.5 transition-all duration-200 cursor-pointer select-none disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-sm ${
              isActive
                ? "shadow-sm"
                : "hover:bg-[#FFFBF0] hover:border-black/50"
            }`}
          >
            {category}
          </button>
        );
      })}
    </nav>
  );
}

export default BlogsFilter;
