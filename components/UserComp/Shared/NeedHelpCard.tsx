"use client";

import React from "react";
import { FiChevronRight, FiHeadphones } from "react-icons/fi";
import { FaTelegramPlane, FaViber, FaWhatsapp } from "react-icons/fa";

interface NeedHelpCardProps {
  className?: string;
  whatsappNumber?: string;
  telegramLink?: string;
  viberNumber?: string;
}

export function NeedHelpCard({
  className = "",
  whatsappNumber = "201289494715",
  telegramLink = "https://t.me/egypttouristmarket",
  viberNumber = "201289494715",
}: NeedHelpCardProps) {
  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, "");
  const cleanViber = viberNumber.replace(/[^0-9]/g, "");

  const waHref = cleanPhone ? `https://wa.me/${cleanPhone}` : "https://wa.me/";
  const tgHref = telegramLink || "https://t.me/";
  const vbHref = cleanViber
    ? `viber://chat?number=%2B${cleanViber}`
    : "viber://chat";

  return (
    <div
      className={`w-full p-4 sm:p-5 font-poppins select-none shadow-sm transition-all ${className}`}
      style={{
        background: "#FFFFFF",
        border: "0.5px solid #888888",
        borderRadius: "10px",
      }}
    >
      {/* ─── Top Header ─── */}
      <div className="flex items-center justify-between pb-3.5 border-b border-[#BBBBBB]/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center border border-[#124885]/20 bg-[#124885]/5 text-[#124885] shrink-0">
            <FiHeadphones size={20} />
          </div>
          <div className="flex flex-col">
            <h4 className="text-[16px] font-bold text-[#124885] leading-tight">
              Need Help ?
            </h4>
            <span className="text-[12px] text-[#083043] font-normal">
              contact us for Help ?
            </span>
          </div>
        </div>
        <FiChevronRight size={18} className="text-[#083043]/60 shrink-0" />
      </div>

      {/* ─── Action Buttons ─── */}
      <div className="flex flex-col gap-2.5 mt-3.5">
        {/* WhatsApp Button */}
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-4 rounded-[8px] flex items-center justify-center gap-2 text-white font-medium text-[13px] sm:text-[14px] hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer shadow-sm"
          style={{ background: "#17DB55" }}
        >
          <FaWhatsapp size={17} />
          <span>WhatsApp</span>
        </a>

        {/* Telegram Button */}
        <a
          href={tgHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-4 rounded-[8px] flex items-center justify-center gap-2 text-white font-medium text-[13px] sm:text-[14px] hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer shadow-sm"
          style={{ background: "#0E4A68" }}
        >
          <FaTelegramPlane size={17} />
          <span>Telegram</span>
        </a>

        {/* Viber Button */}
        <a
          href={vbHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-4 rounded-[8px] flex items-center justify-center gap-2 font-medium text-[13px] sm:text-[14px] hover:bg-[#EBEBEB] active:scale-[0.99] transition-all cursor-pointer border border-[#DDD]"
          style={{ background: "#F4F4F4", color: "#083043" }}
        >
          <FaViber size={17} className="text-[#7360F2]" />
          <span>Viber</span>
        </a>
      </div>
    </div>
  );
}

export default NeedHelpCard;

