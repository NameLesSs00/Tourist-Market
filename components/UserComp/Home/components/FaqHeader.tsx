"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Dictionary } from "@/shared/utils/getDictionary";

interface FaqHeaderProps {
  dict: Dictionary;
}

export function FaqHeader({ dict }: FaqHeaderProps) {
  const { faq } = dict;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center text-center"
    >
      <div className="flex items-center justify-center gap-2 lg:gap-3">
        <Image
          src="/homepage/Faq/Questions.svg"
          alt=""
          width={46}
          height={46}
          className="h-[26px] w-auto lg:h-[46px] lg:w-[46px]"
        />
        <h2 className="font-poppins text-[22px] font-semibold leading-[26px] text-[#003D5B] lg:text-[40px] lg:leading-[42px]">
          {faq.titlePrefix}{" "}
          <span className="text-[#D48C28]">{faq.titleAccent}</span>
        </h2>
      </div>

      <p className="mt-1.5 font-poppins text-[13px] font-normal leading-[18px] text-[#646464] lg:mt-2 lg:text-[21px] lg:leading-[35px]">
        {faq.subtitle}
      </p>
    </motion.div>
  );
}

export default FaqHeader;
