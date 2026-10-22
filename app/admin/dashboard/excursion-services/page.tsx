import React from "react";
import type { Metadata } from "next";
import { ExcursionServiceManagerComp } from "@/components/adminComp/ExcursionServices";

export const metadata: Metadata = {
  title: "Excursion Services | Admin Dashboard",
  description: "Manage excursion add-ons, equipment rentals, upgrades, and experiences.",
};

export default function ExcursionServicesAdminPage() {
  return <ExcursionServiceManagerComp />;
}
