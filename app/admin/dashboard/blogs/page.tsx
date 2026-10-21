import type { Metadata } from "next";
import { BlogManagerComp } from "@/components/adminComp/Blogs";

export const metadata: Metadata = {
  title: "Blogs & Stories | Admin Portal",
  description: "Manage travel stories, cultural articles, and blog sections",
};

export default function AdminBlogsPage() {
  return <BlogManagerComp />;
}
