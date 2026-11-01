"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { FiStar } from "react-icons/fi";
import type {
  TransferReviewItem,
  TransferReviewRatingDistributionItem,
} from "@/models/transferReview";

interface TransferReviewsRatingOverviewProps {
  items: TransferReviewItem[];
  totalCount: number;
}

export function TransferReviewsRatingOverview({
  items,
  totalCount,
}: TransferReviewsRatingOverviewProps) {
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
    <div
      className="w-full bg-white rounded-2xl p-6 sm:p-7 shrink-0 font-poppins"
      style={{
        border: "0.8px solid #BBBBBB",
        boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 pb-4 border-b border-[#E5E5E5]">
        <Image
          src="/transfer/rv-head-icon.svg"
          alt="Reviews"
          width={20}
          height={20}
          className="object-contain"
        />
        <h3 className="text-[20px] font-bold text-[#0E4A68]">
          Reviews —
        </h3>
      </div>

      {/* Score & Distribution Row */}
      <div className="mt-6 flex items-center gap-6 sm:gap-8">
        {/* Left Score */}
        <div className="flex flex-col items-center justify-center shrink-0 pr-4 border-r border-[#EEEEEE]">
          <div className="flex items-center gap-1.5">
            <span className="text-[44px] font-bold text-[#083952] leading-none">
              {averageRating > 0 ? averageRating.toFixed(1) : "0.0"}
            </span>
            <Image
              src="/transfer/rv-score-star.svg"
              alt="Star"
              width={26}
              height={26}
              className="mb-1 object-contain"
            />
          </div>
          <span className="text-[14px] font-semibold text-[#083952] mt-2">
            {totalCount} {totalCount === 1 ? "review" : "reviews"}
          </span>
        </div>

        {/* Right Bars */}
        <div className="flex-1 space-y-2">
          {distribution.map((d) => (
            <div
              key={d.star}
              className="flex items-center gap-2.5 text-[13px] text-[#444444]"
            >
              <div className="flex items-center gap-1 w-7 shrink-0 font-medium">
                <span>{d.star}</span>
                <FiStar className="text-[#F5A623] fill-[#F5A623]" size={11} />
              </div>
              {/* Bar */}
              <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#F5A623] rounded-full transition-all duration-300"
                  style={{ width: `${d.percentage}%` }}
                />
              </div>
              <span className="w-8 text-right text-[11px] text-gray-400">
                {d.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TransferReviewsRatingOverview;

