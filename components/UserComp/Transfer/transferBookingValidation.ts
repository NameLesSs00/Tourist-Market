import { toast } from "sonner";
import {
  TransferTripType,
  TransferCommunicationMethod,
  type CreateTransferBookingRequest,
  type CreateTransferBookingResponse,
  type TransferMatchResponseDto,
} from "@/models/transferBooking";
import type { VehicleTypeTransferItem } from "@/models/vehicleTypeTransfer";
import {
  isValidEmail,
  isValidPhoneNumber,
  sanitizePhoneNumber,
} from "@/shared/utils/phoneUtils";
import { getDictionary } from "@/shared/utils/getDictionary";

export interface ConfirmedTransferBooking extends CreateTransferBookingResponse {
  fromName: string;
  toName: string;
  adults: number;
  childrenCount: number;
  vehicleName: string;
  tripType: TransferTripType;
  tripDate: string;
  tripTime: string;
  returnDate?: string;
  returnTime?: string;
  additionalHours?: number;
  additionalHourRate?: number;
  customerName: string;
  email: string;
  phoneNumber: string;
  currencySymbol?: string;
  currencyCode?: string;
}

export function formatTimeToSeconds(timeStr: string): string {
  if (!timeStr) return "";
  const parts = timeStr.trim().split(":");
  if (parts.length === 2) {
    return `${parts[0].padStart(2, "0")}:${parts[1].padStart(2, "0")}:00`;
  }
  return timeStr;
}

export interface ValidateTransferParams {
  fromLocationId: string;
  toLocationId: string;
  tripDate: string;
  tripTime: string;
  tripType: TransferTripType;
  returnDate?: string;
  returnTime?: string;
  customerName: string;
  countryId: string;
  email: string;
  phoneNumber: string;
}

export function validateTransferBookingFields(
  params: ValidateTransferParams,
  locale: string = "en"
): boolean {
  const dict = getDictionary(locale);
  const v = dict.transfer.validation;

  if (!params.fromLocationId) {
    toast.error(v.pickupRequired);
    return false;
  }
  if (!params.toLocationId) {
    toast.error(v.destinationRequired);
    return false;
  }
  if (params.fromLocationId === params.toLocationId) {
    toast.error(v.sameLocation);
    return false;
  }
  if (!params.tripDate) {
    toast.error(v.dateRequired);
    return false;
  }
  const todayStr = new Date().toISOString().split("T")[0];
  if (params.tripDate < todayStr) {
    toast.error(v.pastDate);
    return false;
  }
  if (!params.tripTime) {
    toast.error(v.timeRequired);
    return false;
  }

  if (params.tripType === TransferTripType.RoundTrip) {
    if (!params.returnDate) {
      toast.error(v.returnDateRequired);
      return false;
    }
    if (params.returnDate < params.tripDate) {
      toast.error(v.returnDateBefore);
      return false;
    }
    if (!params.returnTime) {
      toast.error(v.returnTimeRequired);
      return false;
    }
  }

  if (!params.customerName.trim() || params.customerName.trim().length < 2) {
    toast.error(v.nameRequired);
    return false;
  }
  if (!params.countryId) {
    toast.error(v.countryRequired);
    return false;
  }
  if (!params.email.trim() || !isValidEmail(params.email)) {
    toast.error(v.validEmail);
    return false;
  }
  if (!params.phoneNumber.trim()) {
    toast.error(v.validPhone);
    return false;
  }
  if (!isValidPhoneNumber(params.phoneNumber)) {
    toast.error(v.validPhone);
    return false;
  }

  return true;
}

export function resolveVehiclePerks(
  matchData: TransferMatchResponseDto | null | undefined,
  vehicleTypes: VehicleTypeTransferItem[] | undefined
) {
  let matchedVehicle: VehicleTypeTransferItem | null = null;
  if (vehicleTypes?.length) {
    if (matchData?.vehicleTypeTransferId) {
      matchedVehicle = vehicleTypes.find((v) => v.id === matchData.vehicleTypeTransferId) || null;
    } else if (matchData?.vehicleName) {
      matchedVehicle = vehicleTypes.find((v) => v.name.toLowerCase() === matchData.vehicleName?.toLowerCase()) || null;
    }
  }

  const additionalHourRate = matchedVehicle?.additionalHours && matchedVehicle.additionalHours > 0
    ? matchedVehicle.additionalHours
    : matchData?.price?.additionalHours && matchData.price.additionalHours > 0
    ? matchData.price.additionalHoursPrice / matchData.price.additionalHours
    : 10;

  const discountPercentage = matchedVehicle?.discountPercentage && matchedVehicle.discountPercentage > 0
    ? matchedVehicle.discountPercentage
    : matchData?.price?.discountPercentage && matchData.price.discountPercentage > 0
    ? matchData.price.discountPercentage
    : 15;

  const vehicleName = matchData?.vehicleName || matchedVehicle?.name || null;

  return { matchedVehicle, additionalHourRate, discountPercentage, vehicleName };
}

export interface BuildPayloadParams {
  fromLocationId: string;
  toLocationId: string;
  adults: number;
  childrenCount: number;
  tripType: TransferTripType;
  tripDate: string;
  tripTime: string;
  returnDate?: string;
  returnTime?: string;
  customerName: string;
  countryId: string;
  email: string;
  communicationMethod: TransferCommunicationMethod;
  phoneNumber: string;
  luggageCount: number;
  notes: string;
  additionalHours: number;
}

export function buildTransferBookingPayload(params: BuildPayloadParams): CreateTransferBookingRequest {
  const isRoundTrip = params.tripType === TransferTripType.RoundTrip;
  const noteSegments: string[] = [];
  if (params.notes.trim()) noteSegments.push(params.notes.trim());
  if (params.additionalHours > 0) {
    noteSegments.push(`Additional waiting hours: ${params.additionalHours} hr(s)`);
  }

  return {
    fromLocationId: params.fromLocationId,
    toLocationId: params.toLocationId,
    adults: Number(params.adults) || 1,
    children: Number(params.childrenCount) || 0,
    tripType: params.tripType,
    tripDate: params.tripDate,
    tripTime: formatTimeToSeconds(params.tripTime),
    returnDate: isRoundTrip && params.returnDate ? params.returnDate : undefined,
    returnTime: isRoundTrip && params.returnTime ? formatTimeToSeconds(params.returnTime) : undefined,
    customerName: params.customerName.trim(),
    countryId: params.countryId,
    email: params.email.trim(),
    communicationMethod:
      Number(params.communicationMethod) === TransferCommunicationMethod.Email
        ? TransferCommunicationMethod.Email
        : TransferCommunicationMethod.WhatsApp,
    phoneNumber: sanitizePhoneNumber(params.phoneNumber),
    luggageCount: Number(params.luggageCount) || 0,
    notes: noteSegments.join(" | ") || undefined,
  };
}
