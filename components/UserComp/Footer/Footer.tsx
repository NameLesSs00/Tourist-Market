"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTelegramPlane,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface FooterProps {
  currentLocale?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

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
    { label: "+201036234030", href: "tel:+201036234030" },
    { label: "WhatsApp Chat", href: "https://wa.me/201036232021" },
    { label: "info@touristmarket-egypt.com", href: "mailto:info@touristmarket-egypt.com" },
    { label: "Hurghada, Egypt", href: "#" },
  ];

  const socialLinks = [
    {
      icon: <FaFacebookF className="h-4 w-4" />,
      href: "https://www.facebook.com/touristmarketegypt",
      label: "Facebook",
    },
    {
      icon: <FaInstagram className="h-4 w-4" />,
      href: "https://www.instagram.com/touristmarketegypt/",
      label: "Instagram",
    },
    {
      icon: <FaXTwitter className="h-4 w-4" />,
      href: "https://x.com/touristmarketeg",
      label: "X",
    },
    {
      icon: <FaYoutube className="h-4 w-4" />,
      href: "https://www.youtube.com/@touristmarketegypt",
      label: "YouTube",
    },
    {
      icon: <FaTelegramPlane className="h-4 w-4" />,
      href: "https://t.me/Touristmarketegypt",
      label: "Telegram",
    },
    {
      icon: <FaTiktok className="h-4 w-4" />,
      href: "https://www.tiktok.com/@touristmarketegypt",
      label: "TikTok",
    },
  ];

  return (
    <footer className="w-full bg-[#0E4A68] text-white font-poppins overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5"
        >
          {/* Column 1: Logo & Tagline */}
          <motion.div variants={columnVariants} className="flex flex-col items-start lg:col-span-1">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link href={`/${currentLocale}`} className="mb-6 block">
                <Image
                  src="/shared/LogoFooter.svg"
                  alt="Egypt Tourist Market"
                  width={160}
                  height={50}
                  className="h-auto w-[160px]"
                />
              </Link>
            </motion.div>
            <p className="font-poppins-regular-14 text-white/80">
              Your gateway to authentic Egyptian experiences, local bazaars, and memorable adventures.
            </p>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={columnVariants}>
            <h3 className="font-poppins text-[20px] font-bold leading-[100%] text-white">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link
                      href={link.href}
                      className="font-poppins-semibold-16 text-white transition-colors hover:text-[#F4DAB6]"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Services */}
          <motion.div variants={columnVariants}>
            <h3 className="font-poppins text-[20px] font-bold leading-[100%] text-white">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link
                      href={service.href}
                      className="font-poppins-semibold-16 text-white transition-colors hover:text-[#F4DAB6]"
                    >
                      {service.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact Us */}
          <motion.div variants={columnVariants}>
            <h3 className="font-poppins text-[20px] font-bold leading-[100%] text-white">
              Contact Us
            </h3>
            <ul className="mt-5 space-y-3">
              {contactItems.map((item) => (
                <li key={item.label}>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <a
                      href={item.href}
                      className="font-poppins-semibold-16 text-white transition-colors hover:text-[#F4DAB6]"
                    >
                      {item.label}
                    </a>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 5: Follow Us */}
          <motion.div variants={columnVariants}>
            <h3 className="font-poppins text-[20px] font-bold leading-[100%] text-white">
              Follow Us
            </h3>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ duration: 0.18 }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white text-white transition-colors hover:bg-white hover:text-[#0E4A68]"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar: Copyright & Powered by Tech Gear Solutions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 border-t border-white/15 pt-8 text-center text-xs text-white/75"
        >
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
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
