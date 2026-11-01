"use client";

import React, { useMemo } from "react";
import { FiStar } from "react-icons/fi";
import type {
  TransferReviewItem,
  TransferReviewRatingDistributionItem,
} from "@/models/transferReview";

interface TransferReviewRatingSummaryProps {
  items: TransferReviewItem[];
  totalCount: number;
}

export function TransferReviewRatingSummary({
  items,
  totalCount,
}: TransferReviewRatingSummaryProps) {
  const averageRating = useMemo(() => {
    if (items.length === 0) return 0;
    const sum = items.reduce((acc, r) => acc + (r.rate || 5), 0);
    return Math.round((sum / items.length) * 10) / 10;
  }, [items]);

  const distribution: TransferReviewRatingDistributionItem[] = useMemo(() => {
    const counts = [0, 0, 0, 0, 0, 0];
    items.forEach((r) => {
      const star = Math.min(Math.max(Math.round(r.rate || 5), 1), 5);
      counts[star]++;
    });

    const denom = totalCount > 0 ? totalCount : items.length;

    return [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: counts[star],
      percentage: denom > 0 ? Math.round((counts[star] / denom) * 100) : 0,
    }));
  }, [items, totalCount]);

  return (
    <div className="bg-[#FFFFFF] rounded-[8.38px] border-[0.52px] border-[#888888] shadow-[0px_1.05px_8.38px_1.05px_rgba(0,0,0,0.2)] p-4 sm:p-5 md:p-6 space-y-4 font-poppins">
      <h2 className="text-base sm:text-lg font-bold text-[#0E4A68]">
        Customer Reviews & Ratings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Score column */}
        <div className="flex flex-col items-center justify-center p-4 rounded-[6.29px] bg-[#EBF5FA] border border-[#0E4A68]/20 text-center">
          <div className="text-3xl sm:text-4xl font-extrabold text-[#0E4A68]">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex items-center gap-1 my-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <FiStar
                key={s}
                className={`w-4 h-4 ${
                  s <= Math.round(averageRating)
                    ? "fill-[#F59E0B] text-[#F59E0B]"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="text-xs text-[#0E4A68]/80 font-medium">
            Based on {totalCount} verified {totalCount === 1 ? "review" : "reviews"}
          </div>
        </div>

        {/* Breakdown progress bars */}
        <div className="md:col-span-2 space-y-2">
          {distribution.map((d) => (
            <div key={d.star} className="flex items-center gap-2.5 text-xs text-[#0E4A68]">
              <span className="w-10 font-semibold flex items-center gap-1">
                {d.star} <FiStar className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
              </span>
              <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden border border-black/5">
                <div
                  className="h-full bg-[#0E4A68] rounded-full transition-all duration-300"
                  style={{ width: `${d.percentage}%` }}
                />
              </div>
              <span className="w-9 text-right font-medium text-gray-500">
                {d.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TransferReviewRatingSummary;

