"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  DEFAULT_BLOG_FALLBACK_IMAGE,
  getBlogImageUrl,
} from "../utils/blogImage";

interface BlogDetailHeroProps {
  imageUrl?: string | null;
  title: string;
}

export function BlogDetailHero({ imageUrl, title }: BlogDetailHeroProps) {
  const [imgSrc, setImgSrc] = useState(() => getBlogImageUrl(imageUrl));

  return (
    <section className="w-full">
      {/* 1. Large Rounded Hero Image Banner */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/7.5] min-h-[220px] sm:min-h-[360px] lg:min-h-[460px] max-h-[580px] rounded-[20px] sm:rounded-[28px] lg:rounded-[36px] overflow-hidden shadow-sm bg-[#0A3951]/10">
        <Image
          src={imgSrc}
          alt={title || "Blog cover"}
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1440px"
          onError={() => setImgSrc(DEFAULT_BLOG_FALLBACK_IMAGE)}
          className="object-cover"
        />
      </div>

      {/* 2. Tagline Banner */}
      <div className="mt-6 sm:mt-8 lg:mt-12 text-center px-2 sm:px-4">
        <h2 className="font-['Poppins'] font-bold text-[20px] xs:text-[22px] sm:text-[30px] md:text-[36px] lg:text-[45px] leading-[1.25] sm:leading-[1.2] text-[#0E4A68] tracking-tight uppercase">
          UNEARTH THE EGYPTIAN SOUL. YOUR ADVENTURE AWAITS.
        </h2>
      </div>
    </section>
  );
}

export default BlogDetailHero;
