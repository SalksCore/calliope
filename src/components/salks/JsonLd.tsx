// Copie de freelance/sites/_salks : ne pas modifier ici, relancer sync.mjs.
/** Données structurées schema.org (voir seo.ts), lues par les moteurs et les assistants IA. */
export function JsonLd({ data }: { data: object }) {
  // « < » échappé : le JSON ne peut pas refermer la balise <script>
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
