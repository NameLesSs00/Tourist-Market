export interface LocalizedVehicleName {
  en: string;
  ru?: string;
  de?: string;
  fr?: string;
}

export interface VehicleTypeTransferItem {
  id: string;
  name: string;
  fromPerson: number;
  toPerson: number;
  additionalHours: number;
  discountPercentage: number;
  currency?: string;
}

export interface VehicleTypeTransferDetails {
  id: string;
  name: string;
  fromPerson: number;
  toPerson: number;
  additionalHours: number;
  discountPercentage: number;
  currency?: string;
}

export interface CreateVehicleTypeTransferRequest {
  name: LocalizedVehicleName;
  fromPerson: number;
  toPerson: number;
  additionalHoursUsd: number;
  discountPercentage: number;
}

export interface UpdateVehicleTypeTransferRequest {
  name: LocalizedVehicleName;
  fromPerson: number;
  toPerson: number;
  additionalHoursUsd: number;
  discountPercentage: number;
}

export interface VehicleTypeTransferQueryParams {
  pageNumber?: number;
  pageSize?: number;
  currency?: string;
  lang?: string;
}

export interface PagedVehicleTypeTransfersResult {
  items: VehicleTypeTransferItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

