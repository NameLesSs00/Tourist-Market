"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/adminComp/Shared";
import { useVehicleTypeTransfersQuery } from "@/features/vehicleTypeTransfers/useVehicleTypeTransferAdmin";
import { useTransferVehiclePricesQuery } from "@/features/transferVehiclePrices/useTransferVehiclePriceAdmin";
import {
  useTransferFromLocationsQuery,
  useTransferToLocationsQuery,
} from "@/features/transferLocations/useTransferLocationAdmin";
import { useAdminTransferReviewsQuery } from "@/features/transferReviews/useAdminTransferReviews";
import {
  TransferServicesTabs,
  type TransferServicesTab,
} from "./TransferServicesTabs";
import { VehicleTypeList } from "./VehicleTypeList";
import { TransferVehiclePriceList } from "./TransferVehiclePriceList";
import { TransferLocationsView } from "./TransferLocationsView";
import { TransferReviewList } from "./TransferReviewList";

interface TransferServicesManagerCompProps {
  defaultTab?: TransferServicesTab;
}

export function TransferServicesManagerComp({
  defaultTab = "vehicleTypes",
}: TransferServicesManagerCompProps) {
  const [activeTab, setActiveTab] = useState<TransferServicesTab>(defaultTab);

  const vehicleTypesQuery = useVehicleTypeTransfersQuery({ pageSize: 1 });
  const pricesCountQuery = useTransferVehiclePricesQuery({ PageSize: 1 });
  const fromCountQuery = useTransferFromLocationsQuery({ pageSize: 1 });
  const toCountQuery = useTransferToLocationsQuery({ pageSize: 1 });
  const reviewsCountQuery = useAdminTransferReviewsQuery({ pageSize: 1 });

  const vehicleTypesCount = vehicleTypesQuery.data?.totalCount ?? 0;
  const pricesCount = pricesCountQuery.data?.totalCount ?? 0;
  const fromCount = fromCountQuery.data?.data?.totalCount ?? 0;
  const toCount = toCountQuery.data?.data?.totalCount ?? 0;
  const reviewsCount = reviewsCountQuery.data?.totalCount ?? 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transfer Services"
        description="Manage transfer vehicle types, route pricing, departure pickup points, destination drop-off locations, and customer reviews."
      />

      {/* Main Tabbed Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <TransferServicesTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          vehicleTypesCount={vehicleTypesCount}
          pricesCount={pricesCount}
          fromCount={fromCount}
          toCount={toCount}
          reviewsCount={reviewsCount}
        />
      </div>

      {/* Active Tab Content */}
      {activeTab === "vehicleTypes" && <VehicleTypeList />}
      {activeTab === "prices" && <TransferVehiclePriceList />}
      {activeTab === "from" && <TransferLocationsView locationType="from" />}
      {activeTab === "to" && <TransferLocationsView locationType="to" />}
      {activeTab === "reviews" && <TransferReviewList />}
    </div>
  );
}
