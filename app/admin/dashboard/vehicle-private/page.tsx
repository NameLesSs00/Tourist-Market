import React from "react";
import type { Metadata } from "next";
import { VehiclePrivateManagerComp } from "@/components/adminComp/VehiclePrivate";

export const metadata: Metadata = {
  title: "Vehicle Private | Admin Portal",
  description:
    "Manage vehicles available for private excursions and transfer services.",
};

export default function AdminVehiclePrivatePage() {
  return <VehiclePrivateManagerComp />;
}
