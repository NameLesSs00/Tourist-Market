"use client";

import React, { useState, useEffect } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { PrivateExcursionDetail, RatingDistribution, ReviewComment } from "../types";
import { useMarkPrivateReviewHelpfulMutation } from "@/features/privateExcursions/useMarkPrivateReviewHelpful";
import { useCreatePrivateExcursionReviewMutation } from "@/features/privateExcursions/useCreatePrivateExcursionReview";
import {
  readHelpfulReviewIds,
  markReviewHelpfulInCookie,
  hasSubmittedReview,
  markReviewSubmitted,
} from "@/shared/utils/helpfulReviews";
import { toast, Toaster } from "sonner";
import { getDictionary } from "@/shared/utils/getDictionary";
import { PrivateReviewRatingOverview } from "./reviews/PrivateReviewRatingOverview";
import { PrivateReviewOpinionForm } from "./reviews/PrivateReviewOpinionForm";
import { PrivateReviewCommentItem } from "./reviews/PrivateReviewCommentItem";

export interface PrivateDetailsReviewsProps {
  detail?: PrivateExcursionDetail;
  distribution?: RatingDistribution[];
  comments?: ReviewComment[];
  averageRating?: number;
  totalReviews?: number;
  locale?: string;
}

const EMPTY_DISTRIBUTION: RatingDistribution[] = [
  { star: 5, percentage: 0, count: 0 },
  { star: 4, percentage: 0, count: 0 },
  { star: 3, percentage: 0, count: 0 },
  { star: 2, percentage: 0, count: 0 },
  { star: 1, percentage: 0, count: 0 },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function PrivateDetailsReviews({
  detail,
  distribution,
  comments: propComments,
  averageRating,
  totalReviews,
  locale = "en",
}: PrivateDetailsReviewsProps) {
  const dict = getDictionary(locale);
  const t = dict.privateExcursions.details.reviews;

  const totalReviewsVal = totalReviews ?? detail?.totalReviews ?? 0;
  const ratingVal = totalReviewsVal > 0 ? (averageRating ?? detail?.rating ?? 0) : 0;
  const distList = distribution ?? detail?.ratingDistribution ?? EMPTY_DISTRIBUTION;
  const initialComments = propComments ?? detail?.comments ?? [];

  const [commentsList, setCommentsList] = useState<ReviewComment[]>(initialComments);
  const [userRating, setUserRating] = useState<number>(0);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userTitle, setUserTitle] = useState<string>("");
  const [userReview, setUserReview] = useState<string>("");
  const [visibleCountMobile, setVisibleCountMobile] = useState<number>(3);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [alreadySubmitted, setAlreadySubmitted] = useState<boolean>(false);

  const { mutate: markHelpful } = useMarkPrivateReviewHelpfulMutation();
  const { mutate: submitReview, isPending: isSubmitting } =
    useCreatePrivateExcursionReviewMutation();

  const excursionId = detail?.id ?? "";

  useEffect(() => {
    setCommentsList(propComments ?? detail?.comments ?? []);
  }, [propComments, detail?.comments]);

  useEffect(() => {
    const map: Record<string, boolean> = {};
    readHelpfulReviewIds().forEach((id) => {
      map[id] = true;
    });
    setLikedMap(map);
    if (excursionId) {
      setAlreadySubmitted(hasSubmittedReview(excursionId));
    }
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
    });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!excursionId) {
      toast.error("Cannot submit review: missing excursion ID.");
      return;
    }
    if (alreadySubmitted) {
      toast.error(t.alreadySubmitted || "You have already shared a review for this trip.");
      return;
    }
    if (userRating < 1 || userRating > 5) {
      toast.error("Please choose a star rating between 1 and 5.");
      return;
    }
    if (!userName.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (!userEmail.trim() || !EMAIL_PATTERN.test(userEmail.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!userReview.trim()) {
      toast.error("Please write your review before submitting.");
      return;
    }

    submitReview(
      {
        excursionId,
        customerName: userName.trim(),
        customerEmail: userEmail.trim(),
        rating: userRating,
        comment: userReview.trim(),
        title: userTitle.trim() || undefined,
      },
      {
        onSuccess: (res) => {
          toast.success("Thank you! Your review has been submitted.");
          markReviewSubmitted(excursionId);
          setAlreadySubmitted(true);
          const reviewItem = res?.data;
          const createdComment: ReviewComment = {
            id: reviewItem?.id || String(Date.now()),
            author: reviewItem?.customerName || userName.trim(),
            rating: reviewItem?.rating || userRating,
            date: "Just now",
            content: reviewItem?.comment || userReview.trim(),
            likes: reviewItem?.helpfulCount ?? 0,
          };
          setCommentsList((prev) => [createdComment, ...prev]);
          setUserRating(0);
          setUserName("");
          setUserEmail("");
          setUserTitle("");
          setUserReview("");
        },
        onError: (err) => {
          toast.error(err instanceof Error ? err.message : "Failed to submit review.");
        },
      }
    );
  };

  const displayedComments = commentsList.slice(0, visibleCountMobile);

  return (
    <div className="w-full font-poppins pt-4 pb-12">
      <Toaster position="top-right" richColors />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <PrivateReviewRatingOverview
          ratingVal={ratingVal}
          totalReviewsVal={totalReviewsVal}
          distList={distList}
          locale={locale}
        />
        <PrivateReviewOpinionForm
          userRating={userRating}
          setUserRating={setUserRating}
          userName={userName}
          setUserName={setUserName}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          userTitle={userTitle}
          setUserTitle={setUserTitle}
          userReview={userReview}
          setUserReview={setUserReview}
          alreadySubmitted={alreadySubmitted}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmitReview}
          locale={locale}
        />
      </div>

      {/* Comments List */}
      {commentsList.length > 0 && (
        <div className="mt-8 bg-white rounded-2xl p-4 sm:p-6 lg:p-7 border border-[#BBBBBB] shadow-xs">
          <div className="flex items-center gap-2 pb-4 border-b border-[#E5E5E5] mb-5">
            <FiMessageSquare className="text-[#DE7423]" size={20} />
            <h3 className="text-lg sm:text-[20px] font-bold text-[#083952]">
              {t.commentsTitle || "Reviews & comments"} ({commentsList.length})
            </h3>
          </div>

          <div className="space-y-4">
            {displayedComments.map((comment) => (
              <PrivateReviewCommentItem
                key={comment.id}
                comment={comment}
                isLiked={Boolean(likedMap[comment.id])}
                onLike={handleLike}
              />
            ))}
          </div>

          {commentsList.length > 3 && (
            <div className="pt-6 text-center">
              {visibleCountMobile < commentsList.length ? (
                <button
                  type="button"
                  onClick={() => setVisibleCountMobile((prev) => prev + 4)}
                  className="px-6 py-2 rounded-lg border border-[#DE7423] text-[#DE7423] font-bold text-xs sm:text-sm hover:bg-[#DE7423] hover:text-white transition cursor-pointer"
                >
                  {t.viewMore || "View More Comments"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setVisibleCountMobile(3)}
                  className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 font-bold text-xs sm:text-sm hover:bg-gray-100 transition cursor-pointer"
                >
                  {t.showLess || "Show Less"}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PrivateDetailsReviews;
