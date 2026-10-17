// Copie de freelance/sites/_salks : ne pas modifier ici, relancer sync.mjs.
/**
 * Documents légaux communs à tous les sites Salks.
 *
 * Ce sont les modèles de départ : Olympe les enregistre en base (site = "*") et
 * chaque site peut ensuite avoir sa propre version d'un document. Les balises
 * {{...}} sont remplacées au moment de servir le document :
 *   {{site}}             nom du site (« Kern », « Hermès »…)
 *   {{editor.name}}      … et les autres champs de LegalIdentity
 *   {{updated}}          date de dernière modification
 */

export const LEGAL_DOCS = ["mentions", "cgu", "confidentialite", "cookies", "licences"] as const;
export type LegalDocKey = (typeof LEGAL_DOCS)[number] | "cgv";
export type LegalLang = "fr" | "en";

export const LEGAL_TITLES: Record<LegalDocKey, Record<LegalLang, string>> = {
  mentions: { fr: "Mentions légales", en: "Legal notice" },
  cgu: { fr: "Conditions d’utilisation", en: "Terms of use" },
  confidentialite: { fr: "Confidentialité", en: "Privacy" },
  cookies: { fr: "Cookies et stockage", en: "Cookies and storage" },
  licences: { fr: "Licences et crédits", en: "Licenses and credits" },
  cgv: { fr: "Conditions générales de vente", en: "Terms of sale" },
};

/** Résumé d'une ligne, pour les cartes de navigation entre documents. */
export const LEGAL_SUMMARIES: Record<LegalDocKey, Record<LegalLang, string>> = {
  mentions: { fr: "Qui édite et héberge le site.", en: "Who publishes and hosts the site." },
  cgu: { fr: "Les règles pour utiliser le site.", en: "The rules for using the site." },
  confidentialite: { fr: "Quelles données, pourquoi, et tes droits (RGPD).", en: "What data, why, and your rights (GDPR)." },
  cookies: { fr: "Aucun cookie. Ce que le navigateur garde, et pourquoi.", en: "No cookies. What your browser keeps, and why." },
  licences: { fr: "Les logiciels libres et les polices utilisés.", en: "The open-source software and fonts used." },
  cgv: { fr: "Devis, paiement et livraison des prestations.", en: "Quotes, payment and delivery of services." },
};

/** Chemin de chaque document sur les sites (identique partout). */
export const LEGAL_PATHS: Record<LegalDocKey, string> = {
  mentions: "mentions-legales",
  cgu: "cgu",
  confidentialite: "confidentialite",
  cookies: "cookies",
  licences: "licences",
  cgv: "cgv",
};

