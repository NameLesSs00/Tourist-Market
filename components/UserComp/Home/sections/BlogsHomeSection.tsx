"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { BlogCard } from "@/components/UserComp/Blogs/components/BlogCard";
import { useClientBlogsQuery } from "@/features/blogs/useClientBlogs";
import { getDictionary } from "@/shared/utils/getDictionary";

interface BlogsHomeSectionProps {
  locale?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function BlogsHomeSection({ locale = "en" }: BlogsHomeSectionProps) {
  const dict = getDictionary(locale);
  const t = dict.blogs;

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
      aria-label={t.sectionAria}
    >
      {/* Background with Natural Sand & Palm Leaf Shadows matching Hero */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <Image
          src="/homepage/hero/homeHeroBg.webp"
          alt={t.altBackground}
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
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2
            className="font-poppins font-semibold text-[28px] sm:text-[32px] lg:text-[36px] text-center tracking-normal align-middle"
            style={{ lineHeight: "42px" }}
          >
            <span className="text-[#003D5B]">{t.titleFrom}</span>{" "}
            <span className="text-[#D48C28]">{t.titleDestinations}</span>{" "}
            <span className="text-[#003D5B]">{t.titleTo}</span>{" "}
            <span className="text-[#D48C28]">{t.titleMemories}</span>
          </h2>
          <p className="font-poppins text-sm sm:text-base text-[#646464] mt-2 font-normal">
            {t.subtitle}
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
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8"
          >
            {blogs.map((blog, index) => {
              const total = blogs.length;
              const colsPerRow = 3;
              const orphanCount = total % colsPerRow;
              const isOrphan =
                orphanCount !== 0 && index >= total - orphanCount;
              const centerClass =
                isOrphan && orphanCount === 1
                  ? "lg:col-start-2 sm:col-start-1"
                  : "";
              return (
                <motion.div
                  key={blog.id}
                  variants={cardItemVariants}
                  className={centerClass}
                >
                  <BlogCard blog={blog} locale={locale} />
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Center CTA Button: Read More */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
          className="mt-12 sm:mt-14 flex justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href={`/${locale}/Blogs`}
              className="inline-flex items-center justify-center bg-[#165F84] hover:bg-[#0E4A68] text-white font-poppins font-semibold text-sm sm:text-base py-3 px-12 rounded-[14px] transition-colors cursor-pointer"
              style={{
                boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.2)",
              }}
            >
              {t.readMore}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default BlogsHomeSection;
