"use client";

import React, { useEffect, useState } from "react";
import { FiDollarSign, FiGlobe, FiLoader, FiMapPin } from "react-icons/fi";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import {
  LANG_LABELS,
  LANGS,
  type LangCode,
} from "@/models/localization";
import type {
  CreateDeliveryProductRequest,
  DeliveryProductItem,
  DeliveryProductLocalizedArea,
  UpdateDeliveryProductRequest,
} from "@/models/deliveryProduct";

interface DeliveryProductFormPanelProps {
  open: boolean;
  onClose: () => void;
  item?: DeliveryProductItem | null;
  onSubmitCreate: (data: CreateDeliveryProductRequest) => void;
  onSubmitUpdate: (data: { id: number; data: UpdateDeliveryProductRequest }) => void;
  isSubmitting: boolean;
}

const emptyArea = (): DeliveryProductLocalizedArea => ({
  en: "",
  ru: "",
  de: "",
  fr: "",
});

export function DeliveryProductFormPanel({
  open,
  onClose,
  item,
  onSubmitCreate,
  onSubmitUpdate,
  isSubmitting,
}: DeliveryProductFormPanelProps) {
  const isEdit = Boolean(item);
  const [activeTab, setActiveTab] = useState<LangCode>("en");
  const [area, setArea] = useState<DeliveryProductLocalizedArea>(emptyArea());
  const [priceUsd, setPriceUsd] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(true);

  // Initialize form state
  useEffect(() => {
    if (open) {
      if (item) {
        setArea({
          en: item.area || "",
          ru: "",
          de: "",
          fr: "",
        });
        setPriceUsd(String(item.priceUsd ?? ""));
        setIsActive(item.isActive ?? true);
      } else {
        setArea(emptyArea());
        setPriceUsd("");
        setIsActive(true);
      }
      setActiveTab("en");
    }
  }, [open, item]);

  const handleAreaChange = (lang: LangCode, value: string) => {
    setArea((prev) => ({ ...prev, [lang]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const enValue = area.en.trim();
    if (!enValue) {
      setActiveTab("en");
      return;
    }

    const price = parseFloat(priceUsd);
    if (isNaN(price) || price < 0) {
      return;
    }

    // Auto-fill other languages with EN if left blank
    const normalizedArea: DeliveryProductLocalizedArea = {
      en: enValue,
      ru: area.ru.trim() || enValue,
      de: area.de.trim() || enValue,
      fr: area.fr.trim() || enValue,
    };

    if (isEdit && item) {
      onSubmitUpdate({
        id: item.id,
        data: {
          area: normalizedArea,
          priceUsd: price,
          isActive,
        },
      });
    } else {
      onSubmitCreate({
        area: normalizedArea,
        priceUsd: price,
      });
    }
  };

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Delivery Area" : "New Delivery Area"}
      subtitle={
        isEdit
          ? "Update shipping pricing and localized area names"
          : "Define a hotel delivery zone and delivery fee"
      }
      icon={<FiMapPin className="h-5 w-5 text-[#D48C28]" />}
      footer={
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-xl border border-[#CBD5E1] bg-white px-4 py-2 text-sm font-semibold text-[#475569] hover:bg-[#F8FAFC] cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="delivery-product-form"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0E4A68] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0A3850] active:scale-[0.98] cursor-pointer disabled:opacity-50"
          >
            {isSubmitting && <FiLoader className="h-4 w-4 animate-spin" />}
            {isEdit ? "Save Changes" : "Create Area"}
          </button>
        </div>
      }
    >
      <form
        id="delivery-product-form"
        onSubmit={handleSubmit}
        className="space-y-6 font-poppins text-[#0F172A]"
      >
        {/* Language Tabs */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-2">
            Area Name (Translations)
          </label>
          <div className="flex items-center gap-1.5 border-b border-[#E2E8F0] pb-2">
            {LANGS.map((lang) => {
              const active = activeTab === lang;
              const hasValue = Boolean(area[lang]?.trim());
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setActiveTab(lang)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? "bg-[#0E4A68] text-white shadow-xs"
                      : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                  }`}
                >
                  <FiGlobe className="h-3.5 w-3.5" />
                  <span>{LANG_LABELS[lang]}</span>
                  {hasValue && (
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        active ? "bg-[#D48C28]" : "bg-[#10B981]"
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Tab Area Input */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-[#334155] mb-1">
              Area Name ({LANG_LABELS[activeTab]}){" "}
              {activeTab === "en" ? (
                <span className="text-red-500">*</span>
              ) : (
                <span className="text-xs text-[#94A3B8] font-normal">
                  (optional - defaults to EN)
                </span>
              )}
            </label>
            <input
              type="text"
              required={activeTab === "en"}
              value={area[activeTab]}
              onChange={(e) => handleAreaChange(activeTab, e.target.value)}
              placeholder={
                activeTab === "en"
                  ? "e.g. Hurghada, El Gouna, Makadi Bay"
                  : `Translation in ${LANG_LABELS[activeTab]}`
              }
              className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0E4A68] focus:outline-none focus:ring-1 focus:ring-[#0E4A68]"
            />
          </div>
        </div>

        {/* Delivery Fee Input */}
        <div>
          <label className="block text-sm font-medium text-[#334155] mb-1">
            Delivery Fee (USD) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FiDollarSign className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="number"
              step="0.01"
              min="0"
              required
              value={priceUsd}
              onChange={(e) => setPriceUsd(e.target.value)}
              placeholder="e.g. 4.00"
              className="w-full rounded-xl border border-[#CBD5E1] bg-white pl-9 pr-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0E4A68] focus:outline-none focus:ring-1 focus:ring-[#0E4A68]"
            />
          </div>
          <p className="mt-1 text-xs text-[#64748B]">
            This shipping charge will be applied to orders delivering to this area.
          </p>
        </div>

        {/* Active Toggle (Edit Mode) */}
        {isEdit && (
          <div className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
            <div>
              <p className="text-sm font-semibold text-[#0F172A]">Area Status</p>
              <p className="text-xs text-[#64748B]">
                Active areas appear in the customer checkout dropdown
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-[#CBD5E1] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#0E4A68] peer-checked:after:translate-x-full peer-focus:outline-none" />
            </label>
          </div>
        )}
      </form>
    </SlidePanel>
  );
}

export default DeliveryProductFormPanel;

