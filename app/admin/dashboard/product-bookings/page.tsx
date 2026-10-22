import type { Metadata } from "next";
import { ProductBookingManagerComp } from "@/components/adminComp/ProductBookings";

export const metadata: Metadata = {
  title: "Product Bookings | Admin Dashboard",
  description: "Review and manage customer product orders and fulfillment statuses.",
};

export default function AdminProductBookingsPage() {
  return <ProductBookingManagerComp />;
}
