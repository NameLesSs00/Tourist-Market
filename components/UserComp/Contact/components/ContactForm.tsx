"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { getDictionary } from "@/shared/utils/getDictionary";

interface ContactFormProps {
  locale?: string;
}

export function ContactForm({ locale = "en" }: ContactFormProps) {
  const dict = getDictionary(locale);
  const t = dict.contact.form;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatusMessage({
        type: "success",
        text: t.successMessage,
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatusMessage({
        type: "error",
        text: t.errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="w-full rounded-[20px] p-6 sm:p-8 lg:p-10 transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(14,74,104,0.12)]"
      style={{
        backgroundColor: "#FFFEF5",
        border: "0.5px solid #888888",
        boxShadow: "0px 1px 8px 2px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Header with Envelope Icon */}
      <div className="flex items-start gap-4">
        <motion.div
          whileHover={{ scale: 1.1, rotate: [-2, 2, 0] }}
          transition={{ duration: 0.3 }}
          className="shrink-0 mt-1 cursor-pointer"
        >
          <Image
            src="/contact/Vector.svg"
            alt="Message Icon"
            width={34}
            height={26}
            className="w-8 sm:w-9 h-auto object-contain"
          />
        </motion.div>
        <div>
          <h2 className="font-['Poppins'] text-2xl sm:text-[28px] font-bold text-[#0E4A68] leading-tight">
            {t.title}
          </h2>
          <p className="mt-1 font-['Poppins'] text-xs sm:text-sm text-[#0E4A68]/80 font-normal">
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* Form Elements */}
      <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
        {/* Row: Name and Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label
              htmlFor="contact-name"
              className="block font-['Poppins'] text-sm font-medium text-[#0E4A68] mb-1.5"
            >
              {t.nameLabel}
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder={t.namePlaceholder}
              className="w-full rounded-[10px] border border-[#CCCCCC] bg-[#FFFEF5] px-4 py-3 font-['Poppins'] text-sm text-[#0E4A68] placeholder:text-[#999999] focus:border-[#0E4A68] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="block font-['Poppins'] text-sm font-medium text-[#0E4A68] mb-1.5"
            >
              {t.emailLabel}
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder={t.emailPlaceholder}
              className="w-full rounded-[10px] border border-[#CCCCCC] bg-[#FFFEF5] px-4 py-3 font-['Poppins'] text-sm text-[#0E4A68] placeholder:text-[#999999] focus:border-[#0E4A68] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition-all"
            />
          </div>
        </div>

        {/* Subject Field */}
        <div>
          <label
            htmlFor="contact-subject"
            className="block font-['Poppins'] text-sm font-medium text-[#0E4A68] mb-1.5"
          >
            {t.subjectLabel}
          </label>
          <input
            id="contact-subject"
            type="text"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            placeholder={t.subjectPlaceholder}
            className="w-full rounded-[10px] border border-[#CCCCCC] bg-[#FFFEF5] px-4 py-3 font-['Poppins'] text-sm text-[#0E4A68] placeholder:text-[#999999] focus:border-[#0E4A68] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition-all"
          />
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="contact-message"
            className="block font-['Poppins'] text-sm font-medium text-[#0E4A68] mb-1.5"
          >
            {t.messageLabel}
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder={t.messagePlaceholder}
            className="w-full resize-y rounded-[10px] border border-[#CCCCCC] bg-[#FFFEF5] px-4 py-3 font-['Poppins'] text-sm text-[#0E4A68] placeholder:text-[#999999] focus:border-[#0E4A68] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition-all"
          />
        </div>

        {/* Animated Status Message */}
        <AnimatePresence>
          {statusMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={`rounded-lg p-3 text-sm font-['Poppins'] overflow-hidden ${
                statusMessage.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {statusMessage.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2.5 rounded-[10px] bg-[#0E4A68] hover:bg-[#09354b] py-3.5 px-6 font-['Poppins'] text-base font-medium text-white shadow-md transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed group"
        >
          <motion.div
            className="inline-block"
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src="/contact/cil_send.svg"
              alt="Send"
              width={16}
              height={16}
              className="h-4 w-4 object-contain brightness-0 invert group-hover:translate-x-0.5 transition-transform"
            />
          </motion.div>
          <span>{isSubmitting ? t.submittingButton : t.submitButton}</span>
        </motion.button>
      </form>
    </div>
  );
}

export default ContactForm;
