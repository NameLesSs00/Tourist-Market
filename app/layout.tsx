import { Suspense } from "react";
import type { Metadata } from "next";
import { Poppins, Manrope, Montserrat, Caveat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/UserComp/Header";
import { Footer } from "@/components/UserComp/Footer";
import { WhatsAppFloatingButton } from "@/components/UserComp/Shared/WhatsAppFloatingButton";
import { QueryProvider } from "@/shared/providers/QueryProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
    <html
      lang="en"
      className={`${poppins.variable} ${manrope.variable} ${montserrat.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className={`${poppins.className} min-h-full flex flex-col bg-[#FFF4E5] text-[#083952]`}>
        <QueryProvider>
          <Suspense fallback={<div className="h-20 w-full" />}>
            <Header />
          </Suspense>
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
          <WhatsAppFloatingButton />
        </QueryProvider>
      </body>
    </html>
  );
}
