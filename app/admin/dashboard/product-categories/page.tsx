import type { Metadata } from "next";
import { ProductCategoryManagerComp } from "@/components/adminComp/ProductCategories";

export const metadata: Metadata = {
  title: "Product Categories | Admin Portal",
  description:
    "Manage marketplace product categories, cover images, display order, and multilingual names.",
};

export default function AdminProductCategoriesPage() {
  return <ProductCategoryManagerComp />;
}
