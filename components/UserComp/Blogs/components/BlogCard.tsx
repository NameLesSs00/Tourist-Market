"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { BlogItem } from "@/models/blog";
import {
  DEFAULT_BLOG_FALLBACK_IMAGE,
  getBlogImageUrl,
} from "../utils/blogImage";

interface BlogCardProps {
  blog: BlogItem;
  locale?: string;
}

export function BlogCard({ blog, locale = "en" }: BlogCardProps) {
  const isRTL = locale === "ar";
  const [imgSrc, setImgSrc] = useState(() => getBlogImageUrl(blog.imageUrl));

  React.useEffect(() => {
    setImgSrc(getBlogImageUrl(blog.imageUrl));
  }, [blog.imageUrl]);

  return (
    <div
      data-rtl={isRTL}
      className="group relative flex flex-col w-full select-none"
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
        }}
        className="relative z-10 flex flex-col w-full h-full overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl select-none"
      >
        {/* Top: Blog Image (Clickable) */}
        <Link
          href={`/${locale}/Blogs/${blog.id}`}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          className="relative block w-full aspect-[16/10] sm:aspect-[16/9.5] overflow-hidden rounded-t-[20px] cursor-pointer select-none"
          aria-label={`Read article: ${blog.title}`}
        >
          <Image
            src={imgSrc}
            alt={blog.title || "Egypt travel story"}
            fill
            draggable={false}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            onError={() => setImgSrc(DEFAULT_BLOG_FALLBACK_IMAGE)}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 pointer-events-none select-none"
          />
        </Link>

        {/* Bottom: Card Body */}
        <div
          style={{ backgroundColor: "#0E4A68" }}
          className="flex flex-col flex-1 justify-between p-5 sm:p-6 lg:p-7 text-white rounded-b-[20px]"
        >
          <div>
            {/* Card Title (Clickable) */}
            <h3 className="font-['Poppins'] text-[18px] sm:text-[20px] font-bold leading-snug tracking-tight text-white line-clamp-1">
              <Link
                href={`/${locale}/Blogs/${blog.id}`}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                className="hover:underline text-white transition-opacity hover:opacity-90 select-none"
              >
                {blog.title}
              </Link>
            </h3>

            {/* Card Description */}
            <p className="mt-2.5 font-['Poppins'] text-[13px] sm:text-[14px] leading-[1.6] text-white/90 line-clamp-3 select-none">
              {blog.description}
            </p>
          </div>

          {/* Card Button ("Read article") */}
          <div className="mt-6 flex justify-center w-full">
            <Link
              href={`/${locale}/Blogs/${blog.id}`}
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              style={{
                backgroundColor: "#FFFFFFEB",
                color: "#000000",
                boxShadow: "0px 4px 4px 0px #FFFFFF40",
                borderRadius: "25px",
              }}
              className="inline-flex items-center justify-center px-6 py-2 font-['Poppins'] text-[13px] sm:text-[14px] font-medium tracking-normal transition-all duration-200 hover:bg-white hover:scale-[1.02] active:scale-[0.98] select-none"
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
