import type {
  TransferCommunicationMethod,
  TransferTripType,
} from "@/models/transferBooking";

export interface TransferFormData {
  fromLocationId: string;
  toLocationId: string;
  adults: number;
  children: number;
  tripType: TransferTripType;
  tripDate: string;
  tripTime: string;
  customerName: string;
  countryId: string;
  email: string;
  communicationMethod: TransferCommunicationMethod;
  phoneNumber: string;
  luggageCount: number;
  notes: string;
}

export interface ReviewComment {
  id: string;
  author: string;
  date: string;
  rating: number;
  likes: number;
  content: string;
}

export interface RatingDistribution {
  star: number;
  percentage: number;
  count: number;
}
