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
            <h1>Tes textes du bac, fichés proprement<span className="dot">.</span></h1>
            <p className="lead">
              Colle ton intro et ta conclusion, découpe le texte en mouvements, range chaque citation avec ses procédés et ton analyse.
              Calliope en fait une fiche nette, en PDF ou en Word, prête à réviser.
            </p>
            <div className="actions">
              <Link className="btn primary big" href="/fiches/">Créer ma fiche</Link>
              <a className="btn secondary big" href={site.repo} rel="noopener">Voir sur GitHub</a>
            </div>
            <div className="trust">
              <span className="chip hue">Gratuit</span><span className="chip">Open source · MIT</span><span className="chip">Sans compte</span><span className="chip">Rien n&apos;est stocké</span>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────── modes */}
        <section id="modes">
          <div className="sec-head">
            <span className="kicker"><i />Trois modes de fichage</span>
            <h2>Une fiche pensée pour chaque épreuve<span className="dot">.</span></h2>
            <p>L&apos;oral et l&apos;écrit ne se préparent pas de la même façon. Chaque mode reprend la structure attendue le jour de l&apos;épreuve.</p>
          </div>
          <div className="modes">
            <article className="mode">
              <span className="tag">EL · ORAL</span>
              <h3>Explication linéaire<span className="dot">.</span></h3>
              <p>Pour chaque texte de ta liste d&apos;oral.</p>
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
              <p>Pour maîtriser une œuvre intégrale et son parcours.</p>
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
              <p>Un nouveau mode de fichage est en préparation. Tu as une idée ? Ouvre une discussion sur GitHub.</p>
            </article>
          </div>
        </section>

        {/* ─────────────────────────────── modèles en direct */}
        <section id="modeles">
          <div className="sec-head">
            <span className="kicker"><i />PDF et Word</span>
            <h2>Trois modèles, en direct<span className="dot">.</span></h2>
            <p>Change de modèle et regarde la fiche se recomposer. Les citations ressortent, la problématique est encadrée, les accents et les guillemets français sont respectés.</p>
          </div>
          <Showroom />
        </section>

        {/* ─────────────────────────────── comment ça marche */}
        <section className="showcase" aria-labelledby="demo-title">
          <div className="stack">
            <span className="kicker"><i />Comment ça marche</span>
            <h2 id="demo-title">De ton brouillon à une fiche propre<span className="dot">.</span></h2>
          </div>
          <ol className="steps">
            <li className="step"><h3>Choisis le mode</h3><p>EL pour l&apos;oral, Dissert pour l&apos;œuvre intégrale.</p></li>
            <li className="step"><h3>Colle et découpe</h3><p>Ton intro, ta conclusion, puis un bloc par mouvement du texte.</p></li>
            <li className="step"><h3>Range tes citations</h3><p>Chaque citation garde ses procédés et ton analyse au même endroit.</p></li>
            <li className="step"><h3>Exporte</h3><p>Un PDF à imprimer ou un Word à retoucher, dans le modèle de ton choix.</p></li>
          </ol>
        </section>

        {/* ─────────────────────────────── vie privée */}
        <section className="privacy" id="vie-privee">
          <div className="sec-head">
            <span className="kicker"><i />Rien n&apos;est stocké</span>
            <h2>Tes fiches restent chez toi<span className="dot">.</span></h2>
            <p>Calliope est un site statique. Il n&apos;y a ni base de données, ni compte, ni serveur qui reçoit tes textes.</p>
          </div>
          <div className="card">
            <dl className="kv">
              <dt>Compte</dt><dd><b>Aucun.</b> Tu ouvres la page et tu commences.</dd>
              <dt>Serveur</dt><dd><b>Aucun.</b> Le site est exporté en fichiers statiques, rien d&apos;autre.</dd>
              <dt>Tes fiches</dt><dd>Gardées dans ton navigateur, sur ton appareil. Pour les emporter ailleurs, sauvegarde-les dans un fichier <code>.json</code> et rouvre-le quand tu veux.</dd>
              <dt>Exports</dt><dd>Les PDF et les Word sont fabriqués sur ton appareil, sans rien envoyer.</dd>
              <dt>Suivi</dt><dd>Pas de cookies, pas de statistiques, pas de publicité.</dd>
            </dl>
          </div>
        </section>

        {/* ─────────────────────────────── open source */}
        <section className="hero oss" id="open-source">
          <PantheonLayer id="oss" seed={3} greek={false} emblem={false} count={40} />
          <div className="hero-inner">
            <span className="kicker"><i />Open source</span>
            <h2>Le code est à tout le monde<span className="dot">.</span></h2>
            <p className="lead">Calliope est publié sous licence MIT. Tu peux l&apos;héberger toi-même, l&apos;adapter à ta classe ou proposer le prochain mode de fichage.</p>
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
