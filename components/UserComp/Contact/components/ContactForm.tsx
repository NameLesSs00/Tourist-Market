"use client";

import React, { useState } from "react";
import Image from "next/image";

export function ContactForm() {
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
      // Simulate form submission or handle via API if provided
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatusMessage({
        type: "success",
        text: "Thank you! Your message has been sent successfully.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatusMessage({
        type: "error",
        text: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="w-full rounded-[20px] p-6 sm:p-8 lg:p-10 transition-shadow"
      style={{
        backgroundColor: "#FFFEF5",
        border: "0.5px solid #888888",
        boxShadow: "0px 1px 8px 2px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Header with Envelope Icon */}
      <div className="flex items-start gap-4">
        <div className="shrink-0 mt-1">
          <Image
            src="/contact/Vector.svg"
            alt="Message Icon"
            width={34}
            height={26}
            className="w-8 sm:w-9 h-auto object-contain"
          />
        </div>
        <div>
          <h2 className="font-['Poppins'] text-2xl sm:text-[28px] font-bold text-[#0E4A68] leading-tight">
            Send Us A Message
          </h2>
          <p className="mt-1 font-['Poppins'] text-xs sm:text-sm text-[#0E4A68]/80 font-normal">
            Fill out the form below and we will get back to you as soon as possible
          </p>
        </div>
      </div>

      {/* Form Elements */}
      <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
        {/* Row: Name and Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {/* Name Field */}
          <div>
            <label
              htmlFor="contact-name"
              className="block font-['Poppins'] text-sm font-medium text-[#0E4A68] mb-1.5"
            >
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Full Name"
              className="w-full rounded-[10px] border border-[#CCCCCC] bg-[#FFFEF5] px-4 py-3 font-['Poppins'] text-sm text-[#0E4A68] placeholder:text-[#999999] focus:border-[#0E4A68] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition-colors"
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="contact-email"
              className="block font-['Poppins'] text-sm font-medium text-[#0E4A68] mb-1.5"
            >
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-[10px] border border-[#CCCCCC] bg-[#FFFEF5] px-4 py-3 font-['Poppins'] text-sm text-[#0E4A68] placeholder:text-[#999999] focus:border-[#0E4A68] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition-colors"
            />
          </div>
        </div>

        {/* Subject Field: Regular input per prompt rules (not dropdown) */}
        <div>
          <label
            htmlFor="contact-subject"
            className="block font-['Poppins'] text-sm font-medium text-[#0E4A68] mb-1.5"
          >
            Subject
          </label>
          <input
            id="contact-subject"
            type="text"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            placeholder="Select a subject"
            className="w-full rounded-[10px] border border-[#CCCCCC] bg-[#FFFEF5] px-4 py-3 font-['Poppins'] text-sm text-[#0E4A68] placeholder:text-[#999999] focus:border-[#0E4A68] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition-colors"
          />
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="contact-message"
            className="block font-['Poppins'] text-sm font-medium text-[#0E4A68] mb-1.5"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us what are you looking for , or ask any question...."
            className="w-full resize-y rounded-[10px] border border-[#CCCCCC] bg-[#FFFEF5] px-4 py-3 font-['Poppins'] text-sm text-[#0E4A68] placeholder:text-[#999999] focus:border-[#0E4A68] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition-colors"
          />
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div
            className={`rounded-lg p-3 text-sm font-['Poppins'] ${
              statusMessage.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2.5 rounded-[10px] bg-[#0E4A68] hover:bg-[#09354b] active:scale-[0.99] py-3.5 px-6 font-['Poppins'] text-base font-medium text-white shadow-md transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <Image
            src="/contact/cil_send.svg"
            alt="Send"
            width={16}
            height={16}
            className="h-4 w-4 object-contain brightness-0 invert"
          />
          <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
