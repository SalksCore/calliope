/**
 * Réglages du site : nom, adresse, dépôt et contact.
 */
export const site = {
  name: "Calliope",
  tagline: "Prépare tes textes du bac sans te compliquer la vie.",
  description:
    "Prépare tes textes du bac de français pour l'oral et l'écrit, puis exporte tes fiches en PDF ou en Word. Calliope fonctionne sans inscription, directement dans ton navigateur.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://calliope.salks.me",
  repo: "https://github.com/SalksCore/calliope",
  year: 2026,

  author: {
    name: "Salks",
    github: "https://github.com/SalksCore",
    email: "salks@earthquest.fr",
    discord: "salks",
  },

  // Les mentions légales, la confidentialité et les cookies viennent du kit commun
  // (src/components/salks, copié depuis freelance/sites/_salks par sync.mjs).
} as const;

export type Site = typeof site;
