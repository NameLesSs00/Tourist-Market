import type { Metadata } from "next";
import { CountryManagerComp } from "@/components/adminComp/Countries";

export const metadata: Metadata = {
  title: "Countries & Dialing Codes | Admin Portal",
  description: "Manage platform countries, ISO codes, and international phone prefixes",
};

export default function AdminCountriesPage() {
  return <CountryManagerComp />;
}
