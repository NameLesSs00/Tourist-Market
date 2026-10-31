"use client";

import React from "react";
import { FiCalendar, FiClock, FiFileText, FiHelpCircle, FiImage, FiStar, FiUsers } from "react-icons/fi";
import type { DataTableColumn } from "@/components/adminComp/Shared";
import type { GroupExcursionListItem } from "@/models/groupExcursion";

interface BuildGroupColumnsOptions {
  onManageDetails?: (item: GroupExcursionListItem) => void;
  onManagePhotos?: (item: GroupExcursionListItem) => void;
  onManageAvailability?: (item: GroupExcursionListItem) => void;
  onManageFaqs?: (item: GroupExcursionListItem) => void;
}

const formatThumbnailUrl = (url?: string | null) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "") || "https://touristtt.runasp.net";
  return `${base}${url.startsWith("/") ? "" : "/"}${url}`;
};

export function buildGroupExcursionColumns({
  onManageDetails,
  onManagePhotos,
  onManageAvailability,
  onManageFaqs,
}: BuildGroupColumnsOptions = {}): DataTableColumn<GroupExcursionListItem>[] {
  return [
    {
      key: "excursion",
      header: "Group Excursion",
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-2xs">
            {item.primaryImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={formatThumbnailUrl(item.primaryImageUrl)}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400">
                <FiImage className="h-4 w-4" />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#083952] line-clamp-2">{item.title}</span>
              {item.isFeatured && (
                <span className="shrink-0 inline-flex items-center gap-1 rounded-md bg-[#D48C2815] px-1.5 py-0.5 text-[10px] font-semibold text-[#D48C28]">
                  <FiStar className="h-2.5 w-2.5 fill-current" /> Featured
                </span>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (item) => (
        <span className="rounded-lg bg-[#0E4A680D] px-2.5 py-1 text-xs font-semibold text-[#0E4A68]">
          {item.category?.categoryTitle || item.categoryTitle || "Excursion"}
        </span>
      ),
    },
    {
      key: "price",
      header: "Pricing",
      render: (item) => {
        const curr = item.price?.currencyCode || "USD";
        return (
          <div className="space-y-0.5 text-xs">
            <div className="font-bold text-[#0E4A68]">
              {item.price?.adultPrice ?? 0} {curr} <span className="text-[10px] font-normal text-[#64748B]">/ adult</span>
            </div>
            {(item.price?.childPrice || item.price?.infantPrice) ? (
              <div className="text-[11px] text-[#64748B]">
                Child: {item.price?.childPrice ?? 0} {curr}
              </div>
            ) : null}
          </div>
        );
      },
    },
    {
      key: "specs",
      header: "Specs",
      render: (item) => (
        <div className="space-y-1 text-xs text-[#475569]">
          <div className="flex items-center gap-1">
            <FiClock className="h-3 w-3 text-[#0E4A68]" />
            <span>{item.durationHours} hrs</span>
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <FiStar className="h-3 w-3 text-[#D48C28] fill-[#D48C28]" />
            <span>{item.stars || item.rating || "5"} Stars</span>
          </div>
          {typeof item.maxParticipants === "number" && item.maxParticipants > 0 ? (
            <div className="flex items-center gap-1 text-[11px] text-[#0E4A68] font-medium">
              <FiUsers className="h-3 w-3" />
              <span>Max {item.maxParticipants} pax</span>
            </div>
          ) : null}
        </div>
      ),
    },
    {
      key: "actions",
      header: "Media & Details",
      render: (item) => (
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onManagePhotos?.(item)}
            title="Manage Gallery & Hero Image"
            className="inline-flex items-center gap-1 rounded-lg border border-[#0E4A6833] bg-[#0E4A680C] px-2 py-1 text-xs font-semibold text-[#0E4A68] hover:bg-[#0E4A6818] transition cursor-pointer shadow-2xs"
          >
            <FiImage className="h-3 w-3 text-[#0E4A68]" />
            <span>Photos</span>
          </button>
          <button
            type="button"
            onClick={() => onManageDetails?.(item)}
            title="Configure Itinerary, Highlights, Inclusions & Policies"
            className="inline-flex items-center gap-1 rounded-lg border border-[#D48C2833] bg-[#D48C280C] px-2 py-1 text-xs font-semibold text-[#D48C28] hover:bg-[#D48C2818] transition cursor-pointer shadow-2xs"
          >
            <FiFileText className="h-3 w-3 text-[#D48C28]" />
            <span>Details</span>
          </button>
          <button
            type="button"
            onClick={() => onManageFaqs?.(item)}
            title="Manage Frequently Asked Questions"
            className="inline-flex items-center gap-1 rounded-lg border border-[#6366F133] bg-[#6366F10C] px-2 py-1 text-xs font-semibold text-[#4F46E5] hover:bg-[#6366F118] transition cursor-pointer shadow-2xs"
          >
            <FiHelpCircle className="h-3 w-3 text-[#4F46E5]" />
            <span>FAQs</span>
          </button>
          <button
            type="button"
            onClick={() => onManageAvailability?.(item)}
            title="Configure Weekly Operating Days"
            className="inline-flex items-center gap-1 rounded-lg border border-[#16A34A33] bg-[#16A34A0C] px-2 py-1 text-xs font-semibold text-[#16A34A] hover:bg-[#16A34A18] transition cursor-pointer shadow-2xs"
          >
            <FiCalendar className="h-3 w-3 text-[#16A34A]" />
            <span>Days</span>
          </button>
        </div>
      ),
    },
  ];
}

export default buildGroupExcursionColumns;
