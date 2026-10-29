import React from "react";
import Image from "next/image";

export function TransferHero() {
  return (
    <div className="w-full max-w-[1200px] mx-auto">
      {/* Curved Hero Image */}
      <div className="relative w-full h-[240px] sm:h-[340px] md:h-[420px] lg:h-[488px] rounded-[8px] md:rounded-[8px] overflow-hidden shadow-sm">
        <Image
          src="/transfer/hero-image.png"
          alt="Transfer Services"
          fill
          priority
          sizes="(max-width: 1400px) 100vw, 1200px"
          className="object-cover object-center"
        />
      </div>

      {/* Hero Header Titles */}
      <div className="text-center mt-6 md:mt-8 space-y-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0E4A68] tracking-tight font-poppins">
          Transfer Services
        </h1>
        <p className="text-sm sm:text-base md:text-lg font-semibold text-[#52646B] font-poppins">
          Comfortable &amp; Reliable Airport Transfers in Hurghada
        </p>
        <p className="text-xs sm:text-sm text-[#52646B] max-w-2xl mx-auto leading-relaxed font-poppins">
          Professional door-to-door transfer service between Hurghada Airport and hotels across
          the Red Sea Riviera. Book your ride in advance and travel stress-free.
        </p>
      </div>
    </div>
  );
}
