import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Topbar } from "@/components/Topbar";
import { LegalHub } from "@/components/salks/LegalPages";

export const metadata: Metadata = { title: "Informations légales" };

export default function LegalIndex() {
  return (
    <div className="site">
      <Topbar product="INFORMATIONS LÉGALES" end={<Link className="btn primary" href="/fiches/">Créer ma fiche</Link>} />
      <LegalHub site="calliope" siteName="Calliope" lang="fr" base="/legal" />
      <Footer />
    </div>
  );
}
