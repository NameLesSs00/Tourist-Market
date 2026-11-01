import React from "react";
import Image from "next/image";

interface ServiceHeroProps {
  imageSrc: string;
  altText: string;
}

export function ServiceHero({ imageSrc, altText }: ServiceHeroProps) {
  return (
    <div className="w-full max-w-[1320px] mx-auto px-3 sm:px-4 lg:px-6 pt-3 sm:pt-6">
      <div className="relative w-full overflow-hidden shadow-sm rounded-xl sm:rounded-2xl aspect-[16/9] sm:aspect-[21/9] md:aspect-[1280/540] min-h-[160px] sm:min-h-[220px] md:min-h-[260px]">
        <Image
          src={imageSrc}
          alt={altText}
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1320px"
          className="object-cover object-center"
        />
      </div>
    </div>
  );
}

export default ServiceHero;
