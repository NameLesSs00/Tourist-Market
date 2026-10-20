"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface FooterProps {
  currentLocale?: string;
}

export function Footer({ currentLocale = "en" }: FooterProps) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }
  const quickLinks = [
    { label: "Home", href: `/${currentLocale}` },
    { label: "Services", href: `/${currentLocale}/services` },
    { label: "Blogs", href: `/${currentLocale}/blogs` },
    { label: "FAQ", href: `/${currentLocale}/faq` },
    { label: "Contact", href: `/${currentLocale}/contact` },
  ];

  const services = [
    { label: "Hotel Deliveries", href: `/${currentLocale}/hotel-deliveries` },
    { label: "Tourist Services", href: `/${currentLocale}/services/tourist` },
    { label: "Red Sea Real Estate", href: `/${currentLocale}/services/real-estate` },
    { label: "Car Rental", href: `/${currentLocale}/services/car-rental` },
    { label: "VIP Services-Hurghada Airport", href: `/${currentLocale}/services/vip-airport` },
    { label: "Transfer Service", href: `/${currentLocale}/services/transfer` },
  ];

  const contactItems = [
    { label: "+20 01289494715", href: "tel:+2001289494715" },
    { label: "WhatsApp Chat", href: "https://wa.me/2001289494715" },
    { label: "info@etouristmarket .com", href: "mailto:info@etouristmarket.com" },
    { label: "El Kawther , Hurghada, Egypt", href: "#" },
    { label: "Daily: 9:00 AM - 9:00 PM", href: "#" },
  ];

  const socialLinks = [
    { icon: <FaFacebookF className="h-4 w-4" />, href: "https://facebook.com", label: "Facebook" },
    { icon: <FaInstagram className="h-4 w-4" />, href: "https://instagram.com", label: "Instagram" },
    { icon: <FaXTwitter className="h-4 w-4" />, href: "https://x.com", label: "X" },
    { icon: <FaYoutube className="h-4 w-4" />, href: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <footer className="w-full bg-[#0E4A68] text-white font-poppins">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Column 1: Logo & Tagline */}
          <div className="flex flex-col items-start lg:col-span-1">
            <Link href={`/${currentLocale}`} className="mb-6 block">
              <Image
                src="/shared/LogoFooter.svg"
                alt="Egypt Tourist Market"
                width={200}
                height={65}
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="font-poppins text-[14px] font-normal leading-relaxed text-[#FFFFFFD9]">
              Enjoy your vacation in Egypt with creative services that take care of your comfort,
              time, and budget.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-poppins text-[20px] font-bold leading-[100%] text-white">
              Quick Links
            </h3>
            <div
              className="mt-2.5 mb-5 w-10"
              style={{
                borderBottom: "2px solid",
                borderImageSource: "linear-gradient(90deg, #D48C28 0%, #FFFFFF 100%)",
                borderImageSlice: 1,
              }}
            />
            <ul className="flex flex-col gap-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-poppins-semibold-16 text-white transition-colors hover:text-[#F4DAB6]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h3 className="font-poppins text-[20px] font-bold leading-[100%] text-white">
              Our services
            </h3>
            <div
              className="mt-2.5 mb-5 w-10"
              style={{
                borderBottom: "2px solid",
                borderImageSource: "linear-gradient(90deg, #D48C28 0%, #FFFFFF 100%)",
                borderImageSlice: 1,
              }}
            />
            <ul className="flex flex-col gap-4">
              {services.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-poppins-semibold-16 text-white transition-colors hover:text-[#F4DAB6]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h3 className="font-poppins text-[20px] font-bold leading-[100%] text-white">
              Contact Us
            </h3>
            <div
              className="mt-2.5 mb-5 w-10"
              style={{
                borderBottom: "2px solid",
                borderImageSource: "linear-gradient(90deg, #D48C28 0%, #FFFFFF 100%)",
                borderImageSlice: 1,
              }}
            />
            <ul className="flex flex-col gap-4">
              {contactItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-poppins-semibold-16 text-white transition-colors hover:text-[#F4DAB6]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Follow Us */}
          <div>
            <h3 className="font-poppins text-[20px] font-bold leading-[100%] text-white">
              Follow Us
            </h3>
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white text-white transition-all duration-200 hover:bg-white hover:text-[#0E4A68]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
