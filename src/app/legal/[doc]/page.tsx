import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Topbar } from "@/components/Topbar";
import { ADDENDA } from "@/components/legal-addenda";
import { LegalDocumentPage } from "@/components/salks/LegalPages";
import { docFromPath, legalList } from "@/components/salks/legal";

type Props = { params: Promise<{ doc: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return legalList("fr").map((p) => ({ doc: p.path }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doc = docFromPath((await params).doc);
  return { title: legalList("fr").find((p) => p.doc === doc)?.title ?? "Informations légales" };
}

export default async function LegalDoc({ params }: Props) {
  const doc = docFromPath((await params).doc);
  if (!doc) notFound();
  const page = await LegalDocumentPage({ site: "calliope", siteName: "Calliope", doc, lang: "fr", base: "/legal", addenda: ADDENDA });
  if (!page) notFound();
  return (
    <div className="site">
      <Topbar product="INFORMATIONS LÉGALES" end={<Link className="btn primary" href="/fiches/">Créer ma fiche</Link>} />
      {page}
      <Footer />
    </div>
  );
}
