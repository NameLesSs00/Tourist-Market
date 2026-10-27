export enum GroupBookingStatus {
  Pending = 1,
  Confirmed = 2,
  Completed = 3,
  Cancelled = 4,
}

export const GROUP_BOOKING_STATUS_LABELS: Record<GroupBookingStatus, string> = {
  [GroupBookingStatus.Pending]: "Pending",
  [GroupBookingStatus.Confirmed]: "Confirmed",
  [GroupBookingStatus.Completed]: "Completed",
  [GroupBookingStatus.Cancelled]: "Cancelled",
};

export enum GroupPaymentMethod {
  CashOnArrival = 1,
  WhatsAppDirect = 2,
}

export const GROUP_PAYMENT_METHOD_LABELS: Record<GroupPaymentMethod | number, string> = {
  [GroupPaymentMethod.CashOnArrival]: "Cash on Arrival",
  [GroupPaymentMethod.WhatsAppDirect]: "WhatsApp Direct",
};

export interface GroupBookingExcursionLineItem {
  id: string;
  excursionId: string;
  excursionTitle: string;
  excursionDate: string;
  adultsCount: number;
  childrenCount: number;
  infantsCount: number;
  /** Ignored in UI per requirement; to be removed by backend */
  basePrice?: number;
  itemTotal: number;
}

export interface GroupBookingItem {
  id: string;
  bookingReference: string;
  customerName: string;
  customerPhone: string;
  customerWhatsApp: string;
  hotelName: string;
  roomNumber: string;
  bookingStatus: GroupBookingStatus;
  paymentMethod: number;
  currencyCode: string;
  exchangeRate: number;
  totalAmountUsd: number;
  notes?: string;
  createdAt: string;
  items: GroupBookingExcursionLineItem[];
}

export interface GroupBookingQueryParams {
  excursionId?: string;
  status?: GroupBookingStatus;
  fromDate?: string;
  toDate?: string;
  customerName?: string;
  phone?: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface PagedGroupBookingsResult {
  items: GroupBookingItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface GroupBookingStatusUpdateRequest {
  status: GroupBookingStatus;
}

export interface CreateGroupBookingExcursionItem {
  excursionId: string;
  excursionDate: string;
  adultsCount: number;
  childrenCount: number;
  infantsCount: number;
}

export interface CreateGroupBookingRequest {
  customerName: string;
  phone: string;
  whatsApp: string;
  hotelName: string;
  roomNumber: string;
  paymentMethod: number;
  notes?: string;
  excursions: CreateGroupBookingExcursionItem[];
}

export interface CreateGroupBookingResponse {
  bookingId: string;
  bookingReference: string;
  totalPrice: number;
  currency: string;
  message: string;
}
