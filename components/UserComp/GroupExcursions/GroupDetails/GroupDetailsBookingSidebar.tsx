"use client";

import React, { useState } from "react";
import { GroupExcursionDetail } from "../types";

interface GroupDetailsBookingSidebarProps {
  detail: GroupExcursionDetail;
}

export function GroupDetailsBookingSidebar({
  detail,
}: GroupDetailsBookingSidebarProps) {
  const {
    adultPrice,
    childPrice,
    infantPrice,
    availability,
    maxParticipants,
    dateType,
    duration,
  } = detail;

  const [adultCount] = useState(1);
  const [childCount] = useState(0);
  const [infantCount] = useState(0);

  const totalPrice =
    adultCount * adultPrice + childCount * childPrice + infantCount * infantPrice;

  return (
    <aside className="w-full space-y-6 sticky top-24">
      {/* 1. Booking Card */}
      <div className="w-full bg-[#FFFFFF] rounded-[10px] border-[0.5px] border-[#888888] overflow-hidden">
        {/* Header bar */}
        <div className="bg-[#0E4A68] text-white px-4 py-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="font-poppins text-sm sm:text-base font-bold">
            Book This Excursion
          </span>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          {/* Participant Pricing Boxes */}
          <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
            {/* Adult */}
            <div className="border border-[#E5E5E5] rounded-[8px] p-2 sm:p-2.5 text-center flex flex-col justify-between items-center bg-[#FDFDFD]">
              <svg className="w-5 h-5 text-[#0E4A68] mx-auto mb-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <div className="font-poppins text-xs font-semibold text-[#0E4A68]">Adult</div>
              <div className="font-poppins text-sm sm:text-base font-bold text-[#0E4A68] mt-0.5">
                {adultPrice.toFixed(2)}$
              </div>
            </div>

            {/* Child */}
            <div className="border border-[#E5E5E5] rounded-[8px] p-2 sm:p-2.5 text-center flex flex-col justify-between items-center bg-[#FDFDFD]">
              <svg className="w-5 h-5 text-[#0E4A68] mx-auto mb-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2 0-6 1-6 3v2h12v-2c0-2-4-3-6-3z" />
              </svg>
              <div className="font-poppins text-[10px] font-semibold text-[#0E4A68] leading-tight">
                Child<br /><span className="text-[9px] text-[#646464] font-normal">(5 - 11.99)</span>
              </div>
              <div className="font-poppins text-sm sm:text-base font-bold text-[#0E4A68] mt-0.5">
                {childPrice.toFixed(2)}$
              </div>
            </div>

            {/* Infant */}
            <div className="border border-[#E5E5E5] rounded-[8px] p-2 sm:p-2.5 text-center flex flex-col justify-between items-center bg-[#FDFDFD]">
              <svg className="w-5 h-5 text-[#0E4A68] mx-auto mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" />
                <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
              </svg>
              <div className="font-poppins text-[10px] font-semibold text-[#0E4A68] leading-tight">
                Infant<br /><span className="text-[9px] text-[#646464] font-normal">(0 - 4.99)</span>
              </div>
              <div className="font-poppins text-sm sm:text-base font-bold text-[#0E4A68] mt-0.5">
                {infantPrice.toFixed(2)}$
              </div>
            </div>
          </div>

          {/* Availability line */}
          <div className="my-4 pt-3 border-t border-[#BBBBBB]/50 flex items-center gap-3">
            <svg className="w-5 h-5 text-[#0E4A68] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <div>
              <div className="font-poppins text-[11px] text-[#646464]">Available</div>
              <div className="font-poppins text-xs sm:text-sm font-bold text-[#0E4A68]">
                {availability}
              </div>
            </div>
          </div>

          {/* 3 Stats line */}
          <div className="my-4 pt-3 border-t border-[#BBBBBB]/50 grid grid-cols-3 gap-2 text-center">
            {/* Max Participants */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#0E4A68] text-white flex items-center justify-center mb-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>
              <div className="font-poppins text-[10px] text-[#646464]">Max Participants</div>
              <div className="font-poppins text-xs font-bold text-[#0E4A68] mt-0.5">
                {maxParticipants} Person
              </div>
            </div>

            {/* Date Type */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#0E4A68] text-white flex items-center justify-center mb-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div className="font-poppins text-[10px] text-[#646464]">Date Type</div>
              <div className="font-poppins text-xs font-bold text-[#0E4A68] mt-0.5">
                {dateType}
              </div>
            </div>

            {/* Duration */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#0E4A68] text-white flex items-center justify-center mb-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="font-poppins text-[10px] text-[#646464]">Duration</div>
              <div className="font-poppins text-xs font-bold text-[#0E4A68] mt-0.5">
                {duration}
              </div>
            </div>
          </div>

          {/* Book Now Button */}
          <button
            type="button"
            className="w-full mt-4 py-3 bg-[#0E4A68] hover:bg-[#09354b] active:scale-[0.99] text-[#FFFFFF] font-poppins text-sm sm:text-base font-bold rounded-[10px] transition-all cursor-pointer shadow-sm"
            style={{
              border: "0.25px solid #000000",
            }}
          >
            Book Now {totalPrice > 0 && `• $${totalPrice.toFixed(2)}`}
          </button>
        </div>
      </div>

      {/* 2. Need Help Section Card */}
      <div className="w-full bg-[#FFFFFF] rounded-[10px] border-[0.5px] border-[#888888] p-4 sm:p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <svg className="w-6 h-6 text-[#124885]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3" />
            </svg>
            <div>
              <h4 className="font-poppins text-base font-bold text-[#124885]">
                Need Help ?
              </h4>
              <p className="font-poppins text-xs text-[#083043]">
                contact us for Help ?
              </p>
            </div>
          </div>
          <span className="text-[#124885] font-bold text-lg">&gt;</span>
        </div>

        {/* Action Contact Buttons */}
        <div className="space-y-2.5">
          {/* WhatsApp */}
          <a
            href="https://wa.me/2001289494715"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 bg-[#17DB55] hover:opacity-95 text-white font-poppins text-sm font-semibold rounded-[8px] flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.541 1.944.825 2.791.825 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.766-5.768-5.766zm9.969 5.766c0 5.485-4.484 9.969-9.969 9.969-1.748 0-3.414-.46-4.887-1.282l-5.644 1.479 1.506-5.508c-.908-1.523-1.406-3.29-1.406-5.127 0-5.485 4.484-9.969 9.969-9.969 5.485 0 9.969 4.484 9.969 9.969z" />
            </svg>
            <span>WhatsApp</span>
          </a>

          {/* Telegram */}
          <a
            href="https://t.me"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 bg-[#0E4A68] hover:opacity-95 text-white font-poppins text-sm font-semibold rounded-[8px] flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.313 4.674c.459 0 .661-.21.918-.458l2.204-2.143 4.582 3.385c.845.466 1.455.226 1.666-.783l3.008-14.167c.309-1.238-.472-1.8-1.971-1.475z" />
            </svg>
            <span>Telegram</span>
          </a>

          {/* Viber */}
          <a
            href="viber://chat"
            className="w-full py-2.5 px-4 bg-[#F4F4F4] hover:bg-[#EBEBEB] text-[#444444] border border-[#DDD] font-poppins text-sm font-semibold rounded-[8px] flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <svg className="w-4 h-4 fill-[#7360F2]" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.07L2 22l5.09-1.34C8.54 21.52 10.22 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.57 0-3.04-.43-4.3-1.18l-.31-.18-3.02.8.81-2.95-.2-.32C4.38 14.93 4 13.51 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" />
            </svg>
            <span>Viber</span>
          </a>
        </div>
      </div>
    </aside>
  );
}

export default GroupDetailsBookingSidebar;
