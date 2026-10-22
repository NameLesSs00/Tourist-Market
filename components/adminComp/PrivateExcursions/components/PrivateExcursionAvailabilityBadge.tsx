"use client";

import React from "react";
import { FiCalendar } from "react-icons/fi";
import { useExcursionAvailabilityQuery } from "@/features/excursionAvailability/useExcursionAvailability";

interface PrivateExcursionAvailabilityBadgeProps {
  excursionId: string;
  onClick?: () => void;
}

export function PrivateExcursionAvailabilityBadge({
  excursionId,
  onClick,
}: PrivateExcursionAvailabilityBadgeProps) {
  const { data, isLoading } = useExcursionAvailabilityQuery(excursionId);

  if (isLoading) {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] text-[#94A3B8]">
        <FiCalendar className="h-3 w-3 animate-pulse" />
        <span>Loading...</span>
      </span>
    );
  }

  const days = data?.data?.days ?? [];
  const availableDays = days.filter((d) => d.isAvailable);
  const availableCount = availableDays.length;
  const tooltip = availableDays.map((d) => d.dayName).join(", ") || "No operating days";

  if (availableCount === 7) {
    return (
      <button
        type="button"
        onClick={onClick}
        title={tooltip}
        className="inline-flex items-center gap-1 rounded-md bg-[#DCFCE7] px-2 py-0.5 text-[11px] font-semibold text-[#15803D] hover:bg-[#BBF7D0] transition-colors cursor-pointer"
      >
        <FiCalendar className="h-3 w-3" />
        <span>Daily (7 days)</span>
      </button>
    );
  }

  if (availableCount > 0) {
    return (
      <button
        type="button"
        onClick={onClick}
        title={tooltip}
        className="inline-flex items-center gap-1 rounded-md bg-[#E0F2FE] px-2 py-0.5 text-[11px] font-semibold text-[#0369A1] hover:bg-[#BAE6FD] transition-colors cursor-pointer"
      >
        <FiCalendar className="h-3 w-3" />
        <span>{availableCount} days/wk</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      title="No operating days configured"
      className="inline-flex items-center gap-1 rounded-md bg-[#FEF3C7] px-2 py-0.5 text-[11px] font-semibold text-[#B45309] hover:bg-[#FDE68A] transition-colors cursor-pointer"
    >
      <FiCalendar className="h-3 w-3" />
      <span>Set Schedule</span>
    </button>
  );
}
