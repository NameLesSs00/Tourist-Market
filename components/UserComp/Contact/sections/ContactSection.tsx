"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ContactHero,
  ContactForm,
  ContactInfoCards,
  ContactMapSection,
} from "../components";

interface ContactSectionProps {
  locale?: string;
}

export function ContactSection({ locale = "en" }: ContactSectionProps) {
  return (
    <section className="relative w-full bg-[#FAF6ED] text-[#0E4A68]">
      {/* 1. Hero Header Section */}
      <ContactHero locale={locale} />

      {/* 2. Main Body Content (Form, Info Cards, and Map) */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-14 lg:py-16 space-y-8 sm:space-y-10">
        {/* Row 1: Message Form (Left) & Contact Info Cards (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left: Contact Form Card (7 of 12 columns on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 xl:col-span-8 w-full"
          >
            <ContactForm />
          </motion.div>

          {/* Right: Info Cards Stack (5 of 12 columns on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 xl:col-span-4 w-full"
          >
            <ContactInfoCards />
          </motion.div>
        </div>

        {/* Row 2: Find Us on the Map Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="w-full"
        >
          <ContactMapSection />
        </motion.div>
      </div>
    </section>
  );
}

export default ContactSection;
