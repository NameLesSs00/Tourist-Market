"use client";

import React from "react";
import { PrivateAttraction, PrivateExtraService } from "../../types";
import { useClientDictionary } from "@/shared/providers/ClientDictionaryContext";
import { useCurrencyStore } from "@/features/currencies/currencyStore";

interface PrivateSidebarPriceBreakdownProps {
  selectedAttractions: PrivateAttraction[];
  selectedExtraServices: PrivateExtraService[];
  attractionsTotal: number;
  extrasTotal: number;
  vehiclePrice: number;
  totalPrice: number;
  adults: number;
  children: number;
  infants: number;
  isVehicleLoading: boolean;
  matchedVehicle?: {
    vehicleName: string;
    from: number;
    to: number;
    price: number;
    currency: string;
  } | null;
  currency?: string;
  locale?: string;
}

export function PrivateSidebarPriceBreakdown({
  selectedAttractions,
  selectedExtraServices,
  attractionsTotal,
  extrasTotal,
  vehiclePrice,
  totalPrice,
  adults,
  children,
  infants,
  isVehicleLoading,
  matchedVehicle,
  currency = "$",
  locale = "en",
}: PrivateSidebarPriceBreakdownProps) {
  const dict = useClientDictionary();
  const t = dict.privateExcursions.details.sidebar;
  const formatPrice = useCurrencyStore((s) => s.formatPrice);

  return (
    <div className="space-y-3 pt-1">
      <h3 className="text-[14px] font-bold text-[#083952]">
        {t.priceSummary || "Price Summary"}
      </h3>

      {/* Attractions Breakdown Box */}
      <div
        className="p-3 rounded-lg bg-white space-y-2"
        style={{ border: "0.6px solid #DE7423" }}
      >
        <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#0E4A68]">
          <svg
            className="w-4 h-4 text-[#DE7423]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
            />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          <span>{t.attractions || "Attractions :"}</span>
        </div>
        {selectedAttractions.length === 0 ? (
          <p className="text-[12px] text-gray-500 italic pl-5">
            {t.noAttractions || "No attractions selected"}
          </p>
        ) : (
          <div className="pl-5 space-y-1">
            {selectedAttractions.map((att) => {
              const sub =
                att.adultPrice * adults +
                att.childPrice * children +
                att.infantPrice * infants;
              return (
                <div
                  key={att.id}
                  className="flex items-center justify-between text-[12px] text-[#444444]"
                >
                  <span className="truncate pr-2 font-medium">
                    {att.title}
                  </span>
                  <span className="shrink-0 font-bold text-[#DE7423]">
                    {formatPrice(sub)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
        <div className="border-t border-gray-100 pt-1.5 flex items-center justify-between text-[13px] font-bold text-[#DE7423]">
          <span>{t.attractionsTotal || "Attractions Total :"}</span>
          <span>{formatPrice(attractionsTotal)}</span>
        </div>
      </div>

      {/* Extra Services Breakdown Box */}
      <div
        className="p-3 rounded-lg bg-white space-y-2"
        style={{ border: "0.6px solid #DE7423" }}
      >
        <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#0E4A68]">
          <svg
            className="w-4 h-4 text-[#DE7423]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <span>{t.extraServices || "Extra Services :"}</span>
        </div>
        {selectedExtraServices.length === 0 ? (
          <p className="text-[12px] text-gray-500 italic pl-5">
            {t.noExtras || "No extra services selected"}
          </p>
        ) : (
          <div className="pl-5 space-y-1">
            {selectedExtraServices.map((ext) => {
              const sub =
                ext.adultPrice * adults +
                ext.childPrice * children +
                ext.infantPrice * infants;
              return (
                <div
                  key={ext.id}
                  className="flex items-center justify-between text-[12px] text-[#444444]"
                >
                  <span className="truncate pr-2 font-medium">
                    {ext.title}
                  </span>
                  <span className="shrink-0 font-bold text-[#DE7423]">
                    {formatPrice(sub)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
        <div className="border-t border-gray-100 pt-1.5 flex items-center justify-between text-[13px] font-bold text-[#DE7423]">
          <span>{t.extrasTotal || "Extras Total :"}</span>
          <span>{formatPrice(extrasTotal)}</span>
        </div>
      </div>

      {/* Vehicle Breakdown Box */}
      <div
        className="p-3 rounded-lg bg-white space-y-2"
        style={{ border: "0.6px solid #DE7423" }}
      >
        <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#0E4A68]">
          <svg
            className="w-4 h-4 text-[#DE7423]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 17h8M5 11l2-5h10l2 5M3 13v6h2v-2h14v2h2v-6l-2-2H5l-2 2z"
            />
            <circle cx="7.5" cy="14.5" r="1.5" />
            <circle cx="16.5" cy="14.5" r="1.5" />
          </svg>
          <span>{t.vehicle || "Vehicle :"}</span>
        </div>
        {isVehicleLoading ? (
          <div className="pl-5 flex items-center gap-2 text-[12px] text-gray-400">
            <div className="w-3 h-3 border-2 border-[#DE7423] border-t-transparent rounded-full animate-spin" />
            <span>{t.checkingVehicle || "Loading..."}</span>
          </div>
        ) : matchedVehicle ? (
          <div className="pl-5 flex items-center justify-between text-[12px] text-[#444444]">
            <span>
              {matchedVehicle.vehicleName} ({matchedVehicle.from}-{matchedVehicle.to} {t.passengers || "pax"})
            </span>
            <span className="font-bold text-[#DE7423]">
              {formatPrice(matchedVehicle.price)}
            </span>
          </div>
        ) : (
          <p className="pl-5 text-[12px] text-gray-400 italic">
            {t.noVehicle || "No vehicle matched"}
          </p>
        )}
        <div className="border-t border-gray-100 pt-1.5 flex items-center justify-between text-[13px] font-bold text-[#DE7423]">
          <span>{t.vehicleTotal || "Vehicle Total :"}</span>
          <span>{formatPrice(vehiclePrice)}</span>
        </div>
      </div>

      {/* Total Price Row */}
      <div className="pt-2 flex items-center justify-between">
        <span className="text-[20px] sm:text-[22px] font-bold text-[#083952]">
          {t.totalPrice || "Total Price:"}
        </span>
        <span className="text-[26px] sm:text-[28px] font-extrabold text-[#DE7423]">
          {formatPrice(totalPrice)}
        </span>
      </div>
    </div>
  );
}

export default PrivateSidebarPriceBreakdown;

