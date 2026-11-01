"use client";

import React from "react";
import { FiStar } from "react-icons/fi";

export interface RatingDistributionItem {
  star: number;
  percentage: number;
  count: number;
}

interface ServiceReviewRatingSummaryProps {
  averageRating: number;
  totalReviews: number;
  distribution: RatingDistributionItem[];
}

export function ServiceReviewRatingSummary({
  averageRating,
  totalReviews,
  distribution,
}: ServiceReviewRatingSummaryProps) {
  return (
    <div
      className="w-full bg-white rounded-2xl p-4 sm:p-6 sm:p-7 shrink-0"
      style={{
        border: "0.8px solid #BBBBBB",
        boxShadow: "0px 1px 8px 1px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 pb-5 border-b border-gray-100">
        <div>
          <span className="text-4xl sm:text-5xl font-black text-[#083952] tracking-tight">
            {averageRating > 0 ? averageRating.toFixed(1) : "0.0"}
          </span>
          <div className="flex items-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <FiStar
                key={s}
                size={18}
                className={
                  s <= Math.round(averageRating)
                    ? "text-[#F5A623] fill-[#F5A623]"
                    : "text-gray-200"
                }
              />
            ))}
          </div>
        </div>

        <div className="text-center sm:text-right">
          <p className="text-xs sm:text-[13px] font-semibold text-[#083952]">
            Total Reviews
          </p>
          <p className="text-base sm:text-xl font-bold text-[#DE7423] mt-0.5">
            {totalReviews} {totalReviews === 1 ? "Review" : "Reviews"}
          </p>
          <span className="text-[11px] text-gray-400 mt-1 block">
            Verified Experiences
          </span>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="mt-5 space-y-2.5">
        {distribution.map(({ star, percentage, count }) => (
          <div key={star} className="flex items-center gap-3 text-xs text-[#083952]">
            <span className="w-4 font-semibold text-right">{star}</span>
            <FiStar size={13} className="text-[#F5A623] fill-[#F5A623] shrink-0" />
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#F5A623] rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="w-8 text-right text-gray-500 font-medium">
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceReviewRatingSummary;

