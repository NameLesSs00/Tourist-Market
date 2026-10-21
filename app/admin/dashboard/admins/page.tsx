import type { Metadata } from "next";
import { AdminManagerComp } from "@/components/adminComp/Admins";

export const metadata: Metadata = {
  title: "Administrators | Admin Portal",
  description: "Manage system administrators, permissions, and account access",
};

export default function AdminAdminsPage() {
  return <AdminManagerComp />;
}
