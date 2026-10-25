export interface VehicleTransferPrivateItem {
  id: string;
  privateExcursionId: string;
  vehiclePrivateId: string;
  vehicleName: string;
  from: number;
  to: number;
  priceUSD: number;
  price: number;
  currency: string;
  exchangeRate: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface VehicleTransferPrivateCreateRequest {
  privateExcursionId: string;
  vehiclePrivateId: string;
  from: number;
  to: number;
  priceUSD: number;
}

export interface VehicleTransferPrivateUpdateRequest {
  privateExcursionId: string;
  vehiclePrivateId: string;
  from: number;
  to: number;
  priceUSD: number;
  isActive: boolean;
}

export interface VehicleTransferPrivateQueryParams {
  privateExcursionId?: string;
  vehiclePrivateId?: string;
  passengerCount?: number;
  isActive?: boolean;
  pageNumber?: number;
  pageSize?: number;
  lang?: string;
  currency?: string;
}

export interface VehicleTransferMatchParams {
  privateExcursionId: string;
  passengerCount: number;
  lang?: string;
  currency?: string;
}

export interface PagedVehicleTransferPrivateData {
  items: VehicleTransferPrivateItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PagedVehicleTransferPrivateResult {
  success: boolean;
  isSuccess: boolean;
  message: string | null;
  data: PagedVehicleTransferPrivateData;
  errors: string[] | null;
}
