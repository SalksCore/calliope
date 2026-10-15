/**
 * Réglages du site : nom, adresse, dépôt et contact.
 */
export const site = {
  name: "Calliope",
  tagline: "Tes textes du bac, fichés proprement.",
  description:
    "Fiche tes textes du bac de français : explication linéaire pour l'oral, dissertation pour l'écrit. Export PDF et Word, sans compte, rien n'est stocké.",
  url: "https://calliope.salks.fr",
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
