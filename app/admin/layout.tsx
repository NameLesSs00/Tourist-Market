import type { Metadata } from "next";
import { Toaster } from "sonner";
import "../globals.css";
import { QueryProvider } from "@/shared/providers";
import { BODY_FONT_CLASSES, HTML_FONT_CLASSES } from "@/shared/utils/fonts";

// ---------------------------------------------------------------------------
// Root layout of the admin area. The public tree has its own root layout
// (app/[local]/layout.tsx), so this segment must render <html>/<body> itself.
// It is never indexed, in any environment.
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Admin Portal | Egypt Tourist Market",
  description: "Administrative control center for Egypt Tourist Market",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={HTML_FONT_CLASSES}>
      {/* Fixed full-viewport layer so the public layout's offsets (main -mt-20) don't affect admin pages.
          dir="ltr" is enforced so the admin interface stays on the left side regardless of client locale. */}
      <body className={BODY_FONT_CLASSES}>
        <div dir="ltr" className="fixed inset-0 z-40 overflow-y-auto bg-[#F8FAFC] text-[#0F172A] text-left">
          {/* the react-query client the admin screens run on used to come from the
              shared root layout; as admin now has its own root it provides its own */}
          <QueryProvider>
            {children}
            <Toaster richColors closeButton position="top-right" toastOptions={{ className: "font-poppins" }} />
          </QueryProvider>
        </div>
      </body>
    </html>
  );
}
