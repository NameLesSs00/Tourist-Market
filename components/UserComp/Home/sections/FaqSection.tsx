"use client";

import React, { useState } from "react";
import { getDictionary } from "@/shared/utils/getDictionary";
import { FAQ_DUMMY_ITEMS } from "@/shared/utils/faqDummyData";
import { FaqHeader, FaqAccordionItem, FaqAnswerPanel, FaqHelpCard } from "../components";

interface FaqSectionProps {
  locale?: string;
}

export function FaqSection({ locale = "en" }: FaqSectionProps) {
  const dict = getDictionary(locale);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const openItem = openIndex !== null ? FAQ_DUMMY_ITEMS[openIndex] : null;

  // Rows follow the half-circle's arc rather than sitting flush.
  // Offsets follow a sine curve across the five rows, matching the comp.
  const STAGGER = [
    "lg:w-[340px] lg:translate-x-0",
    "lg:w-[350px] lg:translate-x-[48px]",
    "lg:w-[360px] lg:translate-x-[76px]",
    "lg:w-[350px] lg:translate-x-[48px]",
    "lg:w-[340px] lg:translate-x-0",
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#FFF2DF] py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <FaqHeader dict={dict} />

        {/* Desktop: HelpCard | Accordion | Answer Panel — all three grow together */}
        <div className="hidden lg:block">
          <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="mt-14 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-10 items-start">
              <div className="flex justify-center">
                <FaqHelpCard dict={dict} currentLocale={locale} />
              </div>
              <div className="flex flex-col gap-5 pr-[72px]">
                {FAQ_DUMMY_ITEMS.map((item, index) => (
                  <FaqAccordionItem
                    key={item.question}
                    item={item}
                    isOpen={openIndex === index}
                    onToggle={() => setOpenIndex((prev) => (prev === index ? null : index))}
                    className={STAGGER[index] ?? ""}
                  />
                ))}
              </div>
              <div className="ml-6">
                <FaqAnswerPanel item={openItem ?? undefined} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Accordion → HelpCard (rotated curve at bottom) */}
        <div className="lg:hidden mt-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            {FAQ_DUMMY_ITEMS.map((item, index) => (
              <FaqAccordionItem
                key={item.question}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex((prev) => (prev === index ? null : index))}
              />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <FaqHelpCard dict={dict} currentLocale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
