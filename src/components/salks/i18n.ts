// Copie de freelance/sites/_salks : ne pas modifier ici, relancer sync.mjs.
/**
 * Langues des sites Salks. : chaque page vit sous /fr ou /en.
 * Aucun cookie : une adresse sans langue suit la langue du navigateur.
 */
export const LANGS = ['fr', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'fr';
export const LANG_HEADER = 'x-salks-lang';

export const isLang = (v: unknown): v is Lang => typeof v === 'string' && (LANGS as readonly string[]).includes(v);

/** Préfixe un chemin interne par la langue : href('en', '/legal') → '/en/legal'. */
export const href = (lang: Lang, path = '/') => `/${lang}${path === '/' ? '' : path}`;

/** Langue préférée d'après l'en-tête Accept-Language. */
export function fromAcceptLanguage(header: string | null): Lang {
  if (!header) return DEFAULT_LANG;
  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=');
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { tag } of ranked) {
    const base = tag.split('-')[0];
    if (isLang(base)) return base;
  }
  return 'en';
}
