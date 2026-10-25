"use client";

import React from "react";
import Link from "next/link";
import {
  useClientBlogDetailQuery,
  useClientRelatedBlogsQuery,
} from "@/features/blogs/useClientBlogs";
import {
  BlogDetailHero,
  BlogDetailShare,
  BlogDetailSectionItem,
  BlogDetailRelated,
} from "../components";

interface BlogDetailSectionProps {
  blogId: string;
  locale?: string;
}

export function BlogDetailSection({
  blogId,
  locale = "en",
}: BlogDetailSectionProps) {
  const { data: blog, isLoading, isError } = useClientBlogDetailQuery(
    blogId,
    locale
  );
  const { data: relatedBlogs } = useClientRelatedBlogsQuery(blogId, locale);

  if (isLoading) {
    return (
      <div className="w-full bg-[#FFF4E5] min-h-screen pt-24 sm:pt-28 lg:pt-32 pb-20 sm:pb-24">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/7.5] min-h-[220px] sm:min-h-[360px] lg:min-h-[460px] rounded-[20px] sm:rounded-[28px] lg:rounded-[36px] bg-[#0E4A68]/15 animate-pulse" />
          <div className="mt-6 sm:mt-8 h-6 sm:h-8 w-4/5 max-w-xl mx-auto rounded-full bg-[#0E4A68]/10 animate-pulse" />
          <div className="mt-8 sm:mt-12 h-8 sm:h-10 w-3/4 max-w-2xl mx-auto rounded-full bg-[#0E4A68]/10 animate-pulse" />
          <div className="mt-4 sm:mt-6 h-5 w-5/6 max-w-3xl mx-auto rounded-full bg-[#0E4A68]/10 animate-pulse" />
          <div className="mt-3 h-5 w-3/5 max-w-2xl mx-auto rounded-full bg-[#0E4A68]/10 animate-pulse" />
        </div>
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="w-full bg-[#FFF4E5] min-h-[70vh] flex flex-col items-center justify-center px-4 sm:px-6 pt-24 sm:pt-28 pb-16 text-center">
        <h2 className="font-['Poppins'] text-xl sm:text-2xl md:text-3xl font-bold text-[#0E4A68]">
          Article Not Found
        </h2>
        <p className="font-['Poppins'] text-xs sm:text-sm md:text-base text-[#0E4A68]/80 mt-2 max-w-md">
          The travel story you are looking for does not exist or may have been moved.
        </p>
        <Link
          href={`/${locale}/Blogs`}
          className="mt-6 inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#0E4A68] text-white font-['Poppins'] text-xs sm:text-sm font-medium hover:bg-[#083952] transition-colors shadow-sm active:scale-95"
        >
          Back to Blogs
        </Link>
      </div>
    );
  }

  const sections = blog.sections || [];

  return (
    <article className="relative w-full bg-[#FFF4E5] min-h-screen pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24 lg:pb-28">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* 1. Hero Cover Banner & Tagline */}
        <BlogDetailHero imageUrl={blog.imageUrl} title={blog.title} />

        {/* 2. Share Bar */}
        <div className="mt-3 sm:mt-5">
          <BlogDetailShare title={blog.title} />
        </div>

        {/* 3. Main Article Header (Title & Subtitle Lead) */}
        <header className="max-w-[1000px] mx-auto text-center mt-6 sm:mt-10 lg:mt-12 px-2 sm:px-4">
          <h1 className="font-['Poppins'] font-semibold text-[22px] sm:text-[28px] md:text-[34px] lg:text-[38px] leading-[1.28] sm:leading-[1.25] text-[#0A3951]">
            {blog.title}
          </h1>

          {blog.description && (
            <p className="font-['Poppins'] font-normal text-[15px] sm:text-[18px] lg:text-[22px] xl:text-[24px] leading-[1.6] text-[#0A3951]/90 mt-3 sm:mt-5 lg:mt-6">
              {blog.description}
            </p>
          )}
        </header>

        {/* 4. Sequential Blog Sections */}
        {sections.length > 0 && (
          <div className="max-w-[1080px] mx-auto mt-6 sm:mt-10 lg:mt-12">
            {sections.map((section, idx) => (
              <BlogDetailSectionItem
                key={section.id || idx}
                section={section}
                index={idx}
              />
            ))}
          </div>
        )}

        {/* 5. Related Articles (3 Random Cards) */}
        <BlogDetailRelated blogs={relatedBlogs || []} locale={locale} />
      </div>
    </article>
  );
}

export default BlogDetailSection;
