import React from "react";
import type { Metadata } from "next";
import { SiteServiceManagerComp } from "@/components/adminComp/SiteServices";

export const metadata: Metadata = {
  title: "Site Services | Admin Portal",
  description:
    "Manage platform site services, multilingual titles, descriptions, cover images, and catalog availability.",
};

export default function AdminSiteServicesPage() {
  return <SiteServiceManagerComp />;
}
