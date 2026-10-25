"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiLoader, FiTrash2 } from "react-icons/fi";
import { ConfirmDialog } from "@/components/adminComp/Shared";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import {
  useCreateExcursionDetailsMutation,
  useDeleteExcursionDetailsMutation,
  useExcursionDetailsAllLanguagesQuery,
  useUpdateExcursionDetailsMutation,
} from "@/features/excursionDetails/useExcursionDetailsAdmin";
import { LANG_FLAGS, LANG_LABELS, LANGS, type LangCode } from "@/models/localization";
import { ExcursionDetailsListSection } from "./ExcursionDetailsListSection";
import { ExcursionDetailsLiterallySection } from "./ExcursionDetailsLiterallySection";
import { useExcursionDetailsForm } from "./useExcursionDetailsForm";

interface ExcursionDetailsPanelProps {
  open: boolean;
  excursion?: { id: string; title: string } | null;
  onClose: () => void;
}

export function ExcursionDetailsPanel({ open, excursion, onClose }: ExcursionDetailsPanelProps) {
  const excursionId = excursion?.id ?? "";
  const query = useExcursionDetailsAllLanguagesQuery(open ? excursionId : null);
  const createMutation = useCreateExcursionDetailsMutation();
  const updateMutation = useUpdateExcursionDetailsMutation();
  const deleteMutation = useDeleteExcursionDetailsMutation();

  const [confirmDelete, setConfirmDelete] = useState(false);
  const exists = Boolean(query.data?.exists);

  const form = useExcursionDetailsForm({
    excursionId,
    detailData: query.data,
    onSubmit: (payload) => {
      const mut = exists ? updateMutation : createMutation;
      mut.mutate({ excursionId, body: payload }, { onSuccess: onClose });
    },
  });

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <>
      <SlidePanel
        open={open}
        onClose={onClose}
        title={exists ? "Edit Excursion Details" : "Configure Excursion Details"}
        subtitle={excursion?.title || "Manage highlights, includes, policies, and itinerary"}
        widthClassName="max-w-3xl"
      >
        {query.isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <FiLoader className="h-7 w-7 animate-spin text-[#0E4A68]" />
          </div>
        ) : (
          <form onSubmit={form.handleSubmit} className="space-y-5 pb-12">
            {/* Language Content Tabs with Flags */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {LANGS.map((lang: LangCode) => {
                  const active = form.activeLang === lang;
                  return (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => form.setActiveLang(lang)}
                      className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition cursor-pointer ${
                        active
                          ? "bg-[#FFFFFF] text-[#0E4A68] shadow-xs ring-1 ring-[#0E4A6820]"
                          : "text-[#64748B] hover:bg-[#FFFFFF]/70 hover:text-[#0E4A68]"
                      }`}
                    >
                      <span className="relative flex h-3.5 w-5 shrink-0 overflow-hidden rounded-xs border border-[#CBD5E1]">
                        <Image src={LANG_FLAGS[lang]} alt={LANG_LABELS[lang]} fill className="object-cover" sizes="20px" />
                      </span>
                      <span>{LANG_LABELS[lang]}</span>
                      {lang === "en" && <span className="text-[#DC2626] font-bold">*</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <ExcursionDetailsListSection
              title="Highlights"
              description="Key reasons and standout experiences of this excursion."
              items={form.highlights}
              activeLang={form.activeLang}
              placeholder="e.g. Distance from Hurghada to Cairo is 465 km..."
              onAddItem={(text) => form.addListItem("highlights", text)}
              onRemoveItem={(idx) => form.removeListItem("highlights", idx)}
            />

            <ExcursionDetailsListSection
              title="What is Included"
              description="Services, transfers, entry tickets and meals included in the base rate."
              items={form.includes}
              activeLang={form.activeLang}
              placeholder="e.g. Hotel pickup and drop-off..."
              onAddItem={(text) => form.addListItem("includes", text)}
              onRemoveItem={(idx) => form.removeListItem("includes", idx)}
            />

            <ExcursionDetailsListSection
              title="What is Excluded"
              description="Optional activities, personal expenses, or extra zone transfers."
              items={form.excludes}
              activeLang={form.activeLang}
              placeholder="e.g. Round trip transfer from Safaga ($10/person)..."
              onAddItem={(text) => form.addListItem("excludes", text)}
              onRemoveItem={(idx) => form.removeListItem("excludes", idx)}
            />

            <ExcursionDetailsListSection
              title="What to Bring"
              description="Essential gear, clothing, documentation and recommendations for guests."
              items={form.whatToBring}
              activeLang={form.activeLang}
              placeholder="e.g. Passport copy, comfortable walking shoes..."
              onAddItem={(text) => form.addListItem("whatToBring", text)}
              onRemoveItem={(idx) => form.removeListItem("whatToBring", idx)}
            />

            <ExcursionDetailsListSection
              title="Cancellation Policy"
              description="Cancellation cutoff timelines, deposit requirements, and weather contingencies."
              items={form.cancellationPolicy}
              activeLang={form.activeLang}
              placeholder="e.g. Full refund for cancellations at least 24 hours prior..."
              onAddItem={(text) => form.addListItem("cancellationPolicy", text)}
              onRemoveItem={(idx) => form.removeListItem("cancellationPolicy", idx)}
            />

            <ExcursionDetailsLiterallySection
              items={form.literally}
              activeLang={form.activeLang}
              onAddItem={form.addLiterallyItem}
              onUpdateItem={form.updateLiterallyItem}
              onRemoveItem={form.removeLiterallyItem}
            />

            <div className="flex items-center justify-between pt-5 border-t border-[#E2E8F0]">
              {exists ? (
                <button
                  type="button"
                  onClick={() => setConfirmDelete(true)}
                  disabled={isSubmitting || deleteMutation.isPending}
                  className="flex items-center gap-1.5 rounded-xl border border-[#EF444433] bg-[#EF444410] px-4 py-2.5 text-xs font-semibold text-[#DC2626] hover:bg-[#EF444420] transition cursor-pointer"
                >
                  <FiTrash2 className="h-4 w-4" />
                  <span>Delete Details</span>
                </button>
              ) : (
                <span className="text-xs font-medium text-[#94A3B8]">Details not configured yet</span>
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-xs font-semibold text-[#64748B] hover:bg-[#F8FAFC] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 rounded-xl bg-[#0E4A68] px-5 py-2.5 text-xs font-semibold text-[#FFFFFF] shadow-sm hover:bg-[#0A374E] transition cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting && <FiLoader className="h-4 w-4 animate-spin" />}
                  <span>{exists ? "Save Details" : "Create Details"}</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </SlidePanel>

      <ConfirmDialog
        open={confirmDelete}
        title="Delete Excursion Details"
        description={`Are you sure you want to remove the details and itinerary for "${excursion?.title}"?`}
        confirmLabel="Delete Details"
        isLoading={deleteMutation.isPending}
        onConfirm={() => {
          deleteMutation.mutate(excursionId, {
            onSuccess: () => { setConfirmDelete(false); onClose(); },
          });
        }}
        onCancel={() => setConfirmDelete(false)}
      />
    </>
  );
}
