"use client";

import React, { useState } from "react";
import { FiStar, FiUser, FiMessageSquare } from "react-icons/fi";
import type { TransferReviewItem } from "@/models/transferReview";

interface TransferReviewListProps {
  items: TransferReviewItem[];
  isLoading?: boolean;
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function TransferReviewList({ items, isLoading = false }: TransferReviewListProps) {
  const [visibleCount, setVisibleCount] = useState<number>(4);

  if (isLoading) {
    return (
      <div className="bg-[#FFFFFF] rounded-[8.38px] border-[0.52px] border-[#888888] p-8 text-center font-poppins">
        <div className="inline-block w-8 h-8 rounded-full border-2 border-[#0E4A68] border-t-transparent animate-spin" />
        <div className="text-xs text-[#0E4A68]/70 mt-2 font-medium">Loading verified reviews...</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-[#FFFFFF] rounded-[8.38px] border-[0.52px] border-[#888888] shadow-[0px_1.05px_8.38px_1.05px_rgba(0,0,0,0.2)] p-8 text-center space-y-3 font-poppins">
        <div className="w-12 h-12 rounded-full bg-[#EBF5FA] text-[#0E4A68] flex items-center justify-center mx-auto text-xl">
          <FiMessageSquare className="w-5 h-5" />
        </div>
        <div className="text-sm sm:text-base font-bold text-[#0E4A68]">
          No Reviews Yet
        </div>
        <p className="text-xs text-[#0E4A68]/70 max-w-sm mx-auto">
          Be the first customer to share your transfer journey with us using the review form above!
        </p>
      </div>
    );
  }

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <div className="space-y-4 font-poppins">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleItems.map((rev) => {
          const initial = rev.fullName ? rev.fullName.charAt(0).toUpperCase() : "T";
          return (
            <div
              key={rev.id}
              className="bg-[#FFFFFF] rounded-[8.38px] border-[0.52px] border-[#888888] shadow-[0px_1.05px_8.38px_1.05px_rgba(0,0,0,0.2)] p-4 sm:p-5 space-y-3 flex flex-col justify-between"
            >
              {/* Header: Avatar, Name, Date, Stars */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#EBF5FA] border border-[#0E4A68]/20 text-[#0E4A68] flex items-center justify-center font-bold text-sm shrink-0">
                    {initial || <FiUser className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-[#0E4A68]">
                      {rev.fullName || "Verified Traveler"}
                    </div>
                    <div className="text-[11px] text-gray-400">
                      {formatDate(rev.createdAt)}
                    </div>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <FiStar
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        s <= rev.rate
                          ? "fill-[#F59E0B] text-[#F59E0B]"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Comment Content */}
              <p className="text-xs sm:text-sm text-[#0E4A68]/90 leading-relaxed pt-1">
                {rev.comment}
              </p>

              {/* Verification Tag */}
              <div className="pt-2 border-t border-black/5 flex items-center justify-between text-[11px] text-emerald-700">
                <span className="font-semibold">Verified Transfer Customer</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show more button */}
      {hasMore && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="px-6 py-2 rounded-full border border-[#0E4A68] text-[#0E4A68] bg-white hover:bg-[#EBF5FA] text-xs font-semibold transition cursor-pointer shadow-xs"
          >
            Show More Reviews ({items.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
}

export default TransferReviewList;

