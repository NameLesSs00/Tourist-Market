"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export interface ServiceItem {
  id: string;
  title: string;
  image: string;
  floatingImage: string;
  href?: string;
  alt: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "hotel-deliveries",
    title: "Hotel Deliveries",
    image: "/home/services/2d574b945c1a5a35bc8e380ee51cb9bb89fb1be5.jpg",
    floatingImage: "/home/services/Ellipse 4 (1).png",
    href: "/services/hotel-deliveries",
    alt: "Hotel Deliveries - Room Service & Amenities",
  },
  {
    id: "tourist-services",
    title: "Tourist Services",
    image: "/home/services/7b0cd88720714a29302b6dfd8ad4f734cb5b0dbb.jpg",
    floatingImage: "/home/services/Ellipse 4 (2).png",
    href: "/services/tourist-services",
    alt: "Tourist Services - Guided Cultural & Historical Tours",
  },
  {
    id: "red-sea-real-estate",
    title: "Red Sea Real Estate",
    image: "/home/services/e835e9713b02a26c7a450e962f664ae9dbecd50d.jpg",
    floatingImage: "/home/services/Ellipse 4 (3).png",
    href: "/services/red-sea-real-estate",
    alt: "Red Sea Real Estate - Luxury Villas & Coastal Properties",
  },
  {
    id: "car-rental",
    title: "Car Rental",
    image: "/home/services/8770eea3e0aff38715179730da41988cb3459d48.jpg",
    floatingImage: "/home/services/Ellipse 4 (4).png",
    href: "/services/car-rental",
    alt: "Car Rental - Luxury SUVs & Desert Vehicles",
  },
];

interface ServiceCardProps {
  item: ServiceItem;
}

export function ServiceCard({ item }: ServiceCardProps) {
  const destinationHref = item.href || `/services/${item.id}`;

  return (
    <div className="relative pt-[70px] sm:pt-[76px] w-full flex-shrink-0 group">
      <Link
        href={destinationHref}
        aria-label={`${item.title} - Explore service`}
        className="block relative w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D48C28] rounded-[20px]"
      >
        {/* Floating Circular Image (Ellipse): Fades out smoothly on hover */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 w-[134px] h-[134px] sm:w-[140px] sm:h-[140px] rounded-full border-[4px] border-white shadow-[0_8px_25px_rgba(0,0,0,0.18)] overflow-hidden bg-white z-30 transition-all duration-500 ease-out group-hover:opacity-0 group-hover:scale-95 pointer-events-none">
          <Image
            src={item.floatingImage}
            alt={`${item.title} preview`}
            width={180}
            height={180}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Card Body: Smoothly moves upward on hover */}
        <div className="relative w-full h-[350px] sm:h-[362px] rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out group-hover:-translate-y-3 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)]">
          {/* Main Card Background Photo */}
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority
          />

          {/* Default Bottom Gradient Overlay (Subtle) */}
          <div
            className="absolute inset-0 transition-opacity duration-500 ease-out group-hover:opacity-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.75) 85%, #000000 100%)",
            }}
          />

          {/* Hover Bottom Gradient Overlay: linear-gradient(180deg, rgba(134, 102, 102, 0) 56.73%, #000000 95%) */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(134, 102, 102, 0) 56.73%, #000000 95%)",
            }}
          />

          {/* Bottom Card Content: Title shifts upward, Explore button appears below */}
          <div className="absolute inset-x-0 bottom-0 pb-6 px-4 z-20 flex flex-col items-center justify-end text-center pointer-events-none">
            {/* Title */}
            <h3 className="font-poppins font-bold text-white text-lg sm:text-[19px] lg:text-[20px] leading-tight tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:group-hover:-translate-y-2">
              {item.title}
            </h3>

            {/* Explore Button: revealed on hover */}
            <div
              className="mt-3.5 px-8 py-2 bg-white text-black font-poppins font-bold text-sm sm:text-base rounded-full shadow-[3px_3px_20px_3px_rgba(0,0,0,0.25)] border-[0.31px] border-black transition-all duration-500 ease-out opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0"
              style={{
                boxShadow: "3px 3px 20px 3px rgba(0, 0, 0, 0.25)",
                border: "0.31px solid #000000",
              }}
            >
              Explore
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export function Services() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="services"
      className="w-full bg-[#FFF4E5] py-14 sm:py-16 lg:py-20 relative overflow-hidden"
      aria-label="Our Services"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="font-poppins text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-[#003D5B]">
            Our <span className="text-[#D48C28]">Services</span>
          </h2>
          <p className="font-poppins text-sm sm:text-base text-[#646464] mt-2 font-normal">
            Everything you need for your ultimate experience
          </p>
        </motion.div>

        {/* Big Rounded Container for Cards */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          className="services-carousel-panel relative pt-14 sm:pt-16 lg:pt-20 pb-10 sm:pb-12 px-5 sm:px-8 lg:px-12"
        >
          {/* Left Circular Arrow Button */}
          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label="Previous services"
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 lg:w-13 lg:h-13 bg-[#F7F7F7] rounded-full flex items-center justify-center text-[#003D5B] shadow-[0px_2px_15px_0px_#00000033] hover:scale-105 active:scale-95 transition-all z-30 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D48C28]"
            style={{
              boxShadow: "0px 2px 15px 0px rgba(0, 0, 0, 0.2)",
            }}
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          {/* Right Circular Arrow Button */}
          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label="Next services"
            className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 lg:w-13 lg:h-13 bg-[#F7F7F7] rounded-full flex items-center justify-center text-[#003D5B] shadow-[0px_2px_15px_0px_#00000033] hover:scale-105 active:scale-95 transition-all z-30 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D48C28]"
            style={{
              boxShadow: "0px 2px 15px 0px rgba(0, 0, 0, 0.2)",
            }}
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>

          {/* Cards Grid / Carousel Container */}
          <div
            ref={scrollContainerRef}
            className="relative z-10 w-full overflow-x-auto lg:overflow-visible no-scrollbar scroll-smooth pb-2 -mx-1 px-1"
          >
            <div className="flex lg:grid lg:grid-cols-4 gap-5 sm:gap-6 xl:gap-8 items-start">
              {SERVICES_DATA.map((item) => (
                <div
                  key={item.id}
                  className="w-[270px] sm:w-[300px] lg:w-auto flex-shrink-0 lg:flex-shrink"
                >
                  <ServiceCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
export { Services as ServicesSection };
