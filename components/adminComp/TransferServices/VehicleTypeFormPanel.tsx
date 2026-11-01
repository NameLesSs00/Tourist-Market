"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiClock, FiPercent, FiUsers } from "react-icons/fi";
import { toast } from "sonner";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import {
  LANG_FLAGS,
  LANG_LABELS,
  LANGS,
  type LangCode,
  type LocalizedText,
} from "@/models/localization";
import type {
  CreateVehicleTypeTransferRequest,
  VehicleTypeTransferItem,
} from "@/models/vehicleTypeTransfer";
import { getVehicleTypeIcon } from "./vehicleIconHelper";

interface VehicleTypeFormPanelProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateVehicleTypeTransferRequest) => Promise<void>;
  initialData?: VehicleTypeTransferItem | null;
  isSubmitting?: boolean;
}

const emptyLocalized = (): LocalizedText => ({
  en: "",
  ru: "",
  de: "",
  fr: "",
});

export function VehicleTypeFormPanel({
  open,
  onClose,
  onSubmit,
  initialData,
  isSubmitting = false,
}: VehicleTypeFormPanelProps) {
  const isEdit = Boolean(initialData);

  const [name, setName] = useState<LocalizedText>(emptyLocalized());
  const [fromPerson, setFromPerson] = useState<number>(1);
  const [toPerson, setToPerson] = useState<number>(3);
  const [additionalHoursUsd, setAdditionalHoursUsd] = useState<number>(10);
  const [discountPercentage, setDiscountPercentage] = useState<number>(10);

  useEffect(() => {
    if (initialData && open) {
      setName({
        en: initialData.name || "",
        ru: "",
        de: "",
        fr: "",
      });
      setFromPerson(initialData.fromPerson ?? 1);
      setToPerson(initialData.toPerson ?? 3);
      setAdditionalHoursUsd(initialData.additionalHours ?? 10);
      setDiscountPercentage(initialData.discountPercentage ?? 10);
    } else if (!initialData && open) {
      setName(emptyLocalized());
      setFromPerson(1);
      setToPerson(3);
      setAdditionalHoursUsd(10);
      setDiscountPercentage(10);
    }
  }, [initialData, open]);

  const handleNameChange = (lang: LangCode, value: string) => {
    setName((prev) => ({ ...prev, [lang]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.en?.trim()) {
      toast.error("English vehicle name is required.");
      return;
    }
    if (Number(fromPerson) < 1) {
      toast.error("Minimum passenger count must be at least 1.");
      return;
    }
    if (Number(toPerson) < Number(fromPerson)) {
      toast.error("Maximum passengers cannot be less than minimum passengers.");
      return;
    }

    await onSubmit({
      name: {
        en: name.en.trim(),
        ru: name.ru?.trim() || undefined,
        de: name.de?.trim() || undefined,
        fr: name.fr?.trim() || undefined,
      },
      fromPerson: Number(fromPerson),
      toPerson: Number(toPerson),
      additionalHoursUsd: Number(additionalHoursUsd) || 0,
      discountPercentage: Number(discountPercentage) || 0,
    });
  };

  const DynamicVehicleIcon = getVehicleTypeIcon(name.en, toPerson);

  const footer = (
    <div className="flex items-center justify-end gap-3">
      <button
        type="button"
        onClick={onClose}
        disabled={isSubmitting}
        className="rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-xs font-semibold text-[#334155] shadow-2xs hover:bg-[#F8FAFC] transition disabled:opacity-50"
      >
        Cancel
      </button>
      <button
        type="submit"
        form="vehicle-type-form"
        disabled={isSubmitting}
        className="rounded-xl bg-[#0E4A68] px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#083952] transition disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : isEdit ? "Update Vehicle Type" : "Create Vehicle Type"}
      </button>
    </div>
  );

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Vehicle Type" : "Create Vehicle Type"}
      subtitle="Configure vehicle naming in all languages, passenger capacity, and pricing rates."
      icon={<DynamicVehicleIcon className="h-5 w-5 text-[#0E4A68]" />}
      footer={footer}
      widthClassName="max-w-xl"
    >
      <form id="vehicle-type-form" onSubmit={handleSubmit} className="space-y-5 p-6">
        {/* Multilingual Vehicle Name */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-[#083952]">
              Vehicle Name (Multi-Language)
            </label>
            <p className="mt-0.5 text-[11px] text-[#64748B]">
              English is required. Other languages will fallback to English if left blank.
            </p>
          </div>

          <div className="space-y-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
            {LANGS.map((lang) => {
              const isEn = lang === "en";
              const inputId = `vehicle-name-${lang}`;

              return (
                <div key={lang} className="space-y-1">
                  <label
                    htmlFor={inputId}
                    className="flex items-center gap-2 text-xs font-semibold text-[#334155]"
                  >
                    <span className="relative flex h-3.5 w-5 shrink-0 overflow-hidden rounded-xs border border-[#CBD5E1] shadow-2xs">
                      <Image
                        src={LANG_FLAGS[lang]}
                        alt={LANG_LABELS[lang]}
                        fill
                        className="object-cover"
                        sizes="20px"
                      />
                    </span>
                    <span className="rounded-md bg-[#0E4A68] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                      {lang}
                    </span>
                    <span>{LANG_LABELS[lang]}</span>
                    {isEn ? (
                      <span className="text-[#DC2626]">*</span>
                    ) : (
                      <span className="text-[11px] font-normal text-[#94A3B8]">(Optional)</span>
                    )}
                  </label>
                  <input
                    id={inputId}
                    type="text"
                    value={name[lang] || ""}
                    onChange={(e) => handleNameChange(lang, e.target.value)}
                    placeholder={isEn ? "e.g. Standard Sedan, Minibus" : `${LANG_LABELS[lang]} name`}
                    className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A6826]"
                    required={isEn}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Capacity Settings */}
        <div className="space-y-3">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-[#083952]">
            <FiUsers className="h-3.5 w-3.5 text-[#0E4A68]" />
            <span>Passenger Capacity Range</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-[#64748B] mb-1">
                Minimum Passengers *
              </label>
              <input
                type="number"
                min="1"
                value={fromPerson}
                onChange={(e) => setFromPerson(Number(e.target.value))}
                className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2 text-sm text-[#0F172A] focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A6826]"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-[#64748B] mb-1">
                Maximum Passengers *
              </label>
              <input
                type="number"
                min="1"
                value={toPerson}
                onChange={(e) => setToPerson(Number(e.target.value))}
                className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2 text-sm text-[#0F172A] focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A6826]"
                required
              />
            </div>
          </div>
        </div>

        {/* Pricing Rules */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-[#083952] mb-1">
              <FiClock className="h-3.5 w-3.5 text-[#0E4A68]" />
              <span>Extra Hour Rate ($)</span>
            </label>
            <input
              type="number"
              step="0.5"
              min="0"
              value={additionalHoursUsd}
              onChange={(e) => setAdditionalHoursUsd(Number(e.target.value))}
              placeholder="e.g. 10"
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2 text-sm text-[#0F172A] focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A6826]"
            />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-[#083952] mb-1">
              <FiPercent className="h-3.5 w-3.5 text-[#0E4A68]" />
              <span>Round-Trip Discount (%)</span>
            </label>
            <input
              type="number"
              step="0.5"
              min="0"
              max="100"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(Number(e.target.value))}
              placeholder="e.g. 15"
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2 text-sm text-[#0F172A] focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A6826]"
            />
          </div>
        </div>
      </form>
    </SlidePanel>
  );
}
