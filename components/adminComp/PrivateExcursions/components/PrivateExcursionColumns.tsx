"use client";

import React from "react";
import { FiCalendar, FiClock, FiMapPin, FiStar } from "react-icons/fi";
import type { DataTableColumn } from "@/components/adminComp/Shared";
import type { PrivateExcursionListItem } from "@/models/privateExcursion";
import { PrivateExcursionAvailabilityBadge } from "./PrivateExcursionAvailabilityBadge";

interface BuildColumnsOptions {
  onManageAvailability: (item: PrivateExcursionListItem) => void;
}

export function buildPrivateExcursionColumns({
  onManageAvailability,
}: BuildColumnsOptions): DataTableColumn<PrivateExcursionListItem>[] {
  return [
    {
      key: "excursion",
      header: "Private Excursion",
      render: (item) => (
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#083952]">{item.title}</span>
            {item.isFeatured && (
              <span className="inline-flex items-center gap-1 rounded-md bg-[#D48C2815] px-1.5 py-0.5 text-[10px] font-semibold text-[#D48C28]">
                <FiStar className="h-2.5 w-2.5 fill-current" /> Featured
              </span>
            )}
          </div>
          {item.subtitle && (
            <p className="text-xs text-[#64748B] line-clamp-1">{item.subtitle}</p>
          )}
          <div className="flex items-center gap-2 text-[11px] text-[#94A3B8]">
            <span className="rounded bg-[#F1F5F9] px-1.5 py-0.5 font-medium text-[#475569]">
              {item.excursionType || "Private Tour"}
            </span>
            <span>/{item.slug}</span>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (item) => (
        <span className="rounded-lg bg-[#0E4A680D] px-2.5 py-1 text-xs font-semibold text-[#0E4A68]">
          {item.categoryTitle || "Excursion"}
        </span>
      ),
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
            <FiMapPin className="h-3 w-3 text-[#D48C28]" />
            <span>Max {item.maxAttractions} attractions</span>
          </div>
        </div>
      ),
    },
    {
      key: "prices",
      header: "Prices (USD)",
      render: (item) => {
        const p = item.prices?.[0];
        return (
          <div className="space-y-0.5 text-xs">
            <div className="font-semibold text-[#0F172A]">
              ${p?.adultPrice ?? 0}{" "}
              <span className="text-[10px] font-normal text-[#64748B]">adult</span>
            </div>
            <div className="text-[11px] text-[#64748B]">
              ${p?.childPrice ?? 0} child · ${p?.infantPrice ?? 0} inf
            </div>
          </div>
        );
      },
    },
    {
      key: "availability",
      header: "Operating Days",
      render: (item) => (
        <div className="flex items-center gap-1.5">
          <PrivateExcursionAvailabilityBadge
            excursionId={item.id}
            onClick={() => onManageAvailability(item)}
          />
          <button
            type="button"
            onClick={() => onManageAvailability(item)}
            title="Configure Weekly Schedule"
            className="rounded-lg p-1 text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0E4A68] transition-colors cursor-pointer"
          >
            <FiCalendar className="h-3.5 w-3.5" />
          </button>
        </div>
      ),
    },
  ];
}
