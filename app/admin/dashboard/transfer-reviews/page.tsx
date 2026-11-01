import React from "react";
import type { Metadata } from "next";
import { TransferServicesManagerComp } from "@/components/adminComp/TransferServices";

export const metadata: Metadata = {
  title: "Transfer Reviews | Admin Dashboard",
  description: "Moderate and manage customer transfer reviews and ratings",
};

export default function TransferReviewsPage() {
  return <TransferServicesManagerComp defaultTab="reviews" />;
}
