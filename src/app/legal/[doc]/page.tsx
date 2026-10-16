import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { ADDENDA } from "@/components/legal-addenda";
import { LegalDocumentPage } from "@/components/salks/LegalPages";
import { docFromPath, legalList } from "@/components/salks/legal";
import { legalMetadata } from "@/components/salks/seo";

type Props = { params: Promise<{ doc: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return legalList("fr").map((p) => ({ doc: p.path }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const path = (await params).doc;
  const doc = docFromPath(path);
  return doc ? { ...legalMetadata({ site: "Calliope", lang: "fr", doc, url: `/legal/${path}/` }), alternates: { canonical: `/legal/${path}/` } } : {};
}

export default async function LegalDoc({ params }: Props) {
  const doc = docFromPath((await params).doc);
  if (!doc) notFound();
  const page = await LegalDocumentPage({ site: "calliope", siteName: "Calliope", doc, lang: "fr", base: "/legal", addenda: ADDENDA });
  if (!page) notFound();
  return (
    <SiteShell>
      {page}
    </SiteShell>
  );
}
