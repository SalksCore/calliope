// Copie de freelance/sites/_salks : ne pas modifier ici, relancer sync.mjs.
import type { ReactNode } from 'react';
import { formatDate, getLegalDoc, type LocalLegal, LEGAL_LABELS, legalList, renderMarkdown, type LegalDocKey, type LegalLang } from './legal';

/**
 * Pages légales communes, identiques à celles de Chronos :
 * titre à point, pastille de mise à jour, contenu, cartes vers les autres documents.
 */
type Common = { site: string; siteName: string; lang?: LegalLang; base?: string; extra?: LegalDocKey[] };

function LegalNav({ lang, base, current, extra }: { lang: LegalLang; base: string; current?: string; extra?: LegalDocKey[] }) {
  return (
    <nav className="sk-legal-nav" aria-label={LEGAL_LABELS[lang].nav}>
      {legalList(lang, extra).filter((p) => p.doc !== current).map((p) => (
        <a key={p.doc} href={`${base}/${p.path}`} className="sk-legal-card">
          <b>{p.title}<i /></b>
          <small>{p.summary}</small>
        </a>
      ))}
    </nav>
  );
}

/** /legal : le sommaire. */
export function LegalHub({ siteName, lang = 'fr', base = '/legal', extra, intro }: Common & { intro?: string }) {
  const l = LEGAL_LABELS[lang];
  return (
    <article className="sk sk-legal">
      <h1>{l.hub}</h1>
      <div className="sk-legal-body" dangerouslySetInnerHTML={{ __html: renderMarkdown(intro ?? l.intro(siteName)) }} />
      <LegalNav lang={lang} base={base} extra={extra} />
    </article>
  );
}

/** /legal/<document>. Renvoie null si le document n'existe pas (le site affiche alors sa 404). */
export async function LegalDocumentPage({ site, siteName, doc, lang = 'fr', base = '/legal', extra, addenda, children }: Common & {
  doc: LegalDocKey;
  /** Compléments propres au produit, par document et par langue */
  addenda?: Partial<Record<LegalDocKey, Partial<Record<LegalLang, LocalLegal>>>>;
  /** Complément en JSX, affiché après le document (ex. les données gardées par le bot Hermès) */
  children?: ReactNode;
}) {
  const data = await getLegalDoc(site, siteName, doc, lang, addenda?.[doc]?.[lang] ?? addenda?.[doc]?.fr ?? '');
  if (!data) return null;
  return (
    <article className="sk sk-legal">
      <h1>{data.title}</h1>
      <div className="sk-updated">{LEGAL_LABELS[lang].updated} · {formatDate(data.updated, lang)}</div>
      <div className="sk-legal-body" dangerouslySetInnerHTML={{ __html: data.html }} />
      {children && <div className="sk-legal-body">{children}</div>}
      <LegalNav lang={lang} base={base} current={doc} extra={extra} />
    </article>
  );
}
