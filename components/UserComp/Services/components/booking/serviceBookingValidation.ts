import { ServiceType } from "../../types";
import {
  isValidEmail,
  isValidPhoneNumber,
} from "@/shared/utils/phoneUtils";
import { getDictionary } from "@/shared/utils/getDictionary";
import {
  ServiceBookingFormData,
  ServiceFieldErrors,
} from "./bookingTypes";

export interface ValidateBookingParams {
  formData: ServiceBookingFormData;
  serviceType: ServiceType;
  todayStr: string;
  nowDateTimeStr: string;
  locale?: string;
}

export function validateServiceBookingForm({
  formData,
  serviceType,
  todayStr,
  nowDateTimeStr,
  locale = "en",
}: ValidateBookingParams): { isValid: boolean; errors: ServiceFieldErrors } {
  const dict = getDictionary(locale);
  const t = dict.serviceDetail;
  const errors: ServiceFieldErrors = {};

  // 1. Full Name
  const trimmedName = formData.name.trim();
  if (!trimmedName) {
    errors.name = t.errNameRequired;
  } else if (trimmedName.length < 2) {
    errors.name = t.errNameMin;
  }

  // 2. Country
  const trimmedCountry = formData.country.trim();
  if (!trimmedCountry) {
    errors.country = t.errCountryRequired;
  } else if (trimmedCountry.length < 2) {
    errors.country = t.errCountryMin;
  }

  // 3. Hotel Location
  const trimmedHotel = formData.hotel.trim();
  if (!trimmedHotel) {
    errors.hotel = t.errHotelRequired;
  } else if (trimmedHotel.length < 2) {
    errors.hotel = t.errHotelMin;
  }

  // 4. Phone Number
  const trimmedPhone = formData.phoneNumber.trim();
  if (!trimmedPhone) {
    errors.phoneNumber = t.errPhoneRequired;
  } else if (!isValidPhoneNumber(trimmedPhone)) {
    errors.phoneNumber = t.errPhoneInvalid;
  }

  // 5. Email Address
  const trimmedEmail = formData.emailAddress.trim();
  if (!trimmedEmail) {
    errors.emailAddress = t.errEmailRequired;
  } else if (!isValidEmail(trimmedEmail)) {
    errors.emailAddress = t.errEmailInvalid;
  }

  // 6. Contact Method
  if (!formData.communicationMethod) {
    errors.communicationMethod = t.errChannelRequired;
  }

  // 7. Service-Specific Validations
  if (serviceType === "car-rental") {
    if (!formData.rentalDate) {
      errors.rentalDate = t.errRentalDateRequired;
    } else if (formData.rentalDate < todayStr) {
      errors.rentalDate = t.errRentalDatePast;
    }

    const days = Number(formData.numberOfDays);
    if (!formData.numberOfDays || isNaN(days) || days < 1 || days > 365) {
      errors.numberOfDays = t.errDaysInvalid;
    }
  } else if (serviceType === "tourist") {
    if (!formData.tourDate) {
      errors.tourDate = t.errTourDateRequired;
    } else if (formData.tourDate < todayStr) {
      errors.tourDate = t.errTourDatePast;
    }

    if (!formData.guideLanguage) {
      errors.guideLanguage = t.errGuideLangRequired;
    }

    if (!formData.timeFrom) {
      errors.timeFrom = t.errTimeFromRequired;
    }

    if (!formData.timeTo) {
      errors.timeTo = t.errTimeToRequired;
    } else if (
      formData.timeFrom &&
      formData.timeTo &&
      formData.timeTo <= formData.timeFrom
    ) {
      errors.timeTo = t.errTimeToRequired;
    }
  } else if (serviceType === "vip-airport") {
    const flight = formData.flightNumber.trim();
    if (!flight) {
      errors.flightNumber = t.errFlightNumberRequired;
    } else if (flight.length < 3) {
      errors.flightNumber = t.errFlightNumberRequired;
    }

    if (!formData.departureDateTime) {
      errors.departureDateTime = t.errDepartureRequired;
    } else if (formData.departureDateTime < nowDateTimeStr) {
      errors.departureDateTime = t.errDeparturePast;
    }

    const persons = Number(formData.noOfPersons);
    if (!formData.noOfPersons || isNaN(persons) || persons < 1 || persons > 50) {
      errors.noOfPersons = t.errPersonsInvalid;
    }

    const dest = formData.destinationTo.trim();
    if (!dest) {
      errors.destinationTo = t.errDestinationRequired;
    } else if (dest.length < 2) {
      errors.destinationTo = t.errDestinationRequired;
    }
  } else if (serviceType === "real-estate") {
    const noteTrimmed = formData.note.trim();
    if (!noteTrimmed) {
      errors.note = t.errNoteRequired;
    } else if (noteTrimmed.length < 5) {
      errors.note = t.errNoteRequired;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

