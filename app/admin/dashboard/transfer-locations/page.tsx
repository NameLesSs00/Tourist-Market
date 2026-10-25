import React from "react";
import type { Metadata } from "next";
import { TransferServicesManagerComp } from "@/components/adminComp/TransferServices";

export const metadata: Metadata = {
  title: "Transfer Services | Admin Portal",
  description:
    "Manage transfer route pricing rules, pickup locations, and destination points.",
};

export default function AdminTransferLocationsPage() {
  return <TransferServicesManagerComp defaultTab="from" />;
}
