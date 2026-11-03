import React from "react";
import { motion } from "framer-motion";
import { getDictionary } from "@/shared/utils/getDictionary";

interface TransferNotesCardProps {
  notes: string;
  onNotesChange: (notes: string) => void;
  locale?: string;
}

export function TransferNotesCard({
  notes,
  onNotesChange,
  locale = "en",
}: TransferNotesCardProps) {
  const dict = getDictionary(locale);
  const t = dict.transfer.notes;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="bg-[#FFFFFF] rounded-[8.38px] border-[0.52px] border-[#888888] shadow-[0px_1.05px_8.38px_1.05px_rgba(0,0,0,0.2)] p-5 md:p-6 space-y-3 font-poppins"
    >
      <h2 className="text-base sm:text-lg font-bold text-[#0E4A68]">
        {t.title}
      </h2>
      <div>
        <label className="block text-xs font-semibold text-[#52646B] mb-1.5">
          {t.label}
        </label>
        <textarea
          rows={3}
          placeholder={t.placeholder}
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          className="w-full px-3 py-2 text-sm text-[#0E4A68] font-medium bg-[#FFFFFF] border-[0.42px] border-[#00000066] rounded-[5.24px] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition placeholder:text-[#00000066] placeholder:font-normal resize-none"
        />
      </div>
    </motion.div>
  );
}
