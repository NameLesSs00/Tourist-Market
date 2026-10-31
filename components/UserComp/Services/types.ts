export interface ServiceCardItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  badge?: string; // e.g., "For Rent"
  price?: number;
  pricePeriod?: string; // "Per Day" | "Per Hour"
  serviceType: "vip-airport" | "real-estate" | "tourist" | "car-rental";
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
  numberOfDays: string;
}

export interface ServiceReviewItem {
  id: string;
  author: string;
  date: string;
  rating: number;
  likes: number;
  content: string;
}
