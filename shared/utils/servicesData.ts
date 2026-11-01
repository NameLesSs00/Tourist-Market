import { getDictionary } from "@/shared/utils/getDictionary";

export interface ServiceItem {
  id: string;
  title: string;
  image: string;
  floatingImage: string;
  href: string;
  alt: string;
}

export function getServicesData(locale = "en"): ServiceItem[] {
  const dict = getDictionary(locale);
  const items = dict.services.items;

  return [
    {
      id: "hotel-deliveries",
      title: items.hotelDeliveries.title,
      image: "/homepage/services/HotelDeliveriesM.jpg",
      floatingImage: "/homepage/services/HotelDeliveriesC.png",
      href: `/${locale}/hotel-deliveries`,
      alt: items.hotelDeliveries.alt,
    },
    {
      id: "tourist-services",
      title: items.touristServices.title,
      image: "/homepage/services/TouristServicesM.jpg",
      floatingImage: "/homepage/services/TouristServicesC.png",
      href: `/${locale}/services/tourist`,
      alt: items.touristServices.alt,
    },
    {
      id: "red-sea-real-estate",
      title: items.realEstate.title,
      image: "/homepage/services/RealEstateM.jpg",
      floatingImage: "/homepage/services/Real EstateC.png",
      href: `/${locale}/services/real-estate`,
      alt: items.realEstate.alt,
    },
    {
      id: "car-rental",
      title: items.carRental.title,
      image: "/homepage/services/CarRentalM.jpg",
      floatingImage: "/homepage/services/CarRentalC.png",
      href: `/${locale}/services/car-rental`,
      alt: items.carRental.alt,
    },
    {
      id: "transfer-service",
      title: items.transferService.title,
      image: "/homepage/services/TransferServiceM.jpg",
      floatingImage: "/homepage/services/TransferServiceC.png",
      href: `/${locale}/services/transfer`,
      alt: items.transferService.alt,
    },
    {
      id: "vip-airport",
      title: items.vipAirport.title,
      image: "/homepage/services/AirportM.png",
      floatingImage: "/homepage/services/AirportC.png",
      href: `/${locale}/services/vip-airport`,
      alt: items.vipAirport.alt,
    },
  ];
}
