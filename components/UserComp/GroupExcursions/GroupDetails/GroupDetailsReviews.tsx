"use client";

import React, { useState, useEffect } from "react";
import {
  FiStar,
  FiMessageSquare,
  FiThumbsUp,
  FiUser,
} from "react-icons/fi";
import { GroupExcursionDetail, ReviewComment } from "../types";
import { useMarkReviewHelpfulMutation } from "@/features/groupExcursions/useMarkReviewHelpful";
import { useCreateExcursionReviewMutation } from "@/features/groupExcursions/useCreateExcursionReview";
import {
  readHelpfulReviewIds,
  markReviewHelpfulInCookie,
  hasSubmittedReview,
  markReviewSubmitted,
} from "@/shared/utils/helpfulReviews";
import { toast, Toaster } from "sonner";

export interface RatingDistributionItem {
  star: number;
  percentage: number;
  count: number;
}

export interface GroupDetailsReviewsProps {
  detail?: GroupExcursionDetail;
  distribution?: RatingDistributionItem[];
  comments?: ReviewComment[];
  averageRating?: number;
  totalReviews?: number;
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
}: GroupDetailsReviewsProps) {
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
  const { mutate: markHelpful } = useMarkReviewHelpfulMutation();
  const { mutate: submitReview, isPending: isSubmitting } = useCreateExcursionReviewMutation();

  const excursionId = detail?.id ?? "";

  // Restore which reviews this browser already marked, so the button stays
  // disabled after a reload without any extra backend call.
  useEffect(() => {
    const map: Record<string, boolean> = {};
    readHelpfulReviewIds().forEach((id) => {
      map[id] = true;
    });
    setLikedMap(map);
    setAlreadySubmitted(hasSubmittedReview(excursionId));
  }, [excursionId]);

  const handleLike = (id: string) => {
    // Once per review per browser: ignore repeat clicks.
    if (likedMap[id]) return;

    setLikedMap((prev) => ({ ...prev, [id]: true }));
    markReviewHelpfulInCookie(id);
    setCommentsList((cList) =>
      cList.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );

    markHelpful(id, {
      onSuccess: (response) => {
        // Reconcile with the authoritative count returned by the backend.
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

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!excursionId || alreadySubmitted) return;

    if (!userName.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (!userEmail.trim() || !EMAIL_PATTERN.test(userEmail.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!userTitle.trim()) {
      toast.error("Please add a short title for your review.");
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
        rating: userRating || 5,
        title: userTitle.trim(),
        comment: userReview.trim(),
      },
      {
        onSuccess: () => {
          markReviewSubmitted(excursionId);
          setAlreadySubmitted(true);
          setUserRating(0);
          setUserName("");
          setUserEmail("");
          setUserTitle("");
          setUserReview("");
          toast.success("Thanks! Your review has been submitted.");
        },
        onError: () => {
          toast.error("We could not submit your review. Please try again.");
        },
      }
    );
  };

  return (
    <section className="w-full font-poppins">
      <Toaster richColors closeButton position="top-center" toastOptions={{ className: "font-poppins" }} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* --- LEFT COLUMN: Rating Breakdown Card + Share Opinion Card (Total height ~774px on desktop) --- */}
        <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
          {/* Card 1: Rating Overview */}
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
                Reviews -
              </h3>
            </div>

            {/* Score & Distribution Row: stacks on < sm so progress bars get full width */}
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
                  {totalReviewsVal > 0
                    ? `${totalReviewsVal} review${totalReviewsVal > 1 ? "s" : ""}`
                    : "No reviews yet"}
                </span>
              </div>

              {/* Right Bars */}
              <div className="w-full flex-1 space-y-2">
                {distList.map((d) => (
                  <div key={d.star} className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-[13px] text-[#444444]">
                    <div className="flex items-center gap-1 w-6 sm:w-7 shrink-0 font-medium">
                      <span>{d.star}</span>
                      <FiStar className="text-[#F5A623] fill-[#F5A623]" size={11} />
                    </div>
                    {/* Bar */}
                    <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#F5A623] rounded-full"
                        style={{ width: `${d.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Share Your Opinion */}
          <div
            className="w-full bg-white rounded-2xl p-4 sm:p-6 lg:p-7 flex flex-col justify-between"
            style={{
              border: "0.8px solid #BBBBBB",
              boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div>
              <h3 className="text-lg sm:text-[20px] font-bold text-[#083952] pb-3.5 sm:pb-4 border-b border-[#E5E5E5]">
                Share your opinion
              </h3>

              <form onSubmit={handleSubmitReview} className="mt-4 sm:mt-5 space-y-3.5 sm:space-y-4">
                {/* Your Rating */}
                <div>
                  <label className="block text-xs sm:text-[14px] font-semibold text-[#083952] mb-1.5">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        disabled={alreadySubmitted || isSubmitting}
                        onClick={() => setUserRating(star)}
                        className="transition-transform enabled:hover:scale-110 enabled:cursor-pointer disabled:cursor-not-allowed"
                      >
                        <FiStar
                          size={24}
                          className={`${
                            star <= userRating
                              ? "text-[#F5A623] fill-[#F5A623]"
                              : "text-[#88C43F]"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs sm:text-[14px] font-semibold text-[#083952] mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Your Name"
                    disabled={alreadySubmitted || isSubmitting}
                    className="w-full px-3.5 sm:px-4 py-2 rounded-lg border border-[#BBBBBB] text-base sm:text-[14px] text-[#083952] focus:outline-none focus:border-[#DE7423] disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs sm:text-[14px] font-semibold text-[#083952] mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="you@example.com"
                    disabled={alreadySubmitted || isSubmitting}
                    className="w-full px-3.5 sm:px-4 py-2 rounded-lg border border-[#BBBBBB] text-base sm:text-[14px] text-[#083952] focus:outline-none focus:border-[#DE7423] disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Review title */}
                <div>
                  <label className="block text-xs sm:text-[14px] font-semibold text-[#083952] mb-1.5">
                    Review title
                  </label>
                  <input
                    type="text"
                    value={userTitle}
                    onChange={(e) => setUserTitle(e.target.value)}
                    placeholder="Sum up your experience"
                    disabled={alreadySubmitted || isSubmitting}
                    className="w-full px-3.5 sm:px-4 py-2 rounded-lg border border-[#BBBBBB] text-base sm:text-[14px] text-[#083952] focus:outline-none focus:border-[#DE7423] disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Review text */}
                <div>
                  <label className="block text-xs sm:text-[14px] font-semibold text-[#083952] mb-1.5">
                    Your review
                  </label>
                  <textarea
                    rows={3}
                    value={userReview}
                    onChange={(e) => setUserReview(e.target.value)}
                    placeholder="write your review..."
                    disabled={alreadySubmitted || isSubmitting}
                    className="w-full px-3.5 sm:px-4 py-2 rounded-lg border border-[#BBBBBB] text-base sm:text-[14px] text-[#083952] focus:outline-none focus:border-[#DE7423] resize-none disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Submit button */}
                {alreadySubmitted ? (
                  <p className="text-[13px] font-semibold text-[#0E4A68] bg-[#FFF1E0] border border-[#DE7423]/30 rounded-lg px-4 py-3">
                    You've already shared a review for this trip. Thank you!
                  </p>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-lg bg-[#DE7423] text-white font-bold text-sm sm:text-[15px] hover:bg-[#C9641B] transition-colors cursor-pointer shadow-sm active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Reviews & Comments (Fixed height ~774px with desktop smooth scroll) --- */}
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
              Reviews & comments
            </h3>
          </div>

          {/* Comments List (Desktop: smooth scroll container matching 774px height) */}
          <div className="mt-4 sm:mt-5 flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-5 sm:space-y-6 divide-y divide-gray-100 scroll-smooth">
            {commentsList.length === 0 ? (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center px-4 py-12">
                <div className="w-14 h-14 rounded-full bg-[#FFF8ED] border border-[#DE7423]/30 flex items-center justify-center text-[#DE7423] mb-3">
                  <FiMessageSquare size={24} />
                </div>
                <h4 className="text-[17px] font-bold text-[#083952]">
                  No reviews yet
                </h4>
                <p className="text-[13px] text-gray-500 mt-1.5 max-w-sm leading-relaxed">
                  There are no reviews for this excursion yet. Be the first to share your experience!
                </p>
              </div>
            ) : (
              commentsList.map((comment, index) => {
              // On mobile, show only up to visibleCountMobile unless expanded
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
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#B8C2CA] flex items-center justify-center text-white shrink-0">
                        <FiUser size={20} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm sm:text-[16px] font-bold text-[#083952] leading-snug truncate">
                          {comment.author}
                        </h4>
                        <span className="text-[11px] sm:text-[12px] text-gray-500">
                          {comment.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Comment text */}
                  <p className="mt-2.5 sm:mt-3 text-xs sm:text-[14px] md:text-[15px] text-[#333333] leading-relaxed break-words">
                    {comment.content}
                  </p>

                  {/* Rating stars & Like Button */}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <FiStar
                          key={s}
                          size={16}
                          className={`${
                            s <= comment.rating
                              ? "text-[#88C43F] fill-[#88C43F]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleLike(comment.id)}
                      disabled={likedMap[comment.id]}
                      className={`flex items-center gap-1.5 text-[13px] transition-colors ${
                        likedMap[comment.id]
                          ? "text-[#DE7423] cursor-default"
                          : "text-gray-500 hover:text-[#083952] cursor-pointer"
                      }`}
                    >
                      <FiThumbsUp
                        size={15}
                        className={likedMap[comment.id] ? "text-[#DE7423] fill-[#DE7423]" : ""}
                      />
                      <span>{comment.likes}</span>
                    </button>
                  </div>
                </div>
              );
            })
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
                className="text-[#DE7423] font-bold text-[14px] hover:underline"
              >
                {visibleCountMobile >= commentsList.length
                  ? "Show Less"
                  : `View More Comments (${commentsList.length - visibleCountMobile} more)`}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default GroupDetailsReviews;
