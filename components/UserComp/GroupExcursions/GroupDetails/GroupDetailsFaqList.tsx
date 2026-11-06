"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GroupExcursionFaq } from "../types";
import { useClientDictionary } from "@/shared/providers/ClientDictionaryContext";

interface GroupDetailsFaqListProps {
  faqs: GroupExcursionFaq[];
  locale?: string;
}

export function GroupDetailsFaqList({
  faqs,
  locale = "en",
}: GroupDetailsFaqListProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);
  const dict = useClientDictionary();
  const t = dict.groupExcursions.details.tabs;

  return (
    <div>
      <h2 className="font-poppins text-lg sm:text-xl lg:text-2xl font-bold text-[#0E4A68] tracking-tight mb-3 sm:mb-4">
        {t.faqTitle}
      </h2>
      <div className="space-y-2.5 sm:space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openFaqIndex === index;
          return (
            <div
              key={index}
              className="rounded-[10px] sm:rounded-[12px] border border-[#0E4A68]/25 bg-[#FFF8EF] overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-3 px-3.5 sm:px-4 py-3 sm:py-3.5 text-left cursor-pointer"
              >
                <span className="font-poppins text-xs sm:text-sm md:text-base font-semibold text-[#0E4A68] break-words">
                  {faq.question}
                </span>
                <span
                  className={`shrink-0 text-[#0E4A68] transition-transform duration-200 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4">
                      <p className="font-poppins text-xs sm:text-sm text-[#444444] leading-relaxed break-words">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GroupDetailsFaqList;