import type { Metadata } from "next";
import { AttractionManagerComp } from "@/components/adminComp/Attractions";

export const metadata: Metadata = {
  title: "Attractions & Add-ons | Admin Portal",
  description:
    "Manage excursion attractions, VIP upgrades, tour add-ons, pricing tiers, and photo galleries.",
};

export default function AdminAttractionsPage() {
  return <AttractionManagerComp />;
}
