"use client";

import {
  createContext,
  useContext,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * One heading per document, also in the bytes before JavaScript runs.
 *
 * A page whose content boundary the prerender postpones delivers two copies of the
 * same tree: the `Suspense` fallback the shell renders and the resolved content that
 * follows it. When the fallback is the section itself (the shape this app uses to keep
 * the layout from jumping), that duplicate also carries a second `<h1>`, which is the
 * one heading a crawler is free to disagree about. The layout is unchanged - inside a
 * fallback scope the section heading renders as the same element with the same classes
 * and simply stops being a heading, so the document keeps exactly one.
 */
const FallbackHeadingContext = createContext(false);

export function FallbackHeadingScope({ children }: { children: ReactNode }) {
  return (
    <FallbackHeadingContext.Provider value>{children}</FallbackHeadingContext.Provider>
  );
}

/** True while rendering inside a `Suspense` fallback. */
export function useIsFallbackHeading(): boolean {
  return useContext(FallbackHeadingContext);
}

interface ContentHeadingProps {
  /** the heading level the page would use outside a fallback scope */
  as?: "h1" | "h2" | "h3";
  className?: string;
  style?: CSSProperties;
  id?: string;
  children: ReactNode;
}

export function ContentHeading({
  as = "h1",
  className,
  style,
  id,
  children,
}: ContentHeadingProps) {
  const Tag: ElementType = useIsFallbackHeading() ? "div" : as;
  return (
    <Tag id={id} className={className} style={style}>
      {children}
    </Tag>
  );
}
