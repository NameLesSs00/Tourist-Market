import type { Metadata } from "next";
import { ExcursionCategoryManagerComp } from "@/components/adminComp/ExcursionCategories";

export const metadata: Metadata = {
  title: "Excursion Categories | Admin Portal",
  description:
    "Manage excursion categories, display order, multilingual titles, and activity classifications.",
};

export default function AdminExcursionCategoriesPage() {
  return <ExcursionCategoryManagerComp />;
}
