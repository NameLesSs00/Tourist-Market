"use client";

import React from "react";
import { BlogPaginationMeta } from "../types";

interface BlogsPaginationProps {
  meta: BlogPaginationMeta;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export function BlogsPagination({
  meta,
  onPageChange,
  disabled = false,
}: BlogsPaginationProps) {
  const { currentPage, totalPages, hasNextPage, hasPrevPage } = meta;

  if (totalPages <= 1) {
    return null;
  }

  // Generate pagination items (e.g. [1, 2, 3, '...', totalPages])
  const getPaginationItems = (): (number | "...")[] => {
    // If total pages is 4 or less, show all numbers
    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show at least 1, 2, 3 and ellipsis if more
    const items: (number | "...")[] = [];

    if (currentPage <= 3) {
      items.push(1, 2, 3, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      items.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      items.push(1, "...", currentPage, "...", totalPages);
    }

    return items;
  };

  const paginationItems = getPaginationItems();

  return (
    <nav
      aria-label="Blog pagination"
      className="flex items-center justify-center gap-2 sm:gap-2.5 mt-10 sm:mt-14"
    >
      {/* Previous Button (if page > 1) */}
      {hasPrevPage && (
        <button
          type="button"
          disabled={disabled}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
          style={{
            borderRadius: "15.65px",
            backgroundColor: "#FFFFFF",
            border: "0.39px solid #888888",
            color: "#0E4A68",
          }}
          className="w-[32px] h-[32px] sm:w-[35px] sm:h-[35px] flex items-center justify-center font-['Poppins'] text-xs transition-all hover:bg-neutral-50 active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}

      {/* Page Numbers & Points */}
      {paginationItems.map((item, index) => {
        if (item === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              style={{
                borderRadius: "15.65px",
                backgroundColor: "#FFFFFF",
                border: "0.39px solid #00000066",
                color: "#0E4A68",
              }}
              className="w-[32px] h-[32px] sm:w-[35px] sm:h-[35px] flex items-center justify-center font-['Poppins'] text-xs font-semibold tracking-widest select-none"
            >
              ...
            </span>
          );
        }

        const isActive = item === currentPage;

        return (
          <button
            key={`page-${item}`}
            type="button"
            disabled={disabled}
            onClick={() => onPageChange(item)}
            aria-current={isActive ? "page" : undefined}
            style={{
              borderRadius: "15.65px",
              backgroundColor: isActive ? "#0E4A68E5" : "#FFFFFF",
              border: isActive
                ? "0.39px solid #00000066"
                : "0.39px solid #888888",
              color: isActive ? "#FFFFFF" : "#000000",
            }}
            className={`w-[32px] h-[32px] sm:w-[35px] sm:h-[35px] flex items-center justify-center font-['Poppins'] text-[13px] sm:text-[14px] font-medium transition-all cursor-pointer select-none disabled:opacity-50 ${
              isActive
                ? "shadow-sm"
                : "hover:bg-neutral-50 hover:border-black/50 active:scale-95"
            }`}
          >
            {item}
          </button>
        );
      })}

      {/* Next Button */}
      {hasNextPage && (
        <button
          type="button"
          disabled={disabled}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
          style={{
            borderRadius: "15.65px",
            backgroundColor: "#FFFFFF",
            border: "0.39px solid #888888",
            color: "#0E4A68",
          }}
          className="w-[32px] h-[32px] sm:w-[35px] sm:h-[35px] flex items-center justify-center font-['Poppins'] text-xs transition-all hover:bg-neutral-50 active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </nav>
  );
}

export default BlogsPagination;
