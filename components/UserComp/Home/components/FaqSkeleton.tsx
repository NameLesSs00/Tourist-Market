import React from "react";

const STAGGER = [
  "xl:ml-0",
  "xl:ml-8 2xl:ml-10",
  "xl:ml-16 2xl:ml-20",
  "xl:ml-8 2xl:ml-10",
  "xl:ml-0",
];

export function FaqSkeleton() {
  return (
    <div className="w-full animate-pulse" aria-hidden="true">
      {/* Desktop Skeleton View (>= 1280px) */}
      <div className="mt-14 hidden xl:flex xl:items-start xl:justify-between xl:gap-5 2xl:gap-8">
        {/* Left Column: Help Card Placeholder */}
        <div className="w-[360px] 2xl:w-[400px] shrink-0 self-center flex items-center justify-center">
          <div className="h-[460px] w-full max-w-[380px] rounded-[24px] border border-[#0E4A6833] bg-[#FFF8EF] p-8 flex flex-col items-center justify-center space-y-4">
            <div className="h-6 w-3/4 rounded-md bg-[#0E4A681F]" />
            <div className="h-4 w-1/2 rounded-md bg-[#0E4A6814]" />
            <div className="h-10 w-36 rounded-xl bg-[#0E4A6826] mt-4" />
          </div>
        </div>

        {/* Center Column: Questions Following Curve Stagger */}
        <div className="flex-1 max-w-[490px] 2xl:max-w-[530px] xl:-ml-6 2xl:-ml-8 space-y-4">
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className={`relative flex min-h-[82px] xl:min-h-[88px] 2xl:min-h-[92px] w-full items-center justify-between rounded-[18px] border border-[#0E4A6833] bg-[#FFF4E5] pl-14 pr-5 py-5 ${STAGGER[index]}`}
            >
              <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 h-11 w-11 xl:h-[52px] xl:w-[52px] rounded-full border border-[#0E4A6833] bg-[#FFF8EF]" />
              <div className="h-5 w-3/4 rounded-md bg-[#0E4A681F]" />
              <div className="h-6 w-6 rounded-full bg-[#0E4A681A] shrink-0" />
            </div>
          ))}
        </div>

        {/* Right Column: Solution Card Placeholder */}
        <div className="flex-1 max-w-[430px] 2xl:max-w-[460px]">
          <div className="min-h-[280px] xl:min-h-[300px] w-full rounded-[18px] border border-[#0E4A6833] bg-[#FFF4E5] p-6 sm:p-7.5 xl:p-8 space-y-4">
            <div className="h-6 w-2/3 rounded-md bg-[#0E4A6826]" />
            <div className="h-4 w-full rounded-md bg-[#0E4A6814]" />
            <div className="h-4 w-5/6 rounded-md bg-[#0E4A6814]" />
            <div className="h-4 w-4/6 rounded-md bg-[#0E4A6814]" />
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Skeleton View (< 1280px) */}
      <div className="mt-10 xl:hidden">
        <div className="mx-auto max-w-2xl space-y-3.5">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className="relative flex min-h-[72px] sm:min-h-[82px] w-full items-center justify-between rounded-[16px] sm:rounded-[18px] border border-[#0E4A6833] bg-[#FFF4E5] pl-11 sm:pl-13 pr-4 sm:pr-5 py-4"
            >
              <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-[#0E4A6833] bg-[#FFF8EF]" />
              <div className="h-4 sm:h-5 w-3/4 rounded-md bg-[#0E4A681F]" />
              <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-[#0E4A681A] shrink-0" />
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <div className="h-40 w-full max-w-[320px] rounded-2xl border border-[#0E4A6833] bg-[#FFF8EF] p-5 flex flex-col items-center justify-center space-y-3">
            <div className="h-5 w-1/2 rounded-md bg-[#0E4A6826]" />
            <div className="h-9 w-32 rounded-xl bg-[#0E4A6826]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaqSkeleton;
