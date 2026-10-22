import React from "react";
import type { Metadata } from "next";
import { SiteServiceItemManagerComp } from "@/components/adminComp/SiteServiceItems";

export const metadata: Metadata = {
  title: "Site Service Items | Admin Portal",
  description:
    "Manage site service options, vehicles, rentals, variation tiers, perks, and gallery photos.",
};

export default function AdminSiteServiceItemsPage() {
  return <SiteServiceItemManagerComp />;
}
