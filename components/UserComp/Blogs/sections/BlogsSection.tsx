"use client";

import React, { useState, useEffect, useTransition } from "react";
import { BlogCategory, BlogPaginationResponse } from "../types";
import { getBlogs } from "../data/blogsService";
import {
  BlogsHero,
  BlogsFilter,
  BlogsGrid,
  BlogsPagination,
} from "../components";

interface BlogsSectionProps {
  locale?: string;
  initialCategory?: BlogCategory;
  initialPage?: number;
}

export function BlogsSection({
  locale = "en",
  initialCategory = "All",
  initialPage = 1,
}: BlogsSectionProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<BlogCategory>(initialCategory);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [blogsData, setBlogsData] = useState<BlogPaginationResponse | null>(
    null
  );
  const [isPending, startTransition] = useTransition();

  // Fetch blogs on category or page change (backend-ready)
  useEffect(() => {
    let isCancelled = false;

    startTransition(async () => {
      const response = await getBlogs({
        category: selectedCategory,
        page: currentPage,
        limit: 12,
      });

      if (!isCancelled) {
        setBlogsData(response);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [selectedCategory, currentPage]);

  const handleCategorySelect = (category: BlogCategory) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);

    // Smooth scroll to top of blogs content
    if (typeof window !== "undefined") {
      const blogsContent = document.getElementById("blogs-content");
      if (blogsContent) {
        blogsContent.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="relative w-full bg-[#FFF4E5] min-h-screen">
      {/* 1. Hero Section */}
      <BlogsHero locale={locale} />

      {/* 2. Main Body Content (Filter + Grid + Pagination) */}
      <div
        id="blogs-content"
        className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-10 sm:pt-14 pb-16 sm:pb-24"
      >
        {/* Category Filters */}
        <div className="mb-8 sm:mb-12">
          <BlogsFilter
            activeCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
            disabled={isPending}
          />
        </div>

        {/* Blog Cards 3-Column Responsive Grid */}
        <BlogsGrid
          blogs={blogsData?.data ?? []}
          isLoading={!blogsData && isPending}
          locale={locale}
        />

        {/* Dynamic Backend-Ready Pagination */}
        {blogsData?.meta && (
          <BlogsPagination
            meta={blogsData.meta}
            onPageChange={handlePageChange}
            disabled={isPending}
          />
        )}
      </div>
    </div>
  );
}

export default BlogsSection;
