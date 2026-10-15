import Link from "next/link";
import { Footer } from "@/components/Footer";
import { PantheonLayer } from "@/components/Pantheon";
import { Showroom } from "@/components/Showroom";
import { Topbar } from "@/components/Topbar";
import { site } from "@/config/site";

const NAV = [
  { href: "#modes", label: "Modes" },
  { href: "#modeles", label: "Modèles" },
  { href: "#vie-privee", label: "Vie privée" },
  { href: "#open-source", label: "Open source" },
];

export default function Home() {
  return (
    <div className="site">
      <Topbar product="BAC DE FRANÇAIS" nav={NAV} end={<Link className="btn primary" href="/fiches/">Créer ma fiche</Link>} />

      <main className="wrap">
        {/* ─────────────────────────────── accueil */}
        <section className="hero" id="hero">
          <PantheonLayer id="hero" seed={11} />
          <div className="hero-inner">
            <span className="kicker"><i />Calliope · la muse de l&apos;éloquence</span>
            <h1>Prépare tes textes du bac sans te compliquer la vie<span className="dot">.</span></h1>
            <p className="lead">
              Mets ton texte en ordre, retrouve tes citations et prépare une fiche claire pour l&apos;oral ou la dissertation.
              Tu peux ensuite la télécharger en PDF ou en Word.
            </p>
            <div className="actions">
              <Link className="btn primary big" href="/fiches/">Créer ma fiche</Link>
              <a className="btn secondary big" href={site.repo} rel="noopener">Voir sur GitHub</a>
            </div>
            <div className="trust">
              <span className="chip hue">Gratuit et libre</span><span className="chip">Code sous licence MIT</span><span className="chip">Sans inscription</span><span className="chip">Tes textes restent sur ton appareil</span>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────── modes */}
        <section id="modes">
          <div className="sec-head">
            <span className="kicker"><i />Pour l&apos;oral et l&apos;écrit</span>
            <h2>La bonne structure pour chaque épreuve<span className="dot">.</span></h2>
            <p>Choisis un format et remplis ta fiche à ton rythme. Les rubriques suivent ce dont tu as besoin le jour de l&apos;épreuve.</p>
          </div>
          <div className="modes">
            <article className="mode">
              <span className="tag">EL · ORAL</span>
              <h3>Explication linéaire<span className="dot">.</span></h3>
              <p>Pour préparer chaque texte de ta liste.</p>
              <ul>
                <li>Introduction et conclusion à coller telles quelles</li>
                <li>Problématique mise en avant</li>
                <li>Mouvements numérotés, avec leurs lignes</li>
                <li>Citations, procédés et analyse, une par une</li>
                <li>Question de grammaire et sa réponse</li>
              </ul>
            </article>
            <article className="mode">
              <span className="tag">DISSERT · ÉCRIT</span>
              <h3>Dissertation<span className="dot">.</span></h3>
              <p>Pour travailler une œuvre et son parcours.</p>
              <ul>
                <li>Photo de couverture du livre</li>
                <li>Auteur, date, genre, mouvement, parcours</li>
                <li>Biographie, contexte, résumé, thèmes</li>
                <li>Citations clés avec référence et usage</li>
                <li>Sujets possibles et plans détaillés</li>
              </ul>
            </article>
            <article className="mode soon">
              <span className="tag">BIENTÔT</span>
              <h3>Troisième mode<span className="dot">.</span></h3>
              <p>Un autre format arrivera bientôt. Une suggestion ? Partage-la sur GitHub.</p>
            </article>
          </div>
        </section>

        {/* ─────────────────────────────── modèles en direct */}
        <section id="modeles">
          <div className="sec-head">
            <span className="kicker"><i />PDF et Word</span>
            <h2>Choisis la présentation qui te convient<span className="dot">.</span></h2>
            <p>Teste les modèles sur un exemple, puis garde celui qui te plaît pour tes propres fiches.</p>
          </div>
          <Showroom />
        </section>

        {/* ─────────────────────────────── comment ça marche */}
        <section className="showcase" aria-labelledby="demo-title">
          <div className="stack">
            <span className="kicker"><i />Comment ça marche</span>
            <h2 id="demo-title">Une fiche prête à réviser<span className="dot">.</span></h2>
          </div>
          <ol className="steps">
            <li className="step"><h3>Choisis un format</h3><p>Prépare un texte pour l&apos;oral ou une œuvre pour l&apos;écrit.</p></li>
            <li className="step"><h3>Renseigne ta fiche</h3><p>Ajoute ton introduction, tes mouvements et les informations importantes.</p></li>
            <li className="step"><h3>Ajoute tes analyses</h3><p>Garde chaque citation, son procédé et ton explication au même endroit.</p></li>
            <li className="step"><h3>Télécharge-la</h3><p>Choisis le PDF pour l&apos;imprimer ou le Word pour continuer à la modifier.</p></li>
          </ol>
        </section>

        {/* ─────────────────────────────── vie privée */}
        <section className="privacy" id="vie-privee">
          <div className="sec-head">
            <span className="kicker"><i />Tes données</span>
            <h2>Tout reste sur ton appareil<span className="dot">.</span></h2>
            <p>Calliope fonctionne directement dans ton navigateur. Tes textes ne sont pas envoyés sur un serveur.</p>
          </div>
          <div className="card">
            <dl className="kv">
              <dt>Inscription</dt><dd>Tu arrives sur la page et tu peux commencer tout de suite.</dd>
              <dt>Fiches</dt><dd>Elles restent dans ton navigateur, sur ton appareil.</dd>
              <dt>Sauvegarde</dt><dd>Tu peux aussi les enregistrer dans un fichier <code>.json</code> pour les retrouver plus tard.</dd>
              <dt>Exports</dt><dd>Le PDF ou le Word est créé directement sur ton appareil.</dd>
              <dt>Vie privée</dt><dd>Calliope n&apos;utilise ni publicité, ni statistiques, ni cookies de suivi.</dd>
            </dl>
          </div>
        </section>

        {/* ─────────────────────────────── open source */}
        <section className="hero oss" id="open-source">
          <PantheonLayer id="oss" seed={3} greek={false} emblem={false} count={40} />
          <div className="hero-inner">
            <span className="kicker"><i />Open source</span>
            <h2>Un outil ouvert, que tu peux adapter<span className="dot">.</span></h2>
            <p className="lead">Le code de Calliope est disponible sous licence MIT. Tu peux l&apos;héberger, le modifier pour ta classe ou suggérer une amélioration.</p>
            <pre><b>git clone</b> {site.repo}.git{"\n"}<b>cd</b> calliope && <b>npm</b> install{"\n"}<b>npm</b> run dev   <span># http://localhost:3000</span></pre>
            <div className="actions">
              <a className="btn primary" href={site.repo} rel="noopener">Le dépôt GitHub</a>
              <a className="btn secondary" href={`${site.repo}/issues`} rel="noopener">Proposer une idée</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
