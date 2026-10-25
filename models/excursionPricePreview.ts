export interface PreviewAttractionItem {
  attractionId: string;
  title: string;
  adultPricePerPerson: number;
  childPricePerPerson: number;
  infantPricePerPerson: number;
  itemTotal: number;
}

export interface PreviewServiceItem {
  serviceId: string;
  title: string;
  adultPricePerPerson: number;
  childPricePerPerson: number;
  infantPricePerPerson: number;
  itemTotal: number;
}

export interface PreviewPrivatePriceRequest {
  adults: number;
  children: number;
  infants: number;
  selectedAttractionIds?: string[];
  selectedServiceIds?: string[];
  currency?: string;
}

export interface PreviewPrivatePriceResponse {
  excursionId: string;
  excursionType: string;
  currency: string;
  adults: number;
  children: number;
  infants: number;
  totalPassengers: number;
  vehicleType: string;
  baseExcursionPrice: number;
  attractionsTotal: number;
  attractionItems?: PreviewAttractionItem[];
  servicesTotal: number;
  serviceItems?: PreviewServiceItem[];
  subtotalBeforeDiscount: number;
  finalPrice: number;
}

export interface PreviewGroupPriceRequest {
  adults: number;
  children: number;
  infants: number;
  currency?: string;
}

export interface PreviewGroupPriceResponse {
  excursionId: string;
  excursionType: string;
  currency: string;
  adults: number;
  children: number;
  infants: number;
  totalPassengers: number;
  adultPricePerPerson: number;
  childPricePerPerson: number;
  infantPricePerPerson: number;
  finalPrice: number;
}
