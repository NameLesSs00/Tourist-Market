import type { ServiceSectionSlug } from "@/shared/utils/serviceItemUrl";

/**
 * The service sections, aliased to the shared route-segment union so a section slug
 * can be handed to serviceItemHref() without a cast and the two never drift apart.
 */
export type ServiceType = ServiceSectionSlug;

export interface ServiceCardItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  badge?: string; // e.g., "For Rent"
  price?: number;
  pricePeriod?: string; // "Per Day" | "Per Hour"
  priceFormatted?: string;
  keyFeatures?: string[];
  serviceType: ServiceType;
}

export interface ServiceSpecification {
  label: string;
  value: string;
}

export interface ServiceOptionTier {
  key: string;
  value: string;
}

export interface ServiceOptionGroup {
  name: string;
  tiers: ServiceOptionTier[];
}

export interface ServiceDetailItem extends ServiceCardItem {
  modelYear?: string;
  transmission?: string;
  airConditioning?: string;
  tagline?: string;
  detailedDescription?: string;
  availableLanguages?: string[];
  costServices?: string[];
  notes?: string[];
  priceFormatted: string; // "$110" or "$10"
  billingPeriod: string; // "Per Day" or "Per Hour"
  bookingButtonText: string; // "Book This Car ↓" or "Book This Service ↓"
  formTitle: string; // "Car Rental" | "VIP Services" | "Real Estate" | "Tourist Services"
  formSubtitle: string; // "Mercedes Benz" | "VIP Lounge" etc.
  galleryImages?: string[];
  alert?: string;
  specifications?: ServiceSpecification[];
  optionsTiers?: ServiceOptionGroup[];
  inclusions?: string[];
}

export interface ServiceBookingFormData {
  name: string;
  country: string;
  hotel: string;
  roomNumber: string;
  phoneNumber: string;
  emailAddress: string;
  communicationMethod: string;
  serviceSelection?: string;
  translatorLanguage?: string;
  date: string;
  endDate?: string;
  flightNumber?: string;
  departureTime?: string;
  passengers?: string;
  destination?: string;
  specialRequests?: string;
}
