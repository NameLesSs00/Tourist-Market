"use client";

import React from "react";
import { FiSend } from "react-icons/fi";
import { FaCar, FaConciergeBell, FaBuilding, FaLanguage } from "react-icons/fa";
import { ServiceDetailItem } from "../types";
import {
  useServiceBookingForm,
  ServiceCommonFields,
  ServiceSpecificFields,
} from "./booking";

interface ServiceBookingFormProps {
  detail: ServiceDetailItem;
  locale?: string;
}

export function ServiceBookingForm({ detail, locale = "en" }: ServiceBookingFormProps) {
  const { serviceType, formTitle, formSubtitle } = detail;

  const {
    formData,
    fieldErrors,
    todayStr,
    nowDateTimeStr,
    isPending,
    handleChange,
    handlePhoneChange,
    handleSubmit,
  } = useServiceBookingForm(detail, locale);

  const getServiceIcon = () => {
    switch (serviceType) {
      case "car-rental":
        return <FaCar className="w-5 h-5 text-white" />;
      case "vip-airport":
        return <FaConciergeBell className="w-5 h-5 text-white" />;
      case "real-estate":
        return <FaBuilding className="w-5 h-5 text-white" />;
      case "tourist":
        return <FaLanguage className="w-5 h-5 text-white" />;
      default:
        return <FaCar className="w-5 h-5 text-white" />;
    }
  };

  return (
    <div id="booking-form" className="w-full max-w-[960px] mx-auto my-8 sm:my-12 font-poppins">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-[#0E4A68] mb-4 sm:mb-6">
        Booking Form
      </h2>

      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "0.5px solid #888888",
          borderRadius: "8px",
          boxShadow: "0px 2px 20px 2px #00000033",
        }}
        className="overflow-hidden"
      >
        {/* Form Header Banner */}
        <div
          style={{ backgroundColor: "#134B68" }}
          className="py-3.5 sm:py-4 px-4 sm:px-8 flex items-center gap-3 sm:gap-3.5 text-white"
        >
          <div className="shrink-0">{getServiceIcon()}</div>
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base md:text-lg font-bold leading-tight truncate">
              {formTitle}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 font-normal truncate">
              {formSubtitle}
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="p-4 sm:p-7 md:p-10 flex flex-col gap-4 sm:gap-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <ServiceCommonFields
              formData={formData}
              fieldErrors={fieldErrors}
              onChange={handleChange}
              onPhoneChange={handlePhoneChange}
            />

            <ServiceSpecificFields
              serviceType={serviceType}
              formData={formData}
              fieldErrors={fieldErrors}
              todayStr={todayStr}
              nowDateTimeStr={nowDateTimeStr}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            style={{
              backgroundColor: "#134B68",
              borderRadius: "5px",
            }}
            className="w-full py-3 px-4 flex items-center justify-center gap-2 text-white font-semibold text-xs sm:text-sm md:text-base transition-all duration-200 hover:brightness-110 active:scale-[0.99] cursor-pointer mt-2 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FiSend className="w-4 h-4 shrink-0" />
            <span>{isPending ? "Submitting Request..." : "Submit Reservation"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ServiceBookingForm;
