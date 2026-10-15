// Copie de freelance/sites/_salks : ne pas modifier ici, relancer sync.mjs.
/**
 * Mesure d'audience d'Olympe, l'API centrale : sans cookie ni stockage, l'adresse
 * IP n'est jamais enregistrée. Rien n'est chargé si NEXT_PUBLIC_OLYMPE_URL est vide.
 * À placer une fois, dans le <body> du layout racine.
 */
export function SalksAnalytics({ site }: { site: string }) {
  const olympe = (process.env.NEXT_PUBLIC_OLYMPE_URL ?? '').replace(/\/$/, '');
  if (!olympe) return null;
  return <script defer src={`${olympe}/t.js`} data-site={site} />;
}
