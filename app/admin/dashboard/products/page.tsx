import React from "react";
import type { Metadata } from "next";
import { ProductManagerComp } from "@/components/adminComp/Products";

export const metadata: Metadata = {
  title: "Products | Admin Portal",
  description:
    "Manage marketplace products, pricing, subcategory assignment, and photo galleries.",
};

export default function AdminProductsPage() {
  return <ProductManagerComp />;
}
