import React from "react";
import Image from "next/image";
import { TransferCommunicationMethod } from "@/models/transferBooking";
import type { CountryItem } from "@/models/country";

interface TransferCustomerCardProps {
  customerName: string;
  countryId: string;
  email: string;
  communicationMethod: TransferCommunicationMethod;
  phoneNumber: string;
  luggageCount: number;
  countries: CountryItem[];
  isLoadingCountries?: boolean;
  onCustomerNameChange: (val: string) => void;
  onCountryIdChange: (val: string) => void;
  onEmailChange: (val: string) => void;
  onCommunicationMethodChange: (val: TransferCommunicationMethod) => void;
  onPhoneNumberChange: (val: string) => void;
  onLuggageCountChange: (val: number) => void;
}

export function TransferCustomerCard({
  customerName,
  countryId,
  email,
  communicationMethod,
  phoneNumber,
  luggageCount,
  countries,
  isLoadingCountries = false,
  onCustomerNameChange,
  onCountryIdChange,
  onEmailChange,
  onCommunicationMethodChange,
  onPhoneNumberChange,
  onLuggageCountChange,
}: TransferCustomerCardProps) {
  return (
    <div className="bg-[#FFFFFF] rounded-[8.38px] border-[0.52px] border-[#888888] shadow-[0px_1.05px_8.38px_1.05px_rgba(0,0,0,0.2)] p-5 md:p-6 space-y-4 font-poppins">
      <h2 className="text-base sm:text-lg font-bold text-[#0E4A68]">
        Customer Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
            Name *
          </label>
          <input
            type="text"
            placeholder="Your Full Name"
            value={customerName}
            onChange={(e) => onCustomerNameChange(e.target.value)}
            className="w-full h-11 px-3 py-2 text-sm text-[#0E4A68] font-medium bg-[#FFFFFF] border-[0.42px] border-[#00000066] rounded-[5.24px] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition placeholder:text-[#00000066] placeholder:font-normal"
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
            Country *
          </label>
          <div className="relative">
            <select
              value={countryId}
              onChange={(e) => onCountryIdChange(e.target.value)}
              disabled={isLoadingCountries}
              className="w-full h-11 px-3 py-2 text-sm text-[#0E4A68] font-medium bg-[#FFFFFF] border-[0.42px] border-[#00000066] rounded-[5.24px] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition appearance-none cursor-pointer"
            >
              <option value="" disabled>
                {isLoadingCountries ? "Loading countries..." : "Select Country"}
              </option>
              {countries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} {c.phoneCode ? `(${c.phoneCode})` : ""}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <Image
                src="/transfer/Vector (5).svg"
                alt="Select dropdown"
                width={12}
                height={6}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
            Email *
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="w-full h-11 px-3 py-2 text-sm text-[#0E4A68] font-medium bg-[#FFFFFF] border-[0.42px] border-[#00000066] rounded-[5.24px] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition placeholder:text-[#00000066] placeholder:font-normal"
          />
        </div>

        {/* Preferred Communication Method */}
        <div>
          <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
            Preferred Communication Method *
          </label>
          <div className="relative">
            <select
              value={communicationMethod}
              onChange={(e) =>
                onCommunicationMethodChange(
                  Number(e.target.value) as TransferCommunicationMethod
                )
              }
              className="w-full h-11 px-3 py-2 text-sm text-[#0E4A68] font-medium bg-[#FFFFFF] border-[0.42px] border-[#00000066] rounded-[5.24px] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition appearance-none cursor-pointer"
            >
              <option value={TransferCommunicationMethod.WhatsApp}>WhatsApp</option>
              <option value={TransferCommunicationMethod.Email}>Email</option>
              <option value={TransferCommunicationMethod.Viber}>Viber</option>
              <option value={TransferCommunicationMethod.Phone}>Phone</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <Image
                src="/transfer/Vector (5).svg"
                alt="Select dropdown"
                width={12}
                height={6}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
            Phone (preferred WhatsApp) *
          </label>
          <input
            type="tel"
            placeholder="+201036232021"
            value={phoneNumber}
            onChange={(e) => onPhoneNumberChange(e.target.value)}
            className="w-full h-11 px-3 py-2 text-sm text-[#0E4A68] font-medium bg-[#FFFFFF] border-[0.42px] border-[#00000066] rounded-[5.24px] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition placeholder:text-[#00000066] placeholder:font-normal"
          />
        </div>

        {/* Number of Luggage */}
        <div>
          <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
            Number of Luggage
          </label>
          <input
            type="number"
            min={0}
            max={30}
            value={luggageCount}
            onChange={(e) => {
              const val = Math.max(0, parseInt(e.target.value) || 0);
              onLuggageCountChange(val);
            }}
            placeholder="0"
            className="w-full h-11 px-3 py-2 text-sm text-[#0E4A68] font-medium bg-[#FFFFFF] border-[0.42px] border-[#00000066] rounded-[5.24px] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition placeholder:text-[#00000066] placeholder:font-normal"
          />
        </div>
      </div>
    </div>
  );
}
