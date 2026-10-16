// Copie de freelance/sites/_salks : ne pas modifier ici, relancer sync.mjs.
import type { MetadataRoute } from 'next';
import { LEGAL_SUMMARIES, LEGAL_TITLES, type LegalDocKey, type LegalLang } from './legal-content';

/* Référencement commun des sites Salks. : moteurs de recherche et assistants IA.
   - robotsFor()  : app/robots.ts, ouvre le site aux moteurs ET aux robots des IA ;
   - schema.*     : données structurées schema.org (JSON-LD), posées avec <JsonLd> ;
   - le site garde son public/llms.txt (résumé lisible par les IA) et son app/sitemap.ts. */

/** Robots des assistants IA (recherche, réponses, entraînement), nommés un par un :
 *  certains hébergeurs les bloquent par défaut s'ils ne sont pas explicitement autorisés. */
export const AI_CRAWLERS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',                 // OpenAI
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai', // Anthropic
  'PerplexityBot', 'Perplexity-User',                        // Perplexity
  'Google-Extended', 'GoogleOther',                          // Gemini
  'Applebot', 'Applebot-Extended',                           // Apple Intelligence
  'bingbot', 'msnbot',                                       // Bing, Copilot
  'DuckAssistBot', 'MistralAI-User', 'cohere-ai', 'YouBot',
  'meta-externalagent', 'Amazonbot', 'CCBot',
];

/** robots.txt : tout est ouvert, sauf les chemins privés du site. */
export function robotsFor(site: string, disallow: string[] = []): MetadataRoute.Robots {
  const url = site.replace(/\/$/, '');
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      { userAgent: AI_CRAWLERS, allow: '/', disallow },
    ],
    sitemap: `${url}/sitemap.xml`,
    host: url,
  };
}

/** Sites bilingues (/fr, /en) : adresse canonique de la page et ses équivalents dans l'autre langue. */
export function langAlternates(lang: string, path = '') {
  return { canonical: `/${lang}${path}`, languages: { fr: `/fr${path}`, en: `/en${path}`, 'x-default': `/fr${path}` } };
}

type Page = { path: string; priority?: number; freq?: 'weekly' | 'monthly' | 'yearly' };

/** sitemap.xml d'un site bilingue : chaque page dans chaque langue, reliée à son équivalent. */
export function sitemapFor(site: string, pages: Page[], langs: readonly string[] = ['fr', 'en']): MetadataRoute.Sitemap {
  const url = site.replace(/\/$/, '');
  const now = new Date();
  return pages.flatMap((p) => langs.map((lang) => ({
    url: `${url}/${lang}${p.path}`,
    lastModified: now,
    changeFrequency: p.freq ?? 'monthly',
    priority: p.priority ?? 0.5,
    alternates: { languages: Object.fromEntries(langs.map((l) => [l, `${url}/${l}${p.path}`])) },
  })));
}

/** Consignes communes aux moteurs : extraits et aperçus aussi longs qu'ils le veulent. */
export const ROBOTS_META = {
  index: true,
  follow: true,
  googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
} as const;

export const SALKS = {
  name: 'Salks',
  url: 'https://salks.me',
  github: 'https://github.com/SalksCore',
  email: 'salks.pro@gmail.com',
};

type Node = Record<string, unknown>;

/** Briques schema.org, à assembler dans un @graph. */
export const schema = {
  /** L'auteur de tous les projets. */
  author: (): Node => ({
    '@type': 'Person', '@id': `${SALKS.url}/#salks`, name: SALKS.name, url: SALKS.url,
    email: `mailto:${SALKS.email}`, sameAs: [SALKS.github],
    jobTitle: 'Développeur Minecraft et web', knowsLanguage: ['fr', 'en'],
  }),

  /** Le site lui-même. */
  website: (o: { url: string; name: string; alternateName?: string[]; description: string; inLanguage: string[] }): Node => ({
    '@type': 'WebSite', '@id': `${o.url}/#site`, url: o.url, name: o.name, alternateName: o.alternateName,
    description: o.description, inLanguage: o.inLanguage, publisher: { '@id': `${SALKS.url}/#salks` },
  }),

  /** Une application (web, desktop, mobile, bot) : gratuite, avec ses fonctions et ses autres noms. */
  app: (o: {
    url: string; name: string; alternateName?: string[]; description: string;
    category: string; type?: 'WebApplication' | 'SoftwareApplication' | 'MobileApplication';
    os?: string; features?: string[]; keywords?: string[]; inLanguage?: string[];
    image?: string; repo?: string; audience?: string; license?: string;
  }): Node => ({
    '@type': o.type ?? 'SoftwareApplication', '@id': `${o.url}/#app`, url: o.url, name: o.name,
    alternateName: o.alternateName, description: o.description, applicationCategory: o.category,
    operatingSystem: o.os ?? 'Web', featureList: o.features, keywords: o.keywords?.join(', '),
    inLanguage: o.inLanguage, image: o.image, isAccessibleForFree: true, license: o.license,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    author: { '@id': `${SALKS.url}/#salks` }, publisher: { '@id': `${SALKS.url}/#salks` },
    ...(o.repo ? { sameAs: [o.repo], codeRepository: o.repo } : {}),
    ...(o.audience ? { audience: { '@type': 'Audience', audienceType: o.audience } } : {}),
  }),

  /** Questions fréquentes : les mêmes que le bloc <Faq> affiché sur la page. */
  faq: (items: [string, string][]): Node => ({
    '@type': 'FAQPage',
    mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  }),

  /** Fil d'Ariane d'une page intérieure. */
  breadcrumb: (items: [string, string][]): Node => ({
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
  }),

  /** Un guide pas à pas (installation…). */
  howTo: (o: { name: string; steps: [string, string][] }): Node => ({
    '@type': 'HowTo', name: o.name,
    step: o.steps.map(([name, text], i) => ({ '@type': 'HowToStep', position: i + 1, name, text })),
  }),
};

/** Assemble des briques en un seul document JSON-LD. */
export const graph = (...nodes: Node[]) => ({ '@context': 'https://schema.org', '@graph': nodes });

/**
 * Métadonnées d'une page légale : son propre titre, une description qui la distingue
 * des autres pages (sinon les moteurs voient un contenu dupliqué) et l'image d'aperçu.
 *   doc absent : la page sommaire /legal.
 */
export function legalMetadata(o: { site: string; lang: LegalLang; doc?: LegalDocKey; url: string }) {
  const { site, lang, doc, url } = o;
  const title = doc ? LEGAL_TITLES[doc][lang] : lang === 'en' ? 'Legal information' : 'Informations légales';
  const summary = doc ? LEGAL_SUMMARIES[doc][lang] : '';
  const lower = summary.charAt(0).toLowerCase() + summary.slice(1);
  const description = doc
    ? lang === 'en' ? `${title} of ${site}: ${lower}` : `${title} de ${site} : ${lower}`
    : lang === 'en'
      ? `Legal information of ${site}: legal notice, terms of use, privacy, cookies, licenses and credits.`
      : `Informations légales de ${site} : mentions légales, conditions d’utilisation, confidentialité, cookies, licences et crédits.`;
  return {
    title,
    description,
    openGraph: { title: `${title} · ${site}`, description, url, siteName: site, type: 'article' as const, images: [{ url: '/og.png', width: 1200, height: 630, alt: site }] },
    twitter: { card: 'summary_large_image' as const, images: ['/og.png'], title: `${title} · ${site}`, description },
  };
}
