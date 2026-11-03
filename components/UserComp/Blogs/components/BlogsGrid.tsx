"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import type { BlogItem } from "@/models/blog";
import { getDictionary } from "@/shared/utils/getDictionary";
import { BlogCard } from "./BlogCard";

interface BlogsGridProps {
  blogs: BlogItem[];
  isLoading?: boolean;
  locale?: string;
}

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function BlogsGrid({ blogs, isLoading, locale = "en" }: BlogsGridProps) {
  const dict = getDictionary(locale);
  const t = dict.blogs.grid;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 lg:gap-10 w-full py-2 sm:py-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{ borderRadius: "20px" }}
            className="w-full bg-[#0E4A68]/20 animate-pulse aspect-[16/17]"
          />
        ))}
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full py-16 text-center"
      >
        <h4 className="font-['Poppins'] text-xl font-semibold text-[#0E4A68]">
          {t.emptyTitle}
        </h4>
        <p className="mt-2 font-['Poppins'] text-sm text-[#0E4A68]/75">
          {t.emptySubtext}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 lg:gap-10 w-full py-2 sm:py-3"
    >
      {blogs.map((blog) => (
        <motion.div key={blog.id} variants={cardVariants}>
          <BlogCard blog={blog} locale={locale} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default BlogsGrid;
