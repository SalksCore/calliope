// Copie de freelance/sites/_salks : ne pas modifier ici, relancer sync.mjs.
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

/* Gabarit de vitrine Salks. : en-tête et titres de section, mis en forme par vitrine.css.
   La page enveloppe tout dans <div className="v"> ; chaque site donne sa couleur
   avec --site-acc (sombre) et --site-acc-light (clair). */

type NavLink = { href: string; label: string };

/** En-tête : nom du site en serif, nom grec en petit, navigation, outils (langue…), bouton de thème et action principale.
 *  theme : true (défaut) affiche la bascule sombre / clair, une chaîne la mémorise sous cette clé, false la retire. */
export function Masthead({ name, greek, href = '/', nav = [], tools, cta, theme = true }: {
  name: string;
  greek?: string;
  href?: string;
  nav?: NavLink[];
  tools?: React.ReactNode;
  cta?: NavLink & { external?: boolean };
  theme?: boolean | string;
}) {
  const action = cta && (cta.external
    ? <a className="v-btn v-btn-solid" href={cta.href} rel="noopener">{cta.label}</a>
    : <Link className="v-btn v-btn-solid" href={cta.href}>{cta.label}</Link>);
  return (
    <header className="v-mast">
      <div className="v-wrap v-mast-inner">
        <Link className="v-brand" href={href} aria-label={`${name}, accueil`}>
          <span className="v-brand-name">{name}<span className="v-acc">.</span></span>
          {greek && <span className="v-brand-greek" aria-hidden="true">{greek}</span>}
        </Link>
        {nav.length > 0 && (
          <nav className="v-nav" aria-label="Sections">
            {nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
          </nav>
        )}
        <div className="v-mast-end">
          {tools}
          {theme && <ThemeToggle storageKey={typeof theme === 'string' ? theme : undefined} />}
          {action}
          {nav.length > 0 && (
            <details className="v-menu">
              <summary aria-label="Menu"><i /><i /></summary>
              <div>
                {nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
                {cta && <a className="v-menu-cta" href={cta.href}>{cta.label}</a>}
              </div>
            </details>
          )}
        </div>
      </div>
    </header>
  );
}

/** Titre de section : numéro grec, intitulé court, puis le titre et son chapeau. */
export function SectionHead({ num, label, title, id, children }: {
  num?: string;
  label: string;
  title: React.ReactNode;
  id?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="v-head">
      <p className="v-label">{num && <span className="v-num">{num}</span>}{label}</p>
      <h2 id={id}>{title}</h2>
      {children && <p className="v-sub">{children}</p>}
    </div>
  );
}

/** Numéros grecs des sections, dans l'ordre. */
export const GREEK_NUM = ['α′', 'β′', 'γ′', 'δ′', 'ε′', 'ϛ′', 'ζ′', 'η′', 'θ′'];

/** Colophon : le nom grec en grand, en plein, et une phrase sur la divinité. */
export function Colophon({ greek, children }: { greek: string; children?: React.ReactNode }) {
  return (
    <div className="v-wrap v-colophon">
      <span className="v-colophon-greek" aria-hidden="true">{greek}</span>
      {children && <p>{children}</p>}
    </div>
  );
}

/** Questions fréquentes, dépliables. Les mêmes paires vont dans schema.faq() (seo.ts). */
export function Faq({ items }: { items: [string, React.ReactNode][] }) {
  return (
    <div className="v-faq">
      {items.map(([q, a]) => (
        <details key={q}>
          <summary><h3>{q}</h3><span aria-hidden="true" /></summary>
          <div>{a}</div>
        </details>
      ))}
    </div>
  );
}
