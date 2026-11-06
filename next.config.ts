import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // The two modern formats, declared rather than inherited: a browser that
    // supports AVIF gets AVIF, one that only supports WebP still gets a small file.
    formats: ["image/avif", "image/webp"],
    // Backend uploads never change under their URL, so a converted variant can be
    // cached by the CDN for a day instead of the 60-second default.
    minimumCacheTTL: 60 * 60 * 24,
    // Trimmed to the widths the `sizes` attributes in the app can actually ask
    // for. The largest declared layout width is 1440px and the full-bleed heroes
    // cap at 100vw, so 640..1920 covers every candidate; the 2080/3840 defaults
    // would only ever serve an oversized file to the few 4K visitors.
    deviceSizes: [640, 750, 1080, 1200, 1440, 1920],
    // Icons (14-64px) and cards/thumbnails (75-384px) are the whole small-image
    // range in use.
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "touristtt.runasp.net",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "touristtt.runasp.net",
        pathname: "/**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
