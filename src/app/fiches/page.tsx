import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Studio } from "@/components/editor/Studio";

export const metadata: Metadata = {
  title: "Créer ta fiche",
  description: "Crée ta fiche d'explication linéaire ou de dissertation, vois-la en direct dans le modèle choisi et exporte-la en PDF ou en Word.",
};

export default function FichesPage() {
  return (
    <>
      <Studio />
      <Footer />
    </>
  );
}
