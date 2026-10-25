export enum PrivateBookingStatus {
  Pending = 1,
  Confirmed = 2,
  Completed = 3,
  Cancelled = 4,
}

export const PRIVATE_BOOKING_STATUS_LABELS: Record<PrivateBookingStatus, string> = {
  [PrivateBookingStatus.Pending]: "Pending",
  [PrivateBookingStatus.Confirmed]: "Confirmed",
  [PrivateBookingStatus.Completed]: "Completed",
  [PrivateBookingStatus.Cancelled]: "Cancelled",
};

export const PRIVATE_PAYMENT_METHOD_LABELS: Record<number, string> = {
  1: "Cash on Arrival",
  2: "Credit Card / Online",
};

export interface PrivateBookingSelectedAttraction {
  attractionId: string;
  title: string;
  adultPrice: number;
  childPrice: number;
  infantPrice: number;
  totalPrice: number;
}

export interface PrivateBookingSelectedService {
  serviceId: string;
  title: string;
  adultPrice: number;
  childPrice: number;
  infantPrice: number;
  totalPrice: number;
}

export interface PrivateBookingExcursionLineItem {
  id: string;
  excursionId: string;
  excursionTitle: string;
  excursionDate: string;
  adultsCount: number;
  childrenCount: number;
  infantsCount: number;
  totalPassengers: number;
  basePrice?: number;
  vehicleTransferPrivateId?: string;
  vehiclePrivateId?: string;
  vehicleName: string;
  vehicleFrom: number;
  vehicleTo: number;
  vehiclePrice: number;
  maxAttractions: number;
  servicesTotal: number;
  itemTotal: number;
  selectedAttractions: PrivateBookingSelectedAttraction[];
  selectedServices: PrivateBookingSelectedService[];
}

export interface PrivateBookingItem {
  id: string;
  bookingReference: string;
  customerName: string;
  customerPhone: string;
  customerWhatsApp: string;
  hotelName: string;
  roomNumber: string;
  bookingStatus: PrivateBookingStatus;
  paymentMethod: number;
  currencyCode: string;
  exchangeRate: number;
  totalAmountUsd: number;
  notes?: string;
  createdAt: string;
  items: PrivateBookingExcursionLineItem[];
}

export interface CreatePrivateBookingExcursionItem {
  excursionId: string;
  excursionDate: string;
  adultsCount: number;
  childrenCount: number;
  infantsCount: number;
  serviceIds?: string[];
  attractionIds?: string[];
}

export interface CreatePrivateBookingRequest {
  customerName: string;
  phone: string;
  whatsApp: string;
  hotelName: string;
  roomNumber: string;
  paymentMethod: number;
  notes?: string;
  excursions: CreatePrivateBookingExcursionItem[];
}

export interface CreatePrivateBookingResponse {
  bookingId: string;
  bookingReference: string;
  totalPrice: number;
  currency: string;
  message: string;
}

export interface PrivateBookingQueryParams {
  excursionId?: string;
  status?: PrivateBookingStatus;
  fromDate?: string;
  toDate?: string;
  customerName?: string;
  phone?: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface PagedPrivateBookingsResult {
  items: PrivateBookingItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
