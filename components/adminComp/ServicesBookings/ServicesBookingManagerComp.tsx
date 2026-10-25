"use client";

import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/adminComp/Shared/DataTable";
import { PageHeader } from "@/components/adminComp/Shared/PageHeader";
import {
  useServicesBookingsQuery,
  useUpdateServicesBookingStatusMutation,
} from "@/features/servicesBookings/useServicesBookingAdmin";
import {
  ServicesBookingStatus,
  ServicesBookingType,
  SERVICES_BOOKING_TYPE_LABELS,
  type ServicesBookingItem,
  type ServicesBookingQueryParams,
} from "@/models/servicesBooking";
import {
  buildServicesBookingColumns,
  ServicesBookingDetailPanel,
  ServicesBookingFilters,
  ServicesBookingStatusModal,
  ServicesBookingTabs,
} from "./components";

export function ServicesBookingManagerComp() {
  const [activeTab, setActiveTab] = useState<ServicesBookingType>(ServicesBookingType.RealEstate);
  const [filters, setFilters] = useState<ServicesBookingQueryParams>({
    pageNumber: 1,
    pageSize: 10,
  });
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<ServicesBookingItem | null>(null);
  const [statusModalTarget, setStatusModalTarget] = useState<{
    booking: ServicesBookingItem;
    targetStatus: ServicesBookingStatus;
  } | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const queryParams = useMemo(
    () => ({
      ...filters,
      search: search.trim() || undefined,
    }),
    [filters, search]
  );

  const { data: bookingsData, isLoading, isFetching } = useServicesBookingsQuery(activeTab, queryParams);
  const updateStatusMutation = useUpdateServicesBookingStatusMutation();

  const handleTabChange = (type: ServicesBookingType) => {
    setActiveTab(type);
    setFilters((p) => ({ ...p, pageNumber: 1 }));
    setSelectedBooking(null);
  };

  const handleQuickStatusChange = (booking: ServicesBookingItem, newStatus: ServicesBookingStatus) => {
    if (newStatus === ServicesBookingStatus.Cancelled) {
      setStatusModalTarget({ booking, targetStatus: newStatus });
    } else {
      handleConfirmStatusChange(booking.id, newStatus);
    }
  };

  const handleConfirmStatusChange = async (
    bookingId: string,
    newStatus: ServicesBookingStatus,
    reason?: string
  ) => {
    setActionLoadingId(bookingId);
    try {
      await updateStatusMutation.mutateAsync({ bookingId, newStatus, reason });
      if (selectedBooking?.id === bookingId) {
        setSelectedBooking((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } finally {
      setActionLoadingId(null);
    }
  };

  const paged = bookingsData;
  const rawItems = paged?.items ?? [];

  const items = useMemo(() => {
    if (!search.trim()) return rawItems;
    const q = search.toLowerCase();
    return rawItems.filter((b) =>
      [b.name, b.emailAddress, b.hotel, b.subServiceTitle, b.country].some((f) =>
        f?.toLowerCase().includes(q)
      )
    );
  }, [rawItems, search]);

  const hasActiveFilters = Boolean(
    search || filters.status !== undefined || filters.fromDate || filters.toDate
  );

  const columns = useMemo(
    () =>
      buildServicesBookingColumns({
        activeTab,
        onViewDetails: (b) => setSelectedBooking(b),
        onQuickStatusChange: handleQuickStatusChange,
        isActionLoadingId: actionLoadingId,
      }),
    [activeTab, actionLoadingId]
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Services Bookings"
        description="Monitor customer inquiries, manage reservations, and update statuses across site service categories."
      />

      <ServicesBookingTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        totalCounts={{ [activeTab]: paged?.totalCount ?? 0 }}
      />

      <ServicesBookingFilters
        search={search}
        onSearchChange={setSearch}
        status={filters.status}
        onStatusChange={(status) => setFilters((p) => ({ ...p, status, pageNumber: 1 }))}
        fromDate={filters.fromDate}
        onFromDateChange={(fromDate) => setFilters((p) => ({ ...p, fromDate, pageNumber: 1 }))}
        toDate={filters.toDate}
        onToDateChange={(toDate) => setFilters((p) => ({ ...p, toDate, pageNumber: 1 }))}
        hasActiveFilters={hasActiveFilters}
        onReset={() => {
          setSearch("");
          setFilters({ pageNumber: 1, pageSize: 10 });
        }}
      />

      <DataTable<ServicesBookingItem>
        columns={columns}
        rows={items}
        getRowKey={(b) => b.id}
        isLoading={isLoading}
        isFetching={isFetching}
        emptyTitle={`No ${SERVICES_BOOKING_TYPE_LABELS[activeTab]} bookings found`}
        emptyDescription={
          hasActiveFilters
            ? "Try adjusting your filters or date range to find the bookings."
            : `Bookings for ${SERVICES_BOOKING_TYPE_LABELS[activeTab]} will appear here once submitted by clients.`
        }
        pagination={
          paged
            ? {
                ...paged,
                onPageChange: (pageNumber) => setFilters((p) => ({ ...p, pageNumber })),
              }
            : undefined
        }
      />

      <ServicesBookingDetailPanel
        open={Boolean(selectedBooking)}
        onClose={() => setSelectedBooking(null)}
        booking={selectedBooking}
        onStatusChange={(status) => {
          if (selectedBooking) handleConfirmStatusChange(selectedBooking.id, status);
        }}
        onRequestCancel={(b) => {
          setStatusModalTarget({ booking: b, targetStatus: ServicesBookingStatus.Cancelled });
        }}
        isActionLoading={Boolean(actionLoadingId && actionLoadingId === selectedBooking?.id)}
      />

      <ServicesBookingStatusModal
        open={Boolean(statusModalTarget)}
        booking={statusModalTarget?.booking ?? null}
        targetStatus={statusModalTarget?.targetStatus ?? null}
        onClose={() => setStatusModalTarget(null)}
        onConfirm={handleConfirmStatusChange}
        isLoading={updateStatusMutation.isPending}
      />
    </div>
  );
}

export default ServicesBookingManagerComp;
