"use client";

import React, { useState } from "react";
import { FiSend, FiCalendar, FiChevronDown } from "react-icons/fi";
import { FaCar, FaConciergeBell, FaBuilding, FaLanguage } from "react-icons/fa";
import { ServiceDetailItem } from "../types";
import {
  useSubmitServiceBooking,
  mapCommunicationMethod,
  mapGuideLanguage,
} from "@/features/servicesBookings/usePublicServicesBooking";

interface ServiceBookingFormProps {
  detail: ServiceDetailItem;
}

export function ServiceBookingForm({ detail }: ServiceBookingFormProps) {
  const { serviceType, formTitle, formSubtitle, id: subServiceId } = detail;

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    hotel: "",
    roomNumber: "",
    phoneNumber: "",
    emailAddress: "",
    communicationMethod: "",
    serviceOption: formSubtitle || "",
    translatorLanguage: "",
    date: "",
    secondDate: "",
    numberOfDays: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { mutateAsync, isPending } = useSubmitServiceBooking(serviceType);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasError(false);

    const commMethod = mapCommunicationMethod(formData.communicationMethod);
    const base = {
      subServiceId: subServiceId ?? "",
      name: formData.name,
      country: formData.country,
      hotel: formData.hotel,
      roomNo: formData.roomNumber,
      phoneNumber: formData.phoneNumber,
      emailAddress: formData.emailAddress,
      communicationMethod: commMethod,
    };

    try {
      if (serviceType === "tourist") {
        await mutateAsync({
          ...base,
          guideLanguage: mapGuideLanguage(formData.translatorLanguage),
          date: formData.date,
          timeFrom: formData.date,
          timeTo: formData.secondDate || formData.date,
        });
      } else {
        await mutateAsync({
          ...base,
          date: formData.date,
          numberOfDays: Number(formData.numberOfDays) || 1,
        });
      }
      setIsSubmitted(true);
      setFormData({
        name: "",
        country: "",
        hotel: "",
        roomNumber: "",
        phoneNumber: "",
        emailAddress: "",
        communicationMethod: "",
        serviceOption: "",
        translatorLanguage: "",
        date: "",
        secondDate: "",
        numberOfDays: "",
      });
      setTimeout(() => setIsSubmitted(false), 4000);
    } catch {
      setHasError(true);
      setTimeout(() => setHasError(false), 4000);
    }
  };

  return (
    <div id="booking-form" className="w-full max-w-[960px] mx-auto my-12 font-poppins">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#0E4A68] mb-6">
        Booking Form
      </h2>

      {/* Form Container */}
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
          className="py-4 px-6 sm:px-8 flex items-center gap-3.5 text-white"
        >
          <div className="shrink-0">{getServiceIcon()}</div>
          <div>
            <h3 className="text-base sm:text-lg font-bold leading-tight">
              {formTitle}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 font-normal">
              {formSubtitle}
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 flex flex-col gap-5">
          {/* 1. Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full px-4 py-2.5 rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] focus:outline-none focus:border-[#134B68] focus:ring-1 focus:ring-[#134B68] transition-colors"
            />
          </div>

          {/* 2. Country */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
              Country <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              className="w-full px-4 py-2.5 rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] focus:outline-none focus:border-[#134B68] focus:ring-1 focus:ring-[#134B68] transition-colors"
            />
          </div>

          {/* 3. Hotel */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
              Hotel <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="hotel"
              required
              value={formData.hotel}
              onChange={handleChange}
              placeholder="Hotel"
              className="w-full px-4 py-2.5 rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] focus:outline-none focus:border-[#134B68] focus:ring-1 focus:ring-[#134B68] transition-colors"
            />
          </div>

          {/* 4. Room Number */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
              Room Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="roomNumber"
              required
              value={formData.roomNumber}
              onChange={handleChange}
              placeholder="Room Number"
              className="w-full px-4 py-2.5 rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] focus:outline-none focus:border-[#134B68] focus:ring-1 focus:ring-[#134B68] transition-colors"
            />
          </div>

          {/* 5. Phone Number */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full px-4 py-2.5 rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] focus:outline-none focus:border-[#134B68] focus:ring-1 focus:ring-[#134B68] transition-colors"
            />
          </div>

          {/* 6. Email Address */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="emailAddress"
              required
              value={formData.emailAddress}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full px-4 py-2.5 rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] focus:outline-none focus:border-[#134B68] focus:ring-1 focus:ring-[#134B68] transition-colors"
            />
          </div>

          {/* 7. Communication Method */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
              Communication Method <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                name="communicationMethod"
                required
                value={formData.communicationMethod}
                onChange={handleChange}
                className="w-full px-4 py-2.5 appearance-none rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] bg-white focus:outline-none focus:border-[#134B68] focus:ring-1 focus:ring-[#134B68] transition-colors cursor-pointer"
              >
                <option value="">Choose...</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="viber">Viber</option>
                <option value="phone">Phone Call</option>
                <option value="email">Email</option>
              </select>
              <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* 8. Service Selection or Translator Language */}
          {serviceType === "tourist" ? (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
                Translator Language <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="translatorLanguage"
                  required
                  value={formData.translatorLanguage}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 appearance-none rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] bg-white focus:outline-none focus:border-[#134B68] focus:ring-1 focus:ring-[#134B68] transition-colors cursor-pointer"
                >
                  <option value="">Choose...</option>
                  <option value="english">English</option>
                  <option value="arabic">Arabic</option>
                  <option value="german">German</option>
                  <option value="russian">Russian</option>
                  <option value="french">French</option>
                  <option value="romanian">Romanian</option>
                  <option value="polish">Polish</option>
                </select>
                <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
                {serviceType === "car-rental" ? "Car Rental" : "Service"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="serviceOption"
                  required
                  value={formData.serviceOption}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 appearance-none rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] bg-white focus:outline-none focus:border-[#134B68] focus:ring-1 focus:ring-[#134B68] transition-colors cursor-pointer"
                >
                  <option value="">Choose...</option>
                  <option value="Mercedes Benz">Mercedes Benz</option>
                  <option value="Hyundai Tucson">Hyundai Tucson</option>
                  <option value="MG HS">MG HS</option>
                  <option value="Nissan Sunny">Nissan Sunny</option>
                  <option value="VIP Lounge">VIP Lounge</option>
                  <option value="One7 Residence Hurghada">One7 Residence Hurghada</option>
                </select>
                <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>
          )}

          {/* 9. Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
              Date <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] focus:outline-none focus:border-[#134B68] focus:ring-1 focus:ring-[#134B68] transition-colors cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
              />

              <FiCalendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>

          </div>

          {/* 10. Second Date (for Tourist) or Number of Days */}
          {serviceType === "tourist" ? (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
                Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="secondDate"
                  required
                  value={formData.secondDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] focus:outline-none focus:border-[#134B68] focus:ring-1 focus:ring-[#134B68] transition-colors cursor-pointer"
                />
                <FiCalendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
                Number of Days <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                name="numberOfDays"
                required
                value={formData.numberOfDays}
                onChange={handleChange}
                placeholder="Number of days"
                className="w-full px-4 py-2.5 rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] focus:outline-none focus:border-[#134B68] focus:ring-1 focus:ring-[#134B68] transition-colors"
              />
            </div>
          )}

          {/* Submission Feedback */}
          {isSubmitted && (
            <div className="p-3 bg-green-50 text-green-700 text-xs sm:text-sm rounded-[5px] border border-green-200 text-center font-medium">
              Thank you! Your request has been submitted successfully. We will contact you shortly.
            </div>
          )}
          {hasError && (
            <div className="p-3 bg-red-50 text-red-700 text-xs sm:text-sm rounded-[5px] border border-red-200 text-center font-medium">
              Something went wrong. Please try again or contact us directly.
            </div>
          )}

          {/* 11. Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            style={{
              backgroundColor: "#134B68",
              borderRadius: "5px",
            }}
            className="w-full py-3 px-4 flex items-center justify-center gap-2 text-white font-semibold text-sm sm:text-base transition-all duration-200 hover:brightness-110 active:scale-[0.99] cursor-pointer mt-2 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FiSend className="w-4 h-4 shrink-0" />
            <span>{isPending ? "Submitting..." : "Submit Request"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ServiceBookingForm;
