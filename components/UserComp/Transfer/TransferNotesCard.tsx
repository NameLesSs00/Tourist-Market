import React from "react";

interface TransferNotesCardProps {
  notes: string;
  onNotesChange: (notes: string) => void;
}

export function TransferNotesCard({
  notes,
  onNotesChange,
}: TransferNotesCardProps) {
  return (
    <div className="bg-[#FFFFFF] rounded-[8.38px] border-[0.52px] border-[#888888] shadow-[0px_1.05px_8.38px_1.05px_rgba(0,0,0,0.2)] p-5 md:p-6 space-y-3 font-poppins">
      <h2 className="text-base sm:text-lg font-bold text-[#0E4A68]">
        Notes &amp; Special Requests
      </h2>
      <div>
        <label className="block text-xs font-semibold text-[#52646B] mb-1.5">
          Notes
        </label>
        <textarea
          rows={3}
          placeholder="Any notes or special requests..."
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          className="w-full px-3 py-2 text-sm text-[#0E4A68] font-medium bg-[#FFFFFF] border-[0.42px] border-[#00000066] rounded-[5.24px] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition placeholder:text-[#00000066] placeholder:font-normal resize-none"
        />
      </div>
    </div>
  );
}
