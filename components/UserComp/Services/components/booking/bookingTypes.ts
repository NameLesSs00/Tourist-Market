export interface ServiceBookingFormData {
  // Common fields
  name: string;
  country: string;
  customCountry: string;
  hotel: string;
  roomNumber: string;
  phoneNumber: string;
  emailAddress: string;
  communicationMethod: string;
  note: string;

  // Car Rental fields
  rentalDate: string;
  numberOfDays: string;

  // Tourist Service fields
  tourDate: string;
  guideLanguage: string;
  timeFrom: string;
  timeTo: string;

  // VIP Airport fields
  flightNumber: string;
  departureDateTime: string;
  noOfPersons: string;
  destinationTo: string;
}

export type ServiceFieldErrors = Record<string, string>;

export const INITIAL_SERVICE_FORM_DATA: ServiceBookingFormData = {
  name: "",
  country: "",
  customCountry: "",
  hotel: "",
  roomNumber: "",
  phoneNumber: "",
  emailAddress: "",
  communicationMethod: "whatsapp",
  note: "",
  rentalDate: "",
  numberOfDays: "1",
  tourDate: "",
  guideLanguage: "english",
  timeFrom: "09:00",
  timeTo: "17:00",
  flightNumber: "",
  departureDateTime: "",
  noOfPersons: "1",
  destinationTo: "",
};

export const getFieldInputClass = (hasError: boolean): string =>
  `w-full px-3.5 sm:px-4 py-2.5 rounded-[5px] border text-xs sm:text-sm text-[#0E4A68] focus:outline-none transition-colors ${
    hasError
      ? "border-rose-400 bg-rose-50/25 focus:border-rose-500 focus:ring-1 focus:ring-rose-400"
      : "border-[#888888]/60 bg-white focus:border-[#134B68] focus:ring-1 focus:ring-[#134B68]"
  }`;

export const getPickerInputClass = (hasError: boolean): string =>
  `${getFieldInputClass(hasError)} cursor-pointer`;

export const triggerPicker = (e: React.MouseEvent<HTMLInputElement>) => {
  try {
    e.currentTarget.showPicker?.();
  } catch {
    // Browser fallback
  }
};

