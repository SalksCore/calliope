import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { LegalHub } from "@/components/salks/LegalPages";

export const metadata: Metadata = { title: "Informations légales", alternates: { canonical: "/legal/" } };

export default function LegalIndex() {
  return (
    <SiteShell>
      <LegalHub site="calliope" siteName="Calliope" lang="fr" base="/legal" />
    </SiteShell>
  );
}
