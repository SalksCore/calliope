import { ROMAN, type Fiche } from "./fiche";

/**
 * Contenu d'une fiche mis à plat en blocs. L'aperçu en direct, le PDF et le
 * Word lisent tous les trois cette même liste : ce que tu vois est ce que tu
 * exportes.
 */
export type Block =
  | { t: "h"; text: string }
  | { t: "h2"; text: string; note?: string }
  | { t: "p"; label?: string; text: string }
  | { t: "quote"; text: string; ref?: string }
  | { t: "box"; label: string; text: string }
  | { t: "space" };

/** Espaces insécables de la typographie française. */
export const nb = (s: string) => (s || "").replace(/« /g, "« ").replace(/ ([»:;?!])/g, " $1");
const unquote = (s: string) => s.replace(/^[«"“\s ]+|[»"”\s ]+$/g, "");
const tr = (s?: string) => (s || "").trim();

export function blocks(f: Fiche): Block[] {
  const B: Block[] = [];
  const P = (label: string | undefined, text?: string) => { if (tr(text)) B.push({ t: "p", label, text: nb(tr(text)) }); };
  const H = (text: string) => B.push({ t: "h", text });

  if (f.mode === "el") {
    if (tr(f.intro)) { H("Introduction"); P(undefined, f.intro); }
    if (tr(f.problematique)) B.push({ t: "box", label: "Problématique", text: nb(tr(f.problematique)) });
    const mv = f.mouvements.filter((m) => m.titre || m.lignes || m.citations.some((c) => c.citation || c.analyse || c.procede));
    if (mv.length) {
      H("Explication");
      mv.forEach((m, i) => {
        B.push({ t: "h2", text: `${ROMAN[i] || i + 1}. ${tr(m.titre) || "Mouvement " + (i + 1)}`, note: tr(m.lignes) || undefined });
        m.citations.filter((c) => c.citation || c.procede || c.analyse).forEach((c) => {
          if (tr(c.citation)) B.push({ t: "quote", text: nb(unquote(tr(c.citation))) });
          P("Procédés", c.procede);
          P("Analyse", c.analyse);
          B.push({ t: "space" });
        });
      });
    }
    if (tr(f.conclusion) || tr(f.ouverture)) { H("Conclusion"); P(undefined, f.conclusion); P("Ouverture", f.ouverture); }
    if (tr(f.grammaireQ) || tr(f.grammaireR)) { H("Question de grammaire"); P("Question", f.grammaireQ); P("Réponse", f.grammaireR); }
    if (tr(f.texte)) { H("Le texte"); P(undefined, f.texte); }
    if (tr(f.notes)) { H("Notes"); P(undefined, f.notes); }
  } else {
    if (tr(f.bio)) { H("L'auteur"); P(undefined, f.bio); }
    if (tr(f.contexte)) { H("Contexte"); P(undefined, f.contexte); }
    if (tr(f.resume) || tr(f.themes) || tr(f.personnages)) {
      H("L'œuvre"); P("Résumé et structure", f.resume); P("Thèmes", f.themes); P("Personnages et figures", f.personnages);
    }
    const cs = f.citations.filter((c) => c.citation || c.analyse);
    if (cs.length) {
      H("Citations clés");
      cs.forEach((c) => {
        if (tr(c.citation)) B.push({ t: "quote", text: nb(unquote(tr(c.citation))), ref: [c.ref, c.theme].map(tr).filter(Boolean).join(" · ") || undefined });
        P("Analyse", c.analyse);
        B.push({ t: "space" });
      });
    }
    const ss = f.sujets.filter((s) => s.sujet || s.plan);
    if (ss.length) {
      H("Sujets et plans");
      ss.forEach((s) => { if (tr(s.sujet)) B.push({ t: "box", label: "Sujet", text: nb(tr(s.sujet)) }); P("Plan", s.plan); B.push({ t: "space" }); });
    }
    if (tr(f.notes)) { H("Notes"); P(undefined, f.notes); }
  }
  return B;
}

export function kicker(f: Fiche) {
  return f.mode === "el" ? ["EXPLICATION LINÉAIRE", tr(f.numero).toUpperCase()].filter(Boolean).join(" · ") : "DISSERTATION";
}

export function metaLines(f: Fiche): string[] {
  if (f.mode === "el") return [[f.auteur, f.oeuvre].map(tr).filter(Boolean).join(", "), tr(f.parcours)].filter(Boolean);
  return ([["Auteur", f.auteur], ["Œuvre", f.oeuvre], ["Parution", f.annee], ["Genre", f.genre], ["Mouvement", f.mouvement], ["Parcours", f.parcours]] as const)
    .filter(([, v]) => tr(v)).map(([k, v]) => `${k} : ${tr(v)}`);
}

export const titleOf = (f: Fiche) => tr(f.titre) || "Fiche sans titre";
export const endsWithWord = (s: string) => /[0-9A-Za-zÀ-ÿœŒ]$/.test(s);

export function fileName(f: Fiche, ext: string) {
  const base = titleOf(f).replace(/[\\/:*?"<>|]+/g, "").replace(/\s+/g, " ").slice(0, 80);
  return (f.mode === "el" ? "EL - " : "Dissert - ") + base + "." + ext;
}
