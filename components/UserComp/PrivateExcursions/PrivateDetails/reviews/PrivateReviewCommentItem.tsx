"use client";

import React from "react";
import { FiStar, FiThumbsUp, FiUser } from "react-icons/fi";
import type { ReviewComment } from "../../types";

interface PrivateReviewCommentItemProps {
  comment: ReviewComment;
  isLiked: boolean;
  onLike: (id: string) => void;
}

export function PrivateReviewCommentItem({
  comment,
  isLiked,
  onLike,
}: PrivateReviewCommentItemProps) {
  return (
    <div
      className="p-4 sm:p-5 rounded-xl bg-white border border-[#E5E5E5] space-y-3 transition-shadow hover:shadow-xs"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#0E4A68]/10 text-[#0E4A68] flex items-center justify-center font-bold text-sm shrink-0">
            <FiUser size={18} />
          </div>
          <div>
            <h4 className="text-[15px] font-bold text-[#0E4A68]">
              {comment.author}
            </h4>
            <span className="text-[12px] text-gray-500">
              {comment.date}
            </span>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <FiStar
              key={star}
              size={14}
              className={`${
                star <= comment.rating
                  ? "text-[#F5A623] fill-[#F5A623]"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>


      <p className="text-[13.5px] text-[#444444] leading-relaxed">
        {comment.content}
      </p>

      {/* Helpful button */}
      <div className="flex items-center justify-end pt-1">
        <button
          type="button"
          onClick={() => onLike(comment.id)}
          disabled={isLiked}
          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md transition-colors ${
            isLiked
              ? "text-[#DE7423] bg-[#DE7423]/10 cursor-default"
              : "text-[#646464] hover:text-[#0E4A68] hover:bg-gray-100 cursor-pointer"
          }`}
        >
          <FiThumbsUp size={13} className={isLiked ? "fill-[#DE7423]" : ""} />
          <span>{comment.likes}</span>
        </button>
      </div>
    </div>
  );
}

export default PrivateReviewCommentItem;

