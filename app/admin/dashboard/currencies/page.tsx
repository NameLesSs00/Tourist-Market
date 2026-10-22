import type { Metadata } from "next";
import { CurrencyManagerComp } from "@/components/adminComp/Currencies";

export const metadata: Metadata = {
  title: "Currencies & Exchange Rates | Admin Portal",
  description:
    "Manage platform supported currencies, conversion exchange rates, and active states.",
};

export default function AdminCurrenciesPage() {
  return <CurrencyManagerComp />;
}
