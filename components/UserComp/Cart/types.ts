export interface CartContactFormData {
  name: string;
  email: string;
  country: string;
  phoneNumber: string;
  communicationMethod: string;
}

export interface CartDeliveryFormData {
  hotelName: string;
  roomNumber: string;
  hotelArea: string;
  deliveryDate: string;
  deliveryTime: string;
  notes: string;
  agreedToTerms: boolean;
}

