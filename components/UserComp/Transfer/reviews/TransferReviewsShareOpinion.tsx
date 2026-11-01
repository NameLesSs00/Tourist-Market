"use client";

import React, { useState } from "react";
import { FiStar } from "react-icons/fi";
import { toast } from "sonner";
import { useCreateTransferReviewMutation } from "@/features/transferReviews";
import { isValidEmail, isValidPhoneNumber, sanitizePhoneNumber } from "@/shared/utils/phoneUtils";

export function TransferReviewsShareOpinion() {
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
      toast.error("Please select a rating (1 to 5 stars).");
      return;
    }
    if (!userName.trim() || userName.trim().length < 2) {
      toast.error("Please enter your name (at least 2 characters).");
      return;
    }
    if (!userEmail.trim() || !isValidEmail(userEmail)) {
      toast.error("Please provide a valid email address.");
      return;
    }
    if (!userPhone.trim()) {
      toast.error("Please provide your phone number.");
      return;
    }
    if (!isValidPhoneNumber(userPhone)) {
      toast.error("Please provide a valid phone number (7 to 15 digits).");
      return;
    }
    if (!userReview.trim() || userReview.trim().length < 5) {
      toast.error("Please write your review (at least 5 characters).");
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
          Share your opinion
        </h3>

        {alreadySubmitted ? (
          <div className="p-4 sm:p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-800 space-y-2 mt-5">
            <p>
              <strong>Thank you!</strong> Your review has been submitted and is currently pending review.
            </p>
            <button
              type="button"
              onClick={() => setAlreadySubmitted(false)}
              className="text-xs text-emerald-700 underline font-semibold hover:text-emerald-900 cursor-pointer"
            >
              Write another review
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Your Rating */}
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
              Name *
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-lg border border-[#BBBBBB] text-[14px] text-[#083952] focus:outline-none focus:border-[#DE7423]"
            />
          </div>

          {/* Email & Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[14px] font-semibold text-[#083952] mb-1.5">
                Email *
              </label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-lg border border-[#BBBBBB] text-[14px] text-[#083952] focus:outline-none focus:border-[#DE7423]"
              />
            </div>
            <div>
              <label className="block text-[14px] font-semibold text-[#083952] mb-1.5">
                Phone *
              </label>
              <input
                type="tel"
                value={userPhone}
                onChange={(e) => setUserPhone(sanitizePhoneNumber(e.target.value))}
                placeholder="+20 123 456 7890"
                className="w-full px-4 py-2 rounded-lg border border-[#BBBBBB] text-[14px] text-[#083952] focus:outline-none focus:border-[#DE7423]"
              />
            </div>
          </div>

          {/* Review text */}
          <div>
            <label className="block text-[14px] font-semibold text-[#083952] mb-1.5">
              Your review *
            </label>
            <textarea
              rows={3}
              value={userReview}
              onChange={(e) => setUserReview(e.target.value)}
              placeholder="write your review..."
              className="w-full px-4 py-2 rounded-lg border border-[#BBBBBB] text-[14px] text-[#083952] focus:outline-none focus:border-[#DE7423] resize-none"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={createReviewMutation.isPending}
            className="w-full py-3 px-4 rounded-lg bg-[#0E4A68] text-white font-bold text-[15px] hover:bg-[#0c405b] transition-colors cursor-pointer shadow-sm active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {createReviewMutation.isPending ? "Submitting..." : "Submit"}
          </button>
        </form>
        )}
      </div>
    </div>
  );
}

export default TransferReviewsShareOpinion;

