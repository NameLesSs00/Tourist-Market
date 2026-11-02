"use client";

import React from "react";
import { FiStar } from "react-icons/fi";
import { getDictionary } from "@/shared/utils/getDictionary";

export interface RatingDistributionItem {
  star: number;
  percentage: number;
  count: number;
}

interface ReviewRatingOverviewProps {
  ratingVal: number;
  totalReviewsVal: number;
  distList: RatingDistributionItem[];
  locale?: string;
}

export function ReviewRatingOverview({
  ratingVal,
  totalReviewsVal,
  distList,
  locale = "en",
}: ReviewRatingOverviewProps) {
  const dict = getDictionary(locale);
  const t = dict.groupExcursions.details.reviews;

  const reviewCountLabel =
    totalReviewsVal > 0
      ? `${totalReviewsVal} ${totalReviewsVal === 1 ? t.reviewSingle : t.reviewPlural}`
      : t.noReviews;

  return (
    <div
      className="w-full bg-white rounded-2xl p-4 sm:p-6 lg:p-7 shrink-0"
      style={{
        border: "0.8px solid #BBBBBB",
        boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 pb-3.5 sm:pb-4 border-b border-[#E5E5E5]">
        <FiStar className="text-[#0E4A68] fill-[#0E4A68]" size={20} />
        <h3 className="text-lg sm:text-[20px] font-bold text-[#0E4A68]">
          {t.title}
        </h3>
      </div>

      {/* Score & Distribution Row */}
      <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-7">
        {/* Left Score */}
        <div className="w-full sm:w-auto flex flex-col items-center justify-center shrink-0 pb-4 sm:pb-0 sm:pr-6 border-b sm:border-b-0 sm:border-r border-[#EEEEEE]">
          <div className="flex items-center gap-1.5">
            <span className="text-[38px] sm:text-[44px] font-bold text-[#083952] leading-none">
              {totalReviewsVal > 0 ? ratingVal.toFixed(1) : "0.0"}
            </span>
            <FiStar
              className={`${
                totalReviewsVal > 0
                  ? "text-[#F5A623] fill-[#F5A623]"
                  : "text-gray-300 fill-gray-200"
              } mb-1`}
              size={24}
            />
          </div>
          <span className="text-[13px] sm:text-[14px] font-semibold text-[#083952] mt-1.5 sm:mt-2">
            {reviewCountLabel}
          </span>
        </div>

        {/* Right Bars */}
        <div className="w-full flex-1 space-y-2">
          {distList.map((d) => (
            <div
              key={d.star}
              className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-[13px] text-[#444444]"
            >
              <div className="flex items-center gap-1 w-6 sm:w-7 shrink-0 font-medium">
                <span>{d.star}</span>
                <FiStar className="text-[#F5A623] fill-[#F5A623]" size={11} />
              </div>
              <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#F5A623] rounded-full transition-all duration-500"
                  style={{ width: `${d.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReviewRatingOverview;