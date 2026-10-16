/**
 * Référencement de Calliope : les mots que les élèves tapent vraiment
 * (dans Google comme dans ChatGPT, Gemini ou Perplexity), ses questions fréquentes
 * et ses données structurées. Les questions sont affichées sur l'accueil (<Faq>)
 * et reprises telles quelles dans le JSON-LD : les deux doivent rester identiques.
 */
import { graph, schema } from "@/components/salks/seo";
import { site } from "./site";

/** Titre et description vus dans les résultats de recherche. */
export const SEO_TITLE = "Calliope · Fiches du bac de français, oral et écrit";
export const SEO_DESCRIPTION =
  "Crée gratuitement tes fiches du bac de français : explication linéaire pour l'oral, dissertation pour l'écrit. Export PDF et Word, sans inscription.";

/** Tous les noms qu'on donne aux mêmes choses. */
export const KEYWORDS = [
  // Calliope elle-même
  "Calliope", "Calliope bac", "Calliope bac de français", "Calliope fiche", "calliope.salks.me",
  // l'épreuve
  "bac de français", "bac français", "EAF", "épreuve anticipée de français", "bac de français 2026", "bac de français 2027",
  "première générale", "première technologique", "révisions bac de français", "réviser le bac de français",
  // l'oral
  "oral de français", "oral du bac de français", "fiche oral de français", "fiche oral bac français", "préparer l'oral de français",
  "explication linéaire", "fiche explication linéaire", "fiche d'explication linéaire", "lecture linéaire", "analyse linéaire",
  "commentaire linéaire", "explication de texte", "fiche texte bac", "fiche par texte", "liste de textes bac",
  "introduction explication linéaire", "conclusion explication linéaire", "problématique explication linéaire", "mouvements du texte",
  "question de grammaire bac", "grammaire oral bac français", "entretien oral bac français", "œuvre choisie oral",
  // l'écrit
  "fiche dissertation", "fiche dissertation bac", "dissertation bac de français", "fiche œuvre intégrale", "fiche de lecture bac",
  "fiche parcours associé", "parcours bac de français", "plan de dissertation", "sujets de dissertation", "citations clés",
  "commentaire de texte", "contraction de texte", "essai bac",
  // le contenu des fiches
  "procédés littéraires", "figures de style", "fiche de révision", "fiche de révision bac", "fiche bac à imprimer",
  "modèle de fiche bac", "générateur de fiche", "créer une fiche de révision", "fiche bac PDF", "fiche bac Word",
  // la promesse
  "gratuit", "sans inscription", "sans compte", "open source", "fiches bac gratuites",
];

/** Questions fréquentes : affichées sur l'accueil et reprises dans le JSON-LD. */
export const FAQ: [string, string][] = [
  ["Qu'est-ce que Calliope ?",
    "Calliope est un site gratuit pour préparer le bac de français. Tu y crées des fiches de révision prêtes à imprimer : une fiche d'explication linéaire pour chaque texte de l'oral, et une fiche de dissertation pour chaque œuvre intégrale de l'écrit. Tu les télécharges en PDF ou en Word."],
  ["Comment faire une fiche d'explication linéaire pour l'oral du bac ?",
    "Choisis le format « Explication linéaire » : tu remplis l'introduction et la conclusion à dire telles quelles, la problématique, puis chaque mouvement du texte avec ses lignes. Pour chaque citation, tu notes le procédé et ton analyse. La question de grammaire et sa réponse ont aussi leur place. La fiche se met en page toute seule."],
  ["Lecture linéaire, analyse linéaire, commentaire linéaire : c'est la même chose ?",
    "Oui. Selon les professeurs et les manuels, on parle d'explication linéaire, de lecture linéaire, d'analyse linéaire ou de commentaire linéaire : c'est l'exercice de la première partie de l'oral du bac de français, et c'est ce que prépare la fiche « Explication linéaire » de Calliope."],
  ["Comment faire une fiche de dissertation sur une œuvre intégrale ?",
    "Le format « Dissertation » rassemble tout ce qu'il faut sur une œuvre au programme : couverture, auteur, date, genre, mouvement littéraire, parcours associé, biographie, contexte, résumé, thèmes, citations clés avec leur référence, et des sujets possibles avec leur plan détaillé. C'est aussi une fiche de lecture complète pour l'entretien de l'oral."],
  ["Est-ce que Calliope est gratuit ? Faut-il créer un compte ?",
    "Calliope est entièrement gratuit, sans publicité et sans inscription : tu arrives et tu commences ta fiche. Le code est libre (licence MIT)."],
  ["Où sont enregistrées mes fiches ?",
    "Sur ton appareil uniquement. Tes fiches restent dans ton navigateur et ne sont envoyées sur aucun serveur. Tu peux les sauvegarder dans un fichier .json pour les rouvrir sur un autre ordinateur, téléphone ou tablette."],
  ["Peut-on télécharger la fiche en PDF ou en Word ?",
    "Oui. Le PDF est prêt à imprimer et à réviser ; le Word (.docx) se retouche dans Word, LibreOffice ou Google Docs. Trois présentations au choix : Calliope (en couleur), Classique (serif, sobre) et Encre (compacte, noir et blanc)."],
  ["Calliope convient-il à la première générale et à la première technologique ?",
    "Oui. L'épreuve anticipée de français (EAF) a la même structure en voie générale et en voie technologique : l'oral avec l'explication linéaire, la question de grammaire et l'entretien, et l'écrit avec la dissertation ou le commentaire. Calliope sert aux deux, pour le bac 2026 comme pour les suivants."],
];

/** Données structurées de l'accueil : le site, l'application, l'auteur et la FAQ. */
export const jsonLd = () =>
  graph(
    schema.website({ url: site.url, name: site.name, alternateName: ["Calliope bac", "Calliope bac de français"], description: SEO_DESCRIPTION, inLanguage: ["fr"] }),
    schema.app({
      url: site.url, name: site.name, type: "WebApplication",
      alternateName: ["Calliope bac de français", "Calliope fiches bac", "Générateur de fiches pour le bac de français"],
      description: SEO_DESCRIPTION, category: "EducationalApplication", os: "Web, Windows, macOS, Linux, Android, iOS",
      features: [
        "Fiche d'explication linéaire pour l'oral (introduction, problématique, mouvements, citations, procédés, analyse)",
        "Question de grammaire de l'oral",
        "Fiche de dissertation sur l'œuvre intégrale et son parcours (biographie, contexte, résumé, thèmes, citations, plans)",
        "Aperçu en direct de la fiche",
        "Export PDF et Word (.docx)",
        "Trois modèles de présentation",
        "Sans inscription, données gardées sur l'appareil",
      ],
      keywords: KEYWORDS, inLanguage: ["fr"], repo: site.repo, license: "https://opensource.org/licenses/MIT",
      audience: "Lycéens de première (bac de français, EAF)", image: `${site.url}/img/emblem.svg`,
    }),
    schema.author(),
    schema.faq(FAQ),
  );
