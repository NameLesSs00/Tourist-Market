"use client";

import React from "react";
import Link from "next/link";
import {
  FiShield,
  FiUser,
  FiCalendar,
  FiCreditCard,
  FiActivity,
  FiCheckCircle,
  FiLock,
  FiServer,
  FiRefreshCw,
  FiShare2,
  FiSliders,
  FiFileText,
  FiClock,
  FiAlertCircle,
  FiMail,
  FiPhone,
  FiArrowLeft,
} from "react-icons/fi";

interface PrivacyPageSectionProps {
  locale?: string;
}

export function PrivacyPageSection({ locale = "en" }: PrivacyPageSectionProps) {
  return (
    <div className="w-full min-h-screen bg-[#FFF8ED] py-10 sm:py-16 font-poppins text-[#1E293B]">
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-sm text-[#0E4A68] hover:text-[#146188] font-medium transition-colors cursor-pointer"
          >
            <FiArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Hero Header Card */}
        <div
          style={{
            border: "0.5px solid #888888",
            borderRadius: "10px",
            backgroundColor: "#FFFFFF",
          }}
          className="p-6 sm:p-10 mb-8 shadow-xs"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#0E4A68]/10 text-[#0E4A68]">
              Tourist Market Egypt
            </span>
          </div>

          <h1 className="text-[30px] sm:text-[40px] font-bold text-[#083952] tracking-tight leading-tight">
            Privacy Policy
          </h1>


          <p className="text-[15px] sm:text-[17px] text-[#475569] mt-4 leading-relaxed max-w-3xl">
            We are committed to protecting your privacy and personal data.
          </p>
        </div>

        {/* Section 1: Introduction */}
        <div
          style={{
            border: "0.5px solid #888888",
            borderRadius: "10px",
            backgroundColor: "#FFFFFF",
          }}
          className="p-6 sm:p-8 mb-6 shadow-xs"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#0E4A68]/10 text-[#0E4A68] flex items-center justify-center shrink-0">
              <FiShield size={20} />
            </div>
            <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#083952]">
              1. Introduction
            </h2>
          </div>
          <p className="text-[15px] text-[#334155] leading-relaxed">
            At TOURIST MARKET-EGYPT, we value your trust and are committed to
            protecting your privacy. This policy explains how we collect, use,
            and protect your personal information when you use our website and
            services.
          </p>
        </div>

        {/* Section 2: Information Collection */}
        <div
          style={{
            border: "0.5px solid #888888",
            borderRadius: "10px",
            backgroundColor: "#FFFFFF",
          }}
          className="p-6 sm:p-8 mb-6 shadow-xs"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#0E4A68]/10 text-[#0E4A68] flex items-center justify-center shrink-0">
              <FiUser size={20} />
            </div>
            <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#083952]">
              2. Information Collection
            </h2>
          </div>
          <p className="text-[15px] text-[#334155] mb-5">
            We collect the following types of information when you interact with
            our services:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-[8px] border border-[#CBD5E1] bg-[#F8FAFC]">
              <div className="flex items-center gap-2.5 mb-1.5 text-[#0E4A68] font-semibold text-[15px]">
                <FiUser size={18} />
                <span>Personal Information</span>
              </div>
              <p className="text-sm text-[#475569]">
                Name, email address, phone number, and delivery address.
              </p>
            </div>

            <div className="p-4 rounded-[8px] border border-[#CBD5E1] bg-[#F8FAFC]">
              <div className="flex items-center gap-2.5 mb-1.5 text-[#0E4A68] font-semibold text-[15px]">
                <FiCalendar size={18} />
                <span>Booking Information</span>
              </div>
              <p className="text-sm text-[#475569]">
                Details of requested excursions, hotel delivery orders, and
                service schedules.
              </p>
            </div>

            <div className="p-4 rounded-[8px] border border-[#CBD5E1] bg-[#F8FAFC]">
              <div className="flex items-center gap-2.5 mb-1.5 text-[#0E4A68] font-semibold text-[15px]">
                <FiCreditCard size={18} />
                <span>Payment Information</span>
              </div>
              <p className="text-sm text-[#475569]">
                Payment method details and billing information (processed and
                kept securely).
              </p>
            </div>

            <div className="p-4 rounded-[8px] border border-[#CBD5E1] bg-[#F8FAFC]">
              <div className="flex items-center gap-2.5 mb-1.5 text-[#0E4A68] font-semibold text-[15px]">
                <FiActivity size={18} />
                <span>Usage Data</span>
              </div>
              <p className="text-sm text-[#475569]">
                Information on how you interact with our website, pages viewed,
                and technical device logs.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: How We Use Your Information */}
        <div
          style={{
            border: "0.5px solid #888888",
            borderRadius: "10px",
            backgroundColor: "#FFFFFF",
          }}
          className="p-6 sm:p-8 mb-6 shadow-xs"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#0E4A68]/10 text-[#0E4A68] flex items-center justify-center shrink-0">
              <FiCheckCircle size={20} />
            </div>
            <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#083952]">
              3. How We Use Your Information
            </h2>
          </div>
          <p className="text-[15px] text-[#334155] mb-4">
            We use your information for the following specific purposes:
          </p>

          <ul className="space-y-3">
            {[
              "Processing bookings, orders, and delivery coordination",
              "Providing timely customer service and direct support via WhatsApp and Email",
              "Improving our services, catalog offerings, and overall user experience",
              "Sending order updates, travel notifications, and promotional offers",
              "Compliance with legal, regulatory, and financial obligations",
            ].map((purpose, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm sm:text-[15px] text-[#334155]"
              >
                <FiCheckCircle
                  className="text-[#146188] shrink-0 mt-0.5"
                  size={18}
                />
                <span>{purpose}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 4: Data Protection */}
        <div
          style={{
            border: "0.5px solid #888888",
            borderRadius: "10px",
            backgroundColor: "#FFFFFF",
          }}
          className="p-6 sm:p-8 mb-6 shadow-xs"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#0E4A68]/10 text-[#0E4A68] flex items-center justify-center shrink-0">
              <FiLock size={20} />
            </div>
            <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#083952]">
              4. Data Protection
            </h2>
          </div>
          <p className="text-[15px] text-[#334155] mb-5">
            We apply the highest industry security standards to safeguard your
            personal data:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-[8px] bg-[#F8FAFC] border border-[#CBD5E1]">
              <FiLock className="text-[#0E4A68] shrink-0 mt-1" size={18} />
              <div>
                <h4 className="font-semibold text-sm text-[#083952]">
                  Encryption
                </h4>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Encryption of sensitive customer and transaction data in
                  transit and at rest.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-[8px] bg-[#F8FAFC] border border-[#CBD5E1]">
              <FiServer className="text-[#0E4A68] shrink-0 mt-1" size={18} />
              <div>
                <h4 className="font-semibold text-sm text-[#083952]">
                  Secure Servers
                </h4>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Hosted on modern, protected cloud infrastructure with strict
                  firewalls.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-[8px] bg-[#F8FAFC] border border-[#CBD5E1]">
              <FiShield className="text-[#0E4A68] shrink-0 mt-1" size={18} />
              <div>
                <h4 className="font-semibold text-sm text-[#083952]">
                  Access Control
                </h4>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Granular role-based permissions restricted to authorized
                  operations personnel.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-[8px] bg-[#F8FAFC] border border-[#CBD5E1]">
              <FiRefreshCw className="text-[#0E4A68] shrink-0 mt-1" size={18} />
              <div>
                <h4 className="font-semibold text-sm text-[#083952]">
                  Regular Security Updates
                </h4>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Continuous security reviews and automated vulnerability
                  patches.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Data Sharing */}
        <div
          style={{
            border: "0.5px solid #888888",
            borderRadius: "10px",
            backgroundColor: "#FFFFFF",
          }}
          className="p-6 sm:p-8 mb-6 shadow-xs"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#0E4A68]/10 text-[#0E4A68] flex items-center justify-center shrink-0">
              <FiShare2 size={20} />
            </div>
            <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#083952]">
              5. Data Sharing
            </h2>
          </div>
          <div className="p-3.5 rounded-[6px] bg-[#EFF6FF] border border-[#BFDBFE] text-sm text-[#1E3A8A] font-medium mb-4">
            We do not sell or rent your personal information to third parties.
          </div>
          <p className="text-[15px] text-[#334155] mb-3">
            We may only share your information in the following limited
            circumstances:
          </p>
          <ul className="space-y-2.5 text-sm sm:text-[15px] text-[#475569]">
            <li className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E4A68]"></span>
              <span>
                <strong>With trusted service providers:</strong> Delivery
                couriers, transfer drivers, and excursion coordinators.
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E4A68]"></span>
              <span>
                <strong>When required by law:</strong> To comply with legal
                subpoenas, regulations, or government requests.
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E4A68]"></span>
              <span>
                <strong>In case of business transfer:</strong> During mergers or
                asset transitions with equivalent privacy safeguards.
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E4A68]"></span>
              <span>
                <strong>With your explicit consent:</strong> Any other sharing
                occurs only after obtaining your prior permission.
              </span>
            </li>
          </ul>
        </div>

        {/* Section 6 & 7: Cookies & User Rights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Cookies */}
          <div
            style={{
              border: "0.5px solid #888888",
              borderRadius: "10px",
              backgroundColor: "#FFFFFF",
            }}
            className="p-6 sm:p-8 shadow-xs"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#0E4A68]/10 text-[#0E4A68] flex items-center justify-center shrink-0">
                <FiSliders size={20} />
              </div>
              <h2 className="text-[20px] font-semibold text-[#083952]">
                6. Cookies
              </h2>
            </div>
            <p className="text-sm text-[#334155] leading-relaxed">
              We use cookies to improve your browsing experience on our website,
              remember your cart preferences, and analyze traffic patterns. You
              can control or disable cookies at any time through your browser
              settings.
            </p>
          </div>

          {/* User Rights */}
          <div
            style={{
              border: "0.5px solid #888888",
              borderRadius: "10px",
              backgroundColor: "#FFFFFF",
            }}
            className="p-6 sm:p-8 shadow-xs"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#0E4A68]/10 text-[#0E4A68] flex items-center justify-center shrink-0">
                <FiFileText size={20} />
              </div>
              <h2 className="text-[20px] font-semibold text-[#083952]">
                7. Your Rights
              </h2>
            </div>
            <p className="text-sm text-[#334155] mb-3">
              You maintain the following rights regarding your personal data:
            </p>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#475569]">
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-[#146188] shrink-0" size={14} />
                <span>Access your personal data</span>
              </li>
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-[#146188] shrink-0" size={14} />
                <span>Correct inaccurate or incomplete data</span>
              </li>
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-[#146188] shrink-0" size={14} />
                <span>Request erasure of your data</span>
              </li>
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-[#146188] shrink-0" size={14} />
                <span>Request data portability</span>
              </li>
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-[#146188] shrink-0" size={14} />
                <span>Withdraw consent at any time</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Section 8 & 9: Data Retention & Policy Changes */}
        <div
          style={{
            border: "0.5px solid #888888",
            borderRadius: "10px",
            backgroundColor: "#FFFFFF",
          }}
          className="p-6 sm:p-8 mb-6 shadow-xs"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2 text-[#083952] font-semibold text-[17px]">
                <FiClock size={18} />
                <h3>8. Data Retention</h3>
              </div>
              <p className="text-sm text-[#475569] leading-relaxed">
                We retain your personal information only for as long as
                necessary to achieve the purposes stated in this policy or as
                mandated by legal, financial, and regulatory requirements.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2.5 mb-2 text-[#083952] font-semibold text-[17px]">
                <FiRefreshCw size={18} />
                <h3>9. Policy Changes</h3>
              </div>
              <p className="text-sm text-[#475569] leading-relaxed">
                We may update this policy periodically. We will notify you of
                any significant modifications through notices on our website or
                via direct email notifications.
              </p>
            </div>
          </div>
        </div>

        {/* Section 10: Important Note */}
        <div className="p-5 rounded-[10px] bg-[#FFFBEB] border border-[#FCD34D] mb-6 flex items-start gap-3">
          <FiAlertCircle className="text-[#D97706] shrink-0 mt-0.5" size={20} />
          <div className="text-sm text-[#92400E]">
            <strong className="font-semibold block mb-1">Important Note</strong>
            By using our website and services, you agree to the collection and
            use of your information in accordance with this policy. If you do
            not agree with this policy, please discontinue use of our website.
          </div>
        </div>

        {/* Section 11: Contact Us About Privacy */}
        <div
          style={{
            border: "0.5px solid #888888",
            borderRadius: "10px",
            backgroundColor: "#FFFFFF",
          }}
          className="p-6 sm:p-8 shadow-xs"
        >
          <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#083952] mb-2">
            Contact Us About Privacy
          </h2>
          <p className="text-sm text-[#475569] mb-6">
            If you have questions regarding this privacy policy or wish to
            exercise your data rights, please contact our privacy team:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="mailto:info@touristmarket-egypt.com"
              className="flex items-center gap-3 p-4 rounded-[8px] border border-[#CBD5E1] bg-[#F8FAFC] hover:border-[#0E4A68] transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-[#0E4A68]/10 text-[#0E4A68] flex items-center justify-center shrink-0 group-hover:bg-[#0E4A68] group-hover:text-white transition-colors">
                <FiMail size={18} />
              </div>
              <div>
                <span className="text-xs text-[#64748B] block">Email</span>
                <span className="text-sm font-semibold text-[#083952]">
                  info@touristmarket-egypt.com
                </span>
              </div>
            </a>

            <a
              href="tel:+201036234030"
              className="flex items-center gap-3 p-4 rounded-[8px] border border-[#CBD5E1] bg-[#F8FAFC] hover:border-[#0E4A68] transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-[#0E4A68]/10 text-[#0E4A68] flex items-center justify-center shrink-0 group-hover:bg-[#0E4A68] group-hover:text-white transition-colors">
                <FiPhone size={18} />
              </div>
              <div>
                <span className="text-xs text-[#64748B] block">Phone / WhatsApp</span>
                <span className="text-sm font-semibold text-[#083952]">
                  +201036234030
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPageSection;

