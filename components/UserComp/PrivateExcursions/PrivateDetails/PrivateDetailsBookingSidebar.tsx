"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FiCalendar,
  FiClock,
  FiHeadphones,
  FiChevronRight,
  FiMinus,
  FiPlus,
} from "react-icons/fi";
import { FaWhatsapp, FaTelegramPlane, FaViber } from "react-icons/fa";
import { PrivateAttraction, PrivateExtraService, VehicleOption } from "../types";

interface PrivateDetailsBookingSidebarProps {
  selectedAttractions: PrivateAttraction[];
  selectedExtraServices: PrivateExtraService[];
  vehicles?: VehicleOption[];
  duration?: string;
  maxParticipants?: string;
}

export function PrivateDetailsBookingSidebar({
  selectedAttractions = [],
  selectedExtraServices = [],
  vehicles = [
    { id: "car", name: "Car", capacityText: "1-3 Passengers", price: 250 },
    { id: "microbus", name: "Microbus", capacityText: "4-9 Passengers", price: 320 },
    { id: "minibus", name: "Minibus", capacityText: "10-16 Passengers", price: 450 },
    { id: "bus", name: "Bus", capacityText: "17-35 Passengers", price: 650 },
  ],
  duration = "20 Hours",
  maxParticipants = "35 Person",
}: PrivateDetailsBookingSidebarProps) {
  const [bookingDate, setBookingDate] = useState<string>("");
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);

  const totalPassengers = adults + children + infants;

  // Determine vehicle based on total passengers
  const getVehicleInfo = (count: number) => {
    if (count <= 3) {
      const v = vehicles.find((x) => x.id === "car") || vehicles[0];
      return {
        type: "Car",
        capacityText: "1-2 Passengers",
        price: v?.price ?? 250,
        icon: "/PrivateExcursions/Privatedetails/Car.svg",
      };
    } else if (count <= 9) {
      const v = vehicles.find((x) => x.id === "microbus") || vehicles[1];
      return {
        type: "Microbus",
        capacityText: "4-9 Passengers",
        price: v?.price ?? 320,
        icon: "/PrivateExcursions/Privatedetails/Microbus.svg",
      };
    } else if (count <= 16) {
      const v = vehicles.find((x) => x.id === "minibus") || vehicles[2];
      return {
        type: "Minibus",
        capacityText: "10-16 Passengers",
        price: v?.price ?? 450,
        icon: "/PrivateExcursions/Privatedetails/Minibus.svg",
      };
    } else {
      const v = vehicles.find((x) => x.id === "bus") || vehicles[3];
      return {
        type: "Bus",
        capacityText: "17-35 Passengers",
        price: v?.price ?? 650,
        icon: "/PrivateExcursions/Privatedetails/Bus.svg",
      };
    }
  };

  const currentVehicle = getVehicleInfo(totalPassengers);

  // Price calculations
  const attractionsTotal = selectedAttractions.reduce(
    (acc, att) => acc + att.adultPrice * adults + att.childPrice * children + att.infantPrice * infants,
    0
  );

  const extrasTotal = selectedExtraServices.reduce(
    (acc, ext) => acc + ext.adultPrice * adults + ext.childPrice * children + ext.infantPrice * infants,
    0
  );

  const vehicleTotal = currentVehicle.price;
  const totalPrice = attractionsTotal + extrasTotal + vehicleTotal;

  return (
    <aside className="w-full flex flex-col gap-6 font-poppins sticky top-28">
      {/* ─── BOOKING CARD ─── */}
      <div
        className="w-full bg-white overflow-hidden"
        style={{
          border: "0.5px solid #888888",
          borderRadius: "10px",
          boxShadow: "0px 2px 14px 0px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Header */}
        <div className="bg-[#DE7423] px-5 py-3.5 flex items-center gap-3 text-white">
          <div className="relative w-5 h-5 shrink-0">
            <Image
              src="/PrivateExcursions/Privatedetails/Vector (3).svg"
              alt="Calendar"
              fill
              className="object-contain brightness-0 invert"
            />
          </div>
          <h2 className="text-[17px] sm:text-[18px] font-bold tracking-wide">
            Book This Excursion
          </h2>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-5">
          {/* Booking Date */}
          <div>
            <label className="block text-[14px] font-semibold text-[#083952] mb-1.5">
              Booking Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                placeholder="mm/dd/yy"
                className="w-full px-4 py-2.5 rounded-lg border border-[#BBBBBB] text-[14px] text-[#083952] focus:outline-none focus:border-[#DE7423] bg-white cursor-pointer"
              />
            </div>
          </div>

          {/* Passenger Steppers */}
          <div className="grid grid-cols-3 gap-2.5">
            {/* Adult */}
            <div
              className="flex flex-col items-center p-2.5 rounded-lg bg-white"
              style={{ border: "0.8px solid #CCCCCC" }}
            >
              <div className="w-5 h-5 mb-1 flex items-center justify-center text-[#DE7423]">
                <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
                  <path
                    d="M7 0C8.65685 0 10 1.34315 10 3C10 4.65685 8.65685 6 7 6C5.34315 6 4 4.65685 4 3C4 1.34315 5.34315 0 7 0ZM7 8C10.866 8 14 9.567 14 12V18H0V12C0 9.567 3.13401 8 7 8Z"
                    fill="#DE7423"
                  />
                </svg>
              </div>
              <span className="text-[13px] font-semibold text-[#0E4A68]">
                Adult
              </span>
              <div className="flex items-center gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                  className="w-6 h-6 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition-colors"
                >
                  <FiMinus size={12} />
                </button>
                <span className="text-[14px] font-bold text-[#083952] min-w-[16px] text-center">
                  {adults}
                </span>
                <button
                  type="button"
                  onClick={() => setAdults((prev) => prev + 1)}
                  className="w-6 h-6 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition-colors"
                >
                  <FiPlus size={12} />
                </button>
              </div>
            </div>

            {/* Child */}
            <div
              className="flex flex-col items-center p-2.5 rounded-lg bg-white"
              style={{ border: "0.8px solid #CCCCCC" }}
            >
              <div className="w-5 h-5 mb-1 flex items-center justify-center text-[#DE7423]">
                <svg width="12" height="15" viewBox="0 0 14 18" fill="none">
                  <path
                    d="M7 0C8.65685 0 10 1.34315 10 3C10 4.65685 8.65685 6 7 6C5.34315 6 4 4.65685 4 3C4 1.34315 5.34315 0 7 0ZM7 8C10.866 8 14 9.567 14 12V18H0V12C0 9.567 3.13401 8 7 8Z"
                    fill="#DE7423"
                  />
                </svg>
              </div>
              <span className="text-[13px] font-semibold text-[#0E4A68]">
                Child
              </span>
              <div className="flex items-center gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                  className="w-6 h-6 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition-colors"
                >
                  <FiMinus size={12} />
                </button>
                <span className="text-[14px] font-bold text-[#083952] min-w-[16px] text-center">
                  {children}
                </span>
                <button
                  type="button"
                  onClick={() => setChildren((prev) => prev + 1)}
                  className="w-6 h-6 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition-colors"
                >
                  <FiPlus size={12} />
                </button>
              </div>
            </div>

            {/* Infant */}
            <div
              className="flex flex-col items-center p-2.5 rounded-lg bg-white"
              style={{ border: "0.8px solid #CCCCCC" }}
            >
              <div className="w-5 h-5 mb-1 flex items-center justify-center text-[#DE7423]">
                <svg width="10" height="13" viewBox="0 0 14 18" fill="none">
                  <path
                    d="M7 0C8.65685 0 10 1.34315 10 3C10 4.65685 8.65685 6 7 6C5.34315 6 4 4.65685 4 3C4 1.34315 5.34315 0 7 0ZM7 8C10.866 8 14 9.567 14 12V18H0V12C0 9.567 3.13401 8 7 8Z"
                    fill="#DE7423"
                  />
                </svg>
              </div>
              <span className="text-[13px] font-semibold text-[#0E4A68]">
                Infant
              </span>
              <div className="flex items-center gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setInfants((prev) => Math.max(0, prev - 1))}
                  className="w-6 h-6 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition-colors"
                >
                  <FiMinus size={12} />
                </button>
                <span className="text-[14px] font-bold text-[#083952] min-w-[16px] text-center">
                  {infants}
                </span>
                <button
                  type="button"
                  onClick={() => setInfants((prev) => prev + 1)}
                  className="w-6 h-6 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition-colors"
                >
                  <FiPlus size={12} />
                </button>
              </div>
            </div>
          </div>

          {/* Vehicle Type Row */}
          <div>
            <label className="block text-[14px] font-semibold text-[#083952] mb-1.5">
              Vehicle Type
            </label>
            <div
              className="flex items-center justify-between px-4 py-3 rounded-lg bg-white"
              style={{ border: "0.8px solid #BBBBBB" }}
            >
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-7 shrink-0">
                  <Image
                    src={currentVehicle.icon}
                    alt={currentVehicle.type}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-[14px] font-semibold text-[#0E4A68]">
                  {currentVehicle.type} ({currentVehicle.capacityText})
                </span>
              </div>
              <span className="text-[16px] font-bold text-[#DE7423]">
                {currentVehicle.price} $
              </span>
            </div>
          </div>

          {/* Price Summary Breakdown */}
          <div className="space-y-3 pt-1">
            <h3 className="text-[14px] font-bold text-[#083952]">
              Price Summary
            </h3>

            {/* Attractions Breakdown Box */}
            <div
              className="p-3 rounded-lg bg-white space-y-2"
              style={{ border: "0.6px solid #DE7423" }}
            >
              <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#0E4A68]">
                <svg className="w-4 h-4 text-[#DE7423]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <span>Attractions :</span>
              </div>
              {selectedAttractions.length === 0 ? (
                <p className="text-[12px] text-gray-500 italic pl-5">
                  No attractions selected
                </p>
              ) : (
                <div className="pl-5 space-y-1">
                  {selectedAttractions.map((att) => {
                    const sub =
                      att.adultPrice * adults +
                      att.childPrice * children +
                      att.infantPrice * infants;
                    return (
                      <div
                        key={att.id}
                        className="flex items-center justify-between text-[12px] text-[#444444]"
                      >
                        <span className="truncate pr-2 font-medium">
                          {att.title}
                        </span>
                        <span className="shrink-0 font-bold text-[#DE7423]">
                          {sub} $
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="border-t border-gray-100 pt-1.5 flex items-center justify-between text-[13px] font-bold text-[#DE7423]">
                <span>Attractions Total :</span>
                <span>{attractionsTotal} $</span>
              </div>
            </div>

            {/* Extra Services Breakdown Box */}
            <div
              className="p-3 rounded-lg bg-white space-y-2"
              style={{ border: "0.6px solid #DE7423" }}
            >
              <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#0E4A68]">
                <span>⊕</span>
                <span>Extra Services :</span>
              </div>
              {selectedExtraServices.length === 0 ? (
                <p className="text-[12px] text-gray-500 italic pl-5">
                  No extra services selected
                </p>
              ) : (
                <div className="pl-5 space-y-1">
                  {selectedExtraServices.map((ext) => {
                    const sub =
                      ext.adultPrice * adults +
                      ext.childPrice * children +
                      ext.infantPrice * infants;
                    return (
                      <div
                        key={ext.id}
                        className="flex items-center justify-between text-[12px] text-[#444444]"
                      >
                        <span className="truncate pr-2 font-medium">
                          {ext.title}
                        </span>
                        <span className="shrink-0 font-bold text-[#DE7423]">
                          {sub} $
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="border-t border-gray-100 pt-1.5 flex items-center justify-between text-[13px] font-bold text-[#DE7423]">
                <span>Extras Total :</span>
                <span>{extrasTotal} $</span>
              </div>
            </div>

            {/* Vehicle Breakdown Box */}
            <div
              className="p-3 rounded-lg bg-white space-y-2"
              style={{ border: "0.6px solid #DE7423" }}
            >
              <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#0E4A68]">
                <svg className="w-4 h-4 text-[#DE7423]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 17h8M5 11l2-5h10l2 5M3 13v6h2v-2h14v2h2v-6l-2-2H5l-2 2z" />
                  <circle cx="7.5" cy="14.5" r="1.5" />
                  <circle cx="16.5" cy="14.5" r="1.5" />
                </svg>
                <span>Vehicle :</span>
              </div>
              <div className="pl-5 flex items-center justify-between text-[12px] text-[#444444]">
                <span>
                  {currentVehicle.type} ({currentVehicle.capacityText})
                </span>
                <span className="font-bold text-[#DE7423]">
                  {vehicleTotal} $
                </span>
              </div>
              <div className="border-t border-gray-100 pt-1.5 flex items-center justify-between text-[13px] font-bold text-[#DE7423]">
                <span>Vehicle Total :</span>
                <span>{vehicleTotal} $</span>
              </div>
            </div>

            {/* Total Price Row */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-[20px] sm:text-[22px] font-bold text-[#083952]">
                Total Price:
              </span>
              <span className="text-[26px] sm:text-[28px] font-extrabold text-[#DE7423]">
                {totalPrice} $
              </span>
            </div>
          </div>

          {/* 3 Circular Badges Row */}
          <div className="pt-3 border-t border-gray-100 grid grid-cols-3 gap-2 text-center">
            {/* Max Participants */}
            <div className="flex flex-col items-center">
              <div className="relative w-10 h-10 mb-1">
                <Image
                  src="/PrivateExcursions/Privatedetails/Frame 585.svg"
                  alt="Participants"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[12px] font-semibold text-[#666666]">
                {maxParticipants}
              </span>
            </div>

            {/* Date Type */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#DE7423] flex items-center justify-center text-white mb-1">
                <FiCalendar size={18} />
              </div>
              <span className="text-[12px] font-semibold text-[#666666]">
                Flexible
              </span>
            </div>

            {/* Duration */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#DE7423] flex items-center justify-center text-white mb-1">
                <FiClock size={18} />
              </div>
              <span className="text-[12px] font-semibold text-[#666666]">
                {duration}
              </span>
            </div>
          </div>

          {/* Book Now Button */}
          <button
            type="button"
            className="w-full py-3.5 px-4 text-center text-white font-bold text-[16px] transition-all hover:bg-[#C9641B] active:scale-[0.99] shadow cursor-pointer"
            style={{
              background: "#DE7423",
              border: "0.25px solid rgba(136, 136, 136, 0.8)",
              borderRadius: "10px",
            }}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* ─── NEED HELP CARD ─── */}
      <div
        className="w-full bg-white p-5 rounded-xl space-y-4"
        style={{
          border: "0.8px solid #BBBBBB",
          boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#124885]">
              <FiHeadphones size={20} />
            </div>
            <div>
              <h4 className="text-[16px] font-bold text-[#124885] leading-snug">
                Need Help ?
              </h4>
              <p className="text-[12px] font-medium text-[#083043]">
                contact us for Help ?
              </p>
            </div>
          </div>
          <FiChevronRight size={20} className="text-gray-400" />
        </div>

        {/* 3 Buttons: WhatsApp, Telegram, Viber */}
        <div className="space-y-2.5">
          {/* WhatsApp */}
          <a
            href="https://wa.me/201012345678"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-lg flex items-center justify-center gap-2.5 text-white font-semibold text-[14px] hover:opacity-95 transition-opacity"
            style={{ backgroundColor: "#17DB55" }}
          >
            <FaWhatsapp size={18} />
            <span>WhatsApp</span>
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/egypttouristmarket"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-lg flex items-center justify-center gap-2.5 text-white font-semibold text-[14px] hover:opacity-95 transition-opacity"
            style={{ backgroundColor: "#0E4A68" }}
          >
            <FaTelegramPlane size={18} />
            <span>Telegram</span>
          </a>

          {/* Viber */}
          <a
            href="viber://chat?number=201012345678"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-lg flex items-center justify-center gap-2.5 font-semibold text-[14px] text-[#333333] hover:bg-gray-200 transition-colors"
            style={{ backgroundColor: "#F4F4F4" }}
          >
            <FaViber size={18} className="text-[#7360F2]" />
            <span>Viber</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
