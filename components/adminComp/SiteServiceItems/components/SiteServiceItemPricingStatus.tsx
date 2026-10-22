"use client";

import React from "react";
import { FiCheckCircle, FiDollarSign, FiEyeOff, FiLayers } from "react-icons/fi";
import type { SiteServiceItem } from "@/models/siteService";

interface SiteServiceItemPricingStatusProps {
  serviceId: string;
  services: SiteServiceItem[];
  isLoadingServices: boolean;
  basePriceUSD: number;
  isActive: boolean;
  errors: Record<string, string>;
  onServiceChange: (serviceId: string) => void;
  onPriceChange: (price: number) => void;
  onStatusChange: (active: boolean) => void;
}

export function SiteServiceItemPricingStatus({
  serviceId,
  services,
  isLoadingServices,
  basePriceUSD,
  isActive,
  errors,
  onServiceChange,
  onPriceChange,
  onStatusChange,
}: SiteServiceItemPricingStatusProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Parent Site Service */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#083952] flex items-center gap-1.5">
            <FiLayers className="h-3.5 w-3.5 text-[#0E4A68]" />
            <span>Parent Site Service</span>
            <span className="text-[#DC2626]">*</span>
          </label>
          <select
            value={serviceId}
            onChange={(e) => onServiceChange(e.target.value)}
            disabled={isLoadingServices}
            className={`w-full rounded-xl border bg-white px-3 py-2 text-xs text-[#083952] shadow-2xs transition-colors focus:outline-none focus:ring-2 ${
              errors.serviceId
                ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20"
                : "border-[#CBD5E1] focus:border-[#0E4A68] focus:ring-[#0E4A68]/20"
            }`}
          >
            <option value="">
              {isLoadingServices ? "Loading site services..." : "Select parent service..."}
            </option>
            {services.map((svc) => (
              <option key={svc.id} value={svc.id}>
                {svc.title || "Untitled Service"}
              </option>
            ))}
          </select>
          {errors.serviceId && (
            <p className="text-[11px] text-[#EF4444]">{errors.serviceId}</p>
          )}
        </div>

        {/* Base Price USD */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#083952] flex items-center gap-1.5">
            <FiDollarSign className="h-3.5 w-3.5 text-[#0E4A68]" />
            <span>Base Price (USD)</span>
            <span className="text-[#DC2626]">*</span>
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-2 text-xs font-bold text-[#64748B]">
              $
            </span>
            <input
              type="number"
              min={0}
              step="any"
              value={Number.isNaN(basePriceUSD) ? "" : basePriceUSD}
              onChange={(e) => onPriceChange(parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className={`w-full rounded-xl border bg-white pl-7 pr-3 py-2 text-xs text-[#083952] shadow-2xs transition-colors focus:outline-none focus:ring-2 ${
                errors.basePriceUSD
                  ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20"
                  : "border-[#CBD5E1] focus:border-[#0E4A68] focus:ring-[#0E4A68]/20"
              }`}
            />
          </div>
          {errors.basePriceUSD && (
            <p className="text-[11px] text-[#EF4444]">{errors.basePriceUSD}</p>
          )}
        </div>
      </div>

      {/* Status Toggle */}
      <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#083952]">Item Status</span>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                isActive
                  ? "bg-[#ECFDF5] text-[#059669]"
                  : "bg-[#F1F5F9] text-[#64748B]"
              }`}
            >
              {isActive ? (
                <>
                  <FiCheckCircle className="h-3 w-3" /> Active
                </>
              ) : (
                <>
                  <FiEyeOff className="h-3 w-3" /> Inactive
                </>
              )}
            </span>
          </div>
          <p className="text-[11px] text-[#64748B]">
            {isActive
              ? "Available to clients under the parent service."
              : "Hidden from client booking."}
          </p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={isActive}
          onClick={() => onStatusChange(!isActive)}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#0E4A68]/20 ${
            isActive ? "bg-[#059669]" : "bg-[#CBD5E1]"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
              isActive ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
