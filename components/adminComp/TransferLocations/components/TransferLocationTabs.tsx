"use client";

import React from "react";
import { FiCornerUpRight, FiMapPin } from "react-icons/fi";
import type { TransferLocationType } from "@/models/transferLocation";

interface TransferLocationTabsProps {
  activeTab: TransferLocationType;
  onTabChange: (tab: TransferLocationType) => void;
  fromCount: number;
  toCount: number;
}

export function TransferLocationTabs({
  activeTab,
  onTabChange,
  fromCount,
  toCount,
}: TransferLocationTabsProps) {
  return (
    <div className="inline-flex rounded-2xl border border-[#0E4A6815] bg-[#F8FAFC] p-1.5 shadow-2xs">
      <button
        type="button"
        onClick={() => onTabChange("from")}
        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
          activeTab === "from"
            ? "bg-[#0E4A68] text-white shadow-xs"
            : "text-[#64748B] hover:text-[#083952] hover:bg-white/60"
        }`}
      >
        <FiCornerUpRight className="h-3.5 w-3.5" />
        <span>Pickup / From Locations</span>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
            activeTab === "from"
              ? "bg-white/20 text-white"
              : "bg-slate-200 text-[#334155]"
          }`}
        >
          {fromCount}
        </span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange("to")}
        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
          activeTab === "to"
            ? "bg-[#0E4A68] text-white shadow-xs"
            : "text-[#64748B] hover:text-[#083952] hover:bg-white/60"
        }`}
      >
        <FiMapPin className="h-3.5 w-3.5" />
        <span>Destination / To Locations</span>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
            activeTab === "to"
              ? "bg-white/20 text-white"
              : "bg-slate-200 text-[#334155]"
          }`}
        >
          {toCount}
        </span>
      </button>
    </div>
  );
}
