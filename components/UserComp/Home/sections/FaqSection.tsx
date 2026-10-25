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

  // Distinct curved arc offsets on desktop naturally echoing the circular curve contour
  const STAGGER = [
    "xl:ml-0",
    "xl:ml-8 2xl:ml-10",
    "xl:ml-16 2xl:ml-20",
    "xl:ml-8 2xl:ml-10",
    "xl:ml-0",
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#FFF2DF] py-14 lg:py-20 font-poppins">
      <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FaqHeader dict={dict} />

        {/* Desktop View (>= 1280px): 3 Proportional Fluid Columns matching FAQDesktop.png */}
        <div className="mt-14 hidden xl:flex xl:items-start xl:justify-between xl:gap-5 2xl:gap-8">
          {/* Left Column: Help Card with Big Div & Curve matching FAQDesktop.png */}
          <div className="w-[360px] 2xl:w-[400px] shrink-0 self-center">
            <FaqHelpCard dict={dict} currentLocale={locale} />
          </div>

          {/* Center Column: Questions Following Curve Contour */}
          <div className="flex-1 max-w-[490px] 2xl:max-w-[530px] xl:-ml-6 2xl:-ml-8 space-y-4">
            {FAQ_DUMMY_ITEMS.map((item, index) => (
              <FaqAccordionItem
                key={item.question}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(index)}
                className={STAGGER[index] ?? ""}
                isDesktop
              />
            ))}
          </div>

          {/* Right Column: Solution Callout Box */}
          <div className="flex-1 max-w-[430px] 2xl:max-w-[460px]">
            <FaqAnswerPanel item={openItem ?? undefined} />
          </div>
        </div>

        {/* Tablet & Mobile View (< 1280px): Clean Stack with Inline Accordion */}
        <div className="mt-10 xl:hidden">
          <div className="mx-auto max-w-2xl space-y-3.5">
            {FAQ_DUMMY_ITEMS.map((item, index) => (
              <FaqAccordionItem
                key={item.question}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex((prev) => (prev === index ? null : index))}
                isDesktop={false}
              />
            ))}
          </div>

          {/* Centered Help Card below questions */}
          <div className="mt-12 flex justify-center">
            <FaqHelpCard dict={dict} currentLocale={locale} isMobile />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
