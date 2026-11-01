import { ServiceType } from "../../types";
import {
  mapCommunicationMethod,
  mapGuideLanguage,
  type AnyBookingPayload,
} from "@/features/servicesBookings/usePublicServicesBooking";
import type { ConfirmedServiceBooking } from "@/features/servicesBookings/serviceBookingStore";
import { ServiceBookingFormData } from "./bookingTypes";

export interface BuildPayloadParams {
  subServiceId?: string;
  formData: ServiceBookingFormData;
  finalCountry: string;
  serviceType: ServiceType;
  formTitle: string;
  formSubtitle?: string;
}

export function buildServiceBookingPayload({
  subServiceId,
  formData,
  finalCountry,
  serviceType,
}: BuildPayloadParams): AnyBookingPayload {
  const commMethod = mapCommunicationMethod(formData.communicationMethod);

  const basePayload = {
    subServiceId: subServiceId ?? "",
    name: formData.name.trim(),
    country: finalCountry,
    hotel: formData.hotel.trim(),
    roomNo: formData.roomNumber.trim(),
    phoneNumber: formData.phoneNumber.trim(),
    emailAddress: formData.emailAddress.trim(),
    communicationMethod: commMethod,
    note: formData.note.trim()
      ? `${formData.phoneNumber.trim() ? `Phone: ${formData.phoneNumber.trim()} | ` : ""}${formData.note.trim()}`
      : formData.phoneNumber.trim()
      ? `Phone: ${formData.phoneNumber.trim()}`
      : undefined,
  };

  if (serviceType === "car-rental") {
    return {
      ...basePayload,
      date: new Date(formData.rentalDate).toISOString(),
      numberOfDays: Number(formData.numberOfDays) || 1,
    };
  }

  if (serviceType === "tourist") {
    return {
      ...basePayload,
      guideLanguage: mapGuideLanguage(formData.guideLanguage),
      date: new Date(formData.tourDate).toISOString(),
      timeFrom:
        formData.timeFrom.length === 5 ? `${formData.timeFrom}:00` : formData.timeFrom,
      timeTo:
        formData.timeTo.length === 5 ? `${formData.timeTo}:00` : formData.timeTo,
    };
  }

  if (serviceType === "vip-airport") {
    return {
      ...basePayload,
      flightNumber: formData.flightNumber.trim(),
      departureTime: new Date(formData.departureDateTime).toISOString(),
      noOfPersons: Number(formData.noOfPersons) || 1,
      destinationTo: formData.destinationTo.trim(),
    };
  }

  // Real Estate
  return {
    ...basePayload,
    note: formData.note.trim(),
  };
}

export function buildConfirmedServiceBooking({
  formData,
  finalCountry,
  serviceType,
  formTitle,
  formSubtitle,
}: BuildPayloadParams): ConfirmedServiceBooking {
  return {
    name: formData.name.trim(),
    country: finalCountry,
    hotel: formData.hotel.trim(),
    roomNo: formData.roomNumber.trim() || undefined,
    emailAddress: formData.emailAddress.trim(),
    phoneNumber: formData.phoneNumber.trim() || undefined,
    communicationMethod: formData.communicationMethod,
    subServiceTitle: formSubtitle || formTitle,
    serviceType,
    date:
      serviceType === "car-rental"
        ? formData.rentalDate
        : serviceType === "tourist"
        ? formData.tourDate
        : undefined,
    numberOfDays:
      serviceType === "car-rental" ? Number(formData.numberOfDays) : undefined,
    flightNumber:
      serviceType === "vip-airport" ? formData.flightNumber.trim() : undefined,
    departureTime:
      serviceType === "vip-airport" ? formData.departureDateTime : undefined,
    noOfPersons:
      serviceType === "vip-airport" ? Number(formData.noOfPersons) : undefined,
    destinationTo:
      serviceType === "vip-airport" ? formData.destinationTo.trim() : undefined,
    guideLanguage:
      serviceType === "tourist" ? formData.guideLanguage : undefined,
    note: formData.note.trim() || undefined,
    createdAt: new Date().toISOString(),
  };
}

