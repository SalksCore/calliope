import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { LegalHub } from "@/components/salks/LegalPages";
import { legalMetadata } from "@/components/salks/seo";

export const metadata: Metadata = { ...legalMetadata({ site: "Calliope", lang: "fr", url: "/legal/" }), alternates: { canonical: "/legal/" } };

export default function LegalIndex() {
  return (
    <SiteShell>
      <LegalHub site="calliope" siteName="Calliope" lang="fr" base="/legal" />
    </SiteShell>
  );
}
