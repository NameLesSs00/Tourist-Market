"use client";

import React from "react";
import { FiStar, FiThumbsUp, FiUser } from "react-icons/fi";
import type { ServiceReviewItem } from "@/models/serviceReview";

interface ServiceReviewListProps {
  items: ServiceReviewItem[];
  totalReviews: number;
  isLoading: boolean;
  likedMap: Record<string, boolean>;
  likeOverrides: Record<string, number>;
  visibleCountMobile: number;
  onHelpful: (id: string) => void;
  onLoadMoreMobile: () => void;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export function ServiceReviewList({
  items,
  totalReviews,
  isLoading,
  likedMap,
  likeOverrides,
  visibleCountMobile,
  onHelpful,
  onLoadMoreMobile,
}: ServiceReviewListProps) {
  return (
    <div
      className="w-full bg-white rounded-2xl p-4 sm:p-6 sm:p-8 flex flex-col min-h-[480px]"
      style={{
        border: "0.8px solid #BBBBBB",
        boxShadow: "0px 1px 8px 1px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <h3 className="text-base sm:text-lg font-bold text-[#083952]">
          Customer Reviews ({totalReviews})
        </h3>
        <span className="text-xs text-gray-500">Most Recent</span>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="mt-5 flex-1 space-y-6 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2 pt-5 first:pt-0">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-slate-200 shrink-0" />
                <div className="space-y-1">
                  <div className="h-4 w-28 bg-slate-200 rounded" />
                  <div className="h-3 w-20 bg-slate-100 rounded" />
                </div>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded" />
              <div className="h-3 w-4/5 bg-slate-100 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && items.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center py-12 text-center text-gray-400">
          <FiStar size={40} className="stroke-[1.5] text-gray-300 mb-3" />
          <p className="text-sm font-semibold text-[#083952]">No reviews yet</p>
          <p className="text-xs text-gray-400 mt-1 max-w-xs">
            Be the first customer to share your experience with this service!
          </p>
        </div>
      )}

      {/* Review List */}
      {!isLoading && items.length > 0 && (
        <div className="mt-5 flex-1 overflow-y-auto pr-2 space-y-6 divide-y divide-gray-100 scroll-smooth">
          {items.map((review, index) => {
            const isHiddenOnMobile = index >= visibleCountMobile;
            const isHelpfulClicked = Boolean(likedMap[review.id]);
            const helpfulCount =
              likeOverrides[review.id] !== undefined
                ? likeOverrides[review.id]
                : review.helpfulCount || 0;

            return (
              <div
                key={review.id}
                className={`pt-5 first:pt-0 ${
                  isHiddenOnMobile ? "hidden lg:block" : "block"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#B8C2CA] flex items-center justify-center text-white shrink-0">
                      <FiUser size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-[16px] font-bold text-[#083952] leading-snug">
                        {review.fullName || "Customer"}
                      </h4>
                      <span className="text-[11px] sm:text-[12px] text-gray-500">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-xs sm:text-[14px] text-[#333333] leading-relaxed">
                  {review.comment}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <FiStar
                        key={s}
                        size={15}
                        className={
                          s <= review.rate
                            ? "text-[#F5A623] fill-[#F5A623]"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => onHelpful(review.id)}
                    disabled={isHelpfulClicked}
                    className="flex items-center gap-1.5 text-xs sm:text-[13px] text-gray-500 hover:text-[#083952] transition-colors cursor-pointer disabled:cursor-default"
                  >
                    <FiThumbsUp
                      size={15}
                      className={
                        isHelpfulClicked
                          ? "text-[#DE7423] fill-[#DE7423]"
                          : ""
                      }
                    />
                    <span>{helpfulCount}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Mobile Load More */}
      {!isLoading && items.length > visibleCountMobile && (
        <div className="mt-5 pt-3 border-t border-gray-100 lg:hidden text-center">
          <button
            type="button"
            onClick={onLoadMoreMobile}
            className="text-xs font-semibold text-[#0E4A68] hover:underline cursor-pointer"
          >
            Show More Reviews ({items.length - visibleCountMobile} remaining)
          </button>
        </div>
      )}
    </div>
  );
}

export default ServiceReviewList;

