"use client";

import React, { useMemo, useState } from "react";
import { ConfirmDialog } from "@/components/adminComp/Shared/ConfirmDialog";
import { DataTable } from "@/components/adminComp/Shared/DataTable";
import { PageHeader } from "@/components/adminComp/Shared/PageHeader";
import {
  useDeleteExcursionReviewMutation,
  useExcursionReviewsQuery,
  usePublishExcursionReviewMutation,
  useUnpublishExcursionReviewMutation,
} from "@/features/excursionReviews/useExcursionReviewAdmin";
import { usePrivateExcursionsQuery } from "@/features/privateExcursions/usePrivateExcursionAdmin";
import type { ExcursionReviewItem, ExcursionReviewQueryParams } from "@/models/excursionReview";
import {
  buildExcursionReviewColumns,
  ExcursionReviewDetailPanel,
  ExcursionReviewFilters,
} from "./components";

export function ExcursionReviewManagerComp() {
  const [filters, setFilters] = useState<ExcursionReviewQueryParams>({ pageNumber: 1, pageSize: 10 });
  const [search, setSearch] = useState("");
  const [selectedReview, setSelectedReview] = useState<ExcursionReviewItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ExcursionReviewItem | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const { data: reviewsData, isLoading, isFetching } = useExcursionReviewsQuery(filters);
  const { data: excursionsData } = usePrivateExcursionsQuery({ pageSize: 100 });

  const publishMutation = usePublishExcursionReviewMutation();
  const unpublishMutation = useUnpublishExcursionReviewMutation();
  const deleteMutation = useDeleteExcursionReviewMutation();

  const excursions = useMemo(() => {
    return (excursionsData?.data?.items ?? []).map((ex) => ({
      id: ex.id,
      title: ex.title || "Private Excursion",
    }));
  }, [excursionsData]);

  const excursionsMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const ex of excursions) map.set(ex.id, ex.title);
    return map;
  }, [excursions]);

  const handleTogglePublish = async (review: ExcursionReviewItem) => {
    setActionLoadingId(review.id);
    try {
      if (review.isPublished) {
        await unpublishMutation.mutateAsync(review.id);
        if (selectedReview?.id === review.id) setSelectedReview({ ...review, isPublished: false });
      } else {
        await publishMutation.mutateAsync(review.id);
        if (selectedReview?.id === review.id) setSelectedReview({ ...review, isPublished: true });
      }
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      if (selectedReview?.id === deleteTarget.id) setSelectedReview(null);
      setDeleteTarget(null);
    } catch {
      // Handled in onError
    }
  };

  const paged = reviewsData?.data;
  const rawItems = paged?.items ?? [];

  const displayedItems = useMemo(() => {
    if (!search.trim()) return rawItems;
    const q = search.trim().toLowerCase();
    return rawItems.filter(
      (r) =>
        r.customerName?.toLowerCase().includes(q) ||
        r.customerEmail?.toLowerCase().includes(q) ||
        r.title?.toLowerCase().includes(q) ||
        r.comment?.toLowerCase().includes(q) ||
        r.excursionName?.toLowerCase().includes(q)
    );
  }, [rawItems, search]);

  const hasActiveFilters = Boolean(
    search || filters.excursionId || filters.minRate || filters.isPublished !== undefined
  );

  const columns = useMemo(
    () =>
      buildExcursionReviewColumns({
        excursionsMap,
        onViewDetails: (r) => setSelectedReview(r),
        onTogglePublish: handleTogglePublish,
        onDelete: (r) => setDeleteTarget(r),
        isActionLoadingId: actionLoadingId,
      }),
    [excursionsMap, actionLoadingId, selectedReview]
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Excursion Reviews"
        description="Moderate customer feedback and ratings on private excursions."
      />

      <ExcursionReviewFilters
        search={search}
        onSearchChange={setSearch}
        excursionId={filters.excursionId}
        onExcursionChange={(excursionId) =>
          setFilters((prev) => ({ ...prev, excursionId, pageNumber: 1 }))
        }
        rate={filters.minRate}
        onRateChange={(rate) =>
          setFilters((prev) => ({ ...prev, minRate: rate, maxRate: rate, pageNumber: 1 }))
        }
        isPublished={filters.isPublished}
        onPublishedChange={(isPublished) =>
          setFilters((prev) => ({ ...prev, isPublished, pageNumber: 1 }))
        }
        excursions={excursions}
        hasActiveFilters={hasActiveFilters}
        onReset={() => {
          setSearch("");
          setFilters({ pageNumber: 1, pageSize: 10 });
        }}
      />

      <DataTable<ExcursionReviewItem>
        columns={columns}
        rows={displayedItems}
        getRowKey={(r) => r.id}
        isLoading={isLoading}
        isFetching={isFetching}
        emptyTitle="No reviews found"
        emptyDescription={
          hasActiveFilters
            ? "Try adjusting your filters to find what you're looking for."
            : "Customer reviews for excursions will appear here once submitted."
        }
        pagination={
          paged
            ? {
                pageNumber: paged.pageNumber,
                pageSize: paged.pageSize,
                totalPages: paged.totalPages,
                totalCount: paged.totalCount,
                hasPreviousPage: paged.hasPreviousPage,
                hasNextPage: paged.hasNextPage,
                onPageChange: (pageNumber) => setFilters((prev) => ({ ...prev, pageNumber })),
              }
            : undefined
        }
      />

      <ExcursionReviewDetailPanel
        open={Boolean(selectedReview)}
        onClose={() => setSelectedReview(null)}
        review={selectedReview}
        excursionTitle={
          selectedReview?.excursionName ||
          (selectedReview ? excursionsMap.get(selectedReview.excursionId) : undefined)
        }
        onTogglePublish={handleTogglePublish}
        onDelete={(r) => setDeleteTarget(r)}
        isActionLoading={actionLoadingId === selectedReview?.id}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Excursion Review"
        description={`Are you sure you want to permanently delete this review by "${deleteTarget?.customerName}"? This action cannot be undone.`}
        confirmLabel="Delete Review"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}

export default ExcursionReviewManagerComp;
