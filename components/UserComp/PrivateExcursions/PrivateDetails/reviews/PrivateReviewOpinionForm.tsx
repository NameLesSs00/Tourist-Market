"use client";

import React from "react";
import { FiStar } from "react-icons/fi";
import { getDictionary } from "@/shared/utils/getDictionary";

interface PrivateReviewOpinionFormProps {
  userRating: number;
  setUserRating: (val: number) => void;
  userName: string;
  setUserName: (val: string) => void;
  userEmail: string;
  setUserEmail: (val: string) => void;
  userTitle: string;
  setUserTitle: (val: string) => void;
  userReview: string;
  setUserReview: (val: string) => void;
  alreadySubmitted: boolean;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  locale?: string;
}

export function PrivateReviewOpinionForm({
  userRating,
  setUserRating,
  userName,
  setUserName,
  userEmail,
  setUserEmail,
  userTitle,
  setUserTitle,
  userReview,
  setUserReview,
  alreadySubmitted,
  isSubmitting,
  onSubmit,
  locale = "en",
}: PrivateReviewOpinionFormProps) {
  const dict = getDictionary(locale);
  const t = dict.privateExcursions.details.reviews;

  return (
    <div
      className="w-full bg-white rounded-2xl p-4 sm:p-6 lg:p-7 flex flex-col justify-between"
      style={{
        border: "0.8px solid #BBBBBB",
        boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div>
        <h3 className="text-lg sm:text-[20px] font-bold text-[#083952] pb-3.5 sm:pb-4 border-b border-[#E5E5E5]">
          {t.shareOpinion || "Share your opinion"}
        </h3>

        <form onSubmit={onSubmit} className="mt-4 sm:mt-5 space-y-3.5 sm:space-y-4">
          {/* Your Rating */}
          <div>
            <label className="block text-xs sm:text-[14px] font-semibold text-[#083952] mb-1.5">
              {t.yourRating || "Your Rating"} *
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
                        : "text-gray-300 hover:text-[#F5A623]"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-xs sm:text-[14px] font-semibold text-[#083952] mb-1.5">
              {t.name || "Name"} *
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder={t.namePlaceholder || "Your Name"}
              disabled={alreadySubmitted || isSubmitting}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#BBBBBB] text-xs sm:text-[14px] text-[#083952] placeholder-gray-400 focus:outline-none focus:border-[#DE7423] disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs sm:text-[14px] font-semibold text-[#083952] mb-1.5">
              {t.email || "Email"} *
            </label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder={t.emailPlaceholder || "you@example.com"}
              disabled={alreadySubmitted || isSubmitting}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#BBBBBB] text-xs sm:text-[14px] text-[#083952] placeholder-gray-400 focus:outline-none focus:border-[#DE7423] disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Review Title */}
          <div>
            <label className="block text-xs sm:text-[14px] font-semibold text-[#083952] mb-1.5">
              {t.reviewTitle || "Review title"}
            </label>
            <input
              type="text"
              value={userTitle}
              onChange={(e) => setUserTitle(e.target.value)}
              placeholder={t.reviewTitlePlaceholder || "Sum up your experience"}
              disabled={alreadySubmitted || isSubmitting}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#BBBBBB] text-xs sm:text-[14px] text-[#083952] placeholder-gray-400 focus:outline-none focus:border-[#DE7423] disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Your Review */}
          <div>
            <label className="block text-xs sm:text-[14px] font-semibold text-[#083952] mb-1.5">
              {t.yourReview || "Your review"} *
            </label>
            <textarea
              rows={3}
              value={userReview}
              onChange={(e) => setUserReview(e.target.value)}
              placeholder={t.reviewPlaceholder || "write your review..."}
              disabled={alreadySubmitted || isSubmitting}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#BBBBBB] text-xs sm:text-[14px] text-[#083952] placeholder-gray-400 focus:outline-none focus:border-[#DE7423] resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {alreadySubmitted && (
            <p className="text-xs text-[#DE7423] font-semibold bg-[#FFF8ED] p-2.5 rounded-lg border border-[#DE7423]/30">
              {t.alreadySubmitted || "You have already shared a review for this trip. Thank you!"}
            </p>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={alreadySubmitted || isSubmitting}
              className="w-full sm:w-auto px-8 py-2.5 rounded-lg bg-[#DE7423] text-white font-bold text-xs sm:text-[14px] hover:bg-[#C9641B] transition shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? t.submitting || "Submitting..." : t.submit || "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PrivateReviewOpinionForm;

