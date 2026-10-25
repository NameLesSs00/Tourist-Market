import { Suspense } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/UserComp/Header";
import { Footer } from "@/components/UserComp/Footer";
import { QueryProvider } from "@/shared/providers/QueryProvider";

export const metadata: Metadata = {
  title: "Egypt Tourist Market",
  description: "Authentic Cultural Experiences & Local Markets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased font-poppins">
      <body className="min-h-full flex flex-col bg-[#FFF4E5] text-[#083952]">
        <QueryProvider>
          <Suspense fallback={<div className="h-20 w-full" />}>
            <Header />
          </Suspense>
          <main className="flex-1 -mt-20">{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
