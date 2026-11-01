import type { Metadata } from "next";
import { DeliveryProductsManagerComp } from "@/components/adminComp/DeliveryProducts";

export const metadata: Metadata = {
  title: "Delivery Pricing | Admin Portal",
  description: "Manage hotel delivery zones, areas, and shipping charges.",
};

export default function DeliveryProductsPage() {
  return <DeliveryProductsManagerComp />;
}

