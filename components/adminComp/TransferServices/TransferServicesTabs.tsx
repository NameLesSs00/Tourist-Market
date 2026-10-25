"use client";

import React from "react";
import { FiCornerUpRight, FiDollarSign, FiMapPin } from "react-icons/fi";

export type TransferServicesTab = "prices" | "from" | "to";

interface TransferServicesTabsProps {
  activeTab: TransferServicesTab;
  onTabChange: (tab: TransferServicesTab) => void;
  pricesCount?: number;
  fromCount?: number;
  toCount?: number;
}

export function TransferServicesTabs({
  activeTab,
  onTabChange,
  pricesCount,
  fromCount,
  toCount,
}: TransferServicesTabsProps) {
  const tabs = [
    {
      id: "prices" as const,
      label: "Route Prices",
      icon: FiDollarSign,
      count: pricesCount,
    },
    {
      id: "from" as const,
      label: "Pickup Locations",
      icon: FiCornerUpRight,
      count: fromCount,
    },
    {
      id: "to" as const,
      label: "Destination Locations",
      icon: FiMapPin,
      count: toCount,
    },
  ];

  return (
    <div className="inline-flex flex-wrap rounded-2xl border border-[#0E4A6815] bg-[#F8FAFC] p-1.5 shadow-2xs">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
              isActive
                ? "bg-[#0E4A68] text-white shadow-xs"
                : "text-[#64748B] hover:text-[#083952] hover:bg-white/60"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            <span>{tab.label}</span>
            {typeof tab.count === "number" && (
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-200 text-[#334155]"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
