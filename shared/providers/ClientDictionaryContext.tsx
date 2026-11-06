"use client";

import { createContext, useContext, type ReactNode } from "react";
// Only the English file, and only as the last resort below.
//
// The type import is erased at build time, but a value import of
// `@/shared/utils/getDictionary` here would defeat the whole point: that module
// statically pulls all four languages, so every chunk reaching this file would
// ship the complete translation set again. Falling back to one locale keeps the
// client graph small and matches what `getDictionary` itself does for an unknown
// locale.
import en from "@/langs/en.json";
import type { Dictionary } from "@/shared/utils/getDictionary";
import { formatDestinationTitle } from "@/shared/utils/destinationTitle";

/**
 * The dictionary of the current locale only.
 *
 * A client component that imports `getDictionary` pulls all four language files
 * into its chunk, because the locale is a runtime argument and the module cannot
 * be tree-shaken. Every client tree that reads copy therefore shipped the whole
 * translation set. The layout resolves the locale on the server and hands the one
 * matching dictionary down through this context instead.
 */
const ClientDictionaryContext = createContext<Dictionary | null>(null);

export function ClientDictionaryBridge({
  value,
  children,
}: {
  value: Dictionary;
  children: ReactNode;
}) {
  return (
    <ClientDictionaryContext.Provider value={value}>
      {children}
    </ClientDictionaryContext.Provider>
  );
}

/**
 * Reads the locale dictionary from the layout.
 *
 * The fallback keeps every call site working in a tree that has no provider (the
 * root not-found document renders outside the locale layout), so migrating a file
 * never changes what it prints - it only changes where the copy comes from.
 */
export function useClientDictionary(): Dictionary {
  return useContext(ClientDictionaryContext) ?? en;
}

/**
 * The locale-aware "thing in place" formatter used by detail headings, so a
 * visible `<h1>` says the same thing as the page `<title>` (see
 * formatDestinationTitle). Read it at the top of the component and call it later.
 */
export function useDestinationTitle(): (title: string) => string {
  const dict = useClientDictionary();
  return (title: string) => formatDestinationTitle(dict, title);
}
