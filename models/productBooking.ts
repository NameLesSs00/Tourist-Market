export enum BookingStatus {
  Pending = 1,
  Confirmed = 2,
  Completed = 3,
  Cancelled = 4,
}

export interface ProductBookingLineItem {
  id: string;
  productId: number;
  productName: string;
  productTitle: string;
  quantity: number;
  unitPriceUsd: number;
  lineSubtotalUsd: number;
  discountAmountUsd: number;
  lineTotalUsd: number;
  unitPriceDisplay: number | null;
  lineTotalDisplay: number | null;
}

export interface ProductBookingItem {
  bookingId: string;
  bookingReference: string;
  bookingType: string;
  customerName: string;
  phoneNumber: string;
  email: string;
  countryId?: string;
  hotelName: string;
  roomNo?: string;
  address: string;
  communicationMethod?: string;
  notes: string;
  bookingDate: string;
  status: BookingStatus;
  statusName: string;
  subtotalUsd: number;
  discountAmountUsd: number;
  finalPriceUsd: number;
  currency: string;
  exchangeRate: number;
  displayFinalPrice: number;
  items: ProductBookingLineItem[];
}

export interface ProductBookingQueryParams {
  search?: string;
  email?: string;
  phoneNumber?: string;
  status?: BookingStatus;
  fromDate?: string;
  toDate?: string;
  currency?: string;
  sortBy?: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface PagedProductBookingsResult {
  items: ProductBookingItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface CreateProductBookingItemRequest {
  productId: number;
  quantity: number;
}

export interface CreateProductBookingRequest {
  customerName: string;
  phoneNumber: string;
  email: string;
  countryId?: string;
  hotelName: string;
  roomNo: string;
  address: string;
  communicationMethod?: string;
  notes?: string;
  items: CreateProductBookingItemRequest[];
}

export interface UpdateBookingStatusRequest {
  status: BookingStatus;
}
