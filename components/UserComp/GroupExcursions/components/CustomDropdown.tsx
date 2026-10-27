"use client";

import React, { useState, useRef, useEffect } from "react";

export interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  label: string;
  icon?: React.ReactNode;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function CustomDropdown({
  label,
  icon,
  options,
  value,
  onChange,
  disabled = false,
  className = "",
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];

  const handleSelect = (optValue: string) => {
    onChange(optValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative flex flex-col ${className}`}>
      {/* Label */}
      <span className="font-poppins text-xs sm:text-sm font-medium text-[#444444] mb-1.5 select-none">
        {label}
      </span>

      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`relative w-full h-11 pl-9 pr-9 font-poppins text-sm text-left rounded-[8px] border transition-all duration-150 flex items-center justify-between cursor-pointer select-none ${
          disabled ? "opacity-50 cursor-not-allowed bg-slate-50" : "bg-white"
        } ${
          isOpen
            ? "border-[#0E4A68] ring-1 ring-[#0E4A68] shadow-sm"
            : "border-[#888888] hover:border-[#0E4A68]/70"
        }`}
      >
        {/* Left Icon */}
        {icon && (
          <div className="absolute left-3 pointer-events-none flex items-center justify-center">
            {icon}
          </div>
        )}

        {/* Selected Label */}
        <span
          className={`truncate block ${
            selectedOption?.value &&
            selectedOption.value !== "All Categories" &&
            selectedOption.value !== "All Prices" &&
            selectedOption.value !== "All Durations" &&
            selectedOption.value !== ""
              ? "text-[#0E4A68] font-semibold"
              : "text-[#444444]"
          }`}
        >
          {selectedOption ? selectedOption.label : label}
        </span>

        {/* Right Animated Chevron */}
        <div
          className={`absolute right-3 pointer-events-none flex items-center text-[#888888] transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#0E4A68]" : ""
          }`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Popover Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 bg-white rounded-[10px] border border-[#0E4A68]/20 shadow-[0_12px_28px_rgba(0,0,0,0.18)] py-1.5 max-h-[260px] overflow-y-auto animate-in fade-in zoom-in-95 duration-150"
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(opt.value)}
                className={`w-full px-3.5 py-2 text-left font-poppins text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer select-none ${
                  isSelected
                    ? "bg-[#0E4A68]/10 text-[#0E4A68] font-semibold"
                    : "text-[#444444] hover:bg-slate-50 hover:text-[#0E4A68]"
                }`}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && (
                  <svg
                    className="w-4 h-4 text-[#0E4A68] shrink-0 ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CustomDropdown;
