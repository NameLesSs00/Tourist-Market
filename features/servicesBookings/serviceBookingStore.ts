import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ServiceCommonContactDraft {
  name: string;
  country: string;
  customCountry: string;
  isCustomCountry: boolean;
  hotel: string;
  roomNumber: string;
  phoneNumber: string;
  emailAddress: string;
  communicationMethod: string;
}

export interface ServiceSpecificDrafts {
  carRental: {
    rentalDate: string;
    numberOfDays: string;
  };
  tourist: {
    tourDate: string;
    guideLanguage: string;
    timeFrom: string;
    timeTo: string;
  };
  vipAirport: {
    flightNumber: string;
    departureDateTime: string;
    noOfPersons: string;
    destinationTo: string;
  };
  realEstate: {
    note: string;
  };
}

export interface ConfirmedServiceBooking {
  name: string;
  country: string;
  hotel: string;
  roomNo?: string;
  emailAddress: string;
  phoneNumber?: string;
  communicationMethod?: string;
  subServiceTitle: string;
  serviceType: string;
  date?: string;
  numberOfDays?: number;
  flightNumber?: string;
  departureTime?: string;
  noOfPersons?: number;
  destinationTo?: string;
  guideLanguage?: string;
  note?: string;
  createdAt: string;
}

export const INITIAL_CONTACT_DRAFT: ServiceCommonContactDraft = {
  name: "",
  country: "",
  customCountry: "",
  isCustomCountry: false,
  hotel: "",
  roomNumber: "",
  phoneNumber: "",
  emailAddress: "",
  communicationMethod: "whatsapp",
};

export const INITIAL_SERVICE_DRAFTS: ServiceSpecificDrafts = {
  carRental: {
    rentalDate: "",
    numberOfDays: "1",
  },
  tourist: {
    tourDate: "",
    guideLanguage: "english",
    timeFrom: "09:00",
    timeTo: "17:00",
  },
  vipAirport: {
    flightNumber: "",
    departureDateTime: "",
    noOfPersons: "1",
    destinationTo: "",
  },
  realEstate: {
    note: "",
  },
};

export interface ServiceBookingStoreState {
  contactDraft: ServiceCommonContactDraft;
  serviceDrafts: ServiceSpecificDrafts;
  lastBooking: ConfirmedServiceBooking | null;

  // Actions
  setContactField: (
    field: keyof ServiceCommonContactDraft,
    value: string | boolean
  ) => void;
  setCarRentalField: (
    field: keyof ServiceSpecificDrafts["carRental"],
    value: string
  ) => void;
  setTouristField: (
    field: keyof ServiceSpecificDrafts["tourist"],
    value: string
  ) => void;
  setVipAirportField: (
    field: keyof ServiceSpecificDrafts["vipAirport"],
    value: string
  ) => void;
  setRealEstateNote: (value: string) => void;
  setLastBooking: (booking: ConfirmedServiceBooking) => void;
  clearLastBooking: () => void;
  resetAllDrafts: () => void;
}

export const useServiceBookingStore = create<ServiceBookingStoreState>()(
  persist(
    (set) => ({
      contactDraft: INITIAL_CONTACT_DRAFT,
      serviceDrafts: INITIAL_SERVICE_DRAFTS,
      lastBooking: null,

      setContactField: (field, value) =>
        set((state) => ({
          contactDraft: { ...state.contactDraft, [field]: value },
        })),

      setCarRentalField: (field, value) =>
        set((state) => ({
          serviceDrafts: {
            ...state.serviceDrafts,
            carRental: { ...state.serviceDrafts.carRental, [field]: value },
          },
        })),

      setTouristField: (field, value) =>
        set((state) => ({
          serviceDrafts: {
            ...state.serviceDrafts,
            tourist: { ...state.serviceDrafts.tourist, [field]: value },
          },
        })),

      setVipAirportField: (field, value) =>
        set((state) => ({
          serviceDrafts: {
            ...state.serviceDrafts,
            vipAirport: { ...state.serviceDrafts.vipAirport, [field]: value },
          },
        })),

      setRealEstateNote: (value) =>
        set((state) => ({
          serviceDrafts: {
            ...state.serviceDrafts,
            realEstate: { note: value },
          },
        })),

      setLastBooking: (booking) => set({ lastBooking: booking }),

      clearLastBooking: () => set({ lastBooking: null }),

      resetAllDrafts: () =>
        set({
          contactDraft: INITIAL_CONTACT_DRAFT,
          serviceDrafts: INITIAL_SERVICE_DRAFTS,
        }),
    }),
    {
      name: "tourist_market_services_draft",
    }
  )
);

