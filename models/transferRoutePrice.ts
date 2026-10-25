export enum VehicleType {
  Car = 1,
  Microbus = 2,
  Minibus = 3,
  Bus = 4,
  StandardSedan = 5,
  VipSedan = 6,
  Minivan = 7,
  CoasterBus = 8,
}

export interface VehicleTypeConfig {
  value: VehicleType;
  label: string;
  shortLabel: string;
  passengerRange: string;
  capacityHint: string;
  minPassengers: number;
  maxPassengers: number;
  badgeColor: string;
}

export const VEHICLE_TYPE_CONFIGS: Record<number, VehicleTypeConfig> = {
  0: {
    value: VehicleType.Car,
    label: "Car",
    shortLabel: "Car",
    passengerRange: "1–3 Passengers",
    capacityHint: "1 to 3 passengers",
    minPassengers: 1,
    maxPassengers: 3,
    badgeColor: "bg-teal-50 text-teal-800 border-teal-200",
  },
  [VehicleType.Car]: {
    value: VehicleType.Car,
    label: "Car",
    shortLabel: "Car",
    passengerRange: "1–3 Passengers",
    capacityHint: "1 to 3 passengers",
    minPassengers: 1,
    maxPassengers: 3,
    badgeColor: "bg-teal-50 text-teal-800 border-teal-200",
  },
  [VehicleType.Microbus]: {
    value: VehicleType.Microbus,
    label: "Microbus",
    shortLabel: "Microbus",
    passengerRange: "4–9 Passengers",
    capacityHint: "4 to 9 passengers",
    minPassengers: 4,
    maxPassengers: 9,
    badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
  },
  [VehicleType.Minibus]: {
    value: VehicleType.Minibus,
    label: "Minibus",
    shortLabel: "Minibus",
    passengerRange: "10–16 Passengers",
    capacityHint: "10 to 16 passengers",
    minPassengers: 10,
    maxPassengers: 16,
    badgeColor: "bg-indigo-50 text-indigo-800 border-indigo-200",
  },
  [VehicleType.Bus]: {
    value: VehicleType.Bus,
    label: "Bus",
    shortLabel: "Bus",
    passengerRange: "17–35 Passengers",
    capacityHint: "17 to 35 passengers",
    minPassengers: 17,
    maxPassengers: 35,
    badgeColor: "bg-purple-50 text-purple-800 border-purple-200",
  },
  [VehicleType.StandardSedan]: {
    value: VehicleType.StandardSedan,
    label: "Standard Sedan",
    shortLabel: "Sedan",
    passengerRange: "1–3 Passengers",
    capacityHint: "1 to 3 passengers",
    minPassengers: 1,
    maxPassengers: 3,
    badgeColor: "bg-teal-50 text-teal-800 border-teal-200",
  },
  [VehicleType.VipSedan]: {
    value: VehicleType.VipSedan,
    label: "VIP Sedan",
    shortLabel: "VIP",
    passengerRange: "1–3 Passengers",
    capacityHint: "1 to 3 passengers",
    minPassengers: 1,
    maxPassengers: 3,
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
  },
  [VehicleType.Minivan]: {
    value: VehicleType.Minivan,
    label: "Minivan",
    shortLabel: "Minivan",
    passengerRange: "4–7 Passengers",
    capacityHint: "4 to 7 passengers",
    minPassengers: 4,
    maxPassengers: 7,
    badgeColor: "bg-cyan-50 text-cyan-800 border-cyan-200",
  },
  [VehicleType.CoasterBus]: {
    value: VehicleType.CoasterBus,
    label: "Coaster Bus",
    shortLabel: "Coaster",
    passengerRange: "18–26 Passengers",
    capacityHint: "18 to 26 passengers",
    minPassengers: 18,
    maxPassengers: 26,
    badgeColor: "bg-violet-50 text-violet-800 border-violet-200",
  },
};

export const VEHICLE_TYPE_LIST: VehicleTypeConfig[] = [
  VEHICLE_TYPE_CONFIGS[VehicleType.Car],
  VEHICLE_TYPE_CONFIGS[VehicleType.Microbus],
  VEHICLE_TYPE_CONFIGS[VehicleType.Minibus],
  VEHICLE_TYPE_CONFIGS[VehicleType.Bus],
  VEHICLE_TYPE_CONFIGS[VehicleType.StandardSedan],
  VEHICLE_TYPE_CONFIGS[VehicleType.VipSedan],
  VEHICLE_TYPE_CONFIGS[VehicleType.Minivan],
  VEHICLE_TYPE_CONFIGS[VehicleType.CoasterBus],
];

export function getVehicleTypeLabel(vehicleType: VehicleType | number | string): string {
  const num = Number(vehicleType);
  const cfg = VEHICLE_TYPE_CONFIGS[num] ?? VEHICLE_TYPE_CONFIGS[VehicleType.Car];
  return cfg ? `${cfg.label} (${cfg.passengerRange})` : "Car (1–3 Passengers)";
}

export interface TransferRoutePriceItem {
  id: string;
  fromLocationId: string;
  fromLocationName: string | null;
  toLocationId: string;
  toLocationName: string | null;
  vehicleType: VehicleType | number;
  priceUsd: number;
  isActive: boolean;
  displayCurrency: string;
  displayPrice: number;
  displayCurrencySymbol: string;
}

export interface TransferRoutePriceUpsertRequest {
  fromLocationId: string;
  toLocationId: string;
  vehicleType: VehicleType | number;
  priceUsd: number;
  isActive: boolean;
}

export interface TransferRoutePriceQueryParams {
  fromLocationId?: string;
  toLocationId?: string;
  vehicleType?: VehicleType | number;
  isActive?: boolean;
  minPrice?: number;
  maxPrice?: number;
  displayCurrency?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
}

export interface PagedTransferRoutePricesResult {
  items: TransferRoutePriceItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
