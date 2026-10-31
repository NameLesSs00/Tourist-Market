export enum TransferBookingStatus {
  Pending = 1,
  Confirmed = 2,
  Completed = 3,
  Cancelled = 4,
}

export enum TransferTripType {
  OneWay = 1,
  RoundTrip = 2,
}

export enum TransferCommunicationMethod {
  Email = 1,
  WhatsApp = 2,
  Viber = 3,
  Phone = 4,
}

export interface TransferBookingItem {
  id: string;
  fromLocationId: string;
  toLocationId: string;
  adults: number;
  children: number;
  tripType: TransferTripType;
  vehicleType: number | string;
  tripDate: string;
  tripTime: string;
  customerName: string;
  countryId: string;
  email: string;
  communicationMethod: TransferCommunicationMethod;
  phoneNumber: string;
  luggageCount: number;
  notes?: string;
  totalPrice: number;
  status: TransferBookingStatus;
  createdAt: string;
}

export interface TransferBookingPreviewParams {
  fromLocationId: string;
  toLocationId: string;
  adults: number;
  children?: number;
  tripType: number;
}

export interface TransferBookingPreviewResult {
  vehicleType: string | number;
  totalPrice: number;
}

export const TRANSFER_BOOKING_STATUS_LABELS: Record<TransferBookingStatus, string> = {
  [TransferBookingStatus.Pending]: "Pending",
  [TransferBookingStatus.Confirmed]: "Confirmed",
  [TransferBookingStatus.Completed]: "Completed",
  [TransferBookingStatus.Cancelled]: "Cancelled",
};

export const TRANSFER_BOOKING_STATUS_STYLES: Record<
  TransferBookingStatus,
  { bg: string; text: string; border: string; dot: string }
> = {
  [TransferBookingStatus.Pending]: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
  [TransferBookingStatus.Confirmed]: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },
  [TransferBookingStatus.Completed]: {
    bg: "bg-sky-50",
    text: "text-sky-700",
    border: "border-sky-200",
    dot: "bg-sky-500",
  },
  [TransferBookingStatus.Cancelled]: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    dot: "bg-rose-500",
  },
};

export const TRANSFER_TRIP_TYPE_LABELS: Record<TransferTripType, string> = {
  [TransferTripType.OneWay]: "One-Way",
  [TransferTripType.RoundTrip]: "Round-Trip",
};

export const TRANSFER_COMMUNICATION_LABELS: Record<TransferCommunicationMethod, string> = {
  [TransferCommunicationMethod.Email]: "Email",
  [TransferCommunicationMethod.WhatsApp]: "WhatsApp",
  [TransferCommunicationMethod.Viber]: "Viber",
  [TransferCommunicationMethod.Phone]: "Phone",
};

export function formatTransferVehicleType(type: number | string): string {
  if (typeof type === "string" && type.trim()) return type;
  const num = Number(type);
  if (num === 0) return "Car (1-3 pax)";
  if (num === 1) return "Microbus (4-9 pax)";
  if (num === 2) return "Minibus (10-16 pax)";
  if (num === 3) return "Bus (17-35 pax)";
  return "Private Vehicle";
}

export interface CreateTransferBookingRequest {
  fromLocationId: string;
  toLocationId: string;
  adults: number;
  children: number;
  tripType: TransferTripType;
  tripDate: string;
  tripTime: string;
  customerName: string;
  countryId: string;
  email: string;
  communicationMethod: TransferCommunicationMethod;
  phoneNumber: string;
  luggageCount: number;
  notes?: string;
}

export interface CreateTransferBookingResponse {
  message?: string;
  totalPrice?: number;
  paymentMessage?: string;
}
