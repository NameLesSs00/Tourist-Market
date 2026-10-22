"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "../types";

interface BlogCardProps {
  blog: BlogPost;
  locale?: string;
}

export function BlogCard({ blog, locale = "en" }: BlogCardProps) {
  const isRTL = locale === "ar";

  return (
    <div
      data-rtl={isRTL}
      className="group relative flex flex-col w-full"
    >
      {/* Smooth Animated Border (matches PromptsUi/blogsanimation.png) */}
      <div
        aria-hidden="true"
        style={{
          borderRadius: "30px",
          border: "1px solid #888888",
        }}
        className="blog-card-animated-border pointer-events-none absolute inset-0 z-0"
      />

      {/* Main Blog Card */}
      <article
        style={{
          borderRadius: "20px",
          backgroundColor: "#0E4A68",
        }}
        className="relative z-10 flex flex-col w-full h-full overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        {/* Top: Blog Image */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] overflow-hidden bg-[#0A384F]">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        {/* Bottom: Card Body */}
        <div className="flex flex-col flex-1 justify-between p-5 sm:p-6 lg:p-7 text-white">
          <div>
            {/* Card Title */}
            <h3 className="font-['Poppins'] text-[18px] sm:text-[20px] font-bold leading-snug tracking-tight text-white line-clamp-1">
              {blog.title}
            </h3>

            {/* Card Excerpt */}
            <p className="mt-2.5 font-['Poppins'] text-[13px] sm:text-[14px] leading-[1.6] text-white/90 line-clamp-3">
              {blog.excerpt}
            </p>
          </div>

          {/* Card Button ("Read article") */}
          <div className="mt-6 flex justify-center w-full">
            <Link
              href={`/${locale}/blogs/${blog.slug}`}
              style={{
                backgroundColor: "#FFFFFFEB",
                color: "#000000",
                boxShadow: "0px 4px 4px 0px #FFFFFF40",
                borderRadius: "25px",
              }}
              className="inline-flex items-center justify-center px-6 py-2 font-['Poppins'] text-[13px] sm:text-[14px] font-medium tracking-normal transition-all duration-200 hover:bg-white hover:scale-[1.02] active:scale-[0.98]"
            >
              Read article
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

export default BlogCard;
