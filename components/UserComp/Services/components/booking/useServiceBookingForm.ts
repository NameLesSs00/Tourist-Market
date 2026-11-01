"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ServiceDetailItem } from "../../types";
import { useSubmitServiceBooking } from "@/features/servicesBookings/usePublicServicesBooking";
import { useServiceBookingStore } from "@/features/servicesBookings/serviceBookingStore";
import { sanitizePhoneNumber } from "@/shared/utils/phoneUtils";
import { extractErrorMessage } from "@/shared/utils/errorUtils";
import {
  ServiceBookingFormData,
  ServiceFieldErrors,
} from "./bookingTypes";
import { validateServiceBookingForm } from "./serviceBookingValidation";
import {
  buildServiceBookingPayload,
  buildConfirmedServiceBooking,
} from "./serviceBookingPayload";

export function useServiceBookingForm(detail: ServiceDetailItem, locale: string = "en") {
  const router = useRouter();
  const { serviceType, formTitle, formSubtitle, id: subServiceId } = detail;

  // Zustand Store Selectors & Actions
  const contactDraft = useServiceBookingStore((s) => s.contactDraft);
  const serviceDrafts = useServiceBookingStore((s) => s.serviceDrafts);
  const setContactField = useServiceBookingStore((s) => s.setContactField);
  const setCarRentalField = useServiceBookingStore((s) => s.setCarRentalField);
  const setTouristField = useServiceBookingStore((s) => s.setTouristField);
  const setVipAirportField = useServiceBookingStore((s) => s.setVipAirportField);
  const setRealEstateNote = useServiceBookingStore((s) => s.setRealEstateNote);
  const setLastBooking = useServiceBookingStore((s) => s.setLastBooking);

  const [formData, setFormData] = useState<ServiceBookingFormData>(() => ({
    name: contactDraft.name || "",
    country: contactDraft.country || "",
    customCountry: "",
    hotel: contactDraft.hotel || "",
    roomNumber: contactDraft.roomNumber || "",
    phoneNumber: contactDraft.phoneNumber || "",
    emailAddress: contactDraft.emailAddress || "",
    communicationMethod: contactDraft.communicationMethod || "whatsapp",
    note: serviceType === "real-estate" ? serviceDrafts.realEstate.note : "",
    rentalDate: serviceDrafts.carRental.rentalDate || "",
    numberOfDays: serviceDrafts.carRental.numberOfDays || "1",
    tourDate: serviceDrafts.tourist.tourDate || "",
    guideLanguage: serviceDrafts.tourist.guideLanguage || "english",
    timeFrom: serviceDrafts.tourist.timeFrom || "09:00",
    timeTo: serviceDrafts.tourist.timeTo || "17:00",
    flightNumber: serviceDrafts.vipAirport.flightNumber || "",
    departureDateTime: serviceDrafts.vipAirport.departureDateTime || "",
    noOfPersons: serviceDrafts.vipAirport.noOfPersons || "1",
    destinationTo: serviceDrafts.vipAirport.destinationTo || "",
  }));

  const [fieldErrors, setFieldErrors] = useState<ServiceFieldErrors>({});
  const { mutateAsync, isPending } = useSubmitServiceBooking(serviceType);

  const [todayStr, setTodayStr] = useState<string>("");
  const [nowDateTimeStr, setNowDateTimeStr] = useState<string>("");

  useEffect(() => {
    setTodayStr(new Date().toISOString().split("T")[0]);
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    setNowDateTimeStr(local.toISOString().slice(0, 16));
  }, []);

  const clearFieldError = (fieldName: string) => {
    if (fieldErrors[fieldName]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    }
  };

  const syncToZustand = (name: string, value: string) => {
    if (
      [
        "name",
        "country",
        "hotel",
        "roomNumber",
        "phoneNumber",
        "emailAddress",
        "communicationMethod",
      ].includes(name)
    ) {
      setContactField(name as keyof typeof contactDraft, value);
    }
    if (["rentalDate", "numberOfDays"].includes(name)) {
      setCarRentalField(name as "rentalDate" | "numberOfDays", value);
    }
    if (["tourDate", "guideLanguage", "timeFrom", "timeTo"].includes(name)) {
      setTouristField(name as "tourDate" | "guideLanguage" | "timeFrom" | "timeTo", value);
    }
    if (
      [
        "flightNumber",
        "departureDateTime",
        "noOfPersons",
        "destinationTo",
      ].includes(name)
    ) {
      setVipAirportField(
        name as "flightNumber" | "departureDateTime" | "noOfPersons" | "destinationTo",
        value
      );
    }
    if (name === "note" && serviceType === "real-estate") {
      setRealEstateNote(value);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    syncToZustand(name, value);
    clearFieldError(name);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizePhoneNumber(e.target.value);
    setFormData((prev) => ({ ...prev, phoneNumber: sanitized }));
    setContactField("phoneNumber", sanitized);
    clearFieldError("phoneNumber");
  };

  const validate = (): boolean => {
    const { isValid, errors } = validateServiceBookingForm({
      formData,
      serviceType,
      todayStr,
      nowDateTimeStr,
    });

    setFieldErrors(errors);

    const errorKeys = Object.keys(errors);
    if (!isValid && errorKeys.length > 0) {
      const firstKey = errorKeys[0];
      const targetElement = document.querySelector(
        `[name="${firstKey}"]`
      ) as HTMLElement | null;

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
        targetElement.focus();
      }

      toast.error(errors[firstKey]);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payloadParams = {
      subServiceId,
      formData,
      serviceType,
      formTitle,
      formSubtitle,
    };

    try {
      const payload = buildServiceBookingPayload(payloadParams);
      await mutateAsync(payload);

      const confirmed = buildConfirmedServiceBooking(payloadParams);
      setLastBooking(confirmed);

      toast.success("Your booking request has been submitted successfully!");
      router.push(`/${locale}/services/thank-you`);
    } catch (err: unknown) {
      toast.error(
        extractErrorMessage(
          err,
          "Something went wrong while submitting your booking. Please try again."
        )
      );
    }
  };

  return {
    formData,
    fieldErrors,
    todayStr,
    nowDateTimeStr,
    isPending,
    handleChange,
    handlePhoneChange,
    handleSubmit,
  };
}

export default useServiceBookingForm;
