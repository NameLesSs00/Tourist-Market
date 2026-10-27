"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogItem } from "@/models/blog";
import { BlogCard } from "@/components/UserComp/Blogs/components/BlogCard";
import { useClientBlogsQuery } from "@/features/blogs/useClientBlogs";

interface BlogsHomeSectionProps {
  locale?: string;
}

export function BlogsHomeSection({ locale = "en" }: BlogsHomeSectionProps) {
  // Fetch strictly 5 blogs for the home section
  const { data, isLoading } = useClientBlogsQuery(
    { pageNumber: 1, pageSize: 5 },
    locale
  );

  const blogs = data?.items && data.items.length > 0 ? data.items.slice(0, 5) : [];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || !scrollContainerRef.current) return;
    isPointerDownRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
    startScrollLeftRef.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPointerDownRef.current || !scrollContainerRef.current) return;
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = x - startXRef.current;
    if (Math.abs(walk) > 5) {
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        setIsDragging(true);
      }
      scrollContainerRef.current.scrollLeft = startScrollLeftRef.current - walk;
    }
  };

  const handleMouseUp = () => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    setTimeout(() => {
      setIsDragging(false);
      hasMovedRef.current = false;
    }, 50);
  };

  return (
    <section
      id="home-blogs"
      className="relative w-full py-16 sm:py-20 lg:py-24 overflow-hidden"
      aria-label="Blogs and Stories"
    >
      {/* Background with Natural Sand & Palm Leaf Shadows matching Hero */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <Image
          src="/homepage/hero/homeHeroBg.webp"
          alt="Egyptian Desert Background"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="relative z-10 max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2
            className="font-poppins font-semibold text-[28px] sm:text-[32px] lg:text-[36px] text-center tracking-normal align-middle"
            style={{ lineHeight: "42px" }}
          >
            <span className="text-[#003D5B]">From</span>{" "}
            <span className="text-[#D48C28]">Destinations</span>{" "}
            <span className="text-[#003D5B]">to</span>{" "}
            <span className="text-[#D48C28]">Memories</span>
          </h2>
          <p className="font-poppins text-sm sm:text-base text-[#646464] mt-2 font-normal">
            A World to Explore
          </p>
        </motion.div>

        {/* Horizontal Carousel Track Wrapper */}
        <div className="relative w-full">
          {/* 5 Blog Cards: Smooth Horizontal Scroller with Touch Swipe & Drag */}
          {isLoading ? (
            <div className="flex gap-6 sm:gap-7 lg:gap-8 overflow-hidden pb-4 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[86vw] sm:w-[390px] md:w-[410px] lg:w-[420px] 2xl:w-[435px] shrink-0 rounded-[20px] bg-[#0E4A68]/15 animate-pulse aspect-[16/16]"
                />
              ))}
            </div>
          ) : (
            <div
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onDragStart={(e) => e.preventDefault()}
              onClickCapture={(e) => {
                if (hasMovedRef.current) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              style={{ WebkitOverflowScrolling: "touch" }}
              className={`relative z-10 w-full overflow-x-auto no-scrollbar pb-4 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 select-none ${
                isDragging ? "cursor-grabbing scroll-auto" : "cursor-grab"
              }`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="flex gap-6 sm:gap-7 lg:gap-8 items-stretch"
              >
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="w-[86vw] sm:w-[390px] md:w-[410px] lg:w-[420px] 2xl:w-[435px] shrink-0 h-full select-none"
                  >
                    <BlogCard blog={blog} locale={locale} />
                  </div>
                ))}
              </motion.div>
            </div>
          )}
        </div>

        {/* Center CTA Button: Read More */}
        <div className="mt-12 sm:mt-14 flex justify-center">
          <Link
            href={`/${locale}/Blogs`}
            className="inline-flex items-center justify-center bg-[#165F84] hover:bg-[#0E4A68] active:scale-95 text-white font-poppins font-semibold text-sm sm:text-base py-3 px-12 rounded-[14px] transition-all duration-200 cursor-pointer"
            style={{
              boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.2)",
            }}
          >
            Read More
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BlogsHomeSection;
