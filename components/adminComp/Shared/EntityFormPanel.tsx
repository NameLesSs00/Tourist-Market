"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiAlertCircle, FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import { SlidePanel } from "./SlidePanel";
import { LANGS, LANG_LABELS, LANG_FLAGS, type LangCode, type LocalizedText } from "@/models/faq";

export type FieldValue = string | number | LocalizedText;
export type FormValues = Record<string, FieldValue>;

export type FieldDef =
  | {
      name: string;
      label: string;
      type: "text" | "textarea";
      required?: boolean;
      placeholder?: string;
    }
  | {
      name: string;
      label: string;
      type: "number";
      required?: boolean;
      min?: number;
      placeholder?: string;
    }
  | {
      name: string;
      label: string;
      type: "localized";
      /** Render a textarea per language instead of a single-line input. */
      multiline?: boolean;
      required?: boolean;
      placeholder?: string;
    };

/** Which languages must be filled for a required localized field. */
export type LocalizedRequirement = "english" | "all";

interface EntityFormPanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  fields: FieldDef[];
  /** Values to seed the form with. Change `formKey` to reset the form. */
  initialValues: FormValues;
  formKey: string;
  localizedRequirement?: LocalizedRequirement;
  /** Shown under optional language inputs, e.g. "Leave blank to reuse English". */
  optionalLanguageHint?: string;
  isLoading?: boolean;
  isSubmitting?: boolean;
  submitLabel?: string;
  onSubmit: (values: FormValues) => void;
}

/**
 * Generic create / edit form rendered inside a SlidePanel.
 * Driven entirely by a `fields` schema so every admin resource can reuse it.
 */
export function EntityFormPanel({
  open,
  onClose,
  title,
  subtitle,
  icon,
  fields,
  initialValues,
  formKey,
  localizedRequirement = "english",
  optionalLanguageHint,
  isLoading = false,
  isSubmitting = false,
  submitLabel = "Save",
  onSubmit,
}: EntityFormPanelProps) {
  const formId = `entity-form-${formKey}`;

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      icon={icon}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-5 py-2.5 text-sm font-semibold text-[#475569] transition-colors hover:bg-[#F1F5F9] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form={formId}
            disabled={isLoading || isSubmitting}
            className="flex items-center gap-2 rounded-xl bg-[#0E4A68] px-5 py-2.5 text-sm font-semibold text-[#FFFFFF] shadow-sm transition-colors hover:bg-[#093247] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting && <FiLoader className="h-4 w-4 animate-spin" />}
            {isSubmitting ? "Saving..." : submitLabel}
          </button>
        </>
      }
    >
      {isLoading ? (
        <FormSkeleton fields={fields} />
      ) : (
        <FormBody
          key={formKey}
          formId={formId}
          fields={fields}
          initialValues={initialValues}
          localizedRequirement={localizedRequirement}
          optionalLanguageHint={optionalLanguageHint}
          onSubmit={onSubmit}
        />
      )}
    </SlidePanel>
  );
}

// ---------------------------------------------------------------------------

interface FormBodyProps {
  formId: string;
  fields: FieldDef[];
  initialValues: FormValues;
  localizedRequirement: LocalizedRequirement;
  optionalLanguageHint?: string;
  onSubmit: (values: FormValues) => void;
}

const inputClass =
  "w-full rounded-xl border bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0E4A6833] focus:border-[#0E4A68]";

