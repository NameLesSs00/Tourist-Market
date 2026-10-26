import apiClient from "./apiConfig";
import {
  ServicesBookingType,
  type PagedServicesBookingsResult,
  type RealEstateBookingItem,
  type TouristServiceBookingItem,
  type CarRentalBookingItem,
  type VipHurghadaBookingItem,
  type ServicesBookingItem,
  type ServicesBookingQueryParams,
  type UpdateServicesBookingStatusRequest,
} from "@/models/servicesBooking";

function toQueryParams(params: ServicesBookingQueryParams = {}): Record<string, string | number> {
  const query: Record<string, string | number> = {};
  if (params.subServiceId?.trim()) query.subServiceId = params.subServiceId.trim();
  if (params.status !== undefined && params.status !== null) query.status = Number(params.status);
  if (params.fromDate?.trim()) query.fromDate = params.fromDate.trim();
  if (params.toDate?.trim()) query.toDate = params.toDate.trim();
  query.pageNumber = params.pageNumber ?? 1;
  query.pageSize = params.pageSize ?? 10;
  return query;
}

function unwrapPaged<T extends ServicesBookingItem>(data: unknown): PagedServicesBookingsResult<T> {
  const raw = data as { data?: PagedServicesBookingsResult<T>; items?: T[] };
  if (raw?.data?.items) return raw.data;
  if (raw?.items) return raw as PagedServicesBookingsResult<T>;
  return {
    items: [],
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  };
}

function unwrapItem<T>(data: unknown): T {
  const raw = data as { data?: T };
  return (raw?.data ?? raw) as T;
}

export async function getRealEstateBookings(
  params?: ServicesBookingQueryParams
): Promise<PagedServicesBookingsResult<RealEstateBookingItem>> {
  const { data } = await apiClient.get("/services/bookings/real-estate", {
    params: toQueryParams(params),
  });
  return unwrapPaged<RealEstateBookingItem>(data);
}

export async function getTouristServiceBookings(
  params?: ServicesBookingQueryParams
): Promise<PagedServicesBookingsResult<TouristServiceBookingItem>> {
  const { data } = await apiClient.get("/services/bookings/tourist-service", {
    params: toQueryParams(params),
  });
  return unwrapPaged<TouristServiceBookingItem>(data);
}

export async function getCarRentalBookings(
  params?: ServicesBookingQueryParams
): Promise<PagedServicesBookingsResult<CarRentalBookingItem>> {
  const { data } = await apiClient.get("/services/bookings/car-rental", {
    params: toQueryParams(params),
  });
  return unwrapPaged<CarRentalBookingItem>(data);
}

export async function getVipHurghadaBookings(
  params?: ServicesBookingQueryParams
): Promise<PagedServicesBookingsResult<VipHurghadaBookingItem>> {
  const { data } = await apiClient.get("/services/bookings/vip-hurghada", {
    params: toQueryParams(params),
  });
  return unwrapPaged<VipHurghadaBookingItem>(data);
}

export async function getServicesBookingsByType(
  type: ServicesBookingType,
  params?: ServicesBookingQueryParams
): Promise<PagedServicesBookingsResult<ServicesBookingItem>> {
  switch (type) {
    case ServicesBookingType.RealEstate:
      return getRealEstateBookings(params);
    case ServicesBookingType.TouristService:
      return getTouristServiceBookings(params);
    case ServicesBookingType.CarRental:
      return getCarRentalBookings(params);
    case ServicesBookingType.VipHurghada:
      return getVipHurghadaBookings(params);
  }
}

export async function getServicesBookingById(
  type: ServicesBookingType,
  id: string
): Promise<ServicesBookingItem> {
  const endpointMap: Record<ServicesBookingType, string> = {
    [ServicesBookingType.RealEstate]: "real-estate",
    [ServicesBookingType.TouristService]: "tourist-service",
    [ServicesBookingType.CarRental]: "car-rental",
    [ServicesBookingType.VipHurghada]: "vip-hurghada",
  };
  const { data } = await apiClient.get(`/services/bookings/${endpointMap[type]}/${id}`);
  return unwrapItem<ServicesBookingItem>(data);
}

export async function updateServicesBookingStatus(
  payload: UpdateServicesBookingStatusRequest
): Promise<ServicesBookingItem> {
  const { data } = await apiClient.patch(
    `/services/bookings/${payload.bookingId}/status`,
    {
      bookingId: payload.bookingId,
      newStatus: payload.newStatus,
      reason: payload.reason || undefined,
    }
  );
  return unwrapItem<ServicesBookingItem>(data);
}
