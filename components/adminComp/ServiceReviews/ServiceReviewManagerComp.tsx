"use client";

import React, { useMemo, useState } from "react";
import { ConfirmDialog } from "@/components/adminComp/Shared/ConfirmDialog";
import { DataTable } from "@/components/adminComp/Shared/DataTable";
import { PageHeader } from "@/components/adminComp/Shared/PageHeader";
import {
  useDeleteServiceReviewMutation,
  usePublishServiceReviewMutation,
  useServiceReviewsQuery,
  useUnpublishServiceReviewMutation,
} from "@/features/serviceReviews/useServiceReviewAdmin";
import { useSiteServiceSubItemsQuery } from "@/features/siteServiceItems/useSiteServiceItems";
import type { ServiceReviewItem, ServiceReviewQueryParams } from "@/models/serviceReview";
import {
  buildServiceReviewColumns,
  ServiceReviewDetailPanel,
  ServiceReviewFilters,
} from "./components";

export function ServiceReviewManagerComp() {
  const [filters, setFilters] = useState<ServiceReviewQueryParams>({ pageNumber: 1, pageSize: 10 });
  const [search, setSearch] = useState("");
  const [selectedReview, setSelectedReview] = useState<ServiceReviewItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ServiceReviewItem | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const { data: reviewsData, isLoading, isFetching } = useServiceReviewsQuery(filters);
  const { data: subItemsData } = useSiteServiceSubItemsQuery({ pageSize: 100 });

  const publishMutation = usePublishServiceReviewMutation();
  const unpublishMutation = useUnpublishServiceReviewMutation();
  const deleteMutation = useDeleteServiceReviewMutation();

  const subServices = useMemo(() => {
    return (subItemsData?.items ?? []).map((s) => ({
      id: s.id,
      name: s.title || "Service Item",
    }));
  }, [subItemsData]);

  const subServicesMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const s of subServices) map.set(s.id, s.name);
    return map;
  }, [subServices]);

  const handleTogglePublish = async (review: ServiceReviewItem) => {
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
        r.fullName?.toLowerCase().includes(q) ||
        r.email?.toLowerCase().includes(q) ||
        r.comment?.toLowerCase().includes(q) ||
        r.subServiceName?.toLowerCase().includes(q)
    );
  }, [rawItems, search]);

  const hasActiveFilters = Boolean(
    search || filters.subServiceId || filters.minRate || filters.isPublished !== undefined
  );

  const columns = useMemo(
    () =>
      buildServiceReviewColumns({
        subServicesMap,
        onViewDetails: (r) => setSelectedReview(r),
        onTogglePublish: handleTogglePublish,
        onDelete: (r) => setDeleteTarget(r),
        isActionLoadingId: actionLoadingId,
      }),
    [subServicesMap, actionLoadingId, selectedReview]
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Site Service Item Reviews"
        description="Moderate customer feedback on site service items and rentals."
      />

      <ServiceReviewFilters
        search={search}
        onSearchChange={setSearch}
        subServiceId={filters.subServiceId}
        onSubServiceChange={(subServiceId) =>
          setFilters((prev) => ({ ...prev, subServiceId, pageNumber: 1 }))
        }
        rate={filters.minRate}
        onRateChange={(rate) =>
          setFilters((prev) => ({ ...prev, minRate: rate, maxRate: rate, pageNumber: 1 }))
        }
        isPublished={filters.isPublished}
        onPublishedChange={(isPublished) =>
          setFilters((prev) => ({ ...prev, isPublished, pageNumber: 1 }))
        }
        subServices={subServices}
        hasActiveFilters={hasActiveFilters}
        onReset={() => {
          setSearch("");
          setFilters({ pageNumber: 1, pageSize: 10 });
        }}
      />

      <DataTable<ServiceReviewItem>
        columns={columns}
        rows={displayedItems}
        getRowKey={(r) => r.id}
        isLoading={isLoading}
        isFetching={isFetching}
        emptyTitle="No reviews found"
        emptyDescription={
          hasActiveFilters
            ? "Try adjusting your filters to find what you're looking for."
            : "Customer reviews for services will appear here once submitted."
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

      <ServiceReviewDetailPanel
        open={Boolean(selectedReview)}
        onClose={() => setSelectedReview(null)}
        review={selectedReview}
        serviceTitle={
          selectedReview?.subServiceName ||
          (selectedReview ? subServicesMap.get(selectedReview.subServiceId) : undefined)
        }
        onTogglePublish={handleTogglePublish}
        onDelete={(r) => setDeleteTarget(r)}
        isActionLoading={actionLoadingId === selectedReview?.id}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Site Service Item Review"
        description={`Are you sure you want to permanently delete this review by "${deleteTarget?.fullName}"? This action cannot be undone.`}
        confirmLabel="Delete Review"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}

export default ServiceReviewManagerComp;
