"use client";

import React, { useMemo, useState } from "react";
import { ConfirmDialog } from "@/components/adminComp/Shared/ConfirmDialog";
import { DataTable } from "@/components/adminComp/Shared/DataTable";
import { PageHeader } from "@/components/adminComp/Shared/PageHeader";
import {
  useAdminTransferReviewsQuery,
  useApproveTransferReviewMutation,
  useDeleteTransferReviewMutation,
} from "@/features/transferReviews/useAdminTransferReviews";
import type {
  TransferReviewItem,
  TransferReviewQueryParams,
} from "@/models/transferReview";
import {
  buildTransferReviewColumns,
  TransferReviewDetailPanel,
  TransferReviewFilters,
} from "./components";

export function TransferReviewManagerComp() {
  const [filters, setFilters] = useState<TransferReviewQueryParams>({
    pageNumber: 1,
    pageSize: 10,
  });
  const [search, setSearch] = useState("");
  const [rateFilter, setRateFilter] = useState<number | undefined>(undefined);
  const [selectedReview, setSelectedReview] =
    useState<TransferReviewItem | null>(null);
  const [deleteTarget, setDeleteTarget] =
    useState<TransferReviewItem | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const {
    data: reviewsData,
    isLoading,
    isFetching,
  } = useAdminTransferReviewsQuery(filters);

  const approveMutation = useApproveTransferReviewMutation();
  const deleteMutation = useDeleteTransferReviewMutation();

  const handleToggleApprove = async (review: TransferReviewItem) => {
    setActionLoadingId(review.id);
    const nextApproved = !review.isApproved;
    try {
      await approveMutation.mutateAsync({
        id: review.id,
        payload: { isApproved: nextApproved },
      });
      if (selectedReview?.id === review.id) {
        setSelectedReview({
          ...review,
          isApproved: nextApproved,
          approvedAt: nextApproved ? new Date().toISOString() : null,
        });
      }
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      if (selectedReview?.id === deleteTarget.id) {
        setSelectedReview(null);
      }
      setDeleteTarget(null);
    } catch {
      // Handled in mutation onError
    }
  };

  const paged = reviewsData;
  const rawItems = paged?.items ?? [];

  const displayedItems = useMemo(() => {
    let result = rawItems;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (r) =>
          r.fullName?.toLowerCase().includes(q) ||
          r.email?.toLowerCase().includes(q) ||
          r.phone?.toLowerCase().includes(q) ||
          r.comment?.toLowerCase().includes(q)
      );
    }
    if (rateFilter !== undefined) {
      result = result.filter((r) => r.rate === rateFilter);
    }
    return result;
  }, [rawItems, search, rateFilter]);

  const hasActiveFilters = Boolean(
    search || rateFilter !== undefined || filters.isApproved !== undefined
  );

  const columns = useMemo(
    () =>
      buildTransferReviewColumns({
        onViewDetails: (r) => setSelectedReview(r),
        onToggleApprove: handleToggleApprove,
        onDelete: (r) => setDeleteTarget(r),
        isActionLoadingId: actionLoadingId,
      }),
    [actionLoadingId, selectedReview]
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transfer Reviews"
        description="Moderate customer reviews and feedback for airport and city transfers."
      />

      <TransferReviewFilters
        search={search}
        onSearchChange={setSearch}
        rate={rateFilter}
        onRateChange={setRateFilter}
        isApproved={filters.isApproved}
        onApprovedChange={(isApproved) =>
          setFilters((prev) => ({ ...prev, isApproved, pageNumber: 1 }))
        }
        hasActiveFilters={hasActiveFilters}
        onReset={() => {
          setSearch("");
          setRateFilter(undefined);
          setFilters({ pageNumber: 1, pageSize: 10 });
        }}
      />

      <DataTable<TransferReviewItem>
        columns={columns}
        rows={displayedItems}
        getRowKey={(r) => r.id}
        isLoading={isLoading}
        isFetching={isFetching}
        emptyTitle="No transfer reviews found"
        emptyDescription={
          hasActiveFilters
            ? "Try adjusting your filters or search query to find reviews."
            : "Customer transfer reviews will appear here once submitted."
        }
        pagination={
          paged
            ? {
                pageNumber: paged.pageNumber,
                pageSize: paged.pageSize,
                totalCount: paged.totalCount,
                totalPages: paged.totalPages,
                hasPreviousPage: paged.hasPreviousPage,
                hasNextPage: paged.hasNextPage,
                onPageChange: (pageNumber) =>
                  setFilters((prev) => ({ ...prev, pageNumber })),
              }
            : undefined
        }
      />

      <TransferReviewDetailPanel
        review={selectedReview}
        open={Boolean(selectedReview)}
        onClose={() => setSelectedReview(null)}
        onToggleApprove={handleToggleApprove}
        onDelete={(r) => {
          setDeleteTarget(r);
        }}
        isActionLoading={
          Boolean(actionLoadingId) && actionLoadingId === selectedReview?.id
        }
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Transfer Review"
        description={`Are you sure you want to permanently delete the review from ${
          deleteTarget?.fullName || "this customer"
        }? This action cannot be undone.`}
        confirmLabel="Delete Review"
        isLoading={deleteMutation.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