const FR: Record<(typeof LEGAL_DOCS)[number], string> = {
  mentions: `Conformément à l'article 6-III de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), voici l'identité des intervenants du site **{{site}}**.

## Éditeur

| | |
| --- | --- |
| Nom | {{editor.name}} |
| Statut | {{editor.status}} |
| SIRET | {{editor.siret}} |
| Adresse | {{editor.address}} |
| Email | {{editor.email}} |
| Téléphone | {{editor.phone}} |
| TVA | {{editor.vat}} |

{{editor.note}}

## Directeur de la publication

{{publisher}}

## Hébergeur

| | |
| --- | --- |
| Nom | {{host.name}} |
| Adresse | {{host.address}} |
| Contact | {{host.contact}} |

## Propriété intellectuelle

Les textes, la mise en page, les logos **Salks.** et **{{site}}.** et les illustrations du site sont la propriété de l'éditeur, sauf mention contraire. Les logiciels libres et polices utilisés sont listés dans [Licences et crédits](licences).

## Contact

Pour toute question sur le site : {{editor.email}}.`,

  cgu: `Ces conditions générales d'utilisation (CGU) encadrent l'accès au site **{{site}}**. Naviguer sur le site vaut acceptation de ces conditions.

## 1. Objet

Le site présente {{site}}, un projet de l'éditeur : ce qu'il fait, comment l'utiliser et comment l'obtenir.

## 2. Accès

Le site est accessible gratuitement, sans inscription, à toute personne disposant d'un accès à Internet. Les frais de connexion restent à ta charge. L'éditeur peut interrompre le site pour maintenance, mise à jour ou toute autre raison, sans préavis ni indemnité.

## 3. Utilisation du contenu

- Tu peux lire, imprimer et citer le contenu pour un usage personnel.
- Toute reproduction ou rediffusion du site, de ses textes, logos ou illustrations dans un autre but demande l'accord écrit de l'éditeur.
- Si le projet est open source, son code est régi par la licence de son dépôt, qui prime sur ces CGU.

## 4. Responsabilité

Le contenu est rédigé avec soin mais fourni **« en l'état »**. Il peut contenir des erreurs ou décrire une version différente de celle que tu utilises. L'éditeur ne peut être tenu responsable des dommages liés à l'utilisation des informations publiées.

Le logiciel ou le service présenté a ses propres conditions ou sa propre licence, qui priment sur ces CGU pour son usage.

## 5. Liens externes

Le site renvoie vers des sites tiers (GitHub, Discord, documentation…). L'éditeur n'a aucun contrôle sur leur contenu ni sur leur politique de confidentialité.

## 6. Modification des conditions

Ces conditions peuvent évoluer. La version en ligne, datée en haut de page, est celle qui s'applique.

## 7. Droit applicable

Ces conditions sont régies par le droit français. En cas de litige, et après tentative de résolution amiable, compétence est attribuée à {{jurisdiction}}.

## Contact

{{editor.email}}`,

  confidentialite: `**En bref :** {{site}} ne te demande pas de compte pour être consulté, n'affiche pas de publicité et ne dépose aucun cookie. La mesure d'audience est anonyme et ne permet pas de te suivre d'un jour à l'autre.

## Responsable du traitement

{{editor.name}}, joignable à {{editor.email}}. Les coordonnées complètes sont dans les [mentions légales](mentions-legales).

## Données traitées

| Situation | Données | Finalité | Base légale | Durée |
| --- | --- | --- | --- | --- |
| Visite du site | Adresse IP, date, page demandée, navigateur (journaux techniques de l'hébergeur) | Faire fonctionner et sécuriser le site | Intérêt légitime | Selon l'hébergeur, en général 30 jours au plus |
| Mesure d'audience | Page vue, site d'origine (domaine seulement), type d'appareil, navigateur, langue | Savoir quelles pages sont lues | Intérêt légitime | 13 mois |
| Email envoyé à l'éditeur | Adresse email, nom, contenu du message | Te répondre | Intérêt légitime / mesures précontractuelles | 3 ans après le dernier échange |

Aucune donnée n'est vendue, louée ni utilisée pour du profilage ou de la publicité.

## Mesure d'audience sans cookie

Les statistiques sont calculées par Olympe, l'outil de l'éditeur, sans service tiers. Ton adresse IP n'est **jamais enregistrée** : elle sert seulement, avec ton navigateur, à calculer une empreinte salée qui change chaque jour. Il est donc impossible de te reconnaître d'une journée à l'autre ou d'un site à l'autre. Ce dispositif est exempté de consentement selon les lignes directrices de la CNIL. Si ton navigateur envoie « Do Not Track » ou « Global Privacy Control », ta visite n'est pas comptée.

## Destinataires et transferts

Seuls l'éditeur et l'hébergeur ({{host.name}}) ont accès aux données ci-dessus. Si l'hébergeur est situé hors de l'Union européenne, le transfert est encadré par les garanties prévues par le RGPD (décision d'adéquation ou clauses contractuelles types).

Les polices sont servies par le site lui-même : aucune requête n'est faite à Google Fonts ou à un autre service tiers pendant ta visite.

## Tes droits

Conformément au RGPD et à la loi Informatique et Libertés, tu disposes d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité sur tes données. Pour les exercer, écris à {{editor.email}}. Une réponse t'est apportée sous un mois.

Si tu estimes que tes droits ne sont pas respectés, tu peux adresser une réclamation à la [CNIL](https://www.cnil.fr/fr/plaintes).`,

  cookies: `**{{site}} ne dépose aucun cookie** : ni pour la publicité, ni pour les réseaux sociaux, ni pour la mesure d'audience, qui fonctionne sans cookie. C'est pour ça qu'aucun bandeau de consentement ne s'affiche.

## Ce que le navigateur garde

Pour se souvenir de tes préférences, le site utilise le stockage local de ton navigateur. Ces informations ne quittent jamais ton appareil.

| Clé | Stockage | Contenu | Durée |
| --- | --- | --- | --- |
| \`theme\` | Local | Thème choisi : \`dark\` ou \`light\` | Jusqu'à ce que tu vides les données du site |
| \`lang\` | Local | Langue choisie, si le site est bilingue | Idem |

## Pourquoi aucun consentement n'est demandé

Ces éléments servent uniquement à fournir le service que tu demandes (garder ton thème ou ta langue). Ils sont exemptés de consentement au titre de l'article 82 de la loi Informatique et Libertés et des lignes directrices de la CNIL. La mesure d'audience, décrite dans la [politique de confidentialité](confidentialite), n'utilise ni cookie ni stockage sur ton appareil.

## Les supprimer

Tu peux les effacer à tout moment depuis les réglages de ton navigateur (*Effacer les données du site*). Le site fonctionnera toujours, il reviendra simplement au thème de ton système.

## Si ça change

Si un service tiers déposant des cookies est ajouté un jour, cette page sera mise à jour et ton accord sera demandé avant tout dépôt.`,

  licences: `{{site}} repose sur des logiciels libres. Merci à leurs auteurs.

## Moteur et code

| Projet | Rôle | Licence |
| --- | --- | --- |
| [Next.js](https://nextjs.org) | Moteur du site | MIT |
| [React](https://react.dev) | Interface | MIT |
| [Lucide](https://lucide.dev) | Icônes | ISC |

## Polices

| Police | Auteur | Licence |
| --- | --- | --- |
| [Plus Jakarta Sans](https://github.com/tokotype/PlusJakartaSans) | Tokotype | SIL Open Font License 1.1 |
| [JetBrains Mono](https://www.jetbrains.com/lp/mono/) | JetBrains | SIL Open Font License 1.1 |

Les polices sont servies directement par le site.

## Visuels

Les logos **Salks.** et **{{site}}.** et les illustrations du panthéon sont des créations originales de Salks. Tous droits réservés.

## Marques

Discord, PRONOTE, Minecraft et les autres marques citées appartiennent à leurs propriétaires respectifs. Les projets Salks n'y sont pas affiliés.`,
};

