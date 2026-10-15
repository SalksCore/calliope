import { site } from "@/config/site";
import { SalksFooter } from "./salks/SalksFooter";

/** Pied de page commun aux sites Salks., avec les liens de Calliope en première colonne. */
export function Footer() {
  return (
    <SalksFooter
      site="Calliope"
      lang="fr"
      legalBase="/legal"
      links={[
        { label: "Créer ma fiche", href: "/fiches/" },
        { label: "Les modèles", href: "/#modeles" },
        { label: "Code source", href: site.repo },
        { label: "Signaler un problème", href: `${site.repo}/issues` },
      ]}
    />
  );
}
