import React from "react";
import type { Metadata } from "next";
import { GroupBookingManagerComp } from "@/components/adminComp/GroupBookings";

export const metadata: Metadata = {
  title: "Group Bookings | Admin Dashboard",
  description: "View customer group excursion bookings and update reservation status",
};

export default function GroupBookingsPage() {
  return <GroupBookingManagerComp />;
}
