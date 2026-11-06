import type { JsonLdObject } from "@/shared/utils/jsonLd";

// ---------------------------------------------------------------------------
// The renderer half of the structured data (the builders live in
// shared/utils/jsonLd.ts, the data assembly in features/seo/structuredData.ts).
//
// One <script type="application/ld+json"> per page is rendered, exactly as the
// Next.js JSON-LD guide prescribes: a plain tag inside the page tree rather than
// next/script, because crawlers must find the markup in the delivered HTML
// without executing anything, and `<` escaped so a title containing "<script>"
// cannot break out of the JSON context.
// ---------------------------------------------------------------------------

interface JsonLdProps {
  /** one node, or the whole node list of a page */
  data: JsonLdObject | JsonLdObject[];
}

export function JsonLd({ data }: JsonLdProps) {
  const nodes = Array.isArray(data) ? data : [data];
  // an empty list means this page has nothing truthful to claim, so it renders
  // no tag at all instead of an empty array a parser would report as broken
  if (nodes.length === 0) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(nodes.length === 1 ? nodes[0] : nodes).replace(/</g, "\\u003c"),
      }}
    />
  );
}

interface StructuredDataProps {
  /**
   * The graph as a promise, created by the page but deliberately not awaited
   * there: awaiting it in the page body would delay the response shell, while
   * awaiting it here only fills the Suspense hole the page is already rendered in.
   */
  graph: Promise<JsonLdObject[]>;
}

export async function StructuredData({ graph }: StructuredDataProps) {
  return <JsonLd data={await graph} />;
}

export default JsonLd;
