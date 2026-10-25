"use client";

import React from "react";
import type { BlogItem } from "@/models/blog";
import { BlogCard } from "./BlogCard";

interface BlogsGridProps {
  blogs: BlogItem[];
  isLoading?: boolean;
  locale?: string;
}

export function BlogsGrid({ blogs, isLoading, locale = "en" }: BlogsGridProps) {
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
      <div className="w-full py-16 text-center">
        <h4 className="font-['Poppins'] text-xl font-semibold text-[#0E4A68]">
          No travel stories found
        </h4>
        <p className="mt-2 font-['Poppins'] text-sm text-[#0E4A68]/75">
          Try selecting another category to discover more articles.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 lg:gap-10 w-full py-2 sm:py-3">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} locale={locale} />
      ))}
    </div>
  );
}

export default BlogsGrid;
