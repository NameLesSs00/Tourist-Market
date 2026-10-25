import React from "react";
import type { Metadata } from "next";
import { TransferBookingManagerComp } from "@/components/adminComp/TransferBookings";

export const metadata: Metadata = {
  title: "Transfer Bookings | Admin Dashboard",
  description: "View customer transfer bookings and update reservation status",
};

export default function TransferBookingsPage() {
  return <TransferBookingManagerComp />;
}
