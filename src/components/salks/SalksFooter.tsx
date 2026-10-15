// Copie de freelance/sites/_salks : ne pas modifier ici, relancer sync.mjs.
import { SalksLogo } from './SalksLogo';
import { legalList, type LegalDocKey, type LegalLang } from './legal';

/**
 * Pied de page commun à tous les sites Salks., sur le modèle de Chronos :
 * bandeau « géré et maintenu par Salks. », liens du site, projets, Salks.,
 * contact, puis © et pages légales.
 */
export const SALKS_LINKS = {
  portfolio: 'https://salks.me',
  github: 'https://github.com/SalksCore',
  earthquest: 'https://github.com/EarthQuestMc',
  email: 'salks@earthquest.fr',
};

export const SALKS_PROJECTS = [
  { name: 'Chronos', href: 'https://docs.salks.me', hue: '#c4b5fd' },
  { name: 'Kern', href: 'https://kern.salks.me', hue: '#ff7a3d' },
  { name: 'Hermès', href: 'https://hermes.salks.me', hue: '#9b7dff' },
  { name: 'Mnémosyne', href: 'https://mnemo.salks.me', hue: '#f472b6' },
  { name: 'Minecraft', href: 'https://docs.salks.me/minecraft', hue: '#5fd068' },
  { name: 'MySchool', href: 'https://myschool.salks.me', hue: '#3fd0c9' },
  { name: 'Calliope', href: 'https://calliope.salks.me', hue: '#b9e15c' },
];

const TEXT = {
  fr: {
    motto: 'Ensemble, construisons quelque chose de grand',
    projects: 'Projets', contact: 'Contact', nav: 'Informations légales',
    maintained: (site: string) => <>{site} est géré et maintenu par</>,
    others: 'Voir les autres projets maintenus par Salks.',
  },
  en: {
    motto: 'Together, let’s build something great',
    projects: 'Projects', contact: 'Contact', nav: 'Legal information',
    maintained: (site: string) => <>{site} is built and maintained by</>,
    others: 'See the other projects maintained by Salks.',
  },
};

export type FooterLink = { label: string; href: string };

export function SalksFooter({ site, lang = 'fr', legalBase = '/legal', extra = [], links = [] }: {
  /** Nom du site : « Kern », « Hermès »… */
  site: string;
  lang?: LegalLang;
  /** Préfixe des pages légales : « /legal », ou « /fr/legal » sur un site bilingue */
  legalBase?: string;
  /** Documents propres au site, ex. ["cgv"] sur le portfolio */
  extra?: LegalDocKey[];
  /** Liens propres au site, affichés dans la première colonne sous son nom */
  links?: FooterLink[];
}) {
  const t = TEXT[lang];
  const others = SALKS_PROJECTS.filter((p) => p.name !== site);
  return (
    <footer className="sk sk-footer">
      <div className="sk-footer-credit">
        <div>
          <p>{t.maintained(site)} <b>Salks<i /></b></p>
          <div className="sk-footer-dots" aria-hidden="true">
            {SALKS_PROJECTS.map((p) => <span key={p.name} style={{ background: p.hue }} title={p.name} />)}
          </div>
        </div>
        <a href={`${SALKS_LINKS.portfolio}/${lang}/projets`}>{t.others} <span aria-hidden="true">→</span></a>
      </div>

      <div className={`sk-footer-inner${links.length ? ' has-links' : ''}`}>
        <div>
          <a href={SALKS_LINKS.portfolio} className="sk-footer-logo" aria-label="Salks., portfolio"><SalksLogo /></a>
          <p className="sk-footer-motto">{t.motto}<span>.</span></p>
        </div>
        <nav className="sk-footer-cols">
          {links.length > 0 && (
            <div>
              <span className="sk-eyebrow">{site}</span>
              {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
            </div>
          )}
          <div>
            <span className="sk-eyebrow">{t.projects}</span>
            {others.map((p) => <a key={p.name} href={p.href}>{p.name}</a>)}
          </div>
          <div>
            <span className="sk-eyebrow">Salks.</span>
            <a href={SALKS_LINKS.portfolio}>Portfolio</a>
            <a href={SALKS_LINKS.github}>GitHub</a>
            <a href={SALKS_LINKS.earthquest}>EarthQuest</a>
          </div>
          <div>
            <span className="sk-eyebrow">{t.contact}</span>
            <a href={`mailto:${SALKS_LINKS.email}`}>{SALKS_LINKS.email}</a>
            <span>Discord · salks</span>
          </div>
        </nav>
      </div>

      <div className="sk-footer-bottom">
        <span>© {new Date().getFullYear()} Salks. · {site}<b>.</b></span>
        <nav className="sk-footer-legal" aria-label={t.nav}>
          {legalList(lang, extra).map((p) => <a key={p.doc} href={`${legalBase}/${p.path}`}>{p.title}</a>)}
        </nav>
      </div>
    </footer>
  );
}
