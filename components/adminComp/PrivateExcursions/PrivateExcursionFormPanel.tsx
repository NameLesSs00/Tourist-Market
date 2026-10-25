"use client";

import React from "react";
import { FiLoader } from "react-icons/fi";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import { usePrivateExcursionAllLanguagesQuery } from "@/features/privateExcursions/usePrivateExcursionAdmin";
import type {
  PrivateExcursionListItem,
  PrivateExcursionUpsertRequest,
} from "@/models/privateExcursion";
import {
  PrivateExcursionAttractionPicker,
  PrivateExcursionLocalizedFields,
  PrivateExcursionServicePicker,
  PrivateExcursionSpecs,
} from "./components";
import { usePrivateExcursionForm } from "./usePrivateExcursionForm";

interface PrivateExcursionFormPanelProps {
  open: boolean;
  onClose: () => void;
  excursion?: PrivateExcursionListItem | null;
  onSubmitCreate: (data: {
    body: PrivateExcursionUpsertRequest;
    attractionIds?: string[];
    serviceIds?: string[];
  }) => void;
  onSubmitUpdate: (data: {
    id: string;
    body: PrivateExcursionUpsertRequest;
    attractionIds?: string[];
    serviceIds?: string[];
    previousAttractionIds?: string[];
    previousServiceIds?: string[];
  }) => void;
  isSubmitting: boolean;
}

export function PrivateExcursionFormPanel({
  open,
  onClose,
  excursion,
  onSubmitCreate,
  onSubmitUpdate,
  isSubmitting,
}: PrivateExcursionFormPanelProps) {
  const isEdit = Boolean(excursion);
  const detailQuery = usePrivateExcursionAllLanguagesQuery(
    isEdit && open ? excursion?.id : null
  );

  const form = usePrivateExcursionForm({
    isEdit,
    excursion,
    detailData: detailQuery.data,
    onSubmitCreate,
    onSubmitUpdate,
  });

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Private Excursion" : "New Private Excursion"}
      subtitle="Manage private excursion details, vehicle pricing, assigned attractions and extra services"
      widthClassName="max-w-2xl"
    >
      {detailQuery.isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <FiLoader className="h-7 w-7 animate-spin text-[#0E4A68]" />
        </div>
      ) : (
        <form onSubmit={form.handleSubmit} className="space-y-6 pb-8">
          <PrivateExcursionSpecs
            categoryId={form.categoryId}
            slug={form.slug}
            stars={form.stars}
            maxAttractions={form.maxAttractions}
            durationHours={form.durationHours}
            videoUrl={form.videoUrl}
            isFeatured={form.isFeatured}
            isActive={form.isActive}
            errors={form.errors}
            onCategoryIdChange={form.setCategoryId}
            onSlugChange={form.setSlug}
            onStarsChange={form.setStars}
            onMaxAttractionsChange={form.setMaxAttractions}
            onDurationHoursChange={form.setDurationHours}
            onVideoUrlChange={form.setVideoUrl}
            onIsFeaturedChange={form.setIsFeatured}
            onIsActiveChange={form.setIsActive}
          />

          <PrivateExcursionAttractionPicker
            selectedAttractions={form.selectedAttractions}
            maxAttractions={form.maxAttractions}
            onAddAttraction={(attr) => form.setSelectedAttractions((prev) => [...prev, attr])}
            onRemoveAttraction={(id) => form.setSelectedAttractions((prev) => prev.filter((a) => a.id !== id))}
          />

          <PrivateExcursionServicePicker
            selectedServices={form.selectedServices}
            onAddService={(serv) => form.setSelectedServices((prev) => [...prev, serv])}
            onRemoveService={(id) => form.setSelectedServices((prev) => prev.filter((s) => s.id !== id))}
          />

          <PrivateExcursionLocalizedFields
            title={form.title}
            subtitle={form.subtitle}
            excursionType={form.excursionType}
            shortDescription={form.shortDescription}
            fullProgram={form.fullProgram}
            errors={form.errors}
            onTitleChange={form.handleTitleChange}
            onSubtitleChange={(lang, val) => form.setSubtitle((prev) => ({ ...prev, [lang]: val }))}
            onExcursionTypeChange={(lang, val) => form.setExcursionType((prev) => ({ ...prev, [lang]: val }))}
            onShortDescriptionChange={(lang, val) => form.setShortDescription((prev) => ({ ...prev, [lang]: val }))}
            onFullProgramChange={(lang, val) => form.setFullProgram((prev) => ({ ...prev, [lang]: val }))}
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm font-medium text-[#64748B] hover:bg-[#F8FAFC] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-xl bg-[#0E4A68] px-5 py-2.5 text-sm font-semibold text-[#FFFFFF] shadow-sm hover:bg-[#0A374E] cursor-pointer disabled:opacity-50"
            >
              {isSubmitting && <FiLoader className="h-4 w-4 animate-spin" />}
              {isEdit ? "Save Changes" : "Create Excursion"}
            </button>
          </div>
        </form>
      )}
    </SlidePanel>
  );
}

export default PrivateExcursionFormPanel;
