export interface TransferVehiclePriceItem {
  id: string;
  vehicleTypeTransferId: string;
  vehicleTypeName: string;
  fromId: string;
  fromLocation: string;
  toId: string;
  toLocation: string;
  priceUsd: number;
  displayCurrency: string;
  displayPrice: number;
  displayCurrencySymbol: string;
  additionalHours: number;
  discountPercentage: number;
}

export interface CreateTransferVehiclePriceRequest {
  vehicleTypeTransferId: string;
  fromId: string;
  toId: string;
  priceUsd: number;
}

export interface UpdateTransferVehiclePriceRequest {
  vehicleTypeTransferId: string;
  fromId: string;
  toId: string;
  priceUsd: number;
}

export interface TransferVehiclePriceQueryParams {
  VehicleTypeTransferId?: string;
  MinPrice?: number;
  MaxPrice?: number;
  DisplayCurrency?: string;
  Lang?: string;
  PageNumber?: number;
  PageSize?: number;
  SortBy?: string;
  SortDirection?: string;
}

export interface PagedTransferVehiclePricesResult {
  items: TransferVehiclePriceItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

