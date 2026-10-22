import type { Metadata } from "next";
import { ExcursionReviewManagerComp } from "@/components/adminComp/ExcursionReviews";

export const metadata: Metadata = {
  title: "Excursion Reviews | Admin Dashboard",
  description: "Moderate and manage customer reviews for private excursions.",
};

export default function AdminExcursionReviewsPage() {
  return <ExcursionReviewManagerComp />;
}
