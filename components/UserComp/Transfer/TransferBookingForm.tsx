"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TransferTripType } from "@/models/transferBooking";
import type { TransferLocationItem } from "@/models/transferLocation";
import { getDictionary } from "@/shared/utils/getDictionary";

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
  locale?: string;
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
  locale = "en",
}: TransferBookingFormProps) {
  const dict = getDictionary(locale);
  const t = dict.transfer.form;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="bg-[#FFFFFF] rounded-[8.38px] border-[0.52px] border-[#888888] shadow-[0px_1.05px_8.38px_1.05px_rgba(0,0,0,0.2)] p-4 sm:p-5 md:p-6 space-y-4 font-poppins"
    >
      {/* Header Row */}
      <div className="flex items-center justify-between pb-1">
        <h2 className="text-base sm:text-lg font-bold text-[#0E4A68]">
          {t.title || "Booking Form"}
        </h2>
      </div>

      {/* Row 1: From & To Locations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
            {t.pickup || "Pickup Location (From) *"}
          </label>
          <div className="relative">
            <select
              value={selectedFromId}
              onChange={(e) => onFromChange(e.target.value)}
              disabled={isLoadingLocations}
              className="w-full h-11 px-3 py-2 text-sm text-[#0E4A68] font-medium bg-[#FFFFFF] border-[0.42px] border-[#00000066] rounded-[5.24px] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition appearance-none cursor-pointer"
            >
              <option value="">
                {isLoadingLocations ? (t.loadingLocations || "Loading locations...") : (t.selectPickup || "Select Pickup Location")}
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
                alt="Dropdown arrow"
                width={12}
                height={6}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
            {t.destination || "Destination (To) *"}
          </label>
          <div className="relative">
            <select
              value={selectedToId}
              onChange={(e) => onToChange(e.target.value)}
              disabled={isLoadingLocations}
              className="w-full h-11 px-3 py-2 text-sm text-[#0E4A68] font-medium bg-[#FFFFFF] border-[0.42px] border-[#00000066] rounded-[5.24px] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition appearance-none cursor-pointer"
            >
              <option value="">
                {isLoadingLocations ? (t.loadingLocations || "Loading locations...") : (t.selectDestination || "Select Destination")}
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
                alt="Dropdown arrow"
                width={12}
                height={6}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Adults & Children */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
            {t.adults || "Adults *"}
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
            className="w-full h-11 px-3 py-2 text-sm text-[#0E4A68] font-medium bg-[#FFFFFF] border-[0.42px] border-[#00000066] rounded-[5.24px] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition placeholder:text-[#00000066]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
            {t.children || "Children (0-11 yrs)"}
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
            className="w-full h-11 px-3 py-2 text-sm text-[#0E4A68] font-medium bg-[#FFFFFF] border-[0.42px] border-[#00000066] rounded-[5.24px] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition placeholder:text-[#00000066]"
          />
        </div>
      </div>

      {/* Row 3: Trip Type */}
      <div>
        <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
          {t.tripType || "Trip Type *"}
        </label>
        <div className="flex w-full h-11 sm:h-12">
          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={() => onTripTypeChange(TransferTripType.OneWay)}
            className={`flex-1 h-full rounded-l-[5.24px] rounded-r-none text-xs sm:text-sm md:text-base font-semibold transition cursor-pointer flex items-center justify-center ${
              tripType === TransferTripType.OneWay
                ? "bg-[#0E4A68] text-[#FFFFFF] shadow-sm z-10"
                : "bg-[#FFFFFF] text-[#0E4A68]/70 border border-[#00000030] hover:bg-slate-50"
            }`}
          >
            {t.oneWay || "One Way"}
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={() => onTripTypeChange(TransferTripType.RoundTrip)}
            className={`flex-1 h-full rounded-r-[5.24px] rounded-l-none text-xs sm:text-sm md:text-base font-semibold transition cursor-pointer flex items-center justify-center -ml-[1px] ${
              tripType === TransferTripType.RoundTrip
                ? "bg-[#0E4A68] text-[#FFFFFF] shadow-sm z-10"
                : "bg-[#FFFFFF] text-[#0E4A68]/70 border border-[#00000030] hover:bg-slate-50"
            }`}
          >
            {t.roundTrip || "Round Trip"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default TransferBookingForm;
