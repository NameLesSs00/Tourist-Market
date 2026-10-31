"use client";

import { useMutation } from "@tanstack/react-query";
import apiClient from "@/clientApi/apiConfig";
import {
  ServicesCommunicationMethod,
  ServicesGuideLanguage,
} from "@/models/servicesBooking";

export interface CarRentalBookingPayload {
  subServiceId: string;
  name: string;
  country: string;
  hotel: string;
  roomNo: string;
  phoneNumber: string;
  emailAddress: string;
  communicationMethod: ServicesCommunicationMethod;
  date: string;
  numberOfDays: number;
}

export interface VipHurghadaBookingPayload {
  subServiceId: string;
  name: string;
  country: string;
  hotel: string;
  roomNo: string;
  phoneNumber: string;
  emailAddress: string;
  communicationMethod: ServicesCommunicationMethod;
  date: string;
  numberOfDays: number;
}

export interface RealEstateBookingPayload {
  subServiceId: string;
  name: string;
  country: string;
  hotel: string;
  roomNo: string;
  phoneNumber: string;
  emailAddress: string;
  communicationMethod: ServicesCommunicationMethod;
  date: string;
  numberOfDays: number;
}

export interface TouristServiceBookingPayload {
  subServiceId: string;
  name: string;
  country: string;
  hotel: string;
  roomNo: string;
  phoneNumber: string;
  emailAddress: string;
  communicationMethod: ServicesCommunicationMethod;
  guideLanguage: ServicesGuideLanguage;
  date: string;
  timeFrom: string;
  timeTo: string;
}

type AnyBookingPayload =
  | CarRentalBookingPayload
  | VipHurghadaBookingPayload
  | RealEstateBookingPayload
  | TouristServiceBookingPayload;

const ENDPOINT_MAP: Record<string, string> = {
  "car-rental":  "/services/bookings/car-rental",
  "vip-airport": "/services/bookings/vip-hurghada",
  "real-estate": "/services/bookings/real-estate",
  "tourist":     "/services/bookings/tourist-service",
};

export function useSubmitServiceBooking(
  serviceType: "car-rental" | "vip-airport" | "real-estate" | "tourist"
) {
  const endpoint = ENDPOINT_MAP[serviceType];
  return useMutation({
    mutationFn: async (payload: AnyBookingPayload) => {
      const { data } = await apiClient.post(endpoint, payload);
      return data;
    },
  });
}

export function mapCommunicationMethod(
  val: string
): ServicesCommunicationMethod {
  switch (val) {
    case "whatsapp": return ServicesCommunicationMethod.WhatsApp;
    case "viber":    return ServicesCommunicationMethod.Viber;
    case "phone":    return ServicesCommunicationMethod.Phone;
    case "email":    return ServicesCommunicationMethod.Email;
    default:         return ServicesCommunicationMethod.WhatsApp;
  }
}

export function mapGuideLanguage(val: string): ServicesGuideLanguage {
  switch (val) {
    case "german":   return ServicesGuideLanguage.German;
    case "russian":  return ServicesGuideLanguage.Russian;
    case "french":   return ServicesGuideLanguage.French;
    default:         return ServicesGuideLanguage.English;
  }
}
