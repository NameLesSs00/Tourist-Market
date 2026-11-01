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

export function validateTransferBookingFields(params: ValidateTransferParams): boolean {
  if (!params.fromLocationId) {
    toast.error("Please select a pickup location (From).");
    return false;
  }
  if (!params.toLocationId) {
    toast.error("Please select a destination (To).");
    return false;
  }
  if (params.fromLocationId === params.toLocationId) {
    toast.error("Pickup and destination locations cannot be the same.");
    return false;
  }
  if (!params.tripDate) {
    toast.error("Please select a trip date.");
    return false;
  }
  const todayStr = new Date().toISOString().split("T")[0];
  if (params.tripDate < todayStr) {
    toast.error("Trip date cannot be in the past.");
    return false;
  }
  if (!params.tripTime) {
    toast.error("Please select a trip time.");
    return false;
  }

  if (params.tripType === TransferTripType.RoundTrip) {
    if (!params.returnDate) {
      toast.error("Please select a return trip date.");
      return false;
    }
    if (params.returnDate < params.tripDate) {
      toast.error("Return date cannot be earlier than outbound trip date.");
      return false;
    }
    if (!params.returnTime) {
      toast.error("Please select a return trip time.");
      return false;
    }
  }

  if (!params.customerName.trim() || params.customerName.trim().length < 2) {
    toast.error("Please enter your full name (at least 2 characters).");
    return false;
  }
  if (!params.countryId) {
    toast.error("Please select your country.");
    return false;
  }
  if (!params.email.trim() || !isValidEmail(params.email)) {
    toast.error("Please provide a valid email address.");
    return false;
  }
  if (!params.phoneNumber.trim()) {
    toast.error("Please provide your phone number.");
    return false;
  }
  if (!isValidPhoneNumber(params.phoneNumber)) {
    toast.error("Please provide a valid phone number (7 to 15 digits).");
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
