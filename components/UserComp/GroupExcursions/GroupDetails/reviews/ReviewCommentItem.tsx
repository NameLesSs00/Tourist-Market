"use client";

import React from "react";
import { FiStar, FiThumbsUp, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";
import { ReviewComment } from "../../types";

interface ReviewCommentItemProps {
  comment: ReviewComment;
  isLiked: boolean;
  onLike: (id: string) => void;
  isHiddenOnMobile?: boolean;
}

export function ReviewCommentItem({
  comment,
  isLiked,
  onLike,
  isHiddenOnMobile = false,
}: ReviewCommentItemProps) {
  return (
    <div
      className={`pt-5 first:pt-0 ${
        isHiddenOnMobile ? "hidden lg:block" : "block"
      }`}
    >
      <div className="flex items-start justify-between">
        {/* User info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#B8C2CA] flex items-center justify-center text-white shrink-0">
            <FiUser size={20} />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm sm:text-[16px] font-bold text-[#083952] leading-snug truncate">
              {comment.author}
            </h4>
            <span className="text-[11px] sm:text-[12px] text-gray-500">
              {comment.date}
            </span>
          </div>
        </div>
      </div>

      {/* Comment text */}
      <p className="mt-2.5 sm:mt-3 text-xs sm:text-[14px] md:text-[15px] text-[#333333] leading-relaxed break-words">
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

        <motion.button
          type="button"
          onClick={() => onLike(comment.id)}
          disabled={isLiked}
          whileTap={{ scale: 0.85 }}
          className={`flex items-center gap-1.5 text-[13px] transition-colors ${
            isLiked
              ? "text-[#DE7423] cursor-default"
              : "text-gray-500 hover:text-[#083952] cursor-pointer"
          }`}
        >
          <FiThumbsUp
            size={15}
            className={isLiked ? "text-[#DE7423] fill-[#DE7423]" : ""}
          />
          <span>{comment.likes}</span>
        </motion.button>
      </div>
    </div>
  );
}

export default ReviewCommentItem;
