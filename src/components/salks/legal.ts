// Copie de freelance/sites/_salks : ne pas modifier ici, relancer sync.mjs.
import { olympeUrl } from './olympe';
import { fillLegal, type LegalIdentityValues, LEGAL_DEFAULTS, LEGAL_DOCS, LEGAL_PATHS, LEGAL_SUMMARIES, LEGAL_TITLES, type LegalDocKey, type LegalLang } from './legal-content';
import { renderMarkdown } from './markdown';

/**
 * Documents légaux d'un site : lus sur Olympe (édités dans le panel), avec la
 * copie locale des modèles communs en secours si Olympe ne répond pas.
 *   NEXT_PUBLIC_OLYMPE_URL  adresse d'Olympe (ex. https://olympe.salks.me)
 */
const OLYMPE = olympeUrl();

/**
 * Coordonnées utilisées quand Olympe est injoignable : particulier sous pseudonyme,
 * sites hébergés sur Cloudflare Pages.
 */
const FALLBACK_IDENTITY: Partial<LegalIdentityValues> = {
  editorKind: 'particulier',
  editorName: 'Salks',
  editorStatus: 'Particulier, éditeur non professionnel',
  editorEmail: 'salks.pro@gmail.com',
  publisher: 'Salks',
  hostName: 'Cloudflare, Inc. (Cloudflare Pages)',
  hostAddress: '101 Townsend Street, San Francisco, CA 94107, USA',
  hostContact: '+1 650 319 8930 · cloudflare.com',
};

export type LegalEntry = { doc: string; path: string; title: string; summary: string };
export type LegalDocument = { title: string; updated: string; html: string };

export const LEGAL_LABELS = {
  fr: { hub: 'Informations légales', updated: 'Dernière mise à jour', nav: 'Informations légales', intro: (site: string) => `${site} ne te demande pas de compte, n'affiche pas de publicité et ne dépose **aucun cookie**. Tout ce qu'il faut savoir est rangé ici.` },
  en: { hub: 'Legal information', updated: 'Last updated', nav: 'Legal information', intro: (site: string) => `${site} needs no account, shows no ads and sets **no cookies**. Everything you need to know is here.` },
};

export function legalList(lang: LegalLang, extra: LegalDocKey[] = []): LegalEntry[] {
  return [...LEGAL_DOCS, ...extra].map((doc) => ({ doc, path: LEGAL_PATHS[doc], title: LEGAL_TITLES[doc][lang], summary: LEGAL_SUMMARIES[doc][lang] }));
}

/** Retrouve la clé d'un document à partir de son chemin (« mentions-legales » → « mentions »). */
export function docFromPath(path: string): LegalDocKey | null {
  const found = (Object.entries(LEGAL_PATHS) as [LegalDocKey, string][]).find(([, p]) => p === path);
  return found ? found[0] : null;
}

/**
 * local : ce qui est propre au produit. Une chaîne est ajoutée à la fin du modèle
 * commun (ex. OAuth de Kern) ; { replace } remplace le modèle commun (ex. un site qui
 * pose un cookie de session). Ignoré si le site a sa propre version dans Olympe.
 */
export type LocalLegal = string | { replace: string };

export async function getLegalDoc(site: string, siteName: string, doc: LegalDocKey, lang: LegalLang, local: LocalLegal = ''): Promise<LegalDocument | null> {
  const identity = lang === 'en' ? { ...FALLBACK_IDENTITY, editorStatus: 'Private individual, non-professional publisher' } : FALLBACK_IDENTITY;
  const withAddendum = (md: string) => {
    if (typeof local !== 'string') return fillLegal(local.replace, siteName, identity, lang, '');
    return local ? `${md.trimEnd()}\n\n${local.trim()}\n` : md;
  };
  if (OLYMPE) {
    try {
      const res = await fetch(`${OLYMPE}/api/public/legal/${site}/${doc}?lang=${lang}`, { next: { revalidate: 3600 } });
      if (res.ok) {
        const data = (await res.json()) as { title: string; updated: string; markdown: string; overridden?: boolean };
        return { title: data.title, updated: data.updated, html: renderMarkdown(data.overridden ? data.markdown : withAddendum(data.markdown)) };
      }
      if (res.status === 404 && doc === 'cgv') return null;
    } catch {
      // Olympe injoignable : on sert la copie locale
    }
  }
  const updated = '2026-10-15';
  // Document propre à un site (ex. CGV du portfolio) : seulement s'il est fourni localement
  const common = doc === 'cgv' ? null : LEGAL_DEFAULTS[lang][doc];
  if (!common && typeof local === 'string') return null;
  return {
    title: LEGAL_TITLES[doc][lang],
    updated,
    html: renderMarkdown(withAddendum(common ? fillLegal(common, siteName, identity, lang, updated) : '')),
  };
}

export function formatDate(iso: string, lang: LegalLang) {
  const d = new Date(`${iso}T12:00:00Z`);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString(lang === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export { renderMarkdown };
export type { LegalDocKey, LegalLang };
