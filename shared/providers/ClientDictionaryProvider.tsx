import type { ReactNode } from "react";
import { getDictionary } from "@/shared/utils/getDictionary";
import { ClientDictionaryBridge } from "./ClientDictionaryContext";

/**
 * Resolves the locale on the server and hands its dictionary to the client tree.
 *
 * This file stays a server component on purpose: it is the only place allowed to
 * reach `getDictionary`, and the dictionary travels as data instead of as code, so
 * a client chunk no longer has to carry the four language files because one of
 * them is chosen at render time. See ClientDictionaryContext.tsx for the hook.
 */
export function ClientDictionaryProvider({
  locale,
  children,
}: {
  locale: string;
  children: ReactNode;
}) {
  return <ClientDictionaryBridge value={getDictionary(locale)}>{children}</ClientDictionaryBridge>;
}
