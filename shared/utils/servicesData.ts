export interface ServiceItem {
  id: string;
  title: string;
  image: string;
  floatingImage: string;
  href: string;
  alt: string;
}

export function getServicesData(locale = "en"): ServiceItem[] {
  return [
    {
      id: "hotel-deliveries",
      title: "Hotel Deliveries",
      image: "/homepage/services/HotelDeliveriesM.jpg",
      floatingImage: "/homepage/services/HotelDeliveriesC.png",
      href: `/${locale}/hotel-deliveries`,
      alt: "Hotel Deliveries - Room Service & Amenities",
    },
    {
      id: "tourist-services",
      title: "Tourist Services",
      image: "/homepage/services/TouristServicesM.jpg",
      floatingImage: "/homepage/services/TouristServicesC.png",
      href: `/${locale}/services/tourist`,
      alt: "Tourist Services - Guided Cultural & Historical Tours",
    },
    {
      id: "red-sea-real-estate",
      title: "Red Sea Real Estate",
      image: "/homepage/services/RealEstateM.jpg",
      floatingImage: "/homepage/services/Real EstateC.png",
      href: `/${locale}/services/real-estate`,
      alt: "Red Sea Real Estate - Luxury Villas & Coastal Properties",
    },
    {
      id: "car-rental",
      title: "Car Rental",
      image: "/homepage/services/CarRentalM.jpg",
      floatingImage: "/homepage/services/CarRentalC.png",
      href: `/${locale}/services/car-rental`,
      alt: "Car Rental - Luxury SUVs & Desert Vehicles",
    },
    {
      id: "transfer-service",
      title: "Transfer Service",
      image: "/homepage/services/TransferServiceM.jpg",
      floatingImage: "/homepage/services/TransferServiceC.png",
      href: `/${locale}/services/transfer`,
      alt: "Transfer Service - Private & Group Transportation",
    },
    {
      id: "vip-airport",
      title: "VIP Services-Hurghada Airport",
      image: "/homepage/services/AirportM.png",
      floatingImage: "/homepage/services/AirportC.png",
      href: `/${locale}/services/vip-airport`,
      alt: "VIP Services - Hurghada Airport Meet & Assist",
    },
  ];
}
