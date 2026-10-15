import type { LegalDocKey, LegalLang } from "./salks/legal-content";
import type { LocalLegal } from "./salks/legal";

/** Ce qui est propre à Calliope, ajouté à la fin des documents communs (ou à leur place). */
export const ADDENDA: Partial<Record<LegalDocKey, Partial<Record<LegalLang, LocalLegal>>>> = {
  confidentialite: {
    fr: `## Tes fiches

Calliope n'a ni compte, ni base de données, ni formulaire envoyé à un serveur.

- **Tes fiches** sont enregistrées dans le stockage local de ton navigateur, sur ton appareil. Personne d'autre n'y a accès, pas même l'éditeur.
- **Les exports** PDF, Word et \`.json\` sont fabriqués dans ton navigateur et enregistrés directement sur ton appareil.
- Pour tout effacer, supprime tes fiches dans l'éditeur ou vide les données du site dans les réglages de ton navigateur. Pense à garder une sauvegarde \`.json\` si tu y tiens.`,
  },
  cookies: {
    fr: {
      replace: `**{{site}} ne dépose aucun cookie** : ni publicité, ni mesure d'audience, ni réseau social. C'est pour ça qu'aucun bandeau de consentement ne s'affiche.

## Ce que le navigateur garde

Le site utilise le stockage local de ton navigateur. Ces informations ne quittent jamais ton appareil.

| Clé | Contenu | Durée |
| --- | --- | --- |
| \`calliope.fiches.v1\` | Tes fiches | Jusqu'à ce que tu les supprimes ou que tu vides les données du site |
| \`calliope.prefs.v1\` | Le dernier modèle de fiche choisi | Idem |
| \`calliope-theme\` | Thème choisi : \`dark\` ou \`light\` | Idem |

## Pourquoi aucun consentement n'est demandé

Ces éléments servent uniquement à faire marcher l'outil que tu utilises. Ils sont exemptés de consentement au titre de l'article 82 de la loi Informatique et Libertés et des lignes directrices de la CNIL.

## Les supprimer

Depuis les réglages de ton navigateur (*Effacer les données du site*). Attention : tes fiches partent avec, sauvegarde-les en \`.json\` avant.`,
    },
  },
  licences: {
    fr: `## Propre à Calliope

| Projet | Rôle | Licence |
| --- | --- | --- |
| [jsPDF](https://github.com/parallax/jsPDF) | Export PDF | MIT |
| [docx](https://github.com/dolanmiu/docx) | Export Word | MIT |
| [Source Serif 4](https://github.com/adobe-fonts/source-serif) | Police des fiches | SIL Open Font License 1.1 |

Le code de Calliope est publié sous licence MIT. Le contenu des fiches appartient à celles et ceux qui les écrivent ; les extraits cités dans les fiches d'exemple relèvent du domaine public ou du droit de courte citation à des fins d'enseignement.`,
  },
};
