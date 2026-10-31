"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaInstagram, FaYoutube, FaTelegramPlane, FaTiktok } from "react-icons/fa";
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
    { label: "Services", href: `/${currentLocale}#services` },
    { label: "Blogs", href: `/${currentLocale}/Blogs` },
    { label: "FAQ", href: `/${currentLocale}/faq` },
    { label: "Contact", href: `/${currentLocale}/Contact` },
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
    { label: "+201036234030", href: "tel:+201036234030" },
    { label: "WhatsApp Chat", href: "https://wa.me/201036232021" },
    { label: "info@etouristmarket .com", href: "mailto:info@touristmarket-egypt.com" },
    { label: "Hurghada, Egypt", href: "#" }
  ];

  const socialLinks = [
    { icon: <FaFacebookF className="h-4 w-4" />, href: "https://www.facebook.com/touristmarketegypt", label: "Facebook" },
    { icon: <FaInstagram className="h-4 w-4" />, href: "https://www.instagram.com/touristmarketegypt/", label: "Instagram" },
    { icon: <FaXTwitter className="h-4 w-4" />, href: "https://x.com/touristmarketeg", label: "X" },
    { icon: <FaYoutube className="h-4 w-4" />, href: "https://www.youtube.com/@touristmarketegypt", label: "YouTube" },
    { icon: <FaTelegramPlane className="h-4 w-4" />, href: "https://t.me/Touristmarketegypt", label: "Telegram" },
    { icon: <FaTiktok className="h-4 w-4" />, href: "https://www.tiktok.com/@touristmarketegypt", label: "TikTok" },
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
            <div className="mt-2.5 mb-5 h-[2px] w-10 bg-gradient-to-r from-[#D48C28] to-white" />
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
            <div className="mt-2.5 mb-5 h-[2px] w-10 bg-gradient-to-r from-[#D48C28] to-white" />
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
            <div className="mt-2.5 mb-5 h-[2px] w-10 bg-gradient-to-r from-[#D48C28] to-white" />
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
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white text-white transition-all duration-200 hover:bg-white hover:text-[#0E4A68]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Powered by Tech Gear Solutions */}
        <div className="mt-12 border-t border-white/15 pt-8 text-center text-xs text-white/75">
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <span>© 2026 Egypt Tourist Market. All rights reserved.</span>
            <span>·</span>
            <span>
              Powered by{" "}
              <a
                href="https://tech-gear.net/en"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#D48C28] hover:underline transition-colors"
              >
                Tech Gear Solutions
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
