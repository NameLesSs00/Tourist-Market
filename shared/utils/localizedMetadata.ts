import type { Metadata } from "next";
import { getDictionary } from "./getDictionary";

const SITE_SUFFIX = " | Egypt Tourist Market";

/**
 * Builds localized page metadata from the language dictionary.
 *
 * @param locale  active route locale (en | de | ru | fr)
 * @param section dot-path to a dictionary node that exposes
 *                `metadataTitle` / `metadataDescription`
 *                (e.g. "touristServices", "carRental", "transfer")
 */
export function localizedMetadata(locale: string, section: string): Metadata {
  const dict = getDictionary(locale) as unknown as Record<string, any>;
  const node = section
    .split(".")
    .reduce<Record<string, any> | undefined>(
      (o, k) => (o ? o[k] : undefined),
      dict
    );

  const title =
    typeof node?.metadataTitle === "string" ? node.metadataTitle : "";
  const description =
    typeof node?.metadataDescription === "string"
      ? node.metadataDescription
      : "";

  return {
    title: title ? `${title}${SITE_SUFFIX}` : undefined,
    description: description || undefined,
  };
}
