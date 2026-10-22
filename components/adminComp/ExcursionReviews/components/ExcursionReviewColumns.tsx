"use client";

import React from "react";
import {
  FiCheckCircle,
  FiEye,
  FiSlash,
  FiStar,
  FiThumbsUp,
  FiTrash2,
} from "react-icons/fi";
import type { DataTableColumn } from "@/components/adminComp/Shared/DataTable";
import type { ExcursionReviewItem } from "@/models/excursionReview";

interface BuildColumnsOptions {
  excursionsMap: Map<string, string>;
  onViewDetails: (review: ExcursionReviewItem) => void;
  onTogglePublish: (review: ExcursionReviewItem) => void;
  onDelete: (review: ExcursionReviewItem) => void;
  isActionLoadingId?: string | null;
}

export function buildExcursionReviewColumns({
  excursionsMap,
  onViewDetails,
  onTogglePublish,
  onDelete,
  isActionLoadingId,
}: BuildColumnsOptions): DataTableColumn<ExcursionReviewItem>[] {
  return [
    {
      key: "name",
      header: "Customer",
      render: (r) => (
        <div className="flex flex-col">
          <span className="font-medium text-[#083952]">{r.customerName}</span>
          <span className="text-xs text-[#64748B]">{r.customerEmail}</span>
        </div>
      ),
    },
    {
      key: "excursion",
      header: "Excursion",
      render: (r) => {
        const title = r.excursionName || excursionsMap.get(r.excursionId) || "Excursion";
        return (
          <div className="flex flex-col max-w-[200px]">
            <span className="truncate text-sm font-medium text-[#0E4A68]">
              {title}
            </span>
          </div>
        );
      },
    },
    {
      key: "rating",
      header: "Rating",
      render: (r) => (
        <div className="flex items-center gap-1.5">
          <div className="flex items-center text-[#F59E0B]">
            {[1, 2, 3, 4, 5].map((star) => (
              <FiStar
                key={star}
                className={`h-4 w-4 ${
                  star <= r.rating
                    ? "fill-[#F59E0B] text-[#F59E0B]"
                    : "text-[#E2E8F0]"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-[#083952]">
            {r.rating}/5
          </span>
        </div>
      ),
    },
    {
      key: "review",
      header: "Review",
      render: (r) => (
        <button
          type="button"
          onClick={() => onViewDetails(r)}
          className="group max-w-xs text-left cursor-pointer"
          title="Click to view full review"
        >
          {r.title && (
            <p className="truncate text-xs font-semibold text-[#083952] group-hover:text-[#0E4A68]">
              {r.title}
            </p>
          )}
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
            r.isPublished
              ? "bg-[#DCFCE7] text-[#15803D]"
              : "bg-[#FEF3C7] text-[#B45309]"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              r.isPublished ? "bg-[#15803D]" : "bg-[#B45309]"
            }`}
          />
          {r.isPublished ? "Published" : "Pending"}
        </span>
      ),
    },
    {
      key: "helpful",
      header: "Helpful",
      render: (r) => (
        <span className="inline-flex items-center gap-1 text-xs text-[#64748B]">
          <FiThumbsUp className="h-3.5 w-3.5 text-[#94A3B8]" />
          {r.helpfulCount}
        </span>
      ),
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
              onClick={() => onTogglePublish(r)}
              title={r.isPublished ? "Unpublish review" : "Publish review"}
              className={`rounded-lg p-1.5 text-xs font-medium transition-colors cursor-pointer ${
                r.isPublished
                  ? "text-[#B45309] hover:bg-[#FEF3C7]"
                  : "text-[#15803D] hover:bg-[#DCFCE7]"
              } disabled:opacity-50`}
            >
              {r.isPublished ? (
                <FiSlash className="h-4 w-4" />
              ) : (
                <FiCheckCircle className="h-4 w-4" />
              )}
            </button>
            <button
              type="button"
              onClick={() => onViewDetails(r)}
              title="View full review"
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
