import React from "react";
import Image from "next/image";

export function TransferContactUs() {
  return (
    <div className="bg-[#F5F7F8] rounded-[8.38px] border-[0.2px] border-[#888888] shadow-[0px_1.05px_8.38px_1.05px_rgba(0,0,0,0.2)] p-5 md:p-6 text-center space-y-4 font-poppins">
      <h2 className="text-base sm:text-lg font-bold text-[#0E4A68]">
        Contact Us
      </h2>

      {/* Social / Direct chat buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {/* WhatsApp */}
        <a
          href="https://wa.me/201289494715"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[8.38px] bg-[#17DB55] text-white text-xs sm:text-sm font-semibold hover:opacity-95 transition shadow-xs"
        >
          <span className="relative w-4 h-4 flex items-center justify-center">
            <Image
              src="/transfer/Group.svg"
              alt="WhatsApp"
              width={16}
              height={16}
              className="object-contain"
            />
          </span>
          <span>WhatsApp</span>
        </a>

        {/* Viber */}
        <a
          href="viber://chat?number=201289494715"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[8.38px] bg-[#F4F4F4] text-[#0E4A68] text-xs sm:text-sm font-semibold hover:bg-gray-100 transition shadow-xs border-[0.5px] border-[#888888]"
        >
          <span className="relative w-4 h-4 flex items-center justify-center">
            <Image
              src="/transfer/Vector (3).svg"
              alt="Viber"
              width={16}
              height={16}
              className="object-contain"
            />
          </span>
          <span>Viber</span>
        </a>

        {/* Telegram */}
        <a
          href="https://t.me/+201289494715"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[8.38px] bg-[#1487B8] text-white text-xs sm:text-sm font-semibold hover:opacity-95 transition shadow-xs"
        >
          <span className="relative w-4 h-4 flex items-center justify-center">
            <Image
              src="/transfer/Vector (4).svg"
              alt="Telegram"
              width={16}
              height={16}
              className="object-contain"
            />
          </span>
          <span>Telegram</span>
        </a>
      </div>

      {/* Contact info subtitle */}
      <div className="text-xs font-semibold text-[#52646B]">
        +20 01289494715 · Daily 9:00 AM – 9:00 PM
      </div>
    </div>
  );
}
