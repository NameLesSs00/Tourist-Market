"use client";

import React, { useState, useEffect } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { motion } from "framer-motion";
import { Toaster } from "sonner";
import { GroupExcursionDetail, ReviewComment } from "../types";
import { useMarkReviewHelpfulMutation } from "@/features/groupExcursions/useMarkReviewHelpful";
import {
  readHelpfulReviewIds,
  markReviewHelpfulInCookie,
  hasSubmittedReview,
} from "@/shared/utils/helpfulReviews";
import {
  ReviewRatingOverview,
  RatingDistributionItem,
} from "./reviews/ReviewRatingOverview";
import { ReviewOpinionForm } from "./reviews/ReviewOpinionForm";
import { ReviewCommentItem } from "./reviews/ReviewCommentItem";
import { getDictionary } from "@/shared/utils/getDictionary";

export type { RatingDistributionItem };

export interface GroupDetailsReviewsProps {
  detail?: GroupExcursionDetail;
  distribution?: RatingDistributionItem[];
  comments?: ReviewComment[];
  averageRating?: number;
  totalReviews?: number;
  locale?: string;
}

const EMPTY_DISTRIBUTION: RatingDistributionItem[] = [
  { star: 5, percentage: 0, count: 0 },
  { star: 4, percentage: 0, count: 0 },
  { star: 3, percentage: 0, count: 0 },
  { star: 2, percentage: 0, count: 0 },
  { star: 1, percentage: 0, count: 0 },
];

export function GroupDetailsReviews({
  detail,
  distribution,
  comments: propComments,
  averageRating,
  totalReviews,
  locale = "en",
}: GroupDetailsReviewsProps) {
  const dict = getDictionary(locale);
  const t = dict.groupExcursions.details.reviews;

  const totalReviewsVal = totalReviews ?? detail?.totalReviews ?? 0;
  const ratingVal = totalReviewsVal > 0 ? (averageRating ?? detail?.rating ?? 0) : 0;
  const distList = distribution ?? detail?.ratingDistribution ?? EMPTY_DISTRIBUTION;
  const initialComments = propComments ?? detail?.comments ?? [];

  const [commentsList, setCommentsList] = useState<ReviewComment[]>(initialComments);
  const [visibleCountMobile, setVisibleCountMobile] = useState<number>(3);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [alreadySubmitted, setAlreadySubmitted] = useState<boolean>(false);
  const { mutate: markHelpful } = useMarkReviewHelpfulMutation();

  const excursionId = detail?.id ?? "";

  useEffect(() => {
    const map: Record<string, boolean> = {};
    readHelpfulReviewIds().forEach((id) => {
      map[id] = true;
    });
    setLikedMap(map);
    setAlreadySubmitted(hasSubmittedReview(excursionId));
  }, [excursionId]);

  const handleLike = (id: string) => {
    if (likedMap[id]) return;

    setLikedMap((prev) => ({ ...prev, [id]: true }));
    markReviewHelpfulInCookie(id);
    setCommentsList((cList) =>
      cList.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );

    markHelpful(id, {
      onSuccess: (response) => {
        const nextCount = response?.data;
        if (typeof nextCount === "number") {
          setCommentsList((cList) =>
            cList.map((c) => (c.id === id ? { ...c, likes: nextCount } : c))
          );
        }
      },
      onError: () => {
        setLikedMap((prev) => ({ ...prev, [id]: false }));
        setCommentsList((cList) =>
          cList.map((c) =>
            c.id === id ? { ...c, likes: Math.max(0, c.likes - 1) } : c
          )
        );
      },
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="w-full font-poppins"
    >
      <Toaster richColors closeButton position="top-center" toastOptions={{ className: "font-poppins" }} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* LEFT COLUMN: Rating Breakdown Card + Share Opinion Card */}
        <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
          <ReviewRatingOverview
            ratingVal={ratingVal}
            totalReviewsVal={totalReviewsVal}
            distList={distList}
            locale={locale}
          />

          <ReviewOpinionForm
            excursionId={excursionId}
            alreadySubmitted={alreadySubmitted}
            onSubmitted={() => setAlreadySubmitted(true)}
            locale={locale}
          />
        </div>

        {/* RIGHT COLUMN: Reviews & Comments */}
        <div
          className="lg:col-span-7 bg-white rounded-2xl p-4 sm:p-6 lg:p-7 lg:h-[774px] flex flex-col"
          style={{
            border: "0.8px solid #BBBBBB",
            boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)",
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-2.5 pb-3.5 sm:pb-4 border-b border-[#E5E5E5] shrink-0">
            <FiMessageSquare className="text-[#083952]" size={22} />
            <h3 className="text-lg sm:text-[20px] font-bold text-[#083952]">
              {t.commentsTitle}
            </h3>
          </div>

          {/* Comments List */}
          <div className="mt-4 sm:mt-5 flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-5 sm:space-y-6 divide-y divide-gray-100 scroll-smooth">
            {commentsList.length === 0 ? (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center px-4 py-12">
                <div className="w-14 h-14 rounded-full bg-[#FFF8ED] border border-[#DE7423]/30 flex items-center justify-center text-[#DE7423] mb-3">
                  <FiMessageSquare size={24} />
                </div>
                <h4 className="text-[17px] font-bold text-[#083952]">
                  {t.noReviews}
                </h4>
                <p className="text-[13px] text-gray-500 mt-1.5 max-w-sm leading-relaxed">
                  {t.noReviewsDesc}
                </p>
              </div>
            ) : (
              commentsList.map((comment, index) => (
                <ReviewCommentItem
                  key={comment.id}
                  comment={comment}
                  isLiked={Boolean(likedMap[comment.id])}
                  onLike={handleLike}
                  isHiddenOnMobile={index >= visibleCountMobile}
                />
              ))
            )}
          </div>

          {/* Mobile "View More" toggle button */}
          {commentsList.length > visibleCountMobile && (
            <div className="pt-4 border-t border-gray-100 lg:hidden text-center shrink-0">
              <button
                type="button"
                onClick={() =>
                  setVisibleCountMobile((prev) =>
                    prev >= commentsList.length ? 3 : prev + 3
                  )
                }
                className="text-[#DE7423] font-bold text-[14px] hover:underline cursor-pointer"
              >
                {visibleCountMobile >= commentsList.length
                  ? t.showLess
                  : `${t.viewMore} (${commentsList.length - visibleCountMobile})`}
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}

export default GroupDetailsReviews;