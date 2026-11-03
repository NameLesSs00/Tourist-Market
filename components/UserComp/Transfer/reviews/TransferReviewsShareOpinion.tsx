"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import { toast } from "sonner";
import { useCreateTransferReviewMutation } from "@/features/transferReviews";
import { isValidEmail, isValidPhoneNumber, sanitizePhoneNumber } from "@/shared/utils/phoneUtils";
import { getDictionary } from "@/shared/utils/getDictionary";

interface TransferReviewsShareOpinionProps {
  locale?: string;
}

export function TransferReviewsShareOpinion({ locale = "en" }: TransferReviewsShareOpinionProps) {
  const dict = getDictionary(locale);
  const t = dict.transfer.reviews;

  const [userRating, setUserRating] = useState<number>(5);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [userReview, setUserReview] = useState<string>("");
  const [alreadySubmitted, setAlreadySubmitted] = useState<boolean>(false);

  const createReviewMutation = useCreateTransferReviewMutation({
    onSuccess: () => {
      setAlreadySubmitted(true);
      setUserRating(5);
      setUserName("");
      setUserEmail("");
      setUserPhone("");
      setUserReview("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userRating || userRating < 1) {
      toast.error(dict.transfer.reviews.yourRating);
      return;
    }
    if (!userName.trim() || userName.trim().length < 2) {
      toast.error(dict.transfer.validation.nameRequired);
      return;
    }
    if (!userEmail.trim() || !isValidEmail(userEmail)) {
      toast.error(dict.transfer.validation.validEmail);
      return;
    }
    if (!userPhone.trim() || !isValidPhoneNumber(userPhone)) {
      toast.error(dict.transfer.validation.validPhone);
      return;
    }
    if (!userReview.trim() || userReview.trim().length < 5) {
      toast.error(t.reviewPlaceholder);
      return;
    }

    createReviewMutation.mutate({
      fullName: userName.trim(),
      email: userEmail.trim(),
      phone: sanitizePhoneNumber(userPhone),
      rate: userRating,
      comment: userReview.trim(),
    });
  };

  return (
    <div
      className="w-full bg-white rounded-2xl p-6 sm:p-7 flex-1 flex flex-col justify-between font-poppins"
      style={{
        border: "0.8px solid #BBBBBB",
        boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div>
        <h3 className="text-[20px] font-bold text-[#083952] pb-4 border-b border-[#E5E5E5]">
          {t.shareOpinion}
        </h3>

        {alreadySubmitted ? (
          <div className="p-4 sm:p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-800 space-y-2 mt-5">
            <p>
              {t.alreadySubmitted}
            </p>
            <button
              type="button"
              onClick={() => setAlreadySubmitted(false)}
              className="text-xs text-emerald-700 underline font-semibold hover:text-emerald-900 cursor-pointer"
            >
              {t.shareOpinion}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Your Rating */}
          <div>
            <label className="block text-[14px] font-semibold text-[#083952] mb-1.5">
              {t.yourRating}
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setUserRating(star)}
                  className="cursor-pointer transition-transform hover:scale-110 focus:outline-none"
                  aria-label={`Rate ${star} star`}
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
            <label className="block text-[14px] font-semibold text-[#083952] mb-1.5">
              {t.name}
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder={t.namePlaceholder}
              className="w-full px-4 py-2 rounded-lg border border-[#BBBBBB] text-[14px] text-[#083952] focus:outline-none focus:border-[#DE7423]"
            />
          </div>

          {/* Email & Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[14px] font-semibold text-[#083952] mb-1.5">
                {t.email}
              </label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className="w-full px-4 py-2 rounded-lg border border-[#BBBBBB] text-[14px] text-[#083952] focus:outline-none focus:border-[#DE7423]"
              />
            </div>
            <div>
              <label className="block text-[14px] font-semibold text-[#083952] mb-1.5">
                {t.phone}
              </label>
              <input
                type="tel"
                value={userPhone}
                onChange={(e) => setUserPhone(sanitizePhoneNumber(e.target.value))}
                placeholder={t.phonePlaceholder}
                className="w-full px-4 py-2 rounded-lg border border-[#BBBBBB] text-[14px] text-[#083952] focus:outline-none focus:border-[#DE7423]"
              />
            </div>
          </div>

          {/* Review text */}
          <div>
            <label className="block text-[14px] font-semibold text-[#083952] mb-1.5">
              {t.yourReview}
            </label>
            <textarea
              rows={3}
              value={userReview}
              onChange={(e) => setUserReview(e.target.value)}
              placeholder={t.reviewPlaceholder}
              className="w-full px-4 py-2 rounded-lg border border-[#BBBBBB] text-[14px] text-[#083952] focus:outline-none focus:border-[#DE7423] resize-none"
            />
          </div>

          {/* Submit button */}
          <motion.button
            type="submit"
            whileHover={{ scale: createReviewMutation.isPending ? 1 : 1.02 }}
            whileTap={{ scale: createReviewMutation.isPending ? 1 : 0.98 }}
            disabled={createReviewMutation.isPending}
            className="w-full py-3 px-4 rounded-lg bg-[#0E4A68] text-white font-bold text-[15px] hover:bg-[#0c405b] transition-colors cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {createReviewMutation.isPending ? t.submitting : t.submit}
          </motion.button>
        </form>
        )}
      </div>
    </div>
  );
}

export default TransferReviewsShareOpinion;

