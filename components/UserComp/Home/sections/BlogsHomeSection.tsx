"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlogCard } from "@/components/UserComp/Blogs/components/BlogCard";
import { useClientBlogsQuery } from "@/features/blogs/useClientBlogs";

interface BlogsHomeSectionProps {
  locale?: string;
}

export function BlogsHomeSection({ locale = "en" }: BlogsHomeSectionProps) {
  // Fetch only 3 blogs for the home section grid
  const { data, isLoading } = useClientBlogsQuery(
    { pageNumber: 1, pageSize: 3 },
    locale
  );

  const blogs =
    data?.items && data.items.length > 0 ? data.items.slice(0, 3) : [];

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

        {/* Blog Cards Grid: 1 col on mobile, 2 on sm, 3 on lg */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-[20px] bg-[#0E4A68]/15 animate-pulse aspect-[16/16]"
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            {/* Grid wrapper — centers any orphan card in the last row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
              {blogs.map((blog, index) => {
                const total = blogs.length;
                const colsPerRow = 3;
                const orphanCount = total % colsPerRow;
                const isOrphan =
                  orphanCount !== 0 && index >= total - orphanCount;
                // Center a single orphan on lg (3-col) grid by offsetting col-start
                const centerClass =
                  isOrphan && orphanCount === 1
                    ? "lg:col-start-2 sm:col-start-1"
                    : "";
                return (
                  <div key={blog.id} className={centerClass}>
                    <BlogCard blog={blog} locale={locale} />
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

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
