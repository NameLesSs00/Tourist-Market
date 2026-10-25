"use client";

import React, { useMemo, useState } from "react";
import { DataTable, PageHeader, SearchInput } from "@/components/adminComp/Shared";
import { usePrivateBookingsQuery } from "@/features/privateBookings/usePrivateBookingAdmin";
import {
  type PrivateBookingItem,
  PrivateBookingStatus,
} from "@/models/privateBooking";
import {
  buildPrivateBookingColumns,
  PrivateBookingDetailDrawer,
  PrivateBookingStatusModal,
} from "./components";

const PAGE_SIZE = 10;

export function PrivateBookingManagerComp() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const [selectedDetail, setSelectedDetail] = useState<PrivateBookingItem | null>(null);
  const [statusTarget, setStatusTarget] = useState<PrivateBookingItem | null>(null);

  const queryParams = useMemo(() => {
    return {
      pageNumber: page,
      pageSize: PAGE_SIZE,
      status: statusFilter ? (Number(statusFilter) as PrivateBookingStatus) : undefined,
      customerName: search.trim() ? search.trim() : undefined,
    };
  }, [page, statusFilter, search]);

  const listQuery = usePrivateBookingsQuery(queryParams);
  const items = listQuery.data?.items ?? [];
  const totalCount = listQuery.data?.totalCount ?? items.length;
  const totalPages = Math.max(1, listQuery.data?.totalPages ?? 1);

  // Client-side filtering fallback for reference, phone, or hotel if search term present
  const displayedItems = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.trim().toLowerCase();
    return items.filter(
      (b) =>
        b.customerName?.toLowerCase().includes(q) ||
        b.bookingReference?.toLowerCase().includes(q) ||
        b.customerPhone?.toLowerCase().includes(q) ||
        b.hotelName?.toLowerCase().includes(q) ||
        b.items.some((i) => i.excursionTitle?.toLowerCase().includes(q))
    );
  }, [items, search]);

  const columns = useMemo(
    () =>
      buildPrivateBookingColumns({
        onViewDetails: (item) => setSelectedDetail(item),
        onUpdateStatus: (item) => setStatusTarget(item),
      }),
    []
  );

  return (
    <div className="space-y-6 p-6 sm:p-8">
      <PageHeader
        title="Private Excursion Bookings"
        description="Monitor private tour reservations, assigned vehicle tiers, attractions, extra services, and manage booking lifecycles."
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput
            value={search}
            onChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
            placeholder="Search by customer, reference, phone, hotel..."
          />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3.5 py-2.5 text-xs text-[#0F172A] outline-none transition focus:border-[#0E4A68]"
          >
            <option value="">All Booking Statuses</option>
            <option value={String(PrivateBookingStatus.Pending)}>Pending</option>
            <option value={String(PrivateBookingStatus.Confirmed)}>Confirmed</option>
            <option value={String(PrivateBookingStatus.Completed)}>Completed</option>
            <option value={String(PrivateBookingStatus.Cancelled)}>Cancelled</option>
          </select>
        </div>

        <div className="text-xs font-medium text-[#64748B]">
          Total: <span className="font-semibold text-[#083952]">{totalCount}</span> bookings
        </div>
      </div>

      <DataTable<PrivateBookingItem>
        columns={columns}
        rows={displayedItems}
        getRowKey={(item) => item.id}
        isLoading={listQuery.isLoading}
        isFetching={listQuery.isFetching}
        emptyTitle={search.trim() ? `No bookings match "${search}"` : "No private bookings found"}
        emptyDescription="Customer reservations for private excursions will appear here once booked."
        pagination={{
          pageNumber: page,
          pageSize: PAGE_SIZE,
          totalPages,
          totalCount,
          hasPreviousPage: page > 1,
          hasNextPage: page < totalPages,
          onPageChange: (newPage) => setPage(newPage),
        }}
      />

      <PrivateBookingDetailDrawer
        open={Boolean(selectedDetail)}
        booking={selectedDetail}
        onClose={() => setSelectedDetail(null)}
        onOpenStatusModal={(item) => {
          setSelectedDetail(null);
          setStatusTarget(item);
        }}
      />

      <PrivateBookingStatusModal
        open={Boolean(statusTarget)}
        booking={statusTarget}
        onClose={() => setStatusTarget(null)}
      />
    </div>
  );
}

export default PrivateBookingManagerComp;
