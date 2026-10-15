import Link from "next/link";
import { Footer } from "@/components/Footer";
import { TemplatePreview } from "@/components/TemplatePreview";
import { Models } from "@/components/Models";
import { Colophon, Masthead, SectionHead } from "@/components/salks/Vitrine";
import { site } from "@/config/site";
import { exampleEL } from "@/lib/fiche";

const NAV = [
  { href: "#formats", label: "Formats" },
  { href: "#modeles", label: "Modèles" },
  { href: "#donnees", label: "Tes données" },
  { href: "#code", label: "Code source" },
];

export default function Home() {
  return (
    <div className="v">
      <Masthead name={site.name} greek="ΚΑΛΛΙΟΠΗ" nav={NAV} theme="calliope-theme" cta={{ href: "/fiches/", label: "Créer ma fiche" }} />

      <main>
        {/* ─────────────────────────────── ouverture */}
        <section className="v-hero">
          <div className="v-wrap v-hero-grid">
            <div className="v-hero-text">
              <p className="v-over"><b>Calliope</b> · muse de l&apos;éloquence · bac de français</p>
              <h1>Prépare tes textes du bac <em>sans te compliquer la vie</em>.</h1>
              <p className="v-lead">
                Mets ton texte en ordre, retrouve tes citations et prépare une fiche claire pour l&apos;oral ou la dissertation.
                Tu la télécharges ensuite en PDF ou en Word.
              </p>
              <div className="v-actions">
                <Link className="v-btn v-btn-solid" href="/fiches/">Créer ma fiche</Link>
                <a className="v-link" href="#modeles">Voir les modèles <span aria-hidden="true">↓</span></a>
              </div>
              <ul className="v-facts">
                <li>Gratuit</li><li>Sans inscription</li><li>Tes textes restent sur ton appareil</li><li>Code libre (MIT)</li>
              </ul>
            </div>
            <figure className="v-sheet" aria-label="Exemple de fiche réalisée avec Calliope">
              <TemplatePreview fiche={exampleEL()} template="calliope" />
              <figcaption className="v-sheet-cap">Fiche d&apos;exemple · Victor Hugo</figcaption>
            </figure>
          </div>
        </section>

        {/* ─────────────────────────────── formats */}
        <section className="v-sec" id="formats">
          <div className="v-wrap">
            <SectionHead num="α′" label="Les formats" title="La bonne structure pour chaque épreuve.">
              Choisis un format et remplis ta fiche à ton rythme. Les rubriques suivent ce dont tu as besoin le jour de l&apos;épreuve.
            </SectionHead>
            <div className="v-cols two">
              <article>
                <span className="v-tag">Épreuve orale</span>
                <h3>Explication linéaire</h3>
                <p>Pour préparer chaque texte de ta liste.</p>
                <ol className="v-list">
                  <li>Introduction et conclusion à dire telles quelles</li>
                  <li>Problématique mise en avant</li>
                  <li>Mouvements numérotés, avec leurs lignes</li>
                  <li>Citations, procédés et analyse, une par une</li>
                  <li>Question de grammaire et sa réponse</li>
                </ol>
              </article>
              <article>
                <span className="v-tag">Épreuve écrite</span>
                <h3>Dissertation</h3>
                <p>Pour travailler une œuvre et son parcours.</p>
                <ol className="v-list">
                  <li>Photo de couverture du livre</li>
                  <li>Auteur, date, genre, mouvement, parcours</li>
                  <li>Biographie, contexte, résumé, thèmes</li>
                  <li>Citations clés avec référence et usage</li>
                  <li>Sujets possibles et plans détaillés</li>
                </ol>
              </article>
            </div>
            <p className="v-soon">Un troisième format est en préparation. Une idée ? <a href={`${site.repo}/issues`} rel="noopener">Propose-la sur GitHub</a>.</p>
          </div>
        </section>

        {/* ─────────────────────────────── modèles */}
        <section className="v-sec" id="modeles">
          <div className="v-wrap">
            <SectionHead num="β′" label="PDF et Word" title="Choisis la présentation qui te convient.">
              Les trois modèles sont appliqués ici à une vraie fiche. Ce que tu vois est ce que tu exportes.
            </SectionHead>
            <Models />
          </div>
        </section>

        {/* ─────────────────────────────── étapes */}
        <section className="v-sec" aria-labelledby="etapes">
          <div className="v-wrap">
            <SectionHead num="γ′" label="Comment ça marche" title={<span id="etapes">Une fiche prête à réviser, en quatre temps.</span>} />
            <ol className="v-steps">
              <li><h3>Choisis un format</h3><p>Un texte pour l&apos;oral ou une œuvre pour l&apos;écrit.</p></li>
              <li><h3>Remplis ta fiche</h3><p>Introduction, mouvements et informations importantes.</p></li>
              <li><h3>Ajoute tes analyses</h3><p>Chaque citation garde son procédé et ton explication.</p></li>
              <li><h3>Télécharge-la</h3><p>En PDF pour l&apos;imprimer, en Word pour la retoucher.</p></li>
            </ol>
          </div>
        </section>

        {/* ─────────────────────────────── données */}
        <section className="v-sec" id="donnees">
          <div className="v-wrap v-split">
            <SectionHead num="δ′" label="Tes données" title="Tout reste sur ton appareil.">
              Calliope fonctionne directement dans ton navigateur. Tes textes ne sont envoyés sur aucun serveur.
            </SectionHead>
            <dl className="v-kv">
              <dt>Inscription</dt><dd>Aucune. Tu arrives et tu commences.</dd>
              <dt>Fiches</dt><dd>Gardées dans ton navigateur, sur ton appareil.</dd>
              <dt>Sauvegarde</dt><dd>Possible dans un fichier <code>.json</code>, pour les retrouver ailleurs.</dd>
              <dt>Exports</dt><dd>Le PDF et le Word sont créés sur ton appareil.</dd>
              <dt>Suivi</dt><dd>Ni publicité, ni cookies de suivi.</dd>
            </dl>
          </div>
        </section>

        {/* ─────────────────────────────── code source */}
        <section className="v-sec" id="code">
          <div className="v-wrap v-split center">
            <div>
              <SectionHead num="ε′" label="Code ouvert" title="Un outil ouvert, que tu peux adapter.">
                Le code de Calliope est publié sous licence MIT. Tu peux l&apos;héberger, le modifier pour ta classe ou proposer une amélioration.
              </SectionHead>
              <div className="v-actions">
                <a className="v-btn" href={site.repo} rel="noopener">Le dépôt GitHub</a>
                <a className="v-link" href={`${site.repo}/issues`} rel="noopener">Proposer une idée</a>
              </div>
            </div>
            <pre className="v-code"><b>git clone</b> {site.repo}.git{"\n"}<b>cd</b> calliope{"\n"}<b>npm</b> install{"\n"}<b>npm</b> run dev   <span># http://localhost:3000</span></pre>
          </div>
        </section>

        <Colophon greek="ΚΑΛΛΙΟΠΗ">Calliope, la muse de l&apos;éloquence et de la poésie épique, l&apos;aînée des neuf muses.</Colophon>
      </main>

      <Footer />
    </div>
  );
}
