"use client";

import React from "react";
import Image from "next/image";

interface PrivateDetailsIncludesProps {
  includes?: string[];
  excludes?: string[];
}

export function PrivateDetailsIncludes({
  includes = [
    "Hotel pickup and drop-off",
    "All transfers are provided by air-conditioned vehicles.",
    "Egyptologist guide available in English, French, German, and Russian.",
    "Entrance tickets to all places and activities included in the program.",
    "Lunch during the tour at a local restaurant (open buffet – drinks are paid separately).",
  ],
  excludes,
}: PrivateDetailsIncludesProps) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch font-poppins">
      {/* ─── PRICE INCLUDES CARD ─── */}
      <div
        className="w-full bg-white rounded-2xl p-6 sm:p-7 flex flex-col"
        style={{
          border: "0.8px solid #BBBBBB",
          boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-[#E5E5E5]">
          <div className="relative w-6 h-6 shrink-0">
            <Image
              src="/PrivateExcursions/Privatedetails/Vector.svg"
              alt="Included checkmark"
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-[20px] sm:text-[22px] font-bold text-[#DE7423]">
            Price Includes
          </h3>
        </div>

        {/* Bullets List */}
        <ul className="mt-5 space-y-3.5 flex-1">
          {includes.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-[14px] sm:text-[15px] text-[#000000] leading-[1.6]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-2" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ─── PRICE EXCLUDES CARD ─── */}
      <div
        className="w-full bg-white rounded-2xl p-6 sm:p-7 flex flex-col"
        style={{
          border: "0.8px solid #BBBBBB",
          boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-[#E5E5E5]">
          <div className="relative w-6 h-6 shrink-0">
            <Image
              src="/PrivateExcursions/Privatedetails/Vector (1).svg"
              alt="Excluded cross icon"
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-[20px] sm:text-[22px] font-bold text-[#DE7423]">
            Price Excludes
          </h3>
        </div>

        {/* Bullets List */}
        <ul className="mt-5 space-y-3.5 flex-1">
          {excludes && excludes.length > 0 ? (
            excludes.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-[14px] sm:text-[15px] text-[#000000] leading-[1.6]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-2" />
                <span>{item}</span>
              </li>
            ))
          ) : (
            <>
              {/* Round trip transfers */}
              <li className="text-[14px] sm:text-[15px] text-[#000000] leading-[1.6]">
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-2" />
                  <span className="font-bold text-[#000000]">Round trip transfer:</span>
                </div>
                <ul className="pl-6 mt-1.5 space-y-1 text-[13.5px] sm:text-[14px] text-[#222222]">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-gray-600 shrink-0 mt-2" />
                    <span>From Safaga and Soma Bay with an extra charge of $10 per person (minimum 2 persons).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-gray-600 shrink-0 mt-2" />
                    <span>From Makadi Bay, Sahl Hasheesh, and El Gouna with an extra charge of $5 per person (minimum 2 persons).</span>
                  </li>
                </ul>
              </li>

          {/* Entrance inside pyramids */}
          <li className="text-[14px] sm:text-[15px] text-[#000000] leading-[1.6]">
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-2" />
              <span className="font-bold text-[#000000]">Entrance inside the Pyramids:</span>
            </div>
            <ul className="pl-6 mt-1.5 space-y-1 text-[13.5px] sm:text-[14px] text-[#222222]">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-gray-600 shrink-0 mt-2" />
                <span>Khufu Pyramid – $20</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-gray-600 shrink-0 mt-2" />
                <span>Khafre Pyramid – $6</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-gray-600 shrink-0 mt-2" />
                <span>Menkaure Pyramid – $6</span>
              </li>
            </ul>
          </li>

          {/* Other excluded items */}
          <li className="flex items-start gap-3 text-[14px] sm:text-[15px] text-[#000000] leading-[1.6]">
            <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-2" />
            <span>Camel and horse riding at the Pyramids (optional).</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] sm:text-[15px] text-[#000000] leading-[1.6]">
            <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-2" />
            <span>Entrance tickets to any other places not included in the program.</span>
          </li>
          <li className="flex items-start gap-3 text-[14px] sm:text-[15px] text-[#000000] leading-[1.6]">
            <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-2" />
            <span>Hot & cold beverages, tips, and personal expenses are not included.</span>
          </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
