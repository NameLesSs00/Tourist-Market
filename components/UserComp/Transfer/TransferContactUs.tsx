import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getDictionary } from "@/shared/utils/getDictionary";

interface TransferContactUsProps {
  locale?: string;
}

export function TransferContactUs({ locale = "en" }: TransferContactUsProps) {
  const dict = getDictionary(locale);
  const t = dict.transfer.contact;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="bg-[#F5F7F8] rounded-[8.38px] border-[0.2px] border-[#888888] shadow-[0px_1.05px_8.38px_1.05px_rgba(0,0,0,0.2)] p-5 md:p-6 text-center space-y-4 font-poppins"
    >
      <h2 className="text-base sm:text-lg font-bold text-[#0E4A68]">
        {t.title}
      </h2>

      {/* Social / Direct chat buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {/* WhatsApp */}
        <motion.a
          href="https://wa.me/201289494715"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[8.38px] bg-[#17DB55] text-white text-xs sm:text-sm font-semibold hover:opacity-95 transition shadow-xs"
        >
          <span className="relative w-4 h-4 flex items-center justify-center">
            <Image
              src="/transfer/Group.svg"
              alt="WhatsApp"
              width={16}
              height={16}
              className="object-contain"
            />
          </span>
          <span>{t.whatsapp}</span>
        </motion.a>

        {/* Viber */}
        <motion.a
          href="viber://chat?number=201289494715"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[8.38px] bg-[#F4F4F4] text-[#0E4A68] text-xs sm:text-sm font-semibold hover:bg-gray-100 transition shadow-xs border-[0.5px] border-[#888888]"
        >
          <span className="relative w-4 h-4 flex items-center justify-center">
            <Image
              src="/transfer/Vector (3).svg"
              alt="Viber"
              width={16}
              height={16}
              className="object-contain"
            />
          </span>
          <span>{t.viber}</span>
        </motion.a>

        {/* Telegram */}
        <motion.a
          href="https://t.me/+201289494715"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[8.38px] bg-[#1487B8] text-white text-xs sm:text-sm font-semibold hover:opacity-95 transition shadow-xs"
        >
          <span className="relative w-4 h-4 flex items-center justify-center">
            <Image
              src="/transfer/Vector (4).svg"
              alt="Telegram"
              width={16}
              height={16}
              className="object-contain"
            />
          </span>
          <span>{t.telegram}</span>
        </motion.a>
      </div>

      {/* Contact info subtitle */}
      <div className="text-xs font-semibold text-[#52646B]">
        {t.hours}
      </div>
    </motion.div>
  );
}

export default TransferContactUs;