const EN: Record<(typeof LEGAL_DOCS)[number], string> = {
  mentions: `In accordance with article 6-III of French law no. 2004-575 of 21 June 2004 (LCEN), here is who is behind **{{site}}**.

## Publisher

| | |
| --- | --- |
| Name | {{editor.name}} |
| Status | {{editor.status}} |
| SIRET | {{editor.siret}} |
| Address | {{editor.address}} |
| Email | {{editor.email}} |
| Phone | {{editor.phone}} |
| VAT | {{editor.vat}} |

{{editor.note}}

## Publication director

{{publisher}}

## Host

| | |
| --- | --- |
| Name | {{host.name}} |
| Address | {{host.address}} |
| Contact | {{host.contact}} |

## Intellectual property

The texts, layout, the **Salks.** and **{{site}}.** logos and the illustrations belong to the publisher unless stated otherwise. Open-source software and fonts are listed in [Licenses and credits](licences).

## Contact

For any question about the site: {{editor.email}}.`,

  cgu: `These terms of use govern access to **{{site}}**. Browsing the site means you accept them.

## 1. Purpose

The site presents {{site}}, a project by the publisher: what it does, how to use it and how to get it.

## 2. Access

The site is free and requires no account. Connection costs are yours. The publisher may interrupt the site for maintenance, updates or any other reason, without notice or compensation.

## 3. Use of the content

- You may read, print and quote the content for personal use.
- Any other reproduction of the site, its texts, logos or illustrations requires the publisher's written consent.
- If the project is open source, its code is governed by the licence in its repository, which prevails over these terms.

## 4. Liability

The content is written with care but provided **"as is"**. It may contain mistakes or describe a different version from the one you use. The publisher cannot be held liable for damage resulting from the use of the published information.

The software or service presented has its own terms or licence, which prevail over these terms for its use.

## 5. External links

The site links to third-party sites (GitHub, Discord, documentation…). The publisher has no control over their content or privacy policy.

## 6. Changes

These terms may change. The online version, dated at the top of the page, applies.

## 7. Governing law

These terms are governed by French law. In case of dispute, after an attempt at amicable resolution, {{jurisdiction}} have jurisdiction.

## Contact

{{editor.email}}`,

  confidentialite: `**In short:** {{site}} needs no account to be browsed, shows no ads and sets no cookies. Audience measurement is anonymous and cannot follow you from one day to the next.

## Data controller

{{editor.name}}, reachable at {{editor.email}}. Full details are in the [legal notice](mentions-legales).

## Data processed

| Situation | Data | Purpose | Legal basis | Retention |
| --- | --- | --- | --- | --- |
| Visiting the site | IP address, date, page, browser (host's technical logs) | Run and secure the site | Legitimate interest | Depends on the host, usually 30 days at most |
| Audience measurement | Page viewed, referring domain, device type, browser, language | Know which pages are read | Legitimate interest | 13 months |
| Emailing the publisher | Email address, name, message | Answer you | Legitimate interest / pre-contractual steps | 3 years after the last exchange |

No data is sold, rented or used for profiling or advertising.

## Cookie-free analytics

Statistics are computed by Olympe, the publisher's own tool, with no third party. Your IP address is **never stored**: together with your browser it is only used to compute a salted fingerprint that changes every day, so you cannot be recognised from one day or one site to the next. This setup is exempt from consent under the CNIL guidelines. If your browser sends “Do Not Track” or “Global Privacy Control”, your visit is not counted.

## Recipients and transfers

Only the publisher and the host ({{host.name}}) can access the data above. If the host is outside the European Union, the transfer relies on the safeguards provided by the GDPR.

Fonts are served by the site itself: no request is made to Google Fonts or any other third party during your visit.

## Your rights

Under the GDPR you have the right to access, rectify, erase, restrict, object to and port your data. To exercise them, write to {{editor.email}}. You will get an answer within one month.

You can also lodge a complaint with the [CNIL](https://www.cnil.fr/en/complaints).`,

  cookies: `**{{site}} sets no cookies**: none for advertising, none for social networks and none for audience measurement, which works without cookies. That is why no consent banner is shown.

## What your browser keeps

To remember your preferences, the site uses your browser's local storage. This never leaves your device.

| Key | Storage | Content | Duration |
| --- | --- | --- | --- |
| \`theme\` | Local | Chosen theme: \`dark\` or \`light\` | Until you clear the site's data |
| \`lang\` | Local | Chosen language, if the site is bilingual | Same |

## Why no consent is asked

These items are only used to provide the service you ask for (keeping your theme or language). They are exempt from consent under article 82 of the French Data Protection Act and the CNIL guidelines. Audience measurement, described in the [privacy policy](confidentialite), uses neither cookies nor storage on your device.

## Deleting them

You can clear them at any time from your browser settings (*Clear site data*). The site keeps working and simply falls back to your system theme.

## If this changes

If a third-party service setting cookies is ever added, this page will be updated and your consent will be asked first.`,

  licences: `{{site}} is built on open-source software. Thanks to their authors.

## Engine and code

| Project | Role | Licence |
| --- | --- | --- |
| [Next.js](https://nextjs.org) | Site engine | MIT |
| [React](https://react.dev) | Interface | MIT |
| [Lucide](https://lucide.dev) | Icons | ISC |

## Fonts

| Font | Author | Licence |
| --- | --- | --- |
| [Plus Jakarta Sans](https://github.com/tokotype/PlusJakartaSans) | Tokotype | SIL Open Font License 1.1 |
| [JetBrains Mono](https://www.jetbrains.com/lp/mono/) | JetBrains | SIL Open Font License 1.1 |

Fonts are served by the site itself.

## Visuals

The **Salks.** and **{{site}}.** logos and the pantheon illustrations are original creations by Salks. All rights reserved.

## Trademarks

Discord, PRONOTE, Minecraft and the other brands mentioned belong to their respective owners. Salks projects are not affiliated with them.`,
};

