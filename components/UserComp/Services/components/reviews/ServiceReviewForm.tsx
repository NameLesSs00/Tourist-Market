"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiStar, FiMessageSquare } from "react-icons/fi";
import { sanitizePhoneNumber } from "@/shared/utils/phoneUtils";
import { useClientDictionary } from "@/shared/providers/ClientDictionaryContext";

interface ServiceReviewFormProps {
  alreadySubmitted: boolean;
  onResetSubmitted?: () => void;
  userRating: number;
  userName: string;
  userEmail: string;
  userPhone: string;
  userReview: string;
  isSubmitting: boolean;
  onRatingChange: (rate: number) => void;
  onNameChange: (val: string) => void;
  onEmailChange: (val: string) => void;
  onPhoneChange: (val: string) => void;
  onReviewChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  locale?: string;
}

export function ServiceReviewForm({
  alreadySubmitted,
  onResetSubmitted,
  userRating,
  userName,
  userEmail,
  userPhone,
  userReview,
  isSubmitting,
  onRatingChange,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onReviewChange,
  onSubmit,
  locale = "en",
}: ServiceReviewFormProps) {
  const dict = useClientDictionary();
  const t = dict.serviceDetail;

  return (
    <div
      className="w-full bg-white rounded-2xl p-4 sm:p-6 sm:p-7 shrink-0"
      style={{
        border: "0.8px solid #BBBBBB",
        boxShadow: "0px 1px 8px 1px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="flex items-center gap-2.5 mb-2">
        <FiMessageSquare className="text-[#DE7423]" size={18} />
        <h3 className="text-base sm:text-lg font-bold text-[#083952]">
          {t.shareOpinionTitle}
        </h3>
      </div>
      <p className="text-xs sm:text-[13px] text-gray-500 mb-5">
        {t.shareOpinionSubtitle}
      </p>

      {alreadySubmitted ? (
        <div className="p-4 sm:p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-800 space-y-2">
          <p>
            {t.alreadySubmittedMessage}
          </p>
          {onResetSubmitted && (
            <button
              type="button"
              onClick={onResetSubmitted}
              className="text-xs text-emerald-700 underline font-semibold hover:text-emerald-900 cursor-pointer"
            >
              {t.writeAnotherReview}
            </button>
          )}
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="space-y-4">
          {/* Star Picker */}
          <div>
            <label className="block text-xs font-semibold text-[#083952] mb-1.5">
              {t.yourRatingLabel}
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  type="button"
                  key={star}
                  onClick={() => onRatingChange(star)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-1 -m-1 text-[#F5A623] cursor-pointer"
                  aria-label={t.rateStarAria.replace("{n}", String(star))}
                >
                  <FiStar
                    size={24}
                    className={
                      star <= userRating
                        ? "text-[#F5A623] fill-[#F5A623]"
                        : "text-gray-300"
                    }
                  />
                </motion.button>
              ))}
              {userRating > 0 && (
                <span className="text-xs font-semibold text-[#083952] ml-2">
                  {userRating} {t.ofFive}
                </span>
              )}
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-[#083952] mb-1">
              {t.reviewerNameLabel}
            </label>
            <input
              type="text"
              required
              value={userName}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder={t.reviewerNamePlaceholder}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs sm:text-sm text-[#083952] focus:outline-none focus:border-[#DE7423]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-[#083952] mb-1">
              {t.reviewerEmailLabel}
            </label>
            <input
              type="email"
              required
              value={userEmail}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder={t.reviewerEmailPlaceholder}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs sm:text-sm text-[#083952] focus:outline-none focus:border-[#DE7423]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-[#083952] mb-1">
              {t.reviewerPhoneLabel}
            </label>
            <input
              type="tel"
              required
              value={userPhone}
              onChange={(e) => onPhoneChange(sanitizePhoneNumber(e.target.value))}
              placeholder={t.reviewerPhonePlaceholder}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs sm:text-sm text-[#083952] focus:outline-none focus:border-[#DE7423]"
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-xs font-semibold text-[#083952] mb-1">
              {t.reviewerCommentLabel}
            </label>
            <textarea
              required
              rows={4}
              value={userReview}
              onChange={(e) => onReviewChange(e.target.value)}
              placeholder={t.reviewerCommentPlaceholder}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs sm:text-sm text-[#083952] focus:outline-none focus:border-[#DE7423] resize-none"
            />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
            className="w-full py-3 px-4 rounded-lg bg-[#0E4A68] hover:bg-[#0b384f] text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer disabled:opacity-60 shadow-sm"
          >
            {isSubmitting ? t.submittingReview : t.submitReview}
          </motion.button>
        </form>
      )}
    </div>
  );
}

export default ServiceReviewForm;

