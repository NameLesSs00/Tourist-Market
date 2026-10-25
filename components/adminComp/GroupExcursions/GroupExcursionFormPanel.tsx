"use client";

import React from "react";
import { FiLoader } from "react-icons/fi";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import { useGroupExcursionAllLanguagesQuery } from "@/features/groupExcursions/useGroupExcursionAdmin";
import type {
  GroupExcursionCreateRequest,
  GroupExcursionListItem,
  GroupExcursionUpdateRequest,
} from "@/models/groupExcursion";
import {
  GroupExcursionLocalizedFields,
  GroupExcursionPricingFields,
  GroupExcursionSpecs,
} from "./components";
import { useGroupExcursionForm } from "./useGroupExcursionForm";

interface GroupExcursionFormPanelProps {
  open: boolean;
  onClose: () => void;
  excursion?: GroupExcursionListItem | null;
  onSubmitCreate: (body: GroupExcursionCreateRequest) => void;
  onSubmitUpdate: (data: { id: string; body: GroupExcursionUpdateRequest }) => void;
  isSubmitting: boolean;
}

export function GroupExcursionFormPanel({
  open,
  onClose,
  excursion,
  onSubmitCreate,
  onSubmitUpdate,
  isSubmitting,
}: GroupExcursionFormPanelProps) {
  const isEdit = Boolean(excursion);
  const detailQuery = useGroupExcursionAllLanguagesQuery(
    isEdit && open ? excursion?.id : null
  );

  const form = useGroupExcursionForm({
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
      title={isEdit ? "Edit Group Excursion" : "New Group Excursion"}
      subtitle="Manage group tour specifications, per-person rates, and multilingual descriptions"
      widthClassName="max-w-2xl"
    >
      {detailQuery.isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <FiLoader className="h-7 w-7 animate-spin text-[#0E4A68]" />
        </div>
      ) : (
        <form onSubmit={form.handleSubmit} className="space-y-6 pb-8">
          <GroupExcursionSpecs
            categoryId={form.categoryId}
            slug={form.slug}
            stars={form.stars}
            durationHours={form.durationHours}
            videoUrl={form.videoUrl}
            isFeatured={form.isFeatured}
            isActive={form.isActive}
            errors={form.errors}
            onCategoryIdChange={form.setCategoryId}
            onSlugChange={form.setSlug}
            onStarsChange={form.setStars}
            onDurationHoursChange={form.setDurationHours}
            onVideoUrlChange={form.setVideoUrl}
            onIsFeaturedChange={form.setIsFeatured}
            onIsActiveChange={form.setIsActive}
          />

          <GroupExcursionPricingFields
            adultPriceUsd={form.adultPriceUsd}
            childPriceUsd={form.childPriceUsd}
            infantPriceUsd={form.infantPriceUsd}
            errors={form.errors}
            onAdultPriceChange={form.setAdultPriceUsd}
            onChildPriceChange={form.setChildPriceUsd}
            onInfantPriceChange={form.setInfantPriceUsd}
          />

          <GroupExcursionLocalizedFields
            title={form.title}
            subtitle={form.subtitle}
            excursionType={form.excursionType}
            shortDescription={form.shortDescription}
            fullProgram={form.fullProgram}
            errors={form.errors}
            onTitleChange={form.handleTitleChange}
            onSubtitleChange={form.setSubtitle}
            onExcursionTypeChange={form.setExcursionType}
            onShortDescriptionChange={form.setShortDescription}
            onFullProgramChange={form.setFullProgram}
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

export default GroupExcursionFormPanel;
