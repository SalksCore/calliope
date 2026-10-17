// Copie de freelance/sites/_salks : ne pas modifier ici, relancer sync.mjs.
import { olympeUrl } from './olympe';

/**
 * Mesure d'audience d'Olympe, l'API centrale : sans cookie ni stockage, l'adresse
 * IP n'est jamais enregistrée. Adresse : voir olympe.ts.
 * À placer une fois, dans le <body> du layout racine.
 */
export function SalksAnalytics({ site }: { site: string }) {
  const olympe = olympeUrl();
  if (!olympe) return null;
  return <script defer src={`${olympe}/t.js`} data-site={site} />;
}
