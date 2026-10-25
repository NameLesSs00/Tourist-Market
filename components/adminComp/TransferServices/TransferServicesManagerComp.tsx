"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/adminComp/Shared";
import { useTransferRoutePricesQuery } from "@/features/transferRoutePrices/useTransferRoutePriceAdmin";
import {
  useTransferFromLocationsQuery,
  useTransferToLocationsQuery,
} from "@/features/transferLocations/useTransferLocationAdmin";
import {
  TransferServicesTabs,
  type TransferServicesTab,
} from "./TransferServicesTabs";
import { TransferRoutePriceList } from "./TransferRoutePriceList";
import { TransferLocationsView } from "./TransferLocationsView";

interface TransferServicesManagerCompProps {
  defaultTab?: TransferServicesTab;
}

export function TransferServicesManagerComp({
  defaultTab = "prices",
}: TransferServicesManagerCompProps) {
  const [activeTab, setActiveTab] = useState<TransferServicesTab>(defaultTab);

  const pricesCountQuery = useTransferRoutePricesQuery({ pageSize: 1 });
  const fromCountQuery = useTransferFromLocationsQuery({ pageSize: 1 });
  const toCountQuery = useTransferToLocationsQuery({ pageSize: 1 });

  const pricesCount = pricesCountQuery.data?.totalCount ?? 0;
  const fromCount = fromCountQuery.data?.data?.totalCount ?? 0;
  const toCount = toCountQuery.data?.data?.totalCount ?? 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transfer Services"
        description="Manage route pricing rules, departure pickup points, and destination drop-off locations."
      />

      {/* Main Tabbed Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <TransferServicesTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          pricesCount={pricesCount}
          fromCount={fromCount}
          toCount={toCount}
        />
      </div>

      {/* Active Tab Content */}
      {activeTab === "prices" && <TransferRoutePriceList />}
      {activeTab === "from" && <TransferLocationsView locationType="from" />}
      {activeTab === "to" && <TransferLocationsView locationType="to" />}
    </div>
  );
}
