"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface RelatedProduct {
  id: string;
  title: string;
  price: string;
  image: string;
}

const RELATED_PRODUCTS: RelatedProduct[] = [
  {
    id: "ananas-1",
    title: "ANANAS-PINEAPPLES",
    price: "5.00 $/PIECE",
    image: "/Hoteldeliveries/product-details/cea97bfaa2b16182bcbbfa00313df019dd4ecbb1.png",
  },
  {
    id: "cherimoya-1",
    title: "CHERIMOYA",
    price: "2.00 $/500 g",
    image: "/Hoteldeliveries/product-details/0fc7981686a3af0f6e17419f76c546a8e41aba2b.png",
  },
  {
    id: "watermelon-1",
    title: "WATERMELON",
    price: "1.00 $/KG",
    image: "/Hoteldeliveries/product-details/9d33047fd1866b5be63bb5362e19a2927aa30b36.png",
  },
  {
    id: "ananas-2",
    title: "ANANAS-PINEAPPLES",
    price: "5.00 $/PIECE",
    image: "/Hoteldeliveries/product-details/cea97bfaa2b16182bcbbfa00313df019dd4ecbb1.png",
  },
];

interface ProductDetailsRelatedProps {
  locale?: string;
}

export function ProductDetailsRelated({
  locale = "en",
}: ProductDetailsRelatedProps) {
  return (
    <section className="w-full font-poppins select-none mt-12 sm:mt-16">
      {/* ─── Section Title ─── */}
      <h3 className="text-[26px] sm:text-[30px] md:text-[34px] font-bold text-[#0E4A68] tracking-tight mb-8">
        Related Products
      </h3>

      {/* ─── 4 Columns Grid ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {RELATED_PRODUCTS.map((prod) => (
          <div key={prod.id} className="flex flex-col group">
            {/* Image Box */}
            <div
              className="relative w-full aspect-square rounded-[5px] flex items-center justify-center p-4 overflow-hidden transition-shadow duration-200 group-hover:shadow-md"
              style={{
                background: "#FFFFF2",
                border: "0.5px solid #888888",
              }}
            >
              <div className="relative w-[80%] h-[80%] transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={prod.image}
                  alt={prod.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Card Footer */}
            <div className="mt-3 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <h4 className="text-[14px] font-semibold text-[#0E4A68] tracking-wide uppercase truncate">
                  {prod.title}
                </h4>
                <Link
                  href={`/${locale}/hotel-deliveries/${prod.id}`}
                  aria-label={`View ${prod.title}`}
                  className="p-1 text-[#0E4A68] hover:opacity-80 transition-opacity cursor-pointer shrink-0"
                >
                  <Image
                    src="/Hoteldeliveries/Group.svg"
                    alt="View"
                    width={18}
                    height={13}
                    className="object-contain"
                  />
                </Link>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-[15px] font-bold text-[#0E4A68]">
                  {prod.price}
                </p>
                <button
                  type="button"
                  aria-label={`Add ${prod.title} to cart`}
                  className="p-1 text-[#0E4A68] hover:opacity-80 transition-opacity cursor-pointer shrink-0 active:scale-95"
                >
                  <Image
                    src="/Hoteldeliveries/Vector.svg"
                    alt="Add to cart"
                    width={17}
                    height={17}
                    className="object-contain"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductDetailsRelated;
