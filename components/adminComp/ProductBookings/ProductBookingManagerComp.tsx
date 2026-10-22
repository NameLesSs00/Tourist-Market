"use client";

import React, { useMemo, useState } from "react";
import { ConfirmDialog } from "@/components/adminComp/Shared/ConfirmDialog";
import { DataTable } from "@/components/adminComp/Shared/DataTable";
import { PageHeader } from "@/components/adminComp/Shared/PageHeader";
import {
  useCancelProductBookingMutation,
  useProductBookingsQuery,
  useUpdateProductBookingStatusMutation,
} from "@/features/productBookings/useProductBookingAdmin";
import type {
  BookingStatus,
  ProductBookingItem,
  ProductBookingQueryParams,
} from "@/models/productBooking";
import {
  buildProductBookingColumns,
  ProductBookingDetailPanel,
  ProductBookingFilters,
} from "./components";

export function ProductBookingManagerComp() {
  const [filters, setFilters] = useState<ProductBookingQueryParams>({
    pageNumber: 1,
    pageSize: 10,
  });
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<ProductBookingItem | null>(null);
  const [cancelTarget, setCancelTarget] = useState<ProductBookingItem | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const queryParams = useMemo(() => ({
    ...filters,
    search: search.trim() || undefined,
  }), [filters, search]);

  const { data: bookingsData, isLoading, isFetching } = useProductBookingsQuery(queryParams);
  const updateStatusMutation = useUpdateProductBookingStatusMutation();
  const cancelMutation = useCancelProductBookingMutation();

  const handleStatusChange = async (bookingId: string, status: BookingStatus) => {
    setActionLoadingId(bookingId);
    try {
      await updateStatusMutation.mutateAsync({ id: bookingId, status });
      if (selectedBooking?.bookingId === bookingId) {
        setSelectedBooking((prev) => (prev ? { ...prev, status } : null));
      }
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleConfirmCancel = async () => {
    if (!cancelTarget) return;
    try {
      await cancelMutation.mutateAsync(cancelTarget.bookingId);
      if (selectedBooking?.bookingId === cancelTarget.bookingId) {
        setSelectedBooking(null);
      }
      setCancelTarget(null);
    } catch {
      // Handled in mutation onError
    }
  };

  const paged = bookingsData;
  const items = paged?.items ?? [];

  const hasActiveFilters = Boolean(
    search ||
    filters.status !== undefined ||
    filters.fromDate ||
    filters.toDate ||
    filters.currency
  );

  const columns = useMemo(
    () =>
      buildProductBookingColumns({
        onViewDetails: (b) => setSelectedBooking(b),
        onCancelBooking: (b) => setCancelTarget(b),
        isActionLoadingId: actionLoadingId,
      }),
    [actionLoadingId]
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Product Bookings"
        description="Review customer orders, monitor fulfillment statuses, and manage cancellations."
      />

      <ProductBookingFilters
        search={search}
        onSearchChange={setSearch}
        status={filters.status}
        onStatusChange={(status) => setFilters((p) => ({ ...p, status, pageNumber: 1 }))}
        fromDate={filters.fromDate}
        onFromDateChange={(fromDate) => setFilters((p) => ({ ...p, fromDate, pageNumber: 1 }))}
        toDate={filters.toDate}
        onToDateChange={(toDate) => setFilters((p) => ({ ...p, toDate, pageNumber: 1 }))}
        currency={filters.currency}
        onCurrencyChange={(currency) => setFilters((p) => ({ ...p, currency, pageNumber: 1 }))}
        hasActiveFilters={hasActiveFilters}
        onReset={() => {
          setSearch("");
          setFilters({ pageNumber: 1, pageSize: 10 });
        }}
      />

      <DataTable<ProductBookingItem>
        columns={columns}
        rows={items}
        getRowKey={(b) => b.bookingId}
        isLoading={isLoading}
        isFetching={isFetching}
        emptyTitle="No product bookings found"
        emptyDescription={
          hasActiveFilters
            ? "Try adjusting your filters to find the bookings you are looking for."
            : "Product purchases will appear here once customers place orders."
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
                onPageChange: (pageNumber) => setFilters((p) => ({ ...p, pageNumber })),
              }
            : undefined
        }
      />

      <ProductBookingDetailPanel
        open={Boolean(selectedBooking)}
        onClose={() => setSelectedBooking(null)}
        booking={selectedBooking}
        onStatusChange={handleStatusChange}
        onCancelBooking={(b) => setCancelTarget(b)}
        isActionLoading={actionLoadingId === selectedBooking?.bookingId}
      />

      <ConfirmDialog
        open={Boolean(cancelTarget)}
        onCancel={() => setCancelTarget(null)}
        onConfirm={handleConfirmCancel}
        title="Cancel Product Booking"
        description={`Are you sure you want to cancel booking #${cancelTarget?.bookingReference} for "${cancelTarget?.customerName}"? This action marks the order as cancelled.`}
        confirmLabel="Cancel Booking"
        isLoading={cancelMutation.isPending}
      />
    </div>
  );
}

export default ProductBookingManagerComp;
