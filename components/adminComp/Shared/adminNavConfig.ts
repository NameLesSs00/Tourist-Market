import type { IconType } from "react-icons";
import { FaCar } from "react-icons/fa6";
import {
  FiBookmark,
  FiBookOpen,
  FiBriefcase,
  FiCalendar,
  FiClipboard,
  FiClock,
  FiCompass,
  FiDollarSign,
  FiGlobe,
  FiGrid,
  FiHelpCircle,
  FiLayers,
  FiMapPin,
  FiMessageSquare,
  FiNavigation,
  FiPackage,
  FiRepeat,
  FiShield,
  FiShoppingBag,
  FiSliders,
  FiStar,
  FiTag,
  FiUsers,
} from "react-icons/fi";

export interface NavChildItem {
  label: string;
  href: string;
  icon?: IconType;
  superAdminOnly?: boolean;
}

export interface NavCategory {
  id: string;
  label: string;
  icon: IconType;
  superAdminOnly?: boolean;
  children: NavChildItem[];
}

export interface StandaloneNavItem {
  label: string;
  href: string;
  icon: IconType;
  superAdminOnly?: boolean;
}

export const STANDALONE_NAV_ITEMS: StandaloneNavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: FiGrid },
];

export const NAV_CATEGORIES: NavCategory[] = [
  {
    id: "excursions",
    label: "Excursions & Tours",
    icon: FiCompass,
    children: [
      { label: "Private Excursions", href: "/admin/dashboard/private-excursions", icon: FiNavigation },
      { label: "Private Bookings", href: "/admin/dashboard/private-bookings", icon: FiBookmark },
      { label: "Group Excursions", href: "/admin/dashboard/group-excursions", icon: FiUsers },
      { label: "Group Bookings", href: "/admin/dashboard/group-bookings", icon: FiCalendar },
      { label: "Categories", href: "/admin/dashboard/excursion-categories", icon: FiCompass },
      { label: "Attractions", href: "/admin/dashboard/attractions", icon: FiMapPin },
      { label: "Extra Services", href: "/admin/dashboard/excursion-services", icon: FiPackage },
      { label: "Vehicle Transfers", href: "/admin/dashboard/vehicle-private", icon: FaCar },
      { label: "Excursion Reviews", href: "/admin/dashboard/excursion-reviews", icon: FiStar },
    ],
  },
  {
    id: "products",
    label: "Products & Store",
    icon: FiShoppingBag,
    children: [
      { label: "All Products", href: "/admin/dashboard/products", icon: FiShoppingBag },
      { label: "Categories", href: "/admin/dashboard/product-categories", icon: FiLayers },
      { label: "Subcategories", href: "/admin/dashboard/product-subcategories", icon: FiTag },
      { label: "Product Bookings", href: "/admin/dashboard/product-bookings", icon: FiClipboard },
      { label: "Product Reviews", href: "/admin/dashboard/product-reviews", icon: FiStar },
    ],
  },
  {
    id: "site-services",
    label: "Site Services",
    icon: FiBriefcase,
    children: [
      { label: "All Services", href: "/admin/dashboard/site-services", icon: FiBriefcase },
      { label: "Service Items", href: "/admin/dashboard/site-service-items", icon: FiSliders },
      { label: "Service Bookings", href: "/admin/dashboard/services-bookings", icon: FiCalendar },
      { label: "Service Reviews", href: "/admin/dashboard/site-service-item-reviews", icon: FiMessageSquare },
    ],
  },
  {
    id: "transfers",
    label: "Transfers",
    icon: FiRepeat,
    children: [
      { label: "Transfer Services", href: "/admin/dashboard/transfer-services", icon: FiRepeat },
      { label: "Transfer Bookings", href: "/admin/dashboard/transfer-bookings", icon: FiClock },
    ],
  },
  {
    id: "content",
    label: "Content & CMS",
    icon: FiBookOpen,
    children: [
      { label: "Blogs", href: "/admin/dashboard/blogs", icon: FiBookOpen },
      { label: "FAQs", href: "/admin/dashboard/faqs", icon: FiHelpCircle },
    ],
  },
  {
    id: "settings",
    label: "Settings & System",
    icon: FiSliders,
    children: [
      { label: "Countries", href: "/admin/dashboard/countries", icon: FiGlobe },
      { label: "Currencies", href: "/admin/dashboard/currencies", icon: FiDollarSign },
      { label: "Admin Users", href: "/admin/dashboard/admins", icon: FiShield, superAdminOnly: true },
    ],
  },
];
