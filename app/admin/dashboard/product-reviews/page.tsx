import type { Metadata } from "next";
import { ProductReviewManagerComp } from "@/components/adminComp/ProductReviews";

export const metadata: Metadata = {
  title: "Product Reviews | Admin Dashboard",
  description: "Moderate and manage customer product reviews.",
};

export default function AdminProductReviewsPage() {
  return <ProductReviewManagerComp />;
}
