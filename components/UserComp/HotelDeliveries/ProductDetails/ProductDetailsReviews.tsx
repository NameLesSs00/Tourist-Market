"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  FiStar,
  FiMessageSquare,
  FiThumbsUp,
  FiUser,
  FiLoader,
} from "react-icons/fi";
import { toast } from "sonner";
import {
  useClientProductReviewsQuery,
  useCreateClientProductReviewMutation,
  useMarkClientProductReviewHelpfulMutation,
} from "@/features/productReviews/useClientProductReviews";
import {
  readHelpfulProductReviewIds,
  markProductReviewHelpfulInCookie,
  hasSubmittedProductReview,
  markProductReviewSubmitted,
} from "@/shared/utils/helpfulReviews";
import { extractErrorMessage } from "@/shared/utils/errorUtils";
import type { ProductReviewItem } from "@/models/productReview";

export interface RatingDistributionItem {
  star: number;
  percentage: number;
  count: number;
}

export interface ReviewComment {
  id: string;
  author: string;
  date: string;
  content: string;
  rating: number;
  likes: number;
}

export interface ProductDetailsReviewsProps {
  productId?: number | string;
  locale?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ProductDetailsReviews({
  productId,
}: ProductDetailsReviewsProps) {
  const numericId = useMemo(() => {
    if (!productId) return undefined;
    const direct = Number(productId);
    if (!isNaN(direct) && direct > 0) return direct;
    const parts = String(productId).split("-");
    const last = Number(parts[parts.length - 1]);
    return !isNaN(last) && last > 0 ? last : undefined;
  }, [productId]);

  const {
    data: rawReviews,
    isLoading,
    isError,
    error: queryError,
  } = useClientProductReviewsQuery(numericId);

  const { mutate: markHelpful } = useMarkClientProductReviewHelpfulMutation();
  const { mutate: submitReview, isPending: isSubmitting } =
    useCreateClientProductReviewMutation();

  const [likeOverrides, setLikeOverrides] = useState<Record<string, number>>({});
  const [userRating, setUserRating] = useState<number>(0);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [userReview, setUserReview] = useState<string>("");
  const [visibleCountMobile, setVisibleCountMobile] = useState<number>(3);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [alreadySubmitted, setAlreadySubmitted] = useState<boolean>(false);

  // Derive published reviews via useMemo without setState inside useEffect
  const commentsList: ReviewComment[] = useMemo(() => {
    if (!rawReviews || rawReviews.length === 0) return [];
    return rawReviews
      .filter((item: ProductReviewItem) => item.isPublished === true)
      .map((item: ProductReviewItem) => {
        const idStr = String(item.id);
        const baseLikes = item.helpfulCount || 0;
        return {
          id: idStr,
          author: item.name || "Customer",
          date: "Verified Customer",
          rating: item.rate || 5,
          likes:
            likeOverrides[idStr] !== undefined
              ? likeOverrides[idStr]
              : baseLikes,
          content: item.comment,
        };
      });
  }, [rawReviews, likeOverrides]);

  useEffect(() => {
    if (isError && queryError) {
      toast.error(
        extractErrorMessage(
          queryError,
          "Unable to load reviews for this product."
        )
      );
    }
  }, [isError, queryError]);

  // Restore helpful likes and submission state from cookies (persists across reloads)
  useEffect(() => {
    const map: Record<string, boolean> = {};
    readHelpfulProductReviewIds().forEach((id) => {
      map[id] = true;
    });
    setLikedMap(map);
    if (numericId) {
      setAlreadySubmitted(hasSubmittedProductReview(numericId));
    }
  }, [numericId]);

  // Derived rating metrics from published reviews only
  const totalReviewsVal = commentsList.length;
  const ratingVal = useMemo(() => {
    if (totalReviewsVal === 0) return 0;
    const sum = commentsList.reduce((acc, c) => acc + (c.rating || 5), 0);
    return Math.round((sum / totalReviewsVal) * 10) / 10;
  }, [commentsList, totalReviewsVal]);

  const distList: RatingDistributionItem[] = useMemo(() => {
    const counts = [0, 0, 0, 0, 0, 0];
    commentsList.forEach((c) => {
      const star = Math.min(Math.max(Math.round(c.rating || 5), 1), 5);
      counts[star]++;
    });
    return [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: counts[star],
      percentage:
        totalReviewsVal > 0
          ? Math.round((counts[star] / totalReviewsVal) * 100)
          : 0,
    }));
  }, [commentsList, totalReviewsVal]);

  const handleLike = (id: string) => {
    // Once per review per browser: ignore repeat clicks
    if (likedMap[id]) return;

    const numId = Number(id);
    if (!numId || isNaN(numId)) return;

    const target = commentsList.find((c) => c.id === id);
    const currentLikes = target?.likes ?? 0;

    setLikedMap((prev) => ({ ...prev, [id]: true }));
    markProductReviewHelpfulInCookie(id);
    setLikeOverrides((prev) => ({ ...prev, [id]: currentLikes + 1 }));

    markHelpful(numId, {
      onSuccess: (response) => {
        const nextCount = response?.data;
        if (typeof nextCount === "number") {
          setLikeOverrides((prev) => ({ ...prev, [id]: nextCount }));
        }
      },
      onError: (err: unknown) => {
        setLikedMap((prev) => ({ ...prev, [id]: false }));
        setLikeOverrides((prev) => ({ ...prev, [id]: currentLikes }));
        toast.error(
          extractErrorMessage(err, "Unable to register helpful vote.")
        );
      },
    });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!numericId || alreadySubmitted) return;

    if (!userRating || userRating < 1) {
      toast.error("Please select a star rating.");
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
        productId: numericId,
        name: userName.trim(),
        email: userEmail.trim(),
        phone: userPhone.trim() || "+20000000000",
        comment: userReview.trim(),
        rate: userRating,
      },
      {
        onSuccess: () => {
          markProductReviewSubmitted(numericId);
          setAlreadySubmitted(true);
          setUserRating(0);
          setUserName("");
          setUserEmail("");
          setUserPhone("");
          setUserReview("");
          toast.success(
            "Thank you! Your review has been submitted for approval and will appear once reviewed."
          );
        },
        onError: (err: unknown) => {
          toast.error(
            extractErrorMessage(
              err,
              "We could not submit your review. Please try again."
            )
          );
        },
      }
    );
  };

  return (
    <section className="w-full font-poppins">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* --- LEFT COLUMN: Rating Breakdown Card + Share Opinion Card --- */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:h-[774px] justify-between">
          {/* Card 1: Rating Overview */}
          <div
            className="w-full bg-white rounded-2xl p-6 sm:p-7 shrink-0"
            style={{
              border: "0.8px solid #BBBBBB",
              boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)",
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 pb-4 border-b border-[#E5E5E5]">
              <FiStar className="text-[#0E4A68] fill-[#0E4A68]" size={20} />
              <h3 className="text-[20px] font-bold text-[#0E4A68]">
                Reviews -
              </h3>
            </div>

            {/* Score & Distribution Row */}
            <div className="mt-6 flex items-center gap-6 sm:gap-8">
              {/* Left Score */}
              <div className="flex flex-col items-center justify-center shrink-0 pr-4 border-r border-[#EEEEEE]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[44px] font-bold text-[#083952] leading-none">
                    {totalReviewsVal > 0 ? ratingVal.toFixed(1) : "0.0"}
                  </span>
                  <FiStar
                    className={`${
                      totalReviewsVal > 0
                        ? "text-[#F5A623] fill-[#F5A623]"
                        : "text-gray-300 fill-gray-200"
                    } mb-1`}
                    size={26}
                  />
                </div>
                <span className="text-[14px] font-semibold text-[#083952] mt-2">
                  {totalReviewsVal > 0
                    ? `${totalReviewsVal} review${totalReviewsVal > 1 ? "s" : ""}`
                    : "No reviews yet"}
                </span>
              </div>

              {/* Right Bars */}
              <div className="flex-1 space-y-2">
                {distList.map((d) => (
                  <div
                    key={d.star}
                    className="flex items-center gap-2.5 text-[13px] text-[#444444]"
                  >
                    <div className="flex items-center gap-1 w-7 shrink-0 font-medium">
                      <span>{d.star}</span>
                      <FiStar
                        className="text-[#F5A623] fill-[#F5A623]"
                        size={11}
                      />
                    </div>
                    {/* Bar */}
                    <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#F5A623] rounded-full transition-all duration-300"
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
            className="w-full bg-white rounded-2xl p-6 sm:p-7 flex-1 flex flex-col justify-between"
            style={{
              border: "0.8px solid #BBBBBB",
              boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div>
              <h3 className="text-[20px] font-bold text-[#083952] pb-4 border-b border-[#E5E5E5]">
                Share your opinion
              </h3>

              <form onSubmit={handleSubmitReview} className="mt-4 space-y-3">
                {/* Your Rating */}
                <div>
                  <label className="block text-[13px] font-semibold text-[#083952] mb-1">
                    Your Rating *
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        disabled={alreadySubmitted || isSubmitting}
                        onClick={() => setUserRating(star)}
                        className="transition-transform enabled:hover:scale-110 enabled:cursor-pointer disabled:cursor-not-allowed"
                        aria-label={`Rate ${star} star`}
                      >
                        <FiStar
                          size={22}
                          className={`${
                            star <= userRating
                              ? "text-[#F5A623] fill-[#F5A623]"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#083952] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Your Name"
                      disabled={alreadySubmitted || isSubmitting}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#BBBBBB] text-[13px] text-[#083952] focus:outline-none focus:border-[#0E4A68] disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-[#083952] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      disabled={alreadySubmitted || isSubmitting}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#BBBBBB] text-[13px] text-[#083952] focus:outline-none focus:border-[#0E4A68] disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Phone (Optional) */}
                <div>
                  <label className="block text-[12px] font-semibold text-[#083952] mb-1">
                    Phone / WhatsApp (optional)
                  </label>
                  <input
                    type="tel"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="+20 123 456 789"
                    disabled={alreadySubmitted || isSubmitting}
                    className="w-full px-3 py-1.5 rounded-lg border border-[#BBBBBB] text-[13px] text-[#083952] focus:outline-none focus:border-[#0E4A68] disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Review text */}
                <div>
                  <label className="block text-[12px] font-semibold text-[#083952] mb-1">
                    Your Review *
                  </label>
                  <textarea
                    rows={2}
                    value={userReview}
                    onChange={(e) => setUserReview(e.target.value)}
                    placeholder="Write your review..."
                    disabled={alreadySubmitted || isSubmitting}
                    className="w-full px-3 py-1.5 rounded-lg border border-[#BBBBBB] text-[13px] text-[#083952] focus:outline-none focus:border-[#0E4A68] resize-none disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Submit button or confirmation banner */}
                {alreadySubmitted ? (
                  <p className="text-[13px] font-semibold text-[#0E4A68] bg-[#FFF1E0] border border-[#DE7423]/30 rounded-lg px-4 py-3">
                    You&apos;ve already shared a review for this product. Thank
                    you!
                  </p>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#0E4A68] text-white font-bold text-[14px] hover:bg-[#0A3850] transition-colors cursor-pointer shadow-sm active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <FiLoader className="animate-spin" size={15} />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Submit Review</span>
                    )}
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Reviews & Comments --- */}
        <div
          className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 lg:h-[774px] flex flex-col"
          style={{
            border: "0.8px solid #BBBBBB",
            boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)",
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-2.5 pb-4 border-b border-[#E5E5E5] shrink-0">
            <FiMessageSquare className="text-[#083952]" size={22} />
            <h3 className="text-[20px] font-bold text-[#083952]">
              Reviews & comments
            </h3>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="flex-1 flex flex-col items-center justify-center py-12 text-gray-400">
              <FiLoader className="animate-spin mb-2" size={24} />
              <p className="text-sm">Loading reviews...</p>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && commentsList.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-500">
              <div className="w-16 h-16 rounded-full bg-[#0E4A68]/10 text-[#0E4A68] flex items-center justify-center mb-3">
                <FiMessageSquare size={28} />
              </div>
              <p className="text-base font-semibold text-[#083952]">
                No reviews yet
              </p>
              <p className="text-xs text-gray-400 mt-1 max-w-xs">
                Be the first to share your experience with this product.
              </p>
            </div>
          )}

          {/* Comments List (Only published reviews) */}
          {!isLoading && commentsList.length > 0 && (
            <div className="mt-5 flex-1 overflow-y-auto pr-2 space-y-6 divide-y divide-gray-100 scroll-smooth">
              {commentsList.map((comment, index) => {
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
                        <div className="w-11 h-11 rounded-full bg-[#B8C2CA] flex items-center justify-center text-white shrink-0">
                          <FiUser size={22} />
                        </div>
                        <div>
                          <h4 className="text-[16px] font-bold text-[#083952] leading-snug">
                            {comment.author}
                          </h4>
                          <span className="text-[12px] text-gray-500">
                            {comment.date}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Comment text */}
                    <p className="mt-3 text-[14px] sm:text-[15px] text-[#333333] leading-relaxed break-words">
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
                                ? "text-[#F5A623] fill-[#F5A623]"
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
                          className={
                            likedMap[comment.id]
                              ? "text-[#DE7423] fill-[#DE7423]"
                              : ""
                          }
                        />
                        <span>{comment.likes}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Mobile "View More" toggle button */}
          {!isLoading && commentsList.length > visibleCountMobile && (
            <div className="pt-4 border-t border-gray-100 lg:hidden text-center shrink-0">
              <button
                type="button"
                onClick={() =>
                  setVisibleCountMobile((prev) =>
                    prev >= commentsList.length ? 3 : prev + 3
                  )
                }
                className="text-[#0E4A68] font-bold text-[14px] hover:underline cursor-pointer"
              >
                {visibleCountMobile >= commentsList.length
                  ? "Show Less"
                  : `View More Comments (${
                      commentsList.length - visibleCountMobile
                    } more)`}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsReviews;
