import type { MetadataRoute } from "next";
import { BRAND, BRAND_COLORS, CONTACT, DEFAULT_LOCALE } from "@/shared/utils/siteConfig";

// ---------------------------------------------------------------------------
// /manifest.webmanifest
//
// The site stays a website: the manifest only makes an "add to home screen"
// install look right. `start_url` is the default locale rather than "/", because
// proxy.ts answers "/" with a redirect and an installed app should not boot on one.
// ---------------------------------------------------------------------------

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND,
    short_name: "Tourist Market",
    description: `Excursions, transfers, car rental and VIP airport assistance in ${CONTACT.location}.`,
    id: "/",
    start_url: `/${DEFAULT_LOCALE}`,
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    lang: DEFAULT_LOCALE,
    dir: "ltr",
    background_color: BRAND_COLORS.background,
    theme_color: BRAND_COLORS.primary,
    categories: ["travel", "lifestyle"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}
