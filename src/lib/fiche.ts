/* Modèles de données des fiches. Aucune donnée ne quitte le navigateur. */

export type Citation = { citation: string; procede: string; analyse: string };
export type Mouvement = { titre: string; lignes: string; citations: Citation[] };

export type FicheEL = {
  id: string;
  mode: "el";
  titre: string;
  oeuvre: string;
  auteur: string;
  parcours: string;
  numero: string;
  intro: string;
  problematique: string;
  mouvements: Mouvement[];
  conclusion: string;
  ouverture: string;
  grammaireQ: string;
  grammaireR: string;
  texte: string;
  notes: string;
  updatedAt: number;
};

export type CitationCle = { citation: string; ref: string; theme: string; analyse: string };
export type Sujet = { sujet: string; plan: string };

export type FicheDissert = {
  id: string;
  mode: "dissert";
  titre: string;
  oeuvre: string;
  auteur: string;
  annee: string;
  genre: string;
  mouvement: string;
  parcours: string;
  photo: string;
  photoW: number;
  photoH: number;
  bio: string;
  contexte: string;
  resume: string;
  themes: string;
  personnages: string;
  citations: CitationCle[];
  sujets: Sujet[];
  notes: string;
  updatedAt: number;
};

export type Fiche = FicheEL | FicheDissert;

export const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export const uid = () => "f" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
export const emptyCitation = (): Citation => ({ citation: "", procede: "", analyse: "" });
export const emptyMouvement = (): Mouvement => ({ titre: "", lignes: "", citations: [emptyCitation()] });

export function newEL(): FicheEL {
  return {
    id: uid(), mode: "el", titre: "", oeuvre: "", auteur: "", parcours: "", numero: "",
    intro: "", problematique: "", mouvements: [emptyMouvement()], conclusion: "", ouverture: "",
    grammaireQ: "", grammaireR: "", texte: "", notes: "", updatedAt: Date.now(),
  };
}

export function newDissert(): FicheDissert {
  return {
    id: uid(), mode: "dissert", titre: "", oeuvre: "", auteur: "", annee: "", genre: "", mouvement: "", parcours: "",
    photo: "", photoW: 0, photoH: 0, bio: "", contexte: "", resume: "", themes: "", personnages: "",
    citations: [{ citation: "", ref: "", theme: "", analyse: "" }], sujets: [{ sujet: "", plan: "" }],
    notes: "", updatedAt: Date.now(),
  };
}

export function exampleEL(): FicheEL {
  return {
    ...newEL(),
    titre: "« Demain, dès l'aube… »", oeuvre: "Les Contemplations (1856)", auteur: "Victor Hugo",
    parcours: "Les Mémoires d'une âme", numero: "Texte 2",
    intro:
      "Victor Hugo publie Les Contemplations en 1856 et présente le recueil comme les « Mémoires d'une âme ». Le poème « Demain, dès l'aube… », dans le livre IV « Pauca meae », est écrit pour l'anniversaire de la mort de sa fille Léopoldine, noyée en 1843.\n[Lecture du texte]\nLe poème met en scène une marche solitaire vers un rendez-vous dont la nature n'est révélée qu'au dernier vers.",
    problematique: "Comment ce poème transforme-t-il un voyage d'apparence amoureuse en hommage funèbre ?",
    mouvements: [
      { titre: "Un départ déterminé", lignes: "v. 1 à 4", citations: [
        { citation: "Demain, dès l'aube, à l'heure où blanchit la campagne,", procede: "Rythme ternaire, compléments circonstanciels de temps", analyse: "L'accumulation des indications temporelles traduit l'impatience du poète : rien ne l'arrêtera." },
        { citation: "Vois-tu, je sais que tu m'attends.", procede: "Apostrophe, tutoiement", analyse: "Le destinataire semble vivant : le lecteur croit à un rendez-vous amoureux." },
      ] },
      { titre: "Une marche coupée du monde", lignes: "v. 5 à 8", citations: [
        { citation: "Je marcherai les yeux fixés sur mes pensées,", procede: "Métaphore, futur de certitude", analyse: "La marche devient intérieure : le poète ne voit plus le monde, il est tout entier dans son deuil." },
      ] },
      { titre: "L'arrivée sur la tombe", lignes: "v. 9 à 12", citations: [
        { citation: "Et quand j'arriverai, je mettrai sur ta tombe", procede: "Chute, révélation", analyse: "Le mot « tombe » révèle la vérité : la destinataire est morte, et le poème se relit comme un hommage." },
      ] },
    ],
    conclusion:
      "Le poème repose sur une progression savamment ménagée : le rendez-vous amoureux se révèle être un pèlerinage sur la tombe de Léopoldine. La poésie devient le lieu où le deuil se dit avec pudeur.",
    ouverture: "On peut rapprocher ce poème de « Veni, vidi, vixi », dans le même livre, où Hugo dit son désir de mourir.",
    grammaireQ: "Analysez la négation au vers 7.",
    grammaireR: "« Je ne regarderai ni l'or du soir qui tombe… » : négation totale, la locution « ne… ni… ni » coordonne les compléments d'objet.",
  };
}

export function exampleDissert(): FicheDissert {
  return {
    ...newDissert(),
    titre: "Les Fleurs du mal", oeuvre: "Les Fleurs du mal", auteur: "Charles Baudelaire", annee: "1857 (2e éd. 1861)",
    genre: "Poésie", mouvement: "Entre romantisme, Parnasse et symbolisme", parcours: "Alchimie poétique : la boue et l'or",
    bio: "Né en 1821 à Paris, Baudelaire perd son père très jeune. Dandy couvert de dettes, il se fait connaître comme critique d'art avant de publier son recueil. Il meurt en 1867.",
    contexte: "Le recueil est condamné pour « outrage à la morale publique » en 1857 : six poèmes doivent être retirés. Le Second Empire impose une morale bourgeoise stricte.",
    resume: "Six sections : Spleen et Idéal, Tableaux parisiens, Le Vin, Fleurs du mal, Révolte, La Mort. Le poète oscille entre l'aspiration à l'idéal et l'ennui.",
    themes: "Spleen et idéal, la beauté, la ville, la mort, le mal, le rôle du poète",
    personnages: "Le poète (l'albatros), la femme aimée, le lecteur « hypocrite »",
    citations: [
      { citation: "Tu m'as donné ta boue et j'en ai fait de l'or.", ref: "Projet d'épilogue", theme: "Alchimie poétique", analyse: "Résume le parcours : le poète transforme la laideur du réel en beauté." },
      { citation: "Le Poète est semblable au prince des nuées", ref: "« L'Albatros »", theme: "Le poète maudit", analyse: "Grand dans son art, le poète est ridicule et rejeté dans la société." },
    ],
    sujets: [{ sujet: "La poésie de Baudelaire n'est-elle qu'une célébration du mal ?", plan: "I. Le mal est omniprésent dans le recueil\nII. Mais il est transformé par le travail poétique\nIII. Pour viser finalement une forme d'idéal" }],
  };
}

/** Complète une fiche importée avec les champs manquants. */
export function normalize(raw: unknown): Fiche | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Partial<Fiche>;
  if (r.mode === "el") return { ...newEL(), ...(r as Partial<FicheEL>), mode: "el" };
  if (r.mode === "dissert") return { ...newDissert(), ...(r as Partial<FicheDissert>), mode: "dissert" };
  return null;
}
