"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PrivateAttraction } from "../types";

interface PrivateDetailsAttractionsProps {
  attractions: PrivateAttraction[];
  maxAttractions?: number;
  selectedIds: string[];
  onToggleSelect: (attractionId: string) => void;
}

interface AttractionCardProps {
  attraction: PrivateAttraction;
  isSelected: boolean;
  onToggle: () => void;
  canSelect: boolean;
}

function AttractionCard({
  attraction,
  isSelected,
  onToggle,
  canSelect,
}: AttractionCardProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const images = attraction.images && attraction.images.length > 0
    ? attraction.images
    : ["/PrivateExcursions/Privatedetails/7b777cbdc9da0fa5b151e67b42e2d3da14ee38aa.png"];

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
      {/* Title */}
      <h3 className="text-[17px] sm:text-[19px] font-bold text-[#DE7423] tracking-wide uppercase mb-4 font-poppins">
        {attraction.title}
      </h3>

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
              alt={attraction.title}
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover transition-opacity duration-200"
            />
          </div>

          {/* Thumbnails Row with Assets Arrows */}
          <div className="flex items-center w-full  ">
            <button
              type="button"
              onClick={handlePrevImage}
              aria-label="Previous attraction image"
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
              aria-label="Next attraction image"
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
              {attraction.description}
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
                  {attraction.adultPrice.toFixed(2)}$
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
                  {attraction.childPrice.toFixed(2)}$
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
                  {attraction.infantPrice.toFixed(2)}$
                </span>
              </div>
            </div>

            {/* Select Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onToggle}
                disabled={!isSelected && !canSelect}
                className={`w-full sm:w-auto min-w-[150px] py-2.5 px-8 rounded-lg font-bold text-[15px] transition-all cursor-pointer shadow-sm active:scale-95 ${
                  isSelected
                    ? "bg-[#17DB55] text-white hover:bg-[#14C24B]"
                    : !canSelect
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
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

export function PrivateDetailsAttractions({
  attractions,
  maxAttractions = 5,
  selectedIds,
  onToggleSelect,
}: PrivateDetailsAttractionsProps) {
  const canSelectMore = selectedIds.length < maxAttractions;

  return (
    <div className="w-full overflow-hidden rounded-2xl shadow-sm">
      {/* ─── ORANGE HEADER BANNER ─── */}
      <div className="bg-[#DE7423] px-6 sm:px-8 py-4 flex items-center justify-between text-white rounded-t-2xl">
        <div className="flex items-center gap-2.5">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2ZM12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9C14.5 10.3807 13.3807 11.5 12 11.5Z"
              fill="white"
            />
          </svg>
          <h2 className="text-[18px] sm:text-[22px] font-bold tracking-wide">
            Select Attractions
          </h2>
        </div>

        <span className="text-[15px] sm:text-[17px] font-semibold bg-white/15 px-3 py-1 rounded-full">
          {selectedIds.length} / {maxAttractions} Max per trip
        </span>
      </div>

      {/* ─── ATTRACTION CARDS CONTAINER ─── */}
      <div className="bg-[#FFF8ED] p-4 sm:p-6 space-y-6 rounded-b-2xl border-x border-b border-[#DE7423]/30">
        {attractions.map((attraction) => {
          const isSelected = selectedIds.includes(attraction.id);
          return (
            <AttractionCard
              key={attraction.id}
              attraction={attraction}
              isSelected={isSelected}
              onToggle={() => onToggleSelect(attraction.id)}
              canSelect={canSelectMore}
            />
          );
        })}
      </div>
    </div>
  );
}
