"use client";

import React from "react";
import { FiDollarSign } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { GroupPaymentMethod } from "@/models/groupBooking";

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
      id: GroupPaymentMethod.CashOnArrival,
      title: "Cash on Arrival",
      desc: "Pay cash directly to your tour guide on trip day",
      icon: <FiDollarSign size={18} className="text-[#0E4A68] shrink-0" />,
    },
    {
      id: GroupPaymentMethod.WhatsAppDirect,
      title: "WhatsApp Direct",
      desc: "Coordinate payment details directly with our team on WhatsApp",
      icon: <FaWhatsapp size={18} className="text-[#16A34A] shrink-0" />,
    },
  ];

  return (
    <div className="space-y-4 pt-4 border-t border-[#E5E5E5]">
      <h3 className="text-sm sm:text-base font-bold text-[#0E4A68] flex items-center gap-2">
        <FiDollarSign className="text-[#0E4A68]" />
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
                  ? "border-[#0E4A68] bg-[#FFF8ED] shadow-xs"
                  : "border-[#E5E5E5] bg-white hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {opt.icon}
                  <span className="font-bold text-xs sm:text-sm text-[#0E4A68]">
                    {opt.title}
                  </span>
                </div>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={opt.id}
                  checked={isSelected}
                  onChange={() => onPaymentMethodChange(opt.id)}
                  className="accent-[#0E4A68] cursor-pointer"
                />
              </div>
              <p className="text-[11px] text-[#646464] leading-relaxed">
                {opt.desc}
              </p>
            </label>
          );
        })}
      </div>
    </div>
  );
}