export const LEGAL_DEFAULTS: Record<LegalLang, Record<(typeof LEGAL_DOCS)[number], string>> = { fr: FR, en: EN };

/** Coordonnées légales, telles que stockées dans LegalIdentity. */
export type LegalIdentityValues = {
  /** "particulier" (non professionnel, sous pseudonyme) ou "pro" (entreprise) */
  editorKind: string;
  editorName: string; editorStatus: string; editorSiret: string; editorAddress: string;
  editorEmail: string; editorPhone: string; editorVat: string; publisher: string;
  hostName: string; hostAddress: string; hostContact: string; jurisdiction: string;
};

/** Champs de l'éditeur qu'un particulier ne publie pas : la ligne disparaît du document. */
const OPTIONAL_EDITOR_FIELDS = ["siret", "address", "phone", "vat"] as const;

/**
 * Particulier qui publie sous pseudonyme (LCEN, art. 6-III-2) : sans adresse,
 * on l'explique au lieu d'afficher une case vide.
 */
const ANONYMOUS_NOTE: Record<LegalLang, string> = {
  fr: "L'éditeur est une personne physique qui publie ce site à titre non professionnel. Conformément à l'article 6-III-2 de la loi n° 2004-575 du 21 juin 2004, il ne rend pas publics son nom et son adresse : ces informations ont été communiquées à l'hébergeur, qui les transmet à l'autorité judiciaire si elle le demande.",
  en: "The publisher is a private individual who runs this site on a non-professional basis. Under article 6-III-2 of French law no. 2004-575 of 21 June 2004, their name and address are not made public: they have been given to the host, which passes them on to the judicial authorities on request.",
};