function FormBody({
  formId,
  fields,
  initialValues,
  localizedRequirement,
  optionalLanguageHint,
  onSubmit,
}: FormBodyProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isLangRequired = (field: FieldDef, lang: LangCode) =>
    Boolean(field.required) && (localizedRequirement === "all" || lang === "en");

  const setValue = (name: string, value: FieldValue) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const setLocalized = (name: string, lang: LangCode, text: string) => {
    const current = (values[name] as LocalizedText) ?? emptyLocalized();
    setValue(name, { ...current, [lang]: text });
    setErrors((prev) => {
      const key = `${name}.${lang}`;
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validate = (): Record<string, string> => {
    const next: Record<string, string> = {};
    for (const field of fields) {
      const value = values[field.name];
      if (field.type === "localized") {
        const text = (value as LocalizedText) ?? emptyLocalized();
        for (const lang of LANGS) {
          if (isLangRequired(field, lang) && !text[lang]?.trim()) {
            next[`${field.name}.${lang}`] = `${LANG_LABELS[lang]} is required.`;
          }
        }
      } else if (field.type === "number") {
        const num = Number(value);
        if (field.required && (value === "" || Number.isNaN(num))) {
          next[field.name] = `${field.label} is required.`;
        } else if (field.min !== undefined && num < field.min) {
          next[field.name] = `${field.label} must be at least ${field.min}.`;
        }
      } else if (field.required && !String(value ?? "").trim()) {
        next[field.name] = `${field.label} is required.`;
      }
    }
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast.error("Please fill in the required fields.");
      return;
    }
    onSubmit(values);
  };

  return (
    <form id={formId} onSubmit={handleSubmit} noValidate className="space-y-7">
      {fields.map((field) => {
        if (field.type === "localized") {
          const text = (values[field.name] as LocalizedText) ?? emptyLocalized();
          return (
            <fieldset key={field.name} className="space-y-3">
              <legend className="mb-3 text-sm font-semibold text-[#083952]">{field.label}</legend>
              <div className="space-y-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                {LANGS.map((lang) => {
                  const required = isLangRequired(field, lang);
                  const err = errors[`${field.name}.${lang}`];
                  const id = `${field.name}-${lang}`;
                  return (
                    <div key={lang} className="space-y-1.5">
                      <label htmlFor={id} className="flex items-center gap-2 text-xs font-semibold text-[#334155]">
                        <span className="relative flex h-3.5 w-5 shrink-0 overflow-hidden rounded-xs border border-[#CBD5E1] shadow-2xs">
                          <Image
                            src={LANG_FLAGS[lang]}
                            alt={LANG_LABELS[lang]}
                            fill
                            className="object-cover"
                            sizes="20px"
                          />
                        </span>
                        <span className="rounded-md bg-[#0E4A68] px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-[#FFFFFF]">
                          {lang}
                        </span>
                        <span>{LANG_LABELS[lang]}</span>
                        {required ? (
                          <span className="text-[#DC2626]">*</span>
                        ) : (
                          <span className="font-normal text-[#94A3B8]">(optional)</span>
                        )}
                      </label>
                      {field.multiline ? (
                        <textarea
                          id={id}
                          rows={4}
                          value={text[lang] ?? ""}
                          placeholder={field.placeholder}
                          onChange={(e) => setLocalized(field.name, lang, e.target.value)}
                          className={`${inputClass} resize-y ${err ? "border-[#FCA5A5]" : "border-[#E2E8F0]"}`}
                        />
                      ) : (
                        <input
                          id={id}
                          type="text"
                          value={text[lang] ?? ""}
                          placeholder={field.placeholder}
                          onChange={(e) => setLocalized(field.name, lang, e.target.value)}
                          className={`${inputClass} ${err ? "border-[#FCA5A5]" : "border-[#E2E8F0]"}`}
                        />
                      )}
                      {err ? (
                        <FieldError message={err} />
                      ) : (
                        !required &&
                        optionalLanguageHint && (
                          <p className="text-[11px] text-[#94A3B8]">{optionalLanguageHint}</p>
                        )
                      )}
                    </div>
                  );
                })}
              </div>
            </fieldset>
          );
        }

        const err = errors[field.name];
        const id = `field-${field.name}`;
        return (
          <div key={field.name} className="space-y-1.5">
            <label htmlFor={id} className="block text-sm font-semibold text-[#083952]">
              {field.label}
              {field.required && <span className="ml-1 text-[#DC2626]">*</span>}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={id}
                rows={4}
                value={String(values[field.name] ?? "")}
                placeholder={field.placeholder}
                onChange={(e) => setValue(field.name, e.target.value)}
                className={`${inputClass} resize-y ${err ? "border-[#FCA5A5]" : "border-[#E2E8F0]"}`}
              />
            ) : (
              <input
                id={id}
                type={field.type === "number" ? "number" : "text"}
                min={field.type === "number" ? field.min : undefined}
                value={String(values[field.name] ?? "")}
                placeholder={field.placeholder}
                onChange={(e) =>
                  setValue(
                    field.name,
                    field.type === "number" && e.target.value !== ""
                      ? Number(e.target.value)
                      : e.target.value
                  )
                }
                className={`${inputClass} ${field.type === "number" ? "max-w-[180px]" : ""} ${
                  err ? "border-[#FCA5A5]" : "border-[#E2E8F0]"
                }`}
              />
            )}
            {err && <FieldError message={err} />}
          </div>
        );
      })}
    </form>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <p className="flex items-center gap-1 text-[11px] font-medium text-[#DC2626]">
      <FiAlertCircle className="h-3 w-3" />
      {message}
    </p>
  );
}

function FormSkeleton({ fields }: { fields: FieldDef[] }) {
  return (
    <div className="space-y-7 animate-pulse" aria-busy="true" aria-label="Loading">
      {fields.map((field) => (
        <div key={field.name} className="space-y-3">
          <div className="h-4 w-32 rounded bg-[#E2E8F0]" />
          {field.type === "localized" ? (
            <div className="space-y-4 rounded-2xl border border-[#E2E8F0] p-4">
              {LANGS.map((lang) => (
                <div key={lang} className="space-y-2">
                  <div className="h-3 w-20 rounded bg-[#E2E8F0]" />
                  <div className={`${field.multiline ? "h-20" : "h-10"} rounded-xl bg-[#F1F5F9]`} />
                </div>
              ))}
            </div>
          ) : (
            <div className="h-10 w-44 rounded-xl bg-[#F1F5F9]" />
          )}
        </div>
      ))}
    </div>
  );
}

export function emptyLocalized(): LocalizedText {
  return { en: "", ru: "", de: "", fr: "" };
}

export default EntityFormPanel;
