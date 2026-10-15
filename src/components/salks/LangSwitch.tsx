// Copie de freelance/sites/_salks : ne pas modifier ici, relancer sync.mjs.
'use client';

import { usePathname } from 'next/navigation';
import { LANGS, type Lang } from './i18n';

/** Bascule FR / EN : même page, autre langue. Un simple lien, sans cookie. */
export function LangSwitch({ lang, className = '' }: { lang: Lang; className?: string }) {
  const pathname = usePathname() ?? '/';
  const rest = pathname.replace(/^\/(fr|en)(?=\/|$)/, '');
  return (
    <div className={`sk-lang ${className}`} role="group" aria-label="Langue / Language">
      {LANGS.map((l) => (
        <a key={l} href={`/${l}${rest}`} hrefLang={l} aria-current={l === lang ? 'true' : undefined} className={l === lang ? 'on' : ''}>
          {l.toUpperCase()}
        </a>
      ))}
    </div>
  );
}
