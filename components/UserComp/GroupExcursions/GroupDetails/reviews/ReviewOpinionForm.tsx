"use client";

import React, { useState } from "react";
import { FiStar } from "react-icons/fi";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useCreateExcursionReviewMutation } from "@/features/groupExcursions/useCreateExcursionReview";
import { markReviewSubmitted } from "@/shared/utils/helpfulReviews";
import { useClientDictionary } from "@/shared/providers/ClientDictionaryContext";

interface ReviewOpinionFormProps {
  excursionId: string;
  alreadySubmitted: boolean;
  onSubmitted: () => void;
  locale?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ReviewOpinionForm({
  excursionId,
  alreadySubmitted,
  onSubmitted,
  locale = "en",
}: ReviewOpinionFormProps) {
  const [userRating, setUserRating] = useState<number>(0);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userTitle, setUserTitle] = useState<string>("");
  const [userReview, setUserReview] = useState<string>("");

  const dict = useClientDictionary();
  const t = dict.groupExcursions.details.reviews;

  const { mutate: submitReview, isPending: isSubmitting } =
    useCreateExcursionReviewMutation();

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
          onSubmitted();
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
    <div
      className="w-full bg-white rounded-2xl p-4 sm:p-6 lg:p-7 flex flex-col justify-between"
      style={{
        border: "0.8px solid #BBBBBB",
        boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div>
        <h3 className="text-lg sm:text-[20px] font-bold text-[#083952] pb-3.5 sm:pb-4 border-b border-[#E5E5E5]">
          {t.shareOpinion}
        </h3>

        <form onSubmit={handleSubmitReview} className="mt-4 sm:mt-5 space-y-3.5 sm:space-y-4">
          {/* Your Rating */}
          <div>
            <label className="block text-xs sm:text-[14px] font-semibold text-[#083952] mb-1.5">
              {t.yourRating}
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={alreadySubmitted || isSubmitting}
                  onClick={() => setUserRating(star)}
                  className="transition-transform enabled:cursor-pointer disabled:cursor-not-allowed"
                >
                  <FiStar
                    size={24}
                    className={`${
                      star <= userRating
                        ? "text-[#F5A623] fill-[#F5A623]"
                        : "text-[#88C43F]"
                    }`}
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-xs sm:text-[14px] font-semibold text-[#083952] mb-1.5">
              {t.name}
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder={t.namePlaceholder}
              disabled={alreadySubmitted || isSubmitting}
              className="w-full px-3.5 sm:px-4 py-2 rounded-lg border border-[#BBBBBB] text-base sm:text-[14px] text-[#083952] focus:outline-none focus:border-[#DE7423] disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs sm:text-[14px] font-semibold text-[#083952] mb-1.5">
              {t.email}
            </label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              disabled={alreadySubmitted || isSubmitting}
              className="w-full px-3.5 sm:px-4 py-2 rounded-lg border border-[#BBBBBB] text-base sm:text-[14px] text-[#083952] focus:outline-none focus:border-[#DE7423] disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          {/* Review title */}
          <div>
            <label className="block text-xs sm:text-[14px] font-semibold text-[#083952] mb-1.5">
              {t.reviewTitle}
            </label>
            <input
              type="text"
              value={userTitle}
              onChange={(e) => setUserTitle(e.target.value)}
              placeholder={t.reviewTitlePlaceholder}
              disabled={alreadySubmitted || isSubmitting}
              className="w-full px-3.5 sm:px-4 py-2 rounded-lg border border-[#BBBBBB] text-base sm:text-[14px] text-[#083952] focus:outline-none focus:border-[#DE7423] disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          {/* Review text */}
          <div>
            <label className="block text-xs sm:text-[14px] font-semibold text-[#083952] mb-1.5">
              {t.yourReview}
            </label>
            <textarea
              rows={3}
              value={userReview}
              onChange={(e) => setUserReview(e.target.value)}
              placeholder={t.reviewPlaceholder}
              disabled={alreadySubmitted || isSubmitting}
              className="w-full px-3.5 sm:px-4 py-2 rounded-lg border border-[#BBBBBB] text-base sm:text-[14px] text-[#083952] focus:outline-none focus:border-[#DE7423] resize-none disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          {/* Submit button */}
          {alreadySubmitted ? (
            <p className="text-[13px] font-semibold text-[#0E4A68] bg-[#FFF1E0] border border-[#DE7423]/30 rounded-lg px-4 py-3">
              {t.alreadySubmitted}
            </p>
          ) : (
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 rounded-lg bg-[#DE7423] text-white font-bold text-sm sm:text-[15px] hover:bg-[#C9641B] transition-colors cursor-pointer shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t.submitting : t.submit}
            </motion.button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ReviewOpinionForm;