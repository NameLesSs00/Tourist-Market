"use client";

import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/adminComp/Shared";
import { useCountriesQuery } from "@/features/countries/useCountryAdmin";
import {
  useUpdateTransferBookingStatusMutation,
  useTransferBookingsQuery,
} from "@/features/transferBookings/useTransferBookingAdmin";
import {
  useTransferFromLocationsQuery,
  useTransferToLocationsQuery,
} from "@/features/transferLocations/useTransferLocationAdmin";
import {
  TransferBookingItem,
  TransferBookingStatus,
} from "@/models/transferBooking";
import {
  buildTransferBookingColumns,
  TransferBookingDetailPanel,
  TransferBookingFilters,
  TransferBookingStatusModal,
} from "./components";

export function TransferBookingManagerComp() {
  const [statusFilter, setStatusFilter] = useState<TransferBookingStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [detailBooking, setDetailBooking] = useState<TransferBookingItem | null>(null);
  const [statusTargetBooking, setStatusTargetBooking] = useState<TransferBookingItem | null>(null);

  const bookingsQuery = useTransferBookingsQuery();
  const updateStatusMutation = useUpdateTransferBookingStatusMutation();
  const fromLocQuery = useTransferFromLocationsQuery({ pageSize: 100 });
  const toLocQuery = useTransferToLocationsQuery({ pageSize: 100 });
  const countriesQuery = useCountriesQuery("en");

  const locationMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const item of fromLocQuery.data?.data?.items ?? []) map.set(item.id, item.name);
    for (const item of toLocQuery.data?.data?.items ?? []) map.set(item.id, item.name);
    return map;
  }, [fromLocQuery.data, toLocQuery.data]);

  const countryMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const c of countriesQuery.data ?? []) map.set(c.id, c.name);
    return map;
  }, [countriesQuery.data]);

  const allBookings = bookingsQuery.data ?? [];

  const statusCounts = useMemo(() => {
    return {
      all: allBookings.length,
      pending: allBookings.filter((b) => b.status === TransferBookingStatus.Pending).length,
      confirmed: allBookings.filter((b) => b.status === TransferBookingStatus.Confirmed).length,
      completed: allBookings.filter((b) => b.status === TransferBookingStatus.Completed).length,
      cancelled: allBookings.filter((b) => b.status === TransferBookingStatus.Cancelled).length,
    };
  }, [allBookings]);

  const filteredBookings = useMemo(() => {
    return allBookings.filter((b) => {
      if (statusFilter !== "all" && b.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = b.customerName?.toLowerCase().includes(q);
        const matchEmail = b.email?.toLowerCase().includes(q);
        const matchPhone = b.phoneNumber?.toLowerCase().includes(q);
        const matchFrom = locationMap.get(b.fromLocationId)?.toLowerCase().includes(q);
        const matchTo = locationMap.get(b.toLocationId)?.toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchPhone && !matchFrom && !matchTo) return false;
      }
      return true;
    });
  }, [allBookings, statusFilter, searchQuery, locationMap]);

  const columns = useMemo(
    () =>
      buildTransferBookingColumns({
        locationMap,
        onViewDetails: (b) => setDetailBooking(b),
        onEditStatus: (b) => setStatusTargetBooking(b),
      }),
    [locationMap]
  );

  const handleStatusConfirm = (id: string, status: TransferBookingStatus) => {
    updateStatusMutation.mutate(
      { id, status },
      {
        onSuccess: () => {
          if (detailBooking?.id === id) {
            setDetailBooking((prev) => (prev ? { ...prev, status } : null));
          }
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Transfer Bookings</h1>
        <p className="text-xs text-slate-500 mt-1">
          Monitor incoming passenger transfer reservations and update their status.
        </p>
      </div>

      <TransferBookingFilters
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        statusCounts={statusCounts}
      />

      <div className="rounded-2xl border border-slate-200 bg-white shadow-2xs overflow-hidden">
        <DataTable
          columns={columns}
          rows={filteredBookings}
          getRowKey={(item) => item.id}
          isLoading={bookingsQuery.isLoading}
          emptyTitle="No transfer bookings found"
          emptyDescription="No transfer reservations matching current criteria."
        />
      </div>

      <TransferBookingDetailPanel
        open={Boolean(detailBooking)}
        onClose={() => setDetailBooking(null)}
        booking={detailBooking}
        locationMap={locationMap}
        countryMap={countryMap}
        onEditStatus={(b) => setStatusTargetBooking(b)}
        onQuickStatusChange={handleStatusConfirm}
        isUpdatingStatus={updateStatusMutation.isPending}
      />

      <TransferBookingStatusModal
        open={Boolean(statusTargetBooking)}
        booking={statusTargetBooking}
        onClose={() => setStatusTargetBooking(null)}
        onConfirm={handleStatusConfirm}
        isLoading={updateStatusMutation.isPending}
      />
    </div>
  );
}
