"use client";

import React from "react";
import Image from "next/image";

export function ContactMapSection() {
  return (
    <div
      className="w-full rounded-[20px] p-6 sm:p-8 lg:p-10"
      style={{
        backgroundColor: "#FFFEF5",
        border: "0.5px solid #888888",
        boxShadow: "0px 1px 8px 2px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Header with Map Pin Icon */}
      <div className="flex items-center gap-3.5 mb-6 sm:mb-8">
        <div className="shrink-0">
          <Image
            src="/contact/Vector (1).svg"
            alt="Map Pin"
            width={26}
            height={34}
            className="w-6 sm:w-7 h-auto object-contain"
          />
        </div>
        <h2 className="font-['Poppins'] text-2xl sm:text-[28px] font-bold text-[#0E4A68] leading-tight">
          Find Us on the Map
        </h2>
      </div>

      {/* Grid: Map on Left, Destination Beach Photo on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left Column: Hurghada / El Kawther Map */}
        <div className="relative w-full h-[280px] sm:h-[340px] lg:h-[380px] rounded-[18px] overflow-hidden border border-[#D1D5DB] shadow-inner bg-[#E5E3DF]">
          <iframe
            title="Location Map - El Kawther, Hurghada, Egypt"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56965.132896590214!2d33.77884218731175!3d27.20037136017845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145287e029199d79%3A0x6a053c8477ffdfc3!2sEl%20Kawther%2C%20Hurghada%2C%20Red%20Sea%20Governorate%2C%20Egypt!5e0!3m2!1sen!2seg!4v1710000000000!5m2!1sen!2seg"
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Right Column: Resort & Coastal Scenery Photo */}
        <div className="relative w-full h-[280px] sm:h-[340px] lg:h-[380px] rounded-[18px] overflow-hidden shadow-inner">
          <Image
            src="/contact/92c63fb4ec109bf6958da7955414959b315fc292.jpg"
            alt="Hurghada Egypt Coastal Resort"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}

export default ContactMapSection;
