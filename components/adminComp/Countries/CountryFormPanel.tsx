"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiGlobe, FiHash, FiLoader, FiPhone } from "react-icons/fi";
import { toast } from "sonner";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import { useCountryAllLanguagesQuery } from "@/features/countries/useCountryAdmin";
import {
  LANG_FLAGS,
  LANG_LABELS,
  LANGS,
  type LangCode,
  type LocalizedText,
} from "@/models/localization";
import type { CountryItem, CountryUpsertRequest } from "@/models/country";

interface CountryFormPanelProps {
  open: boolean;
  onClose: () => void;
  country?: CountryItem | null;
  onSubmitCreate: (data: CountryUpsertRequest) => void;
  onSubmitUpdate: (data: { id: string; body: CountryUpsertRequest }) => void;
  isSubmitting: boolean;
}

const emptyLocalized = (): LocalizedText => ({
  en: "",
  ru: "",
  de: "",
  fr: "",
});

export function CountryFormPanel({
  open,
  onClose,
  country,
  onSubmitCreate,
  onSubmitUpdate,
  isSubmitting,
}: CountryFormPanelProps) {
  const isEdit = Boolean(country);

  // Fetch full localized names for all 4 languages in edit mode
  const detailQuery = useCountryAllLanguagesQuery(
    isEdit && open ? country?.id ?? null : null
  );

  const [code, setCode] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [name, setName] = useState<LocalizedText>(emptyLocalized());
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset or populate state
  useEffect(() => {
    if (isEdit && country) {
      if (detailQuery.data) {
        setCode(detailQuery.data.code || "");
        setPhoneCode(detailQuery.data.phoneCode || "");
        setName(detailQuery.data.name || emptyLocalized());
      } else {
        setCode(country.code || "");
        setPhoneCode(country.phoneCode || "");
        setName({
          en: country.name || "",
          ru: "",
          de: "",
          fr: "",
        });
      }
      setErrors({});
    } else if (!isEdit) {
      setCode("");
      setPhoneCode("");
      setName(emptyLocalized());
      setErrors({});
    }
  }, [country, isEdit, detailQuery.data, open]);

  const handleNameChange = (lang: LangCode, value: string) => {
    setName((prev) => ({ ...prev, [lang]: value }));
    if (errors[`name.${lang}`]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[`name.${lang}`];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!code.trim()) {
      newErrors.code = "Country code is required.";
    }
    if (!phoneCode.trim()) {
      newErrors.phoneCode = "Phone calling code is required.";
    }
    if (!name.en?.trim()) {
      newErrors["name.en"] = "English country name is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in the required fields.");
      return;
    }

    const payload: CountryUpsertRequest = {
      code: code.trim(),
      phoneCode: phoneCode.trim(),
      name,
    };

    if (isEdit && country) {
      onSubmitUpdate({ id: country.id, body: payload });
    } else {
      onSubmitCreate(payload);
    }
  };

  const isLoadingDetail = isEdit && detailQuery.isLoading;

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Country" : "Add New Country"}
      subtitle={
        isEdit
          ? `Update details and translations for “${country?.name}”.`
          : "Add a country with its dialing code and localized names."
      }
      icon={<FiGlobe className="h-5 w-5" />}
      widthClassName="max-w-xl"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#E2E8F0] bg-white px-5 py-2.5 text-sm font-semibold text-[#475569] hover:bg-[#F1F5F9] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="country-form"
            disabled={isSubmitting || isLoadingDetail}
            className="flex items-center gap-2 rounded-xl bg-[#0E4A68] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#093247] disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting && <FiLoader className="h-4 w-4 animate-spin" />}
            {isSubmitting
              ? "Saving..."
              : isEdit
              ? "Save Changes"
              : "Create Country"}
          </button>
        </>
      }
    >
      {isLoadingDetail ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FiLoader className="h-6 w-6 animate-spin text-[#0E4A68]" />
          <p className="mt-3 text-xs text-[#64748B]">
            Loading country translations...
          </p>
        </div>
      ) : (
        <form
          id="country-form"
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5"
        >
          {/* Identifiers: Code & Phone Code */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Country Code */}
            <div className="space-y-1.5">
              <label
                htmlFor="country-code"
                className="flex items-center gap-1.5 text-xs font-semibold text-[#083952]"
              >
                <FiHash className="h-3.5 w-3.5 text-[#64748B]" />
                <span>Country Code</span>
                <span className="text-[#DC2626]">*</span>
              </label>
              <input
                id="country-code"
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  if (errors.code) setErrors((prev) => ({ ...prev, code: "" }));
                }}
                placeholder="e.g. EG, US, 123"
                className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A6826] ${
                  errors.code ? "border-[#FCA5A5]" : "border-[#E2E8F0]"
                }`}
              />
              {errors.code && (
                <p className="text-[11px] font-medium text-[#DC2626]">
                  {errors.code}
                </p>
              )}
            </div>

            {/* Phone Code */}
            <div className="space-y-1.5">
              <label
                htmlFor="country-phonecode"
                className="flex items-center gap-1.5 text-xs font-semibold text-[#083952]"
              >
                <FiPhone className="h-3.5 w-3.5 text-[#64748B]" />
                <span>Phone Calling Code</span>
                <span className="text-[#DC2626]">*</span>
              </label>
              <input
                id="country-phonecode"
                type="text"
                value={phoneCode}
                onChange={(e) => {
                  setPhoneCode(e.target.value);
                  if (errors.phoneCode)
                    setErrors((prev) => ({ ...prev, phoneCode: "" }));
                }}
                placeholder="e.g. +20, +1"
                className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A6826] ${
                  errors.phoneCode ? "border-[#FCA5A5]" : "border-[#E2E8F0]"
                }`}
              />
              {errors.phoneCode && (
                <p className="text-[11px] font-medium text-[#DC2626]">
                  {errors.phoneCode}
                </p>
              )}
            </div>
          </div>

          {/* Localized Country Names */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#083952]">
                Country Name (Multi-Language)
              </label>
              <p className="mt-0.5 text-[11px] text-[#64748B]">
                English is required. Other languages are optional and will automatically inherit the English name if left empty.
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
              {LANGS.map((lang) => {
                const isEn = lang === "en";
                const err = errors[`name.${lang}`];
                const inputId = `country-name-${lang}`;

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
                        <span className="text-[11px] font-normal text-[#94A3B8]">
                          (optional)
                        </span>
                      )}
                    </label>

                    <input
                      id={inputId}
                      type="text"
                      value={name[lang] ?? ""}
                      onChange={(e) => handleNameChange(lang, e.target.value)}
                      placeholder={`e.g. Country name in ${LANG_LABELS[lang]}`}
                      className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A6826] ${
                        err ? "border-[#FCA5A5]" : "border-[#E2E8F0]"
                      }`}
                    />
                    {err && (
                      <p className="text-[11px] font-medium text-[#DC2626]">
                        {err}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </form>
      )}
    </SlidePanel>
  );
}

export default CountryFormPanel;
