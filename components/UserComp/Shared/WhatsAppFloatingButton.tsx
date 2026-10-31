"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";

export function WhatsAppFloatingButton() {
  const pathname = usePathname();

  // Hide button on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <a
      href="https://wa.me/201036232021"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 hover:bg-[#20ba59] hover:shadow-xl hover:shadow-[#25D366]/40 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 active:scale-95 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
    >
      <FaWhatsapp className="h-8 w-8 sm:h-9 sm:w-9" />
    </a>
  );
}

export default WhatsAppFloatingButton;

