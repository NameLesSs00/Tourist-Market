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

export const GROUP_PAYMENT_METHOD_LABELS: Record<number, string> = {
  1: "Cash on Arrival",
  2: "Credit Card / Online",
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
