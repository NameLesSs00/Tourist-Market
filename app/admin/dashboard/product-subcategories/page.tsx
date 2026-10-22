import React from "react";
import type { Metadata } from "next";
import { ProductSubcategoryManagerComp } from "@/components/adminComp/ProductSubcategories";

export const metadata: Metadata = {
  title: "Product Subcategories | Admin Portal",
  description:
    "Manage marketplace product subcategories, parent product categories, cover images, and multilingual names.",
};

export default function AdminProductSubcategoriesPage() {
  return <ProductSubcategoryManagerComp />;
}
