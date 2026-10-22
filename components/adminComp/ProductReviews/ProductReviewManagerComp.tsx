"use client";

import React, { useMemo, useState } from "react";
import { ConfirmDialog } from "@/components/adminComp/Shared/ConfirmDialog";
import { DataTable } from "@/components/adminComp/Shared/DataTable";
import { PageHeader } from "@/components/adminComp/Shared/PageHeader";
import { useProductsQuery } from "@/features/products/useProductAdmin";
import {
  useDeleteProductReviewMutation,
  useProductReviewsQuery,
  usePublishProductReviewMutation,
  useUnpublishProductReviewMutation,
} from "@/features/productReviews/useProductReviewAdmin";
import type { ProductReviewItem, ProductReviewQueryParams } from "@/models/productReview";
import {
  buildProductReviewColumns,
  ProductReviewDetailPanel,
  ProductReviewFilters,
} from "./components";

export function ProductReviewManagerComp() {
  const [filters, setFilters] = useState<ProductReviewQueryParams>({
    pageNumber: 1,
    pageSize: 10,
  });

  const [selectedReview, setSelectedReview] = useState<ProductReviewItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProductReviewItem | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

  const { data: reviewsData, isLoading, isFetching } = useProductReviewsQuery(filters);
  const { data: productsData } = useProductsQuery({ pageSize: 100 });

  const publishMutation = usePublishProductReviewMutation();
  const unpublishMutation = useUnpublishProductReviewMutation();
  const deleteMutation = useDeleteProductReviewMutation();

  const products = useMemo(() => {
    return (productsData?.data?.items ?? []).map((p) => ({
      id: p.id,
      title: p.title || "Product",
    }));
  }, [productsData]);

  const productsMap = useMemo(() => {
    const map = new Map<number, string>();
    for (const p of products) map.set(p.id, p.title);
    return map;
  }, [products]);

  const handleTogglePublish = async (review: ProductReviewItem) => {
    setActionLoadingId(review.id);
    try {
      if (review.isPublished) {
        await unpublishMutation.mutateAsync(review.id);
        if (selectedReview?.id === review.id) {
          setSelectedReview({ ...review, isPublished: false });
        }
      } else {
        await publishMutation.mutateAsync(review.id);
        if (selectedReview?.id === review.id) {
          setSelectedReview({ ...review, isPublished: true });
        }
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
      // Handled in mutation onError
    }
  };

  const hasActiveFilters = Boolean(
    filters.search ||
      filters.productId ||
      filters.rate ||
      filters.isPublished !== undefined ||
      filters.sortBy
  );

  const columns = useMemo(
    () =>
      buildProductReviewColumns({
        productsMap,
        onViewDetails: (r) => setSelectedReview(r),
        onTogglePublish: handleTogglePublish,
        onDelete: (r) => setDeleteTarget(r),
        isActionLoadingId: actionLoadingId,
      }),
    [productsMap, actionLoadingId, selectedReview]
  );

  const paged = reviewsData?.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Product Reviews"
        description="Moderate customer feedback, manage published status, and review ratings."
      />

      <ProductReviewFilters
        search={filters.search ?? ""}
        onSearchChange={(search) =>
          setFilters((prev) => ({ ...prev, search, pageNumber: 1 }))
        }
        productId={filters.productId}
        onProductChange={(productId) =>
          setFilters((prev) => ({ ...prev, productId, pageNumber: 1 }))
        }
        rate={filters.rate}
        onRateChange={(rate) =>
          setFilters((prev) => ({ ...prev, rate, pageNumber: 1 }))
        }
        isPublished={filters.isPublished}
        onPublishedChange={(isPublished) =>
          setFilters((prev) => ({ ...prev, isPublished, pageNumber: 1 }))
        }
        sortBy={filters.sortBy}
        onSortByChange={(sortBy) =>
          setFilters((prev) => ({ ...prev, sortBy, pageNumber: 1 }))
        }
        products={products}
        hasActiveFilters={hasActiveFilters}
        onReset={() => setFilters({ pageNumber: 1, pageSize: 10 })}
      />

      <DataTable<ProductReviewItem>
        columns={columns}
        rows={paged?.items ?? []}
        getRowKey={(r) => String(r.id)}
        isLoading={isLoading}
        isFetching={isFetching}
        emptyTitle="No reviews found"
        emptyDescription={
          hasActiveFilters
            ? "Try adjusting your search filters to find what you're looking for."
            : "Customer reviews for products will appear here once submitted."
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
                onPageChange: (pageNumber) =>
                  setFilters((prev) => ({ ...prev, pageNumber })),
              }
            : undefined
        }
      />

      <ProductReviewDetailPanel
        open={Boolean(selectedReview)}
        onClose={() => setSelectedReview(null)}
        review={selectedReview}
        productTitle={
          selectedReview?.productName ||
          (selectedReview ? productsMap.get(selectedReview.productId) : undefined)
        }
        onTogglePublish={handleTogglePublish}
        onDelete={(r) => setDeleteTarget(r)}
        isActionLoading={actionLoadingId === selectedReview?.id}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Review"
        description={`Are you sure you want to permanently delete this review by "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete Review"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
export default ProductReviewManagerComp;
