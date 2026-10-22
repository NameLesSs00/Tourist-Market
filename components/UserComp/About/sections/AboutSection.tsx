"use client";

import React from "react";
import {
  AboutHero,
  WhoWeAre,
  WhyChooseUs,
  OurMission,
  OurServices,
  CoverageExpansion,
} from "../components";

interface AboutSectionProps {
  locale?: string;
}

export function AboutSection({ locale = "en" }: AboutSectionProps) {
  return (
    <div className="w-full bg-[#FFF4E5]">
      {/* 1. Hero Section */}
      <AboutHero locale={locale} />

      {/* 2. Who We Are */}
      <WhoWeAre locale={locale} />

      {/* 3. Why Choose Us (Collage & 4 Feature Cards) */}
      <WhyChooseUs locale={locale} />

      {/* 4. Our Mission */}
      <OurMission locale={locale} />

      {/* 5. Our Services (Concentric Rotating Ring & 6 Service Cards) */}
      <OurServices locale={locale} />

      {/* 6. Coverage & Expansion (Locations Card & Circular Map) */}
      <CoverageExpansion locale={locale} />
    </div>
  );
}

export default AboutSection;
