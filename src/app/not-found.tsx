import Link from "next/link";
import { Footer } from "@/components/Footer";
import { PantheonLayer } from "@/components/Pantheon";
import { Topbar } from "@/components/Topbar";

export default function NotFound() {
  return (
    <div className="site">
      <Topbar product="PAGE INTROUVABLE" />
      <main className="legal">
        <section className="hero">
          <PantheonLayer id="404" seed={404} />
          <div className="hero-inner">
            <span className="kicker"><i />Erreur 404</span>
            <h1>Cette page s&apos;est perdue<span className="dot">.</span></h1>
            <p className="lead">Même la muse ne la retrouve pas. Reviens à l&apos;accueil ou commence une fiche.</p>
            <div className="actions">
              <Link className="btn primary" href="/fiches/">Créer ma fiche</Link>
              <Link className="btn secondary" href="/">Accueil</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
