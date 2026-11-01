import { ServiceType } from "../../types";
import {
  isValidEmail,
  isValidPhoneNumber,
} from "@/shared/utils/phoneUtils";
import {
  ServiceBookingFormData,
  ServiceFieldErrors,
} from "./bookingTypes";

export interface ValidateBookingParams {
  formData: ServiceBookingFormData;
  serviceType: ServiceType;
  todayStr: string;
  nowDateTimeStr: string;
}

export function validateServiceBookingForm({
  formData,
  serviceType,
  todayStr,
  nowDateTimeStr,
}: ValidateBookingParams): { isValid: boolean; errors: ServiceFieldErrors } {
  const errors: ServiceFieldErrors = {};

  // 1. Full Name
  const trimmedName = formData.name.trim();
  if (!trimmedName) {
    errors.name = "Full name is required.";
  } else if (trimmedName.length < 2) {
    errors.name = "Full name must be at least 2 characters.";
  }

  // 2. Country
  const trimmedCountry = formData.country.trim();
  if (!trimmedCountry) {
    errors.country = "Country is required.";
  } else if (trimmedCountry.length < 2) {
    errors.country = "Country must be at least 2 characters.";
  }

  // 3. Hotel Location
  const trimmedHotel = formData.hotel.trim();
  if (!trimmedHotel) {
    errors.hotel = "Hotel or accommodation location is required.";
  } else if (trimmedHotel.length < 2) {
    errors.hotel = "Hotel location must be at least 2 characters.";
  }

  // 4. Phone Number
  const trimmedPhone = formData.phoneNumber.trim();
  if (!trimmedPhone) {
    errors.phoneNumber = "Phone number is required.";
  } else if (!isValidPhoneNumber(trimmedPhone)) {
    errors.phoneNumber =
      "Please enter a valid phone number (7 to 15 digits).";
  }

  // 5. Email Address
  const trimmedEmail = formData.emailAddress.trim();
  if (!trimmedEmail) {
    errors.emailAddress = "Email address is required.";
  } else if (!isValidEmail(trimmedEmail)) {
    errors.emailAddress =
      "Please enter a valid email address (e.g. name@example.com).";
  }

  // 6. Contact Method
  if (!formData.communicationMethod) {
    errors.communicationMethod = "Please select your preferred contact channel.";
  }

  // 7. Service-Specific Validations
  if (serviceType === "car-rental") {
    if (!formData.rentalDate) {
      errors.rentalDate = "Pick-up date is required.";
    } else if (formData.rentalDate < todayStr) {
      errors.rentalDate = "Pick-up date cannot be in the past.";
    }

    const days = Number(formData.numberOfDays);
    if (!formData.numberOfDays || isNaN(days) || days < 1 || days > 365) {
      errors.numberOfDays = "Duration must be between 1 and 365 days.";
    }
  } else if (serviceType === "tourist") {
    if (!formData.tourDate) {
      errors.tourDate = "Tour date is required.";
    } else if (formData.tourDate < todayStr) {
      errors.tourDate = "Tour date cannot be in the past.";
    }

    if (!formData.guideLanguage) {
      errors.guideLanguage = "Please select your guide language.";
    }

    if (!formData.timeFrom) {
      errors.timeFrom = "Start time is required.";
    }

    if (!formData.timeTo) {
      errors.timeTo = "End time is required.";
    } else if (
      formData.timeFrom &&
      formData.timeTo &&
      formData.timeTo <= formData.timeFrom
    ) {
      errors.timeTo = "End time must be chronologically after start time.";
    }
  } else if (serviceType === "vip-airport") {
    const flight = formData.flightNumber.trim();
    if (!flight) {
      errors.flightNumber = "Flight number is required.";
    } else if (flight.length < 3) {
      errors.flightNumber = "Flight number must be at least 3 characters (e.g. MS703).";
    }

    if (!formData.departureDateTime) {
      errors.departureDateTime = "Flight departure date and time is required.";
    } else if (formData.departureDateTime < nowDateTimeStr) {
      errors.departureDateTime = "Departure date and time cannot be in the past.";
    }

    const persons = Number(formData.noOfPersons);
    if (!formData.noOfPersons || isNaN(persons) || persons < 1 || persons > 50) {
      errors.noOfPersons = "Number of passengers must be between 1 and 50.";
    }

    const dest = formData.destinationTo.trim();
    if (!dest) {
      errors.destinationTo = "Drop-off destination is required.";
    } else if (dest.length < 2) {
      errors.destinationTo = "Destination must be at least 2 characters.";
    }
  } else if (serviceType === "real-estate") {
    const noteTrimmed = formData.note.trim();
    if (!noteTrimmed) {
      errors.note = "Please describe your property inquiry or requirements.";
    } else if (noteTrimmed.length < 5) {
      errors.note = "Inquiry details must be at least 5 characters.";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

