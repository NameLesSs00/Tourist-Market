"use client";

import React from "react";
import { FiDollarSign } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { PrivatePaymentMethod } from "@/models/privateBooking";

interface BookingPaymentSelectorProps {
  paymentMethod: number;
  onPaymentMethodChange: (val: number) => void;
}

export function BookingPaymentSelector({
  paymentMethod,
  onPaymentMethodChange,
}: BookingPaymentSelectorProps) {
  const options = [
    {
      id: PrivatePaymentMethod.CashOnArrival,
      title: "Cash on Arrival",
      desc: "Pay cash directly to your tour guide or driver on trip day",
      icon: <FiDollarSign size={18} className="text-[#DE7423] shrink-0" />,
    },
    {
      id: PrivatePaymentMethod.WhatsAppDirect,
      title: "WhatsApp Direct",
      desc: "Coordinate payment and trip confirmation directly with our team on WhatsApp",
      icon: <FaWhatsapp size={18} className="text-[#16A34A] shrink-0" />,
    },
  ];

  return (
    <div className="space-y-4 pt-4 border-t border-[#E5E5E5]">
      <h3 className="text-sm sm:text-base font-bold text-[#0E4A68] flex items-center gap-2">
        <FiDollarSign className="text-[#DE7423]" />
        <span>4. Payment Method</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => {
          const isSelected = paymentMethod === opt.id;
          return (
            <label
              key={opt.id}
              onClick={() => onPaymentMethodChange(opt.id)}
              className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2 cursor-pointer transition ${
                isSelected
                  ? "border-[#DE7423] bg-[#FFF8ED] shadow-xs"
                  : "border-[#E5E5E5] bg-white hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start gap-2.5">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={opt.id}
                  checked={isSelected}
                  onChange={() => onPaymentMethodChange(opt.id)}
                  className="mt-0.5 text-[#DE7423] focus:ring-[#DE7423]"
                />
                <div className="space-y-0.5">
                  <div className="text-xs sm:text-sm font-bold text-[#0E4A68] flex items-center gap-1.5">
                    {opt.icon}
                    <span>{opt.title}</span>
                  </div>
                  <p className="text-[11px] text-[#444444] leading-relaxed">
                    {opt.desc}
                  </p>
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}

