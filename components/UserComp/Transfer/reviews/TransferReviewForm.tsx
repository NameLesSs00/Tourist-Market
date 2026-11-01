"use client";

import React, { useState } from "react";
import { FiStar } from "react-icons/fi";
import { toast } from "sonner";
import { useCreateTransferReviewMutation } from "@/features/transferReviews";
import { isValidEmail, isValidPhoneNumber, sanitizePhoneNumber } from "@/shared/utils/phoneUtils";

export function TransferReviewForm() {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const createReviewMutation = useCreateTransferReviewMutation({
    onSuccess: () => {
      setRating(5);
      setFullName("");
      setEmail("");
      setPhone("");
      setComment("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating || rating < 1) {
      toast.error("Please select a star rating (1 to 5 stars).");
      return;
    }
    if (!fullName.trim() || fullName.trim().length < 2) {
      toast.error("Please enter your name (at least 2 characters).");
      return;
    }
    if (!email.trim() || !isValidEmail(email)) {
      toast.error("Please provide a valid email address.");
      return;
    }
    if (!phone.trim()) {
      toast.error("Please provide your phone number.");
      return;
    }
    if (!isValidPhoneNumber(phone)) {
      toast.error("Please provide a valid phone number (7 to 15 digits).");
      return;
    }
    if (!comment.trim() || comment.trim().length < 5) {
      toast.error("Please share a brief comment about your experience (at least 5 characters).");
      return;
    }

    createReviewMutation.mutate({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: sanitizePhoneNumber(phone),
      rate: rating,
      comment: comment.trim(),
    });
  };

  return (
    <div className="bg-[#FFFFFF] rounded-[8.38px] border-[0.52px] border-[#888888] shadow-[0px_1.05px_8.38px_1.05px_rgba(0,0,0,0.2)] p-4 sm:p-5 md:p-6 space-y-4 font-poppins">
      <div className="space-y-1">
        <h2 className="text-base sm:text-lg font-bold text-[#0E4A68]">
          Leave a Review
        </h2>
        <p className="text-xs text-[#0E4A68]/70">
          Share your experience with our Hurghada airport and city transfer services.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Star Rating Picker */}
        <div>
          <label className="block text-xs font-semibold text-[#0E4A68] mb-1.5">
            Your Rating *
          </label>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => {
              const active = star <= (hoverRating || rating);
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 focus:outline-none transition cursor-pointer"
                  aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                >
                  <FiStar
                    className={`w-6 h-6 transition-colors ${
                      active
                        ? "fill-[#F59E0B] text-[#F59E0B]"
                        : "text-gray-300 hover:text-gray-400"
                    }`}
                  />
                </button>
              );
            })}
            <span className="text-xs font-bold text-[#0E4A68] ml-2">
              {hoverRating || rating} / 5 Stars
            </span>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="Your Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-11 px-3 py-2 text-sm text-[#0E4A68] font-medium bg-[#FFFFFF] border-[0.42px] border-[#00000066] rounded-[5.24px] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition placeholder:text-[#00000066]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
              Email Address *
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-3 py-2 text-sm text-[#0E4A68] font-medium bg-[#FFFFFF] border-[0.42px] border-[#00000066] rounded-[5.24px] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition placeholder:text-[#00000066]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              placeholder="+20 123 456 7890"
              value={phone}
              onChange={(e) => setPhone(sanitizePhoneNumber(e.target.value))}
              className="w-full h-11 px-3 py-2 text-sm text-[#0E4A68] font-medium bg-[#FFFFFF] border-[0.42px] border-[#00000066] rounded-[5.24px] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition placeholder:text-[#00000066]"
            />
          </div>
        </div>

        {/* Review Comment */}
        <div>
          <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
            Review Comment *
          </label>
          <textarea
            rows={3}
            placeholder="Tell us about the vehicle condition, punctuality, driver service..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 text-sm text-[#0E4A68] font-medium bg-[#FFFFFF] border-[0.42px] border-[#00000066] rounded-[5.24px] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition placeholder:text-[#00000066] resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-1">
          <button
            type="submit"
            disabled={createReviewMutation.isPending}
            className="w-full sm:w-auto px-8 py-2.5 rounded-[6.29px] bg-[#0E4A68] hover:bg-[#0c405b] text-white text-xs sm:text-sm font-semibold transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {createReviewMutation.isPending ? "Submitting Review..." : "Submit Review"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TransferReviewForm;

