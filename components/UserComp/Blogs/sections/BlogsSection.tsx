"use client";

import React, { useState } from "react";
import { useClientBlogsQuery } from "@/features/blogs/useClientBlogs";
import {
  BlogsHero,
  BlogsGrid,
  BlogsPagination,
} from "../components";

interface BlogsSectionProps {
  locale?: string;
  initialPage?: number;
}

export function BlogsSection({
  locale = "en",
  initialPage = 1,
}: BlogsSectionProps) {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const { data, isLoading, isFetching } = useClientBlogsQuery(
    { pageNumber: currentPage, pageSize: 12 },
    locale
  );

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

  const paginationMeta = data
    ? {
        currentPage: data.pageNumber,
        totalPages: data.totalPages,
        totalItems: data.totalCount,
        itemsPerPage: data.pageSize,
        hasNextPage: data.hasNextPage,
        hasPrevPage: data.hasPreviousPage,
      }
    : null;

  return (
    <div className="relative w-full bg-[#FFF4E5] min-h-screen">
      {/* 1. Hero Section */}
      <BlogsHero locale={locale} />

      {/* 2. Main Body Content (Grid + Pagination) */}
      <div
        id="blogs-content"
        className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-10 sm:pt-14 pb-16 sm:pb-24"
      >
        {/* Blog Cards 3-Column Responsive Grid */}
        <BlogsGrid
          blogs={data?.items ?? []}
          isLoading={isLoading}
          locale={locale}
        />

        {/* Dynamic Backend-Ready Pagination */}
        {paginationMeta && paginationMeta.totalPages > 1 && (
          <BlogsPagination
            meta={paginationMeta}
            onPageChange={handlePageChange}
            disabled={isFetching}
          />
        )}
      </div>
    </div>
  );
}

export default BlogsSection;
