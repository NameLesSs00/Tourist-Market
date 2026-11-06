import { ImageResponse } from "next/og";
import type { LangCode } from "@/models/localization";
import {
  BRAND,
  BRAND_COLORS,
  DEFAULT_LOCALE,
  LOCALE_OG_TAGLINE,
  SITE_HOST,
  SUPPORTED_LOCALES,
  isLocale,
} from "@/shared/utils/siteConfig";

// ---------------------------------------------------------------------------
// /[locale]/opengraph-image (1200x630)
//
// The social default for the whole public tree. A page that has its own picture
// (a service item, an excursion, a product, a blog post) sets `openGraph.images`
// through buildMetadata and overrides this card; everything else - the home page,
// the list pages, About - shares this one.
//
// The text is drawn, not photographed, so nothing here depends on the backend or
// on a network fetch at build time.
// ---------------------------------------------------------------------------

export const alt = `${BRAND} - ${LOCALE_OG_TAGLINE.en}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Built for the same four params the layout declares, so it stays prerendered. */
export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((local) => ({ local }));
}

type ImageProps = { params?: Promise<{ local: string }> | { local: string } };

/** The locale this card belongs to; an unexpected segment falls back to English. */
async function localeFrom(params: ImageProps["params"]): Promise<LangCode> {
  const resolved = await params;
  const segment = resolved?.local;
  return isLocale(segment) ? segment : DEFAULT_LOCALE;
}

export default async function OpenGraphImage({ params }: ImageProps) {
  const locale = await localeFrom(params);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: BRAND_COLORS.primary,
        }}
      >
        {/* brand accent down the left edge */}
        <div
          style={{ width: 14, height: "100%", display: "flex", backgroundColor: BRAND_COLORS.accent }}
        />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "70px 80px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <div
              style={{
                width: 58,
                height: 58,
                display: "flex",
                borderRadius: 999,
                backgroundColor: BRAND_COLORS.accent,
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[62, 44, 26].map((width) => (
                <div
                  key={width}
                  style={{
                    width,
                    height: 9,
                    display: "flex",
                    borderRadius: 999,
                    backgroundColor: BRAND_COLORS.background,
                  }}
                />
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 82,
                fontWeight: 700,
                lineHeight: 1.08,
                color: "#FFFFFF",
                display: "flex",
              }}
            >
              {BRAND}
            </div>
            <div
              style={{
                marginTop: 26,
                fontSize: 40,
                lineHeight: 1.25,
                color: BRAND_COLORS.background,
                display: "flex",
              }}
            >
              {LOCALE_OG_TAGLINE[locale]}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 30,
              color: BRAND_COLORS.background,
            }}
          >
            <div style={{ display: "flex" }}>{SITE_HOST}</div>
            <div
              style={{
                display: "flex",
                padding: "8px 22px",
                borderRadius: 999,
                border: `2px solid ${BRAND_COLORS.accent}`,
                color: BRAND_COLORS.accent,
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              {locale}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
