"use client";

import React from "react";
import type { BlogSectionItem } from "@/models/blog";

interface BlogDetailSectionItemProps {
  section: BlogSectionItem;
  index: number;
}

export function BlogDetailSectionItem({
  section,
  index,
}: BlogDetailSectionItemProps) {
  const keys = section.keys || [];
  const values = section.values || [];
  const maxLen = Math.max(keys.length, values.length);
  const pairs: Array<{ key: string; value: string }> = [];

  for (let i = 0; i < maxLen; i++) {
    const k = keys[i] || "";
    const v = values[i] || "";
    if (k || v) {
      pairs.push({ key: k, value: v });
    }
  }

  return (
    <article className="w-full pt-6 sm:pt-10 lg:pt-12 pb-2">
      {/* Section Title */}
      <h3 className="font-['Poppins'] font-semibold text-[20px] sm:text-[26px] md:text-[30px] lg:text-[35px] leading-[1.3] sm:leading-[1.25] text-[#0A3951]">
        {section.title}
      </h3>

      {/* Section Short Description (after title) */}
      {section.shortDescription && (
        <p className="font-['Poppins'] text-xs sm:text-sm md:text-base font-medium text-[#D48C28] mt-1">
          {section.shortDescription}
        </p>
      )}

      {/* Section Description */}
      {section.description && (
        <p className="font-['Poppins'] font-normal text-[14px] sm:text-[16px] lg:text-[17px] xl:text-[18px] leading-[1.7] sm:leading-[1.75] text-[#0A3951]/90 mt-2.5 sm:mt-4 whitespace-pre-line">
          {section.description}
        </p>
      )}

      {/* Power-point Highlights (Under each other, natural background) */}
      {pairs.length > 0 && (
        <ul className="mt-4 sm:mt-6 flex flex-col gap-2 sm:gap-2.5">
          {pairs.map((pair, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 font-['Poppins'] text-[14px] sm:text-[15px] lg:text-[16px] xl:text-[17px] text-[#0A3951]"
            >
              <span className="mt-1.5 h-2 w-2 rounded-full bg-[#D48C28] shrink-0" />
              <div className="break-words">
                <span className="font-semibold text-[#0A3951]">
                  {pair.key}
                </span>
                {pair.key && pair.value && (
                  <span className="mx-1.5 text-[#0A3951]/60">:</span>
                )}
                {pair.value && (
                  <span className="font-normal text-[#0A3951]/85">
                    {pair.value}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default BlogDetailSectionItem;
