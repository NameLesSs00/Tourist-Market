import type { Metadata } from "next";
import { FaqManagerComp } from "@/components/adminComp/Faq";

export const metadata: Metadata = {
  title: "FAQs | Admin Portal",
};

export default function AdminFaqsPage() {
  return <FaqManagerComp />;
}
