import React from "react";
import type { Metadata } from "next";
import { TransferLocationManagerComp } from "@/components/adminComp/TransferLocations";

export const metadata: Metadata = {
  title: "Transfer Locations | Admin Portal",
  description:
    "Manage pickup (departure) and destination (drop-off) points for transfer routes.",
};

export default function AdminTransferLocationsPage() {
  return <TransferLocationManagerComp />;
}
