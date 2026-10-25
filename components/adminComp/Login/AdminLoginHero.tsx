"use client";

import React from "react";
import Image from "next/image";

export function AdminLoginHero() {
  return (
    <div className="relative hidden lg:flex lg:w-1/2 xl:w-7/12 min-h-screen flex-col justify-between p-12 xl:p-16 overflow-hidden select-none">
      {/* 1. Full-Bleed Background Pyramids Image */}
      <Image
        src="/admin/login/adminLogin.png"
        alt="Pyramids of Giza at Sunset"
        fill
        priority
        className="object-cover object-center"
      />

      {/* 2. Visual Filter & Dark Brand Overlay so overlaid text is crisp & readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#041a28]/95 via-[#083952]/75 to-[#000000]/50 backdrop-blur-[1.5px]" />

      {/* 3. Top Branding: Logo */}
      <div className="relative z-10 flex items-center gap-4">
        <Image
          src="/shared/LogoFooter.svg"
          alt="Egypt Tourist Market"
          width={180}
          height={65}
          priority
          className="h-14 w-auto object-contain drop-shadow-md brightness-110"
        />
        <div className="h-8 w-[1px] bg-white/20" />
        <span className="text-white/80 font-['Poppins'] text-sm tracking-wider uppercase font-medium">
          Admin Portal
        </span>
      </div>

      {/* 4. Bottom Hero Copy & Value Badges */}
      <div className="relative z-10 max-w-xl space-y-6">
        <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-md border border-white/15">
          <span className="font-['Poppins'] text-xs font-medium tracking-wide text-white/90">
            Control Center & Platform Management
          </span>
        </div>

        <h1 className="font-['Montserrat'] text-4xl xl:text-5xl font-bold tracking-tight text-white leading-[115%]">
          Empowering Egypt&apos;s Premier Tourism Market
        </h1>

        <p className="font-['Poppins'] text-base xl:text-lg text-white/80 leading-relaxed font-light">
          Manage services, hotel deliveries, blogs, transactions, and platform operations seamlessly from a secure, unified dashboard.
        </p>

        {/* Feature Badges */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/15">
          <div>
            <div className="text-xl font-bold text-[#D48C28] font-['Montserrat']">
              24/7
            </div>
            <div className="text-xs text-white/70 font-['Poppins']">
              System Availability
            </div>
          </div>
          <div>
            <div className="text-xl font-bold text-[#D48C28] font-['Montserrat']">
              100%
            </div>
            <div className="text-xs text-white/70 font-['Poppins']">
              Verified Operations
            </div>
          </div>
          <div>
            <div className="text-xl font-bold text-[#D48C28] font-['Montserrat']">
              Encrypted
            </div>
            <div className="text-xs text-white/70 font-['Poppins']">
              End-to-End Auth
            </div>
          </div>
        </div>
      </div>

      {/* 5. Bottom Copyright Notice */}
      <div className="relative z-10 flex flex-wrap items-center gap-1.5 text-xs text-white/60 font-['Poppins']">
        <span>© 2026 Egypt Tourist Market. All rights reserved.</span>
        <span>·</span>
        <span>
          Powered by{" "}
          <a
            href="https://tech-gear.net/en"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#D48C28] hover:underline transition-colors"
          >
            Tech Gear Solutions
          </a>
        </span>
      </div>
    </div>
  );
}

export default AdminLoginHero;
