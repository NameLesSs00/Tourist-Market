import type { Metadata } from "next";
import { Poppins, Manrope, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/UserComp/Header";
import { Footer } from "@/components/UserComp/Footer";

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
      className={`${poppins.variable} ${manrope.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FFF4E5] text-[#083952]">
        <Header />
        <main className="flex-1 -mt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
