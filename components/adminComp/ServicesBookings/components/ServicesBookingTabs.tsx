import React from "react";
import { FaCar } from "react-icons/fa6";
import { FiAward, FiCompass, FiHome } from "react-icons/fi";
import { ServicesBookingType } from "@/models/servicesBooking";

interface TabItem {
  type: ServicesBookingType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const TABS: TabItem[] = [
  {
    type: ServicesBookingType.RealEstate,
    label: "Real Estate",
    icon: FiHome,
    description: "Property and villa inquiries",
  },
  {
    type: ServicesBookingType.TouristService,
    label: "Tourist Services",
    icon: FiCompass,
    description: "Guided tours & activities",
  },
  {
    type: ServicesBookingType.CarRental,
    label: "Car Rentals",
    icon: FaCar,
    description: "Vehicle hire with duration",
  },
  {
    type: ServicesBookingType.VipHurghada,
    label: "VIP Hurghada",
    icon: FiAward,
    description: "Airport & limousine transfers",
  },
];

interface ServicesBookingTabsProps {
  activeTab: ServicesBookingType;
  onTabChange: (type: ServicesBookingType) => void;
  totalCounts?: Partial<Record<ServicesBookingType, number>>;
}

export function ServicesBookingTabs({
  activeTab,
  onTabChange,
  totalCounts = {},
}: ServicesBookingTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-3">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.type;
        const count = totalCounts[tab.type];

        return (
          <button
            key={tab.type}
            type="button"
            onClick={() => onTabChange(tab.type)}
            className={`flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
              isActive
                ? "bg-[#0E4A68] text-white shadow-sm ring-1 ring-[#0E4A68]"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <Icon className={`h-4 w-4 ${isActive ? "text-[#D48C28]" : "text-gray-400"}`} />
            <span>{tab.label}</span>
            {count !== undefined && count > 0 && (
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default ServicesBookingTabs;
