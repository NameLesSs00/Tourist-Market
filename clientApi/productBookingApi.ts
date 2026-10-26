import apiClient from "./apiConfig";
import type {
  CreateProductBookingRequest,
  PagedProductBookingsResult,
  ProductBookingItem,
  ProductBookingQueryParams,
  BookingStatus,
} from "@/models/productBooking";

export async function getProductBookings(
  params: ProductBookingQueryParams = {}
): Promise<PagedProductBookingsResult> {
  const queryParams: Record<string, string | number> = {};

  if (params.search?.trim()) queryParams.Search = params.search.trim();
  if (params.email?.trim()) queryParams.Email = params.email.trim();
  if (params.phoneNumber?.trim()) queryParams.PhoneNumber = params.phoneNumber.trim();
  if (params.status !== undefined && params.status !== null) {
    queryParams.Status = Number(params.status);
  }
  if (params.fromDate?.trim()) queryParams.FromDate = params.fromDate.trim();
  if (params.toDate?.trim()) queryParams.ToDate = params.toDate.trim();
  if (params.currency?.trim()) queryParams.Currency = params.currency.trim();
  if (params.sortBy?.trim()) queryParams.SortBy = params.sortBy.trim();
  queryParams.PageNumber = params.pageNumber ?? 1;
  queryParams.PageSize = params.pageSize ?? 10;

  const { data } = await apiClient.get<PagedProductBookingsResult>(
    "/product-bookings",
    { params: queryParams }
  );

  const raw = data as any;
  if (raw?.items) return raw as PagedProductBookingsResult;
  if (raw?.data?.items) return raw.data as PagedProductBookingsResult;
  return raw as PagedProductBookingsResult;
}

export async function getProductBookingById(
  id: string,
  currency?: string
): Promise<ProductBookingItem> {
  const params: Record<string, string> = {};
  if (currency?.trim()) params.currency = currency.trim();

  const { data } = await apiClient.get<ProductBookingItem>(
    `/product-bookings/${id}`,
    { params }
  );

  const raw = data as any;
  if (raw?.bookingId) return raw as ProductBookingItem;
  if (raw?.data?.bookingId) return raw.data as ProductBookingItem;
  return raw as ProductBookingItem;
}

export async function createProductBooking(
  payload: CreateProductBookingRequest
): Promise<ProductBookingItem> {
  const { data } = await apiClient.post<ProductBookingItem>(
    "/product-bookings",
    payload
  );
  const raw = data as any;
  return (raw?.data || raw) as ProductBookingItem;
}

export async function updateProductBookingStatus(
  id: string,
  status: BookingStatus
): Promise<void> {
  await apiClient.patch(`/product-bookings/${id}/status`, { status });
}

export async function cancelProductBooking(
  id: string
): Promise<{ message: string }> {
  const { data } = await apiClient.post<{ message: string }>(
    `/product-bookings/${id}/cancel`,
    {}
  );
  return data;
}
