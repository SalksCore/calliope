# Contribuer à Calliope

Merci de vouloir aider !

```bash
npm install
npm run dev         # http://localhost:3000
npm run typecheck   # avant chaque pull request
npm run build       # vérifie que l'export statique passe
```

## Règles

- **Les fiches ne sortent pas du navigateur.** Pas de base de données, pas d'API, pas de service tiers. Seule exception : la mesure d'audience anonyme d'Olympe (sans cookie, IP jamais enregistrée), décrite dans la politique de confidentialité. Une contribution qui envoie d'autres données ailleurs sera refusée.
- **Le site reste statique** (`output: "export"`) : pas de route serveur, pas de cookies.
- **La DA** des projets Salks : Plus Jakarta Sans et JetBrains Mono, un seul vert laurier (`--hue`), un point de couleur pour fermer les titres, la couche panthéon. Les deux thèmes (sombre et clair) doivent fonctionner.
- Les textes de l'interface sont en français, au tutoiement.

## Ajouter un mode de fichage

1. **`src/lib/fiche.ts`** : déclare le type de la fiche, sa fabrique vide (comme `newEL()`) et un exemple.
2. **`src/components/editor/Forms.tsx`** : écris son formulaire (comme `ElForm`).
3. **`src/lib/blocks.ts`** : ajoute sa branche dans `blocks()`. C'est elle qui alimente l'aperçu, le PDF et le Word : rien d'autre à toucher pour les exports.
4. Remplace la carte « Bientôt » dans `Studio.tsx` et `src/app/page.tsx`.

## Ajouter un modèle d'export

Ajoute une entrée dans `src/lib/templates.ts`. L'aperçu, le PDF et le Word la prennent en compte automatiquement.
