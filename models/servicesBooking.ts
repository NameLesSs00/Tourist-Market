export enum ServicesBookingStatus {
  Pending = 1,
  Confirmed = 2,
  Completed = 3,
  Cancelled = 4,
}

export enum ServicesBookingType {
  RealEstate = 1,
  TouristService = 2,
  CarRental = 3,
  VipHurghada = 4,
}

export enum ServicesCommunicationMethod {
  Email = 1,
  WhatsApp = 2,
  Viber = 3,
  Phone = 4,
}

export enum ServicesGuideLanguage {
  English = 1,
  Russian = 2,
  German = 3,
  French = 4,
}

export interface BaseServicesBookingItem {
  id: string;
  name: string;
  country: string;
  hotel: string;
  roomNo: string;
  emailAddress: string;
  subServiceId: string;
  subServiceTitle: string;
  bookingType: ServicesBookingType;
  status: ServicesBookingStatus;
  createdAt: string;
  communicationMethod: ServicesCommunicationMethod;
  note?: string;
}

export interface RealEstateBookingItem extends BaseServicesBookingItem {
  bookingType: ServicesBookingType.RealEstate;
}

export interface TouristServiceBookingItem extends BaseServicesBookingItem {
  bookingType: ServicesBookingType.TouristService;
  guideLanguage: ServicesGuideLanguage;
  date: string;
  timeFrom: string;
  timeTo: string;
}

export interface CarRentalBookingItem extends BaseServicesBookingItem {
  bookingType: ServicesBookingType.CarRental;
  date: string;
  numberOfDays: number;
}

export interface VipHurghadaBookingItem extends BaseServicesBookingItem {
  bookingType: ServicesBookingType.VipHurghada;
  flightNumber: string;
  departureTime: string;
  noOfPersons: number;
  destinationTo: string;
}

export type ServicesBookingItem =
  | RealEstateBookingItem
  | TouristServiceBookingItem
  | CarRentalBookingItem
  | VipHurghadaBookingItem;

export interface ServicesBookingQueryParams {
  subServiceId?: string;
  status?: ServicesBookingStatus;
  fromDate?: string;
  toDate?: string;
  pageNumber?: number;
  pageSize?: number;
  search?: string;
}

export interface PagedServicesBookingsResult<T extends BaseServicesBookingItem = ServicesBookingItem> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface UpdateServicesBookingStatusRequest {
  bookingId: string;
  newStatus: ServicesBookingStatus;
  reason?: string;
}

export const SERVICES_BOOKING_STATUS_LABELS: Record<ServicesBookingStatus, string> = {
  [ServicesBookingStatus.Pending]: "Pending",
  [ServicesBookingStatus.Confirmed]: "Confirmed",
  [ServicesBookingStatus.Completed]: "Completed",
  [ServicesBookingStatus.Cancelled]: "Cancelled",
};

export const SERVICES_COMMUNICATION_METHOD_LABELS: Record<ServicesCommunicationMethod, string> = {
  [ServicesCommunicationMethod.Email]: "Email",
  [ServicesCommunicationMethod.WhatsApp]: "WhatsApp",
  [ServicesCommunicationMethod.Viber]: "Viber",
  [ServicesCommunicationMethod.Phone]: "Phone",
};

export const SERVICES_GUIDE_LANGUAGE_LABELS: Record<ServicesGuideLanguage, string> = {
  [ServicesGuideLanguage.English]: "English",
  [ServicesGuideLanguage.Russian]: "Russian",
  [ServicesGuideLanguage.German]: "German",
  [ServicesGuideLanguage.French]: "French",
};

export const SERVICES_BOOKING_TYPE_LABELS: Record<ServicesBookingType, string> = {
  [ServicesBookingType.RealEstate]: "Real Estate",
  [ServicesBookingType.TouristService]: "Tourist Service",
  [ServicesBookingType.CarRental]: "Car Rental",
  [ServicesBookingType.VipHurghada]: "VIP Hurghada",
};
