import type { Metadata } from "next";
import { PrivateExcursionManagerComp } from "@/components/adminComp/PrivateExcursions";

export const metadata: Metadata = {
  title: "Private Excursions | Admin Portal",
  description:
    "Manage tailor-made private excursions, assigned attractions, extra services, and multi-currency pricing.",
};

export default function AdminPrivateExcursionsPage() {
  return <PrivateExcursionManagerComp />;
}
