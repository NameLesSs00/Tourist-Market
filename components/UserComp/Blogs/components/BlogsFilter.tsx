"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { BlogCategory, BLOG_CATEGORIES } from "../types";

interface BlogsFilterProps {
  activeCategory: BlogCategory;
  onSelectCategory: (category: BlogCategory) => void;
  disabled?: boolean;
}

const pillContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const pillVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function BlogsFilter({
  activeCategory,
  onSelectCategory,
  disabled = false,
}: BlogsFilterProps) {
  return (
    <motion.nav
      aria-label="Blog category filter"
      variants={pillContainerVariants}
      initial="hidden"
      animate="visible"
      className="w-full flex items-center flex-wrap gap-2.5 sm:gap-4 lg:gap-5"
    >
      {BLOG_CATEGORIES.map((category) => {
        const isActive = activeCategory === category;

        return (
          <motion.button
            key={category}
            type="button"
            disabled={disabled}
            onClick={() => onSelectCategory(category)}
            variants={pillVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            style={{
              borderRadius: "25px",
              backgroundColor: isActive ? "#0E4A68" : "#FFFEF2",
              color: isActive ? "#FFFFFF" : "#000000",
              border: isActive ? "0.6px solid #0E4A68" : "0.6px solid #888888",
            }}
            className={`font-['Poppins'] text-[14px] sm:text-[15px] lg:text-[16px] font-medium px-5 sm:px-6 lg:px-7 py-2 sm:py-2.5 transition-colors duration-200 cursor-pointer select-none disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-sm ${
              isActive
                ? "shadow-sm"
                : "hover:bg-[#FFFBF0] hover:border-black/50"
            }`}
          >
            {category}
          </motion.button>
        );
      })}
    </motion.nav>
  );
}

export default BlogsFilter;
