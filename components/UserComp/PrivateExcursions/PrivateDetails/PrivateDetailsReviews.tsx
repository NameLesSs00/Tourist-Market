"use client";

import React, { useState } from "react";
import {
  FiStar,
  FiMessageSquare,
  FiThumbsUp,
  FiUser,
} from "react-icons/fi";
import { RatingDistribution, ReviewComment } from "../types";

interface PrivateDetailsReviewsProps {
  totalReviews?: number;
  averageRating?: number;
  distribution?: RatingDistribution[];
  comments?: ReviewComment[];
}

export function PrivateDetailsReviews({
  totalReviews = 653,
  averageRating = 4.5,
  distribution = [
    { star: 5, percentage: 88, count: 574 },
    { star: 4, percentage: 70, count: 55 },
    { star: 3, percentage: 40, count: 16 },
    { star: 2, percentage: 22, count: 5 },
    { star: 1, percentage: 12, count: 3 },
  ],
  comments: initialComments = [
    {
      id: "rev-1",
      author: "Omer Khaled",
      date: "Sep 15, 2025",
      rating: 5,
      likes: 12,
      content:
        "Our trip was absolutely amazing from start to finish! Everything was well organized, the guide was incredibly friendly, and every destination was more beautiful than we expected.",
    },
    {
      id: "rev-2",
      author: "Pola Samy",
      date: "May 12, 2023",
      rating: 5,
      likes: 8,
      content:
        "This was easily one of the best days of our vacation! The views were breathtaking, the water was crystal clear, and the activities were so much fun. The staff were professional and welcoming, making sure everyone felt safe and comfortable throughout the entire experience.",
    },
    {
      id: "rev-3",
      author: "Mohamed Yasser",
      date: "Sep 23, 2005",
      rating: 5,
      likes: 5,
      content:
        "This trip gave us the opportunity to discover places we probably would not have visited on our own.",
    },
    {
      id: "rev-4",
      author: "Ahmed Ali",
      date: "Sep 23, 2005",
      rating: 5,
      likes: 9,
      content:
        "This trip gave us the opportunity to discover places we probably would not have visited on our own.",
    },
  ],
}: PrivateDetailsReviewsProps) {
  const [comments, setComments] = useState<ReviewComment[]>(initialComments);
  const [userRating, setUserRating] = useState<number>(0);
  const [userName, setUserName] = useState<string>("");
  const [userReview, setUserReview] = useState<string>("");
  const [visibleCountMobile, setVisibleCountMobile] = useState<number>(3);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const handleLike = (id: string) => {
    setLikedMap((prev) => {
      const isLiked = !prev[id];
      setComments((cList) =>
        cList.map((c) =>
          c.id === id ? { ...c, likes: c.likes + (isLiked ? 1 : -1) } : c
        )
      );
      return { ...prev, [id]: isLiked };
    });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userReview.trim()) return;

    const newComment: ReviewComment = {
      id: `rev-${Date.now()}`,
      author: userName.trim() || "Guest Traveler",
      date: "Just now",
      rating: userRating || 5,
      likes: 0,
      content: userReview.trim(),
    };

    setComments([newComment, ...comments]);
    setUserReview("");
    setUserName("");
    setUserRating(0);
  };

  return (
    <section className="w-full font-poppins">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* ─── LEFT COLUMN: Rating Breakdown Card + Share Opinion Card (Total height ~774px on desktop) ─── */}
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
                Reviews —
              </h3>
            </div>

            {/* Score & Distribution Row */}
            <div className="mt-6 flex items-center gap-6 sm:gap-8">
              {/* Left Score */}
              <div className="flex flex-col items-center justify-center shrink-0 pr-4 border-r border-[#EEEEEE]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[44px] font-bold text-[#083952] leading-none">
                    {averageRating.toFixed(1)}
                  </span>
                  <FiStar className="text-[#F5A623] fill-[#F5A623] mb-1" size={26} />
                </div>
                <span className="text-[14px] font-semibold text-[#083952] mt-2">
                  {totalReviews} reviews
                </span>
              </div>

              {/* Right Bars */}
              <div className="flex-1 space-y-2">
                {distribution.map((d) => (
                  <div key={d.star} className="flex items-center gap-2.5 text-[13px] text-[#444444]">
                    <div className="flex items-center gap-1 w-7 shrink-0 font-medium">
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
                        className="cursor-pointer transition-transform hover:scale-110"
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

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-lg bg-[#DE7423] text-white font-bold text-[15px] hover:bg-[#C9641B] transition-colors cursor-pointer shadow-sm active:scale-[0.99]"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ─── RIGHT COLUMN: Reviews & Comments (Fixed height ~774px with desktop smooth scroll) ─── */}
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

          {/* Comments List (Desktop: smooth scroll container matching 774px height) */}
          <div className="mt-5 flex-1 overflow-y-auto pr-2 space-y-6 divide-y divide-gray-100 scroll-smooth">
            {comments.map((comment, index) => {
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
                  <p className="mt-3 text-[14px] sm:text-[15px] text-[#333333] leading-relaxed">
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
                      className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-[#083952] transition-colors cursor-pointer"
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
            })}
          </div>

          {/* Mobile "View More" toggle button */}
          {comments.length > visibleCountMobile && (
            <div className="pt-4 border-t border-gray-100 lg:hidden text-center shrink-0">
              <button
                type="button"
                onClick={() =>
                  setVisibleCountMobile((prev) =>
                    prev >= comments.length ? 3 : prev + 3
                  )
                }
                className="text-[#DE7423] font-bold text-[14px] hover:underline"
              >
                {visibleCountMobile >= comments.length
                  ? "Show Less"
                  : `View More Comments (${comments.length - visibleCountMobile} more)`}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
