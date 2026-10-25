import React from "react";
import type { Metadata } from "next";
import { PrivateBookingManagerComp } from "@/components/adminComp/PrivateBookings";

export const metadata: Metadata = {
  title: "Private Bookings | Admin Dashboard",
  description: "Monitor and manage customer private excursion bookings, assigned vehicles, and add-ons",
};

export default function PrivateBookingsPage() {
  return <PrivateBookingManagerComp />;
}
