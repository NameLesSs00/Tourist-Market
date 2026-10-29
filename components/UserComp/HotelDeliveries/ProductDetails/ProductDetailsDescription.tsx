"use client";

import React from "react";

export function ProductDetailsDescription() {
  return (
    <div
      className="w-full p-6 sm:p-8 font-poppins select-none shadow-sm"
      style={{
        background: "#FFFFFF",
        border: "0.8px solid #BBBBBB",
        borderRadius: "10px",
      }}
    >
      {/* ─── Main Title ─── */}
      <h3 className="text-[22px] sm:text-[26px] md:text-[28px] font-bold text-[#0E4A68] tracking-tight mb-6">
        Pineapple: The Tropical Powerhouse
      </h3>

      {/* ─── Subsections ─── */}
      <div className="flex flex-col gap-6 text-[14px] sm:text-[15px] leading-relaxed text-[#333333]">
        {/* Origin & Flavor */}
        <div>
          <h4 className="font-bold text-[#0E4A68] text-[16px] sm:text-[17px] mb-2">
            Origin & Flavor
          </h4>
          <ul className="flex flex-col gap-1.5 pl-2">
            <li className="flex items-start gap-2">
              <span className="text-[#0E4A68] font-bold">•</span>
              <span>
                <strong className="font-semibold text-[#0E4A68]">
                  A Tropical Gem:
                </strong>{" "}
                Native to South America, now flourishing in Hawaii, Southeast Asia,
                and Africa.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0E4A68] font-bold">•</span>
              <span>
                <strong className="font-semibold text-[#0E4A68]">
                  Taste Profile:
                </strong>{" "}
                Renowned for its iconic balance of sweet and tangy flavors.
              </span>
            </li>
          </ul>
        </div>

        {/* Nutritional Profile */}
        <div>
          <h4 className="font-bold text-[#0E4A68] text-[16px] sm:text-[17px] mb-2">
            Nutritional Profile
          </h4>
          <ul className="flex flex-col gap-1.5 pl-2">
            <li className="flex items-start gap-2">
              <span className="text-[#0E4A68] font-bold">•</span>
              <span>
                <strong className="font-semibold text-[#0E4A68]">Vitamins:</strong>{" "}
                Rich in Vitamin C, A, and Manganese.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0E4A68] font-bold">•</span>
              <span>
                <strong className="font-semibold text-[#0E4A68]">
                  Protection:
                </strong>{" "}
                Loaded with antioxidants that combat inflammation and disease.
              </span>
            </li>
          </ul>
        </div>

        {/* Key Health Benefits */}
        <div>
          <h4 className="font-bold text-[#0E4A68] text-[16px] sm:text-[17px] mb-2">
            Key Health Benefits
          </h4>
          <ul className="flex flex-col gap-1.5 pl-2">
            <li className="flex items-start gap-2">
              <span className="text-[#0E4A68] font-bold">•</span>
              <span>
                <strong className="font-semibold text-[#0E4A68]">
                  Digestion Hero:
                </strong>{" "}
                Contains Bromelain, a unique enzyme that breaks down proteins and
                improves gut health.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0E4A68] font-bold">•</span>
              <span>
                <strong className="font-semibold text-[#0E4A68]">
                  Anti-Inflammatory:
                </strong>{" "}
                Helps reduce bodily swelling and promotes healing.
              </span>
            </li>
          </ul>
        </div>

        {/* Versatile Uses */}
        <div>
          <h4 className="font-bold text-[#0E4A68] text-[16px] sm:text-[17px] mb-2">
            Versatile Uses
          </h4>
          <ul className="flex flex-col gap-1.5 pl-2">
            <li className="flex items-start gap-2">
              <span className="text-[#0E4A68] font-bold">•</span>
              <span>
                <strong className="font-semibold text-[#0E4A68]">Culinary:</strong>{" "}
                Enjoyed fresh, juiced, or in savory dishes like fried rice and
                marinades.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0E4A68] font-bold">•</span>
              <span>
                <strong className="font-semibold text-[#0E4A68]">
                  Beyond the Kitchen:
                </strong>{" "}
                Used in skincare for brightening effects and as a natural meat
                tenderizer due to its enzymatic properties.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsDescription;
