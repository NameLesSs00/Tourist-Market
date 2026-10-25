"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiEdit2, FiHelpCircle, FiLoader, FiPlus, FiTrash2 } from "react-icons/fi";
import { ConfirmDialog } from "@/components/adminComp/Shared";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import {
  useCreateExcursionFaqMutation,
  useDeleteExcursionFaqMutation,
  useExcursionFaqAllLanguagesQuery,
  useExcursionFaqsQuery,
  useUpdateExcursionFaqMutation,
} from "@/features/privateExcursions/useExcursionFaqsAdmin";
import { LANG_FLAGS } from "@/models/localization";
import type { ExcursionFaqItem, ExcursionFaqUpsertRequest } from "@/models/excursionDetails";
import type { PrivateExcursionListItem } from "@/models/privateExcursion";
import { ExcursionFaqForm } from "./ExcursionFaqForm";

interface ExcursionFaqsPanelProps {
  open: boolean;
  onClose: () => void;
  excursion: PrivateExcursionListItem | null;
}

export function ExcursionFaqsPanel({ open, onClose, excursion }: ExcursionFaqsPanelProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ExcursionFaqItem | null>(null);

  const faqsQuery = useExcursionFaqsQuery(open ? excursion?.id : null, "en");
  const detailQuery = useExcursionFaqAllLanguagesQuery(excursion?.id, editingFaqId);
  const createMutation = useCreateExcursionFaqMutation();
  const updateMutation = useUpdateExcursionFaqMutation();
  const deleteMutation = useDeleteExcursionFaqMutation();

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingFaqId(null);
  };

  const handleSubmit = async (payload: ExcursionFaqUpsertRequest) => {
    if (!excursion) return;
    if (editingFaqId) {
      await updateMutation.mutateAsync({ excursionId: excursion.id, faqId: editingFaqId, payload });
    } else {
      await createMutation.mutateAsync({ excursionId: excursion.id, payload });
    }
    handleCloseForm();
  };

  const faqs = faqsQuery.data ?? [];

  return (
    <SlidePanel
      open={open}
      onClose={() => { handleCloseForm(); onClose(); }}
      title="Excursion FAQs"
      subtitle={excursion ? `Manage FAQs for "${excursion.title}"` : undefined}
      widthClassName="max-w-2xl"
    >
      <div className="space-y-4">
        {/* Header action bar without tabs */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold text-[#083952]">
              {faqs.length} {faqs.length === 1 ? "FAQ" : "FAQs"}
            </p>
            <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[11px] font-medium text-gray-600">
              <span className="relative flex h-2.5 w-3.5 shrink-0 overflow-hidden rounded-xs border border-gray-300">
                <Image src={LANG_FLAGS.en} alt="English" fill className="object-cover" sizes="14px" />
              </span>
              English
            </span>
          </div>

          {!showForm && (
            <button
              type="button"
              onClick={() => { setEditingFaqId(null); setShowForm(true); }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#0E4A68] px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#083952] cursor-pointer"
            >
              <FiPlus className="h-3.5 w-3.5" /> Add FAQ
            </button>
          )}
        </div>

        {/* All-languages unified FAQ Form */}
        {showForm && (
          <ExcursionFaqForm
            isEdit={Boolean(editingFaqId)}
            initialValues={editingFaqId ? detailQuery.data : null}
            isLoadingInitial={Boolean(editingFaqId && detailQuery.isLoading)}
            isSaving={createMutation.isPending || updateMutation.isPending}
            onSubmit={handleSubmit}
            onCancel={handleCloseForm}
          />
        )}

        {/* List of FAQs */}
        {!showForm && (
          <div className="space-y-2">
            {faqsQuery.isLoading ? (
              <div className="flex h-32 items-center justify-center">
                <FiLoader className="h-6 w-6 animate-spin text-[#0E4A68]" />
              </div>
            ) : faqs.length === 0 ? (
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 text-center text-xs text-gray-500">
                <FiHelpCircle className="mx-auto mb-2 h-7 w-7 text-gray-400" />
                No FAQs added for this excursion yet.
              </div>
            ) : (
              faqs.map((faq) => (
                <div key={faq.id} className="rounded-xl border border-gray-200 bg-white p-3.5 shadow-2xs hover:border-gray-300 transition">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex min-w-6 items-center justify-center rounded-md bg-[#D48C281A] px-1.5 py-0.5 text-[10px] font-bold text-[#B9741A]">
                          #{faq.displayOrder}
                        </span>
                        <p className="font-semibold text-gray-900 text-xs">{faq.question}</p>
                      </div>
                      <p className="text-gray-500 text-xs line-clamp-2 pl-8">{faq.answer || "—"}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => { setEditingFaqId(faq.id); setShowForm(true); }}
                        className="p-1.5 text-gray-400 hover:text-[#0E4A68] hover:bg-gray-100 rounded-lg cursor-pointer"
                        title="Edit FAQ"
                      >
                        <FiEdit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(faq)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                        title="Delete FAQ"
                      >
                        <FiTrash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Excursion FAQ"
        description={`Are you sure you want to delete "${deleteTarget?.question}"? This will remove the FAQ in all languages.`}
        confirmLabel="Delete FAQ"
        isLoading={deleteMutation.isPending}
        onConfirm={async () => {
          if (excursion && deleteTarget) {
            await deleteMutation.mutateAsync({ excursionId: excursion.id, faqId: deleteTarget.id });
            setDeleteTarget(null);
          }
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </SlidePanel>
  );
}

export default ExcursionFaqsPanel;
