"use client";

import React from "react";
import {
  FiCheckCircle,
  FiEye,
  FiSlash,
  FiStar,
  FiTrash2,
} from "react-icons/fi";
import type { DataTableColumn } from "@/components/adminComp/Shared/DataTable";
import type { TransferReviewItem } from "@/models/transferReview";

interface BuildColumnsOptions {
  onViewDetails: (review: TransferReviewItem) => void;
  onToggleApprove: (review: TransferReviewItem) => void;
  onDelete: (review: TransferReviewItem) => void;
  isActionLoadingId?: string | null;
}

export function buildTransferReviewColumns({
  onViewDetails,
  onToggleApprove,
  onDelete,
  isActionLoadingId,
}: BuildColumnsOptions): DataTableColumn<TransferReviewItem>[] {
  return [
    {
      key: "customer",
      header: "Customer",
      render: (r) => (
        <div className="flex flex-col">
          <span className="font-medium text-[#083952]">{r.fullName}</span>
          <span className="text-xs text-[#64748B]">{r.email}</span>
          {r.phone && (
            <span className="text-[11px] text-[#94A3B8]">{r.phone}</span>
          )}
        </div>
      ),
    },
    {
      key: "rate",
      header: "Rating",
      render: (r) => (
        <div className="flex items-center gap-1.5">
          <div className="flex items-center text-[#F59E0B]">
            {[1, 2, 3, 4, 5].map((star) => (
              <FiStar
                key={star}
                className={`h-4 w-4 ${
                  star <= r.rate
                    ? "fill-[#F59E0B] text-[#F59E0B]"
                    : "text-[#E2E8F0]"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-[#083952]">
            {r.rate}/5
          </span>
        </div>
      ),
    },
    {
      key: "comment",
      header: "Comment",
      render: (r) => (
        <button
          type="button"
          onClick={() => onViewDetails(r)}
          className="group max-w-sm text-left cursor-pointer"
          title="Click to view full review details"
        >
          <p className="line-clamp-2 text-xs italic text-[#475569] group-hover:text-[#0E4A68]">
            &ldquo;{r.comment}&rdquo;
          </p>
        </button>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (r) => (
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            r.isApproved
              ? "bg-[#DCFCE7] text-[#15803D]"
              : "bg-[#FEF3C7] text-[#B45309]"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              r.isApproved ? "bg-[#15803D]" : "bg-[#B45309]"
            }`}
          />
          {r.isApproved ? "Approved" : "Pending"}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Date",
      render: (r) => {
        const dateStr = r.createdAt
          ? new Date(r.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "-";
        return <span className="text-xs text-[#64748B]">{dateStr}</span>;
      },
    },
    {
      key: "actions",
      header: <span className="sr-only">Actions</span>,
      className: "w-28 text-right",
      render: (r) => {
        const isLoading = isActionLoadingId === r.id;
        return (
          <div className="flex items-center justify-end gap-1">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => onToggleApprove(r)}
              title={r.isApproved ? "Disapprove review" : "Approve review"}
              className={`rounded-lg p-1.5 text-xs font-medium transition-colors cursor-pointer ${
                r.isApproved
                  ? "text-[#B45309] hover:bg-[#FEF3C7]"
                  : "text-[#15803D] hover:bg-[#DCFCE7]"
              } disabled:opacity-50`}
            >
              {r.isApproved ? (
                <FiSlash className="h-4 w-4" />
              ) : (
                <FiCheckCircle className="h-4 w-4" />
              )}
            </button>
            <button
              type="button"
              onClick={() => onViewDetails(r)}
              title="View full review details"
              className="rounded-lg p-1.5 text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#083952] transition-colors cursor-pointer"
            >
              <FiEye className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(r)}
              title="Delete review"
              className="rounded-lg p-1.5 text-[#EF4444] hover:bg-[#FEE2E2] transition-colors cursor-pointer"
            >
              <FiTrash2 className="h-4 w-4" />
            </button>
          </div>
        );
      },
    },
  ];
}

