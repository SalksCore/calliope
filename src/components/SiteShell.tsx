import { Footer } from "./Footer";
import { Masthead } from "./salks/Vitrine";
import { ThemeToggle } from "./ThemeToggle";

/** Habillage des pages secondaires (légal, 404) : en-tête de la vitrine et pied de page commun. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="v">
      <Masthead name="Calliope" greek="ΚΑΛΛΙΟΠΗ" tools={<ThemeToggle />} cta={{ href: "/fiches/", label: "Créer ma fiche" }} />
      {children}
      <Footer />
    </div>
  );
}
