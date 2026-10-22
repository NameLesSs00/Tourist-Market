"use client";

import React from "react";
import {
  FiCalendar,
  FiCheckCircle,
  FiMail,
  FiMessageSquare,
  FiPhone,
  FiSlash,
  FiSliders,
  FiStar,
  FiThumbsUp,
  FiTrash2,
  FiUser,
} from "react-icons/fi";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import type { ServiceReviewItem } from "@/models/serviceReview";

interface ServiceReviewDetailPanelProps {
  review: ServiceReviewItem | null;
  serviceTitle?: string;
  open: boolean;
  onClose: () => void;
  onTogglePublish: (review: ServiceReviewItem) => void;
  onDelete: (review: ServiceReviewItem) => void;
  isActionLoading?: boolean;
}

export function ServiceReviewDetailPanel({
  review,
  serviceTitle,
  open,
  onClose,
  onTogglePublish,
  onDelete,
  isActionLoading = false,
}: ServiceReviewDetailPanelProps) {
  if (!review) return null;

  const dateStr = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title="Site Service Item Review Details"
      subtitle={`Review by ${review.fullName}`}
      icon={<FiMessageSquare className="h-5 w-5 text-[#0E4A68]" />}
      widthClassName="max-w-xl"
      footer={
        <div className="flex w-full items-center justify-between">
          <button
            type="button"
            onClick={() => onDelete(review)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#FCA5A5] bg-[#FEF2F2] px-4 py-2 text-xs font-semibold text-[#B91C1C] hover:bg-[#FEE2E2] transition-colors cursor-pointer"
          >
            <FiTrash2 className="h-4 w-4" /> Delete
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#E2E8F0] px-4 py-2 text-xs font-semibold text-[#64748B] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              disabled={isActionLoading}
              onClick={() => onTogglePublish(review)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-[#FFFFFF] shadow-sm transition-all cursor-pointer ${
                review.isPublished ? "bg-[#D97706] hover:bg-[#B45309]" : "bg-[#16A34A] hover:bg-[#15803D]"
              } disabled:opacity-50`}
            >
              {review.isPublished ? <><FiSlash className="h-4 w-4" /> Unpublish Review</> : <><FiCheckCircle className="h-4 w-4" /> Publish Review</>}
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-5 p-6">
        {/* Status & Rating Banner */}
        <div className="flex items-center justify-between rounded-xl bg-[#F8FAFC] p-4 border border-[#E2E8F0]">
          <div>
            <p className="text-xs font-medium text-[#64748B]">Rating</p>
            <div className="mt-1 flex items-center gap-1 text-[#F59E0B]">
              {[1, 2, 3, 4, 5].map((star) => (
                <FiStar
                  key={star}
                  className={`h-5 w-5 ${star <= review.rate ? "fill-[#F59E0B] text-[#F59E0B]" : "text-[#CBD5E1]"}`}
                />
              ))}
              <span className="ml-1 text-sm font-bold text-[#083952]">{review.rate} of 5</span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs font-medium text-[#64748B]">Publication</p>
            <span
              className={`mt-1 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                review.isPublished ? "bg-[#DCFCE7] text-[#15803D]" : "bg-[#FEF3C7] text-[#B45309]"
              }`}
            >
              {review.isPublished ? "Published" : "Pending Moderation"}
            </span>
          </div>
        </div>

        {/* Associated Site Service Item */}
        <div className="rounded-xl border border-[#E2E8F0] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Associated Site Service Item</p>
          <div className="mt-2 flex items-center gap-2">
            <FiSliders className="h-4 w-4 text-[#0E4A68]" />
            <span className="font-semibold text-[#083952]">{review.subServiceName || serviceTitle || "Site Service Item"}</span>
          </div>
        </div>

        {/* Customer Review Comment */}
        <div className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Customer Comment</p>
          <blockquote className="mt-2 text-sm leading-relaxed text-[#334155] italic whitespace-pre-wrap">
            &ldquo;{review.comment}&rdquo;
          </blockquote>
        </div>

        {/* Customer Details */}
        <div className="rounded-xl border border-[#E2E8F0] p-4 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Customer Details</p>
          <div className="flex items-center gap-2 text-sm text-[#334155]">
            <FiUser className="h-4 w-4 text-[#64748B]" />
            <span>{review.fullName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#334155]">
            <FiMail className="h-4 w-4 text-[#64748B]" />
            <a href={`mailto:${review.email}`} className="text-[#0E4A68] hover:underline">{review.email}</a>
          </div>
          {review.phone && (
            <div className="flex items-center gap-2 text-sm text-[#334155]">
              <FiPhone className="h-4 w-4 text-[#64748B]" />
              <a href={`tel:${review.phone}`} className="text-[#0E4A68] hover:underline">{review.phone}</a>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-[#64748B]">
            <div className="flex items-center gap-1.5">
              <FiThumbsUp className="h-3.5 w-3.5 text-[#94A3B8]" />
              <span>{review.helpfulCount} helpful</span>
            </div>
            {dateStr && (
              <div className="flex items-center gap-1.5">
                <FiCalendar className="h-3.5 w-3.5 text-[#94A3B8]" />
                <span>{dateStr}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </SlidePanel>
  );
}
