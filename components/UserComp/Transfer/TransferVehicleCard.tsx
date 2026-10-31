import React from "react";
import Image from "next/image";
import { TransferTripType } from "@/models/transferBooking";

interface TransferVehicleCardProps {
  vehicleType: string;
  adults: number;
  childrenCount: number;
  fromName: string;
  toName: string;
  tripType: TransferTripType;
  price: number;
  basePrice?: number;
  discount?: number;
  isLoading?: boolean;
}

export function TransferVehicleCard({
  vehicleType,
  adults,
  childrenCount,
  fromName,
  toName,
  tripType,
  price,
  basePrice,
  discount,
  isLoading = false,
}: TransferVehicleCardProps) {
  const totalPax = adults + childrenCount;
  const isRoundTrip = tripType === TransferTripType.RoundTrip;

  // Formatted price strings
  const formattedPrice = `$${price.toFixed(2)}`;
  const displayBasePrice = basePrice ?? (isRoundTrip ? Math.round(price * 1.1) : price);
  const displayDiscount = discount ?? (isRoundTrip ? displayBasePrice - price : 0);

  return (
    <div className="bg-[#EBF5FA] rounded-[8.74px] border border-[#0E4A68] shadow-[0px_5px_20px_3px_#0E4A6866] p-5 space-y-4 font-poppins">
      {/* Top Row: Vehicle name, auto-assigned description & Price */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Left: Car icon & details */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-6 h-4 shrink-0 flex items-center justify-center">
            <Image
              src="/transfer/Vector.svg"
              alt="Vehicle"
              width={26}
              height={15}
              className="object-contain"
            />
          </div>
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-base font-bold text-[#0E4A68]">
              {vehicleType || "Car"}
            </span>
            <span className="text-xs text-[#0E4A6880]">
              Auto-assigned vehicle for {adults} {adults === 1 ? "adult" : "adults"} · {childrenCount} {childrenCount === 1 ? "child" : "children"}
            </span>
          </div>
        </div>

        {/* Right: Price label and amount */}
        <div className="text-left sm:text-right">
          <div className="text-xs text-[#0E4A6880]">
            Price — {isRoundTrip ? "Round Trip" : "One Way"}
          </div>
          <div className="text-2xl font-bold text-[#0E4A68]">
            {isLoading ? (
              <span className="inline-block animate-pulse text-base font-medium">Calculating...</span>
            ) : (
              formattedPrice
            )}
          </div>
        </div>
      </div>

      {/* Bottom Info: Route & People count, plus round-trip breakdown */}
      <div className="text-xs space-y-1 pt-1 border-t border-[#00000015]">
        <div className="font-semibold text-[#0E4A68]">
          From: {fromName || "Select Pickup"} → To: {toName || "Select Destination"}
        </div>
        <div className="text-[#0E4A6880]">
          Number of people: {totalPax}
        </div>
        {isRoundTrip && (
          <div className="space-y-0.5 pt-0.5">
            <div className="text-[#0E4A6880]">
              Base Price: {displayBasePrice}$
            </div>
            {displayDiscount > 0 && (
              <div className="text-[#0E4A68] font-medium">
                Round Trip Discount: -{displayDiscount}$
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
