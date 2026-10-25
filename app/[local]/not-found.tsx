import type { Metadata } from "next";
import { NotFoundComp } from "@/components/UserComp/NotFound";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Egypt Tourist Market",
  description: "The requested page could not be found. Discover luxury Egypt tours and authentic markets.",
};

export default function LocalNotFoundPage() {
  return <NotFoundComp />;
}
