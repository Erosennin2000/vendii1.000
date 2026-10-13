import type { Draft } from "@/lib/draft";

const clean = (v: string | null, max = 60) => (v ?? "").replace(/\s+/g, " ").trim().slice(0, max);

/**
 * Reads a name handed over from the Vendii website (?first=&middle=&last=&former=).
 * Returns null when there is no usable name, so the normal blank start is used.
 */
export function prefillFromQuery(search: string): Partial<Draft> | null {
  const q = new URLSearchParams(search);
  const first = clean(q.get("first"));
  const last = clean(q.get("last"));
  if (!first || !last) return null;
  const middle = clean(q.get("middle"));
  const former = clean(q.get("former"));
  const out: Partial<Draft> = { name: { first, middle, last } };
  if (former) out.variants = [`${first} ${former}`];
  return out;
}
