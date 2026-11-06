// ---------------------------------------------------------------------------
// "Thing in place" - the naming rule behind detail titles and detail headings.
//
// This lives in its own module because the client dictionary provider needs it and
// must not reach `getDictionary` (which imports all four language files): the
// formatter takes an already resolved dictionary and touches no other module.
// ---------------------------------------------------------------------------

interface DestinationCopy {
  seo?: { detailTitlePattern?: string; destinationName?: string };
}

/**
 * Names the place next to the thing.
 *
 * A catalogue title is a product name ("Desert Safari", "VIP Meet & Assist"). On its
 * own it says nothing about where the service happens, and a search for the thing
 * tourists actually type - "car rental in Hurghada" - has no term to match. The
 * pattern comes from the dictionary (`seo.detailTitlePattern`), so the grammar stays
 * per language, and the same string feeds the visible `<h1>` so the heading and the
 * title never disagree.
 */
export function formatDestinationTitle(dict: DestinationCopy, title: string): string {
  const pattern = dict.seo?.detailTitlePattern ?? "";
  if (!pattern || !title) return title;
  return pattern.replace("{title}", title);
}
