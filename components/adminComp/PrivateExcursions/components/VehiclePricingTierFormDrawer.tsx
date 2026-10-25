"use client";

import React, { useEffect, useState } from "react";
import { FaBus, FaCar } from "react-icons/fa6";
import { FiAlertCircle, FiDollarSign, FiUsers } from "react-icons/fi";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import { useVehiclePrivatesQuery } from "@/features/vehiclePrivate/useVehiclePrivateAdmin";
import type {
  VehicleTransferPrivateCreateRequest,
  VehicleTransferPrivateItem,
  VehicleTransferPrivateUpdateRequest,
} from "@/models/vehicleTransferPrivate";

interface VehiclePricingTierFormDrawerProps {
  open: boolean;
  onClose: () => void;
  tier?: VehicleTransferPrivateItem | null;
  privateExcursionId: string;
  onSubmitCreate: (body: VehicleTransferPrivateCreateRequest) => void;
  onSubmitUpdate: (id: string, body: VehicleTransferPrivateUpdateRequest) => void;
  isSubmitting: boolean;
}

function getTierDescription(to: number): { label: string; isBus: boolean } {
  if (to <= 3) return { label: "Car (1–3 passengers)", isBus: false };
  if (to <= 9) return { label: "Microbus (4–9 passengers)", isBus: false };
  if (to <= 16) return { label: "Minibus (10–16 passengers)", isBus: true };
  return { label: "Bus (17–35 passengers)", isBus: true };
}

export function VehiclePricingTierFormDrawer({
  open, onClose, tier, privateExcursionId, onSubmitCreate, onSubmitUpdate, isSubmitting,
}: VehiclePricingTierFormDrawerProps) {
  const isEdit = Boolean(tier);
  const [vehiclePrivateId, setVehiclePrivateId] = useState("");
  const [fromCount, setFromCount] = useState<number>(1);
  const [toCount, setToCount] = useState<number>(3);
  const [priceUSD, setPriceUSD] = useState<string>("25");
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const vehiclesQuery = useVehiclePrivatesQuery({ pageSize: 100 });
  const vehicles = vehiclesQuery.data?.data?.items ?? [];

  useEffect(() => {
    setVehiclePrivateId(tier ? tier.vehiclePrivateId || "" : vehicles[0]?.id || "");
    setFromCount(tier ? tier.from ?? 1 : 1);
    setToCount(tier ? tier.to ?? 3 : 3);
    setPriceUSD(tier ? String(tier.priceUSD ?? tier.price ?? 25) : "25");
    setIsActive(tier ? (tier.isActive !== undefined ? tier.isActive : true) : true);
    setError(null);
  }, [tier, open, vehicles]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!vehiclePrivateId) return setError("Please select a private vehicle.");
    if (fromCount < 1) return setError("Minimum passenger count must be at least 1.");
    if (toCount < fromCount) return setError("Maximum passenger count cannot be less than minimum.");
    const priceNum = parseFloat(priceUSD);
    if (isNaN(priceNum) || priceNum < 0) return setError("Please enter a valid price in USD.");

    if (isEdit && tier) {
      onSubmitUpdate(tier.id, { privateExcursionId, vehiclePrivateId, from: fromCount, to: toCount, priceUSD: priceNum, isActive });
    } else {
      onSubmitCreate({ privateExcursionId, vehiclePrivateId, from: fromCount, to: toCount, priceUSD: priceNum });
    }
  };

  const tierInfo = getTierDescription(toCount);

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Vehicle Rate" : "Add Vehicle Rate"}
      subtitle={isEdit ? "Update passenger capacity and price for this vehicle tier." : "Define price for a vehicle tier and passenger count range."}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
            <FiAlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Private Vehicle *</label>
          <select
            value={vehiclePrivateId}
            onChange={(e) => setVehiclePrivateId(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-[#0E4A68] focus:bg-white"
            required
          >
            <option value="" disabled>Select vehicle...</option>
            {vehicles.map((v) => (<option key={v.id} value={v.id}>{v.name} {!v.isActive ? "(Inactive)" : ""}</option>))}
          </select>
        </div>

        <div className="space-y-1.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Min Passengers (From) *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><FiUsers className="h-3.5 w-3.5" /></span>
                <input
                  type="number"
                  min="1"
                  value={fromCount}
                  onChange={(e) => setFromCount(parseInt(e.target.value, 10) || 1)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-8 pr-3 py-2 text-xs font-medium text-slate-800 outline-none focus:border-[#0E4A68] focus:bg-white"
                  required
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Max Passengers (To) *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><FiUsers className="h-3.5 w-3.5" /></span>
                <input
                  type="number"
                  min={fromCount}
                  value={toCount}
                  onChange={(e) => setToCount(parseInt(e.target.value, 10) || 1)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-8 pr-3 py-2 text-xs font-medium text-slate-800 outline-none focus:border-[#0E4A68] focus:bg-white"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[11px] text-slate-600">
            {tierInfo.isBus ? <FaBus className="h-3.5 w-3.5 text-[#0E4A68]" /> : <FaCar className="h-3.5 w-3.5 text-[#0E4A68]" />}
            <span>Matching Category: <strong>{tierInfo.label}</strong></span>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Price (USD) *</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><FiDollarSign className="h-3.5 w-3.5" /></span>
            <input
              type="number"
              step="0.01"
              min="0"
              value={priceUSD}
              onChange={(e) => setPriceUSD(e.target.value)}
              placeholder="0.00"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-8 pr-3 py-2 text-xs font-medium text-slate-800 outline-none focus:border-[#0E4A68] focus:bg-white"
              required
            />
          </div>
        </div>

        {isEdit && (
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-3">
            <div>
              <p className="text-xs font-semibold text-slate-800">Active Rate</p>
              <p className="text-[11px] text-slate-500">When inactive, this tier cannot be booked.</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={isActive}
              onClick={() => setIsActive(!isActive)}
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
                isActive ? "bg-[#0E4A68]" : "bg-slate-300"
              }`}
            >
              <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${isActive ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
        )}

        <div className="mt-2 flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-[#0E4A68] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#083952] cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : isEdit ? "Update Rate" : "Add Rate"}
          </button>
        </div>
      </form>
    </SlidePanel>
  );
}
