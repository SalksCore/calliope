/** Préfixe un chemin de `public/` avec le basePath (vide sur calliope.salks.fr). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const asset = (path: string) => `${BASE_PATH}${path}`;
