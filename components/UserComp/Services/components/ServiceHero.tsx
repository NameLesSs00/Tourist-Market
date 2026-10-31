import React from "react";
import Image from "next/image";

interface ServiceHeroProps {
  imageSrc: string;
  altText: string;
}

export function ServiceHero({ imageSrc, altText }: ServiceHeroProps) {
  return (
    <div className="w-full max-w-[1320px] mx-auto px-4 pt-4 sm:pt-6">
      <div
        className="relative w-full overflow-hidden shadow-sm"
        style={{
          borderRadius: "15px",
          aspectRatio: "1280 / 540",
          minHeight: "240px",
        }}
      >
        <Image
          src={imageSrc}
          alt={altText}
          fill
          priority
          sizes="(max-width: 1440px) 100vw, 1320px"
          className="object-cover object-center"
        />
      </div>
    </div>
  );
}

export default ServiceHero;