/** Remplace les balises {{...}}. Un champ vide devient « À compléter ». */
export function fillLegal(body: string, site: string, id: Partial<LegalIdentityValues>, lang: LegalLang, updated: string) {
  const todo = lang === "en" ? "*To be completed*" : "*À compléter*";
  // Sans choix explicite (ancienne identité), pas d'adresse = particulier
  const particulier = (id.editorKind || (id.editorAddress?.trim() ? "pro" : "particulier")) === "particulier";
  const values: Record<(typeof OPTIONAL_EDITOR_FIELDS)[number], string | undefined> = {
    siret: id.editorSiret, address: id.editorAddress, phone: id.editorPhone, vat: id.editorVat,
  };
  for (const field of OPTIONAL_EDITOR_FIELDS) {
    // Un particulier ne publie jamais ces champs ; une entreprise garde SIRET et adresse, même vides (« À compléter »)
    const required = !particulier && (field === "siret" || field === "address");
    if (particulier || (!required && !values[field]?.trim())) body = body.replace(new RegExp(`^\\|[^\\n]*\\{\\{\\s*editor\\.${field}\\s*\\}\\}[^\\n]*\\n`, "m"), "");
  }
  const map: Record<string, string | undefined> = {
    site,
    updated,
    "editor.name": id.editorName, "editor.status": id.editorStatus, "editor.siret": id.editorSiret,
    "editor.address": id.editorAddress, "editor.email": id.editorEmail, "editor.phone": id.editorPhone,
    "editor.vat": id.editorVat, publisher: id.publisher || id.editorName,
    "host.name": id.hostName, "host.address": id.hostAddress, "host.contact": id.hostContact,
    jurisdiction: id.jurisdiction || (lang === "en" ? "the French courts" : "les tribunaux français"),
  };
  const note = particulier ? ANONYMOUS_NOTE[lang] : "";
  return body
    .replace(/\{\{\s*editor\.note\s*\}\}/g, note)
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, key: string) => map[key]?.trim() || todo);
}
