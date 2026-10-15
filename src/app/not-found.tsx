import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";

export default function NotFound() {
  return (
    <SiteShell>
      <main className="v-wrap v-hero-solo">
        <p className="v-over"><b>Erreur 404</b> · page introuvable</p>
        <h1>Cette page s&apos;est <em>perdue</em>.</h1>
        <p className="v-lead">Même la muse ne la retrouve pas. Reviens à l&apos;accueil ou commence une fiche.</p>
        <div className="v-actions">
          <Link className="v-btn v-btn-solid" href="/fiches/">Créer ma fiche</Link>
          <Link className="v-link" href="/">Retour à l&apos;accueil</Link>
        </div>
      </main>
    </SiteShell>
  );
}
