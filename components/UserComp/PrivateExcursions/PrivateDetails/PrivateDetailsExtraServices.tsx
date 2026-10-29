"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiPlusCircle, FiCheck } from "react-icons/fi";
import { PrivateExtraService } from "../types";
import { PRIVATE_EXCURSION_FALLBACK_IMAGE } from "../utils/privateExcursionAdapter";

interface PrivateDetailsExtraServicesProps {
  services: PrivateExtraService[];
  selectedIds: string[];
  onToggleSelect: (serviceId: string) => void;
}

interface ExtraServiceCardProps {
  service: PrivateExtraService;
  isSelected: boolean;
  onToggle: () => void;
}

function ExtraServiceCard({ service, isSelected, onToggle }: ExtraServiceCardProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const images = service.images && service.images.length > 0
    ? service.images
    : [PRIVATE_EXCURSION_FALLBACK_IMAGE];

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className={`w-full bg-white p-5 transition-all duration-200 ${
        isSelected ? "ring-2 ring-[#DE7423]" : ""
      }`}
      style={{
        borderRadius: "14px",
        border: "0.6px solid #DE7423",
        boxShadow: "0px 1px 10px 1px rgba(0, 0, 0, 0.25)",
      }}
    >
      {/* Top Checkbox & Title Row */}
      <div
        onClick={onToggle}
        className="flex items-center gap-3.5 mb-4 cursor-pointer select-none group"
      >
        {/* Custom Square Checkbox */}
        <div
          className={`w-[26px] h-[26px] rounded-[4px] flex items-center justify-center transition-all ${
            isSelected
              ? "bg-[#DE7423] border-[#DE7423] text-white"
              : "border border-[#888888] bg-white group-hover:border-[#DE7423]"
          }`}
        >
          {isSelected && <FiCheck size={18} className="stroke-[3]" />}
        </div>

        <h3 className="text-[17px] sm:text-[19px] font-bold text-[#DE7423] tracking-wide uppercase font-poppins">
          {service.title}
        </h3>
      </div>

      {/* 2-Column Grid: Left Sub-Gallery, Right Description & Price Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Sub-Gallery */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {/* Main Photo */}
          <div
            className="relative w-full aspect-[16/10] sm:h-[260px] overflow-hidden bg-gray-100"
            style={{
              borderRadius: "20px",
              border: "4px solid #FFFFFF",
              boxShadow: "0px 4px 25px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <Image
              src={images[activeImageIndex]}
              alt={service.title}
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover transition-opacity duration-200"
            />
          </div>

          {/* Thumbnails Row with Assets Arrows */}
          <div className="flex items-center w-full">
            <button
              type="button"
              onClick={handlePrevImage}
              aria-label="Previous extra service image"
              className="relative w-[20px] sm:w-[24px] h-[52px] sm:h-[58px] shrink-0 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            >
              <Image
                src="/PrivateExcursions/Privatedetails/left.svg"
                alt="Previous"
                fill
                className="object-contain"
              />
            </button>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-1 py-1 px-5">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-[65px] sm:w-[75px] h-[48px] sm:h-[54px] shrink-0 overflow-hidden cursor-pointer transition-all ${
                    idx === activeImageIndex
                      ? "ring-2 ring-[#DE7423] scale-[1.03]"
                      : "opacity-90 hover:opacity-100"
                  }`}
                  style={{
                    borderRadius: "10px",
                    border: "3px solid #FFFFFF",
                    boxShadow: "0px 1px 10px 2px rgba(0, 0, 0, 0.3)",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="75px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleNextImage}
              aria-label="Next extra service image"
              className="relative w-[20px] sm:w-[24px] h-[52px] sm:h-[58px] shrink-0 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            >
              <Image
                src="/PrivateExcursions/Privatedetails/right.svg"
                alt="Next"
                fill
                className="object-contain"
              />
            </button>
          </div>
        </div>

        {/* Right Column: Description, Price Boxes & Select Button */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full pt-1">
          <div>
            <p
              className={`text-[14px] sm:text-[15px] text-[#444444] leading-[1.65] font-poppins ${
                !isExpanded ? "line-clamp-4" : ""
              }`}
            >
              {service.description}
            </p>

            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[#155F98] text-[14px] font-semibold mt-2 inline-flex items-center gap-1 hover:underline cursor-pointer"
            >
              {isExpanded ? "Read less ⌃" : "Read more ⌵"}
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            {/* Price boxes row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
              {/* Adult */}
              <div
                className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-white"
                style={{ border: "0.8px solid #BBBBBB" }}
              >
                <span className="text-[12px] text-[#083952] font-medium font-poppins">
                  Adult
                </span>
                <span className="text-[15px] sm:text-[16px] font-bold text-[#083952] font-poppins">
                  {service.adultPrice.toFixed(2)}$
                </span>
              </div>

              {/* Child */}
              <div
                className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-white"
                style={{ border: "0.8px solid #BBBBBB" }}
              >
                <span className="text-[12px] text-[#083952] font-medium font-poppins">
                  Child
                </span>
                <span className="text-[15px] sm:text-[16px] font-bold text-[#083952] font-poppins">
                  {service.childPrice.toFixed(2)}$
                </span>
              </div>

              {/* Infant */}
              <div
                className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-white"
                style={{ border: "0.8px solid #BBBBBB" }}
              >
                <span className="text-[12px] text-[#083952] font-medium font-poppins">
                  Infant
                </span>
                <span className="text-[15px] sm:text-[16px] font-bold text-[#083952] font-poppins">
                  {service.infantPrice.toFixed(2)}$
                </span>
              </div>
            </div>

            {/* Select Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onToggle}
                className={`w-full sm:w-auto min-w-[150px] py-2.5 px-8 rounded-lg font-bold text-[15px] transition-all cursor-pointer shadow-sm active:scale-95 ${
                  isSelected
                    ? "bg-[#17DB55] text-white hover:bg-[#14C24B]"
                    : "bg-[#DE7423] text-white hover:bg-[#C9641B]"
                }`}
              >
                {isSelected ? "Selected" : "Select"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PrivateDetailsExtraServices({
  services,
  selectedIds,
  onToggleSelect,
}: PrivateDetailsExtraServicesProps) {
  return (
    <div className="w-full overflow-hidden rounded-2xl shadow-sm">
      {/* ─── ORANGE HEADER BANNER ─── */}
      <div className="bg-[#DE7423] px-6 sm:px-8 py-4 flex items-center justify-between text-white rounded-t-2xl">
        <div className="flex items-center gap-2.5">
          <FiPlusCircle size={22} className="text-white" />
          <h2 className="text-[18px] sm:text-[22px] font-bold tracking-wide">
            Extra Services
          </h2>
        </div>
      </div>

      {/* ─── EXTRA SERVICES CARDS CONTAINER ─── */}
      <div className="bg-[#FFF8ED] p-4 sm:p-6 space-y-6 rounded-b-2xl border-x border-b border-[#DE7423]/30">
        {services.map((service) => {
          const isSelected = selectedIds.includes(service.id);
          return (
            <ExtraServiceCard
              key={service.id}
              service={service}
              isSelected={isSelected}
              onToggle={() => onToggleSelect(service.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
