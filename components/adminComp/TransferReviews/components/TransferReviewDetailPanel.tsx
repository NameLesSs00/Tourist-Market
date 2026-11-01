"use client";

import React from "react";
import {
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiMail,
  FiMessageSquare,
  FiPhone,
  FiSlash,
  FiStar,
  FiTrash2,
  FiUser,
} from "react-icons/fi";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import type { TransferReviewItem } from "@/models/transferReview";

interface TransferReviewDetailPanelProps {
  review: TransferReviewItem | null;
  open: boolean;
  onClose: () => void;
  onToggleApprove: (review: TransferReviewItem) => void;
  onDelete: (review: TransferReviewItem) => void;
  isActionLoading?: boolean;
}

export function TransferReviewDetailPanel({
  review,
  open,
  onClose,
  onToggleApprove,
  onDelete,
  isActionLoading = false,
}: TransferReviewDetailPanelProps) {
  if (!review) return null;

  const createdAtFormatted = review.createdAt
    ? new Date(review.createdAt).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "-";

  const approvedAtFormatted = review.approvedAt
    ? new Date(review.approvedAt).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title="Transfer Review Details"
      subtitle={`Feedback from ${review.fullName}`}
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
              onClick={() => onToggleApprove(review)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-[#FFFFFF] shadow-sm transition-all cursor-pointer ${
                review.isApproved
                  ? "bg-[#D97706] hover:bg-[#B45309]"
                  : "bg-[#16A34A] hover:bg-[#15803D]"
              } disabled:opacity-50`}
            >
              {review.isApproved ? (
                <>
                  <FiSlash className="h-4 w-4" /> Disapprove Review
                </>
              ) : (
                <>
                  <FiCheckCircle className="h-4 w-4" /> Approve Review
                </>
              )}
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-6 p-6">
        {/* Rating and Status Card */}
        <div className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
          <div>
            <p className="text-xs font-medium text-[#64748B]">Rating</p>
            <div className="mt-1 flex items-center gap-1 text-[#F59E0B]">
              {[1, 2, 3, 4, 5].map((star) => (
                <FiStar
                  key={star}
                  className={`h-5 w-5 ${
                    star <= review.rate
                      ? "fill-[#F59E0B] text-[#F59E0B]"
                      : "text-[#CBD5E1]"
                  }`}
                />
              ))}
              <span className="ml-1.5 text-sm font-bold text-[#083952]">
                {review.rate} / 5
              </span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs font-medium text-[#64748B]">Current Status</p>
            <div className="mt-1">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                  review.isApproved
                    ? "bg-[#DCFCE7] text-[#15803D]"
                    : "bg-[#FEF3C7] text-[#B45309]"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    review.isApproved ? "bg-[#15803D]" : "bg-[#B45309]"
                  }`}
                />
                {review.isApproved ? "Approved & Live" : "Pending Approval"}
              </span>
            </div>
          </div>
        </div>

        {/* Full Comment */}
        <div className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 shadow-xs">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
            Customer Review
          </h4>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-[#334155]">
            &ldquo;{review.comment}&rdquo;
          </p>
        </div>

        {/* Customer Information */}
        <div className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 shadow-xs">
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
            Reviewer Information
          </h4>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D]">
                <FiUser className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#94A3B8]">Full Name</p>
                <p className="text-xs font-semibold text-[#083952]">
                  {review.fullName}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#2563EB]">
                <FiMail className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#94A3B8]">Email Address</p>
                <p className="text-xs font-semibold text-[#083952] break-all">
                  {review.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FAF5FF] text-[#9333EA]">
                <FiPhone className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#94A3B8]">Phone Number</p>
                <p className="text-xs font-semibold text-[#083952]">
                  {review.phone || "-"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F8FAFC] text-[#64748B]">
                <FiCalendar className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#94A3B8]">Submitted On</p>
                <p className="text-xs font-semibold text-[#083952]">
                  {createdAtFormatted}
                </p>
              </div>
            </div>
          </div>

          {approvedAtFormatted && (
            <div className="mt-4 flex items-center gap-2 border-t border-[#F1F5F9] pt-3 text-xs text-[#64748B]">
              <FiClock className="h-3.5 w-3.5 text-[#94A3B8]" />
              <span>Approved at: {approvedAtFormatted}</span>
            </div>
          )}
        </div>
      </div>
    </SlidePanel>
  );
}

