"use client";

import React from "react";
import { FiFileText } from "react-icons/fi";
import { getDictionary } from "@/shared/utils/getDictionary";

interface ServiceNotesAccordionProps {
  notes?: string[];
  locale?: string;
}

export function ServiceNotesAccordion({ notes, locale = "en" }: ServiceNotesAccordionProps) {
  const dict = getDictionary(locale);
  const t = dict.serviceDetail;

  if (!notes || notes.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 pt-2 text-[#0E4A68]">
      <h3 className="text-sm sm:text-base md:text-lg font-bold flex items-center gap-2">
        <FiFileText className="text-[#DE7423] shrink-0" />
        <span>{t.notesTitle}</span>
      </h3>
      <ol className="flex flex-col gap-2.5 text-xs sm:text-sm leading-relaxed font-normal bg-slate-50/70 p-3.5 sm:p-5 rounded-lg border border-slate-200">
        {notes.map((note, index) => (
          <li key={index} className="flex items-start gap-2.5">
            <span className="font-bold text-[#DE7423] shrink-0 text-xs sm:text-sm">
              {index + 1}.
            </span>
            <span className="text-[#0E4A68]/90">{note}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ServiceNotesAccordion;

