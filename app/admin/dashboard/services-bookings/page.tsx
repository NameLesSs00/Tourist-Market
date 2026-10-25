import type { Metadata } from "next";
import { ServicesBookingManagerComp } from "@/components/adminComp/ServicesBookings";

export const metadata: Metadata = {
  title: "Services Bookings | Admin Dashboard",
  description: "Review and manage site service inquiries and reservations.",
};

export default function AdminServicesBookingsPage() {
  return <ServicesBookingManagerComp />;
}
