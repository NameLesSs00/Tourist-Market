import type { Metadata } from "next";
import { ServiceReviewManagerComp } from "@/components/adminComp/ServiceReviews";

export const metadata: Metadata = {
  title: "Site Service Item Reviews | Admin Dashboard",
  description: "Moderate customer feedback and ratings on site service items and rentals.",
};

export default function AdminSiteServiceItemReviewsPage() {
  return <ServiceReviewManagerComp />;
}
