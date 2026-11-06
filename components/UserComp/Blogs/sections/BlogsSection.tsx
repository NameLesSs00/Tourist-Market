"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useClientBlogsQuery } from "@/features/blogs/useClientBlogs";
import { paginatedHref } from "@/shared/utils/contentUrl";
import {
  BlogsHero,
  BlogsGrid,
  BlogsPagination,
} from "../components";

interface BlogsSectionProps {
  locale?: string;
  /** the page the URL asks for: `?page=N`, page 1 when the query is absent */
  initialPage?: number;
}

export function BlogsSection({
  locale = "en",
  initialPage = 1,
}: BlogsSectionProps) {
  const router = useRouter();

  // The URL is the only page state this archive keeps. There is no local counter
  // that could drift away from the address bar, which is what makes /Blogs?page=2
  // a page a crawler can reach, canonicalise and index on its own.
  const currentPage = initialPage;

  const { data, isLoading, isFetching } = useClientBlogsQuery(
    { pageNumber: currentPage, pageSize: 12 },
    locale
  );

  const handlePageChange = (newPage: number) => {
    router.push(paginatedHref(locale, "/Blogs", newPage), { scroll: false });

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
          // a page change refetches through the URL, so the grid keeps showing its
          // skeleton for as long as the new page is on its way
          isLoading={isLoading || isFetching}
          locale={locale}
        />

        {/* Dynamic Backend-Ready Pagination */}
        {paginationMeta && paginationMeta.totalPages > 1 && (
          <BlogsPagination
            meta={paginationMeta}
            onPageChange={handlePageChange}
            locale={locale}
          />
        )}
      </div>
    </div>
  );
}

export default BlogsSection;
