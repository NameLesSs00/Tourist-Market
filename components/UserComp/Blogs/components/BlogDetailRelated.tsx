"use client";

import React from "react";
import type { BlogItem } from "@/models/blog";
import { BlogCard } from "./BlogCard";

interface BlogDetailRelatedProps {
  blogs: BlogItem[];
  locale?: string;
}

export function BlogDetailRelated({
  blogs,
  locale = "en",
}: BlogDetailRelatedProps) {
  if (!blogs || blogs.length === 0) return null;

  return (
    <section className="w-full mt-12 sm:mt-18 lg:mt-24">
      {/* Eyebrow */}
      <div className="text-center px-4">
        <p className="font-['Poppins'] font-medium text-[18px] sm:text-[22px] md:text-[26px] lg:text-[30px] leading-tight text-[#D48C28]">
          More Stories & Adventures
        </p>
        <div
          className="mx-auto mt-2 sm:mt-2.5 w-20 sm:w-28 lg:w-36"
          style={{ borderBottom: "4px solid #D48C28" }}
        />
      </div>

      {/* Heading (Left-aligned with matching underline color) */}
      <div className="mt-6 sm:mt-8 lg:mt-10 text-left">
        <h3 className="inline-block font-['Poppins'] font-semibold text-[22px] sm:text-[28px] md:text-[34px] lg:text-[40px] text-[#0A3951] leading-tight underline decoration-[#0A3951] underline-offset-8">
          Related Articles:
        </h3>
      </div>

      {/* Responsive Grid: 1 col on mobile, 2 col on tablet, 3 col on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mt-6 sm:mt-8 lg:mt-12 w-full">
        {blogs.map((item) => (
          <BlogCard key={item.id} blog={item} locale={locale} />
        ))}
      </div>
    </section>
  );
}

export default BlogDetailRelated;
