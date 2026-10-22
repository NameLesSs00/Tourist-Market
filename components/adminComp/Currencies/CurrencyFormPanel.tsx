"use client";

import React, { useEffect, useState } from "react";
import { FiCheck, FiDollarSign, FiHash, FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import type {
  CurrencyItem,
  CurrencyUpsertRequest,
} from "@/models/currency";

interface CurrencyFormPanelProps {
  open: boolean;
  onClose: () => void;
  currency?: CurrencyItem | null;
  onSubmitCreate: (body: CurrencyUpsertRequest) => void;
  onSubmitUpdate: (data: { id: number; body: CurrencyUpsertRequest }) => void;
  isSubmitting: boolean;
}

export function CurrencyFormPanel({
  open,
  onClose,
  currency,
  onSubmitCreate,
  onSubmitUpdate,
  isSubmitting,
}: CurrencyFormPanelProps) {
  const isEdit = Boolean(currency);

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [exchangeRate, setExchangeRate] = useState<string>("1");
  const [isActive, setIsActive] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEdit && currency) {
      setCode(currency.code || "");
      setName(currency.name || "");
      setSymbol(currency.symbol || "");
      setExchangeRate(String(currency.exchangeRate ?? 1));
      setIsActive(currency.isActive ?? true);
      setErrors({});
    } else if (!isEdit) {
      setCode("");
      setName("");
      setSymbol("");
      setExchangeRate("1");
      setIsActive(true);
      setErrors({});
    }
  }, [currency, isEdit, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      newErrors.code = "Currency code is required.";
    } else if (cleanCode.length < 2 || cleanCode.length > 5) {
      newErrors.code = "Currency code must be 2 to 5 characters (e.g. USD).";
    }

    if (!name.trim()) {
      newErrors.name = "Currency name is required.";
    }

    if (!symbol.trim()) {
      newErrors.symbol = "Currency symbol is required (e.g. $, €).";
    }

    const rateNum = parseFloat(exchangeRate);
    if (isNaN(rateNum) || rateNum <= 0) {
      newErrors.exchangeRate = "Exchange rate must be a positive number greater than 0.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields properly.");
      return;
    }

    const body: CurrencyUpsertRequest = {
      code: cleanCode,
      name: name.trim(),
      symbol: symbol.trim(),
      exchangeRate: rateNum,
      isActive,
    };

    if (isEdit && currency) {
      onSubmitUpdate({ id: currency.id, body });
    } else {
      onSubmitCreate(body);
    }
  };

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title={isEdit ? `Edit Currency (${currency?.code})` : "Add New Currency"}
      subtitle={
        isEdit
          ? "Update currency symbol, exchange conversion rate, and availability status."
          : "Define a new currency code, display symbol, and multiplier exchange rate."
      }
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-xl border border-[#CBD5E1] bg-white px-4 py-2.5 text-sm font-semibold text-[#334155] shadow-2xs hover:bg-[#F8FAFC] disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="currency-form"
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-xl bg-[#0E4A68] px-5 py-2.5 text-sm font-semibold text-white shadow-2xs hover:bg-[#093247] disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting && <FiLoader className="h-4 w-4 animate-spin" />}
            {isSubmitting
              ? "Saving..."
              : isEdit
              ? "Save Changes"
              : "Create Currency"}
          </button>
        </>
      }
    >
      <form
        id="currency-form"
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5"
      >
        {/* Code & Symbol Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Currency Code */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-[#083952]">
              <FiDollarSign className="h-3.5 w-3.5 text-[#0E4A68]" />
              <span>Currency Code</span>
              <span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="text"
              maxLength={5}
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                if (errors.code) setErrors((prev) => ({ ...prev, code: "" }));
              }}
              placeholder="e.g. USD, EUR, GBP"
              className={`w-full font-mono uppercase rounded-xl border bg-white px-3.5 py-2.5 text-xs text-[#083952] placeholder-[#94A3B8] shadow-2xs transition-colors focus:outline-none focus:ring-2 ${
                errors.code
                  ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20"
                  : "border-[#CBD5E1] focus:border-[#0E4A68] focus:ring-[#0E4A68]/20"
              }`}
            />
            {errors.code ? (
              <p className="text-[11px] text-[#EF4444]">{errors.code}</p>
            ) : (
              <p className="text-[11px] text-[#64748B]">
                3-letter ISO 4217 code.
              </p>
            )}
          </div>

          {/* Symbol */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-[#083952]">
              <FiHash className="h-3.5 w-3.5 text-[#0E4A68]" />
              <span>Currency Symbol</span>
              <span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="text"
              maxLength={6}
              value={symbol}
              onChange={(e) => {
                setSymbol(e.target.value);
                if (errors.symbol) setErrors((prev) => ({ ...prev, symbol: "" }));
              }}
              placeholder="e.g. $, €, £, CA$"
              className={`w-full font-medium rounded-xl border bg-white px-3.5 py-2.5 text-xs text-[#083952] placeholder-[#94A3B8] shadow-2xs transition-colors focus:outline-none focus:ring-2 ${
                errors.symbol
                  ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20"
                  : "border-[#CBD5E1] focus:border-[#0E4A68] focus:ring-[#0E4A68]/20"
              }`}
            />
            {errors.symbol && (
              <p className="text-[11px] text-[#EF4444]">{errors.symbol}</p>
            )}
          </div>
        </div>

        {/* Currency Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#083952]">
            Currency Name <span className="text-[#DC2626]">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
            }}
            placeholder="e.g. US Dollar, Euro, British Pound"
            className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-[#083952] placeholder-[#94A3B8] shadow-2xs transition-colors focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20"
                : "border-[#CBD5E1] focus:border-[#0E4A68] focus:ring-[#0E4A68]/20"
            }`}
          />
          {errors.name && (
            <p className="text-[11px] text-[#EF4444]">{errors.name}</p>
          )}
        </div>

        {/* Exchange Rate */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#083952]">
            Exchange Rate Multiplier <span className="text-[#DC2626]">*</span>
          </label>
          <input
            type="number"
            step="0.0001"
            min="0.0001"
            value={exchangeRate}
            onChange={(e) => {
              setExchangeRate(e.target.value);
              if (errors.exchangeRate)
                setErrors((prev) => ({ ...prev, exchangeRate: "" }));
            }}
            placeholder="e.g. 1.0000, 1.1200, 0.7100"
            className={`w-full font-mono rounded-xl border bg-white px-3.5 py-2.5 text-xs text-[#083952] placeholder-[#94A3B8] shadow-2xs transition-colors focus:outline-none focus:ring-2 ${
              errors.exchangeRate
                ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20"
                : "border-[#CBD5E1] focus:border-[#0E4A68] focus:ring-[#0E4A68]/20"
            }`}
          />
          {errors.exchangeRate ? (
            <p className="text-[11px] text-[#EF4444]">{errors.exchangeRate}</p>
          ) : (
            <p className="text-[11px] text-[#64748B]">
              Base currency rate multiplier (e.g. 1 for USD, 1.12 for EUR).
            </p>
          )}
        </div>

        {/* Active Status Toggle */}
        <div className="pt-2">
          <label className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 cursor-pointer transition-colors hover:bg-white">
            <div>
              <p className="text-xs font-semibold text-[#083952]">
                Active Currency
              </p>
              <p className="text-[11px] text-[#64748B]">
                When active, customers can select this currency on the storefront.
              </p>
            </div>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-[#0E4A68] focus:ring-[#0E4A68]"
            />
          </label>
        </div>
      </form>
    </SlidePanel>
  );
}

export default CurrencyFormPanel;
