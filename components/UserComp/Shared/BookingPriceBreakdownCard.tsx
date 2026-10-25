"use client";

import React from "react";
import { FaCar } from "react-icons/fa6";
import { FiCheck, FiLoader, FiMapPin, FiPackage, FiUsers } from "react-icons/fi";
import type {
  PreviewGroupPriceResponse,
  PreviewPrivatePriceResponse,
} from "@/models/excursionPricePreview";

export interface BookingPriceBreakdownCardProps {
  privateResult?: PreviewPrivatePriceResponse | null;
  groupResult?: PreviewGroupPriceResponse | null;
  isLoading?: boolean;
  className?: string;
}

export function BookingPriceBreakdownCard({
  privateResult,
  groupResult,
  isLoading = false,
  className = "",
}: BookingPriceBreakdownCardProps) {
  if (isLoading) {
    return (
      <div className={`rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 text-center shadow-xs ${className}`}>
        <div className="flex flex-col items-center justify-center gap-2.5 py-6 text-xs text-[#64748B]">
          <FiLoader className="h-6 w-6 animate-spin text-[#0E4A68]" />
          <span>Calculating total price...</span>
        </div>
      </div>
    );
  }

  if (privateResult) {
    const curr = privateResult.currency || "USD";
    return (
      <div className={`rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 shadow-xs text-xs space-y-4 ${className}`}>
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
          <div className="flex items-center gap-1.5 font-semibold text-[#083952]">
            <FaCar className="h-3.5 w-3.5 text-[#0E4A68]" />
            <span>Private Transfer ({privateResult.vehicleType})</span>
          </div>
          <span className="text-[11px] text-[#64748B]">
            {privateResult.totalPassengers} Passenger{privateResult.totalPassengers === 1 ? "" : "s"}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-[#475569]">
            <span>Base Excursion Fare</span>
            <span className="font-semibold text-[#083952]">{privateResult.baseExcursionPrice} {curr}</span>
          </div>

          {privateResult.attractionItems && privateResult.attractionItems.length > 0 && (
            <div className="space-y-1 rounded-xl bg-[#F8FAFC] p-2.5">
              <div className="flex items-center justify-between font-semibold text-[#083952]">
                <span className="flex items-center gap-1">
                  <FiMapPin className="h-3 w-3 text-[#D48C28]" />
                  Attractions ({privateResult.attractionItems.length})
                </span>
                <span>{privateResult.attractionsTotal} {curr}</span>
              </div>
              {privateResult.attractionItems.map((a) => (
                <div key={a.attractionId} className="flex items-center justify-between text-[11px] text-[#64748B]">
                  <span className="truncate pr-2">{a.title}</span>
                  <span>{a.itemTotal} {curr}</span>
                </div>
              ))}
            </div>
          )}

          {privateResult.serviceItems && privateResult.serviceItems.length > 0 && (
            <div className="space-y-1 rounded-xl bg-[#F8FAFC] p-2.5">
              <div className="flex items-center justify-between font-semibold text-[#083952]">
                <span className="flex items-center gap-1">
                  <FiPackage className="h-3 w-3 text-[#0E4A68]" />
                  Extra Services ({privateResult.serviceItems.length})
                </span>
                <span>{privateResult.servicesTotal} {curr}</span>
              </div>
              {privateResult.serviceItems.map((s) => (
                <div key={s.serviceId} className="flex items-center justify-between text-[11px] text-[#64748B]">
                  <span className="truncate pr-2">{s.title}</span>
                  <span>{s.itemTotal} {curr}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-[#16A34A33] bg-[#16A34A0C] p-3 text-xs">
          <div className="flex items-center justify-between text-sm font-bold text-[#16A34A]">
            <span className="flex items-center gap-1.5">
              <FiCheck className="h-4 w-4" />
              Total Price
            </span>
            <span className="text-lg font-extrabold">{privateResult.finalPrice} {curr}</span>
          </div>
        </div>
      </div>
    );
  }

  if (groupResult) {
    const curr = groupResult.currency || "USD";
    return (
      <div className={`rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 shadow-xs text-xs space-y-4 ${className}`}>
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
          <div className="flex items-center gap-1.5 font-semibold text-[#083952]">
            <FiUsers className="h-3.5 w-3.5 text-[#0E4A68]" />
            <span>Group Tour Rates</span>
          </div>
          <span className="text-[11px] text-[#64748B]">
            {groupResult.totalPassengers} Passenger{groupResult.totalPassengers === 1 ? "" : "s"}
          </span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[#475569]">
            <span>Adults ({groupResult.adults} x {groupResult.adultPricePerPerson} {curr})</span>
            <span className="font-semibold text-[#083952]">
              {groupResult.adults * groupResult.adultPricePerPerson} {curr}
            </span>
          </div>
          {groupResult.children > 0 && (
            <div className="flex items-center justify-between text-[#475569]">
              <span>Children ({groupResult.children} x {groupResult.childPricePerPerson} {curr})</span>
              <span className="font-semibold text-[#083952]">
                {groupResult.children * groupResult.childPricePerPerson} {curr}
              </span>
            </div>
          )}
          {groupResult.infants > 0 && (
            <div className="flex items-center justify-between text-[#475569]">
              <span>Infants ({groupResult.infants} x {groupResult.infantPricePerPerson} {curr})</span>
              <span className="font-semibold text-[#083952]">
                {groupResult.infants * groupResult.infantPricePerPerson} {curr}
              </span>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-[#16A34A33] bg-[#16A34A0C] p-3 text-xs">
          <div className="flex items-center justify-between text-sm font-bold text-[#16A34A]">
            <span className="flex items-center gap-1.5">
              <FiCheck className="h-4 w-4" />
              Total Price
            </span>
            <span className="text-lg font-extrabold">{groupResult.finalPrice} {curr}</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default BookingPriceBreakdownCard;
