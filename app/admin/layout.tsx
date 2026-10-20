import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | Egypt Tourist Market",
  description: "Administrative control center for Egypt Tourist Market",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full min-h-screen bg-[#F8FAFC] text-[#0F172A] pt-20 -mb-20">
      {children}
    </div>
  );
}
