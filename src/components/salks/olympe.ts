// Copie de freelance/sites/_salks : ne pas modifier ici, relancer sync.mjs.
/**
 * Adresse d'Olympe, l'API centrale (mesure d'audience, documents légaux, chiffres des bots).
 * Par défaut https://olympe.salks.me : les sites restent reliés même si la variable
 * NEXT_PUBLIC_OLYMPE_URL manque au build. Une ancienne adresse en salks.fr est corrigée,
 * et NEXT_PUBLIC_OLYMPE_URL=off coupe le lien (utile en local).
 */
export const OLYMPE_DEFAULT = 'https://olympe.salks.me';

export function olympeUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_OLYMPE_URL ?? '').trim();
  if (raw === 'off') return '';
  return (raw || OLYMPE_DEFAULT).replace('salks.fr', 'salks.me').replace(/\/$/, '');
}
