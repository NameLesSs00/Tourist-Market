export interface CartContactFormData {
  name: string;
  email: string;
  country: string;
  countryId?: string;
  phoneNumber: string;
  communicationMethod: string;
}

export interface CartDeliveryFormData {
  hotelName: string;
  roomNumber: string;
  hotelArea: string;
  deliveryProductId?: number;
  deliveryDate: string;
  deliveryTime: string;
  notes: string;
  agreedToTerms: boolean;
}
