"use client";

import React from "react";
import { FiHeadphones, FiChevronRight } from "react-icons/fi";
import { FaWhatsapp, FaTelegramPlane, FaViber } from "react-icons/fa";

export function ProductDetailsNeedHelp() {
  return (
    <div
      className="w-full p-4 sm:p-5 font-poppins select-none shadow-sm transition-all"
      style={{
        background: "#FFFFFF",
        border: "0.5px solid #888888",
        borderRadius: "10px",
      }}
    >
      {/* ─── Top Header ─── */}
      <div className="flex items-center justify-between pb-3.5 border-b border-[#BBBBBB]/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center border border-[#124885]/20 text-[#124885]">
            <FiHeadphones size={22} />
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
        <FiChevronRight size={18} className="text-[#083043]/60" />
      </div>

      {/* ─── Action Buttons ─── */}
      <div className="flex flex-col gap-2 mt-3.5">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 px-4 rounded-[6px] flex items-center justify-center gap-2 text-white font-medium text-[13px] hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer shadow-sm"
          style={{ background: "#17DB55" }}
        >
          <FaWhatsapp size={16} />
          <span>WhatsApp</span>
        </a>

        {/* Telegram Button */}
        <a
          href="https://t.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 px-4 rounded-[6px] flex items-center justify-center gap-2 text-white font-medium text-[13px] hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer shadow-sm"
          style={{ background: "#0E4A68" }}
        >
          <FaTelegramPlane size={16} />
          <span>Telegram</span>
        </a>

        {/* Viber Button */}
        <a
          href="viber://chat"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 px-4 rounded-[6px] flex items-center justify-center gap-2 font-medium text-[13px] hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer"
          style={{ background: "#F4F4F4", color: "#083043" }}
        >
          <FaViber size={16} className="text-[#7360F2]" />
          <span>Viber</span>
        </a>
      </div>
    </div>
  );
}

export default ProductDetailsNeedHelp;
