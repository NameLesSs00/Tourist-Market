"use client";

import React, { useState } from "react";
import {
  FiStar,
  FiMessageSquare,
  FiThumbsUp,
  FiUser,
} from "react-icons/fi";
import {
  usePublicServiceReviews,
  useSubmitServiceReview,
  useMarkReviewHelpful,
} from "@/features/siteServiceItems/usePublicServiceItems";
import type { ServiceReviewItem as ApiReviewItem } from "@/models/serviceReview";

export interface RatingDistributionItem {
  star: number;
  percentage: number;
  count: number;
}

export interface ServiceReviewsProps {
  subServiceId: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
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

function buildDistribution(
  items: ApiReviewItem[]
): RatingDistributionItem[] {
  const counts = [0, 0, 0, 0, 0]; // index 0 = 1-star … index 4 = 5-star
  items.forEach((r) => {
    const idx = Math.max(0, Math.min(4, Math.round(r.rate) - 1));
    counts[idx]++;
  });
  const max = Math.max(...counts, 1);
  return [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: counts[star - 1],
    percentage: Math.round((counts[star - 1] / max) * 100),
  }));
}

function computeAverage(items: ApiReviewItem[]): number {
  if (!items.length) return 0;
  return items.reduce((s, r) => s + r.rate, 0) / items.length;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function ServiceReviews({ subServiceId }: ServiceReviewsProps) {
  const { data: reviewsData, isLoading } = usePublicServiceReviews(
    subServiceId,
    50
  );
  const { mutateAsync: submitReview, isPending: isSubmitting } =
    useSubmitServiceReview(subServiceId);
  const { mutate: markHelpful } = useMarkReviewHelpful();

  const items: ApiReviewItem[] = reviewsData?.items ?? [];
  const totalReviews = reviewsData?.totalCount ?? 0;
  const averageRating = computeAverage(items);
  const distribution = buildDistribution(items);

  // ── Form state ──────────────────────────────────────────────────────────────
  const [userRating, setUserRating] = useState(0);
  const [userName, setUserName] = useState("");
  const [userReview, setUserReview] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // ── Pagination (mobile) ─────────────────────────────────────────────────────
  const [visibleCountMobile, setVisibleCountMobile] = useState(3);

  // ── Helpful tracking (local: one click per session per review) ──────────────
  const [helpfulSet, setHelpfulSet] = useState<Set<string>>(new Set());

  const handleHelpful = (id: string) => {
    if (helpfulSet.has(id)) return;
    setHelpfulSet((prev) => new Set([...prev, id]));
    markHelpful(id);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userReview.trim()) return;
    setSubmitStatus("idle");

    try {
      await submitReview({
        subServiceId,
        fullName: userName.trim() || "Guest Traveler",
        email: "",   // field is in API model but not shown in UI per original design
        phone: "",
        rate: userRating || 5,
        comment: userReview.trim(),
      });
      setSubmitStatus("success");
      setUserReview("");
      setUserName("");
      setUserRating(0);
      setTimeout(() => setSubmitStatus("idle"), 4000);
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 4000);
    }
  };

  // ─── Skeleton for the right column ─────────────────────────────────────────
  const ReviewSkeleton = () => (
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
  );

  const DEFAULT_DISTRIBUTION: RatingDistributionItem[] = [
    { star: 5, percentage: 0, count: 0 },
    { star: 4, percentage: 0, count: 0 },
    { star: 3, percentage: 0, count: 0 },
    { star: 2, percentage: 0, count: 0 },
    { star: 1, percentage: 0, count: 0 },
  ];

  const displayDist = isLoading ? DEFAULT_DISTRIBUTION : distribution;
  const displayAvg = isLoading ? 0 : averageRating;
  const displayTotal = isLoading ? 0 : totalReviews;

  return (
    <section className="w-full font-poppins">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

        {/* ── LEFT COLUMN ──────────────────────────────────────────────────── */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:h-[774px] justify-between">

          {/* Card 1: Rating Overview */}
          <div
            className="w-full bg-white rounded-2xl p-6 sm:p-7 shrink-0"
            style={{
              border: "0.8px solid #BBBBBB",
              boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div className="flex items-center gap-2 pb-4 border-b border-[#E5E5E5]">
              <FiStar className="text-[#0E4A68] fill-[#0E4A68]" size={20} />
              <h3 className="text-[20px] font-bold text-[#0E4A68]">
                Reviews —
              </h3>
            </div>

            <div className="mt-6 flex items-center gap-6 sm:gap-8">
              {/* Score */}
              <div className="flex flex-col items-center justify-center shrink-0 pr-4 border-r border-[#EEEEEE]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[44px] font-bold text-[#083952] leading-none">
                    {displayAvg > 0 ? displayAvg.toFixed(1) : "—"}
                  </span>
                  <FiStar className="text-[#F5A623] fill-[#F5A623] mb-1" size={26} />
                </div>
                <span className="text-[14px] font-semibold text-[#083952] mt-2">
                  {displayTotal} {displayTotal === 1 ? "review" : "reviews"}
                </span>
              </div>

              {/* Bars */}
              <div className="flex-1 space-y-2">
                {displayDist.map((d) => (
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

              <form onSubmit={handleSubmitReview} className="mt-5 space-y-4">
                {/* Star selector */}
                <div>
                  <label className="block text-[14px] font-semibold text-[#083952] mb-1.5">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setUserRating(star)}
                        className="cursor-pointer transition-transform hover:scale-110"
                      >
                        <FiStar
                          size={24}
                          className={
                            star <= userRating
                              ? "text-[#F5A623] fill-[#F5A623]"
                              : "text-[#88C43F]"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-[14px] font-semibold text-[#083952] mb-1.5">
                    Name (optional)
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-4 py-2 rounded-lg border border-[#BBBBBB] text-[14px] text-[#083952] focus:outline-none focus:border-[#DE7423]"
                  />
                </div>

                {/* Review text */}
                <div>
                  <label className="block text-[14px] font-semibold text-[#083952] mb-1.5">
                    Your review
                  </label>
                  <textarea
                    rows={3}
                    value={userReview}
                    onChange={(e) => setUserReview(e.target.value)}
                    placeholder="write your review..."
                    className="w-full px-4 py-2 rounded-lg border border-[#BBBBBB] text-[14px] text-[#083952] focus:outline-none focus:border-[#DE7423] resize-none"
                  />
                </div>

                {/* Status messages */}
                {submitStatus === "success" && (
                  <p className="text-green-600 text-[13px] font-medium text-center">
                    ✓ Thank you! Your review has been submitted for approval.
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="text-red-500 text-[13px] font-medium text-center">
                    Something went wrong. Please try again.
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-lg bg-[#DE7423] text-white font-bold text-[15px] hover:bg-[#C9641B] transition-colors cursor-pointer shadow-sm active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ─────────────────────────────────────────────────── */}
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

          {/* Loading */}
          {isLoading && <ReviewSkeleton />}

          {/* No reviews yet */}
          {!isLoading && items.length === 0 && (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-[14px] text-gray-400 font-medium text-center">
                No reviews yet. Be the first to share your experience!
              </p>
            </div>
          )}

          {/* Review list */}
          {!isLoading && items.length > 0 && (
            <div className="mt-5 flex-1 overflow-y-auto pr-2 space-y-6 divide-y divide-gray-100 scroll-smooth">
              {items.map((review, index) => {
                const isHiddenOnMobile = index >= visibleCountMobile;
                const isHelpfulClicked = helpfulSet.has(review.id);
                const helpfulCount = isHelpfulClicked
                  ? review.helpfulCount + 1
                  : review.helpfulCount;

                return (
                  <div
                    key={review.id}
                    className={`pt-5 first:pt-0 ${
                      isHiddenOnMobile ? "hidden lg:block" : "block"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-[#B8C2CA] flex items-center justify-center text-white shrink-0">
                          <FiUser size={22} />
                        </div>
                        <div>
                          <h4 className="text-[16px] font-bold text-[#083952] leading-snug">
                            {review.fullName}
                          </h4>
                          <span className="text-[12px] text-gray-500">
                            {formatDate(review.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-[14px] sm:text-[15px] text-[#333333] leading-relaxed">
                      {review.comment}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <FiStar
                            key={s}
                            size={16}
                            className={
                              s <= review.rate
                                ? "text-[#88C43F] fill-[#88C43F]"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleHelpful(review.id)}
                        disabled={isHelpfulClicked}
                        className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-[#083952] transition-colors cursor-pointer disabled:cursor-default"
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

          {/* Mobile: View More toggle */}
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
                  ? "Show Less"
                  : `View More Comments (${items.length - visibleCountMobile} more)`}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ServiceReviews;
