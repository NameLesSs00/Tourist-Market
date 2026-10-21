"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiArrowRight, FiBookOpen, FiClock, FiCompass, FiGlobe, FiHelpCircle, FiLayers, FiShield, FiUser } from "react-icons/fi";
import useAuthStore from "@/features/auth/authStore";
import { useMeQuery } from "@/features/auth/useAuth";
import { useAdminFaqsQuery } from "@/features/faq/useFaqAdmin";
import { useAdminBlogsQuery } from "@/features/blogs/useBlogAdmin";
import { useAdminUsersQuery } from "@/features/admin/useAdminUsers";
import { useCountriesQuery } from "@/features/countries/useCountryAdmin";
import { useExcursionCategoriesQuery } from "@/features/excursionCategories/useExcursionCategoryAdmin";
import { useProductCategoriesQuery } from "@/features/productCategories/useProductCategoryAdmin";
import { isSuperAdmin } from "@/models/admin";

/** Temporary overview page (to be redesigned later). */
export function AdminDashboardComp() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const storedUser = useAuthStore((s) => s.user);
  const { data: profile } = useMeQuery();
  const user = profile || storedUser;
  const superAdmin = mounted && isSuperAdmin(user);
  const faqs = useAdminFaqsQuery({ pageNumber: 1, pageSize: 1 });
  const blogs = useAdminBlogsQuery({ pageNumber: 1, pageSize: 1 });
  const categoriesQuery = useExcursionCategoriesQuery({ pageNumber: 1, pageSize: 1, lang: "en" });
  const productCategoriesQuery = useProductCategoriesQuery({ pageNumber: 1, pageSize: 1, lang: "en" });
  const countriesQuery = useCountriesQuery("en");
  const admins = useAdminUsersQuery(
    { pageNumber: 1, pageSize: 1 },
    { enabled: superAdmin }
  );

  const name =
    mounted && (user?.firstName || user?.userName)
      ? user.firstName || user.userName
      : "Administrator";

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0E4A68] via-[#0B3D57] to-[#062A3D] p-8 text-[#FFFFFF] shadow-lg sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#D48C2833] blur-3xl" />
        <div className="relative max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#FFFFFF1A] px-3 py-1 text-xs font-medium text-[#F4DAB6]">
            <FiShield className="h-3.5 w-3.5" /> Admin Overview
          </span>
          <h1 className="text-3xl font-semibold sm:text-4xl">Welcome back, {name}!</h1>
          <p className="text-sm text-[#FFFFFFCC] sm:text-base">
            Signed in as <strong className="font-semibold text-[#FFFFFF]">{user?.email}</strong>. Use
            the sidebar to manage website content.
          </p>
        </div>
      </section>

      {/* Quick cards */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <Link
          href="/admin/dashboard/faqs"
          className="group rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0E4A6840] hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0E4A681A] text-[#0E4A68]">
              <FiHelpCircle className="h-5 w-5" />
            </div>
            <FiArrowRight className="h-4 w-4 text-[#94A3B8] transition-transform group-hover:translate-x-1 group-hover:text-[#0E4A68]" />
          </div>
          <p className="mt-5 text-3xl font-semibold text-[#083952]">
            {faqs.isLoading ? "—" : faqs.data?.totalCount ?? 0}
          </p>
          <p className="mt-1 text-sm text-[#64748B]">FAQs published</p>
        </Link>

        <Link
          href="/admin/dashboard/blogs"
          className="group rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#D48C2840] hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D48C281A] text-[#D48C28]">
              <FiBookOpen className="h-5 w-5" />
            </div>
            <FiArrowRight className="h-4 w-4 text-[#94A3B8] transition-transform group-hover:translate-x-1 group-hover:text-[#D48C28]" />
          </div>
          <p className="mt-5 text-3xl font-semibold text-[#083952]">
            {blogs.isLoading ? "—" : blogs.data?.totalCount ?? 0}
          </p>
          <p className="mt-1 text-sm text-[#64748B]">Blogs & Stories</p>
        </Link>

        <Link
          href="/admin/dashboard/excursion-categories"
          className="group rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0E4A6840] hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0E4A681A] text-[#0E4A68]">
              <FiCompass className="h-5 w-5" />
            </div>
            <FiArrowRight className="h-4 w-4 text-[#94A3B8] transition-transform group-hover:translate-x-1 group-hover:text-[#0E4A68]" />
          </div>
          <p className="mt-5 text-3xl font-semibold text-[#083952]">
            {categoriesQuery.isLoading ? "—" : categoriesQuery.data?.totalCount ?? 0}
          </p>
          <p className="mt-1 text-sm text-[#64748B]">Excursion Categories</p>
        </Link>

        <Link
          href="/admin/dashboard/product-categories"
          className="group rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0E4A6840] hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0E4A681A] text-[#0E4A68]">
              <FiLayers className="h-5 w-5" />
            </div>
            <FiArrowRight className="h-4 w-4 text-[#94A3B8] transition-transform group-hover:translate-x-1 group-hover:text-[#0E4A68]" />
          </div>
          <p className="mt-5 text-3xl font-semibold text-[#083952]">
            {productCategoriesQuery.isLoading ? "—" : productCategoriesQuery.data?.totalCount ?? 0}
          </p>
          <p className="mt-1 text-sm text-[#64748B]">Product Categories</p>
        </Link>

        <Link
          href="/admin/dashboard/countries"
          className="group rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0E4A6840] hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0E4A681A] text-[#0E4A68]">
              <FiGlobe className="h-5 w-5" />
            </div>
            <FiArrowRight className="h-4 w-4 text-[#94A3B8] transition-transform group-hover:translate-x-1 group-hover:text-[#0E4A68]" />
          </div>
          <p className="mt-5 text-3xl font-semibold text-[#083952]">
            {countriesQuery.isLoading ? "—" : countriesQuery.data?.length ?? 0}
          </p>
          <p className="mt-1 text-sm text-[#64748B]">Countries & Dialing Codes</p>
        </Link>

        {superAdmin && (
          <Link
            href="/admin/dashboard/admins"
            className="group rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0E4A6840] hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0E4A681A] text-[#0E4A68]">
                <FiShield className="h-5 w-5" />
              </div>
              <FiArrowRight className="h-4 w-4 text-[#94A3B8] transition-transform group-hover:translate-x-1 group-hover:text-[#0E4A68]" />
            </div>
            <p className="mt-5 text-3xl font-semibold text-[#083952]">
              {admins.isLoading ? "—" : admins.data?.totalCount ?? 0}
            </p>
            <p className="mt-1 text-sm text-[#64748B]">Administrators</p>
          </Link>
        )}

        <div className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D48C281A] text-[#D48C28]">
            <FiUser className="h-5 w-5" />
          </div>
          <p className="mt-5 text-lg font-semibold text-[#083952]">{user?.userName ?? "—"}</p>
          <p className="mt-1 text-sm text-[#64748B]">{user?.roles?.[0] ?? "Admin"}</p>
        </div>

        <div className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ECFDF5] text-[#059669]">
            <FiClock className="h-5 w-5" />
          </div>
          <p className="mt-5 text-lg font-semibold text-[#083952]">1 hour sessions</p>
          <p className="mt-1 text-sm text-[#64748B]">You’ll be signed out automatically when it ends.</p>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboardComp;
