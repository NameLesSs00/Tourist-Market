"use client";

import React, { useEffect, useState } from "react";
import { FiCalendar, FiCheck, FiLoader } from "react-icons/fi";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import {
  useExcursionAvailabilityQuery,
  useUpdateWeeklyAvailabilityMutation,
} from "@/features/excursionAvailability/useExcursionAvailability";
import { WEEK_DAYS, type UpdateDayAvailabilityItem } from "@/models/excursionAvailability";
import type { PrivateExcursionListItem } from "@/models/privateExcursion";

interface PrivateExcursionAvailabilityPanelProps {
  excursion: PrivateExcursionListItem | null;
  open: boolean;
  onClose: () => void;
}

const PRESETS = [
  { label: "Every Day", fn: () => true },
  { label: "Weekdays (Sun-Thu)", fn: (d: number) => d >= 0 && d <= 4 },
  { label: "Weekends (Fri-Sat)", fn: (d: number) => d === 5 || d === 6 },
  { label: "Clear All", fn: () => false, destructive: true },
];

export function PrivateExcursionAvailabilityPanel({
  excursion,
  open,
  onClose,
}: PrivateExcursionAvailabilityPanelProps) {
  const excursionId = excursion?.id ?? "";
  const { data, isLoading } = useExcursionAvailabilityQuery(open ? excursionId : null);
  const updateMutation = useUpdateWeeklyAvailabilityMutation();

  const [daysState, setDaysState] = useState<UpdateDayAvailabilityItem[]>(() =>
    WEEK_DAYS.map((w) => ({ dayNo: w.dayNo, isAvailable: true }))
  );

  useEffect(() => {
    if (data?.data?.days && data.data.days.length > 0) {
      const map = new Map(data.data.days.map((d) => [d.dayNo, d.isAvailable]));
      setDaysState(
        WEEK_DAYS.map((w) => ({
          dayNo: w.dayNo,
          isAvailable: map.has(w.dayNo) ? Boolean(map.get(w.dayNo)) : false,
        }))
      );
    }
  }, [data]);

  const toggleDay = (dayNo: number) => {
    setDaysState((prev) =>
      prev.map((d) => (d.dayNo === dayNo ? { ...d, isAvailable: !d.isAvailable } : d))
    );
  };

  const handleSave = () => {
    if (!excursionId) return;
    updateMutation.mutate(
      { excursionId, body: { days: daysState } },
      { onSuccess: () => onClose() }
    );
  };

  const activeCount = daysState.filter((d) => d.isAvailable).length;

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title="Excursion Operating Days"
      subtitle={`Configure weekly availability schedule for "${excursion?.title ?? "Excursion"}"`}
      icon={<FiCalendar className="h-5 w-5 text-[#0E4A68]" />}
      widthClassName="max-w-xl"
      footer={
        <div className="flex w-full items-center justify-between">
          <span className="text-xs text-[#64748B]">
            Operating: <strong className="text-[#083952]">{activeCount} of 7 days</strong>
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={updateMutation.isPending}
              className="rounded-xl border border-[#E2E8F0] px-4 py-2 text-xs font-semibold text-[#64748B] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={updateMutation.isPending || isLoading}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#0E4A68] px-5 py-2 text-xs font-semibold text-[#FFFFFF] shadow-sm hover:bg-[#0A374E] transition-all cursor-pointer disabled:opacity-50"
            >
              {updateMutation.isPending && <FiLoader className="h-4 w-4 animate-spin" />}
              Save Availability
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
            Quick Presets
          </p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setDaysState(WEEK_DAYS.map((w) => ({ dayNo: w.dayNo, isAvailable: p.fn(w.dayNo) })))}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  p.destructive
                    ? "border-[#FCA5A5] bg-[#FEF2F2] text-[#B91C1C] hover:bg-[#FEE2E2]"
                    : "border-[#E2E8F0] bg-[#FFFFFF] text-[#083952] hover:bg-[#F1F5F9]"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
            Weekly Days
          </p>
          {isLoading ? (
            <div className="flex h-48 items-center justify-center">
              <FiLoader className="h-6 w-6 animate-spin text-[#0E4A68]" />
            </div>
          ) : (
            <div className="space-y-2">
              {WEEK_DAYS.map((w) => {
                const isAvail = Boolean(daysState.find((d) => d.dayNo === w.dayNo)?.isAvailable);
                return (
                  <div
                    key={w.dayNo}
                    onClick={() => toggleDay(w.dayNo)}
                    className={`flex items-center justify-between rounded-xl border p-3 transition-all cursor-pointer ${
                      isAvail ? "border-[#86EFAC] bg-[#F0FDF4]" : "border-[#E2E8F0] bg-[#FFFFFF] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                          isAvail ? "bg-[#16A34A] text-[#FFFFFF]" : "bg-[#F1F5F9] text-[#64748B]"
                        }`}
                      >
                        {w.short}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#083952]">{w.name}</p>
                        <p className="text-[11px] text-[#64748B]">Day #{w.dayNo}</p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        isAvail ? "bg-[#DCFCE7] text-[#15803D]" : "bg-[#F1F5F9] text-[#64748B]"
                      }`}
                    >
                      {isAvail && <FiCheck className="h-3 w-3" />}
                      {isAvail ? "Operating" : "Closed"}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </SlidePanel>
  );
}
