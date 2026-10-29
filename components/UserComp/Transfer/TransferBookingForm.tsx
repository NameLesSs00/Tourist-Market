"use client";

import React from "react";
import Image from "next/image";
import { toast } from "sonner";
import { TransferTripType } from "@/models/transferBooking";
import type { TransferLocationItem } from "@/models/transferLocation";

interface TransferBookingFormProps {
  fromLocations: TransferLocationItem[];
  toLocations: TransferLocationItem[];
  selectedFromId: string;
  selectedToId: string;
  adults: number;
  childrenCount: number;
  tripType: TransferTripType;
  isLoadingLocations?: boolean;
  onFromChange: (id: string) => void;
  onToChange: (id: string) => void;
  onAdultsChange: (count: number) => void;
  onChildrenChange: (count: number) => void;
  onTripTypeChange: (type: TransferTripType) => void;
}

export function TransferBookingForm({
  fromLocations,
  toLocations,
  selectedFromId,
  selectedToId,
  adults,
  childrenCount,
  tripType,
  isLoadingLocations = false,
  onFromChange,
  onToChange,
  onAdultsChange,
  onChildrenChange,
  onTripTypeChange,
}: TransferBookingFormProps) {
  const handleShare = async () => {
    try {
      if (typeof window !== "undefined") {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(window.location.href);
          toast.success("Link copied to clipboard!");
        } else {
          toast.info("Share URL: " + window.location.href);
        }
      }
    } catch {
      toast.error("Failed to copy link.");
    }
  };

  return (
    <div className="bg-[#FFFFFF] rounded-[8.38px] border-[0.52px] border-[#888888] shadow-[0px_1.05px_8.38px_1.05px_rgba(0,0,0,0.2)] p-5 md:p-6 space-y-4 font-poppins">
      {/* Header Row: Title & Share Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-bold text-[#0E4A68]">
          Booking Form
        </h2>
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6.29px] border-[0.52px] border-[#DDDDDD] bg-[#F5F5F5] text-xs font-semibold text-[#0E4A68] hover:bg-gray-200 transition cursor-pointer shadow-xs"
        >
          <span className="relative w-3.5 h-3.5 flex items-center justify-center">
            <Image
              src="/transfer/share.svg"
              alt="Share"
              width={14}
              height={14}
              className="object-contain"
            />
          </span>
          <span>Share</span>
        </button>
      </div>

      {/* Row 1: From & To Locations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
            From *
          </label>
          <div className="relative">
            <select
              value={selectedFromId}
              onChange={(e) => onFromChange(e.target.value)}
              disabled={isLoadingLocations}
              className="w-full h-11 px-3 py-2 text-sm text-[#0E4A68] font-medium bg-[#FFFFFF] border-[0.42px] border-[#00000066] rounded-[5.24px] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition appearance-none cursor-pointer"
            >
              <option value="" disabled>
                {isLoadingLocations ? "Loading locations..." : "Select Pickup Location"}
              </option>
              {fromLocations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <Image
                src="/transfer/Vector (5).svg"
                alt="Select dropdown"
                width={12}
                height={6}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
            To *
          </label>
          <div className="relative">
            <select
              value={selectedToId}
              onChange={(e) => onToChange(e.target.value)}
              disabled={isLoadingLocations}
              className="w-full h-11 px-3 py-2 text-sm text-[#0E4A68] font-medium bg-[#FFFFFF] border-[0.42px] border-[#00000066] rounded-[5.24px] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition appearance-none cursor-pointer"
            >
              <option value="" disabled>
                {isLoadingLocations ? "Loading locations..." : "Select Dropoff Location"}
              </option>
              {toLocations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <Image
                src="/transfer/Vector (5).svg"
                alt="Select dropdown"
                width={12}
                height={6}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Adults & Children */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
            Adults *
          </label>
          <input
            type="number"
            min={1}
            max={50}
            value={adults}
            onChange={(e) => {
              const val = Math.max(1, parseInt(e.target.value) || 1);
              onAdultsChange(val);
            }}
            placeholder="1"
            className="w-full h-11 px-3 py-2 text-sm text-[#0E4A68] font-medium bg-[#FFFFFF] border-[0.42px] border-[#00000066] rounded-[5.24px] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition placeholder:text-[#00000066] placeholder:font-normal"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
            Children
          </label>
          <input
            type="number"
            min={0}
            max={50}
            value={childrenCount}
            onChange={(e) => {
              const val = Math.max(0, parseInt(e.target.value) || 0);
              onChildrenChange(val);
            }}
            placeholder="0"
            className="w-full h-11 px-3 py-2 text-sm text-[#0E4A68] font-medium bg-[#FFFFFF] border-[0.42px] border-[#00000066] rounded-[5.24px] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition placeholder:text-[#00000066] placeholder:font-normal"
          />
        </div>
      </div>

      {/* Row 3: Trip Type */}
      <div>
        <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
          Trip Type *
        </label>
        <div className="flex w-full md:h-[57.61px] h-12">
          <button
            type="button"
            onClick={() => onTripTypeChange(TransferTripType.OneWay)}
            className={`flex-1 h-full rounded-l-[5.24px] rounded-r-none text-sm md:text-base font-medium transition cursor-pointer flex items-center justify-center ${
              tripType === TransferTripType.OneWay
                ? "bg-[#0E4A68] text-[#FFFFFF] border-[0.25px] border-[#000000] z-10"
                : "bg-[#FFFFFF] text-[#00000066] border-[0.42px] border-[#00000066] hover:bg-slate-50"
            }`}
          >
            One Way
          </button>
          <button
            type="button"
            onClick={() => onTripTypeChange(TransferTripType.RoundTrip)}
            className={`flex-1 h-full rounded-r-[5.24px] rounded-l-none text-sm md:text-base font-medium transition cursor-pointer flex items-center justify-center -ml-[1px] ${
              tripType === TransferTripType.RoundTrip
                ? "bg-[#0E4A68] text-[#FFFFFF] border-[0.25px] border-[#000000] z-10"
                : "bg-[#FFFFFF] text-[#00000066] border-[0.42px] border-[#00000066] hover:bg-slate-50"
            }`}
          >
            Round Trip
          </button>
        </div>
      </div>
    </div>
  );
}
