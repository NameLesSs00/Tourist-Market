import React from "react";
import Image from "next/image";
import { TransferTripType } from "@/models/transferBooking";

interface TransferDiscountBannerProps {
  tripType: TransferTripType;
  onSelectRoundTrip?: () => void;
}

export function TransferDiscountBanner({
  tripType,
  onSelectRoundTrip,
}: TransferDiscountBannerProps) {
  if (tripType === TransferTripType.RoundTrip) {
    return (
      <div className="bg-[#FFFFFF] rounded-[8.38px] border-[0.52px] border-[#888888] shadow-[0px_1.05px_8.38px_1.05px_rgba(0,0,0,0.2)] p-5 md:p-6 space-y-4 font-poppins">
        <h2 className="text-base sm:text-lg font-bold text-[#0E4A68]">
          Waiting Information
        </h2>
        {/* • 3 hours free waiting box */}
        <div className="relative overflow-hidden bg-[#D9F0FC] border-[0.42px] border-[#00000066] rounded-[5.24px] flex items-center min-h-[52px]">
          {/* Leftside accent bar */}
          <div className="w-[8px] self-stretch bg-[#0E4A68] border-r-[0.42px] border-[#00000066] rounded-tl-[5px] rounded-bl-[5px] shrink-0" />
          <div className="py-2.5 px-3.5 flex items-center gap-2.5 text-sm sm:text-base font-medium text-[#206F97]">
            <Image
              src="/transfer/basil_present-solid.svg"
              alt="Free waiting"
              width={22}
              height={22}
              className="object-contain shrink-0"
            />
            <span>• 3 hours free waiting</span>
          </div>
        </div>
        <h2 className="text-base sm:text-lg font-medium text-[#0E4A68]">
           • Additional hour: $ 5/hour
        </h2>
      </div>
    );
  }

  return (
    <div
      onClick={onSelectRoundTrip}
      className="bg-[#0E4A68] rounded-[8.74px] p-6 text-center text-[#FFFFFF] font-semibold flex flex-col items-center justify-center gap-3.5 shadow-[0px_8.74px_21.84px_0px_#0000004D] cursor-pointer hover:bg-[#0c405b] transition font-poppins"
    >
      {/* Lightbulb Icon */}
      <div className="relative w-8 h-10 flex items-center justify-center">
        <Image
          src="/transfer/Frame 653.svg"
          alt="Offer"
          width={32}
          height={42}
          className="object-contain"
        />
      </div>

      {/* Offer Message with Yellow Tag Icon */}
      <div className="flex items-center justify-center gap-2.5">
        <div className="relative w-5 h-5 shrink-0 flex items-center justify-center">
          <Image
            src="/transfer/Vector (1).svg"
            alt="Discount"
            width={20}
            height={20}
            className="object-contain"
          />
        </div>
        <span className="text-base sm:text-lg font-semibold tracking-wide text-white">
          Save 10% when choosing Round Trip + 3 hours waiting
        </span>
      </div>
    </div>
  );
}
