// ---------------------------------------------------------------------------
// Font definitions shared by every root layout.
//
// The app has two root layouts (the public locale tree and the admin area), so
// the font variables must live outside app/layout.tsx to avoid defining them
// twice.
//
// The weight lists below are the result of a usage sweep over every tsx/css
// file in the project, not a guess: each declared face is a weight some element
// actually asks for. Manrope was dropped outright - the only references to it
// were its own declaration and the @theme line in globals.css. Montserrat keeps
// the single weight the hero headings use (they all pair font-['Montserrat']
// with font-bold) and Caveat likewise: its two callouts carry no weight
// utility at all, so they render at 400. Sixteen faces became seven.
// ---------------------------------------------------------------------------

import { Poppins, Montserrat, Caveat } from "next/font/google";

export const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700"],
});

export const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400"],
});

/**
 * Class string for <html>: exposes every font as a CSS variable and keeps the
 * antialiasing that the previous root layout applied.
 */
export const HTML_FONT_CLASSES = [
  poppins.variable,
  montserrat.variable,
  caveat.variable,
  "h-full",
  "antialiased",
].join(" ");

/** Class string for <body>: the default family plus the page background/ink. */
export const BODY_FONT_CLASSES = `${poppins.className} min-h-full flex flex-col bg-[#FFF4E5] text-[#083952]`;
