import { ImageResponse } from "next/og";
import { BRAND, BRAND_COLORS, SUPPORTED_LOCALES } from "@/shared/utils/siteConfig";

// ---------------------------------------------------------------------------
// /apple-icon (180x180)
//
// The brand mark redrawn as pure boxes: an installed tab and an iPhone home
// screen get a flat, high-contrast tile in the brand field. No <img> and no
// remote font, because satori renders what it is given synchronously and a
// missing asset would fail the build instead of a page.
// ---------------------------------------------------------------------------

export const alt = BRAND;
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** The layout exports the same four params, so this tile is built at deploy time. */
export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((local) => ({ local }));
}

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: BRAND_COLORS.primary,
        }}
      >
        {/* sun over the sea */}
        <div
          style={{
            width: 62,
            height: 62,
            display: "flex",
            borderRadius: 999,
            backgroundColor: BRAND_COLORS.accent,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            marginTop: 22,
          }}
        >
          {[104, 76, 48].map((width) => (
            <div
              key={width}
              style={{
                width,
                height: 14,
                display: "flex",
                borderRadius: 999,
                backgroundColor: BRAND_COLORS.background,
              }}
            />
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
