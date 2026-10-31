import type { Metadata } from "next";
import { Toaster } from "sonner";

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
    // Fixed full-viewport layer so the public layout's offsets (main -mt-20) don't affect admin pages.
    // Strictly enforce dir="ltr" so the admin interface stays on the left side regardless of client locale.
    <div dir="ltr" className="fixed inset-0 z-40 overflow-y-auto bg-[#F8FAFC] text-[#0F172A] text-left">
      {children}
      <Toaster richColors closeButton position="top-right" toastOptions={{ className: "font-poppins" }} />
    </div>
  );
}
