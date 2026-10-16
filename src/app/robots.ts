import type { MetadataRoute } from "next";
import { robotsFor } from "@/components/salks/seo";
import { site } from "@/config/site";

// Site statique : robots.txt est écrit une fois, au build.
export const dynamic = "force-static";

/** Ouvert aux moteurs de recherche et aux assistants IA. */
export default function robots(): MetadataRoute.Robots {
  return robotsFor(site.url);
}
