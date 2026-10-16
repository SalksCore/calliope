import type { MetadataRoute } from "next";
import { legalList } from "@/components/salks/legal";
import { site } from "@/config/site";

export const dynamic = "force-static";

/** Toutes les pages publiques, avec leur importance relative. */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path}`;
  const now = new Date();
  return [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: url("/fiches/"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: url("/legal/"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    ...legalList("fr").map((p) => ({ url: url(`/legal/${p.path}/`), lastModified: now, changeFrequency: "yearly" as const, priority: 0.2 })),
  ];
}
