"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiStar, FiUser, FiMessageSquare } from "react-icons/fi";
import type { TransferReviewItem } from "@/models/transferReview";
import { getDictionary } from "@/shared/utils/getDictionary";

interface TransferReviewsCommentsListProps {
  items: TransferReviewItem[];
  isLoading?: boolean;
  locale?: string;
}

function formatDate(dateStr?: string, locale: string = "en"): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function TransferReviewsCommentsList({
  items,
  isLoading = false,
  locale = "en",
}: TransferReviewsCommentsListProps) {
  const [visibleCountMobile, setVisibleCountMobile] = useState<number>(3);
  const dict = getDictionary(locale);
  const t = dict.transfer.reviews;

  return (
    <div
      className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 lg:h-[775px] flex flex-col font-poppins"
      style={{
        border: "0.8px solid #BBBBBB",
        boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-4 border-b border-[#E5E5E5] shrink-0">
        <Image
          src="/transfer/rv-head-icon (1).svg"
          alt="Comments"
          width={22}
          height={22}
          className="object-contain"
        />
        <h3 className="text-[20px] font-bold text-[#083952]">
          {t.commentsTitle}
        </h3>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-sm text-[#083952]/60">
          <div className="w-8 h-8 rounded-full border-2 border-[#0E4A68] border-t-transparent animate-spin mb-2" />
          <span>{t.loading}</span>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && items.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#EBF5FA] text-[#0E4A68] flex items-center justify-center text-xl">
            <FiMessageSquare className="w-5 h-5" />
          </div>
          <div className="text-[16px] font-bold text-[#083952]">
            {t.noReviews}
          </div>
          <p className="text-[13px] text-gray-500 max-w-sm">
            {t.emptyMessage}
          </p>
        </div>
      )}

      {/* Comments List (Desktop: smooth scroll container matching 774px height) */}
      {!isLoading && items.length > 0 && (
        <div className="mt-5 flex-1 overflow-y-auto pr-2 space-y-6 divide-y divide-gray-100 scroll-smooth">
          {items.map((comment, index) => {
            const isHiddenOnMobile = index >= visibleCountMobile;

            return (
              <div
                key={comment.id}
                className={`pt-5 first:pt-0 ${
                  isHiddenOnMobile ? "hidden lg:block" : "block"
                }`}
              >
                <div className="flex items-start justify-between">
                  {/* User info */}
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#B8C2CA] flex items-center justify-center text-white shrink-0 font-bold text-sm">
                      {comment.fullName ? comment.fullName.charAt(0).toUpperCase() : <FiUser size={22} />}
                    </div>
                    <div>
                      <h4 className="text-[16px] font-bold text-[#083952] leading-snug">
                        {comment.fullName || "Verified Traveler"}
                      </h4>
                      <span className="text-[12px] text-gray-500">
                        {formatDate(comment.createdAt, locale)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Comment text */}
                <p className="mt-3 text-[14px] sm:text-[15px] text-[#333333] leading-relaxed">
                  {comment.comment}
                </p>

                {/* Rating stars */}
                <div className="mt-3 flex items-center">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <FiStar
                        key={s}
                        size={16}
                        className={`${
                          s <= comment.rate
                            ? "text-[#88C43F] fill-[#88C43F]"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Mobile "View More" toggle button */}
      {!isLoading && items.length > visibleCountMobile && (
        <div className="pt-4 border-t border-gray-100 lg:hidden text-center shrink-0">
          <button
            type="button"
            onClick={() =>
              setVisibleCountMobile((prev) =>
                prev >= items.length ? 3 : prev + 3
              )
            }
            className="text-[#DE7423] font-bold text-[14px] hover:underline"
          >
            {visibleCountMobile >= items.length
              ? t.showLess
              : `${t.viewMore} (${items.length - visibleCountMobile})`}
          </button>
        </div>
      )}
    </div>
  );
}

export default TransferReviewsCommentsList;

