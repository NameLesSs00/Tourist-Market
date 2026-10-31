import React from "react";
import { TransferTripType } from "@/models/transferBooking";

interface TransferSummaryCardProps {
  vehicleType: string;
  totalPrice: number;
  tripType: TransferTripType;
  isSubmitting?: boolean;
  onSubmit: () => void;
}

export function TransferSummaryCard({
  vehicleType,
  totalPrice,
  tripType,
  isSubmitting = false,
  onSubmit,
}: TransferSummaryCardProps) {
  const isRoundTrip = tripType === TransferTripType.RoundTrip;
  const formattedPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div className="space-y-6 font-poppins">
      {/* Booking Summary Box */}
      <div className="bg-[#0E4A68] rounded-[12.57px] border-[0.52px] border-[#888888] p-5 sm:p-6 text-white shadow-sm space-y-3.5">
        <h2 className="text-base sm:text-lg font-bold text-white">
          Booking Summary
        </h2>

        {/* Vehicle Type Row */}
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="text-gray-200">Vehicle Type:</span>
          <span className="font-bold text-white">{vehicleType || "Car"}</span>
        </div>

        {/* Total Price Row */}
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="text-gray-200">Total Price:</span>
          <span className="font-bold text-[#F0C060] text-base sm:text-lg">
            {formattedPrice}
          </span>
        </div>

        {/* Inner Offer Banner */}
        <div className="bg-[#12647C] rounded-[6.29px] p-3 text-center text-xs sm:text-sm font-medium text-white shadow-xs">
          {isRoundTrip
            ? "Save 25% when choosing Round Trip + 3 hours free waiting"
            : "Save 10% when choosing Round Trip + 3 hours free waiting"}
        </div>
      </div>

      {/* Submit Booking Button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="bg-[#0E4A68] hover:bg-[#0c405b] active:scale-[0.99] text-[#FFFFFF] font-semibold text-sm sm:text-base px-10 sm:px-14 py-3 rounded-[8.38px] shadow-[0px_2.1px_8.38px_0px_#00000033] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              <span>Submitting Booking...</span>
            </>
          ) : (
            <span>Submit Booking</span>
          )}
        </button>
      </div>
    </div>
  );
}
